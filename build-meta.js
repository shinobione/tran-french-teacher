// Production baseline this hotfix is applied on. Kept explicit so Build 24
// compatibility contracts can still prove which release is being patched.
const PRODUCTION_BASELINE = { version: '1.17.0', build: 24 };
const META = { version: '1.17.2', build: 24.2, baseline: PRODUCTION_BASELINE };

window.FrenchTranquilleBuildMeta = META;

[
  'FrenchTranquilleCurriculum','LucieVoice','FrenchTranquilleFreeVoice','FrenchTranquilleStage2',
  'FrenchTranquilleStage3','FrenchTranquilleDailyCoach','FrenchTranquilleMastery',
  'FrenchTranquilleMasteryStage3','FrenchTranquilleScenarioData','FrenchTranquilleScenarios',
  'FrenchTranquilleRealLife1','FrenchTranquilleRealLife2','FrenchTranquilleRealLifeUX',
  'FrenchTranquilleErrors','FrenchTranquilleListening','FrenchTranquilleLanguage','FrenchTranquilleUX',
  'FrenchTranquilleSafety'
].forEach(name => {
  const api = window[name];
  if (api && typeof api === 'object') {
    api.version = META.version;
    api.build = META.build;
  }
});

function patchDiagnostics() {
  document.querySelectorAll('.diagnostics > div').forEach(row => {
    const label = row.querySelector('span')?.textContent?.trim()?.toLocaleLowerCase();
    const value = row.querySelector('strong');
    if (!value) return;
    if (label === 'version' || label === 'phiên bản') {
      const next = `v${META.version} • Build ${META.build}`;
      // IMPORTANT: this observer watches #app. Replacing textContent with the
      // same value creates another childList mutation and can loop forever on
      // the Settings screen. Only touch the DOM when the value really changes.
      if (value.textContent !== next) value.textContent = next;
    }
  });
}

patchDiagnostics();
const app = document.getElementById('app');
if (app) new MutationObserver(patchDiagnostics).observe(app, { subtree: true, childList: true });
