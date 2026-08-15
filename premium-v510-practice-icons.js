(() => {
  'use strict';

  const VERSION = '2.3.28-v510icons2';
  const root = document.documentElement;
  let scheduled = false;

  const svg = (name, body) => `<svg class="ft-v510-practice-glyph ft-v510-practice-pictogram" data-v510-pictogram="${name}" viewBox="0 0 32 32" aria-hidden="true" focusable="false">${body}</svg>`;

  const ICONS = Object.freeze({
    conversation: svg('conversation', [
      '<rect class="ft-v510-picto-primary" x="11" y="4" width="10" height="15" rx="5"></rect>',
      '<rect class="ft-v510-picto-cutout" x="14.15" y="7" width="3.7" height="7.4" rx="1.85"></rect>',
      '<path class="ft-v510-picto-secondary ft-v510-picto-stroke" d="M7.5 14.5a8.5 8.5 0 0 0 17 0"></path>',
      '<path class="ft-v510-picto-secondary ft-v510-picto-stroke" d="M16 23v4M12.5 27h7"></path>',
      '<path class="ft-v510-picto-accent ft-v510-picto-stroke" d="M25.5 6v4M23.5 8h4"></path>'
    ].join('')),

    listening: svg('listening', [
      '<path class="ft-v510-picto-primary ft-v510-picto-heavy-stroke" d="M7 17v-1.1a9 9 0 0 1 18 0V17"></path>',
      '<rect class="ft-v510-picto-primary" x="5" y="16" width="7" height="10" rx="3.2"></rect>',
      '<rect class="ft-v510-picto-primary" x="20" y="16" width="7" height="10" rx="3.2"></rect>',
      '<path class="ft-v510-picto-secondary ft-v510-picto-stroke" d="M13 19.5c1.5-1.25 4.5-1.25 6 0M14.3 23c.85-.7 2.55-.7 3.4 0"></path>',
      '<circle class="ft-v510-picto-accent" cx="16" cy="16" r="1.6"></circle>'
    ].join('')),

    review: svg('review', [
      '<path class="ft-v510-picto-primary ft-v510-picto-heavy-stroke" d="M8.2 9.1A10.1 10.1 0 1 1 6.3 20.2"></path>',
      '<path class="ft-v510-picto-primary" d="M5.2 5.4 13.4 7.1 7.8 13.2Z"></path>',
      '<path class="ft-v510-picto-secondary" d="m16.2 10.4 1.55 3.85 3.85 1.55-3.85 1.55-1.55 3.85-1.55-3.85-3.85-1.55 3.85-1.55Z"></path>',
      '<circle class="ft-v510-picto-accent" cx="23.8" cy="8.2" r="1.55"></circle>'
    ].join('')),

    'real-life': svg('real-life', [
      '<rect class="ft-v510-picto-secondary ft-v510-picto-soft" x="6" y="10" width="20" height="17" rx="4"></rect>',
      '<path class="ft-v510-picto-secondary ft-v510-picto-stroke" d="M11 12V9.5a5 5 0 0 1 10 0V12"></path>',
      '<path class="ft-v510-picto-primary" d="M16 13.1a5.1 5.1 0 0 0-5.1 5.1c0 4.1 5.1 8 5.1 8s5.1-3.9 5.1-8a5.1 5.1 0 0 0-5.1-5.1Z"></path>',
      '<circle class="ft-v510-picto-cutout" cx="16" cy="18.1" r="1.8"></circle>',
      '<path class="ft-v510-picto-accent ft-v510-picto-stroke" d="M23.8 7.3v3.2M22.2 8.9h3.2"></path>'
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
    root.dataset.v510PracticeIcons = '2';
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
    style: 'premium-pictogram-v2',
    refresh: decorate,
    icons: Object.freeze(Object.keys(ICONS))
  });
})();
