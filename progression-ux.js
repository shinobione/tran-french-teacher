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
  let scheduled = false;
  let smokeNavigationRequested = false;

  const DETAIL_GROUPS = [
    {
      id: 'memory', icon: '🧠',
      vi: 'Trí nhớ & ôn tập', fr: 'Mémoire & révisions',
      subVi: 'Những gì đã học, cần ôn và các điểm hay vấp.', subFr: 'Acquis, éléments à revoir et difficultés récurrentes.',
      selectors: ['.memory-progress-card', '.error-intelligence-card'],
      includesLearnedList: true
    },
    {
      id: 'mastery', icon: '🎯',
      vi: 'Mức độ làm chủ', fr: 'Maîtrise',
      subVi: 'Tiến độ theo từng chặng, không chỉ số bài đã xem.', subFr: 'Consolidation par étapes, au-delà des leçons simplement parcourues.',
      selectors: ['.mastery-progress-card', '.stage3-progress-card', '.mastery-stage3-card']
    },
    {
      id: 'practice', icon: '🎧',
      vi: 'Thực hành thực tế', fr: 'Pratique réelle',
      subVi: 'Nghe hiểu và các tình huống giao tiếp.', subFr: 'Compréhension orale et situations de communication.',
      selectors: ['.scenario-progress-card', '.listening-progress-card']
    },
    {
      id: 'support', icon: '🌐',
      vi: 'Hỗ trợ của Lucie', fr: 'Soutien de Lucie',
      subVi: 'Mức tiếng Việt / tiếng Pháp được điều chỉnh theo bằng chứng.', subFr: 'Équilibre vietnamien / français adapté aux preuves d’apprentissage.',
      selectors: ['.language-progress-card']
    }
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

  function ensureOverview(column) {
    const m = metrics();
    let card = column.querySelector(':scope > .progress-ux-overview');
    if (!card) {
      card = document.createElement('section');
      card.className = 'card progress-ux-overview';
      card.dataset.progressUxOverview = '1';
      column.prepend(card);
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

  function ensureDetails(column) {
    let details = column.querySelector(':scope > .progress-ux-details');
    if (!details) {
      details = document.createElement('details');
      details.className = 'progress-ux-details';
      details.innerHTML = `
        <summary>
          <span><strong>🧠 ${esc(T('Chi tiết học tập','Détails d’apprentissage'))}</strong><small>${esc(T('Mở đúng phần bạn muốn xem — không cần cuộn qua mọi chỉ số.','Ouvre seulement la partie qui t’intéresse — plus besoin de traverser tous les indicateurs.'))}</small></span>
          <b aria-hidden="true">⌄</b>
        </summary>
        <div class="progress-ux-details-body"><div class="progress-ux-detail-groups"></div></div>`;
      column.appendChild(details);
    }
    if (smokeMode === 'details') details.open = true;
    return details;
  }

  function groupStatus(group, m) {
    if (group.id === 'memory') {
      const due = m.memory.due?.length || 0;
      return T(`${m.known} mục • ${due} cần ôn`, `${m.known} acquis • ${due} à revoir`);
    }
    if (group.id === 'mastery') return T(`Mức ${m.level} • theo từng chặng`, `Niveau ${m.level} • par étapes`);
    if (group.id === 'practice') return T('Nghe & tình huống', 'Écoute & situations');
    return T('Tiếng Việt ↔ tiếng Pháp', 'Vietnamien ↔ français');
  }

  function ensureDetailGroups(details, m) {
    const grid = details.querySelector('.progress-ux-detail-groups');
    if (!grid) return new Map();
    const result = new Map();
    DETAIL_GROUPS.forEach(group => {
      let node = grid.querySelector(`[data-progress-group="${group.id}"]`);
      if (!node) {
        node = document.createElement('details');
        node.className = 'progress-ux-detail-group';
        node.dataset.progressGroup = group.id;
        node.innerHTML = `
          <summary>
            <span class="progress-ux-group-icon">${group.icon}</span>
            <span class="progress-ux-group-copy"><strong>${esc(T(group.vi, group.fr))}</strong><small>${esc(T(group.subVi, group.subFr))}</small></span>
            <span class="progress-ux-group-meta"><em></em><b aria-hidden="true">⌄</b></span>
          </summary>
          <div class="progress-ux-detail-group-body"></div>`;
        grid.appendChild(node);
      }
      const meta = node.querySelector('.progress-ux-group-meta em');
      if (meta) meta.textContent = groupStatus(group, m);
      result.set(group.id, node);
    });
    if (smokeMode === 'details') result.get('memory')?.setAttribute('open', '');
    return result;
  }

  function cardGroup(card) {
    for (const group of DETAIL_GROUPS) {
      if (group.includesLearnedList && card.querySelector('.learned-list')) return group.id;
      if (group.selectors.some(selector => card.matches(selector))) return group.id;
    }
    return '';
  }

  function collectSecondaryCards(column, details, m) {
    const groups = ensureDetailGroups(details, m);
    const hero = column.querySelector(':scope > .progress-hero');
    const stats = column.querySelector(':scope > .stats');
    hero?.classList.add('progress-ux-legacy-hidden');
    stats?.classList.add('progress-ux-legacy-hidden');

    const candidates = [...column.querySelectorAll('.card')].filter(card => {
      if (card.classList.contains('progress-ux-overview')) return false;
      if (card.closest('.curriculum-card')) return false;
      return Boolean(cardGroup(card));
    });

    candidates.forEach(card => {
      const id = cardGroup(card);
      const body = groups.get(id)?.querySelector('.progress-ux-detail-group-body');
      if (body && card.parentElement !== body) body.appendChild(card);
    });

    let visibleGroups = 0;
    let totalCards = 0;
    let openGroups = 0;
    groups.forEach(groupNode => {
      const body = groupNode.querySelector('.progress-ux-detail-group-body');
      const count = body?.children.length || 0;
      totalCards += count;
      groupNode.hidden = count === 0;
      groupNode.dataset.progressGroupCards = String(count);
      if (count) visibleGroups += 1;
      if (count && groupNode.open) openGroups += 1;
    });

    details.dataset.progressDetailCards = String(totalCards);
    details.dataset.progressDetailGroups = String(visibleGroups);
    details.dataset.progressOpenGroups = String(openGroups);
  }

  function compactCurriculum(layout, m) {
    const card = layout.querySelector('.curriculum-card');
    if (!card) return;
    card.classList.add('progress-ux-curriculum');
    const rows = [...card.querySelectorAll('.lesson-list > .lesson-row')];
    if (!rows.length) return;

    const current = Math.max(0, Math.min(rows.length - 1, m.index));
    const visible = new Set();
    for (const idx of [current - 1, current, current + 1, current + 2, current + 3]) {
      if (idx >= 0 && idx < rows.length) visible.add(idx);
    }
    if (visible.size < Math.min(5, rows.length)) {
      for (let i = Math.max(0, rows.length - 5); i < rows.length && visible.size < 5; i += 1) visible.add(i);
    }

    rows.forEach((row, index) => {
      row.dataset.progressIndex = String(index);
      const shouldHide = !curriculumExpanded && !visible.has(index);
      row.classList.toggle('progress-ux-row-hidden', shouldHide);
    });

    let actions = card.querySelector('.progress-ux-curriculum-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'progress-ux-curriculum-actions';
      card.appendChild(actions);
    }
    const label = curriculumExpanded
      ? T('Thu gọn lộ trình','Réduire le parcours')
      : T(`Xem đủ ${rows.length} bài`,`Voir les ${rows.length} leçons`);
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
    const m = metrics();
    layout.dataset.progressCurrentLesson = m.lesson?.id || '';
    layout.dataset.progressCompleted = String(m.completedCount);
    layout.dataset.progressKnown = String(m.known);
    ensureOverview(column);
    const details = ensureDetails(column);
    collectSecondaryCards(column, details, m);
    compactCurriculum(layout, m);
    layout.dataset.progressDetailsOpen = details.open ? '1' : '0';
    layout.dataset.progressDetailGroups = details.dataset.progressDetailGroups || '0';
    layout.dataset.progressOpenGroups = details.dataset.progressOpenGroups || '0';
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
    const current = event.target.closest('[data-progress-current]');
    if (current) {
      event.preventDefault();
      const id = current.dataset.progressCurrent;
      document.querySelector(`.screen-progress .curriculum-card [data-open-lesson="${CSS.escape(id)}"]`)?.click();
      return;
    }

    if (event.target.closest('[data-progress-toggle-all]')) {
      event.preventDefault();
      curriculumExpanded = !curriculumExpanded;
      schedule();
    }
  }, true);

  document.addEventListener('toggle', event => {
    const target = event.target;
    if (target.matches?.('.progress-ux-detail-group') && target.open) {
      const grid = target.parentElement;
      grid?.querySelectorAll('.progress-ux-detail-group[open]').forEach(other => {
        if (other !== target) other.open = false;
      });
    }
    if (target.matches?.('.progress-ux-details,.progress-ux-detail-group')) schedule();
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
        if (layout) layout.dataset.progressionSmoke = smokeMode;
      }, 120);
    });
  }

  schedule();
  requestSmokeNavigation();

  window.FrenchTranquilleProgressionUX = {
    version: '1.19.1',
    build: '26.1',
    decorate,
    metrics,
    setCurriculumExpanded(value) { curriculumExpanded = Boolean(value); schedule(); }
  };
}
