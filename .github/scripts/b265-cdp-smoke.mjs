import { spawn } from 'node:child_process';
import { readFile, rm, writeFile } from 'node:fs/promises';

const [url, widthRaw, heightRaw, outputPath, readyMarker] = process.argv.slice(2);
if (!url || !widthRaw || !heightRaw || !outputPath || !readyMarker) {
  console.error('Usage: node b265-cdp-smoke.mjs <url> <width> <height> <output> <ready-marker>');
  process.exit(2);
}

const width = Number(widthRaw);
const height = Number(heightRaw);
const profile = `/tmp/ft-b265-cdp-${process.pid}-${Date.now()}`;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
let chrome;
let socket;

async function waitForDevToolsPort(deadline) {
  const path = `${profile}/DevToolsActivePort`;
  while (Date.now() < deadline) {
    try {
      const text = await readFile(path, 'utf8');
      const port = Number(text.split(/\r?\n/)[0]);
      if (Number.isFinite(port) && port > 0) return port;
    } catch {}
    await sleep(80);
  }
  throw new Error('Chrome DevToolsActivePort was not created in time');
}

async function waitForPageTarget(port, deadline) {
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      if (response.ok) {
        const targets = await response.json();
        const target = targets.find(item => item.type === 'page' && item.url?.startsWith('http://127.0.0.1:4173/'))
          || targets.find(item => item.type === 'page' && item.webSocketDebuggerUrl);
        if (target?.webSocketDebuggerUrl) return target;
      }
    } catch {}
    await sleep(80);
  }
  throw new Error('Chrome page target was not available in time');
}

function connectCdp(webSocketDebuggerUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(webSocketDebuggerUrl);
    const timer = setTimeout(() => reject(new Error('CDP websocket open timeout')), 5000);
    ws.addEventListener('open', () => {
      clearTimeout(timer);
      resolve(ws);
    }, { once: true });
    ws.addEventListener('error', event => {
      clearTimeout(timer);
      reject(event.error || new Error('CDP websocket error'));
    }, { once: true });
  });
}

function createSender(ws) {
  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', event => {
    let message;
    try { message = JSON.parse(event.data); } catch { return; }
    if (!message.id || !pending.has(message.id)) return;
    const entry = pending.get(message.id);
    pending.delete(message.id);
    clearTimeout(entry.timer);
    if (message.error) entry.reject(new Error(`${message.error.code}: ${message.error.message}`));
    else entry.resolve(message.result);
  });

  return (method, params = {}) => new Promise((resolve, reject) => {
    const requestId = ++id;
    const timer = setTimeout(() => {
      pending.delete(requestId);
      reject(new Error(`CDP ${method} timeout`));
    }, 4000);
    pending.set(requestId, { resolve, reject, timer });
    ws.send(JSON.stringify({ id: requestId, method, params }));
  });
}

async function stopChrome() {
  try { socket?.close(); } catch {}
  if (!chrome || chrome.exitCode !== null) return;
  const exited = new Promise(resolve => chrome.once('exit', resolve));
  chrome.kill('SIGTERM');
  await Promise.race([exited, sleep(1200)]);
  if (chrome.exitCode === null) chrome.kill('SIGKILL');
}

try {
  const flags = [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-background-networking',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-extensions',
    '--disable-sync',
    '--metrics-recording-only',
    '--no-first-run',
    '--disable-features=OptimizationGuideModelDownloading,OptimizationHints,AutofillServerCommunication,MediaRouter,Translate',
    `--user-data-dir=${profile}`,
    `--window-size=${width},${height}`,
    '--remote-debugging-port=0',
    url
  ];

  chrome = spawn('google-chrome', flags, {
    stdio: ['ignore', 'ignore', 'inherit']
  });

  const startupDeadline = Date.now() + 10000;
  const port = await waitForDevToolsPort(startupDeadline);
  const target = await waitForPageTarget(port, startupDeadline);
  socket = await connectCdp(target.webSocketDebuggerUrl);
  const send = createSender(socket);
  await send('Runtime.enable');

  const deadline = Date.now() + 22000;
  let html = '';
  while (Date.now() < deadline) {
    const evaluation = await send('Runtime.evaluate', {
      expression: 'document.documentElement.outerHTML',
      returnByValue: true
    });
    html = evaluation?.result?.value || '';
    if (html.includes('boot-status error')) {
      await writeFile(outputPath, html, 'utf8');
      throw new Error('Application boot error detected');
    }
    if (html.includes(readyMarker)) {
      await writeFile(outputPath, html, 'utf8');
      console.log(`CDP marker reached: ${readyMarker}`);
      process.exitCode = 0;
      break;
    }
    await sleep(100);
  }

  if (!html.includes(readyMarker)) {
    await writeFile(outputPath, html, 'utf8');
    const markers = [...html.matchAll(/data-b265-[^\s>]+/g)].map(match => match[0]).slice(0, 30);
    console.error(`CDP marker timeout: ${readyMarker}`);
    if (markers.length) console.error(markers.join('\n'));
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error?.stack || error);
  process.exitCode = 1;
} finally {
  await stopChrome();
  await rm(profile, { recursive: true, force: true }).catch(() => {});
}
