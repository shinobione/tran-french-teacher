import CONTRACTS from './runtime-contracts.js?v=2.0.0-b30';

const REQUIRED_APIS = Object.freeze([
  'FrenchTranquilleCurriculum',
  'FrenchTranquilleRecovery',
  'FrenchTranquilleMemory',
  'FrenchTranquilleErrors',
  'FrenchTranquilleListening',
  'FrenchTranquilleScenarios',
  'FrenchTranquilleBuild27Shell'
]);

const OPTIONAL_LATE_APIS = Object.freeze([
  'FrenchTranquilleBuildMeta',
  'FrenchTranquilleSpeakingLoop'
]);

const root = document.documentElement;
let lastSnapshot = null;

function safeJson(key) {
  const raw = localStorage.getItem(key);
  if (raw === null) return { present:false, valid:true, value:null };
  try { return { present:true, valid:true, value:JSON.parse(raw) }; }
  catch { return { present:true, valid:false, value:null }; }
}

function curriculumSnapshot() {
  const api = window.FrenchTranquilleCurriculum;
  const lessons = Array.isArray(api?.lessons) ? api.lessons : [];
  const items = Array.isArray(api?.items) ? api.items : [];
  return {
    ready:Boolean(api),
    lessons:lessons.length,
    items:items.length,
    learnerKey:api?.key || null
  };
}

function learnerSnapshot() {
  const parsed = safeJson(CONTRACTS.stores.learner);
  const learner = parsed.value && typeof parsed.value === 'object' ? parsed.value : {};
  return {
    present:parsed.present,
    valid:parsed.valid,
    schemaVersion:Number(learner.schemaVersion || 0),
    completedLessons:Array.isArray(learner.completedLessons) ? learner.completedLessons.length : 0,
    knownItems:Array.isArray(learner.knownItems) ? learner.knownItems.length : 0,
    lessonProgress:learner.lessonProgress && typeof learner.lessonProgress === 'object' ? {...learner.lessonProgress} : {}
  };
}

function storesSnapshot() {
  return Object.fromEntries(Object.entries(CONTRACTS.stores).map(([name,key]) => {
    const parsed = safeJson(key);
    return [name, { key, present:parsed.present, valid:parsed.valid }];
  }));
}

function apiSnapshot() {
  const names = [...new Set(Object.values(CONTRACTS.owners).flat())];
  return Object.fromEntries(names.map(name => [name, {
    owner:CONTRACTS.ownerFor(name),
    ready:Boolean(window[name])
  }]));
}

function currentScreen() {
  const shell = document.querySelector('#app .app-shell');
  const className = shell ? [...shell.classList].find(name => name.startsWith('screen-')) : null;
  return className ? className.slice(7) : 'boot';
}

function navSnapshot() {
  const buttons = [...document.querySelectorAll('.ux-bottom-nav [data-ux-nav]')];
  const active = buttons.filter(button => button.getAttribute('aria-current') === 'page' || button.classList.contains('active'));
  return {
    total:buttons.length,
    active:active.length,
    activeId:active[0]?.dataset.uxNav || null
  };
}

function snapshot() {
  const curriculum = curriculumSnapshot();
  const learner = learnerSnapshot();
  const apis = apiSnapshot();
  const missingRequired = REQUIRED_APIS.filter(name => !window[name]);
  const lateReady = OPTIONAL_LATE_APIS.filter(name => Boolean(window[name]));
  const snap = {
    version:CONTRACTS.version,
    build:CONTRACTS.build,
    screen:currentScreen(),
    curriculum,
    learner,
    stores:storesSnapshot(),
    apis,
    missingRequired,
    lateReady,
    nav:navSnapshot()
  };
  lastSnapshot = snap;
  return snap;
}

function click(selector) {
  const node = document.querySelector(selector);
  if (!node) return false;
  node.click();
  return true;
}

function route(name) {
  if (name === 'practice') {
    if (typeof window.FrenchTranquilleBuild27Shell?.openPractice === 'function') {
      window.FrenchTranquilleBuild27Shell.openPractice();
      return true;
    }
    return click('.ux-bottom-nav [data-ux-nav="practice"]');
  }
  const legacy = CONTRACTS.routes[name];
  if (!legacy) return false;
  if (click(`.ux-bottom-nav [data-ux-nav="${CSS.escape(legacy)}"]`)) return true;
  return click(`.bottom-nav [data-go="${CSS.escape(legacy)}"]`);
}

function openLesson(id) {
  if (!/^l\d+$/.test(String(id))) return false;
  const selectors = [
    `[data-b27-open-lesson="${CSS.escape(id)}"]`,
    `[data-open-lesson="${CSS.escape(id)}"]`
  ];
  for (const selector of selectors) {
    const node = [...document.querySelectorAll(selector)].find(candidate => !candidate.disabled && candidate.offsetParent !== null);
    if (node) { node.click(); return true; }
  }
  return false;
}

function refresh() {
  const snap = snapshot();
  const ready = snap.missingRequired.length === 0;
  if (root.dataset.ftArchitectureReady !== (ready ? '1' : '0')) root.dataset.ftArchitectureReady = ready ? '1' : '0';
  if (root.dataset.ftArchitectureMissing !== String(snap.missingRequired.length)) root.dataset.ftArchitectureMissing = String(snap.missingRequired.length);
  if (root.dataset.ftArchitectureLessons !== String(snap.curriculum.lessons)) root.dataset.ftArchitectureLessons = String(snap.curriculum.lessons);
  if (root.dataset.ftArchitectureItems !== String(snap.curriculum.items)) root.dataset.ftArchitectureItems = String(snap.curriculum.items);
  return snap;
}

function waitForReady() {
  const started = performance.now();
  const tick = () => {
    const snap = refresh();
    const speakingReady = Boolean(window.FrenchTranquilleSpeakingLoop);
    if (snap.missingRequired.length === 0 && speakingReady) {
      root.dataset.ftArchitectureSettled = '1';
      window.dispatchEvent(new CustomEvent('french-tranquille:runtime-ready', { detail:{ version:CONTRACTS.version, build:CONTRACTS.build } }));
      return;
    }
    if (performance.now() - started < 5000) setTimeout(tick, 50);
    else root.dataset.ftArchitectureSettled = snap.missingRequired.length === 0 ? 'partial' : '0';
  };
  tick();
}

const API = Object.freeze({
  version:CONTRACTS.version,
  build:CONTRACTS.build,
  contracts:CONTRACTS,
  snapshot,
  refresh,
  route,
  openLesson,
  lastSnapshot:() => lastSnapshot
});

window.FrenchTranquilleRuntime = API;
refresh();
waitForReady();

export default API;
