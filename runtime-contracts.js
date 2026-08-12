const VERSION = '1.23.0';
const BUILD = 30;

const STORES = Object.freeze({
  learner: 'francais-avec-luc:learner:v1',
  memory: 'french-tranquille:learning-memory:v1',
  errors: 'french-tranquille:error-intelligence:v1',
  scenarios: 'french-tranquille:scenarios:v1',
  listening: 'french-tranquille:listening:v1',
  milestones: 'french-tranquille:milestones:v1'
});

const SNAPSHOTS = Object.freeze({
  lastGood: 'french-tranquille:recovery:last-good:v1',
  preRestore: 'french-tranquille:recovery:pre-restore:v1',
  preMigration: 'french-tranquille:recovery:pre-migration:v1',
  preReset: 'french-tranquille:recovery:pre-reset:v1',
  quarantine: 'french-tranquille:recovery:quarantine:v1',
  preBuild22: 'french-tranquille:safety:pre-build22:v1'
});

const PRODUCT = Object.freeze({
  lessons: 40,
  items: 241,
  scenarios: 36,
  scenarioTurns: 108,
  listeningNormal: 0.88,
  listeningSlow: 0.65,
  maxSpeakingMomentsPerLesson: 2
});

const ROUTES = Object.freeze({
  today: 'home',
  practice: 'practice',
  progress: 'progress'
});

const OWNERS = Object.freeze({
  legacyCore: Object.freeze([
    'FrenchTranquilleCurriculum'
  ]),
  recovery: Object.freeze([
    'FrenchTranquilleRecovery'
  ]),
  voice: Object.freeze([
    'LucieVoice',
    'FrenchTranquilleFreeVoice',
    'FrenchTranquilleVoiceReplay'
  ]),
  learning: Object.freeze([
    'FrenchTranquilleMemory',
    'FrenchTranquilleErrors',
    'FrenchTranquilleMastery',
    'FrenchTranquilleMasteryStage3',
    'FrenchTranquilleDailyCoach',
    'FrenchTranquilleLanguage'
  ]),
  practice: Object.freeze([
    'FrenchTranquilleListening',
    'FrenchTranquilleScenarioData',
    'FrenchTranquilleScenarios',
    'FrenchTranquilleRealLife1',
    'FrenchTranquilleRealLife2',
    'FrenchTranquilleRealLife3',
    'FrenchTranquilleRealLifeUX',
    'FrenchTranquilleRealLifeCoach'
  ]),
  presentation: Object.freeze([
    'FrenchTranquilleUX',
    'FrenchTranquilleInteraction',
    'FrenchTranquilleProgressionUX',
    'FrenchTranquilleSessionUX',
    'FrenchTranquilleSessionUXAdapter',
    'FrenchTranquilleProgressDetailsDashboard',
    'FrenchTranquilleBuild263UX',
    'FrenchTranquilleBuild264UX',
    'FrenchTranquilleBuild265UX',
    'FrenchTranquilleBuild266UX',
    'FrenchTranquilleBuild267UX',
    'FrenchTranquilleBuild268UX',
    'FrenchTranquilleBuild269UX',
    'FrenchTranquilleBuild27Shell'
  ]),
  release: Object.freeze([
    'FrenchTranquilleBuildMeta',
    'FrenchTranquilleSpeakingLoop'
  ])
});

const BOOT_PHASES = Object.freeze([
  'recovery',
  'legacy-core',
  'curriculum-extension',
  'pedagogy',
  'presentation',
  'iphone-pwa',
  'release-layer'
]);

const SANCTUARIES = Object.freeze([
  'voice-ios.js',
  'free-voice.js',
  'assets/LOGO.png',
  'assets/Favicon.png',
  STORES.learner
]);

function ownerFor(apiName) {
  for (const [owner, names] of Object.entries(OWNERS)) {
    if (names.includes(apiName)) return owner;
  }
  return null;
}

const API = Object.freeze({
  version: VERSION,
  build: BUILD,
  stores: STORES,
  snapshots: SNAPSHOTS,
  product: PRODUCT,
  routes: ROUTES,
  owners: OWNERS,
  bootPhases: BOOT_PHASES,
  sanctuaries: SANCTUARIES,
  ownerFor
});

window.FrenchTranquilleRuntimeContracts = API;
document.documentElement.dataset.ftRuntimeContracts = '1';
document.documentElement.dataset.ftArchitectureBuild = String(BUILD);

export { VERSION, BUILD, STORES, SNAPSHOTS, PRODUCT, ROUTES, OWNERS, BOOT_PHASES, SANCTUARIES, ownerFor };
export default API;
