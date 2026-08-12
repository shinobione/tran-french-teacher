(() => {
  'use strict';

  if (window.FrenchTranquilleBuild266UX) return;
  const params = new URLSearchParams(location.search);
  const smoke = params.get('b266Smoke');
  const legacySmoke = params.get('b265Smoke');

  const waitFor = (test, done, attempts = 120, delay = 60) => {
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

  const navTarget = id => document.querySelector(`[data-ux-nav="${CSS.escape(id)}"]`) || document.querySelector(`.bottom-nav [data-go="${CSS.escape(id)}"]`);

  function navigateProgress(done) {
    waitFor(() => navTarget('progress'), target => {
      target.click();
      waitFor(() => {
        window.FrenchTranquilleProgressionUX?.decorate?.();
        const layout = document.querySelector('.screen-progress .progress-layout.progress-ux-ready');
        const column = layout?.querySelector(':scope > .progress-ux-composition');
        const flow = column?.querySelector(':scope > .progress-ux-left-flow');
        const details = column?.querySelector(':scope > .progress-ux-details');
        const overview = flow?.querySelector(':scope > .progress-ux-overview');
        const curriculum = flow?.querySelector(':scope > .progress-ux-curriculum');
        if (!layout || !column || !flow || !details || !overview || !curriculum) return null;
        return { layout, column, flow, details, overview, curriculum };
      }, done);
    });
  }

  function dashboardSnapshot(nodes) {
    window.FrenchTranquilleProgressDetailsDashboard?.decorate?.();
    const state = window.FrenchTranquilleProgressDetailsDashboard?.state?.();
    if (!state || !Number.isFinite(Number(state.total)) || Number(state.total) < 1) return null;
    const forbidden = nodes.details.querySelectorAll('.progress-ux-overview,.progress-ux-curriculum,.curriculum-card').length;
    const memoryCards = nodes.details.querySelectorAll('.memory-progress-card').length;
    const masteryCards = nodes.details.querySelectorAll('.mastery-progress-card').length;
    const stage2Cards = nodes.details.querySelectorAll('.stage2-progress-card').length;
    const stage3Cards = nodes.details.querySelectorAll('.stage3-progress-card').length;
    return {
      total: Number(state.total),
      other: Number(state.counts?.other || 0),
      forbidden,
      memoryCards,
      masteryCards,
      stage2Cards,
      stage3Cards,
      signature: JSON.stringify(state.counts || {})
    };
  }

  function waitForSettledDashboard(nodes, done, attempts = 90, delay = 180) {
    let count = 0;
    let stableSamples = 0;
    let lastKey = '';
    const tick = () => {
      const snapshot = dashboardSnapshot(nodes);
      if (snapshot) {
        const key = `${snapshot.total}|${snapshot.other}|${snapshot.forbidden}|${snapshot.signature}`;
        if (key === lastKey) stableSamples += 1;
        else {
          lastKey = key;
          stableSamples = 1;
        }
        document.documentElement.dataset.b266DashboardSettleSamples = String(stableSamples);
        if (stableSamples >= 5) {
          document.documentElement.dataset.b266DashboardSettled = '1';
          done(snapshot);
          return;
        }
      }
      count += 1;
      if (count < attempts) setTimeout(tick, delay);
    };
    tick();
  }

  function recordContainment(nodes) {
    document.documentElement.dataset.b266DetailsContained = nodes.details.parentElement === nodes.column ? '1' : '0';
    document.documentElement.dataset.b266LeftFlow = nodes.overview.parentElement === nodes.flow && nodes.curriculum.parentElement === nodes.flow ? '1' : '0';
    document.documentElement.dataset.b266OverviewOutsideDetails = nodes.details.contains(nodes.overview) ? '0' : '1';
    document.documentElement.dataset.b266CurriculumOutsideDetails = nodes.details.contains(nodes.curriculum) ? '0' : '1';
  }

  function recordGeometry(nodes, mobile = false) {
    const overviewRect = nodes.overview.getBoundingClientRect();
    const curriculumRect = nodes.curriculum.getBoundingClientRect();
    const flowRect = nodes.flow.getBoundingClientRect();
    const detailsRect = nodes.details.getBoundingClientRect();
    const gap = Math.round(curriculumRect.top - overviewRect.bottom);
    document.documentElement.dataset.b265ProgressComposition = nodes.layout.dataset.progressComposition || '';
    document.documentElement.dataset.b265ProgressDetailsContained = nodes.column.contains(nodes.details) ? '1' : '0';
    document.documentElement.dataset.b265ProgressCurriculumLeft = nodes.flow.contains(nodes.curriculum) ? '1' : '0';
    document.documentElement.dataset.b265ProgressGap = String(gap);
    document.documentElement.dataset.b265ProgressCompactGap = gap >= 0 && gap <= 48 ? '1' : '0';
    document.documentElement.dataset.b265ProgressNestedScroll = nodes.details.scrollHeight > nodes.details.clientHeight + 2 && ['auto','scroll'].includes(getComputedStyle(nodes.details).overflowY) ? '1' : '0';
    document.documentElement.dataset.b265ProgressPageScrollable = document.documentElement.scrollHeight > innerHeight + 2 ? '1' : '0';
    if (mobile) {
      document.documentElement.dataset.b265ProgressMobileOrder = overviewRect.top <= curriculumRect.top && curriculumRect.top <= detailsRect.top ? '1' : '0';
      document.documentElement.dataset.b265ProgressMobileDetailsClosed = nodes.details.open ? '0' : '1';
    } else {
      document.documentElement.dataset.b265ProgressSideBySide = detailsRect.left >= flowRect.right - 4 ? '1' : '0';
    }
  }

  function smokeProgressContainment(mobile = false) {
    navigateProgress(nodes => {
      recordContainment(nodes);
      if (mobile) nodes.details.open = false;
      else nodes.details.open = true;

      // Do not start the anti-proliferation clock while normal engines are still
      // injecting their first legitimate cards. The historical 26.5 runaway
      // never reaches five identical consecutive snapshots, while a healthy
      // dashboard settles and then must remain bit-for-bit stable.
      waitForSettledDashboard(nodes, initial => {
        document.documentElement.dataset.b266DashboardInitial = String(initial.total);
        document.documentElement.dataset.b266DashboardOtherInitial = String(initial.other);
        document.documentElement.dataset.b266DashboardForbiddenInitial = String(initial.forbidden);

        setTimeout(() => {
          window.FrenchTranquilleProgressionUX?.decorate?.();
          const final = dashboardSnapshot(nodes);
          if (!final) return;
          document.documentElement.dataset.b266DashboardFinal = String(final.total);
          document.documentElement.dataset.b266DashboardOtherFinal = String(final.other);
          document.documentElement.dataset.b266DashboardForbiddenFinal = String(final.forbidden);
          document.documentElement.dataset.b266DashboardStable = final.total === initial.total && final.signature === initial.signature ? '1' : '0';
          document.documentElement.dataset.b266DashboardBounded = final.total <= 24 ? '1' : '0';
          document.documentElement.dataset.b266DashboardOtherBounded = final.other <= 2 ? '1' : '0';
          document.documentElement.dataset.b266EngineCardsUnique = [final.memoryCards,final.masteryCards,final.stage2Cards,final.stage3Cards].every(value => value <= 1) ? '1' : '0';

          window.FrenchTranquilleProgressionUX?.setCurriculumExpanded?.(true);
          waitFor(() => {
            const card = document.querySelector('.screen-progress .progress-ux-curriculum[data-progress-stage-mode="1"]');
            const visible = Number(card?.dataset.progressVisibleRows || 0);
            const total = Number(card?.dataset.progressTotalRows || 0);
            const stageCount = Number(card?.dataset.progressStageCount || 0);
            return card && visible > 0 && total === 40 && stageCount === 5 ? { card, visible } : null;
          }, stageState => {
            document.documentElement.dataset.b266CurriculumStageMode = '1';
            document.documentElement.dataset.b266CurriculumInitialStageRows = String(stageState.visible);
            document.documentElement.dataset.b266CurriculumNoWall = stageState.visible < 40 ? '1' : '0';
            window.FrenchTranquilleProgressionUX?.setCurriculumStage?.(25);
            waitFor(() => {
              const card = document.querySelector('.screen-progress .progress-ux-curriculum');
              return card?.dataset.progressActiveStage === '25' && Number(card.dataset.progressVisibleRows) === 15 ? card : null;
            }, card => {
              document.documentElement.dataset.b266CurriculumA1CoreRows = card.dataset.progressVisibleRows;
              document.documentElement.dataset.b266CurriculumAllAccessible = card.dataset.progressTotalRows === '40' ? '1' : '0';
              const afterStages = dashboardSnapshot(nodes);
              document.documentElement.dataset.b266DashboardStableAfterCurriculum = afterStages && afterStages.total === initial.total && afterStages.signature === initial.signature ? '1' : '0';
              if (mobile) {
                document.documentElement.dataset.b266MobileDetailsClosed = nodes.details.open ? '0' : '1';
              }
            });
          });
        }, 3000);
      });
    });
  }

  // Version-forward compatibility for the Build 26.5 geometry tribunal. 26.6
  // preserves its user-visible contract with a nested ownership boundary.
  function legacy265Compat(mobile = false) {
    navigateProgress(nodes => {
      if (!mobile) {
        nodes.details.open = true;
        window.FrenchTranquilleProgressDetailsDashboard?.open?.('mastery');
        setTimeout(() => recordGeometry(nodes,false), 180);
      } else {
        nodes.details.open = false;
        requestAnimationFrame(() => recordGeometry(nodes,true));
      }
    });
  }

  if (smoke === 'progress') setTimeout(() => smokeProgressContainment(false), 160);
  if (smoke === 'progress-mobile') setTimeout(() => smokeProgressContainment(true), 160);
  if (legacySmoke === 'progress') setTimeout(() => legacy265Compat(false), 180);
  if (legacySmoke === 'progress-mobile') setTimeout(() => legacy265Compat(true), 180);

  window.FrenchTranquilleBuild266UX = {
    version:'1.19.6',
    build:'26.6',
    refresh(){
      window.FrenchTranquilleProgressionUX?.decorate?.();
      window.FrenchTranquilleProgressDetailsDashboard?.decorate?.();
    }
  };
})();