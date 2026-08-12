(() => {
  'use strict';

  const params = new URLSearchParams(location.search);
  if (!params.has('v2Audit')) return;

  const root = document.documentElement;
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const waitFor = async (predicate, timeout = 10000) => {
    const started = performance.now();
    while (performance.now() - started < timeout) {
      try { if (predicate()) return true; } catch {}
      await sleep(50);
    }
    return false;
  };
  const mark = (name, value) => { root.dataset[`v2${name}`] = String(value); };

  function rawStores(contracts) {
    return Object.fromEntries(Object.entries(contracts.stores).map(([id, key]) => [id, localStorage.getItem(key)]));
  }

  function sameRaw(a, b) {
    return Object.keys(a).every(key => a[key] === b[key]) && Object.keys(b).every(key => a[key] === b[key]);
  }

  function currentReleaseCompatible(version, build) {
    const parts = String(version || '').split('.').map(Number);
    return parts.length === 3 && parts.every(Number.isFinite) && parts[0] === 2 && Number(build) >= 30;
  }

  async function fetchReleaseContract() {
    const response = await fetch('./release-v2.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`release-contract-http-${response.status}`);
    return response.json();
  }

  async function openSettingsAndReadVersion() {
    const gear = document.querySelector('[data-go="settings"]');
    if (!gear) return null;
    gear.click();
    const ready = await waitFor(() => document.querySelector('#app .app-shell.screen-settings .diagnostics'));
    if (!ready) return null;
    const rows = [...document.querySelectorAll('.screen-settings .diagnostics > div')];
    return rows.find(row => /version|phiên bản/i.test(row.querySelector('span')?.textContent || ''))?.querySelector('strong')?.textContent?.trim() || null;
  }

  async function run() {
    const ready = await waitFor(() => (
      window.FrenchTranquilleRuntime &&
      window.FrenchTranquilleRuntimeContracts &&
      window.FrenchTranquilleRecovery &&
      window.FrenchTranquilleSpeakingLoop &&
      root.dataset.ftArchitectureSettled === '1'
    ));
    mark('Ready', ready ? 1 : 0);
    if (!ready) throw new Error('runtime-not-ready');

    const runtime = window.FrenchTranquilleRuntime;
    const contracts = window.FrenchTranquilleRuntimeContracts;
    const release = await fetchReleaseContract();
    const meta = window.FrenchTranquilleBuildMeta || {};
    const before = rawStores(contracts);
    const snap = runtime.snapshot();
    const backup = window.FrenchTranquilleRecovery.backupObject();
    const recoverySpecs = window.FrenchTranquilleRecovery.core?.STORE_SPECS || [];

    mark('Version', meta.version || 'missing');
    mark('Build', meta.build || 'missing');
    mark('ContractVersion', contracts.version);
    mark('ContractBuild', contracts.build);
    mark('ReleaseFormat', release.format === 'french-tranquille-release-contract' ? 1 : 0);
    mark('ReleaseVersion', release.version);
    mark('ReleaseBuild', release.architectureBuild);
    mark('Lessons', snap.curriculum.lessons);
    mark('Items', snap.curriculum.items);
    mark('Scenarios', contracts.product.scenarios);
    mark('ScenarioTurns', contracts.product.scenarioTurns);
    mark('ListeningNormal', contracts.product.listeningNormal);
    mark('ListeningSlow', contracts.product.listeningSlow);
    mark('SpeakingMax', contracts.product.maxSpeakingMomentsPerLesson);
    mark('DurableStores', Object.keys(contracts.stores).length);
    mark('RecoverySpecs', recoverySpecs.length);
    mark('BackupVersion', backup.version);
    mark('BackupStores', Object.keys(backup.stores || {}).length);
    mark('BackupAppVersion', backup.app?.version || 'missing');
    mark('BackupAppBuild', backup.app?.build || 'missing');
    mark('MissingRequired', snap.missingRequired.length);

    const expectedStoreKeys = Object.values(contracts.stores);
    const recoveryKeys = recoverySpecs.map(spec => spec.key);
    const storeAgreement = expectedStoreKeys.length === recoveryKeys.length && expectedStoreKeys.every(key => recoveryKeys.includes(key));
    mark('StoreAgreement', storeAgreement ? 1 : 0);

    if (params.get('uxSmoke') === 'lesson8') {
      mark('OldUserCompleted', snap.learner.completedLessons);
      mark('OldUserL8', snap.learner.lessonProgress?.l8 ?? -1);
      mark('OldUserKnown', snap.learner.knownItems);
    } else {
      mark('OldUserCompleted', 'na');
      mark('OldUserL8', 'na');
      mark('OldUserKnown', 'na');
    }

    const routedProgress = runtime.route('progress');
    const progressReady = routedProgress && await waitFor(() => document.body.dataset.b27Screen === 'progress' || document.body.dataset.uxScreen === 'progress');
    mark('ProgressRoute', progressReady ? 1 : 0);

    const routedToday = runtime.route('today');
    const todayReady = routedToday && await waitFor(() => document.body.dataset.b27Screen === 'home' || document.body.dataset.uxScreen === 'home');
    mark('TodayRoute', todayReady ? 1 : 0);

    const routedPractice = runtime.route('practice');
    const practiceReady = routedPractice && await waitFor(() => root.classList.contains('b27-practice-open') || root.classList.contains('ux-practice-open'));
    mark('PracticeRoute', practiceReady ? 1 : 0);
    document.querySelector('[data-b27-close-practice], [data-ux-close]')?.click();
    await sleep(120);

    const versionLabel = await openSettingsAndReadVersion();
    mark('OptionsVersion', versionLabel || 'missing');

    runtime.route('today');
    await sleep(120);
    const after = rawStores(contracts);
    const storesUnchanged = sameRaw(before, after);
    const optionsExpected = `v${meta.version} • Build ${meta.build}`;
    const backupMatchesRuntime = backup.app?.version === meta.version && String(backup.app?.build) === String(meta.build);
    const currentCompatible = currentReleaseCompatible(meta.version, meta.build) && backupMatchesRuntime && versionLabel === optionsExpected;
    mark('StoresUnchanged', storesUnchanged ? 1 : 0);
    mark('BackupMatchesRuntime', backupMatchesRuntime ? 1 : 0);
    mark('OptionsMatchesRuntime', versionLabel === optionsExpected ? 1 : 0);
    mark('CurrentCompatible', currentCompatible ? 1 : 0);
    mark('HorizontalOverflow', document.documentElement.scrollWidth > document.documentElement.clientWidth + 1 ? 1 : 0);

    const releaseProduct = release.product || {};
    const expected = [
      currentReleaseCompatible(meta.version, meta.build),
      contracts.version === '2.0.0',
      contracts.build === 30,
      release.version === '2.0.0',
      release.architectureBuild === 30,
      snap.curriculum.lessons === 40,
      snap.curriculum.items === 241,
      contracts.product.scenarios === 36,
      contracts.product.scenarioTurns === 108,
      contracts.product.listeningNormal === 0.88,
      contracts.product.listeningSlow === 0.65,
      contracts.product.maxSpeakingMomentsPerLesson === 2,
      releaseProduct.curriculumLessons === 40,
      releaseProduct.curriculumItems === 241,
      releaseProduct.scenarioSituations === 36,
      releaseProduct.scenarioTurns === 108,
      releaseProduct.listeningNormal === 0.88,
      releaseProduct.listeningSlow === 0.65,
      Object.keys(contracts.stores).length === 6,
      recoverySpecs.length === 6,
      storeAgreement,
      backup.version === 2,
      Object.keys(backup.stores || {}).length === 6,
      backupMatchesRuntime,
      snap.missingRequired.length === 0,
      Boolean(window.FrenchTranquilleSpeakingLoop),
      Boolean(window.FrenchTranquilleBuild27Shell),
      Boolean(window.FrenchTranquilleRecovery),
      progressReady,
      todayReady,
      practiceReady,
      versionLabel === optionsExpected,
      storesUnchanged,
      document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1
    ];

    if (params.get('uxSmoke') === 'lesson8') {
      expected.push(
        snap.learner.completedLessons === 7,
        snap.learner.lessonProgress?.l8 === 4,
        snap.learner.knownItems === 40
      );
    }

    mark('Complete', expected.every(Boolean) ? 1 : 0);
  }

  run().catch(error => {
    mark('Error', error?.message || String(error));
    mark('Complete', 0);
  });
})();
