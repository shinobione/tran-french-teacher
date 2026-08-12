(() => {
  'use strict';

  if (window.FrenchTranquilleBuild269UX) return;

  const params = new URLSearchParams(location.search);
  const smokeMode = params.get('b269Smoke');
  const TEST_KEYS = ['memory','mastery','listening','real-life','path'];
  let scheduled = false;
  let settleToken = 0;

  const waitFor = (test, done, attempts = 180, delay = 70) => {
    let count = 0;
    const tick = () => {
      let value = null;
      try { value = test(); } catch {}
      if (value) { done(value); return; }
      count += 1;
      if (count < attempts) setTimeout(tick, delay);
    };
    tick();
  };

  function nodes() {
    const screen = document.querySelector('.screen-progress');
    const layout = screen?.querySelector('.progress-layout.progress-ux-ready');
    const composition = layout?.querySelector(':scope > .progress-ux-composition');
    const details = composition?.querySelector(':scope > .progress-ux-details');
    const body = details?.querySelector(':scope > .progress-ux-details-body');
    const dashboard = body?.querySelector('.progress-detail-dashboard');
    return screen && layout && composition && details && body && dashboard
      ? { screen, layout, composition, details, body, dashboard }
      : null;
  }

  function screenVisible(screen) {
    if (!screen || screen.classList.contains('hidden')) return false;
    const style = getComputedStyle(screen);
    return style.display !== 'none' && style.visibility !== 'hidden';
  }

  function sourceActiveKey(n) {
    const apiKey = window.FrenchTranquilleProgressDetailsDashboard?.active?.();
    return apiKey || n.details.dataset.progressDetailActive || '';
  }

  function panelFor(n,key) {
    return key ? n.dashboard.querySelector(`[data-progress-detail-panel="${CSS.escape(key)}"]`) : null;
  }

  function visibleCard(card) {
    if (!card) return false;
    const style = getComputedStyle(card);
    const rect = card.getBoundingClientRect();
    return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 80 && rect.height > 24;
  }

  function measure(n,key) {
    const panel = panelFor(n,key);
    const host = panel?.querySelector('.progress-detail-panel-cards');
    const cards = host ? [...host.querySelectorAll(':scope > .card')] : [];
    const visibleCards = cards.filter(visibleCard);
    const panelRect = panel?.getBoundingClientRect?.() || { width:0, height:0 };
    const hostRect = host?.getBoundingClientRect?.() || { width:0, height:0 };
    const widths = visibleCards.map(card => card.getBoundingClientRect().width);
    const maxCardWidth = widths.length ? Math.max(...widths) : 0;
    const minCardHeight = visibleCards.length ? Math.min(...visibleCards.map(card => card.getBoundingClientRect().height)) : 0;
    const singleUsesSurface = visibleCards.length !== 1 || hostRect.width < 1 || maxCardWidth >= hostRect.width * .82;
    const ready = Boolean(
      panel && !panel.hidden &&
      getComputedStyle(panel).display !== 'none' &&
      visibleCards.length >= 1 &&
      panelRect.width > 260 && panelRect.height > 50 &&
      maxCardWidth > 240 && minCardHeight > 24 &&
      singleUsesSurface
    );
    return {
      ready,
      panel,
      host,
      cards,
      visibleCards,
      panelWidth: Math.round(panelRect.width || 0),
      panelHeight: Math.round(panelRect.height || 0),
      hostWidth: Math.round(hostRect.width || 0),
      maxCardWidth: Math.round(maxCardWidth),
      minCardHeight: Math.round(minCardHeight),
      singleUsesSurface
    };
  }

  function synchronizePanel(n,key) {
    const api = window.FrenchTranquilleProgressDetailsDashboard;
    api?.decorate?.();

    const active = sourceActiveKey(n);
    if (!active || active !== key) return false;

    // Dashboard owns the activeKey. Build 26.9 only makes its visual consequence
    // deterministic if another observer left stale `hidden` attributes behind.
    n.dashboard.querySelectorAll('[data-progress-detail-panel]').forEach(panel => {
      const shouldShow = panel.dataset.progressDetailPanel === active;
      if (panel.hidden === shouldShow) panel.hidden = !shouldShow;
    });

    if (n.details.dataset.progressDetailActive !== active) {
      n.details.dataset.progressDetailActive = active;
    }
    return true;
  }

  function markReady(n,key,metric) {
    n.layout.dataset.b269ContentReady = metric.ready ? '1' : '0';
    n.layout.dataset.b269ContentKey = key || '';
    n.layout.dataset.b269VisibleCards = String(metric.visibleCards.length);
    n.layout.dataset.b269PanelWidth = String(metric.panelWidth);
    n.layout.dataset.b269PanelHeight = String(metric.panelHeight);
    n.layout.dataset.b269CardWidth = String(metric.maxCardWidth);
  }

  function settleActive(attempt = 0, token = ++settleToken) {
    const n = nodes();
    if (!n || !screenVisible(n.screen)) return;
    const key = sourceActiveKey(n);
    if (!key) {
      delete n.layout.dataset.b269ContentReady;
      delete n.layout.dataset.b269ContentKey;
      delete n.layout.dataset.b269VisibleCards;
      delete n.layout.dataset.b269PanelWidth;
      delete n.layout.dataset.b269PanelHeight;
      delete n.layout.dataset.b269CardWidth;
      return;
    }

    synchronizePanel(n,key);
    requestAnimationFrame(() => {
      if (token !== settleToken) return;
      const current = nodes();
      if (!current || sourceActiveKey(current) !== key) return;
      const metric = measure(current,key);
      markReady(current,key,metric);
      if (!metric.ready && attempt < 16) {
        setTimeout(() => settleActive(attempt + 1, token), 55);
      }
    });
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      const n = nodes();
      if (!n || !screenVisible(n.screen)) return;
      const key = sourceActiveKey(n);
      if (key) settleActive(0);
      else {
        delete n.layout.dataset.b269ContentReady;
        delete n.layout.dataset.b269ContentKey;
      }
    });
  }

  // The dashboard listener is registered before Build 26.9. By the time this
  // microtask runs, its activeKey has already changed; force one synchronous
  // decorate then let Build 26.8 perform the focus transition normally.
  document.addEventListener('click', event => {
    if (event.target.closest('[data-progress-detail-open],[data-progress-detail-close],[data-b268-focus-back="details"]')) {
      queueMicrotask(() => {
        window.FrenchTranquilleProgressDetailsDashboard?.decorate?.();
        schedule();
      });
    }
  }, true);

  const app = document.getElementById('app');
  if (app) {
    new MutationObserver(schedule).observe(app, {
      subtree:true,
      childList:true,
      attributes:true,
      attributeFilter:['data-progress-detail-active','data-b268-focus','hidden','class']
    });
  }

  function navProgress(done) {
    waitFor(
      () => document.querySelector('[data-ux-nav="progress"]') || document.querySelector('.bottom-nav [data-go="progress"]'),
      nav => {
        nav.click();
        waitFor(() => {
          window.FrenchTranquilleProgressionUX?.decorate?.();
          window.FrenchTranquilleProgressDetailsDashboard?.decorate?.();
          const n = nodes();
          return n && screenVisible(n.screen) ? n : null;
        }, done);
      }
    );
  }

  function ensureDetailsOpen(n,done) {
    if (n.details.open) { done(); return; }
    n.details.querySelector(':scope > summary')?.click();
    waitFor(() => n.details.open ? true : null, done);
  }

  function recordGroup(key,metric) {
    const html = document.documentElement;
    html.dataset[`b269${key.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())}Ready`] = metric.ready ? '1' : '0';
    html.dataset[`b269${key.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())}Cards`] = String(metric.visibleCards.length);
    html.dataset[`b269${key.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())}PanelWidth`] = String(metric.panelWidth);
    html.dataset[`b269${key.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())}CardWidth`] = String(metric.maxCardWidth);
    html.dataset[`b269${key.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())}PanelHeight`] = String(metric.panelHeight);
  }

  function openAndValidate(n,key,done) {
    window.FrenchTranquilleProgressDetailsDashboard?.decorate?.();
    const tile = n.dashboard.querySelector(`[data-progress-detail-open="${CSS.escape(key)}"]`);
    if (!tile) return;
    tile.click();
    waitFor(() => {
      const current = nodes();
      if (!current) return null;
      synchronizePanel(current,key);
      const metric = measure(current,key);
      const focusReady = current.layout.dataset.b268Focus === 'details';
      return focusReady && sourceActiveKey(current) === key && metric.ready ? { current, metric } : null;
    }, result => {
      recordGroup(key,result.metric);
      done(result.current);
    });
  }

  function closeFocusedDetails(n,done) {
    n.body.querySelector('[data-b268-focus-back="details"]')?.click();
    waitFor(() => {
      const current = nodes();
      return current && !sourceActiveKey(current) && !current.layout.dataset.b268Focus ? current : null;
    }, done);
  }

  function smokeGroups() {
    navProgress(n => ensureDetailsOpen(n, () => {
      let index = 0;
      const next = current => {
        if (index >= TEST_KEYS.length) {
          document.documentElement.dataset.b269GroupsComplete = '1';
          document.documentElement.dataset.b269HorizontalOverflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 2 ? '1' : '0';
          return;
        }
        const key = TEST_KEYS[index++];
        openAndValidate(current,key,focused => closeFocusedDetails(focused,next));
      };
      next(n);
    }));
  }

  function smokeMemory() {
    navProgress(n => ensureDetailsOpen(n, () => {
      openAndValidate(n,'memory',focused => {
        const metric = measure(focused,'memory');
        recordGroup('memory',metric);
        document.documentElement.dataset.b269MemoryComplete = '1';
        document.documentElement.dataset.b269HorizontalOverflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 2 ? '1' : '0';
      });
    }));
  }

  if (smokeMode === 'groups') setTimeout(smokeGroups,180);
  if (smokeMode === 'memory') setTimeout(smokeMemory,180);

  schedule();

  window.FrenchTranquilleBuild269UX = {
    version:'1.19.9',
    build:'26.9',
    reconcile:schedule,
    measure(key){
      const n = nodes();
      return n ? measure(n,key) : null;
    }
  };
})();
