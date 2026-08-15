(() => {
  'use strict';

  const VERSION = '2.3.35-v510lessonidentity1';
  const root = document.documentElement;
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const TYFFANY_ASSET = './assets/premium/brand/tyffany-memory.svg';
  const BRAND_ASSET = './assets/premium/brand/goat-app-icon-180.png';
  let scheduled = false;
  let conversationOwner = 'real-life';

  const ASSETS = Object.freeze({
    conversation: './assets/premium/practice/speak-premium.webp',
    listening: './assets/premium/practice/listen-premium.webp',
    review: './assets/premium/practice/review-premium.webp',
    'real-life': './assets/premium/practice/real-life-premium.webp'
  });

  const FEATURE_COPY = Object.freeze({
    listening: Object.freeze({ vi: 'Luyện nghe', fr: 'Compréhension orale' }),
    review: Object.freeze({ vi: 'Ôn tập', fr: 'Révision' }),
    'real-life': Object.freeze({ vi: 'Tình huống thực tế', fr: 'Conversation' }),
    speak: Object.freeze({ vi: 'Trả lời bằng giọng nói', fr: 'Répondre à l’oral' })
  });

  const TYFFANY_MEMORY_SELECTOR = [
    '.screen-review .memory-review-head .pill',
    '.memory-home-card h2',
    '.memory-progress-card h2',
    '.memory-dashboard-card h2',
    '[class*="memory"] .pill',
    '[class*="memory"] h2'
  ].join(',');

  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const curriculum = () => window.FrenchTranquilleCurriculum || null;
  const featureAssetId = feature => feature === 'speak' ? 'conversation' : feature;
  const featureAsset = feature => ASSETS[featureAssetId(feature)] || '';
  const featureTitle = feature => {
    const copy = FEATURE_COPY[feature];
    return copy ? (isDebug() ? copy.fr : copy.vi) : '';
  };

  function lessonById(id) {
    return curriculum()?.lessons?.find(lesson => lesson.id === id) || null;
  }

  function currentLesson() {
    const heading = document.querySelector('.screen-lesson .topbar h1');
    const number = Number(heading?.textContent?.match(/\d+/)?.[0] || 0);
    return curriculum()?.lessons?.find(lesson => Number(lesson.number) === number) || null;
  }

  function buildArt(id, extraClass = '') {
    const img = document.createElement('img');
    img.className = `ft-v510-practice-art${extraClass ? ` ${extraClass}` : ''}`;
    img.dataset.v510Pictogram = id;
    img.src = ASSETS[id];
    img.alt = '';
    img.decoding = 'async';
    img.loading = 'eager';
    img.draggable = false;
    img.setAttribute('aria-hidden', 'true');
    return img;
  }

  function decorateHost(host, id, surface) {
    if (!host || !ASSETS[id]) return;
    const current = host.querySelector('.ft-v510-practice-art');
    if (
      host.dataset.v510PracticeIcon === id &&
      host.dataset.v510IconSurface === surface &&
      current?.getAttribute('src') === ASSETS[id]
    ) return;

    host.dataset.v510PracticeIcon = id;
    host.dataset.v510IconSurface = surface;
    host.setAttribute('aria-hidden', 'true');
    host.replaceChildren(buildArt(id));
  }

  function buildFeatureArt(feature) {
    const id = featureAssetId(feature);
    const host = document.createElement('span');
    host.className = 'ft-v510-feature-art-host';
    host.dataset.v510FeatureArt = feature;
    host.setAttribute('aria-hidden', 'true');
    host.appendChild(buildArt(id, 'ft-v510-feature-art'));
    return host;
  }

  function decorateFeatureHeader(header, feature, surface) {
    if (!header || !FEATURE_COPY[feature] || !featureAsset(feature)) return;
    const identity = header.children?.[1];
    if (!identity || identity.matches('button')) return;
    const title = featureTitle(feature);
    const currentArt = identity.querySelector('.ft-v510-feature-art');
    const currentTitle = identity.querySelector('.ft-v510-feature-title');
    if (
      header.dataset.v510FeatureHeader === feature &&
      header.dataset.v510FeatureSurface === surface &&
      currentArt?.getAttribute('src') === featureAsset(feature) &&
      currentTitle?.textContent === title
    ) return;

    const copy = document.createElement('span');
    copy.className = 'ft-v510-feature-copy';
    const brand = document.createElement('span');
    brand.className = 'ft-v510-feature-brand';
    brand.textContent = 'FRENCH TRÂN’QUILLE';
    const heading = document.createElement('h1');
    heading.className = 'ft-v510-feature-title';
    heading.textContent = title;
    copy.append(brand, heading);

    identity.classList.add('ft-v510-feature-identity');
    identity.dataset.v510FeatureIdentity = feature;
    identity.replaceChildren(buildFeatureArt(feature), copy);
    header.dataset.v510FeatureHeader = feature;
    header.dataset.v510FeatureSurface = surface;
  }

  function decorateTyffanyMemoryNode(node) {
    if (!(node instanceof HTMLElement)) return;
    const raw = (node.textContent || '').replace(/\s+/g, ' ').trim();
    const clean = raw.replace(/^🧠\s*/u, '').trim();
    if (!/(?:Trí nhớ của|Mémoire de)\s+(?:Tyffany|Lucie)\b/i.test(clean)) return;

    const currentMark = node.querySelector(':scope > .ft-v510-tyffany-mark');
    const currentLabel = node.querySelector(':scope > .ft-v510-tyffany-label');
    if (
      node.dataset.v510TyffanyIcon === 'canonical-svg-v1' &&
      currentMark && currentLabel && currentLabel.textContent.trim() === clean
    ) return;

    const mark = document.createElement('span');
    mark.className = 'ft-v510-tyffany-mark';
    mark.dataset.v510TyffanyAsset = TYFFANY_ASSET;
    mark.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.className = 'ft-v510-tyffany-label';
    label.textContent = clean;
    node.replaceChildren(mark, label);
    node.dataset.v510TyffanyIcon = 'canonical-svg-v1';
  }

  function decorateTyffanyMemory() {
    document.querySelectorAll(TYFFANY_MEMORY_SELECTOR).forEach(decorateTyffanyMemoryNode);
    root.dataset.v510TyffanyIcons = 'canonical-svg-v1';
  }

  function decorateTyffanyAvatars() {
    document.querySelectorAll('.luc > span').forEach(span => {
      const host = span.closest('.luc');
      if (!host || host.closest('.screen-lesson .teacher-line')) return;
      host.dataset.v510TyffanyAvatar = 'canonical-svg-v1';
      span.dataset.v510TyffanyAsset = TYFFANY_ASSET;
      span.textContent = '';
      span.setAttribute('aria-hidden', 'true');
    });
    root.dataset.v510TyffanyAvatars = 'canonical-svg-v1';
  }

  function decorateBrandIdentity() {
    document.querySelectorAll('.b27-brandline > img').forEach(img => {
      const src = img.getAttribute('src') || '';
      if (!src.includes('assets/Favicon.png') && img.dataset.v510BrandIdentity !== 'goat-v1') return;
      if (img.getAttribute('src') !== BRAND_ASSET) img.setAttribute('src', BRAND_ASSET);
      img.dataset.v510BrandIdentity = 'goat-v1';
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
    });
    root.dataset.v510BrandIdentity = 'goat-v1';
  }

  function decorateHomeLessonIdentity() {
    const card = document.querySelector('.b27-home .b27-primary-card');
    if (!card) return;
    const lessonId = card.querySelector('[data-b27-open-lesson]')?.dataset.b27OpenLesson || '';
    const lesson = lessonById(lessonId);
    if (!lesson?.icon) return;

    let icon = card.querySelector(':scope > .ft-v510-home-lesson-icon');
    if (!icon) {
      icon = document.createElement('span');
      icon.className = 'ft-v510-home-lesson-icon';
      icon.setAttribute('aria-hidden', 'true');
      const title = card.querySelector(':scope > h2');
      if (title) title.before(icon);
      else card.appendChild(icon);
    }
    if (icon.textContent !== lesson.icon) icon.textContent = lesson.icon;
    icon.dataset.v510LessonId = lesson.id;
    card.dataset.v510LessonIdentity = lesson.id;
  }

  function decorateLessonDetailIdentity() {
    const line = document.querySelector('.screen-lesson .teacher-line');
    const lesson = currentLesson();
    if (!line || !lesson?.icon) return;

    const legacyTutor = line.querySelector(':scope > .luc');
    if (legacyTutor) {
      legacyTutor.classList.add('ft-v510-legacy-tutor-avatar');
      legacyTutor.removeAttribute('data-v510-tyffany-avatar');
      legacyTutor.setAttribute('aria-hidden', 'true');
      const span = legacyTutor.querySelector(':scope > span');
      if (span) {
        delete span.dataset.v510TyffanyAsset;
        span.textContent = '';
      }
    }

    let icon = line.querySelector(':scope > .ft-v510-lesson-identity-icon');
    if (!icon) {
      icon = document.createElement('span');
      icon.className = 'ft-v510-lesson-identity-icon';
      icon.setAttribute('aria-hidden', 'true');
      line.prepend(icon);
    }
    if (icon.textContent !== lesson.icon) icon.textContent = lesson.icon;
    icon.dataset.v510LessonId = lesson.id;

    const label = line.querySelector(':scope > div > strong');
    const title = T(lesson.titleVi || '', lesson.titleFr || '');
    if (label && label.textContent !== title) label.textContent = title;

    line.dataset.v510LessonIdentity = lesson.id;
    root.dataset.v510LessonIdentity = 'lesson-icon-v1';
  }

  function decorateLessonIdentities() {
    decorateHomeLessonIdentity();
    decorateLessonDetailIdentity();
  }

  function decorateLegacyIdentityAssets() {
    decorateTyffanyAvatars();
    decorateBrandIdentity();
  }

  function conversationFeature() {
    const screen = document.querySelector('.screen-conversation');
    if (!screen) return null;
    if (screen.querySelector('.scenario-runner,.scenario-done')) return 'real-life';
    if (conversationOwner === 'real-life') return 'real-life';
    const mode = root.dataset.sessionPracticeMode || '';
    if (conversationOwner === 'speak' || mode === 'voice') return 'speak';
    if (screen.querySelector('#free-voice-card:not(.session-mode-hidden)')) return 'speak';
    return 'real-life';
  }

  function decorateFeatureHeaders() {
    decorateFeatureHeader(document.querySelector('.listening-top'), 'listening', 'listening');
    decorateFeatureHeader(document.querySelector('.screen-review .topbar'), 'review', 'review');

    const conversation = conversationFeature();
    if (conversation) {
      decorateFeatureHeader(
        document.querySelector('.screen-conversation .topbar'),
        conversation,
        conversation === 'speak' ? 'oral-training' : 'real-life'
      );
    }

    root.dataset.v510FeatureHeaders = 'feature-header-v2-mobile';
  }

  function decorate() {
    document.querySelectorAll('.b27-practice-action[data-b27-practice-action]').forEach(card => {
      const id = card.dataset.b27PracticeAction;
      decorateHost(card.querySelector('.b27-practice-icon'), id, 'practice');
    });

    document.querySelectorAll('.b27-quick-card[data-b27-action]').forEach(card => {
      const id = card.dataset.b27Action;
      if (id !== 'review' && id !== 'listening') return;
      decorateHost(card.querySelector('.b27-quick-icon'), id, 'home');
    });

    decorateFeatureHeaders();
    decorateTyffanyMemory();
    decorateLegacyIdentityAssets();
    decorateLessonIdentities();
    root.dataset.v510PracticeIcons = 'approved-art-v1';
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      decorate();
    });
  }

  document.addEventListener('click', event => {
    const practice = event.target.closest('[data-b27-practice-action]');
    if (practice?.dataset.b27PracticeAction === 'real-life') conversationOwner = 'real-life';
    if (practice?.dataset.b27PracticeAction === 'conversation') conversationOwner = 'real-life';

    const mode = event.target.closest('[data-session-practice-mode]')?.dataset.sessionPracticeMode;
    if (mode === 'voice') conversationOwner = 'speak';
    if (mode === 'scenario' || mode === 'guided') conversationOwner = 'real-life';
    if (event.target.closest('[data-session-practice-back]')) conversationOwner = 'real-life';
    schedule();
  }, true);

  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  window.addEventListener('focus', schedule);
  schedule();

  window.FrenchTranquilleV510PracticeIcons = Object.freeze({
    version: VERSION,
    style: 'approved-premium-art-v1',
    featureHeaderStyle: 'feature-header-v1',
    tyffanyIconStyle: 'canonical-svg-v1',
    tyffanyAvatarStyle: 'canonical-svg-v1',
    tyffanyAsset: TYFFANY_ASSET,
    brandIdentityStyle: 'goat-v1',
    brandAsset: BRAND_ASSET,
    lessonIdentityStyle: 'lesson-icon-v1',
    refresh: decorate,
    refreshFeatureHeaders: decorateFeatureHeaders,
    refreshTyffanyIcons: decorateTyffanyMemory,
    refreshIdentityAssets: decorateLegacyIdentityAssets,
    refreshLessonIdentities: decorateLessonIdentities,
    assets: ASSETS,
    featureCopy: FEATURE_COPY,
    icons: Object.freeze(Object.keys(ASSETS))
  });
})();
