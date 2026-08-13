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

  function settleTopLevelMotion() {
    // Build 27 animates top-level facades with temporary entering/leaving
    // classes. Field reports proved either class can survive a route change and
    // leave a perfectly valid Home/Progress node at opacity:0 indefinitely.
    // A committed top-level route owns final visibility, so no transient motion
    // marker is allowed to survive that transaction.
    document.querySelectorAll('.b27-page.b27-entering,.b27-page.b27-leaving').forEach(node => {
      node.classList.remove('b27-entering', 'b27-leaving');
    });
    if (!document.querySelector('.b27-practice-page')) root.classList.remove('b27-practice-open');
    if (!document.querySelector('.b27-journey-page')) root.classList.remove('b27-journey-open');
    if (!document.querySelector('.ux-practice-overlay')) root.classList.remove('ux-practice-open');
  }

  function scheduleVisualGuard(delay = 190) {
    clearTimeout(visualGuardTimer);
    visualGuardTimer = setTimeout(() => {
      settleTopLevelMotion();
      window.FrenchTranquilleBuild27Shell?.refresh?.();
      window.FrenchTranquilleBuild32Shell?.refresh?.();
      window.FrenchTranquilleUX?.refresh?.();
      settleTopLevelMotion();
      scheduleNavReconcile();
      root.dataset.fieldRouteVisualGuard = String(Number(root.dataset.fieldRouteVisualGuard || 0) + 1);
    }, delay);
  }

  function closeTransientSurfaces() {
    window.FrenchTranquilleListening?.close?.();
    window.FrenchTranquilleUX?.closePractice?.();

    // Let Build 27 close its own private Practice object. Removing its DOM from
    // outside used to leave the private practicePage reference alive and made
    // the next Practice tap a no-op.
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
    if (id === 'practice') return document.querySelector('.b27-practice-page');
    return null;
  }

  function destinationReady(id) {
    const node = destinationNode(id);
    if (!isActuallyVisible(node)) return false;
    if (id !== 'practice' && document.querySelector('.listening-overlay,.b27-practice-page,.b27-journey-page,.ux-practice-overlay')) return false;
    return true;
  }

  function visibleNavOwner() {
    // Listening is a transient surface, not a fourth bottom-nav destination.
    // Do not rewrite the underlying tab while it is open; the next explicit
    // top-level tap will close Listening and establish its own destination.
    if (isActuallyVisible(document.querySelector('.listening-overlay'))) return '';

    // Nav ownership begins as soon as a destination exists and is entering.
    // Final visual readiness remains a stricter, separate contract below.
    const practice = document.querySelector('.b27-practice-page');
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

  function refreshFacades() {
    settleTopLevelMotion();
    window.FrenchTranquilleBuild27Shell?.refresh?.();
    window.FrenchTranquilleBuild32Shell?.refresh?.();
    window.FrenchTranquilleUX?.refresh?.();
    settleTopLevelMotion();
    scheduleNavReconcile();
  }

  function openPracticeOnStableBase(epoch) {
    if (epoch !== routeEpoch) return;
    // Practice is learner-facing like a tab, but Build 27 implements it as a
    // body overlay. Always give it the same stable Home base underneath so the
    // visible tab never inherits Conversation/Progress/Review state.
    routeLegacy('home');
    refreshFacades();
    requestAnimationFrame(() => {
      if (epoch !== routeEpoch) return;
      settleTopLevelMotion();
      window.FrenchTranquilleBuild27Shell?.openPractice?.();
      setActiveNav('practice');
      scheduleNavReconcile();
      settleDestination('practice', epoch, 0, false);
    });
  }

  function settleDestination(id, epoch, attempt = 0, recovered = false) {
    if (epoch !== routeEpoch) return;
    refreshFacades();

    if (id === 'practice' && !document.querySelector('.b27-practice-page')) {
      window.FrenchTranquilleBuild27Shell?.openPractice?.();
    }
    if (id === 'practice' && ownsNavWhileSettling(document.querySelector('.b27-practice-page'))) setActiveNav('practice');

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

    // The field bug was recoverable by a second human tap. Make that recovery
    // deterministic inside the transaction, but only after visibility really
    // failed — DOM presence alone is not success.
    if (!recovered && attempt >= 3) {
      root.dataset.fieldRouteRecovery = String(Number(root.dataset.fieldRouteRecovery || 0) + 1);
      closeTransientSurfaces();
      if (id === 'practice') {
        routeLegacy('home');
        refreshFacades();
        requestAnimationFrame(() => {
          if (epoch !== routeEpoch) return;
          window.FrenchTranquilleBuild27Shell?.openPractice?.();
          setActiveNav('practice');
          settleDestination(id, epoch, attempt + 1, true);
        });
        return;
      }
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
    // Build 27 can leave a persistent top-level facade with a transient motion
    // class around Listening. The guard settles only top-level pages; overlays
    // keep their own entrance/exit animation.
    scheduleVisualGuard(target.matches('[data-listening-close]') ? 30 : 190);
  }

  if (enableFieldRouter) {
    window.addEventListener('click', routeVisibleNavigation, true);
    window.addEventListener('click', guardBuild27Transition, true);

    // ux-shell.js independently recomputes the bottom-nav from the hidden
    // legacy screen. Practice intentionally sits above legacy Home, so a later
    // UX refresh used to flip the active tab back to Home while Practice was
    // visibly open. Reconcile from the visible surface after DOM/class changes.
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
