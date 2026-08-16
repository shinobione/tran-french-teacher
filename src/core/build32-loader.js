(() => {
  'use strict';

  const VERSION = '2.2.0-b32';
  const FOUNDATIONS = '2.3.0-b34';
  const RUNTIME_META = Object.freeze({
    version:'2.4.0',
    build:'36',
    pedagogyBaseline:Object.freeze({ version:'2.3.0', build:'34' })
  });
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

  function installRuntimeMeta() {
    window.FrenchTranquilleRuntimeMeta = RUNTIME_META;
    window.FrenchTranquillePedagogyBaseline = RUNTIME_META.pedagogyBaseline;
    root.dataset.runtimeVersion = RUNTIME_META.version;
    root.dataset.runtimeBuild = RUNTIME_META.build;
    root.dataset.pedagogyVersion = RUNTIME_META.pedagogyBaseline.version;
    root.dataset.pedagogyBuild = RUNTIME_META.pedagogyBaseline.build;

    const meta = window.FrenchTranquilleBuildMeta;
    if (meta && typeof meta === 'object' && !Object.isFrozen(meta)) {
      Object.defineProperty(meta, 'version', {
        configurable:true,
        enumerable:true,
        get:() => RUNTIME_META.version,
        set:() => {}
      });
      Object.defineProperty(meta, 'build', {
        configurable:true,
        enumerable:true,
        get:() => RUNTIME_META.build,
        set:() => {}
      });
      meta.pedagogyBaseline = RUNTIME_META.pedagogyBaseline;
    }

    document.querySelectorAll('.diagnostics > div').forEach(row => {
      const label = row.querySelector('span')?.textContent?.trim()?.toLocaleLowerCase();
      const value = row.querySelector('strong');
      if (!value || (label !== 'version' && label !== 'phiên bản')) return;
      value.textContent = `v${RUNTIME_META.version} • Build ${RUNTIME_META.build}`;
    });

    window.dispatchEvent(new CustomEvent('french-tranquille:runtime-meta-change', {
      detail:{
        version:RUNTIME_META.version,
        build:RUNTIME_META.build,
        pedagogyBaseline:RUNTIME_META.pedagogyBaseline
      }
    }));
  }

  async function boot() {
    if (root.dataset.build32Ready === '1') return;
    root.dataset.build32Loading = '1';
    loadStyle(`./src/pedagogy/curriculum-stage4.css?v=${VERSION}`, 'build32Stage4Style');
    await loadScript(`./src/pedagogy/curriculum-stage4.js?v=${VERSION}`, 'build32Stage4');
    await loadScript(`./src/core/build32-shell-extension.js?v=${VERSION}`, 'build32Shell');
    await loadScript(`./src/pedagogy/real-life-data-4.js?v=${VERSION}`, 'build32RealLife4');
    await loadScript(`./src/pedagogy/listening-data-2.js?v=${VERSION}`, 'build32Listening2');
    await loadScript(`./src/pedagogy/learner-intelligence-v2.js?v=${VERSION}`, 'build32Intelligence');

    window.FrenchTranquilleBuild27Shell?.refresh?.();
    window.FrenchTranquilleBuild32Shell?.refresh?.();
    window.FrenchTranquilleDailyCoach?.refresh?.();
    window.FrenchTranquilleRealLifeUX?.refresh?.();
    window.FrenchTranquilleLearnerIntelligence?.refresh?.();
    root.dataset.build32Loading = '0';
    root.dataset.build32Ready = '1';

    const params = new URLSearchParams(location.search);
    if (params.has('b32Audit')) {
      await loadScript(`./tests/smoke/build32-smoke.js?v=${VERSION}`, 'build32Smoke');
      return;
    }

    const historical = params.has('b31Audit') || params.has('b30Audit') || params.has('v2Audit');
    if (!historical) {
      await loadScript(`./src/pedagogy/foundations-pilot.js?v=${FOUNDATIONS}`, 'foundationsPilot');
      installRuntimeMeta();
      window.FrenchTranquilleBuild27Shell?.refresh?.();
      window.FrenchTranquilleBuild32Shell?.refresh?.();
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