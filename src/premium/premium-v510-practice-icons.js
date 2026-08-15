(() => {
  'use strict';

  const VERSION = '2.3.31-v510png1';
  const root = document.documentElement;
  let scheduled = false;

  const ASSETS = Object.freeze({
    conversation: './assets/premium/practice/speak-premium.webp',
    listening: './assets/premium/practice/listen-premium.webp',
    review: './assets/premium/practice/review-premium.webp',
    'real-life': './assets/premium/practice/real-life-premium.webp'
  });

  function buildArt(id) {
    const img = document.createElement('img');
    img.className = 'ft-v510-practice-art';
    img.dataset.v510Pictogram = id;
    img.src = ASSETS[id];
    img.alt = '';
    img.decoding = 'async';
    img.loading = 'eager';
    img.draggable = false;
    img.setAttribute('aria-hidden', 'true');
    return img;
  }

  function decorateHost(host, id, surface) {
    if (!host || !ASSETS[id]) return;
    const current = host.querySelector('.ft-v510-practice-art');
    if (
      host.dataset.v510PracticeIcon === id &&
      host.dataset.v510IconSurface === surface &&
      current?.getAttribute('src') === ASSETS[id]
    ) return;

    host.dataset.v510PracticeIcon = id;
    host.dataset.v510IconSurface = surface;
    host.setAttribute('aria-hidden', 'true');
    host.replaceChildren(buildArt(id));
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

    root.dataset.v510PracticeIcons = 'approved-art-v1';
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      decorate();
    });
  }

  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  window.addEventListener('focus', schedule);
  schedule();

  window.FrenchTranquilleV510PracticeIcons = Object.freeze({
    version: VERSION,
    style: 'approved-premium-art-v1',
    refresh: decorate,
    assets: ASSETS,
    icons: Object.freeze(Object.keys(ASSETS))
  });
})();
