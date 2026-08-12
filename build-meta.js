// Production baseline kept explicit for historical CI contracts.
const PRODUCTION_BASELINE = { version: '1.17.0', build: 24 };
const META = { version: '1.20.0', build: '27', baseline: PRODUCTION_BASELINE };

window.FrenchTranquilleBuildMeta = META;

[
  'FrenchTranquilleCurriculum','LucieVoice','FrenchTranquilleFreeVoice','FrenchTranquilleStage2',
  'FrenchTranquilleStage3','FrenchTranquilleDailyCoach','FrenchTranquilleMastery',
  'FrenchTranquilleMasteryStage3','FrenchTranquilleScenarioData','FrenchTranquilleScenarios',
  'FrenchTranquilleRealLife1','FrenchTranquilleRealLife2','FrenchTranquilleRealLife3',
  'FrenchTranquilleRealLifeUX','FrenchTranquilleRealLifeCoach',
  'FrenchTranquilleErrors','FrenchTranquilleListening','FrenchTranquilleLanguage','FrenchTranquilleUX',
  'FrenchTranquilleInteraction','FrenchTranquilleSafety','FrenchTranquilleProgressionUX',
  'FrenchTranquilleSessionUX','FrenchTranquilleSessionUXAdapter','FrenchTranquilleVoiceReplay',
  'FrenchTranquilleProgressDetailsDashboard','FrenchTranquilleBuild263UX','FrenchTranquilleBuild264UX',
  'FrenchTranquilleBuild265UX','FrenchTranquilleBuild266UX','FrenchTranquilleBuild267UX',
  'FrenchTranquilleBuild268UX','FrenchTranquilleBuild269UX','FrenchTranquilleBuild27Shell'
].forEach(name => {
  const api = window[name];
  if (api && typeof api === 'object') {
    api.version = META.version;
    api.build = META.build;
  }
});

// voice-ios.js accepts >= 0.65. Keep slow exactly on that safe floor so the
// Listening bridge cannot fall back to the configured teacher voice's default ~0.84 rate.
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
    // Cosmetic motion never owns state: a skipped frame cannot leave an
    // otherwise-ready page semi-transparent indefinitely.
    setTimeout(settle, 48);
  };

  const alignOverlayToNav = (overlay, nav) => {
    if (!(overlay instanceof HTMLElement) || !(nav instanceof HTMLElement)) return;
    const overlayRect = overlay.getBoundingClientRect();
    const navTop = nav.getBoundingClientRect().top;
    const currentBottom = Number.parseFloat(getComputedStyle(overlay).bottom) || 0;
    const delta = overlayRect.bottom - navTop;
    if (Math.abs(delta) > 0.5) {
      overlay.style.bottom = `${Math.max(0, currentBottom + delta)}px`;
    }
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
      // Measure the surfaces themselves instead of inferring a viewport height.
      // This stays correct in Safari, iframes, safe-area layouts and headless Chrome.
      alignOverlayToNav(overlay, nav);
      settleOverlay(overlay);
      requestAnimationFrame(() => alignOverlayToNav(overlay, nav));
    });
  };

  const sync = () => {
    syncTabState();
    syncOverlayGeometry();
  };

  new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.type === 'attributes' && mutation.attributeName === 'class')) syncTabState();
  }).observe(root, { attributes:true, attributeFilter:['class'] });
  new MutationObserver(mutations => {
    mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
      if (node instanceof HTMLElement && node.classList.contains('b27-overlay')) settleOverlay(node);
    }));
    syncOverlayGeometry();
  }).observe(document.body, { childList:true });
  window.addEventListener('resize', syncOverlayGeometry, { passive:true });
  window.addEventListener('orientationchange', syncOverlayGeometry, { passive:true });

  root.__frenchTranquilleBuild27ShellBridges = true;
  queueMicrotask(sync);
  window.FrenchTranquilleBuild27ShellBridges = { version:META.version, build:META.build, refresh:sync };
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
if (app) new MutationObserver(patchDiagnostics).observe(app, { subtree: true, childList: true });