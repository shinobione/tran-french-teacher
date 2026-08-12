(() => {
  'use strict';

  const root = document.documentElement;
  const VERSION = '1.22.0';
  const BUILD = '29';
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;

  root.classList.add('b29-iphone-ready');
  root.dataset.b29Ready = '1';

  function standaloneState() {
    const media = !!window.matchMedia?.('(display-mode: standalone)')?.matches;
    const ios = window.navigator.standalone === true;
    return media || ios;
  }

  function syncStandalone() {
    const standalone = standaloneState();
    root.dataset.b29Standalone = standalone ? '1' : '0';
    root.classList.toggle('b29-standalone', standalone);
  }

  function syncViewport() {
    const vv = window.visualViewport;
    const height = Number(vv?.height || window.innerHeight || 0);
    const offsetTop = Number(vv?.offsetTop || 0);
    const layoutHeight = Number(window.innerHeight || height || 0);
    const keyboardInset = Math.max(0, Math.round(layoutHeight - height - offsetTop));
    const keyboardOpen = keyboardInset >= 120 || (layoutHeight > 0 && height / layoutHeight < 0.78);

    root.style.setProperty('--b29-vv-height', `${Math.round(height)}px`);
    root.style.setProperty('--b29-vv-offset-top', `${Math.round(offsetTop)}px`);
    root.style.setProperty('--b29-keyboard-inset', `${keyboardInset}px`);
    root.dataset.b29KeyboardInset = String(keyboardInset);
    root.classList.toggle('b29-keyboard-open', keyboardOpen);
  }

  function accessibleName(node) {
    if (!(node instanceof HTMLElement)) return '';
    return String(
      node.getAttribute('aria-label') ||
      node.getAttribute('title') ||
      node.textContent ||
      ''
    ).replace(/\s+/g, ' ').trim();
  }

  function patchIconButton(button) {
    if (!(button instanceof HTMLButtonElement) || accessibleName(button)) return;
    if (button.matches('.b27-back,[data-b27-back]')) {
      button.setAttribute('aria-label', T('Quay lại', 'Retour'));
      return;
    }
    if (button.matches('.b27-icon-button,[data-b27-settings],.icon-btn')) {
      const glyph = button.textContent?.trim();
      button.setAttribute('aria-label', glyph === '⚙' || glyph === '⚙️' ? T('Cài đặt', 'Réglages') : T('Nút điều khiển', 'Bouton de contrôle'));
    }
  }

  function patchNavigation() {
    const nav = document.querySelector('.ux-bottom-nav');
    if (!(nav instanceof HTMLElement)) return;
    nav.setAttribute('aria-label', T('Điều hướng chính', 'Navigation principale'));
    nav.querySelectorAll('button').forEach(button => {
      const active = button.classList.contains('active');
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
      if (!accessibleName(button)) {
        const id = button.dataset.uxNav || button.dataset.go || '';
        const label = id === 'home' ? T('Hôm nay', 'Aujourd’hui') : id === 'practice' ? T('Luyện tập', 'Pratiquer') : id === 'progress' ? T('Tiến bộ', 'Progrès') : T('Điều hướng', 'Navigation');
        button.setAttribute('aria-label', label);
      }
    });
  }

  function patchProgressbars() {
    document.querySelectorAll('.b27-progress,.b27-level-track').forEach(track => {
      if (!(track instanceof HTMLElement)) return;
      const fill = track.querySelector(':scope > i');
      const raw = Number.parseFloat(fill?.style?.width || '0');
      const value = Number.isFinite(raw) ? Math.max(0, Math.min(100, Math.round(raw))) : 0;
      track.setAttribute('role', 'progressbar');
      track.setAttribute('aria-valuemin', '0');
      track.setAttribute('aria-valuemax', '100');
      track.setAttribute('aria-valuenow', String(value));
      if (!track.getAttribute('aria-label')) track.setAttribute('aria-label', T('Tiến độ', 'Progression'));
    });
  }

  function patchFeedback() {
    document.querySelectorAll('.feedback,.feedback-box,.session-complete-mode,[data-session-complete]').forEach(node => {
      if (!(node instanceof HTMLElement)) return;
      if (!node.getAttribute('aria-live')) node.setAttribute('aria-live', 'polite');
      if (!node.getAttribute('role')) node.setAttribute('role', 'status');
    });
  }

  function patchA11y() {
    document.querySelectorAll('button').forEach(patchIconButton);
    patchNavigation();
    patchProgressbars();
    patchFeedback();
  }

  function visible(node) {
    if (!(node instanceof HTMLElement)) return false;
    const style = getComputedStyle(node);
    if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
    const rect = node.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function audit() {
    const homeVisible = visible(document.querySelector('.b27-home'));
    const shellButtons = [...document.querySelectorAll('.b27-page button:not(:disabled),.b27-overlay button:not(:disabled),.ux-bottom-nav button:not(:disabled)')].filter(visible);
    const tooSmall = shellButtons.filter(button => {
      const rect = button.getBoundingClientRect();
      return rect.width < 43.5 || rect.height < 43.5;
    });
    const unnamed = shellButtons.filter(button => !accessibleName(button));
    const currentTabs = [...document.querySelectorAll('.ux-bottom-nav button[aria-current="page"]')].filter(visible);
    const horizontalOverflow = Math.max(0, Math.ceil(document.documentElement.scrollWidth - document.documentElement.clientWidth));
    return {
      version: VERSION,
      build: BUILD,
      homeVisible,
      buttons: shellButtons.length,
      tooSmall: tooSmall.length,
      unnamed: unnamed.length,
      currentTabs: currentTabs.length,
      horizontalOverflow,
      standalone: standaloneState(),
      keyboardInset: Number(root.dataset.b29KeyboardInset || 0),
      visualViewport: !!window.visualViewport
    };
  }

  const schedulePatch = (() => {
    let pending = false;
    return () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        patchA11y();
      });
    };
  })();

  document.addEventListener('focusin', event => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.matches('input,textarea,select,[contenteditable="true"]')) return;
    setTimeout(() => {
      syncViewport();
      if (root.classList.contains('b29-keyboard-open')) target.scrollIntoView({ block:'center', inline:'nearest', behavior:'auto' });
    }, 180);
  });

  document.addEventListener('focusout', () => setTimeout(syncViewport, 80));
  window.visualViewport?.addEventListener('resize', syncViewport, { passive:true });
  window.visualViewport?.addEventListener('scroll', syncViewport, { passive:true });
  window.addEventListener('resize', syncViewport, { passive:true });
  window.addEventListener('orientationchange', () => setTimeout(syncViewport, 80), { passive:true });
  window.matchMedia?.('(display-mode: standalone)')?.addEventListener?.('change', syncStandalone);

  new MutationObserver(schedulePatch).observe(document.body, { subtree:true, childList:true, attributes:true, attributeFilter:['class','hidden','aria-expanded'] });

  syncStandalone();
  syncViewport();
  patchA11y();
  setTimeout(patchA11y, 250);
  setTimeout(patchA11y, 900);

  window.FrenchTranquilleBuild29 = Object.freeze({
    version: VERSION,
    build: BUILD,
    refresh() { syncStandalone(); syncViewport(); patchA11y(); return audit(); },
    audit,
    standalone: standaloneState
  });
})();
