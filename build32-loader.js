(() => {
  'use strict';

  const VERSION = '2.2.0-b32';
  const root = document.documentElement;
  const loadStyle = (href, key) => {
    if (document.querySelector(`link[data-${key}]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset[key] = '1';
    document.head.appendChild(link);
  };
  const loadScript = (src, key) => new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-${key}]`);
    if (existing) {
      if (existing.dataset.loaded === '1') resolve(existing);
      else existing.addEventListener('load', () => resolve(existing), { once:true });
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.dataset[key] = '1';
    script.addEventListener('load', () => { script.dataset.loaded = '1'; resolve(script); }, { once:true });
    script.addEventListener('error', reject, { once:true });
    document.body.appendChild(script);
  });

  async function boot() {
    if (root.dataset.build32Ready === '1') return;
    root.dataset.build32Loading = '1';
    loadStyle(`./curriculum-stage4.css?v=${VERSION}`, 'build32Stage4Style');
    await loadScript(`./curriculum-stage4.js?v=${VERSION}`, 'build32Stage4');
    await loadScript(`./real-life-data-4.js?v=${VERSION}`, 'build32RealLife4');
    await loadScript(`./listening-data-2.js?v=${VERSION}`, 'build32Listening2');
    await loadScript(`./learner-intelligence-v2.js?v=${VERSION}`, 'build32Intelligence');

    window.FrenchTranquilleBuild27Shell?.refresh?.();
    window.FrenchTranquilleDailyCoach?.refresh?.();
    window.FrenchTranquilleRealLifeUX?.refresh?.();
    window.FrenchTranquilleLearnerIntelligence?.refresh?.();
    root.dataset.build32Loading = '0';
    root.dataset.build32Ready = '1';

    const params = new URLSearchParams(location.search);
    if (params.has('b32Audit')) {
      await loadScript(`./build32-smoke.js?v=${VERSION}`, 'build32Smoke');
    }
  }

  boot().catch(error => {
    root.dataset.build32Loading = '0';
    root.dataset.build32Ready = '0';
    root.dataset.build32Error = error?.message || String(error);
    console.error('[French Trân’quille] Build 32 loader failed', error);
  });

  window.FrenchTranquilleBuild32Loader = Object.freeze({ version:'2.2.0', build:32 });
})();