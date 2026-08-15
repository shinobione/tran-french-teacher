(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  if (!params.has('b30Audit')) return;

  const root = document.documentElement;
  const LEARNER_KEY = 'francais-avec-luc:learner:v1';
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const waitFor = async (predicate, timeout = 8000) => {
    const started = performance.now();
    while (performance.now() - started < timeout) {
      try { if (predicate()) return true; } catch {}
      await sleep(50);
    }
    return false;
  };
  const mark = (name, value) => root.dataset[`b30${name}`] = String(value);

  async function run() {
    const runtimeReady = await waitFor(() => window.FrenchTranquilleRuntime && root.dataset.ftArchitectureSettled === '1');
    mark('RuntimeReady', runtimeReady ? 1 : 0);
    if (!runtimeReady) return;

    const runtime = window.FrenchTranquilleRuntime;
    const contracts = window.FrenchTranquilleRuntimeContracts;
    const beforeLearner = localStorage.getItem(LEARNER_KEY);
    const before = runtime.snapshot();

    const ownerNames = Object.values(contracts.owners).flat();
    const uniqueOwners = new Set(ownerNames);
    const storeKeys = Object.values(contracts.stores);
    const uniqueStores = new Set(storeKeys);

    mark('Version', `${runtime.version}-${runtime.build}`);
    mark('Lessons', before.curriculum.lessons);
    mark('Items', before.curriculum.items);
    mark('MissingRequired', before.missingRequired.length);
    mark('OwnerNames', ownerNames.length);
    mark('OwnerUnique', ownerNames.length === uniqueOwners.size ? 1 : 0);
    mark('StoreUnique', storeKeys.length === uniqueStores.size ? 1 : 0);
    mark('LearnerKey', before.curriculum.learnerKey === contracts.stores.learner ? 1 : 0);
    mark('ProductContract', before.curriculum.lessons === contracts.product.lessons && before.curriculum.items === contracts.product.items ? 1 : 0);
    mark('SpeakingReady', window.FrenchTranquilleSpeakingLoop ? 1 : 0);
    mark('RecoveryReady', window.FrenchTranquilleRecovery ? 1 : 0);
    mark('ShellReady', window.FrenchTranquilleBuild27Shell ? 1 : 0);

    const progressRouted = runtime.route('progress');
    const progressReady = progressRouted && await waitFor(() => document.body.dataset.b27Screen === 'progress' || document.body.dataset.uxScreen === 'progress');
    mark('ProgressRoute', progressReady ? 1 : 0);

    const homeRouted = runtime.route('today');
    const homeReady = homeRouted && await waitFor(() => document.body.dataset.b27Screen === 'home' || document.body.dataset.uxScreen === 'home');
    mark('HomeRoute', homeReady ? 1 : 0);

    const practiceRouted = runtime.route('practice');
    const practiceReady = practiceRouted && await waitFor(() => root.classList.contains('b27-practice-open') || root.classList.contains('ux-practice-open'));
    mark('PracticeRoute', practiceReady ? 1 : 0);

    const close = document.querySelector('[data-b27-close-practice], [data-ux-close]');
    close?.click();
    await sleep(180);

    const afterLearner = localStorage.getItem(LEARNER_KEY);
    const after = runtime.refresh();
    mark('LearnerUnchanged', beforeLearner === afterLearner ? 1 : 0);
    mark('NavSingleActive', after.nav.active === 1 ? 1 : 0);
    mark('HorizontalOverflow', document.documentElement.scrollWidth > document.documentElement.clientWidth + 1 ? 1 : 0);
    mark('Complete', [
      before.curriculum.lessons === 40,
      before.curriculum.items === 241,
      before.missingRequired.length === 0,
      ownerNames.length === uniqueOwners.size,
      storeKeys.length === uniqueStores.size,
      before.curriculum.learnerKey === contracts.stores.learner,
      Boolean(window.FrenchTranquilleSpeakingLoop),
      progressReady,
      homeReady,
      practiceReady,
      beforeLearner === afterLearner,
      after.nav.active === 1,
      document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1
    ].every(Boolean) ? 1 : 0);
  }

  run().catch(error => {
    mark('Error', error?.message || 'unknown');
    mark('Complete', 0);
  });
})();
