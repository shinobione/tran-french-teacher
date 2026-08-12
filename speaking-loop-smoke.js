(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  if (!params.has('b291Smoke')) return;
  const root = document.documentElement;
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const waitFor = async (fn, timeout=6000) => {
    const start = performance.now();
    while (performance.now() - start < timeout) {
      const value = fn();
      if (value) return value;
      await sleep(60);
    }
    return null;
  };
  const visible = node => {
    if (!(node instanceof HTMLElement)) return false;
    const style = getComputedStyle(node);
    const rect = node.getBoundingClientRect();
    return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0 && rect.width > 0 && rect.height > 0;
  };
  const text = node => String(node?.textContent || '').replace(/\s+/g,' ').trim();

  function answerCurrentQuiz(lesson) {
    const step = document.querySelector('.screen-lesson .lesson-step');
    const quiz = step?.querySelector('.quiz');
    if (!quiz || step.querySelector('.feedback.ok')) return false;
    const question = text(quiz.querySelector('.question'));
    let expected = '';
    if (question.includes(lesson.challenge?.fr || '') || question.includes(lesson.challenge?.vi || '')) {
      expected = String(lesson.challenge?.answer || '');
    } else {
      const target = lesson.items.find(item => question.includes(item.fr));
      expected = target?.vi || '';
    }
    const option = [...quiz.querySelectorAll('[data-choice]')].find(button => text(button) === expected);
    if (!option && lesson.challenge?.answer) {
      const challenge = [...quiz.querySelectorAll('[data-choice]')].find(button => text(button) === lesson.challenge.answer);
      challenge?.click();
      return Boolean(challenge);
    }
    option?.click();
    return Boolean(option);
  }

  async function advanceUntil(kind, lesson, maxMoves=18) {
    for (let move=0; move<maxMoves; move++) {
      window.FrenchTranquilleSpeakingLoop?.refresh?.();
      const panel = document.querySelector(`.screen-lesson .speaking-loop-card[data-speaking-loop="${kind}"]`);
      if (panel && visible(panel)) return panel;
      if (document.querySelector('.screen-lesson .quiz') && !document.querySelector('.screen-lesson .feedback.ok')) {
        answerCurrentQuiz(lesson);
        await sleep(100);
        continue;
      }
      const next = document.querySelector('.screen-lesson [data-next]:not(:disabled)');
      if (!next) { await sleep(100); continue; }
      next.click();
      await sleep(110);
    }
    return null;
  }

  async function run() {
    const api = await waitFor(() => window.FrenchTranquilleSpeakingLoop);
    const core = await waitFor(() => window.FrenchTranquilleCurriculum?.lessons?.length === 40 && window.FrenchTranquilleCurriculum);
    if (!api || !core) {
      root.dataset.b291SmokeError = 'boot';
      return;
    }

    const coverage = api.coverage();
    root.dataset.b291CoverageLessons = String(coverage.lessons);
    root.dataset.b291CoverageCovered = String(coverage.covered);
    root.dataset.b291CoverageMax = String(coverage.maxMoments);

    const lesson = core.lessons.find(entry => entry.id === 'l1');
    const open = document.querySelector('[data-open-lesson="l1"]');
    if (!lesson || !open) {
      root.dataset.b291SmokeError = 'lesson-open';
      return;
    }
    open.click();
    if (!await waitFor(() => document.querySelector('.screen-lesson'))) {
      root.dataset.b291SmokeError = 'lesson-screen';
      return;
    }

    const teach = await advanceUntil('teach', lesson);
    if (!teach) {
      root.dataset.b291SmokeError = 'teach';
      return;
    }
    const teachRect = teach.getBoundingClientRect();
    const teachButtons = [...teach.querySelectorAll('button')].filter(visible);
    root.dataset.b291TeachReady = '1';
    root.dataset.b291TeachPhrase = teach.dataset.speakingLoopPhrase || '';
    root.dataset.b291TeachButtons = String(teachButtons.length);
    root.dataset.b291TeachWidth = String(Math.round(teachRect.width));
    root.dataset.b291TeachMinTarget = String(Math.round(Math.min(...teachButtons.map(button => button.getBoundingClientRect().height))));

    const challenge = await advanceUntil('challenge', lesson, 22);
    if (!challenge) {
      root.dataset.b291SmokeError = 'challenge';
      return;
    }
    const challengeRect = challenge.getBoundingClientRect();
    root.dataset.b291ChallengeReady = '1';
    root.dataset.b291ChallengePhrase = challenge.dataset.speakingLoopPhrase || '';
    root.dataset.b291ChallengeWidth = String(Math.round(challengeRect.width));
    root.dataset.b291HorizontalOverflow = String(Math.max(0, Math.ceil(document.documentElement.scrollWidth - document.documentElement.clientWidth)));
    root.dataset.b291NoPronunciationScore = /prononciation\s*[:=]\s*\d|\d+\s*%/i.test(text(teach)+text(challenge)) ? '0' : '1';
    root.dataset.b291SmokeComplete = '1';
  }

  setTimeout(() => run().catch(error => { root.dataset.b291SmokeError = String(error?.message || error || 'unknown'); }), 250);
})();