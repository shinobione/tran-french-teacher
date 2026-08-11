(() => {
  'use strict';

  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const smoke = new URLSearchParams(location.search).get('realLifeSmoke');
  const MAX_OPEN = 6;
  let showAllOpen = false;
  let showAllLocked = false;
  let scheduled = false;

  const setText = (node, value) => {
    if (node && node.textContent !== value) node.textContent = value;
  };

  function scenarioRank(id = '') {
    const s = window.FrenchTranquilleScenarioData?.scenarios?.find(x => x.id === id);
    if (!s) return 0;
    return Math.max(0, ...(s.requiredLessons || []).map(key => Number(String(key).replace(/^l/,'')) || 0));
  }

  function publishSmoke(realLife, locked, openVisible) {
    if (!smoke) return;
    const html = document.documentElement;
    const pack2 = new Set(window.FrenchTranquilleRealLife2?.scenarioIds || []);
    const pack2Open = realLife.filter(tile => pack2.has(tile.dataset.scenarioStart || '')).length;
    html.dataset.realLifeUiTiles = String(realLife.length);
    html.dataset.realLifeOpenTotal = String(realLife.length);
    html.dataset.realLifeOpenVisible = String(openVisible);
    html.dataset.realLifeOpenHidden = String(Math.max(0, realLife.length - openVisible));
    html.dataset.realLifePack2Open = String(pack2Open);
    html.dataset.realLifeLockedVisible = String(locked.filter(tile => !tile.classList.contains('real-life-locked-hidden')).length);
    html.dataset.realLifeReadyLabel = document.querySelector('.real-life-ready') ? '1' : '0';
    html.dataset.realLifeTechnicalTitle = /Scenario Lab/i.test(document.querySelector('.scenario-head h2')?.textContent || '') ? '1' : '0';
  }

  function ensureControls(card, grid) {
    let controls = card.querySelector('.scenario-list-controls');
    if (!controls) {
      controls = document.createElement('div');
      controls.className = 'scenario-list-controls';
      grid.insertAdjacentElement('afterend', controls);
    }
    return controls;
  }

  function reorderIfNeeded(grid, desired) {
    const current = [...grid.children].filter(node => node.classList?.contains('scenario-tile'));
    const same = current.length === desired.length && current.every((node,index) => node === desired[index]);
    if (!same) desired.forEach(tile => grid.appendChild(tile));
  }

  function decorateCard(card) {
    if (!card) return;

    const pill = card.querySelector('.scenario-head .pill');
    const title = card.querySelector('.scenario-head h2');
    const intro = card.querySelector('.scenario-head + p');
    setText(pill, T('LUYỆN NÓI','PRATIQUER'));
    setText(title, `🎭 ${T('Nói trong tình huống thật','Parler en situation')}`);
    setText(intro, T(
      'Lucie gợi ý một vài tình huống phù hợp với những gì bạn đã học. Không cần làm tất cả.',
      'Lucie te propose quelques situations adaptées à ce que tu as appris. Pas besoin de tout faire.'
    ));

    const grid = card.querySelector('.scenario-grid');
    if (!grid) return;

    const tiles = [...grid.querySelectorAll('.scenario-tile')];
    const realLife = [];
    const otherOpen = [];
    const locked = [];

    for (const tile of tiles) {
      const id = tile.dataset.scenarioStart || '';
      const open = tile.classList.contains('unlocked');
      const life = id.startsWith('jerry-') || /Jerry/i.test(tile.textContent || '');
      tile.classList.toggle('real-life-tile', life);

      if (life && !tile.querySelector('.real-life-badge')) {
        const copy = tile.querySelector('.scenario-copy');
        if (copy) {
          const badge = document.createElement('span');
          badge.className = 'real-life-badge';
          badge.textContent = `♡ ${T('Cuộc sống của bạn','Ta vraie vie')}`;
          copy.prepend(badge);
        }
      }

      if (open && life) realLife.push(tile);
      else if (open) otherOpen.push(tile);
      else locked.push(tile);
    }

    realLife.sort((a,b) => scenarioRank(b.dataset.scenarioStart) - scenarioRank(a.dataset.scenarioStart));
    otherOpen.sort((a,b) => scenarioRank(b.dataset.scenarioStart) - scenarioRank(a.dataset.scenarioStart));
    const openOrdered = [...realLife, ...otherOpen];
    reorderIfNeeded(grid, [...openOrdered, ...locked]);

    openOrdered.forEach((tile,index) => tile.classList.toggle('real-life-open-hidden', !showAllOpen && index >= MAX_OPEN));
    locked.forEach((tile,index) => tile.classList.toggle('real-life-locked-hidden', !showAllLocked && index >= 2));

    const controls = ensureControls(card, grid);
    let openToggle = controls.querySelector('[data-real-life-toggle-open]');
    if (openOrdered.length > MAX_OPEN) {
      if (!openToggle) {
        openToggle = document.createElement('button');
        openToggle.type = 'button';
        openToggle.className = 'scenario-more secondary';
        openToggle.dataset.realLifeToggleOpen = '1';
        controls.appendChild(openToggle);
      }
      setText(openToggle, showAllOpen
        ? T('Chỉ xem gợi ý','Afficher seulement les suggestions')
        : T(`Xem thêm ${openOrdered.length - MAX_OPEN} tình huống`,`Voir ${openOrdered.length - MAX_OPEN} autres situations`));
    } else openToggle?.remove();

    let lockedToggle = controls.querySelector('[data-real-life-toggle-locked]');
    if (locked.length > 2) {
      if (!lockedToggle) {
        lockedToggle = document.createElement('button');
        lockedToggle.type = 'button';
        lockedToggle.className = 'scenario-more secondary';
        lockedToggle.dataset.realLifeToggleLocked = '1';
        controls.appendChild(lockedToggle);
      }
      setText(lockedToggle, showAllLocked
        ? T('Ẩn các tình huống sau','Masquer les situations futures')
        : T(`Xem ${locked.length - 2} tình huống sau`,`Voir ${locked.length - 2} situations futures`));
    } else lockedToggle?.remove();

    const stats = card.querySelector('.scenario-stats');
    let ready = stats?.querySelector('.real-life-ready');
    if (stats && !ready) {
      ready = document.createElement('span');
      ready.className = 'real-life-ready';
      stats.prepend(ready);
    }
    setText(ready, `♡ ${realLife.length} ${T('tình huống gần gũi','situations personnelles')}`);

    publishSmoke(realLife, locked, Math.min(openOrdered.length, showAllOpen ? openOrdered.length : MAX_OPEN));
  }

  function decorateRunner(card) {
    const runner = card?.querySelector('.scenario-runner');
    if (!runner) return;
    const activeTitle = runner.querySelector('.scenario-runner-head h2')?.textContent || '';
    const isJerry = /Jerry/i.test(activeTitle) || document.querySelector('[data-scenario-replay^="jerry-"]');
    if (!isJerry) return;
    setText(runner.querySelector('.scenario-runner-head .pill'), T('TÌNH HUỐNG THẬT','VRAIE SITUATION'));
  }

  function decorate() {
    const card = document.querySelector('.screen-conversation .scenario-lab-card');
    if (!card) return;
    decorateCard(card);
    decorateRunner(card);
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; decorate(); });
  }

  document.addEventListener('click', event => {
    const openButton = event.target.closest('[data-real-life-toggle-open]');
    if (openButton) {
      event.preventDefault();
      showAllOpen = !showAllOpen;
      decorate();
      return;
    }
    const lockedButton = event.target.closest('[data-real-life-toggle-locked]');
    if (lockedButton) {
      event.preventDefault();
      showAllLocked = !showAllLocked;
      decorate();
    }
  });

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app, { childList:true, subtree:true });
  decorate();

  window.FrenchTranquilleRealLifeUX = {
    version:'1.17.0',build:24,
    refresh:decorate,
    setShowAllOpen:value => { showAllOpen = Boolean(value); decorate(); },
    setShowAllLocked:value => { showAllLocked = Boolean(value); decorate(); }
  };
})();
