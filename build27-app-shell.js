(() => {
  'use strict';

  const CURRICULUM = window.FrenchTranquilleCurriculum;
  if (!CURRICULUM) return;

  const LEARNER_KEY = CURRICULUM.key || 'francais-avec-luc:learner:v1';
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const REDUCED = () => matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const STAGES = [
    { id:'a0-survival', from:1, to:7, vi:'A0 sinh tồn', fr:'Survie A0' },
    { id:'daily-life', from:8, to:15, vi:'Cuộc sống hằng ngày', fr:'Vie quotidienne' },
    { id:'a1-foundation', from:16, to:20, vi:'Nền tảng A1', fr:'Fondations A1' },
    { id:'first-exchanges', from:21, to:25, vi:'Trao đổi đầu tiên', fr:'Premiers échanges' },
    { id:'a1-core', from:26, to:40, vi:'A1 cốt lõi', fr:'A1 Core' }
  ];

  let scheduled = false;
  let practicePage = null;
  let journeyPage = null;
  let debugLegacy = false;
  let activeJourneyStage = null;

  function learner() {
    try { return JSON.parse(localStorage.getItem(LEARNER_KEY) || '{}') || {}; }
    catch { return {}; }
  }

  function state() {
    const l = learner();
    const lessons = CURRICULUM.lessons || [];
    const completed = new Set(l.completedLessons || []);
    const next = lessons.find((lesson, index) => (index === 0 || completed.has(lessons[index - 1]?.id)) && !completed.has(lesson.id)) || lessons.at(-1) || null;
    const completedCount = lessons.filter(lesson => completed.has(lesson.id)).length;
    const knownCount = Array.isArray(l.knownItems) ? l.knownItems.length : 0;
    const reviewDue = (() => {
      try { return Number(window.FrenchTranquilleMemory?.summary?.().due?.length || 0); }
      catch { return 0; }
    })();
    const weakCount = Object.values(l.reviewState || {}).filter(value => Number(value) === 0).length;
    return { learner:l, lessons, completed, next, completedCount, knownCount, reviewDue, weakCount };
  }

  function currentScreen() {
    const shell = document.querySelector('#app .app-shell');
    if (!shell) return 'boot';
    const cls = [...shell.classList].find(name => name.startsWith('screen-'));
    return cls ? cls.slice(7) : 'home';
  }

  function legacyGo(id) {
    const target = document.querySelector(`.bottom-nav [data-go="${id}"]`);
    target?.click();
  }

  function legacyOpenLesson(id) {
    const target = [...document.querySelectorAll(`[data-open-lesson="${CSS.escape(id)}"]`)]
      .find(node => !node.closest('.b27-page') && !node.closest('.b27-overlay'));
    target?.click();
  }

  function legacySettings() {
    const target = [...document.querySelectorAll('.screen-home [data-go="settings"]')]
      .find(node => !node.closest('.b27-page'));
    target?.click();
  }

  function transition(fn) {
    const page = document.querySelector('.b27-page:not([hidden]), .b27-overlay:not([hidden])');
    if (REDUCED() || !page) { fn(); return; }
    page.classList.add('b27-leaving');
    setTimeout(fn, 135);
  }

  function lessonPct(lesson, l) {
    if (!lesson) return 0;
    if ((l.completedLessons || []).includes(lesson.id)) return 100;
    const raw = Number(l.lessonProgress?.[lesson.id] || 0);
    return Math.min(95, raw > 0 ? Math.max(10, raw * 12) : 0);
  }

  function stageFor(number = 1) {
    return STAGES.find(stage => number >= stage.from && number <= stage.to) || STAGES.at(-1);
  }

  function headerHtml(title, subtitle = '') {
    return `<header class="b27-header">
      <div class="b27-brandline">
        <img src="./assets/Favicon.png" alt="" aria-hidden="true">
        <div><strong>French Trân’quille</strong>${subtitle ? `<span>${esc(subtitle)}</span>` : ''}</div>
      </div>
      <div class="b27-header-actions">${isDebug() ? `<span class="b27-debug-chip">DEBUG FR</span>` : ''}<button type="button" class="b27-icon-button" data-b27-settings aria-label="${esc(T('Cài đặt','Réglages'))}">⚙</button></div>
      ${title ? `<div class="b27-page-title"><h1>${esc(title)}</h1></div>` : ''}
    </header>`;
  }

  function ensurePage(root, cls) {
    let page = root.querySelector(`:scope > .${cls}`);
    if (!page) {
      page = document.createElement('section');
      page.className = `b27-page ${cls} b27-entering`;
      root.prepend(page);
      requestAnimationFrame(() => page.classList.remove('b27-entering'));
    }
    return page;
  }

  function renderHome() {
    const root = document.querySelector('.screen-home .content');
    if (!root) return;
    const s = state();
    const next = s.next;
    if (!next) return;
    const page = ensurePage(root, 'b27-home');
    const pct = lessonPct(next, s.learner);
    const sig = [next.id, s.completedCount, s.knownCount, s.reviewDue, pct, isDebug()].join(':');
    if (page.dataset.signature === sig) return;
    page.dataset.signature = sig;

    page.innerHTML = `${headerHtml('', T('Học nhẹ nhàng, từng bước một.','Avancer tranquillement, une étape à la fois.'))}
      <div class="b27-home-grid">
        <main class="b27-home-main">
          <section class="b27-welcome">
            <span>${esc(T('HÔM NAY','AUJOURD’HUI'))}</span>
            <h1>${esc(T('Xin chào Trân 👋','Bonjour Trân 👋'))}</h1>
            <p>${esc(T('Chỉ cần một bước. Tyffany lo phần còn lại.','Une seule étape suffit. Tyffany s’occupe du reste.'))}</p>
          </section>

          <section class="b27-primary-card">
            <div class="b27-card-topline"><span>${esc(T(`BÀI ${next.number} / ${s.lessons.length}`,`LEÇON ${next.number} / ${s.lessons.length}`))}</span><b>${next.icon || '▤'}</b></div>
            <h2>${esc(T(next.titleVi, next.titleFr))}</h2>
            <p>${esc(T(next.shortVi, next.shortFr))}</p>
            <div class="b27-progress"><i style="width:${pct}%"></i></div>
            <button type="button" class="b27-primary-action" data-b27-open-lesson="${esc(next.id)}">
              <span>${esc(pct ? T('Tiếp tục','Continuer') : T('Bắt đầu','Commencer'))}</span><b>›</b>
            </button>
          </section>
        </main>

        <aside class="b27-home-side">
          <button type="button" class="b27-quick-card" data-b27-action="review">
            <span class="b27-quick-icon">↻</span><span><strong>${esc(T('Ôn lại','Réviser'))}</strong><small>${esc(s.reviewDue ? T(`${s.reviewDue} mục nên ôn`,`${s.reviewDue} élément(s) à revoir`) : T('Một lượt ôn ngắn','Une courte révision'))}</small></span><b>›</b>
          </button>
          <button type="button" class="b27-quick-card" data-b27-action="listening" ${window.FrenchTranquilleListening?.availability?.().meaning ? '' : 'disabled'}>
            <span class="b27-quick-icon">🎧</span><span><strong>${esc(T('Luyện nghe','Écouter'))}</strong><small>${esc(T('Khoảng 3 phút','Environ 3 minutes'))}</small></span><b>›</b>
          </button>
          <div class="b27-today-note"><span>◷</span><div><strong>${esc(T('10–15 phút là đủ','10–15 minutes suffisent'))}</strong><small>${esc(T('Không cần hoàn thành tất cả hôm nay.','Pas besoin de tout faire aujourd’hui.'))}</small></div></div>
        </aside>
      </div>`;
  }

  function nearbyLessons(s) {
    const idx = Math.max(0, s.lessons.findIndex(lesson => lesson.id === s.next?.id));
    const from = Math.max(0, Math.min(idx - 2, s.lessons.length - 5));
    return s.lessons.slice(from, from + 5);
  }

  function lessonRowHtml(lesson, s) {
    const done = s.completed.has(lesson.id);
    const current = lesson.id === s.next?.id;
    const unlocked = done || current || lesson.number <= (s.next?.number || 1);
    return `<button type="button" class="b27-lesson-row ${done?'is-done':''} ${current?'is-current':''}" ${unlocked ? `data-b27-open-lesson="${esc(lesson.id)}"` : 'disabled'}>
      <span class="b27-lesson-state">${done ? '✓' : current ? '●' : '○'}</span>
      <span class="b27-lesson-copy"><strong>${lesson.number}. ${esc(T(lesson.titleVi, lesson.titleFr))}</strong><small>${esc(current ? T('Bài hiện tại','Leçon actuelle') : done ? T('Đã hoàn thành','Terminée') : T('Sắp tới','À venir'))}</small></span>
      <b>${unlocked ? '›' : '🔒'}</b>
    </button>`;
  }

  function renderProgress() {
    const root = document.querySelector('.screen-progress .content');
    if (!root) return;
    const s = state();
    const nextNumber = s.next?.number || s.lessons.length;
    const stage = stageFor(nextNumber);
    const stageLessons = s.lessons.filter(lesson => lesson.number >= stage.from && lesson.number <= stage.to);
    const stageDone = stageLessons.filter(lesson => s.completed.has(lesson.id)).length;
    const pct = s.lessons.length ? Math.round((s.completedCount / s.lessons.length) * 100) : 0;
    const page = ensurePage(root, 'b27-progress-page');
    const sig = [s.next?.id, s.completedCount, s.knownCount, s.reviewDue, isDebug(), debugLegacy].join(':');
    if (page.dataset.signature === sig) return;
    page.dataset.signature = sig;

    page.innerHTML = `${headerHtml(T('Tiến bộ của bạn','Tes progrès'), T('Nhìn nhanh. Không cần đọc báo cáo.','Un coup d’œil, pas un rapport.'))}
      <main class="b27-progress-main">
        <section class="b27-level-card">
          <div class="b27-level-head"><div><span>${esc(T('LỘ TRÌNH A0 → A1','PARCOURS A0 → A1'))}</span><strong>${s.completedCount} / ${s.lessons.length}</strong></div><b>${pct}%</b></div>
          <div class="b27-level-track"><i style="width:${pct}%"></i></div>
          <p>${esc(T(`${s.knownCount} từ và cụm từ đã gặp. Bạn đang ở Bài ${nextNumber}.`,`${s.knownCount} mots et expressions rencontrés. Tu es à la leçon ${nextNumber}.`))}</p>
        </section>

        <section class="b27-current-card">
          <span>${esc(T('TIẾP THEO','PROCHAINE ÉTAPE'))}</span>
          <div class="b27-current-title"><b>${s.next?.icon || '▤'}</b><div><h2>${esc(T(s.next?.titleVi || '', s.next?.titleFr || ''))}</h2><p>${esc(T(s.next?.shortVi || '', s.next?.shortFr || ''))}</p></div></div>
          <button type="button" class="b27-primary-action" data-b27-open-lesson="${esc(s.next?.id || '')}"><span>${esc(T('Tiếp tục bài học','Continuer la leçon'))}</span><b>›</b></button>
        </section>

        <section class="b27-stage-card">
          <div class="b27-section-title"><div><span>${esc(T(`BƯỚC ${STAGES.indexOf(stage)+1} / ${STAGES.length}`,`ÉTAPE ${STAGES.indexOf(stage)+1} / ${STAGES.length}`))}</span><h2>${esc(T(stage.vi, stage.fr))}</h2></div><small>${stageDone}/${stageLessons.length}</small></div>
          <div class="b27-mini-lessons">${nearbyLessons(s).map(lesson => lessonRowHtml(lesson, s)).join('')}</div>
          <button type="button" class="b27-secondary-action" data-b27-open-journey>${esc(T('Xem toàn bộ lộ trình','Voir tout le parcours'))}<b>›</b></button>
        </section>

        ${isDebug() ? `<button type="button" class="b27-debug-toggle" data-b27-debug-legacy>${debugLegacy ? 'Masquer le diagnostic moteur' : 'Afficher le diagnostic moteur'}</button>` : ''}
      </main>`;

    document.documentElement.classList.toggle('b27-show-legacy-progress', isDebug() && debugLegacy);
  }

  function recommendedScenario() {
    const api = window.FrenchTranquilleScenarios;
    if (!api?.scenarios) return null;
    const candidates = api.scenarios.filter(scenario => api.unlocked?.(scenario));
    const personal = candidates.filter(scenario => scenario.id?.startsWith('jerry-') || /Jerry/i.test(`${scenario.titleFr || ''} ${scenario.titleVi || ''}`));
    const pool = personal.length ? personal : candidates;
    return pool.sort((a,b) => Math.max(...(b.requiredLessons||[]).map(id=>Number(String(id).replace(/^l/,''))||0),0) - Math.max(...(a.requiredLessons||[]).map(id=>Number(String(id).replace(/^l/,''))||0),0))[0] || null;
  }

  function practiceActionHtml(id, icon, title, sub, recommended = false, disabled = false) {
    return `<button type="button" class="b27-practice-action" data-b27-practice-action="${id}" ${disabled?'disabled':''}>
      <span class="b27-practice-icon">${icon}</span>
      <span><strong>${esc(title)}</strong><small>${esc(sub)}</small>${recommended ? `<em>${esc(T('Gợi ý lúc này','Conseillé maintenant'))}</em>` : ''}</span>
      <b>${disabled ? '🔒' : '›'}</b>
    </button>`;
  }

  function openPracticePage() {
    if (practicePage) return;
    const s = state();
    const listen = Boolean(window.FrenchTranquilleListening?.availability?.().meaning);
    const scenario = recommendedScenario();
    practicePage = document.createElement('section');
    practicePage.className = 'b27-overlay b27-practice-page b27-entering';
    practicePage.innerHTML = `<div class="b27-overlay-inner">
      <header class="b27-overlay-header"><button type="button" class="b27-back" data-b27-close-practice>‹</button><div><span>French Trân’quille</span><h1>${esc(T('Luyện tập','Pratiquer'))}</h1></div><div></div></header>
      <main class="b27-practice-main">
        <div class="b27-practice-intro"><span>${esc(T('CHỌN MỘT VIỆC','UNE SEULE CHOSE'))}</span><h2>${esc(T('Bạn muốn làm gì bây giờ?','Qu’est-ce que tu veux faire maintenant ?'))}</h2><p>${esc(T('Không cần làm tất cả. Chọn thứ bạn muốn, rồi bắt đầu.','Pas besoin de tout faire. Choisis, puis commence.'))}</p></div>
        <div class="b27-practice-list">
          ${practiceActionHtml('conversation','🎙️',T('Nói tiếng Pháp','Parler'),T('Một cuộc hội thoại ngắn với Tyffany','Une courte conversation avec Tyffany'),s.reviewDue===0)}
          ${practiceActionHtml('listening','🎧',T('Luyện nghe','Écouter'),T('Nghe trước, hiểu sau','Écouter d’abord, comprendre ensuite'),false,!listen)}
          ${practiceActionHtml('review','↻',T('Ôn lại','Réviser'),s.reviewDue ? T(`${s.reviewDue} mục nên ôn hôm nay`,`${s.reviewDue} élément(s) à revoir aujourd’hui`) : T('Giữ những gì đã học trong trí nhớ','Garder les acquis en mémoire'),s.reviewDue>0)}
          ${practiceActionHtml('real-life','♥',T('Tình huống thực tế','Dans la vraie vie'),scenario ? T(scenario.titleVi, scenario.titleFr) : T('Sẽ mở khi đủ bài học','Se débloque avec les leçons'),false,!scenario)}
        </div>
      </main>
    </div>`;
    document.body.appendChild(practicePage);
    document.documentElement.classList.add('b27-practice-open');
    requestAnimationFrame(() => practicePage?.classList.remove('b27-entering'));
    document.querySelector('.ux-bottom-nav [data-ux-nav="practice"]')?.classList.add('active');
  }

  function closePracticePage() {
    if (!practicePage) return;
    const node = practicePage;
    practicePage = null;
    document.documentElement.classList.remove('b27-practice-open');
    if (REDUCED()) node.remove();
    else { node.classList.add('b27-leaving'); setTimeout(() => node.remove(), 150); }
    window.FrenchTranquilleUX?.refresh?.();
  }

  function stageButtonHtml(stage, s) {
    const lessons = s.lessons.filter(lesson => lesson.number >= stage.from && lesson.number <= stage.to);
    const done = lessons.filter(lesson => s.completed.has(lesson.id)).length;
    const active = stage.id === activeJourneyStage;
    return `<button type="button" class="b27-stage-tab ${active?'active':''}" data-b27-stage="${stage.id}"><span>${esc(T(stage.vi, stage.fr))}</span><small>${done}/${lessons.length}</small></button>`;
  }

  function journeyLessonsHtml(stage, s) {
    return s.lessons.filter(lesson => lesson.number >= stage.from && lesson.number <= stage.to).map(lesson => lessonRowHtml(lesson, s)).join('');
  }

  function openJourney() {
    if (journeyPage) return;
    const s = state();
    activeJourneyStage = stageFor(s.next?.number || 1).id;
    journeyPage = document.createElement('section');
    journeyPage.className = 'b27-overlay b27-journey-page b27-entering';
    document.body.appendChild(journeyPage);
    renderJourney();
    document.documentElement.classList.add('b27-journey-open');
    requestAnimationFrame(() => journeyPage?.classList.remove('b27-entering'));
  }

  function renderJourney() {
    if (!journeyPage) return;
    const s = state();
    const stage = STAGES.find(item => item.id === activeJourneyStage) || stageFor(s.next?.number || 1);
    journeyPage.innerHTML = `<div class="b27-overlay-inner">
      <header class="b27-overlay-header"><button type="button" class="b27-back" data-b27-close-journey>‹</button><div><span>${esc(T('LỘ TRÌNH','PARCOURS'))}</span><h1>${esc(T(stage.vi, stage.fr))}</h1></div><div></div></header>
      <main class="b27-journey-main">
        <div class="b27-stage-tabs">${STAGES.map(item => stageButtonHtml(item, s)).join('')}</div>
        <div class="b27-stage-lessons">${journeyLessonsHtml(stage, s)}</div>
      </main>
    </div>`;
  }

  function closeJourney() {
    if (!journeyPage) return;
    const node = journeyPage;
    journeyPage = null;
    document.documentElement.classList.remove('b27-journey-open');
    if (REDUCED()) node.remove();
    else { node.classList.add('b27-leaving'); setTimeout(() => node.remove(), 150); }
  }

  function routePractice(id) {
    if (id === 'listening') {
      closePracticePage();
      transition(() => window.FrenchTranquilleListening?.open?.());
      return;
    }
    if (id === 'real-life') {
      const scenario = recommendedScenario();
      if (!scenario) return;
      closePracticePage();
      legacyGo('conversation');
      setTimeout(() => window.FrenchTranquilleScenarios?.start?.(scenario.id), 120);
      return;
    }
    closePracticePage();
    transition(() => legacyGo(id));
  }

  function render() {
    document.documentElement.classList.add('b27-app-shell');
    document.documentElement.classList.toggle('b27-debug', isDebug());
    const screen = currentScreen();
    document.body.dataset.b27Screen = screen;
    if (screen === 'home') renderHome();
    if (screen === 'progress') renderProgress();
    if (screen !== 'progress') {
      debugLegacy = false;
      document.documentElement.classList.remove('b27-show-legacy-progress');
    }
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; render(); });
  }

  window.addEventListener('click', event => {
    const nav = event.target.closest('.ux-bottom-nav [data-ux-nav]');
    if (nav?.dataset.uxNav === 'practice') {
      event.preventDefault();
      event.stopImmediatePropagation();
      openPracticePage();
      return;
    }
    if (nav && nav.dataset.uxNav !== 'practice' && practicePage) closePracticePage();

    const settings = event.target.closest('[data-b27-settings]');
    if (settings) { event.preventDefault(); event.stopImmediatePropagation(); transition(legacySettings); return; }

    const lesson = event.target.closest('[data-b27-open-lesson]');
    if (lesson) {
      event.preventDefault(); event.stopImmediatePropagation();
      const id = lesson.dataset.b27OpenLesson;
      if (journeyPage) closeJourney();
      transition(() => legacyOpenLesson(id));
      return;
    }

    const action = event.target.closest('[data-b27-action]');
    if (action) {
      event.preventDefault(); event.stopImmediatePropagation();
      const id = action.dataset.b27Action;
      if (id === 'listening') transition(() => window.FrenchTranquilleListening?.open?.());
      else transition(() => legacyGo(id));
      return;
    }

    if (event.target.closest('[data-b27-close-practice]')) { event.preventDefault(); closePracticePage(); return; }
    const practiceAction = event.target.closest('[data-b27-practice-action]');
    if (practiceAction && !practiceAction.disabled) { event.preventDefault(); routePractice(practiceAction.dataset.b27PracticeAction); return; }

    if (event.target.closest('[data-b27-open-journey]')) { event.preventDefault(); openJourney(); return; }
    if (event.target.closest('[data-b27-close-journey]')) { event.preventDefault(); closeJourney(); return; }
    const stage = event.target.closest('[data-b27-stage]');
    if (stage) { event.preventDefault(); activeJourneyStage = stage.dataset.b27Stage; renderJourney(); return; }

    if (event.target.closest('[data-b27-debug-legacy]')) {
      event.preventDefault();
      debugLegacy = !debugLegacy;
      renderProgress();
    }
  }, true);

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (journeyPage) closeJourney();
    else if (practicePage) closePracticePage();
  });

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app, { childList:true, subtree:true });
  window.addEventListener('focus', schedule);

  render();

  window.FrenchTranquilleBuild27Shell = {
    version:'1.20.0',
    build:27,
    refresh:render,
    openPractice:openPracticePage,
    openJourney,
    closeJourney
  };
})();