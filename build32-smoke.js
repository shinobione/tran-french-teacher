(() => {
  'use strict';

  const params = new URLSearchParams(location.search);
  if (!params.has('b32Audit')) return;

  const root = document.documentElement;
  const sleep = ms => new Promise(resolve => setTimeout(resolve,ms));
  const waitFor = async (predicate,timeout=14000) => {
    const started = performance.now();
    while (performance.now()-started < timeout) {
      try { if (predicate()) return true; } catch {}
      await sleep(50);
    }
    return false;
  };
  const mark = (name,value) => root.dataset[`b32${name}`] = String(value);
  const rawStores = contracts => Object.fromEntries(Object.values(contracts.stores).map(key => [key,localStorage.getItem(key)]));
  const sameRaw = (a,b) => Object.keys(a).length === Object.keys(b).length && Object.keys(a).every(key => a[key] === b[key]);

  async function run() {
    const ready = await waitFor(() => (
      root.dataset.build32Ready === '1' &&
      window.FrenchTranquilleStage4 &&
      window.FrenchTranquilleRealLife4 &&
      window.FrenchTranquilleListeningData2 &&
      window.FrenchTranquilleLearnerIntelligence?.build === 32 &&
      window.FrenchTranquilleRuntime &&
      window.FrenchTranquilleRuntimeContracts &&
      window.FrenchTranquilleSpeakingLoop
    ));
    mark('Ready',ready?1:0);
    if (!ready) throw new Error('build32-runtime-not-ready');

    await sleep(220);
    const core = window.FrenchTranquilleCurriculum;
    const stage4 = window.FrenchTranquilleStage4;
    const real4 = window.FrenchTranquilleRealLife4;
    const listen2 = window.FrenchTranquilleListeningData2;
    const intelligence = window.FrenchTranquilleLearnerIntelligence;
    const runtime = window.FrenchTranquilleRuntime;
    const contracts = window.FrenchTranquilleRuntimeContracts;
    const before = rawStores(contracts);
    const profile = intelligence.profile();
    const bandLessons = profile.bands.reduce((sum,band) => sum + band.lessons.length,0);
    const bandItems = profile.bands.reduce((sum,band) => sum + band.items.length,0);
    const historicLessons = core.lessons.filter(lesson => Number(lesson.number) <= 40);
    const historicLessonIds = new Set(historicLessons.map(lesson => lesson.id));
    const historicItems = core.items.filter(item => historicLessonIds.has(item.lessonId));
    const itemIds = core.items.map(item => item.id);
    const scenarioData = window.FrenchTranquilleScenarioData?.scenarios || [];
    const scenarioTurns = scenarioData.reduce((sum,scenario) => sum + (scenario.turns?.length || 0),0);
    const coverage = window.FrenchTranquilleSpeakingLoop.coverage?.() || {};

    mark('Version',window.FrenchTranquilleBuildMeta?.version || 'missing');
    mark('Build',window.FrenchTranquilleBuildMeta?.build || 'missing');
    mark('Lessons',core.lessons.length);
    mark('Items',core.items.length);
    mark('HistoricLessons',historicLessons.length);
    mark('HistoricItems',historicItems.length);
    mark('Stage4Lessons',stage4.lessons.length);
    mark('Stage4Items',stage4.items.length);
    mark('UniqueItems',new Set(itemIds).size);
    mark('Bands',profile.bands.length);
    mark('BandLessons',bandLessons);
    mark('BandItems',bandItems);
    mark('Recommendation',profile.recommendation.type);
    mark('RecommendationLesson',profile.recommendation.lessonId || 'none');
    mark('Level',profile.level.code);
    mark('Scenarios',scenarioData.length);
    mark('ScenarioTurns',scenarioTurns);
    mark('Pack4Scenarios',real4.scenarios.length);
    mark('Pack4Turns',real4.scenarios.reduce((sum,scenario) => sum + scenario.turns.length,0));
    mark('Pack4InvalidItems',real4.invalidItems.length);
    mark('ListeningContrasts',listen2.contrasts.length);
    mark('ListeningDialogues',listen2.dialogues.length);
    mark('ListeningInvalidItems',listen2.invalidItems.length);
    mark('SpeakingLessons',coverage.lessons ?? -1);
    mark('SpeakingCovered',coverage.covered ?? -1);
    mark('SpeakingMax',coverage.maxMoments ?? -1);
    mark('VoiceNeutral',intelligence.sourceKind('free-voice-voice') === 'recognition' && intelligence.sourceKind('voice-unrecognized') === 'recognition' ? 1 : 0);

    const snap = runtime.snapshot();
    const oldUser = params.get('uxSmoke') === 'lesson8';
    const stage4User = params.get('realLifeSmoke') === 'lesson40';
    if (oldUser) {
      mark('OldUserCompleted',snap.learner.completedLessons);
      mark('OldUserKnown',snap.learner.knownItems);
      mark('OldUserL8',snap.learner.lessonProgress?.l8 ?? -1);
    }
    if (stage4User) mark('Completed40',snap.learner.completedLessons);

    let progressReady = true;
    let denominator = '';
    let journeyReady = true;
    let stageTabs = 0;
    let autonomyRows = 0;
    let interactionRows = 0;

    // realLifeSmoke=lesson40 is a historical data seed that intentionally disables
    // the Build27 shell. It proves continuity 40 -> 41; the normal/old-user audits
    // below own Build32 shell geometry and interaction.
    if (!stage4User) {
      runtime.route('progress');
      progressReady = await waitFor(() => document.querySelector('.b27-progress-page'));
      denominator = document.querySelector('.b27-level-head strong')?.textContent?.trim() || '';
      document.querySelector('[data-b27-open-journey]')?.click();
      // Build32Shell normally patches a newly-created Journey through
      // MutationObserver -> requestAnimationFrame. Chrome virtual-time may freeze
      // that rAF even while timers continue, so the smoke uses the shell's public
      // deterministic refresh hook after the Journey owner exists. Product runtime
      // behavior is unchanged; this only stabilizes the historical browser harness.
      await waitFor(() => document.querySelector('.b27-journey-page'),1000);
      window.FrenchTranquilleBuild32Shell?.refresh?.();
      journeyReady = await waitFor(() => (
        document.querySelectorAll('.b27-journey-page .b27-stage-tab').length === 7 &&
        document.querySelector('[data-b32-stage="a1-autonomy"]') &&
        document.querySelector('[data-b32-stage="a1-interaction"]')
      ));
      stageTabs = document.querySelectorAll('.b27-journey-page .b27-stage-tab').length;

      const autonomy = document.querySelector('[data-b32-stage="a1-autonomy"]');
      autonomy?.click();
      await waitFor(() => document.querySelectorAll('.b27-journey-page .b27-stage-lessons .b27-lesson-row').length === 6);
      autonomyRows = document.querySelectorAll('.b27-journey-page .b27-stage-lessons .b27-lesson-row').length;

      const interaction = document.querySelector('[data-b32-stage="a1-interaction"]');
      interaction?.click();
      await waitFor(() => document.querySelectorAll('.b27-journey-page .b27-stage-lessons .b27-lesson-row').length === 6);
      interactionRows = document.querySelectorAll('.b27-journey-page .b27-stage-lessons .b27-lesson-row').length;
      document.querySelector('[data-b27-close-journey]')?.click();
      await sleep(80);
    }

    mark('ProgressReady',stage4User ? 'na' : progressReady?1:0);
    mark('ProgressDenominator',stage4User ? 'na' : /\/\s*52/.test(denominator)?52:0);
    mark('JourneyTabs',stage4User ? 'na' : stageTabs);
    mark('AutonomyRows',stage4User ? 'na' : autonomyRows);
    mark('InteractionRows',stage4User ? 'na' : interactionRows);

    const after = rawStores(contracts);
    const storesUnchanged = sameRaw(before,after);
    mark('StoresUnchanged',storesUnchanged?1:0);
    mark('HorizontalOverflow',document.documentElement.scrollWidth > document.documentElement.clientWidth + 1 ? 1 : 0);

    const expectedLesson = oldUser ? 'l8' : stage4User ? 'l41' : 'l1';
    const expected = [
      window.FrenchTranquilleBuildMeta?.version === '2.2.0',
      String(window.FrenchTranquilleBuildMeta?.build) === '32',
      core.lessons.length === 52,core.items.length === 313,
      historicLessons.length === 40,historicItems.length === 241,
      stage4.lessons.length === 12,stage4.items.length === 72,
      new Set(itemIds).size === 313,
      stage4.lessons[0]?.id === 'l41',stage4.lessons.at(-1)?.id === 'l52',
      profile.bands.length === 7,bandLessons === 52,bandItems === 313,
      ['A0','A0+','Pré-A1','A1-','A1','A1+'].includes(profile.level.code),
      profile.recommendation.type === 'lesson',profile.recommendation.lessonId === expectedLesson,
      scenarioData.length === 44,scenarioTurns === 132,
      real4.scenarios.length === 8,real4.scenarios.reduce((sum,scenario) => sum + scenario.turns.length,0) === 24,real4.invalidItems.length === 0,
      listen2.contrasts.length === 4,listen2.dialogues.length === 8,listen2.invalidItems.length === 0,
      coverage.lessons === 52,coverage.covered === 52,coverage.maxMoments === 2,
      intelligence.sourceKind('free-voice-voice') === 'recognition',intelligence.sourceKind('voice-unrecognized') === 'recognition',
      storesUnchanged,document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1
    ];
    if (!stage4User) expected.push(
      progressReady,/\/\s*52/.test(denominator),journeyReady,stageTabs === 7,
      autonomyRows === 6,interactionRows === 6
    );
    if (oldUser) expected.push(snap.learner.completedLessons === 7,snap.learner.knownItems === 40,snap.learner.lessonProgress?.l8 === 4);
    if (stage4User) expected.push(snap.learner.completedLessons === 40);
    mark('Complete',expected.every(Boolean)?1:0);
  }

  run().catch(error => { mark('Error',error?.message || String(error)); mark('Complete',0); });
})();