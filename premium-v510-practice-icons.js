(() => {
  'use strict';

  const VERSION = '2.3.27-v510icons1';
  const root = document.documentElement;
  let scheduled = false;

  const svg = paths => `<svg class="ft-v510-practice-glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths}</svg>`;
  const ICONS = Object.freeze({
    conversation: svg([
      '<rect x="9" y="3" width="6" height="10" rx="3"></rect>',
      '<path d="M6.5 10.5a5.5 5.5 0 0 0 11 0"></path>',
      '<path d="M12 16v4"></path>',
      '<path d="M9 20h6"></path>'
    ].join('')),
    listening: svg([
      '<path d="M4 13v-1a8 8 0 0 1 16 0v1"></path>',
      '<path d="M4 13h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1v-6Z"></path>',
      '<path d="M20 13h-2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a1 1 0 0 0 1-1v-6Z"></path>'
    ].join('')),
    review: svg([
      '<path d="M4.5 9V4.5H9"></path>',
      '<path d="M5.2 7.1A8 8 0 1 1 4 14"></path>'
    ].join('')),
    'real-life': svg([
      '<path d="M12 21s6.5-5.45 6.5-11.25a6.5 6.5 0 1 0-13 0C5.5 15.55 12 21 12 21Z"></path>',
      '<circle cx="12" cy="8.3" r="1.65"></circle>',
      '<path d="M9.15 13c.78-1.27 1.73-1.9 2.85-1.9s2.07.63 2.85 1.9"></path>'
    ].join(''))
  });

  function decorate() {
    document.querySelectorAll('.b27-practice-action[data-b27-practice-action]').forEach(card => {
      const id = card.dataset.b27PracticeAction;
      const host = card.querySelector('.b27-practice-icon');
      if (!host || !ICONS[id]) return;
      if (host.dataset.v510PracticeIcon === id && host.querySelector('.ft-v510-practice-glyph')) return;
      host.dataset.v510PracticeIcon = id;
      host.setAttribute('aria-hidden', 'true');
      host.innerHTML = ICONS[id];
    });
    root.dataset.v510PracticeIcons = '1';
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      decorate();
    });
  }

  new MutationObserver(schedule).observe(document.body, { childList:true, subtree:true });
  window.addEventListener('focus', schedule);
  schedule();

  window.FrenchTranquilleV510PracticeIcons = Object.freeze({
    version: VERSION,
    refresh: decorate,
    icons: Object.freeze(Object.keys(ICONS))
  });
})();
