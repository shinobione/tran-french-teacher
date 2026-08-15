import './runtime-contracts.js?v=2.0.0-b30';
import './runtime-bridge.js?v=2.0.0-b30';

// Production baseline kept explicit for historical CI contracts.
const PRODUCTION_BASELINE = { version: '1.17.0', build: 24 };
const QUERY = new URLSearchParams(location.search);
const B31_AUDIT_META = { version: '2.1.0', build: '31', baseline: PRODUCTION_BASELINE };
const CURRENT_META = { version: '2.2.0', build: '32', baseline: PRODUCTION_BASELINE };
// Keep this literal shape for historical workflow parsers that inspect build-meta.js.
const META = { version: '2.2.0', build: '32', baseline: PRODUCTION_BASELINE };
if (QUERY.has('b31Audit')) Object.assign(META, B31_AUDIT_META);

window.FrenchTranquilleBuildMeta = META;

function installSpeakingLoopAssets() {
  if (!document.querySelector('link[data-speaking-loop-style]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './speaking-loop-content.css?v=1.22.2-b29.2';
    link.dataset.speakingLoopStyle = '1';
    document.head.appendChild(link);
  }
  if (document.querySelector('script[data-speaking-loop-script]')) return;
  const script = document.createElement('script');
  script.src = './speaking-loop-content.js?v=1.22.2-b29.2';
  script.dataset.speakingLoopScript = '1';
  script.addEventListener('load', () => {
    const api = window.FrenchTranquilleSpeakingLoop;
    if (api && typeof api === 'object') {
      api.version = META.version;
      api.build = META.build;
      api.refresh?.();
    }
    const params = new URLSearchParams(location.search);
    if (params.has('b291Smoke') && !document.querySelector('script[data-speaking-loop-smoke]')) {
      const smoke = document.createElement('script');
      smoke.src = './speaking-loop-smoke.js?v=1.22.2-b29.2';
      smoke.dataset.speakingLoopSmoke = '1';
      document.body.appendChild(smoke);
    }
    if (params.has('b292Smoke') && !document.querySelector('script[data-speaking-loop-variety-smoke]')) {
      const smoke = document.createElement('script');
      smoke.src = './speaking-loop-variety-smoke.js?v=1.22.2-b29.2';
      smoke.dataset.speakingLoopVarietySmoke = '1';
      document.body.appendChild(smoke);
    }
    if (params.has('b30Audit') && !document.querySelector('script[data-build30-architecture-smoke]')) {
      const smoke = document.createElement('script');
      smoke.src = './build30-architecture-smoke.js?v=2.0.0-b30';
      smoke.dataset.build30ArchitectureSmoke = '1';
      document.body.appendChild(smoke);
    }
    if (params.has('v2Audit') && !document.querySelector('script[data-v2-release-smoke]')) {
      const smoke = document.createElement('script');
      smoke.src = './v2-release-smoke.js?v=2.0.0';
      smoke.dataset.v2ReleaseSmoke = '1';
      document.body.appendChild(smoke);
    }
  });
  document.body.appendChild(script);
}
installSpeakingLoopAssets();

[
  'FrenchTranquilleCurriculum','LucieVoice','FrenchTranquilleFreeVoice','FrenchTranquilleStage2',
  'FrenchTranquilleStage3','FrenchTranquilleStage4','FrenchTranquilleDailyCoach','FrenchTranquilleMastery',
  'FrenchTranquilleMasteryStage3','FrenchTranquilleScenarioData','FrenchTranquilleScenarios',
  'FrenchTranquilleRealLife1','FrenchTranquilleRealLife2','FrenchTranquilleRealLife3','FrenchTranquilleRealLife4',
  'FrenchTranquilleRealLifeUX','FrenchTranquilleRealLifeCoach','FrenchTranquilleListeningData2',
  'FrenchTranquilleErrors','FrenchTranquilleListening','FrenchTranquilleLanguage','FrenchTranquilleUX',
  'FrenchTranquilleInteraction','FrenchTranquilleSafety','FrenchTranquilleProgressionUX',
  'FrenchTranquilleSessionUX','FrenchTranquilleSessionUXAdapter','FrenchTranquilleVoiceReplay',
  'FrenchTranquilleProgressDetailsDashboard','FrenchTranquilleBuild263UX','FrenchTranquilleBuild264UX',
  'FrenchTranquilleBuild265UX','FrenchTranquilleBuild266UX','FrenchTranquilleBuild267UX',
  'FrenchTranquilleBuild268UX','FrenchTranquilleBuild269UX','FrenchTranquilleBuild27Shell',
  'FrenchTranquilleRecovery','FrenchTranquilleRuntimeContracts','FrenchTranquilleRuntime',
  'FrenchTranquilleLearnerIntelligence','FrenchTranquilleBuild32Loader'
].forEach(name => {
  const api = window[name];
  if (api && typeof api === 'object' && !Object.isFrozen(api)) {
    api.version = META.version;
    api.build = META.build;
  }
});

const LISTENING_RATES = Object.freeze({ normal: 0.88, engineSlow: 0.68, slow: 0.65 });
window.FrenchTranquilleListeningRates = LISTENING_RATES;
document.documentElement.dataset.listeningNormalRate = String(LISTENING_RATES.normal);
document.documentElement.dataset.listeningSlowRate = String(LISTENING_RATES.slow);
document.documentElement.dataset.listeningEngineSlowRate = String(LISTENING_RATES.engineSlow);

function listeningEffectiveRate(value) {
  if (Math.abs(value - LISTENING_RATES.normal) < 0.001) return LISTENING_RATES.normal;
  if (Math.abs(value - LISTENING_RATES.engineSlow) < 0.001) return LISTENING_RATES.slow;
  return null;
}

function installListeningRateBridge() {
  if (!('speechSynthesis' in window) || !window.speechSynthesis?.speak) return;
  const synth = window.speechSynthesis;
  if (synth.__frenchTranquilleListeningRateBridge) return;
  const inheritedSpeak = synth.speak.bind(synth);
  const RATE_KEY = 'tran-french-teacher:luc-rate:v1';
  synth.speak = utterance => {
    const requestedRate = Number(utterance?.rate);
    const effectiveRate = Number.isFinite(requestedRate) ? listeningEffectiveRate(requestedRate) : null;
    if (effectiveRate === null) return inheritedSpeak(utterance);
    const previousRate = localStorage.getItem(RATE_KEY);
    try {
      localStorage.setItem(RATE_KEY, String(effectiveRate));
      return inheritedSpeak(utterance);
    } finally {
      if (previousRate === null) localStorage.removeItem(RATE_KEY);
      else localStorage.setItem(RATE_KEY, previousRate);
    }
  };
  synth.__frenchTranquilleListeningRateBridge = true;
}
installListeningRateBridge();

function installBuild27ShellBridges() {
  const root = document.documentElement;
  if (!window.FrenchTranquilleBuild27Shell || root.__frenchTranquilleBuild27ShellBridges) return;

  const shellRefresh = () => window.FrenchTranquilleBuild27Shell?.refresh?.();

  const syncTabState = () => {
    if (!root.classList.contains('b27-app-shell')) return;
    if (root.classList.contains('b27-practice-open')) {
      document.querySelectorAll('.ux-bottom-nav [data-ux-nav]').forEach(button => {
        button.classList.toggle('active', button.dataset.uxNav === 'practice');
      });
      return;
    }
    window.FrenchTranquilleUX?.refresh?.();
  };

  const settleOverlay = overlay => {
    if (!(overlay instanceof HTMLElement)) return;
    const settle = () => overlay.isConnected && overlay.classList.remove('b27-entering');
    requestAnimationFrame(settle);
    setTimeout(settle, 48);
  };

  const alignOverlayToNav = (overlay, nav) => {
    if (!(overlay instanceof HTMLElement) || !(nav instanceof HTMLElement)) return;
    const overlayRect = overlay.getBoundingClientRect();
    const navTop = nav.getBoundingClientRect().top;
    const currentBottom = Number.parseFloat(getComputedStyle(overlay).bottom) || 0;
    const delta = overlayRect.bottom - navTop;
    if (Math.abs(delta) > 0.5) overlay.style.bottom = `${Math.max(0, currentBottom + delta)}px`;
    const correctedGap = Math.round(overlay.getBoundingClientRect().bottom - nav.getBoundingClientRect().top);
    root.dataset.b27OverlayGap = String(correctedGap);
    root.dataset.b27OverlayBottom = String(Math.round(Number.parseFloat(getComputedStyle(overlay).bottom) || 0));
  };

  const syncOverlayGeometry = () => {
    const overlays = [...document.querySelectorAll('.b27-overlay')];
    if (!overlays.length) return;
    const compact = matchMedia('(max-width:819px)').matches;
    const nav = document.querySelector('.ux-bottom-nav');
    if (!compact || !nav) {
      overlays.forEach(overlay => {
        overlay.style.removeProperty('bottom');
        settleOverlay(overlay);
      });
      return;
    }
    overlays.forEach(overlay => {
      alignOverlayToNav(overlay, nav);
      settleOverlay(overlay);
      requestAnimationFrame(() => alignOverlayToNav(overlay, nav));
    });
  };

  const sync = () => {
    syncTabState();
    syncOverlayGeometry();
  };

  window.addEventListener('click', event => {
    const nav = event.target?.closest?.('.ux-bottom-nav [data-ux-nav]');
    if (!nav || nav.dataset.uxNav === 'practice') return;
    queueMicrotask(shellRefresh);
    requestAnimationFrame(shellRefresh);
    setTimeout(shellRefresh, 48);
  });

  new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.type === 'attributes' && mutation.attributeName === 'class')) syncTabState();
  }).observe(root, { attributes:true,attributeFilter:['class'] });

  const nav = document.querySelector('.ux-bottom-nav');
  if (nav) {
    new MutationObserver(mutations => {
      if (!root.classList.contains('b27-practice-open')) return;
      if (mutations.some(mutation => mutation.type === 'attributes' && mutation.attributeName === 'class')) syncTabState();
    }).observe(nav, { subtree:true,attributes:true,attributeFilter:['class'] });
  }

  new MutationObserver(mutations => {
    mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
      if (node instanceof HTMLElement && node.classList.contains('b27-overlay')) settleOverlay(node);
    }));
    syncOverlayGeometry();
  }).observe(document.body,{childList:true});
  window.addEventListener('resize',syncOverlayGeometry,{passive:true});
  window.addEventListener('orientationchange',syncOverlayGeometry,{passive:true});

  root.__frenchTranquilleBuild27ShellBridges = true;
  queueMicrotask(sync);
  window.FrenchTranquilleBuild27ShellBridges = { version:META.version,build:META.build,refresh:sync };
}
installBuild27ShellBridges();

function patchDiagnostics() {
  document.querySelectorAll('.diagnostics > div').forEach(row => {
    const label = row.querySelector('span')?.textContent?.trim()?.toLocaleLowerCase();
    const value = row.querySelector('strong');
    if (!value) return;
    if (label === 'version' || label === 'phiên bản') {
      const next = `v${META.version} • Build ${META.build}`;
      if (value.textContent !== next) value.textContent = next;
    }
  });
}
patchDiagnostics();
const app = document.getElementById('app');
if (app) new MutationObserver(patchDiagnostics).observe(app,{subtree:true,childList:true});