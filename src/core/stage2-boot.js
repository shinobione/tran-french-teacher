import './field-navigation-runtime.js?v=2.3.7-b34.7';

if (window.FrenchTranquilleStage2 && !window.__FT_STAGE2_BOOTED__) {
  window.__FT_STAGE2_BOOTED__ = true;

  const params = new URLSearchParams(location.search);
  const historicalHarness = params.has('b31Audit') || params.has('b30Audit') || params.has('v2Audit') || [...params.keys()].some(key => /smoke/i.test(key));
  const forceFieldNav = params.has('fieldNavV2') || params.has('fieldNavV3');
  const enableFieldNav = !historicalHarness || forceFieldNav;
  const enableFieldAudio = !historicalHarness || params.has('fieldAudioV2');

  const load = (src, key) => {
    if (document.querySelector(`script[data-${key}]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.dataset[key] = '1';
    document.head.appendChild(script);
  };

  if (enableFieldNav && !window.FrenchTranquilleFieldNavigation) load('./field-navigation-runtime.js?v=2.3.7-b34.7', 'fieldNavigationRuntime');
  if (enableFieldAudio) load('./field-audio-session.js?v=2.3.1-b34.1', 'fieldAudioSessionV2');

  requestAnimationFrame(() => document.querySelector('.bottom-nav [data-go="home"]')?.click());
}