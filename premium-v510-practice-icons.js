(() => {
  'use strict';

  const VERSION = '2.3.30-v510icons4';
  const root = document.documentElement;
  let scheduled = false;

  const svg = (name, body) => `<svg class="ft-v510-practice-glyph ft-v510-practice-pictogram ft-v510-pictogram-3d" data-v510-pictogram="${name}" viewBox="0 0 48 48" aria-hidden="true" focusable="false">${body}</svg>`;

  const ICONS = Object.freeze({
    conversation: svg('conversation', [
      '<rect class="ft-v510-3d-orange-shadow" x="7.5" y="5.5" width="33" height="27" rx="10" transform="translate(1.5 1.8)"></rect>',
      '<rect class="ft-v510-3d-orange" x="7.5" y="5.5" width="33" height="27" rx="10"></rect>',
      '<path class="ft-v510-3d-orange-hi ft-v510-3d-stroke" d="M12.5 9.3h18.7"></path>',
      '<rect class="ft-v510-3d-cutout" x="13" y="10" width="22" height="18" rx="7"></rect>',
      '<rect class="ft-v510-3d-purple-shadow" x="18" y="8.6" width="12" height="22" rx="6" transform="translate(1.2 1.4)"></rect>',
      '<rect class="ft-v510-3d-purple" x="18" y="8.6" width="12" height="22" rx="6"></rect>',
      '<path class="ft-v510-3d-purple-hi ft-v510-3d-stroke" d="M21.2 12v10.5"></path>',
      '<path class="ft-v510-3d-orange-shadow ft-v510-3d-heavy-stroke" d="M13.5 26v1.8a10.5 10.5 0 0 0 21 0V26" transform="translate(1 1.4)"></path>',
      '<path class="ft-v510-3d-orange ft-v510-3d-heavy-stroke" d="M13.5 26v1.8a10.5 10.5 0 0 0 21 0V26"></path>',
      '<rect class="ft-v510-3d-purple-shadow" x="21.2" y="36" width="5.6" height="6" rx="2" transform="translate(1 1.1)"></rect>',
      '<rect class="ft-v510-3d-purple" x="21.2" y="35.3" width="5.6" height="6" rx="2"></rect>',
      '<rect class="ft-v510-3d-orange-shadow" x="15" y="40" width="18" height="4.2" rx="2.1" transform="translate(1 1)"></rect>',
      '<rect class="ft-v510-3d-orange" x="15" y="39.2" width="18" height="4.2" rx="2.1"></rect>',
      '<path class="ft-v510-3d-orange-hi ft-v510-3d-stroke" d="M18.2 40.8h8.4"></path>'
    ].join('')),

    listening: svg('listening', [
      '<path class="ft-v510-3d-blue-shadow ft-v510-3d-band" d="M7.8 24v-2.1C7.8 12.7 15 6 24 6s16.2 6.7 16.2 15.9V24" transform="translate(1.3 1.6)"></path>',
      '<path class="ft-v510-3d-blue ft-v510-3d-band" d="M7.8 24v-2.1C7.8 12.7 15 6 24 6s16.2 6.7 16.2 15.9V24"></path>',
      '<path class="ft-v510-3d-blue-hi ft-v510-3d-stroke" d="M13.3 15.4C15.7 11.6 19.2 10 24 10"></path>',
      '<rect class="ft-v510-3d-gold-shadow" x="4.7" y="22" width="12" height="18" rx="5.4" transform="translate(1.2 1.5)"></rect>',
      '<rect class="ft-v510-3d-gold" x="4.7" y="22" width="12" height="18" rx="5.4"></rect>',
      '<rect class="ft-v510-3d-purple" x="8.1" y="25.2" width="6.4" height="11.6" rx="3.2"></rect>',
      '<path class="ft-v510-3d-gold-hi ft-v510-3d-stroke" d="M7.6 25.8v6.8"></path>',
      '<rect class="ft-v510-3d-gold-shadow" x="31.3" y="22" width="12" height="18" rx="5.4" transform="translate(1.2 1.5)"></rect>',
      '<rect class="ft-v510-3d-gold" x="31.3" y="22" width="12" height="18" rx="5.4"></rect>',
      '<rect class="ft-v510-3d-purple" x="33.5" y="25.2" width="6.4" height="11.6" rx="3.2"></rect>',
      '<path class="ft-v510-3d-gold-hi ft-v510-3d-stroke" d="M34.4 25.8v6.8"></path>',
      '<rect class="ft-v510-3d-purple-shadow" x="20.2" y="16.2" width="7.6" height="12" rx="3.8" transform="translate(1 1.2)"></rect>',
      '<rect class="ft-v510-3d-purple" x="20.2" y="15.5" width="7.6" height="12" rx="3.8"></rect>',
      '<path class="ft-v510-3d-purple-hi ft-v510-3d-stroke" d="M22.6 18v5"></path>'
    ].join('')),

    review: svg('review', [
      '<path class="ft-v510-3d-purple-shadow ft-v510-3d-arrow" d="M10.2 28.7A15.6 15.6 0 0 0 37 35.2"></path>',
      '<path class="ft-v510-3d-purple ft-v510-3d-arrow" d="M9 27.3A15.6 15.6 0 0 0 35.8 33.8"></path>',
      '<path class="ft-v510-3d-purple" d="m39.3 29.2-1.4 10-9.2-3.8Z"></path>',
      '<path class="ft-v510-3d-purple-hi ft-v510-3d-stroke" d="M12.8 31.5a12 12 0 0 0 9.5 5.7"></path>',
      '<path class="ft-v510-3d-orange-shadow ft-v510-3d-arrow" d="M37.8 19.3A15.6 15.6 0 0 0 11 12.8"></path>',
      '<path class="ft-v510-3d-orange ft-v510-3d-arrow" d="M39 20.7A15.6 15.6 0 0 0 12.2 14.2"></path>',
      '<path class="ft-v510-3d-orange" d="m8.7 18.8 1.4-10 9.2 3.8Z"></path>',
      '<path class="ft-v510-3d-orange-hi ft-v510-3d-stroke" d="M35.2 16.5a12 12 0 0 0-9.4-5.7"></path>',
      '<circle class="ft-v510-3d-cutout" cx="24" cy="24" r="8.2"></circle>',
      '<path class="ft-v510-3d-gold-shadow" d="M24 15.7 27 22h5.7l-4.6 3.6 1.8 6.2L24 28.1l-5.9 3.7 1.8-6.2-4.6-3.6H21Z" transform="translate(.8 1)"></path>',
      '<path class="ft-v510-3d-gold" d="M24 15.7 27 22h5.7l-4.6 3.6 1.8 6.2L24 28.1l-5.9 3.7 1.8-6.2-4.6-3.6H21Z"></path>',
      '<path class="ft-v510-3d-purple" d="m24 20.1 4.2 5.7h-2.6v5h-3.2v-5h-2.6Z"></path>'
    ].join('')),

    'real-life': svg('real-life', [
      '<circle class="ft-v510-3d-cyan-shadow" cx="24" cy="24" r="18" transform="translate(1.2 1.5)"></circle>',
      '<circle class="ft-v510-3d-cyan" cx="24" cy="24" r="18"></circle>',
      '<path class="ft-v510-3d-cyan-hi ft-v510-3d-stroke" d="M12.8 16.1A14.5 14.5 0 0 1 24 9.5"></path>',
      '<path class="ft-v510-3d-blue" d="M7.2 24.8h33.6v3.1H7.2Zm7.2-12.9h4.1l2.4 4.3-2.1 3.7-4.7-.4-2.1-3.7Zm18 3.5 3.7 1.3 1.1 3.8-2.7 2.7-4-.8-.8-3.9Z"></path>',
      '<path class="ft-v510-3d-gold-shadow" d="M7.2 31.1h33.6v7.8H7.2Z" transform="translate(0 1.2)"></path>',
      '<path class="ft-v510-3d-gold" d="M7.2 30.3h33.6v7.8H7.2Z"></path>',
      '<path class="ft-v510-3d-orange" d="M10 26.8h4.4v11.3H10Zm6.2-3.4h5.2v14.7h-5.2Zm7.2 5h4.1v9.7h-4.1Zm6.1-7.1h5.1v16.8h-5.1Zm6.3 4.1h3.3v12.7h-3.3Z"></path>',
      '<circle class="ft-v510-3d-purple-shadow" cx="24" cy="17.7" r="6.2" transform="translate(.9 1.1)"></circle>',
      '<circle class="ft-v510-3d-purple" cx="24" cy="17" r="6.2"></circle>',
      '<path class="ft-v510-3d-purple-hi ft-v510-3d-stroke" d="M20.7 14.6c1.2-1.3 2.3-1.7 3.7-1.7"></path>',
      '<path class="ft-v510-3d-purple-shadow" d="M14.6 31.7c1-6 4.4-9.1 9.4-9.1s8.4 3.1 9.4 9.1Z" transform="translate(.8 1)"></path>',
      '<path class="ft-v510-3d-purple" d="M14.6 30.9c1-6 4.4-9.1 9.4-9.1s8.4 3.1 9.4 9.1Z"></path>',
      '<circle class="ft-v510-3d-gold" cx="35.8" cy="11.8" r="3.2"></circle>',
      '<path class="ft-v510-3d-gold ft-v510-3d-stroke" d="M35.8 5.9v2.2M35.8 15.5v2.2M29.9 11.8h2.2M39.5 11.8h2.2"></path>'
    ].join(''))
  });

  function decorateHost(host, id, surface) {
    if (!host || !ICONS[id]) return;
    if (host.dataset.v510PracticeIcon === id && host.dataset.v510IconSurface === surface && host.querySelector('.ft-v510-practice-pictogram')) return;
    host.dataset.v510PracticeIcon = id;
    host.dataset.v510IconSurface = surface;
    host.setAttribute('aria-hidden', 'true');
    host.innerHTML = ICONS[id];
  }

  function decorate() {
    document.querySelectorAll('.b27-practice-action[data-b27-practice-action]').forEach(card => {
      const id = card.dataset.b27PracticeAction;
      decorateHost(card.querySelector('.b27-practice-icon'), id, 'practice');
    });

    document.querySelectorAll('.b27-quick-card[data-b27-action]').forEach(card => {
      const id = card.dataset.b27Action;
      if (id !== 'review' && id !== 'listening') return;
      decorateHost(card.querySelector('.b27-quick-icon'), id, 'home');
    });

    root.dataset.v510PracticeIcons = '4';
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
    style: 'premium-3d-pictogram-v4',
    refresh: decorate,
    icons: Object.freeze(Object.keys(ICONS))
  });
})();
