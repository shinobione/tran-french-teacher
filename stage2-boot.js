if (window.FrenchTranquilleStage2 && !window.__FT_STAGE2_BOOTED__) {
  window.__FT_STAGE2_BOOTED__ = true;

  const root = document.documentElement;
  const params = new URLSearchParams(location.search);
  const historicalHarness = params.has('b31Audit') || params.has('b30Audit') || params.has('v2Audit') || [...params.keys()].some(key => /smoke/i.test(key));
  const forceFieldRouter = params.has('fieldNavV2') || params.has('fieldNavV3');
  const enableFieldRouter = !historicalHarness || forceFieldRouter;
  const enableFieldAudio = !historicalHarness || params.has('fieldAudioV2');
  let routeEpoch = 0;
  let visualGuardTimer = null;
  let navReconcileScheduled = false;

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
      if (button.classList.contains('active') !== active) button.classList.toggle('active', active);
      const aria = active ? 'page' : 'false';
      if (button.getAttribute('aria-current') !== aria) button.setAttribute('aria-current', aria);
    });
  }

  function activePractice() {
    return document.querySelector('.b27-practice-page:not(.b27-leaving)');
  }

  function settlePracticeEntrance() {
    const page = activePractice();
    if (page?.classList.contains('b27-entering')) page.classList.remove('b27-entering');
    return page;
  }

  function settleTopLevelMotion() {
    document.querySelectorAll('.b27-page.b27-entering,.b27-page.b27-leaving').forEach(node => {
      node.classList.remove('b27-entering', 'b27-leaving');
    });
    if (!document.querySelector('.b27-practice-page')) root.classList.remove('b27-practice-open');
    if (!document.querySelector('.b27-journey-page')) root.classList.remove('b27-journey-open');
    if (!document.querySelector('.ux-practice-overlay')) root.classList.remove('ux-practice-open');
  }

  function refreshVisibleShells() {
    settleTopLevelMotion();
    window.FrenchTranquilleBuild27Shell?.refresh?.();
    window.FrenchTranquilleBuild32Shell?.refresh?.();
    if (activePractice()) setActiveNav('practice');
    else window.FrenchTranquilleUX?.refresh?.();
    settleTopLevelMotion();
    scheduleNavReconcile();
  }

  function scheduleVisualGuard(delay = 190) {
    clearTimeout(visualGuardTimer);
    visualGuardTimer = setTimeout(() => {
      refreshVisibleShells();
      root.dataset.fieldRouteVisualGuard = String(Number(root.dataset.fieldRouteVisualGuard || 0) + 1);
    }, delay);
  }

  function closeTransientSurfaces() {
    window.FrenchTranquilleListening?.close?.();
    window.FrenchTranquilleUX?.closePractice?.();
    const practiceClose = document.querySelector('[data-b27-close-practice]');
    if (practiceClose) practiceClose.click();
    window.FrenchTranquilleBuild27Shell?.closeJourney?.();
    settleTopLevelMotion();
  }

  function routeLegacy(id) {
    const target = document.querySelector(`.bottom-nav [data-go="${id}"]`);
    if (!target) return false;
    target.click();
    return true;
  }

  function isActuallyVisible(node) {
    if (!node?.isConnected) return false;
    const style = getComputedStyle(node);
    const rect = node.getBoundingClientRect();
    const opacity = Number.parseFloat(style.opacity || '1');
    return style.display !== 'none' && style.visibility !== 'hidden' && opacity > 0.05 && rect.width > 1 && rect.height > 1 && !node.classList.contains('b27-entering') && !node.classList.contains('b27-leaving');
  }

  function ownsNavWhileSettling(node) {
    if (!node?.isConnected || node.classList.contains('b27-leaving')) return false;
    const style = getComputedStyle(node);
    const rect = node.getBoundingClientRect();
    return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 1 && rect.height > 1;
  }

  function destinationNode(id) {
    if (id === 'home') return document.querySelector('.screen-home .b27-home');
    if (id === 'progress') return document.querySelector('.screen-progress .b27-progress-page');
    if (id === 'practice') return activePractice();
    return null;
  }

  function destinationReady(id) {
    const node = destinationNode(id);
    if (!isActuallyVisible(node)) return false;
    if (id !== 'practice' && document.querySelector('.listening-overlay,.b27-practice-page,.b27-journey-page,.ux-practice-overlay')) return false;
    return true;
  }

  function visibleNavOwner() {
    if (isActuallyVisible(document.querySelector('.listening-overlay'))) return '';
    const practice = activePractice();
    if (ownsNavWhileSettling(practice) || isActuallyVisible(document.querySelector('.ux-practice-overlay'))) return 'practice';
    const progress = document.querySelector('.screen-progress .b27-progress-page');
    if (ownsNavWhileSettling(progress)) return 'progress';
    const home = document.querySelector('.screen-home .b27-home');
    if (ownsNavWhileSettling(home)) return 'home';
    return '';
  }

  function reconcileVisibleNav() {
    navReconcileScheduled = false;
    const owner = visibleNavOwner();
    if (!owner) return;
    setActiveNav(owner);
    root.dataset.fieldRouteVisibleOwner = owner;
  }

  function scheduleNavReconcile() {
    if (navReconcileScheduled || !enableFieldRouter) return;
    navReconcileScheduled = true;
    requestAnimationFrame(reconcileVisibleNav);
  }

  function openPracticeOnStableBase(epoch) {
    if (epoch !== routeEpoch) return;
    routeLegacy('home');
    refreshVisibleShells();
    requestAnimationFrame(() => {
      if (epoch !== routeEpoch) return;
      settleTopLevelMotion();
      window.FrenchTranquilleBuild27Shell?.openPractice?.();
      settlePracticeEntrance();
      setActiveNav('practice');
      root.dataset.fieldRouteDestination = 'practice';
      root.dataset.fieldRouteReady = destinationReady('practice') ? '1' : '0';
      root.dataset.fieldRouteError = '';
      scheduleNavReconcile();
    });
  }

  function settleDestination(id, epoch, attempt = 0, recovered = false) {
    if (epoch !== routeEpoch) return;
    refreshVisibleShells();

    if (id === 'practice') {
      if (!activePractice()) window.FrenchTranquilleBuild27Shell?.openPractice?.();
      settlePracticeEntrance();
      setActiveNav('practice');
    }

    const ready = destinationReady(id);
    root.dataset.fieldRouteDestination = id;
    root.dataset.fieldRouteReady = ready ? '1' : '0';
    root.dataset.fieldRouteAttempt = String(attempt);
    if (ready) {
      setActiveNav(id);
      scheduleNavReconcile();
      root.dataset.fieldRouteError = '';
      return;
    }

    if (!recovered && attempt >= 3) {
      root.dataset.fieldRouteRecovery = String(Number(root.dataset.fieldRouteRecovery || 0) + 1);
      closeTransientSurfaces();
      routeLegacy(id);
      requestAnimationFrame(() => settleDestination(id, epoch, attempt + 1, true));
      return;
    }

    if (attempt < 10) {
      requestAnimationFrame(() => settleDestination(id, epoch, attempt + 1, recovered));
      return;
    }

    root.dataset.fieldRouteError = `unready-${id}`;
  }

  function routeVisibleNavigation(event) {
    const nav = event.target?.closest?.('.ux-bottom-nav [data-ux-nav]');
    if (!nav) return;
    const id = nav.dataset.uxNav;
    if (!['home', 'practice', 'progress'].includes(id)) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    const epoch = ++routeEpoch;
    root.dataset.fieldRouteCount = String(Number(root.dataset.fieldRouteCount || 0) + 1);
    root.dataset.fieldRouteIntent = id;
    root.dataset.fieldRouteReady = '0';
    root.dataset.fieldRouteError = '';

    closeTransientSurfaces();
    settleTopLevelMotion();
    setActiveNav(id);

    if (id === 'practice') {
      openPracticeOnStableBase(epoch);
      return;
    }

    if (!routeLegacy(id)) {
      root.dataset.fieldRouteError = `missing-legacy-${id}`;
      return;
    }
    settleDestination(id, epoch);
  }

  function guardBuild27Transition(event) {
    const target = event.target?.closest?.('[data-b27-action="listening"], [data-b27-practice-action="listening"], [data-listening-close]');
    if (!target) return;
    scheduleVisualGuard(target.matches('[data-listening-close]') ? 30 : 190);
  }

  if (enableFieldRouter) {
    window.addEventListener('click', routeVisibleNavigation, true);
    window.addEventListener('click', guardBuild27Transition, true);
    const navObserver = new MutationObserver(scheduleNavReconcile);
    navObserver.observe(document.body, { childList:true, subtree:true, attributes:true, attributeFilter:['class','hidden'] });
    scheduleNavReconcile();
  }
  if (enableFieldAudio) loadFieldModule('./field-audio-session.js?v=2.3.1-b34.1', 'fieldAudioSessionV2');

  requestAnimationFrame(() => {
    const home = document.querySelector('.bottom-nav [data-go="home"]');
    if (home) home.click();
    scheduleVisualGuard(210);
  });
}
