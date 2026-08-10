(() => {
  'use strict';

  const VERSION = '1.4.0';
  const BUILD = 9;
  const BRAND = 'French Trân’quille';
  const TUTOR = 'Lucie';
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  // Keep legacy storage keys on purpose so existing progress/voice preferences survive the rebrand.
  const VOICE_KEY = 'tran-french-teacher:luc-voice:v1';

  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';

  function patchText(value='') {
    let text = String(value);
    text = text
      .replace(/TIẾNG PHÁP CÙNG LUC/g, BRAND.toUpperCase())
      .replace(/FRANÇAIS AVEC LUC/g, BRAND.toUpperCase())
      .replace(/Tiếng Pháp cùng Luc/g, BRAND)
      .replace(/Français avec Luc/g, BRAND)
      .replace(/Luc\s*•\s*ton professeur/g, 'Lucie • ta professeure')
      .replace(/\bLuc\b/g, TUTOR);
    return text;
  }

  function patchTree(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let node = root;
    while (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const before = node.nodeValue || '';
        const after = patchText(before);
        if (after !== before) node.nodeValue = after;
      } else if (node instanceof Element) {
        for (const attr of ['aria-label','title','placeholder']) {
          const before = node.getAttribute(attr);
          if (before) {
            const after = patchText(before);
            if (after !== before) node.setAttribute(attr, after);
          }
        }
      }
      node = walker.nextNode();
    }
  }

  async function loadBrandLogo(img) {
    if (!img || img.dataset.loaded === '1') return;
    try {
      const parts = await Promise.all([
        './assets/brand/logo.1.b64',
        './assets/brand/logo.2.b64',
        './assets/brand/logo.3.b64',
        './assets/brand/logo.4.b64'
      ].map(url => fetch(url).then(r => { if (!r.ok) throw new Error(url); return r.text(); })));
      img.src = `data:image/webp;base64,${parts.join('').replace(/\s+/g, '')}`;
      img.dataset.loaded = '1';
    } catch (error) {
      console.warn('[French Trân’quille] logo load failed', error);
      img.hidden = true;
    }
  }

  function injectHomeBrand() {
    const app = document.getElementById('app');
    const main = app?.querySelector('.content');
    const topbar = main?.querySelector('.topbar');
    if (!main || !topbar) return;

    const title = topbar.querySelector('h1')?.textContent?.trim() || '';
    const isHome = title === 'Xin chào Trân 👋' || title === 'Salut Trân 👋';
    const existing = main.querySelector('#brand-home');

    if (!isHome) {
      existing?.remove();
      return;
    }
    if (existing) {
      loadBrandLogo(existing.querySelector('[data-brand-logo]'));
      const tagline = existing.querySelector('.brand-home-tagline');
      if (tagline) tagline.textContent = isDebug()
        ? 'Apprendre le français tranquillement, un petit pas à la fois.'
        : 'Học tiếng Pháp thật nhẹ nhàng, từng chút một.';
      return;
    }

    const hero = document.createElement('section');
    hero.id = 'brand-home';
    hero.className = 'brand-home';
    hero.setAttribute('aria-label', BRAND);
    hero.innerHTML = `
      <img class="brand-home-logo" data-brand-logo="1" alt="${BRAND}">
      <p class="brand-home-tagline">${isDebug()
        ? 'Apprendre le français tranquillement, un petit pas à la fois.'
        : 'Học tiếng Pháp thật nhẹ nhàng, từng chút một.'}</p>
    `;
    topbar.after(hero);
    loadBrandLogo(hero.querySelector('[data-brand-logo]'));
  }

  function patchDisplayedVersion() {
    document.querySelectorAll('.diagnostics strong').forEach(el => {
      if (/^v\d+\.\d+\.\d+\s*•\s*Build\s*\d+$/.test(el.textContent.trim())) {
        el.textContent = `v${VERSION} • Build ${BUILD}`;
      }
    });
  }

  function scoreVoice(v) {
    const name = (v.name || '').toLowerCase();
    const lang = (v.lang || '').toLowerCase();
    let score = 0;
    if (lang === 'fr-fr') score += 100;
    else if (lang.startsWith('fr-')) score += 70;
    else if (lang === 'fr') score += 60;
    if (/google.*fran|google.*french|google français/.test(name)) score += 55;
    if (/premium|enhanced|amélior|amelior|natural|neural/.test(name)) score += 40;
    if (/am[eé]lie|audrey|aur[eé]lie|marie|c[eé]line|virginie|l[eé]a|flo|alice/.test(name)) score += 28;
    if (v.localService) score += 12;
    return score;
  }

  function choosePreferredVoice() {
    if (!('speechSynthesis' in window)) return;
    const stored = localStorage.getItem(VOICE_KEY);
    if (stored && stored !== 'auto') return; // Manual choice always wins.
    const voices = speechSynthesis.getVoices().filter(v => /^fr(?:-|$)/i.test(v.lang || ''));
    if (!voices.length) return;
    const best = [...voices].sort((a,b) => scoreVoice(b) - scoreVoice(a))[0];
    if (best) localStorage.setItem(VOICE_KEY, best.voiceURI || best.name);
  }

  function speakLuciePreview() {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance("Bonjour Trân. Je m'appelle Lucie. On va apprendre le français ensemble.");
    u.lang = 'fr-FR';
    speechSynthesis.speak(u); // voice-ios.js applies the chosen voice/rate/pitch.
  }

  // Override only the DEBUG preview sentence. The rest of voice-ios.js remains untouched.
  document.addEventListener('click', event => {
    const button = event.target instanceof Element ? event.target.closest('#luc-voice-test') : null;
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    speakLuciePreview();
  }, true);

  function refresh() {
    document.title = BRAND;
    patchTree(document.getElementById('app'));
    patchDisplayedVersion();
    injectHomeBrand();
    choosePreferredVoice();
  }

  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      refresh();
    });
  });

  function start() {
    refresh();
    observer.observe(document.documentElement, {subtree:true, childList:true, characterData:true});
    if ('speechSynthesis' in window) {
      speechSynthesis.addEventListener?.('voiceschanged', choosePreferredVoice);
      speechSynthesis.getVoices();
      setTimeout(choosePreferredVoice, 180);
      setTimeout(choosePreferredVoice, 850);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();

  window.FrenchTranquilleBrand = {version: VERSION, build: BUILD, brand: BRAND, tutor: TUTOR};
})();
