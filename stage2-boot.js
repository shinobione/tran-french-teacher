if (window.FrenchTranquilleStage2 && !window.__FT_STAGE2_BOOTED__) {
  window.__FT_STAGE2_BOOTED__ = true;

  const root = document.documentElement;

  const loadFieldModule = (src, key) => {
    if (document.querySelector(`script[data-${key}]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.dataset[key] = '1';
    document.head.appendChild(script);
  };

  function setActiveNav(id) {
    document.querySelectorAll('.ux-bottom-nav [data-ux-nav]').forEach(button => {
      const active = button.dataset.uxNav === id;
      button.classList.toggle('active', active);
      button.setAttribute('aria-current', active ? 'page' : 'false');
    });
  }

  function closeTransientSurfaces() {
    window.FrenchTranquilleListening?.close?.();
    window.FrenchTranquilleUX?.closePractice?.();

    const practiceClose = document.querySelector('[data-b27-close-practice]');
    if (practiceClose) practiceClose.click();
    document.querySelectorAll('.b27-practice-page').forEach(node => node.remove());
    root.classList.remove('b27-practice-open');

    window.FrenchTranquilleBuild27Shell?.closeJourney?.();
    document.querySelectorAll('.b27-journey-page').forEach(node => node.remove());
    root.classList.remove('b27-journey-open');

    document.querySelectorAll('.ux-practice-overlay').forEach(node => node.remove());
    root.classList.remove('ux-practice-open');
  }

  function routeLegacy(id) {
    const target = document.querySelector(`.bottom-nav [data-go="${id}"]`);
    if (!target) return false;
    target.click();
    return true;
  }

  function destinationReady(id) {
    if (id === 'home') return Boolean(document.querySelector('.screen-home .b27-home'));
    if (id === 'progress') return Boolean(document.querySelector('.screen-progress .b27-progress-page'));
    if (id === 'practice') return Boolean(document.querySelector('.b27-practice-page'));
    return true;
  }

  function settleDestination(id, attempt = 0) {
    if (id === 'practice') {
      if (!document.querySelector('.b27-practice-page')) window.FrenchTranquilleBuild27Shell?.openPractice?.();
    } else {
      window.FrenchTranquilleBuild27Shell?.refresh?.();
      window.FrenchTranquilleBuild32Shell?.refresh?.();
      window.FrenchTranquilleUX?.refresh?.();
    }

    const ready = destinationReady(id);
    root.dataset.fieldRouteDestination = id;
    root.dataset.fieldRouteReady = ready ? '1' : '0';
    root.dataset.fieldRouteAttempt = String(attempt);

    if (ready) {
      setActiveNav(id);
      return;
    }
    if (attempt < 4) requestAnimationFrame(() => settleDestination(id, attempt + 1));
  }

  function routeVisibleNavigation(event) {
    const nav = event.target?.closest?.('.ux-bottom-nav [data-ux-nav]');
    if (!nav) return;
    const id = nav.dataset.uxNav;
    if (!['home', 'practice', 'progress'].includes(id)) return;

    // Build 27 is the sole owner of the visible three-tab navigation gesture.
    // Prevent UX-shell/build-meta from routing the same physical click a second time.
    event.preventDefault();
    event.stopImmediatePropagation();

    root.dataset.fieldRouteCount = String(Number(root.dataset.fieldRouteCount || 0) + 1);
    root.dataset.fieldRouteIntent = id;
    root.dataset.fieldRouteReady = '0';

    closeTransientSurfaces();

    if (id === 'practice') {
      window.FrenchTranquilleBuild27Shell?.openPractice?.();
      settleDestination(id);
      return;
    }

    if (!routeLegacy(id)) {
      root.dataset.fieldRouteError = `missing-legacy-${id}`;
      return;
    }
    settleDestination(id);
  }

  // Registered before Build 27: one visible tap must produce one route transaction.
  window.addEventListener('click', routeVisibleNavigation, true);

  // Session-owned lesson recording. This supersedes the speculative global
  // MediaRecorder prototype shim from the first field hotfix.
  loadFieldModule('./field-audio-session.js?v=2.3.1-b34.1', 'fieldAudioSessionV2');

  requestAnimationFrame(() => {
    const home = document.querySelector('.bottom-nav [data-go="home"]');
    if (home) home.click();
  });
}
