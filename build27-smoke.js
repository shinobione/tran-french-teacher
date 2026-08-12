(() => {
  'use strict';
  const mode = new URLSearchParams(location.search).get('b27Smoke');
  if (!mode) return;

  const html = document.documentElement;
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const visible = node => Boolean(node && getComputedStyle(node).display !== 'none' && getComputedStyle(node).visibility !== 'hidden' && node.getBoundingClientRect().width > 1 && node.getBoundingClientRect().height > 1);
  const waitFor = async (selector, timeout = 6000) => {
    const start = performance.now();
    while (performance.now() - start < timeout) {
      const node = document.querySelector(selector);
      if (node) return node;
      await sleep(40);
    }
    return null;
  };
  const waitForShellApi = async (method, timeout = 6000) => {
    const start = performance.now();
    while (performance.now() - start < timeout) {
      const shell = window.FrenchTranquilleBuild27Shell;
      if (typeof shell?.[method] === 'function') {
        html.dataset.b27VisualShellWaitMs = String(Math.round(performance.now() - start));
        return shell;
      }
      await sleep(40);
    }
    html.dataset.b27VisualShellWaitMs = String(Math.round(performance.now() - start));
    return null;
  };
  const waitGone = async (selector, timeout = 3000) => {
    const start = performance.now();
    while (performance.now() - start < timeout) {
      const node = document.querySelector(selector);
      if (!node || !visible(node)) return true;
      await sleep(35);
    }
    return false;
  };
  const waitOverlaySettled = async (timeout = 3000) => {
    const start = performance.now();
    while (performance.now() - start < timeout) {
      const overlay = document.querySelector('.b27-overlay');
      if (!overlay || (!overlay.classList.contains('b27-entering') && !overlay.classList.contains('b27-leaving'))) {
        html.dataset.b27VisualSettleMs = String(Math.round(performance.now() - start));
        return overlay;
      }
      await sleep(40);
    }
    html.dataset.b27VisualSettleMs = String(Math.round(performance.now() - start));
    return document.querySelector('.b27-overlay');
  };
  const click = async selector => {
    const node = await waitFor(selector);
    if (!node) return false;
    node.dispatchEvent(new PointerEvent('pointerdown', { bubbles:true, pointerType:'mouse' }));
    node.dispatchEvent(new PointerEvent('pointerup', { bubbles:true, pointerType:'mouse' }));
    node.click();
    return true;
  };
  const markGeometry = prefix => {
    html.dataset[`${prefix}Width`] = String(Math.round(document.documentElement.clientWidth || 0));
    html.dataset[`${prefix}Overflow`] = String(Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth));
  };

  async function homeContract() {
    const home = await waitFor('.b27-home');
    if (!home) return;
    const primary = home.querySelector('.b27-primary-card');
    const legacy = [...document.querySelectorAll('.screen-home .home-dashboard,.screen-home .daily-coach-card')].filter(visible);
    html.dataset.b27HomeReady = visible(home) ? '1' : '0';
    html.dataset.b27HomePrimary = visible(primary) ? '1' : '0';
    html.dataset.b27HomePrimaryButtons = String(home.querySelectorAll('[data-b27-open-lesson]').length);
    html.dataset.b27HomeQuickActions = String(home.querySelectorAll('.b27-quick-card').length);
    html.dataset.b27HomeLegacyVisible = String(legacy.length);
    html.dataset.b27HomeHeight = String(Math.round(home.getBoundingClientRect().height));
    markGeometry('b27Home');
  }

  async function openPracticeState() {
    if (!await waitFor('.b27-home')) return false;
    if (!await click('.ux-bottom-nav [data-ux-nav="practice"]')) return false;
    const practice = await waitFor('.b27-practice-page');
    if (!practice) return false;
    await sleep(120);
    html.dataset.b27PracticeVisible = visible(practice) ? '1' : '0';
    html.dataset.b27PracticeActions = String(practice.querySelectorAll('.b27-practice-action').length);
    return true;
  }

  async function openProgressState() {
    if (!await waitFor('.b27-home')) return false;
    if (!await click('.ux-bottom-nav [data-ux-nav="progress"]')) return false;
    const progress = await waitFor('.b27-progress-page', 10000);
    if (!progress) return false;
    await sleep(120);
    html.dataset.b27ProgressVisible = visible(progress) ? '1' : '0';
    html.dataset.b27ProgressLegacyVisible = String([...document.querySelectorAll('.screen-progress .progress-layout')].filter(visible).length);
    html.dataset.b27ProgressLessonRows = String(progress.querySelectorAll('.b27-mini-lessons .b27-lesson-row').length);
    return true;
  }

  async function visualState(target) {
    if (target === 'practice') {
      if (!await openPracticeState()) return;
    } else if (target === 'progress') {
      if (!await openProgressState()) return;
    } else if (target === 'journey') {
      // The real Progress → Journey click path is already certified by flowContract.
      // For visual review, open the overlay directly through Build 27's public API
      // from a stable Home state so no second navigation timing can interfere.
      if (!await waitFor('.b27-home', 6000)) return;
      const shell = await waitForShellApi('openJourney', 6000);
      if (!shell) {
        html.dataset.b27VisualShellReady = '0';
        return;
      }
      html.dataset.b27VisualShellReady = '1';
      shell.openJourney();
      if (!await waitFor('.b27-journey-page', 5000)) return;
    } else {
      if (!await waitFor('.b27-home')) return;
    }

    await sleep(80);
    const overlay = await waitOverlaySettled(3000);
    html.dataset.b27VisualEntering = overlay?.classList.contains('b27-entering') ? '1' : '0';
    html.dataset.b27VisualLeaving = overlay?.classList.contains('b27-leaving') ? '1' : '0';
    html.dataset.b27VisualReady = target;
    markGeometry('b27Visual');
  }

  async function flowContract() {
    const home = await waitFor('.b27-home');
    if (!home) return;
    html.dataset.b27FlowPhase = 'home';

    if (!await openPracticeState()) return;
    html.dataset.b27FlowPhase = 'practice';

    if (!await click('[data-b27-close-practice]')) return;
    html.dataset.b27FlowPhase = 'practice-back-clicked';
    const practiceGone = await waitGone('.b27-practice-page', 4000);
    html.dataset.b27PracticeClosed = practiceGone ? '1' : '0';
    if (!practiceGone) return;
    html.dataset.b27FlowPhase = 'practice-closed';

    const progressNav = await waitFor('.ux-bottom-nav [data-ux-nav="progress"]', 5000);
    html.dataset.b27ProgressNavReady = progressNav ? '1' : '0';
    if (!progressNav) return;
    progressNav.click();
    html.dataset.b27FlowPhase = 'progress-clicked';

    const progress = await waitFor('.b27-progress-page', 10000);
    html.dataset.b27ProgressPageReady = progress ? '1' : '0';
    if (!progress) return;
    await sleep(80);
    html.dataset.b27ProgressVisible = visible(progress) ? '1' : '0';
    html.dataset.b27ProgressLegacyVisible = String([...document.querySelectorAll('.screen-progress .progress-layout')].filter(visible).length);
    html.dataset.b27ProgressLessonRows = String(progress.querySelectorAll('.b27-mini-lessons .b27-lesson-row').length);
    html.dataset.b27FlowPhase = 'progress';

    if (!await click('[data-b27-open-journey]')) return;
    const journey = await waitFor('.b27-journey-page');
    if (!journey) return;
    await sleep(80);
    html.dataset.b27JourneyVisible = visible(journey) ? '1' : '0';
    html.dataset.b27JourneyStages = String(journey.querySelectorAll('.b27-stage-tab').length);
    html.dataset.b27JourneyRows = String(journey.querySelectorAll('.b27-stage-lessons .b27-lesson-row').length);
    html.dataset.b27FlowPhase = 'journey';

    const lastStage = journey.querySelector('[data-b27-stage="a1-core"]');
    lastStage?.click();
    await sleep(80);
    html.dataset.b27JourneyA1Rows = String(document.querySelectorAll('.b27-journey-page .b27-stage-lessons .b27-lesson-row').length);

    if (!await click('[data-b27-close-journey]')) return;
    const journeyGone = await waitGone('.b27-journey-page', 4000);
    html.dataset.b27JourneyClosed = journeyGone ? '1' : '0';
    if (!journeyGone) return;
    const openLesson = await waitFor('.b27-progress-page [data-b27-open-lesson]', 5000);
    if (!openLesson) return;
    openLesson.click();
    const lesson = await waitFor('.screen-lesson', 10000);
    if (!lesson) return;
    await sleep(80);
    html.dataset.b27LessonReached = '1';
    html.dataset.b27FlowPhase = 'complete';
    markGeometry('b27Flow');
  }

  (async () => {
    try {
      if (mode === 'home') await homeContract();
      else if (mode === 'flow') await flowContract();
      else if (mode.startsWith('visual-')) await visualState(mode.slice(7));
      html.dataset.b27SmokeDone = '1';
    } catch (error) {
      html.dataset.b27SmokeError = String(error?.message || error);
    }
  })();
})();
