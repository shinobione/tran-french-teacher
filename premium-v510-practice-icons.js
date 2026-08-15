(() => {
  'use strict';

  const VERSION = '2.3.29-v510icons3';
  const root = document.documentElement;
  let scheduled = false;

  const svg = (name, body) => `<svg class="ft-v510-practice-glyph ft-v510-practice-pictogram" data-v510-pictogram="${name}" viewBox="0 0 32 32" aria-hidden="true" focusable="false">${body}</svg>`;

  const ICONS = Object.freeze({
    conversation: svg('conversation', [
      '<rect class="ft-v510-picto-primary" x="12" y="4" width="8" height="14" rx="4"></rect>',
      '<rect class="ft-v510-picto-highlight" x="14.2" y="6.2" width="2" height="7.6" rx="1"></rect>',
      '<path class="ft-v510-picto-secondary" d="M8 14h3v1a5 5 0 0 0 10 0v-1h3v1a8 8 0 0 1-6.5 7.85V25H21v3H11v-3h3.5v-2.15A8 8 0 0 1 8 15Z"></path>'
    ].join('')),

    listening: svg('listening', [
      '<path class="ft-v510-picto-primary" d="M5 16a11 11 0 0 1 22 0h-4a7 7 0 0 0-14 0Z"></path>',
      '<rect class="ft-v510-picto-primary" x="4" y="15" width="7" height="11" rx="3"></rect>',
      '<rect class="ft-v510-picto-primary" x="21" y="15" width="7" height="11" rx="3"></rect>',
      '<rect class="ft-v510-picto-highlight" x="6.2" y="17.5" width="1.8" height="6" rx=".9"></rect>',
      '<rect class="ft-v510-picto-highlight" x="24" y="17.5" width="1.8" height="6" rx=".9"></rect>',
      '<rect class="ft-v510-picto-secondary" x="14.2" y="18" width="3.6" height="6" rx="1.8"></rect>'
    ].join('')),

    review: svg('review', [
      '<circle class="ft-v510-picto-primary" cx="16" cy="16" r="10"></circle>',
      '<circle class="ft-v510-picto-cutout" cx="16" cy="16" r="6"></circle>',
      '<path class="ft-v510-picto-primary" d="M5.2 6.6 13 7.6 8.2 13.8Z"></path>',
      '<path class="ft-v510-picto-secondary" d="m16 11.2 1.55 3.25 3.25 1.55-3.25 1.55L16 20.8l-1.55-3.25L11.2 16l3.25-1.55Z"></path>'
    ].join('')),

    'real-life': svg('real-life', [
      '<rect class="ft-v510-picto-primary" x="5" y="11" width="19" height="16" rx="3.5"></rect>',
      '<path class="ft-v510-picto-secondary ft-v510-picto-stroke" d="M10 12V9.5a4.5 4.5 0 0 1 9 0V12"></path>',
      '<rect class="ft-v510-picto-highlight" x="8" y="14" width="2" height="9" rx="1"></rect>',
      '<path class="ft-v510-picto-secondary" d="M24.5 8.5a4.5 4.5 0 0 0-4.5 4.5c0 3.35 4.5 7 4.5 7s4.5-3.65 4.5-7a4.5 4.5 0 0 0-4.5-4.5Z"></path>',
      '<circle class="ft-v510-picto-cutout" cx="24.5" cy="13" r="1.45"></circle>'
    ].join(''))
  });

  function decorate() {
    document.querySelectorAll('.b27-practice-action[data-b27-practice-action]').forEach(card => {
      const id = card.dataset.b27PracticeAction;
      const host = card.querySelector('.b27-practice-icon');
      if (!host || !ICONS[id]) return;
      if (host.dataset.v510PracticeIcon === id && host.querySelector('.ft-v510-practice-pictogram')) return;
      host.dataset.v510PracticeIcon = id;
      host.setAttribute('aria-hidden', 'true');
      host.innerHTML = ICONS[id];
    });
    root.dataset.v510PracticeIcons = '3';
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
    style: 'premium-pictogram-v3',
    refresh: decorate,
    icons: Object.freeze(Object.keys(ICONS))
  });
})();
