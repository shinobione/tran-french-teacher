const META = { version: '1.7.1', build: 14 };

window.FrenchTranquilleBuildMeta = META;

if (window.FrenchTranquilleCurriculum) {
  window.FrenchTranquilleCurriculum.version = META.version;
  window.FrenchTranquilleCurriculum.build = META.build;
}

if (window.LucieVoice) {
  window.LucieVoice.version = META.version;
  window.LucieVoice.build = META.build;
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
