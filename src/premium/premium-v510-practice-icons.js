(() => {
  'use strict';

  const VERSION = '2.3.32-v510headers1';
  const root = document.documentElement;
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  let scheduled = false;

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

  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const featureAssetId = feature => feature === 'speak' ? 'conversation' : feature;
  const featureAsset = feature => ASSETS[featureAssetId(feature)] || '';
  const featureTitle = feature => {
    const copy = FEATURE_COPY[feature];
    return copy ? (isDebug() ? copy.fr : copy.vi) : '';
  };

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
    brand.className = 'eyebrow ft-v510-feature-brand';
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

  function conversationFeature() {
    const screen = document.querySelector('.screen-conversation');
    if (!screen) return null;
    const mode = root.dataset.sessionPracticeMode || '';
    if (mode === 'voice') return 'speak';
    if (screen.querySelector('#free-voice-card:not(.session-mode-hidden)')) return 'speak';
    // Product mapping is intentional: the page titled Conversation is the Real-Life surface.
    // Speak owns only the explicit oral-training mode ("Répondre à l’oral").
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

    root.dataset.v510FeatureHeaders = 'feature-header-v1';
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

  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  window.addEventListener('focus', schedule);
  schedule();

  window.FrenchTranquilleV510PracticeIcons = Object.freeze({
    version: VERSION,
    style: 'approved-premium-art-v1',
    featureHeaderStyle: 'feature-header-v1',
    refresh: decorate,
    refreshFeatureHeaders: decorateFeatureHeaders,
    assets: ASSETS,
    featureCopy: FEATURE_COPY,
    icons: Object.freeze(Object.keys(ASSETS))
  });
})();
