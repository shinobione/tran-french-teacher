(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  if (!params.has('b31Audit')) return;

  const root = document.documentElement;
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const waitFor = async (predicate, timeout = 12000) => {
    const started = performance.now();
    while (performance.now() - started < timeout) {
      try { if (predicate()) return true; } catch {}
      await sleep(50);
    }
    return false;
  };
  const mark = (name, value) => root.dataset[`b31${name}`] = String(value);

  function rawStores(contracts) {
    return Object.fromEntries(Object.values(contracts.stores).map(key => [key, localStorage.getItem(key)]));
  }

  function sameRaw(a, b) {
    return Object.keys(a).length === Object.keys(b).length && Object.keys(a).every(key => a[key] === b[key]);
  }

  async function run() {
    const ready = await waitFor(() => (
      window.FrenchTranquilleLearnerIntelligence &&
      window.FrenchTranquilleMemory &&
      window.FrenchTranquilleErrors &&
      window.FrenchTranquilleRuntime &&
      window.FrenchTranquilleRuntimeContracts &&
      root.dataset.ftArchitectureSettled === '1'
    ));
    mark('Ready', ready ? 1 : 0);
    if (!ready) throw new Error('b31-runtime-not-ready');

    await sleep(180);
    const api = window.FrenchTranquilleLearnerIntelligence;
    const runtime = window.FrenchTranquilleRuntime;
    const contracts = window.FrenchTranquilleRuntimeContracts;
    const before = rawStores(contracts);
    const p = api.profile();
    const bandLessons = p.bands.reduce((sum, band) => sum + band.lessons.length, 0);
    const bandItems = p.bands.reduce((sum, band) => sum + band.items.length, 0);
    const recommendation = p.recommendation;
    const oldUser = params.get('uxSmoke') === 'lesson8';

    mark('Version', api.version);
    mark('Build', api.build);
    mark('MetaVersion', window.FrenchTranquilleBuildMeta?.version || 'missing');
    mark('MetaBuild', window.FrenchTranquilleBuildMeta?.build || 'missing');
    mark('Lessons', p.metrics.lessons);
    mark('Items', p.metrics.items);
    mark('Bands', p.bands.length);
    mark('BandLessons', bandLessons);
    mark('BandItems', bandItems);
    mark('Level', p.level.code);
    mark('Score', p.overallScore);
    mark('Confidence', p.confidence);
    mark('Reviewed', p.metrics.reviewedItems);
    mark('Recommendation', recommendation.type);
    mark('RecommendationLesson', recommendation.lessonId || 'none');
    mark('VoiceNeutral', api.sourceKind('free-voice-voice') === 'recognition' && api.sourceKind('voice-unrecognized') === 'recognition' ? 1 : 0);

    const routed = runtime.route('progress');
    const progressReady = routed && await waitFor(() => document.querySelector('.screen-progress .learner-intelligence-card[data-learner-intelligence="1"]'));
    mark('ProgressCard', progressReady ? 1 : 0);
    const details = document.querySelector('.screen-progress .learner-intelligence-card details');
    mark('DetailsCollapsed', details && !details.open ? 1 : 0);
    mark('HorizontalOverflow', document.documentElement.scrollWidth > document.documentElement.clientWidth + 1 ? 1 : 0);

    const after = rawStores(contracts);
    mark('StoresUnchanged', sameRaw(before, after) ? 1 : 0);

    if (oldUser) {
      const snap = runtime.snapshot();
      mark('OldUserCompleted', snap.learner.completedLessons);
      mark('OldUserKnown', snap.learner.knownItems);
      mark('OldUserL8', snap.learner.lessonProgress?.l8 ?? -1);
    } else {
      mark('OldUserCompleted', 'na');
      mark('OldUserKnown', 'na');
      mark('OldUserL8', 'na');
    }

    const expectedRecommendation = oldUser ? recommendation.type === 'lesson' && recommendation.lessonId === 'l8' : recommendation.type === 'lesson' && recommendation.lessonId === 'l1';
    const expected = [
      api.version === '2.1.0',
      Number(api.build) === 31,
      window.FrenchTranquilleBuildMeta?.version === '2.1.0',
      String(window.FrenchTranquilleBuildMeta?.build) === '31',
      p.metrics.lessons === 40,
      p.metrics.items === 241,
      p.bands.length === 5,
      bandLessons === 40,
      bandItems === 241,
      Number.isFinite(p.overallScore) && p.overallScore >= 0 && p.overallScore <= 100,
      Number.isFinite(p.confidence) && p.confidence >= 0 && p.confidence <= 100,
      ['A0','A0+','Pré-A1','A1-','A1'].includes(p.level.code),
      expectedRecommendation,
      api.sourceKind('free-voice-voice') === 'recognition',
      api.sourceKind('voice-unrecognized') === 'recognition',
      progressReady,
      details && !details.open,
      sameRaw(before, after),
      document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1
    ];

    if (oldUser) {
      const snap = runtime.snapshot();
      expected.push(
        snap.learner.completedLessons === 7,
        snap.learner.knownItems === 40,
        snap.learner.lessonProgress?.l8 === 4
      );
    }

    mark('Complete', expected.every(Boolean) ? 1 : 0);
  }

  run().catch(error => {
    mark('Error', error?.message || String(error));
    mark('Complete', 0);
  });
})();
