// Production baseline this interaction hotfix is applied on.
const PRODUCTION_BASELINE = { version: '1.17.0', build: 24 };
const META = { version: '1.17.3', build: 24.3, baseline: PRODUCTION_BASELINE };

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
