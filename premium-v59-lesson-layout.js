(() => {
  'use strict';

  const VERSION = '2.3.24-v59b1';
  const root = document.documentElement;
  let scheduled = false;

  function decorateHero(card) {
    if (!(card instanceof HTMLElement)) return;
    card.classList.add('ft-v59-lesson-hero');
    card.dataset.v59LessonLayout = '1';

    const topline = card.querySelector(':scope > .b27-card-topline');
    if (topline) {
      topline.classList.add('ft-v59-lesson-identity');
      const icon = topline.querySelector(':scope > b');
      const badge = topline.querySelector(':scope > span');
      icon?.classList.add('ft-v59-lesson-identity-icon');
      badge?.classList.add('ft-v59-lesson-identity-badge');
    }

    card.querySelector(':scope > h2')?.classList.add('ft-v59-lesson-title');
    card.querySelector(':scope > p')?.classList.add('ft-v59-lesson-copy');
    card.querySelector(':scope > .b27-progress')?.classList.add('ft-v59-lesson-progress');
    card.querySelectorAll(':scope > .b27-primary-action,:scope > .b27-secondary-action')
      .forEach(action => action.classList.add('ft-v59-lesson-action'));
  }

  function decorate() {
    document.querySelectorAll('.b27-home .b27-primary-card').forEach(decorateHero);
    root.dataset.v59LessonLayout = '1';
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      decorate();
    });
  }

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app, { childList:true, subtree:true });
  new MutationObserver(schedule).observe(document.body, { childList:true, subtree:true });
  window.addEventListener('resize', schedule, { passive:true });

  schedule();
  window.FrenchTranquillePremiumV59LessonLayout = Object.freeze({
    version: VERSION,
    refresh: decorate
  });
})();
