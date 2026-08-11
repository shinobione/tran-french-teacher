// Production baseline kept explicit for historical CI contracts.
const PRODUCTION_BASELINE = { version: '1.17.0', build: 24 };
const META = { version: '1.19.1', build: 26.1, baseline: PRODUCTION_BASELINE };

window.FrenchTranquilleBuildMeta = META;

[
  'FrenchTranquilleCurriculum','LucieVoice','FrenchTranquilleFreeVoice','FrenchTranquilleVoiceReplay','FrenchTranquilleStage2',
  'FrenchTranquilleStage3','FrenchTranquilleDailyCoach','FrenchTranquilleMastery',
  'FrenchTranquilleMasteryStage3','FrenchTranquilleScenarioData','FrenchTranquilleScenarios',
  'FrenchTranquilleRealLife1','FrenchTranquilleRealLife2','FrenchTranquilleRealLife3',
  'FrenchTranquilleRealLifeUX','FrenchTranquilleRealLifeCoach',
  'FrenchTranquilleErrors','FrenchTranquilleListening','FrenchTranquilleLanguage','FrenchTranquilleUX',
  'FrenchTranquilleInteraction','FrenchTranquilleSafety','FrenchTranquilleProgressionUX',
  'FrenchTranquilleSessionUX','FrenchTranquilleSessionUXAdapter'
].forEach(name => {
  const api = window[name];
  if (api && typeof api === 'object') {
    api.version = META.version;
    api.build = META.build;
  }
});

const LISTENING_RATES = Object.freeze({ normal: 0.88, engineSlow: 0.68, slow: 0.64 });
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