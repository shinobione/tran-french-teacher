(() => {
  'use strict';

  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const smoke = new URLSearchParams(location.search).get('realLifeSmoke');
  let scheduled = false;

  function pack3() {
    return window.FrenchTranquilleRealLife3?.scenarios || [];
  }

  function activePack3Scenario() {
    const title = document.querySelector('.scenario-runner-head h2')?.textContent || '';
    return pack3().find(scenario => title.includes(scenario.titleVi) || title.includes(scenario.titleFr)) || null;
  }

  function decorateRunner() {
    const runner = document.querySelector('.screen-conversation .scenario-runner');
    if (!runner) return;
    const scenario = activePack3Scenario();
    let note = runner.querySelector('.real-life-open-note');
    if (!scenario) {
      note?.remove();
      return;
    }
    if (!note) {
      note = document.createElement('div');
      note.className = 'real-life-open-note';
      const head = runner.querySelector('.scenario-runner-head');
      head?.insertAdjacentElement('afterend', note);
    }
    const text = T(
      '💬 Bạn có thể trả lời bằng cách của mình. Một câu đơn giản và đúng ý là đủ.',
      '💬 Tu peux répondre avec tes mots. Une phrase simple qui exprime la bonne idée suffit.'
    );
    if (note && note.textContent !== text) note.textContent = text;
  }

  function publishSmoke() {
    if (!smoke) return;
    const api = window.FrenchTranquilleRealLife3;
    const ids = new Set(api?.scenarioIds || []);
    const unlockedTiles = [...document.querySelectorAll('.scenario-tile.unlocked')];
    const pack3Open = unlockedTiles.filter(tile => ids.has(tile.dataset.scenarioStart || '')).length;
    const visibleUnlocked = unlockedTiles.filter(tile => !tile.classList.contains('real-life-open-hidden')).length;
    const scenarioApi = window.FrenchTranquilleScenarioData;
    const scenarioCount = scenarioApi?.scenarios?.length || 0;
    const turnCount = scenarioApi?.scenarios?.reduce((sum, scenario) => sum + (scenario.turns?.length || 0), 0) || 0;

    document.documentElement.dataset.realLifePack3Open = String(pack3Open);
    document.documentElement.dataset.realLifePack3Total = String(ids.size);
    document.documentElement.dataset.realLifeVisibleTiles = String(visibleUnlocked);
    document.documentElement.dataset.realLifeScenarioTotal = String(scenarioCount);
    document.documentElement.dataset.realLifeTurnTotal = String(turnCount);
    document.documentElement.dataset.realLifeResolutionTotal = String(api?.resolution?.length || 0);
    document.documentElement.dataset.realLifeResolutionInvalid = String(api?.invalidResolution?.length || 0);
  }

  function refresh() {
    decorateRunner();
    publishSmoke();
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      refresh();
    });
  }

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app, { childList: true, subtree: true });
  refresh();

  window.FrenchTranquilleRealLifeCoach = {
    version: '1.19.0', build: 26, refresh
  };
})();