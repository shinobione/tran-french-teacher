(() => {
  'use strict';
  const root = document.documentElement;
  const navButtons = () => [...document.querySelectorAll('.ux-bottom-nav [data-ux-nav]')];

  function sync() {
    if (!root.classList.contains('b27-app-shell')) return;
    if (root.classList.contains('b27-practice-open')) {
      navButtons().forEach(button => button.classList.toggle('active', button.dataset.uxNav === 'practice'));
      return;
    }
    // Outside the custom Practice page, the historical UX shell remains the
    // single owner of tab state. Refresh is idempotent and preserves node identity.
    window.FrenchTranquilleUX?.refresh?.();
  }

  const observer = new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.type === 'attributes' && mutation.attributeName === 'class')) sync();
  });
  observer.observe(root, { attributes:true, attributeFilter:['class'] });
  queueMicrotask(sync);

  window.FrenchTranquilleBuild27NavState = { version:'1.20.0', build:27, refresh:sync };
})();