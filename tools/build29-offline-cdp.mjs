import fs from 'node:fs';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const origin = process.argv[2] || 'http://127.0.0.1:4173';
const serverPidPath = process.argv[3] || '/tmp/ft-b29-server.pid';
const debugPort = 9223;
const profile = '/tmp/ft-b29-cdp-profile';

fs.rmSync(profile, { recursive: true, force: true });

const chrome = spawn('google-chrome', [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--remote-debugging-address=127.0.0.1',
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${profile}`,
  '--window-size=390,844',
  'about:blank'
], { stdio: ['ignore', 'ignore', 'pipe'] });

let chromeErr = '';
chrome.stderr.on('data', chunk => {
  chromeErr += chunk.toString();
  if (chromeErr.length > 12000) chromeErr = chromeErr.slice(-12000);
});

async function waitForTargets(timeoutMs = 12000) {
  const started = Date.now();
  let lastError;
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(`http://127.0.0.1:${debugPort}/json/list`);
      if (response.ok) {
        const targets = await response.json();
        const page = targets.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
        if (page) return page;
      }
    } catch (error) {
      lastError = error;
    }
    await delay(120);
  }
  throw new Error(`Chrome DevTools endpoint unavailable: ${lastError?.message || 'timeout'}`);
}

const target = await waitForTargets();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('CDP websocket open timeout')), 7000);
  ws.addEventListener('open', () => { clearTimeout(timer); resolve(); }, { once: true });
  ws.addEventListener('error', () => { clearTimeout(timer); reject(new Error('CDP websocket error')); }, { once: true });
});

let seq = 0;
const pending = new Map();
const eventWaiters = new Map();

ws.addEventListener('message', event => {
  let message;
  try { message = JSON.parse(String(event.data)); } catch { return; }
  if (message.id) {
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(`${waiter.method}: ${message.error.message}`));
    else waiter.resolve(message.result || {});
    return;
  }
  const queue = eventWaiters.get(message.method);
  if (!queue?.length) return;
  const waiter = queue.shift();
  clearTimeout(waiter.timer);
  waiter.resolve(message.params || {});
});

function command(method, params = {}, timeoutMs = 12000) {
  const id = ++seq;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`${method} timed out`));
    }, timeoutMs);
    pending.set(id, {
      method,
      resolve: value => { clearTimeout(timer); resolve(value); },
      reject: error => { clearTimeout(timer); reject(error); }
    });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

function onceEvent(method, timeoutMs = 15000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      const queue = eventWaiters.get(method) || [];
      const index = queue.findIndex(item => item.timer === timer);
      if (index >= 0) queue.splice(index, 1);
      reject(new Error(`${method} event timed out`));
    }, timeoutMs);
    const queue = eventWaiters.get(method) || [];
    queue.push({ resolve, reject, timer });
    eventWaiters.set(method, queue);
  });
}

async function evaluate(expression, { awaitPromise = false, timeoutMs = 15000 } = {}) {
  const result = await command('Runtime.evaluate', {
    expression,
    awaitPromise,
    returnByValue: true,
    userGesture: true
  }, timeoutMs);
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || 'Runtime.evaluate exception');
  }
  return result.result?.value;
}

async function navigate(url, timeoutMs = 18000) {
  const loaded = onceEvent('Page.loadEventFired', timeoutMs);
  const result = await command('Page.navigate', { url }, timeoutMs);
  if (result.errorText) throw new Error(`navigation failed: ${result.errorText}`);
  await loaded;
}

async function poll(label, expression, predicate, timeoutMs = 16000) {
  const started = Date.now();
  let value;
  while (Date.now() - started < timeoutMs) {
    value = await evaluate(expression, { timeoutMs: 5000 });
    if (predicate(value)) return value;
    await delay(150);
  }
  throw new Error(`${label} timeout; last=${JSON.stringify(value)}`);
}

const markerExpression = `(() => {
  const d=document.documentElement?.dataset || {};
  return {
    smoke:d.b29Smoke||'', ready:d.b29Ready||'', home:d.b29AuditHomeVisible||'',
    tooSmall:d.b29AuditTooSmall||'', unnamed:d.b29AuditUnnamed||'',
    currentTabs:d.b29AuditCurrentTabs||'', overflow:d.b29AuditOverflow||'',
    swRegistered:d.b29SwRegistered||'', swReady:d.b29SwReady||'',
    controller:!!navigator.serviceWorker?.controller,
    bootError:!!document.querySelector('#app > .boot-status.error'),
    title:document.title || '', href:location.href
  };
})()`;

const warmEnough = m => m?.smoke === 'passed' && m?.ready === '1' && m?.home === '1' && m?.swRegistered === '1';
const strictOffline = m => warmEnough(m) && m?.tooSmall === '0' && m?.unnamed === '0' && m?.currentTabs === '1' && m?.overflow === '0' && m?.controller === true && m?.bootError === false;

let serverKilled = false;
try {
  await command('Page.enable');
  await command('Runtime.enable');

  await navigate(`${origin}/?uxSmoke=lesson8&b29Audit=cdp-warm1`);
  const warm1 = await poll('warm1 markers', markerExpression, warmEnough);
  console.log('Build29 CDP warm1', JSON.stringify(warm1));

  const ready = await evaluate(`Promise.race([
    navigator.serviceWorker.ready.then(reg => ({ready:true,active:!!reg.active,script:reg.active?.scriptURL||''})),
    new Promise(resolve => setTimeout(() => resolve({ready:false,timeout:true}), 15000))
  ])`, { awaitPromise: true, timeoutMs: 18000 });
  if (!ready?.ready || !ready?.active) throw new Error(`service worker never became active: ${JSON.stringify(ready)}`);
  console.log('Build29 CDP service worker ready', JSON.stringify(ready));

  await navigate(`${origin}/?uxSmoke=lesson8&b29Audit=cdp-warm2`);
  const warm2 = await poll('warm2 controlled markers', markerExpression, m => warmEnough(m) && m.controller === true);
  console.log('Build29 CDP warm2 controlled', JSON.stringify(warm2));

  const pid = Number(fs.readFileSync(serverPidPath, 'utf8').trim());
  if (!Number.isInteger(pid) || pid <= 1) throw new Error(`invalid static server pid: ${pid}`);
  process.kill(pid, 'SIGTERM');
  serverKilled = true;
  fs.rmSync(serverPidPath, { force: true });
  await delay(900);

  await navigate(`${origin}/?uxSmoke=lesson8&b29Audit=cdp-offline`);
  const offline = await poll('strict offline markers', markerExpression, strictOffline, 18000);
  console.log('PASS Build29 same-browser strict offline boot', JSON.stringify(offline));
} catch (error) {
  console.error('FAIL Build29 same-browser offline proof:', error?.stack || error);
  if (chromeErr) console.error('Chrome stderr tail:\n' + chromeErr);
  process.exitCode = 1;
} finally {
  try { ws.close(); } catch {}
  try { chrome.kill('SIGTERM'); } catch {}
  await delay(250);
  if (!chrome.killed) {
    try { chrome.kill('SIGKILL'); } catch {}
  }
  if (!serverKilled && fs.existsSync(serverPidPath)) {
    // Let the workflow's always() cleanup own the live server.
  }
}
