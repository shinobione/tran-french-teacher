(() => {
  'use strict';

  if (window.FrenchTranquilleBuild268UX) return;

  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const params = new URLSearchParams(location.search);
  const smokeMode = params.get('b268Smoke');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let focusMode = null;
  let pendingFocusMode = null;
  let transitionRunning = false;
  let transitionToken = 0;
  let scheduled = false;

  const waitFor = (test, done, attempts = 140, delay = 70) => {
    let count = 0;
    const tick = () => {
      let value = null;
      try { value = test(); } catch {}
      if (value) { done(value); return; }
      count += 1;
      if (count < attempts) setTimeout(tick, delay);
    };
    tick();
  };

  function nodes() {
    const screen = document.querySelector('.screen-progress');
    const layout = screen?.querySelector('.progress-layout.progress-ux-ready');
    const composition = layout?.querySelector(':scope > .progress-ux-composition');
    const flow = composition?.querySelector(':scope > .progress-ux-left-flow');
    const overview = flow?.querySelector(':scope > .progress-ux-overview');
    const curriculum = flow?.querySelector(':scope > .progress-ux-curriculum');
    const details = composition?.querySelector(':scope > .progress-ux-details');
    const body = details?.querySelector(':scope > .progress-ux-details-body');
    const dashboard = body?.querySelector('.progress-detail-dashboard');
    return screen && layout && composition && flow && overview && curriculum && details && body && dashboard
      ? { screen, layout, composition, flow, overview, curriculum, details, body, dashboard }
      : null;
  }

  function screenVisible(screen) {
    if (!screen || screen.classList.contains('hidden')) return false;
    const style = getComputedStyle(screen);
    return style.display !== 'none' && style.visibility !== 'hidden';
  }

  function ensureDetailsToolbar(n) {
    let bar = n.body.querySelector(':scope > .b268-focus-toolbar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'b268-focus-toolbar';
      bar.dataset.b268Toolbar = 'details';
      bar.innerHTML = `
        <button type="button" class="b268-focus-back" data-b268-focus-back="details" aria-label="${T('Quay lại chi tiết học tập','Retour aux détails')}">‹</button>
        <div><small>${T('CHI TIẾT HỌC TẬP','DÉTAILS D’APPRENTISSAGE')}</small><strong data-b268-focus-title>${T('Tập trung','Vue détaillée')}</strong></div>
        <span class="b268-focus-badge">${T('1 mục','1 focus')}</span>`;
      n.body.prepend(bar);
    }
    return bar;
  }

  function ensureCurriculumToolbar(n) {
    let bar = n.flow.querySelector(':scope > .b268-curriculum-toolbar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'b268-focus-toolbar b268-curriculum-toolbar';
      bar.dataset.b268Toolbar = 'curriculum';
      bar.innerHTML = `
        <button type="button" class="b268-focus-back" data-b268-focus-back="curriculum" aria-label="${T('Quay lại tóm tắt','Retour au résumé')}">‹</button>
        <div><small>${T('LỘ TRÌNH A0 → A1','PARCOURS A0 → A1')}</small><strong>${T('Chọn một chặng','Choisis une étape')}</strong></div>
        <span class="b268-focus-badge">40</span>`;
      n.flow.insertBefore(bar, n.curriculum);
    }
    return bar;
  }

  function updateDetailsTitle(n) {
    const active = n.details.dataset.progressDetailActive || '';
    const toolbar = ensureDetailsToolbar(n);
    const title = toolbar.querySelector('[data-b268-focus-title]');
    const tile = active ? n.dashboard.querySelector(`[data-progress-detail-open="${CSS.escape(active)}"]`) : null;
    const label = tile?.querySelector('strong')?.textContent?.trim();
    if (title) title.textContent = label || T('Chi tiết học tập','Détails d’apprentissage');
  }

  function setBodyFocus(mode, visible) {
    if (mode && visible) document.body.dataset.b268ProgressFocus = mode;
    else delete document.body.dataset.b268ProgressFocus;
  }

  function applyFocus(n, mode) {
    focusMode = mode || null;
    if (focusMode) n.layout.dataset.b268Focus = focusMode;
    else delete n.layout.dataset.b268Focus;
    setBodyFocus(focusMode, screenVisible(n.screen));
    n.layout.dataset.b268FocusReady = '1';
    document.documentElement.dataset.b268Focus = focusMode || 'overview';
    updateDetailsTitle(n);
  }

  function focusTarget(n, mode) {
    if (mode === 'details') return n.details;
    if (mode === 'curriculum') return n.curriculum;
    return n.overview;
  }

  function transitionTo(n, next) {
    next = next || null;

    if (!transitionRunning && next === focusMode) {
      setBodyFocus(focusMode, screenVisible(n.screen));
      updateDetailsTitle(n);
      return;
    }

    // DOM observers can fire many times while the same destination is already
    // animating. Never restart the same transition: doing so starves its timer
    // and can leave the UI permanently between two focus states.
    if (transitionRunning && next === pendingFocusMode) {
      setBodyFocus(focusMode, screenVisible(n.screen));
      updateDetailsTitle(n);
      return;
    }

    const token = ++transitionToken;
    transitionRunning = true;
    pendingFocusMode = next;
    const duration = reduceMotion ? 0 : 145;
    const height = Math.ceil(n.composition.getBoundingClientRect().height);
    if (height > 0) n.composition.style.minHeight = `${height}px`;
    n.layout.dataset.b268Transition = 'out';

    setTimeout(() => {
      if (token !== transitionToken) return;
      applyFocus(n, next);
      n.layout.dataset.b268Transition = 'in-start';
      void n.composition.offsetWidth;
      requestAnimationFrame(() => {
        if (token !== transitionToken) return;
        delete n.layout.dataset.b268Transition;
        const target = focusTarget(n, next);
        if (next && screenVisible(n.screen)) {
          const top = window.scrollY + target.getBoundingClientRect().top - 14;
          window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? 'auto' : 'smooth' });
        }
        setTimeout(() => {
          if (token !== transitionToken) return;
          n.composition.style.minHeight = '';
          transitionRunning = false;
          pendingFocusMode = null;
          schedule();
        }, reduceMotion ? 0 : 210);
      });
    }, duration);
  }

  function desiredMode(n) {
    const activeDetail = n.details.dataset.progressDetailActive || '';
    if (activeDetail) return 'details';
    if (n.curriculum.dataset.progressExpanded === '1') return 'curriculum';
    return null;
  }

  function sync() {
    const n = nodes();
    if (!n) return;
    ensureDetailsToolbar(n);
    ensureCurriculumToolbar(n);
    const visible = screenVisible(n.screen);
    if (!visible) {
      setBodyFocus(null, false);
      return;
    }
    transitionTo(n, desiredMode(n));
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      sync();
    });
  }

  function resetDeepState() {
    const n = nodes();
    if (!n) return;
    if (n.details.dataset.progressDetailActive) window.FrenchTranquilleProgressDetailsDashboard?.close?.();
    if (n.curriculum.dataset.progressExpanded === '1') n.curriculum.querySelector('[data-progress-toggle-all]')?.click();
    transitionToken += 1;
    transitionRunning = false;
    pendingFocusMode = null;
    applyFocus(n, null);
    n.composition.style.minHeight = '';
    delete n.layout.dataset.b268Transition;
  }

  document.addEventListener('click', event => {
    const back = event.target.closest('[data-b268-focus-back]');
    if (back) {
      event.preventDefault();
      event.stopPropagation();
      const kind = back.dataset.b268FocusBack;
      if (kind === 'details') window.FrenchTranquilleProgressDetailsDashboard?.close?.();
      if (kind === 'curriculum') {
        const n = nodes();
        if (n?.curriculum.dataset.progressExpanded === '1') n.curriculum.querySelector('[data-progress-toggle-all]')?.click();
      }
      schedule();
      return;
    }

    const nav = event.target.closest('[data-ux-nav],.bottom-nav [data-go]');
    if (nav) {
      const target = nav.dataset.uxNav || nav.dataset.go;
      if (target && target !== 'progress') setTimeout(resetDeepState, 0);
    }

    if (event.target.closest('[data-progress-detail-open],[data-progress-detail-close],[data-progress-toggle-all],[data-progress-stage],.progress-ux-details > summary')) {
      requestAnimationFrame(schedule);
    }
  }, true);

  const app = document.getElementById('app');
  if (app) {
    new MutationObserver(schedule).observe(app, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['data-progress-detail-active','data-progress-expanded','open','class']
    });
  }

  function navProgress(done) {
    waitFor(() => document.querySelector('[data-ux-nav="progress"]') || document.querySelector('.bottom-nav [data-go="progress"]'), nav => {
      nav.click();
      waitFor(() => {
        window.FrenchTranquilleProgressionUX?.decorate?.();
        window.FrenchTranquilleProgressDetailsDashboard?.decorate?.();
        const n = nodes();
        return n && screenVisible(n.screen) ? n : null;
      }, done);
    });
  }

  function recordSmoke(n, mode) {
    const flowStyle = getComputedStyle(n.flow);
    const overviewStyle = getComputedStyle(n.overview);
    const detailsStyle = getComputedStyle(n.details);
    const gridStyle = getComputedStyle(n.dashboard.querySelector('.progress-detail-grid'));
    const curriculumStyle = getComputedStyle(n.curriculum);
    const activePanel = n.dashboard.querySelector('.progress-detail-panel:not([hidden])');
    const toolbar = mode === 'details'
      ? n.body.querySelector('[data-b268-toolbar="details"]')
      : n.flow.querySelector('[data-b268-toolbar="curriculum"]');
    const target = mode === 'details' ? n.details : n.curriculum;
    const targetWidth = Math.round(target.getBoundingClientRect().width);
    const horizontalOverflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;

    document.documentElement.dataset.b268SmokeMode = mode;
    document.documentElement.dataset.b268FocusState = n.layout.dataset.b268Focus || '';
    document.documentElement.dataset.b268FlowHidden = flowStyle.display === 'none' ? '1' : '0';
    document.documentElement.dataset.b268OverviewHidden = overviewStyle.display === 'none' ? '1' : '0';
    document.documentElement.dataset.b268DetailsHidden = detailsStyle.display === 'none' ? '1' : '0';
    document.documentElement.dataset.b268GridHidden = gridStyle.display === 'none' ? '1' : '0';
    document.documentElement.dataset.b268CurriculumVisible = curriculumStyle.display !== 'none' ? '1' : '0';
    document.documentElement.dataset.b268ActivePanel = activePanel ? '1' : '0';
    document.documentElement.dataset.b268ToolbarVisible = toolbar && getComputedStyle(toolbar).display !== 'none' ? '1' : '0';
    document.documentElement.dataset.b268TargetWidth = String(targetWidth);
    document.documentElement.dataset.b268HorizontalOverflow = horizontalOverflow ? '1' : '0';
    document.documentElement.dataset.b268Containment = n.details.parentElement === n.composition ? '1' : '0';
    document.documentElement.dataset.b268Complete = '1';
  }

  function smokeDetails() {
    navProgress(n => {
      if (!n.details.open) n.details.querySelector(':scope > summary')?.click();
      waitFor(() => n.details.open && n.dashboard.querySelector('[data-progress-detail-open="memory"]'), tile => {
        tile.click();
        waitFor(() => n.layout.dataset.b268Focus === 'details' && n.details.dataset.progressDetailActive === 'memory', () => {
          setTimeout(() => recordSmoke(n, 'details'), 360);
        });
      });
    });
  }

  function smokeCurriculum() {
    navProgress(n => {
      const toggle = n.curriculum.querySelector('[data-progress-toggle-all]');
      toggle?.click();
      waitFor(() => n.layout.dataset.b268Focus === 'curriculum' && n.curriculum.dataset.progressExpanded === '1', () => {
        setTimeout(() => recordSmoke(n, 'curriculum'), 360);
      });
    });
  }

  function markRoundtrip(stage) {
    document.documentElement.dataset.b268RoundtripStage = stage;
  }

  function smokeRoundTrip() {
    markRoundtrip('nav');
    navProgress(n => {
      markRoundtrip('progress-ready');
      if (!n.details.open) n.details.querySelector(':scope > summary')?.click();
      markRoundtrip('details-open-requested');
      waitFor(() => n.dashboard.querySelector('[data-progress-detail-open="memory"]'), tile => {
        markRoundtrip('memory-ready');
        tile.click();
        markRoundtrip('memory-clicked');
        waitFor(() => n.layout.dataset.b268Focus === 'details', () => {
          markRoundtrip('details-focused');
          n.body.querySelector('[data-b268-focus-back="details"]')?.click();
          markRoundtrip('details-back-clicked');
          waitFor(() => !n.layout.dataset.b268Focus && !n.details.dataset.progressDetailActive, () => {
            markRoundtrip('details-returned');
            const toggle = n.curriculum.querySelector('[data-progress-toggle-all]');
            toggle?.click();
            markRoundtrip('curriculum-clicked');
            waitFor(() => n.layout.dataset.b268Focus === 'curriculum', () => {
              markRoundtrip('curriculum-focused');
              n.flow.querySelector('[data-b268-focus-back="curriculum"]')?.click();
              markRoundtrip('curriculum-back-clicked');
              waitFor(() => !n.layout.dataset.b268Focus && n.curriculum.dataset.progressExpanded !== '1', () => {
                markRoundtrip('curriculum-returned');
                const visibleRows = [...n.curriculum.querySelectorAll('.lesson-row')].filter(row => getComputedStyle(row).display !== 'none').length;
                document.documentElement.dataset.b268RoundtripCompactRows = String(visibleRows);
                document.documentElement.dataset.b268RoundtripDetailsActive = n.details.dataset.progressDetailActive || '';
                document.documentElement.dataset.b268RoundtripFocus = n.layout.dataset.b268Focus || '';
                document.documentElement.dataset.b268RoundtripComplete = '1';
                markRoundtrip('complete');
              });
            });
          });
        });
      });
    });
  }

  if (smokeMode === 'details') setTimeout(smokeDetails, 180);
  if (smokeMode === 'curriculum') setTimeout(smokeCurriculum, 180);
  if (smokeMode === 'roundtrip') setTimeout(smokeRoundTrip, 180);

  schedule();

  window.FrenchTranquilleBuild268UX = {
    version: '1.19.8',
    build: '26.8',
    refresh: schedule,
    focus: () => focusMode,
    reset: resetDeepState
  };
})();