(() => {
  'use strict';

  if (window.FrenchTranquilleBuild267UX) return;
  const params = new URLSearchParams(location.search);
  const smoke = params.get('b267Smoke');

  const waitFor = (test, done, attempts = 120, delay = 70) => {
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

  function navProgress(done) {
    waitFor(() => document.querySelector('[data-ux-nav="progress"]') || document.querySelector('.bottom-nav [data-go="progress"]'), nav => {
      nav.click();
      waitFor(() => {
        window.FrenchTranquilleProgressionUX?.decorate?.();
        window.FrenchTranquilleProgressDetailsDashboard?.decorate?.();
        const layout = document.querySelector('.screen-progress .progress-layout.progress-ux-ready');
        const composition = layout?.querySelector(':scope > .progress-ux-composition');
        const flow = composition?.querySelector(':scope > .progress-ux-left-flow');
        const details = composition?.querySelector(':scope > .progress-ux-details');
        const overview = flow?.querySelector(':scope > .progress-ux-overview');
        const curriculum = flow?.querySelector(':scope > .progress-ux-curriculum');
        const dashboard = details?.querySelector('.progress-detail-grid');
        return layout && composition && flow && details && overview && curriculum && dashboard
          ? { layout, composition, flow, details, overview, curriculum, dashboard }
          : null;
      }, done);
    });
  }

  function measure(nodes) {
    const compositionRect = nodes.composition.getBoundingClientRect();
    const flowRect = nodes.flow.getBoundingClientRect();
    const detailsRect = nodes.details.getBoundingClientRect();
    const overviewRect = nodes.overview.getBoundingClientRect();
    const curriculumRect = nodes.curriculum.getBoundingClientRect();
    const visibleRows = [...nodes.curriculum.querySelectorAll('.lesson-row')].filter(row => getComputedStyle(row).display !== 'none');
    const rowWidths = visibleRows.map(row => row.getBoundingClientRect().width).filter(Number.isFinite);
    const minRowWidth = rowWidths.length ? Math.min(...rowWidths) : 0;
    const columns = getComputedStyle(nodes.dashboard).gridTemplateColumns.split(' ').filter(Boolean).length;
    const horizontalOverflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
    const sideBySide = detailsRect.left >= flowRect.right - 4;
    const verticalStack = detailsRect.top >= flowRect.bottom - 4;
    const desktopUsable = innerWidth <= 1040
      ? verticalStack && flowRect.width >= 620
      : sideBySide && flowRect.width >= 420 && detailsRect.width >= 420;

    document.documentElement.dataset.b267DetailsOpen = nodes.details.open ? '1' : '0';
    document.documentElement.dataset.b267CompositionWidth = String(Math.round(compositionRect.width));
    document.documentElement.dataset.b267FlowWidth = String(Math.round(flowRect.width));
    document.documentElement.dataset.b267DetailsWidth = String(Math.round(detailsRect.width));
    document.documentElement.dataset.b267OverviewWidth = String(Math.round(overviewRect.width));
    document.documentElement.dataset.b267CurriculumWidth = String(Math.round(curriculumRect.width));
    document.documentElement.dataset.b267MinLessonRowWidth = String(Math.round(minRowWidth));
    document.documentElement.dataset.b267DashboardColumns = String(columns);
    document.documentElement.dataset.b267SideBySide = sideBySide ? '1' : '0';
    document.documentElement.dataset.b267VerticalStack = verticalStack ? '1' : '0';
    document.documentElement.dataset.b267HorizontalOverflow = horizontalOverflow ? '1' : '0';
    document.documentElement.dataset.b267DesktopUsable = desktopUsable ? '1' : '0';
    document.documentElement.dataset.b267Containment = nodes.details.parentElement === nodes.composition ? '1' : '0';
    document.documentElement.dataset.b267Complete = '1';
  }

  function smokeProgress() {
    navProgress(nodes => {
      if (!nodes.details.open) nodes.details.querySelector(':scope > summary')?.click();
      waitFor(() => nodes.details.open && nodes.layout.dataset.progressDetailsOpen === '1', () => {
        window.FrenchTranquilleProgressDetailsDashboard?.decorate?.();
        setTimeout(() => measure(nodes), 600);
      });
    });
  }

  if (smoke === 'progress') setTimeout(smokeProgress, 180);

  window.FrenchTranquilleBuild267UX = {
    version:'1.19.7',
    build:'26.7',
    refresh(){
      window.FrenchTranquilleProgressionUX?.decorate?.();
      window.FrenchTranquilleProgressDetailsDashboard?.decorate?.();
    }
  };
})();
