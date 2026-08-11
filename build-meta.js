const META = { version: '1.10.0', build: 17 };

window.FrenchTranquilleBuildMeta = META;

if (window.FrenchTranquilleCurriculum) {
  window.FrenchTranquilleCurriculum.version = META.version;
  window.FrenchTranquilleCurriculum.build = META.build;
}

if (window.LucieVoice) {
  window.LucieVoice.version = META.version;
  window.LucieVoice.build = META.build;
}

if (window.FrenchTranquilleFreeVoice) {
  window.FrenchTranquilleFreeVoice.version = META.version;
  window.FrenchTranquilleFreeVoice.build = META.build;
}

if (window.FrenchTranquilleStage2) {
  window.FrenchTranquilleStage2.version = META.version;
  window.FrenchTranquilleStage2.build = META.build;
}

if (window.FrenchTranquilleDailyCoach) {
  window.FrenchTranquilleDailyCoach.version = META.version;
  window.FrenchTranquilleDailyCoach.build = META.build;
}

if (window.FrenchTranquilleMastery) {
  window.FrenchTranquilleMastery.version = META.version;
  window.FrenchTranquilleMastery.build = META.build;
}

if (window.FrenchTranquilleScenarioData) {
  window.FrenchTranquilleScenarioData.version = META.version;
  window.FrenchTranquilleScenarioData.build = META.build;
}

if (window.FrenchTranquilleScenarios) {
  window.FrenchTranquilleScenarios.version = META.version;
  window.FrenchTranquilleScenarios.build = META.build;
}

function patchDiagnostics() {
  document.querySelectorAll('.diagnostics > div').forEach(row => {
    const label = row.querySelector('span')?.textContent?.trim()?.toLocaleLowerCase();
    const value = row.querySelector('strong');
    if (!value) return;
    if (label === 'version' || label === 'phiên bản') {
      const expected = `v${META.version} • Build ${META.build}`;
      if (value.textContent !== expected) value.textContent = expected;
    }
  });
}

patchDiagnostics();
const app = document.getElementById('app');
if (app) {
  new MutationObserver(patchDiagnostics).observe(app, { subtree: true, childList: true });
}
