if (window.FrenchTranquilleStage2 && !window.__FT_STAGE2_BOOTED__) {
  window.__FT_STAGE2_BOOTED__ = true;

  const loadFieldFix = (src, key) => {
    if (document.querySelector(`script[data-${key}]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.dataset[key] = '1';
    document.head.appendChild(script);
  };

  loadFieldFix('./mediarecorder-ios-compat.js?v=2.2.1-b32.1', 'fieldMediaRecorderCompat');
  loadFieldFix('./navigation-field-hotfix.js?v=2.2.1-b32.1', 'fieldNavigationHotfix');

  requestAnimationFrame(() => {
    const home = document.querySelector('.bottom-nav [data-go="home"]');
    if (home) home.click();
  });
}
