(() => {
  'use strict';

  const VERSION = '2.3.33-v510mobile1';
  const root = document.documentElement;
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const TYFFANY_ASSET = './assets/premium/brand/tyffany-memory.svg';
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
    // Deliberately do not inherit the historical `.eyebrow` class: legacy Listening/route
    // polish is allowed to hide its own old eyebrow, never the shared Premium identity line.
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

  function conversationFeature() {
    const screen = document.querySelector('.screen-conversation');
    if (!screen) return null;
    // A running Scenario is authoritative Real-Life state, even if Session UX has not yet
    // rewritten an older voice mode flag during the route transition.
    if (screen.querySelector('.scenario-runner,.scenario-done')) return 'real-life';
    if (conversationOwner === 'real-life') return 'real-life';
    const mode = root.dataset.sessionPracticeMode || '';
    if (conversationOwner === 'speak' || mode === 'voice') return 'speak';
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

  // Remember the product route intent before legacy/Session UX layers begin mutating the
  // shared Conversation DOM. This prevents a stale voice-mode flag from giving Real-Life
  // the Speak artwork while changing practice modes.
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
    tyffanyAsset: TYFFANY_ASSET,
    refresh: decorate,
    refreshFeatureHeaders: decorateFeatureHeaders,
    refreshTyffanyIcons: decorateTyffanyMemory,
    assets: ASSETS,
    featureCopy: FEATURE_COPY,
    icons: Object.freeze(Object.keys(ASSETS))
  });
})();
