(() => {
  'use strict';

  if (window.FrenchTranquilleBuild265UX) return;

  const params = new URLSearchParams(location.search);
  const smoke = params.get('b265Smoke');

  const legacyGo = id => {
    const target = document.querySelector(`.bottom-nav [data-go="${CSS.escape(id)}"]`);
    target?.click();
    return Boolean(target);
  };

  const waitFor = (test, done, attempts = 80) => {
    let count = 0;
    const tick = () => {
      let value = null;
      try { value = test(); } catch {}
      if (value) { done(value); return; }
      count += 1;
      if (count < attempts) setTimeout(tick, 60);
    };
    tick();
  };

  function bindPracticeBackButtons() {
    document.querySelectorAll('[data-session-practice-back]:not([data-b265-back-bound])').forEach(button => {
      button.dataset.b265BackBound = '1';
      const exit = event => {
        event.preventDefault();
        event.stopPropagation();
        window.FrenchTranquilleSessionUX?.returnToPracticeHub?.();
      };
      button.addEventListener('pointerup', exit, true);
      button.addEventListener('click', exit, true);
    });
  }

  const app = document.getElementById('app');
  bindPracticeBackButtons();
  if (app) new MutationObserver(bindPracticeBackButtons).observe(app, { childList: true, subtree: true });

  function measureConversation() {
    const root = document.querySelector('.screen-conversation .narrow.session-practice-active-mode');
    const head = root?.querySelector(':scope > .practice-mode-head');
    const guided = root?.querySelector(':scope > .conversation-card:not(.session-mode-hidden)');
    if (!root || !head || !guided) return null;
    const rr = root.getBoundingClientRect();
    const hr = head.getBoundingClientRect();
    const gr = guided.getBoundingClientRect();
    const aligned = Math.abs(hr.left - gr.left) <= 4 && Math.abs(gr.left - rr.left) <= 4 && Math.abs(gr.right - rr.right) <= 4;
    return { root, head, guided, aligned };
  }

  function smokeConversation() {
    legacyGo('conversation');
    waitFor(
      () => window.FrenchTranquilleSessionUX?.setPracticeMode && document.querySelector('.screen-conversation .narrow'),
      () => {
        window.FrenchTranquilleSessionUX.setPracticeMode('guided');
        waitFor(measureConversation, measured => {
          document.documentElement.dataset.b265ConversationSingleColumn = measured.aligned ? '1' : '0';
          document.documentElement.dataset.b265ConversationGuidedVisible = measured.guided ? '1' : '0';
          const back = measured.head.querySelector('[data-session-practice-back]');
          document.documentElement.dataset.b265ConversationBackPresent = back ? '1' : '0';
          document.documentElement.dataset.b265ConversationBackBound = back?.dataset.b265BackBound === '1' ? '1' : '0';
          if (!back) return;
          const PointerCtor = window.PointerEvent || window.MouseEvent;
          back.dispatchEvent(new PointerCtor('pointerdown', { bubbles: true, cancelable: true, button: 0 }));
          back.dispatchEvent(new PointerCtor('pointerup', { bubbles: true, cancelable: true, button: 0 }));
          waitFor(
            () => window.FrenchTranquilleSessionUX.state().practiceMode === null && document.querySelector('.practice-session-hub'),
            hub => {
              document.documentElement.dataset.b265ConversationPointerBack = '1';
              document.documentElement.dataset.b265ConversationHub = hub ? '1' : '0';
              window.FrenchTranquilleSessionUX.setPracticeMode('guided');
              waitFor(
                () => {
                  const candidate = document.querySelector('[data-session-practice-back]');
                  return candidate?.dataset.b265BackBound === '1' ? candidate : null;
                },
                clickBack => {
                  clickBack.click();
                  waitFor(
                    () => window.FrenchTranquilleSessionUX.state().practiceMode === null && document.querySelector('.practice-session-hub'),
                    () => { document.documentElement.dataset.b265ConversationClickBack = '1'; }
                  );
                }
              );
            }
          );
        });
      }
    );
  }

  function progressNodes() {
    const layout = document.querySelector('.screen-progress .progress-layout.progress-ux-ready');
    const left = layout?.querySelector(':scope > div:first-child');
    const overview = left?.querySelector(':scope > .progress-ux-overview');
    const curriculum = left?.querySelector(':scope > .progress-ux-curriculum');
    const details = layout?.querySelector(':scope > .progress-ux-details');
    if (!layout || !left || !overview || !curriculum || !details) return null;
    return { layout, left, overview, curriculum, details };
  }

  function recordProgress(nodes, mobile) {
    const { layout, left, overview, curriculum, details } = nodes;
    const overviewRect = overview.getBoundingClientRect();
    const curriculumRect = curriculum.getBoundingClientRect();
    const leftRect = left.getBoundingClientRect();
    const detailsRect = details.getBoundingClientRect();
    const gap = Math.round(curriculumRect.top - overviewRect.bottom);
    document.documentElement.dataset.b265ProgressComposition = layout.dataset.progressComposition || '';
    document.documentElement.dataset.b265ProgressDetailsDirect = details.parentElement === layout ? '1' : '0';
    document.documentElement.dataset.b265ProgressCurriculumLeft = curriculum.parentElement === left ? '1' : '0';
    document.documentElement.dataset.b265ProgressGap = String(gap);
    document.documentElement.dataset.b265ProgressCompactGap = gap >= 0 && gap <= 48 ? '1' : '0';
    document.documentElement.dataset.b265ProgressNestedScroll = details.scrollHeight > details.clientHeight + 2 && ['auto','scroll'].includes(getComputedStyle(details).overflowY) ? '1' : '0';
    document.documentElement.dataset.b265ProgressPageScrollable = document.documentElement.scrollHeight > innerHeight + 2 ? '1' : '0';
    if (mobile) {
      const ordered = overviewRect.top <= curriculumRect.top && curriculumRect.top <= detailsRect.top;
      document.documentElement.dataset.b265ProgressMobileOrder = ordered ? '1' : '0';
      document.documentElement.dataset.b265ProgressMobileDetailsClosed = details.open ? '0' : '1';
    } else {
      const sideBySide = detailsRect.left >= leftRect.right - 4;
      document.documentElement.dataset.b265ProgressSideBySide = sideBySide ? '1' : '0';
    }
  }

  function smokeProgress(mobile = false) {
    legacyGo('progress');
    waitFor(progressNodes, nodes => {
      if (!mobile) {
        nodes.details.open = true;
        window.FrenchTranquilleProgressDetailsDashboard?.open?.('mastery');
        waitFor(
          () => {
            const current = progressNodes();
            const mastery = current?.details.querySelector('[data-progress-detail-panel="mastery"]:not([hidden])');
            return current && mastery ? current : null;
          },
          current => recordProgress(current, false)
        );
      } else {
        nodes.details.open = false;
        requestAnimationFrame(() => recordProgress(nodes, true));
      }
    });
  }

  if (smoke === 'conversation') setTimeout(smokeConversation, 140);
  if (smoke === 'progress') setTimeout(() => smokeProgress(false), 140);
  if (smoke === 'progress-mobile') setTimeout(() => smokeProgress(true), 140);

  window.FrenchTranquilleBuild265UX = {
    version: '1.19.5',
    build: '26.5',
    refresh() {
      bindPracticeBackButtons();
      window.FrenchTranquilleSessionUX?.schedule?.();
      window.FrenchTranquilleProgressionUX?.decorate?.();
    }
  };
})();
