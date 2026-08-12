(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  if (!params.has('b292Smoke')) return;
  const root = document.documentElement;
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const waitFor = async (fn, timeout=7000) => {
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
  const norm = value => String(value || '').toLocaleLowerCase('fr-FR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();

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
    let option = [...quiz.querySelectorAll('[data-choice]')].find(button => text(button) === expected);
    if (!option && lesson.challenge?.answer) option = [...quiz.querySelectorAll('[data-choice]')].find(button => text(button) === lesson.challenge.answer);
    option?.click();
    return Boolean(option);
  }

  async function advanceUntil(kind, lesson, maxMoves=28) {
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
      await sleep(120);
    }
    return null;
  }

  async function run() {
    const api = await waitFor(() => window.FrenchTranquilleSpeakingLoop);
    const core = await waitFor(() => window.FrenchTranquilleCurriculum?.lessons?.length === 40 && window.FrenchTranquilleCurriculum);
    if (!api || !core) {
      root.dataset.b292SmokeError = 'boot';
      return;
    }

    const coverage = api.coverage();
    root.dataset.b292CoverageLessons = String(coverage.lessons);
    root.dataset.b292CoverageCovered = String(coverage.covered);
    root.dataset.b292CoverageDistinct = String(coverage.distinct);
    root.dataset.b292CoverageMax = String(coverage.maxMoments);

    const l7Known = core.lessons
      .filter(lesson => Number(lesson.number) < 7)
      .flatMap(lesson => lesson.items || [])
      .map(item => item.id);
    const l7Plan = api.selectionForLesson('l7', { knownIds:l7Known, recent:[], memory:new Map() });
    root.dataset.b292L7Primary = l7Plan?.primaryText || '';
    root.dataset.b292L7Recap = l7Plan?.recapText || '';
    root.dataset.b292L7RecapSource = l7Plan?.recapSource || '';
    root.dataset.b292L7Distinct = l7Plan && norm(l7Plan.primaryText) !== norm(l7Plan.recapText) ? '1' : '0';
    root.dataset.b292L7NoTenEurosLoop = l7Plan && norm(l7Plan.recapText) !== '10 euros' ? '1' : '0';
    root.dataset.b292L7ContextualRecall = l7Plan?.recapText === 'Combien ça coûte ?' ? '1' : '0';

    const rotated = api.selectionForLesson('l7', {
      knownIds:l7Known,
      recent:[l7Plan?.primaryText || '', l7Plan?.recapText || ''],
      memory:new Map()
    });
    root.dataset.b292RotationPrimary = rotated?.primaryText || '';
    root.dataset.b292RotationRecap = rotated?.recapText || '';
    root.dataset.b292RotationAvoided = rotated && norm(rotated.primaryText) !== norm(l7Plan?.primaryText) && norm(rotated.recapText) !== norm(l7Plan?.recapText) ? '1' : '0';

    const lesson = core.lessons.find(entry => entry.id === 'l1');
    const open = document.querySelector('[data-open-lesson="l1"]');
    if (!lesson || !open) {
      root.dataset.b292SmokeError = 'lesson-open';
      return;
    }
    open.click();
    if (!await waitFor(() => document.querySelector('.screen-lesson'))) {
      root.dataset.b292SmokeError = 'lesson-screen';
      return;
    }

    const teach = await advanceUntil('teach', lesson);
    if (!teach) {
      root.dataset.b292SmokeError = 'teach';
      return;
    }
    const nativeModel = teach.parentElement?.querySelector('.french-block .listen[data-speak]');
    const teachPhrase = teach.dataset.speakingLoopPhrase || '';
    root.dataset.b292TeachReady = '1';
    root.dataset.b292TeachPhrase = teachPhrase;
    root.dataset.b292NativeModel = nativeModel && /Tyffany/.test(text(nativeModel)) ? '1' : '0';
    root.dataset.b292TeachModelOwner = teach.dataset.speakingLoopModel || '';
    root.dataset.b292TeachDuplicateModel = teach.querySelectorAll('[data-speaking-model]').length ? '1' : '0';
    root.dataset.b292TeachModelExplanation = /Tyffany/.test(text(teach.querySelector('.speaking-loop-head p'))) ? '1' : '0';

    const final = await advanceUntil('recap', lesson);
    if (!final) {
      root.dataset.b292SmokeError = 'recap';
      return;
    }
    const finalPhrase = final.dataset.speakingLoopPhrase || '';
    root.dataset.b292RecapReady = '1';
    root.dataset.b292RecapPhrase = finalPhrase;
    root.dataset.b292RecapDistinct = norm(finalPhrase) !== norm(teachPhrase) ? '1' : '0';
    root.dataset.b292RecapModelCount = String(final.querySelectorAll('[data-speaking-model]').length);
    root.dataset.b292LegacyChallengeCard = document.querySelectorAll('.speaking-loop-card[data-speaking-loop="challenge"]').length ? '1' : '0';
    root.dataset.b292NoPronunciationScore = /prononciation\s*[:=]\s*\d|\d+\s*%/i.test(text(teach)+text(final)) ? '0' : '1';
    root.dataset.b292HorizontalOverflow = String(Math.max(0, Math.ceil(document.documentElement.scrollWidth - document.documentElement.clientWidth)));

    const targets = [nativeModel, ...final.querySelectorAll('button')].filter(visible);
    root.dataset.b292MinTarget = targets.length ? String(Math.round(Math.min(...targets.map(button => button.getBoundingClientRect().height)))) : '0';
    root.dataset.b292SmokeComplete = '1';
  }

  setTimeout(() => run().catch(error => { root.dataset.b292SmokeError = String(error?.message || error || 'unknown'); }), 250);
})();
