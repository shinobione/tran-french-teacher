(() => {
  'use strict';

  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  let showAllLocked = false;
  let scheduled = false;

  function decorateCard(card) {
    if (!card) return;

    const pill = card.querySelector('.scenario-head .pill');
    const title = card.querySelector('.scenario-head h2');
    const intro = card.querySelector('.scenario-head + p');
    if (pill) pill.textContent = T('LUYỆN NÓI','PRATIQUER');
    if (title) title.textContent = `🎭 ${T('Nói trong tình huống thật','Parler en situation')}`;
    if (intro) intro.textContent = T(
      'Chọn một tình huống đang mở. Lucie sẽ giúp bạn giữ cuộc hội thoại từng bước.',
      'Choisis une situation disponible. Lucie t’aide à tenir le dialogue étape par étape.'
    );

    const grid = card.querySelector('.scenario-grid');
    if (!grid) return;

    const tiles = [...grid.querySelectorAll('.scenario-tile')];
    const realLife = [];
    const otherOpen = [];
    const locked = [];

    for (const tile of tiles) {
      const id = tile.dataset.scenarioStart || '';
      const open = tile.classList.contains('unlocked');
      const life = id.startsWith('jerry-');
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

    [...realLife, ...otherOpen, ...locked].forEach(tile => grid.appendChild(tile));

    locked.forEach((tile, index) => {
      tile.classList.toggle('real-life-locked-hidden', !showAllLocked && index >= 2);
    });

    let toggle = card.querySelector('[data-real-life-toggle-locked]');
    if (locked.length > 2) {
      if (!toggle) {
        toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'scenario-more secondary';
        toggle.dataset.realLifeToggleLocked = '1';
        grid.insertAdjacentElement('afterend', toggle);
      }
      toggle.textContent = showAllLocked
        ? T('Ẩn các tình huống sau','Masquer les situations futures')
        : T(`Xem thêm ${locked.length - 2} tình huống sau`,`Voir ${locked.length - 2} situations futures`);
    } else {
      toggle?.remove();
    }

    const stats = card.querySelector('.scenario-stats');
    if (stats && !stats.querySelector('.real-life-ready')) {
      const ready = document.createElement('span');
      ready.className = 'real-life-ready';
      const count = realLife.length;
      ready.textContent = `♡ ${count} ${T('tình huống gần gũi','situations personnelles')}`;
      stats.prepend(ready);
    }
  }

  function decorateRunner(card) {
    const runner = card?.querySelector('.scenario-runner');
    if (!runner) return;
    const activeTitle = runner.querySelector('.scenario-runner-head h2')?.textContent || '';
    const isJerry = /Jerry/i.test(activeTitle) || document.querySelector('[data-scenario-replay^="jerry-"]');
    if (!isJerry) return;
    const pill = runner.querySelector('.scenario-runner-head .pill');
    if (pill) pill.textContent = T('TÌNH HUỐNG THẬT','VRAIE SITUATION');
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
    requestAnimationFrame(() => {
      scheduled = false;
      decorate();
    });
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-real-life-toggle-locked]');
    if (!button) return;
    event.preventDefault();
    showAllLocked = !showAllLocked;
    decorate();
  });

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app, { childList:true, subtree:true });
  decorate();

  window.FrenchTranquilleRealLifeUX = {
    version:'1.16.0',build:23,
    refresh:decorate,
    setShowAllLocked:value => { showAllLocked = Boolean(value); decorate(); }
  };
})();
