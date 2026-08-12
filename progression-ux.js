const PROGRESSION_CURRICULUM = window.FrenchTranquilleCurriculum;

if (PROGRESSION_CURRICULUM) {
  const LEARNER_KEY = PROGRESSION_CURRICULUM.key;
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const params = new URLSearchParams(location.search);
  const smokeMode = params.get('progressionSmoke');
  let curriculumExpanded = smokeMode === 'expanded';
  let curriculumStageStart = null;
  let scheduled = false;
  let smokeNavigationRequested = false;

  const CURRICULUM_STAGES = [
    { start: 0, end: 7, vi: 'CHẶNG 1 • SỐNG SÓT A0', fr: 'ÉTAPE 1 • SURVIE A0' },
    { start: 7, end: 15, vi: 'CHẶNG 2 • CUỘC SỐNG HẰNG NGÀY', fr: 'ÉTAPE 2 • VIE QUOTIDIENNE' },
    { start: 15, end: 20, vi: 'CHẶNG 3 • NỀN TẢNG A1', fr: 'ÉTAPE 3 • FONDATIONS A1' },
    { start: 20, end: 25, vi: 'CHẶNG 4 • TRAO ĐỔI ĐẦU TIÊN', fr: 'ÉTAPE 4 • PREMIERS ÉCHANGES' },
    { start: 25, end: 40, vi: 'CHẶNG 5 • A1 THỰC DỤNG', fr: 'ÉTAPE 5 • A1 CORE' }
  ];

  function learner() {
    try { return JSON.parse(localStorage.getItem(LEARNER_KEY) || '{}') || {}; }
    catch { return {}; }
  }

  function currentLessonInfo() {
    const l = learner();
    const completed = new Set(Array.isArray(l.completedLessons) ? l.completedLessons : []);
    let index = PROGRESSION_CURRICULUM.lessons.findIndex((lesson, i) => {
      if (completed.has(lesson.id)) return false;
      return i === 0 || completed.has(PROGRESSION_CURRICULUM.lessons[i - 1]?.id);
    });
    if (index < 0) index = Math.max(0, PROGRESSION_CURRICULUM.lessons.length - 1);
    return { learner: l, completed, index, lesson: PROGRESSION_CURRICULUM.lessons[index] };
  }

  function metrics() {
    const info = currentLessonInfo();
    const memory = window.FrenchTranquilleMemory?.summary?.() || { due: [], solid: [], fragile: [] };
    const known = Array.isArray(info.learner.knownItems) ? info.learner.knownItems.length : 0;
    const completed = info.completed.size;
    const total = PROGRESSION_CURRICULUM.lessons.length;
    const overall = Math.max(0, Math.min(100, Math.round((completed / Math.max(total, 1)) * 100)));
    const estimate = window.FrenchTranquilleMastery?.levelEstimate?.() || { code: info.learner.level || 'A0' };
    return { ...info, memory, known, completedCount: completed, total, overall, level: estimate.code || 'A0' };
  }

  function overviewSignature(m) {
    return [m.lesson?.id, m.completedCount, m.known, m.memory.due?.length || 0, m.memory.solid?.length || 0, m.memory.fragile?.length || 0, m.level].join(':');
  }

  function ensureComposition(column) {
    let flow = column.querySelector(':scope > .progress-ux-left-flow');
    if (!flow) {
      flow = document.createElement('div');
      flow.className = 'progress-ux-left-flow';
      flow.dataset.progressLeftFlow = '1';
      column.prepend(flow);
    }
    return flow;
  }

  function ensureOverview(flow) {
    const m = metrics();
    let card = flow.querySelector(':scope > .progress-ux-overview');
    if (!card) {
      card = document.createElement('section');
      card.className = 'card progress-ux-overview';
      card.dataset.progressUxOverview = '1';
      flow.prepend(card);
    }
    const signature = overviewSignature(m);
    if (card.dataset.signature === signature) return card;
    card.dataset.signature = signature;
    const due = m.memory.due?.length || 0;
    const solid = m.memory.solid?.length || 0;
    card.innerHTML = `
      <div class="progress-ux-head">
        <div><span class="pill">${esc(m.level)} → A1</span><small>${esc(T('Lộ trình của Trân','Parcours de Trân'))}</small></div>
        <strong>${m.completedCount}/${m.total}</strong>
      </div>
      <h2>${esc(T(`Bạn đang ở Bài ${m.lesson?.number || m.total}`,`Tu es à la leçon ${m.lesson?.number || m.total}`))}</h2>
      <p class="progress-ux-current">${m.lesson?.icon || '📘'} <strong>${esc(T(m.lesson?.titleVi || '', m.lesson?.titleFr || ''))}</strong></p>
      <div class="progressbar progress-ux-global"><span style="width:${Math.max(2, m.overall)}%"></span></div>
      <div class="progress-ux-metrics">
        <div><strong>${m.completedCount}</strong><span>${esc(T('Bài xong','Leçons finies'))}</span></div>
        <div><strong>${m.known}</strong><span>${esc(T('Đã học','Acquis'))}</span></div>
        <div><strong>${due}</strong><span>${esc(T('Cần ôn','À revoir'))}</span></div>
      </div>
      <div class="progress-ux-next">
        <div><small>${esc(T('Bước tiếp theo','Prochaine étape'))}</small><strong>${esc(T(`Tiếp tục Bài ${m.lesson?.number || m.total}`,`Continuer la leçon ${m.lesson?.number || m.total}`))}</strong>${solid ? `<span>${solid} ${esc(T('mục đã vững','acquis solides'))}</span>` : ''}</div>
        <button class="primary" data-progress-current="${esc(m.lesson?.id || '')}">${esc(T('Tiếp tục','Continuer'))} <span>›</span></button>
      </div>`;
    return card;
  }

  function ensureDetails(layout, column) {
    let details = column.querySelector(':scope > .progress-ux-details') || layout.querySelector(':scope > .progress-ux-details');
    if (!details) {
      details = document.createElement('details');
      details.className = 'progress-ux-details';
      details.innerHTML = `
        <summary>
          <span><strong>🧠 ${esc(T('Chi tiết học tập','Détails d’apprentissage'))}</strong><small>${esc(T('Trí nhớ, mức độ làm chủ và các số liệu chi tiết','Mémoire, maîtrise et indicateurs détaillés'))}</small></span>
          <b aria-hidden="true">⌄</b>
        </summary>
        <div class="progress-ux-details-body"></div>`;
    }
    // Build 26.6 containment contract: Details remains inside the historical
    // first Progress column. All legacy engines query that ancestor to decide
    // whether their card already exists. Moving Details outside it makes them
    // recreate the same card forever.
    if (details.parentElement !== column) column.appendChild(details);
    if (smokeMode === 'details') details.open = true;
    return details;
  }

  function collectSecondaryCards(column, details, flow) {
    const body = details.querySelector('.progress-ux-details-body');
    if (!body) return;
    const hero = column.querySelector(':scope > .progress-hero');
    const stats = column.querySelector(':scope > .stats');
    hero?.classList.add('progress-ux-legacy-hidden');
    stats?.classList.add('progress-ux-legacy-hidden');

    [...column.children].forEach(child => {
      if (
        child === hero ||
        child === stats ||
        child === details ||
        child === flow ||
        child.classList.contains('progress-ux-overview') ||
        child.classList.contains('progress-ux-curriculum') ||
        child.classList.contains('curriculum-card')
      ) return;
      if (child.parentElement === column) body.appendChild(child);
    });

    details.dataset.progressDetailCards = String(body.querySelectorAll('.card').length);
  }

  function currentStage(index) {
    return CURRICULUM_STAGES.find(stage => index >= stage.start && index < Math.min(stage.end, PROGRESSION_CURRICULUM.lessons.length)) || CURRICULUM_STAGES[0];
  }

  function ensureStageNav(card, currentIndex, rows) {
    let nav = card.querySelector(':scope > .progress-ux-stage-nav');
    if (!nav) {
      nav = document.createElement('div');
      nav.className = 'progress-ux-stage-nav';
      const list = card.querySelector('.lesson-list');
      if (list) list.before(nav); else card.appendChild(nav);
    }

    const validStages = CURRICULUM_STAGES
      .map(stage => ({ ...stage, end: Math.min(stage.end, rows.length) }))
      .filter(stage => stage.start < rows.length && stage.end > stage.start);
    const current = currentStage(currentIndex);
    if (curriculumStageStart === null || !validStages.some(stage => stage.start === curriculumStageStart)) curriculumStageStart = current.start;

    const signature = `${curriculumExpanded ? 1 : 0}:${curriculumStageStart}:${currentIndex}:${isDebug() ? 1 : 0}:${rows.length}`;
    if (nav.dataset.signature !== signature) {
      nav.dataset.signature = signature;
      nav.innerHTML = validStages.map((stage, index) => {
        const active = curriculumStageStart === stage.start;
        const here = currentIndex >= stage.start && currentIndex < stage.end;
        const label = T(stage.vi, stage.fr);
        const range = `${stage.start + 1}–${stage.end}`;
        return `<button type="button" class="progress-ux-stage-button ${active ? 'active' : ''}" data-progress-stage="${stage.start}" aria-expanded="${active ? 'true' : 'false'}"><span><strong>${esc(label)}</strong><small>${esc(T(`Bài ${range}`,`Leçons ${range}`))}${here ? ` • ${esc(T('Bạn đang ở đây','Tu es ici'))}` : ''}</small></span><b>${active ? '⌃' : '⌄'}</b></button>`;
      }).join('');
    }
    nav.hidden = !curriculumExpanded;
    card.dataset.progressStageMode = curriculumExpanded ? '1' : '0';
    card.dataset.progressStageCount = String(validStages.length);
    card.dataset.progressActiveStage = String(curriculumStageStart ?? '');
    return validStages;
  }

  function compactCurriculum(layout, m, flow) {
    const card = layout.querySelector('.curriculum-card');
    if (!card) return;
    card.classList.add('progress-ux-curriculum');
    if (card.parentElement !== flow) flow.appendChild(card);
    const rows = [...card.querySelectorAll('.lesson-list > .lesson-row')];
    if (!rows.length) return;

    const current = Math.max(0, Math.min(rows.length - 1, m.index));
    const compactVisible = new Set();
    for (const idx of [current - 1, current, current + 1, current + 2, current + 3]) {
      if (idx >= 0 && idx < rows.length) compactVisible.add(idx);
    }
    if (compactVisible.size < Math.min(5, rows.length)) {
      for (let i = Math.max(0, rows.length - 5); i < rows.length && compactVisible.size < 5; i += 1) compactVisible.add(i);
    }

    rows.forEach((row, index) => { row.dataset.progressIndex = String(index); });
    const stages = ensureStageNav(card, current, rows);
    const activeStage = stages.find(stage => stage.start === curriculumStageStart) || currentStage(current);

    rows.forEach((row, index) => {
      const visible = curriculumExpanded
        ? index >= activeStage.start && index < activeStage.end
        : compactVisible.has(index);
      row.classList.toggle('progress-ux-row-hidden', !visible);
    });

    // Existing curriculum chapters remain useful in compact mode. In expanded
    // mode the dedicated stage navigator replaces them to avoid a 40-row wall.
    card.querySelectorAll('.lesson-list > .curriculum-chapter').forEach(chapter => {
      chapter.classList.toggle('progress-ux-chapter-hidden', curriculumExpanded);
    });

    let actions = card.querySelector('.progress-ux-curriculum-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'progress-ux-curriculum-actions';
      card.appendChild(actions);
    }
    const label = curriculumExpanded
      ? T('Thu gọn lộ trình','Réduire le parcours')
      : T(`Xem toàn bộ lộ trình ${rows.length} bài`,`Voir tout le parcours • ${rows.length} leçons`);
    if (actions.dataset.label !== label) {
      actions.dataset.label = label;
      actions.innerHTML = `<button class="secondary full" data-progress-toggle-all>${esc(label)} <span>${curriculumExpanded ? '⌃' : '⌄'}</span></button>`;
    }

    card.dataset.progressExpanded = curriculumExpanded ? '1' : '0';
    card.dataset.progressVisibleRows = String(rows.filter(row => !row.classList.contains('progress-ux-row-hidden')).length);
    card.dataset.progressTotalRows = String(rows.length);
  }

  function decorate() {
    const layout = document.querySelector('.screen-progress .progress-layout');
    if (!layout) return;
    layout.classList.add('progress-ux-ready');
    layout.dataset.progressUxReady = '1';
    const column = layout.querySelector(':scope > div:first-child');
    if (!column) return;
    column.classList.add('progress-ux-composition');
    const flow = ensureComposition(column);
    const m = metrics();
    layout.dataset.progressCurrentLesson = m.lesson?.id || '';
    layout.dataset.progressCompleted = String(m.completedCount);
    layout.dataset.progressKnown = String(m.known);
    ensureOverview(flow);
    const details = ensureDetails(layout, column);
    compactCurriculum(layout, m, flow);
    collectSecondaryCards(column, details, flow);
    layout.dataset.progressDetailsOpen = details.open ? '1' : '0';
    layout.dataset.progressComposition = 'contained-independent-columns';
    layout.dataset.progressDetailsContained = column.contains(details) ? '1' : '0';
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      decorate();
    });
  }

  function toggleDetails(details) {
    if (!details) return;
    details.open = !details.open;
    details.dataset.progressDetailsManualToggle = details.open ? 'open' : 'closed';
    const layout = details.closest('.progress-layout');
    if (layout) layout.dataset.progressDetailsOpen = details.open ? '1' : '0';
    schedule();
  }

  document.addEventListener('click', event => {
    const summary = event.target.closest('.progress-ux-details > summary');
    if (summary) {
      event.preventDefault();
      toggleDetails(summary.parentElement);
      return;
    }

    const current = event.target.closest('[data-progress-current]');
    if (current) {
      event.preventDefault();
      const id = current.dataset.progressCurrent;
      document.querySelector(`.screen-progress .curriculum-card [data-open-lesson="${CSS.escape(id)}"]`)?.click();
      return;
    }

    const stage = event.target.closest('[data-progress-stage]');
    if (stage) {
      event.preventDefault();
      curriculumExpanded = true;
      curriculumStageStart = Number(stage.dataset.progressStage);
      schedule();
      return;
    }

    if (event.target.closest('[data-progress-toggle-all]')) {
      event.preventDefault();
      curriculumExpanded = !curriculumExpanded;
      if (curriculumExpanded) curriculumStageStart = currentStage(metrics().index).start;
      schedule();
    }
  }, true);

  document.addEventListener('toggle', event => {
    if (event.target.matches?.('.progress-ux-details')) schedule();
  }, true);

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app, { childList: true, subtree: true });

  function requestSmokeNavigation() {
    if (!smokeMode || smokeNavigationRequested) return;
    smokeNavigationRequested = true;
    requestAnimationFrame(() => {
      const progressButton = document.querySelector('[data-ux-nav="progress"]') || document.querySelector('.bottom-nav [data-go="progress"]');
      progressButton?.click();
      setTimeout(() => {
        decorate();
        const layout = document.querySelector('.screen-progress .progress-layout');
        if (layout) {
          layout.dataset.progressionSmoke = smokeMode;
          if (smokeMode === 'details-click') {
            const details = layout.querySelector('.progress-ux-details');
            if (details) {
              details.open = false;
              details.querySelector('summary')?.click();
              layout.dataset.progressDetailsClickSmoke = details.open ? '1' : '0';
            }
          }
        }
      }, 120);
    });
  }

  schedule();
  requestSmokeNavigation();

  window.FrenchTranquilleProgressionUX = {
    version: '1.19.6',
    build: '26.6',
    decorate,
    metrics,
    toggleDetails,
    setCurriculumExpanded(value) {
      curriculumExpanded = Boolean(value);
      if (curriculumExpanded) curriculumStageStart = currentStage(metrics().index).start;
      schedule();
    },
    setCurriculumStage(start) { curriculumExpanded = true; curriculumStageStart = Number(start); schedule(); }
  };
}
