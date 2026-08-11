// Production baseline this navigation-state hotfix is applied on.
const PRODUCTION_BASELINE = { version: '1.17.0', build: 24 };
const META = { version: '1.17.5', build: 24.5, baseline: PRODUCTION_BASELINE };

window.FrenchTranquilleBuildMeta = META;

[
  'FrenchTranquilleCurriculum','LucieVoice','FrenchTranquilleFreeVoice','FrenchTranquilleStage2',
  'FrenchTranquilleStage3','FrenchTranquilleDailyCoach','FrenchTranquilleMastery',
  'FrenchTranquilleMasteryStage3','FrenchTranquilleScenarioData','FrenchTranquilleScenarios',
  'FrenchTranquilleRealLife1','FrenchTranquilleRealLife2','FrenchTranquilleRealLifeUX',
  'FrenchTranquilleErrors','FrenchTranquilleListening','FrenchTranquilleLanguage','FrenchTranquilleUX',
  'FrenchTranquilleInteraction','FrenchTranquilleSafety'
].forEach(name => {
  const api = window[name];
  if (api && typeof api === 'object') {
    api.version = META.version;
    api.build = META.build;
  }
});

// Listening explicitly requests two pedagogical speech rates (.88 normal / .68 slow).
// voice-ios.js intentionally owns the selected French voice and the global Lucie rate,
// so it normally normalizes every utterance to that global rate. Preserve Listening's
// explicit rate only for those two known values, without modifying the sanctuarized
// voice runtime or the user's saved Lucie speed.
function installListeningRateBridge() {
  if (!('speechSynthesis' in window) || !window.speechSynthesis?.speak) return;
  const synth = window.speechSynthesis;
  if (synth.__frenchTranquilleListeningRateBridge) return;

  const inheritedSpeak = synth.speak.bind(synth);
  const RATE_KEY = 'tran-french-teacher:luc-rate:v1';
  const isListeningRate = value => Math.abs(value - 0.88) < 0.001 || Math.abs(value - 0.68) < 0.001;

  synth.speak = utterance => {
    const requestedRate = Number(utterance?.rate);
    if (!Number.isFinite(requestedRate) || !isListeningRate(requestedRate)) {
      return inheritedSpeak(utterance);
    }

    const previousRate = localStorage.getItem(RATE_KEY);
    try {
      localStorage.setItem(RATE_KEY, String(requestedRate));
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
