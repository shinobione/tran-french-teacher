(() => {
  'use strict';

  const VERSION = '2.3.23-v59ui1';
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const root = document.documentElement;
  let scheduled = false;
  let debugTapCount = 0;
  let debugTapAt = 0;

  const ICONS = Object.freeze({
    conversation: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"/><path d="M6.5 10.5v.7a5.5 5.5 0 0 0 11 0v-.7M12 16.7V21M9 21h6"/></svg>',
    listening: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13v-1a8 8 0 0 1 16 0v1"/><path d="M4 13h2.2v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 1-1.73M20 13h-2.2v6H19a2 2 0 0 0 2-2v-2a2 2 0 0 0-1-1.73"/></svg>',
    review: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7v5h5"/><path d="M6.1 16.4A7.5 7.5 0 1 0 5.4 8"/><path d="M5 8 2.8 5.8"/></svg>',
    'real-life': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"/><path d="M9.2 10.2 11 12l3.8-4"/></svg>'
  });

  function isDebug() {
    return localStorage.getItem(DEBUG_KEY) === '1';
  }

  function sanitizeSpeakingLoop() {
    const byParent = new Map();
    document.querySelectorAll('.speaking-loop-card').forEach(card => {
      if (!(card instanceof HTMLElement)) return;
      const parent = card.parentElement;
      if (!parent) return;
      if (!byParent.has(parent)) byParent.set(parent, new Map());
      const signature = `${card.dataset.speakingLoop || ''}|${card.dataset.speakingLoopPhrase || ''}`;
      const group = byParent.get(parent);
      if (group.has(signature)) {
        card.remove();
        return;
      }
      group.set(signature, card);

      const actionRows = [...card.querySelectorAll(':scope > .speaking-loop-actions')];
      actionRows.slice(1).forEach(node => node.remove());
      const notes = [...card.querySelectorAll(':scope > .speaking-loop-note')];
      notes.slice(1).forEach(node => node.remove());

      const row = actionRows[0];
      if (row) {
        const recordButtons = [...row.querySelectorAll('[data-speaking-record]')];
        recordButtons.slice(1).forEach(node => node.remove());
      }
      card.dataset.v59Sanitized = '1';
    });
  }

  function decoratePracticeIcons() {
    document.querySelectorAll('[data-b27-practice-action]').forEach(action => {
      if (!(action instanceof HTMLElement)) return;
      const id = action.dataset.b27PracticeAction || '';
      const icon = action.querySelector('.b27-practice-icon');
      const svg = ICONS[id];
      if (!icon || !svg || icon.dataset.v59Icon === id) return;
      icon.innerHTML = svg;
      icon.dataset.v59Icon = id;
      icon.setAttribute('aria-hidden', 'true');
    });
  }

  function decorateLessonIdentity() {
    document.querySelectorAll('.b27-primary-card .b27-card-topline').forEach(line => {
      if (!(line instanceof HTMLElement)) return;
      line.dataset.v59LessonIdentity = '1';
      const glyph = line.querySelector(':scope > b');
      if (glyph) glyph.setAttribute('aria-hidden', 'true');
    });
  }

  function syncAboutHead(head) {
    if (!(head instanceof HTMLElement)) return;
    const card = head.closest('#ft-settings-legal');
    if (!card) return;
    const open = card.dataset.v55Open === '1';
    head.setAttribute('role', 'button');
    head.setAttribute('tabindex', '0');
    head.setAttribute('aria-expanded', open ? 'true' : 'false');
    head.setAttribute('aria-controls', 'ft-settings-legal-details');
    const grid = card.querySelector('.ft-legal-grid');
    if (grid) grid.id = 'ft-settings-legal-details';
  }

  function decorateAbout() {
    document.querySelectorAll('#ft-settings-legal .ft-legal-head').forEach(syncAboutHead);
  }

  function decorateDebugEntry() {
    const settings = document.querySelector('.screen-settings');
    if (!settings) return;
    const heading = settings.querySelector('.topbar h1, .b27-page-title h1, h1');
    if (!(heading instanceof HTMLElement)) return;
    heading.dataset.v59DebugEntry = '1';
    if (isDebug()) heading.setAttribute('title', 'DEBUG FR — 5 taps pour basculer');
    else heading.removeAttribute('title');
  }

  function refresh() {
    sanitizeSpeakingLoop();
    decoratePracticeIcons();
    decorateLessonIdentity();
    decorateAbout();
    decorateDebugEntry();
    root.dataset.v59Ready = '1';
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      refresh();
    });
  }

  function toggleAbout(head) {
    const arrow = head?.querySelector?.('[data-v55-about-toggle]');
    if (arrow instanceof HTMLButtonElement) arrow.click();
    requestAnimationFrame(() => syncAboutHead(head));
  }

  document.addEventListener('click', event => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const aboutHead = target.closest('#ft-settings-legal .ft-legal-head');
    if (aboutHead && !target.closest('[data-v55-about-toggle],a,input,select,textarea')) {
      event.preventDefault();
      toggleAbout(aboutHead);
      return;
    }

    const debugHeading = target.closest('[data-v59-debug-entry]');
    if (debugHeading) {
      const now = performance.now();
      debugTapCount = now - debugTapAt <= 1900 ? debugTapCount + 1 : 1;
      debugTapAt = now;
      if (debugTapCount >= 5) {
        debugTapCount = 0;
        const api = window.FrenchTranquilleDebugFr;
        if (api?.apply) api.apply(!api.current(), { reload:true });
      }
    }
  }, true);

  document.addEventListener('keydown', event => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const aboutHead = target.closest('#ft-settings-legal .ft-legal-head');
    if (!aboutHead || target !== aboutHead) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    toggleAbout(aboutHead);
  }, true);

  const observer = new MutationObserver(schedule);
  const start = () => {
    observer.observe(document.documentElement, {
      subtree:true,
      childList:true,
      attributes:true,
      attributeFilter:['class','data-theme','data-v55-open','hidden']
    });
    refresh();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once:true });
  else start();

  window.FrenchTranquillePremiumV59 = Object.freeze({
    version:VERSION,
    refresh,
    sanitizeSpeakingLoop,
    icons:ICONS,
    debugEntry:'settings-title-5-taps'
  });
})();
