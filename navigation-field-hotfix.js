(() => {
  'use strict';
  const root = document.documentElement;

  function listeningOpen() {
    return Boolean(document.querySelector('#listening-overlay, .listening-overlay')) || root.classList.contains('listening-open');
  }

  function precloseListening(event) {
    const nav = event.target?.closest?.('.ux-bottom-nav [data-ux-nav]');
    if (!nav || !listeningOpen()) return;
    window.FrenchTranquilleListening?.close?.();
    root.dataset.fieldNavPreclosed = nav.dataset.uxNav || '';
    root.dataset.fieldNavPrecloseCount = String(Number(root.dataset.fieldNavPrecloseCount || 0) + 1);
    queueMicrotask(() => {
      window.FrenchTranquilleUX?.refresh?.();
      window.FrenchTranquilleBuild27Shell?.refresh?.();
    });
  }

  window.addEventListener('pointerdown', precloseListening, true);
  window.addEventListener('mousedown', precloseListening, true);
  window.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') precloseListening(event);
  }, true);

  window.FrenchTranquilleNavigationFieldHotfix = Object.freeze({
    version: '2.2.1', build: '32.1', listeningOpen
  });
})();
