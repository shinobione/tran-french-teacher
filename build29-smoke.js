(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  if (!params.has('b29Smoke')) return;

  const root = document.documentElement;
  const failures = [];
  const fail = message => failures.push(message);
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function run() {
    await wait(900);
    const api = window.FrenchTranquilleBuild29;
    if (!api) fail('Build29 API missing');
    const audit = api?.refresh?.() || {};

    root.dataset.b29AuditHomeVisible = audit.homeVisible ? '1' : '0';
    root.dataset.b29AuditButtons = String(audit.buttons ?? -1);
    root.dataset.b29AuditTooSmall = String(audit.tooSmall ?? -1);
    root.dataset.b29AuditUnnamed = String(audit.unnamed ?? -1);
    root.dataset.b29AuditCurrentTabs = String(audit.currentTabs ?? -1);
    root.dataset.b29AuditOverflow = String(audit.horizontalOverflow ?? -1);

    if (!root.classList.contains('b29-iphone-ready')) fail('b29 root class missing');
    if (root.dataset.b29Ready !== '1') fail('b29 ready marker missing');
    if (!audit.homeVisible) fail('learner home is not visible');
    if (!window.visualViewport) fail('visualViewport unavailable');
    if (!getComputedStyle(root).getPropertyValue('--b29-vv-height').trim()) fail('visualViewport CSS variable missing');

    const viewport = document.querySelector('meta[name="viewport"]')?.content || '';
    if (!viewport.includes('viewport-fit=cover')) fail('viewport-fit=cover missing');
    const appleIcon = document.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href') || '';
    if (!appleIcon.includes('apple-touch-icon.png')) fail('dedicated apple-touch-icon not wired');

    if (audit.tooSmall !== 0) fail(`small touch targets: ${audit.tooSmall}`);
    if (audit.unnamed !== 0) fail(`unnamed buttons: ${audit.unnamed}`);
    if (audit.currentTabs !== 1) fail(`aria-current tabs: ${audit.currentTabs}`);
    if (audit.horizontalOverflow !== 0) fail(`horizontal overflow: ${audit.horizontalOverflow}`);

    const settings = document.querySelector('.b27-icon-button[data-b27-settings]');
    if (settings && !settings.getAttribute('aria-label')) fail('settings label missing');

    const progress = document.querySelector('.b27-progress,.b27-level-track');
    if (progress && progress.getAttribute('role') !== 'progressbar') fail('progress semantics missing');

    try {
      const manifest = await fetch('./manifest.webmanifest?v=1.22.0-b29', { cache:'no-store' }).then(response => {
        if (!response.ok) throw new Error(`manifest ${response.status}`);
        return response.json();
      });
      if (manifest.display !== 'standalone') fail('manifest display is not standalone');
      if (manifest.start_url !== './') fail('manifest start_url changed');
      if (manifest.scope !== './') fail('manifest scope changed');
      if (manifest.id !== './') fail('manifest id missing');
    } catch (error) {
      fail(`manifest fetch failed: ${error.message || error}`);
    }

    root.dataset.b29Smoke = failures.length ? 'failed' : 'passed';
    root.dataset.b29SmokeViewport = `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`;
    root.dataset.b29SmokeTouch = String(audit.buttons || 0);
    root.dataset.b29SmokeReduced = matchMedia('(prefers-reduced-motion: reduce)').matches ? '1' : '0';
    root.dataset.b29SmokeOffline = navigator.onLine ? '0' : '1';

    if (failures.length) {
      root.dataset.b29SmokeFailures = failures.join(' | ');
      const marker = document.createElement('pre');
      marker.id = 'b29-smoke-failures';
      marker.hidden = true;
      marker.textContent = failures.join('\n');
      document.body.append(marker);
    }
  }

  window.addEventListener('load', () => setTimeout(() => run().catch(error => {
    root.dataset.b29Smoke = 'failed';
    root.dataset.b29SmokeFailures = String(error?.stack || error);
  }), 120));
})();
