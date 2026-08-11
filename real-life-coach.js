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
    return pack3().find(s => title.includes(s.titleVi) || title.includes(s.titleFr)) || null;
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
    const ids = new Set(window.FrenchTranquilleRealLife3?.scenarioIds || []);
    const tiles = [...document.querySelectorAll('.scenario-tile.unlocked')];
    const pack3Open = tiles.filter(tile => ids.has(tile.dataset.scenarioStart || '')).length;
    document.documentElement.dataset.realLifePack3Open = String(pack3Open);
    document.documentElement.dataset.realLifePack3Total = String(ids.size);
    document.documentElement.dataset.realLifeVisibleTiles = String(
      tiles.filter(tile => !tile.classList.contains('real-life-open-hidden')).length
    );
  }

  function refresh() {
    decorateRunner();
    publishSmoke();
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; refresh(); });
  }

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
  refresh();

  window.FrenchTranquilleRealLifeCoach = {
    version:'1.18.0',build:25,refresh
  };
})();
