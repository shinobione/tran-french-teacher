(function attachLearnerActionPracticeAdvisory(root, factory) {
  'use strict';

  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FrenchTranquilleLearnerActionPracticeAdvisory = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createLearnerActionPracticeAdvisory(root) {
  'use strict';

  const ROADMAP_SLICE = '39.5';
  const API_VERSION = '3.0.0-practice-advisory';
  const ACTION_BY_FAMILY = Object.freeze({
    'phrase-retrieval': 'review',
    listening: 'listening',
    scenario: 'real-life'
  });

  function actionForDecision(decision) {
    const type = decision?.selected?.type || null;
    return type ? ACTION_BY_FAMILY[type] || null : null;
  }

  function badgeLabel() {
    const debug = Boolean(root?.document?.documentElement?.classList?.contains('b27-debug'));
    return debug ? 'Conseillé maintenant' : 'Gợi ý lúc này';
  }

  function clearLegacyBadges(page) {
    page?.querySelectorAll?.('[data-b27-practice-action] em').forEach(node => node.remove());
    page?.querySelectorAll?.('[data-b27-practice-action][data-b395-recommended]').forEach(node => {
      delete node.dataset.b395Recommended;
    });
  }

  function decorate(page) {
    if (!page?.matches?.('.b27-practice-page')) return Object.freeze({ applied:false, actionId:null, reason:'not-practice-page' });
    if (page.dataset.b395Advisory === '1') {
      return Object.freeze({
        applied:true,
        actionId: page.dataset.b395Recommended === 'none' ? null : page.dataset.b395Recommended || null,
        reason: page.dataset.b395Reason || 'already-decorated'
      });
    }

    clearLegacyBadges(page);

    const runtime = root?.FrenchTranquilleLearnerActionRuntimeSnapshot || null;
    const runtimeReady = Boolean(runtime?.status?.().ready && typeof runtime?.decide === 'function');
    let decision = null;
    let actionId = null;
    let reason = runtimeReady ? 'li3-abstained' : 'runtime-snapshot-unavailable';

    if (runtimeReady) {
      try {
        decision = runtime.decide();
        actionId = actionForDecision(decision);
        reason = decision?.reason || (actionId ? 'li3-advisory' : 'li3-abstained');
      } catch {
        actionId = null;
        reason = 'runtime-snapshot-decision-failed';
      }
    }

    const action = actionId ? page.querySelector(`[data-b27-practice-action="${actionId}"]`) : null;
    if (!action || action.disabled) {
      actionId = null;
      if (action?.disabled) reason = 'recommended-action-unavailable';
    }

    if (actionId && action) {
      const copy = action.querySelector('span:nth-child(2)');
      if (copy) {
        const badge = root.document.createElement('em');
        badge.dataset.b395AdvisoryBadge = '1';
        badge.textContent = badgeLabel();
        copy.appendChild(badge);
        action.dataset.b395Recommended = '1';
      } else {
        actionId = null;
        reason = 'practice-action-copy-missing';
      }
    }

    page.dataset.b395Advisory = '1';
    page.dataset.b395Recommended = actionId || 'none';
    page.dataset.b395DecisionType = decision?.selected?.type || 'none';
    page.dataset.b395Reason = reason;

    return Object.freeze({ applied:true, actionId, reason });
  }

  function install() {
    const document = root?.document;
    if (!document?.body || typeof root.MutationObserver !== 'function') return false;

    const decorateExisting = () => document.querySelectorAll('.b27-practice-page').forEach(decorate);
    decorateExisting();

    const observer = new root.MutationObserver(mutations => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes || []) {
          if (node?.matches?.('.b27-practice-page')) decorate(node);
          node?.querySelectorAll?.('.b27-practice-page').forEach(decorate);
        }
      }
    });
    observer.observe(document.body, { childList:true, subtree:true });
    return true;
  }

  const installed = install();

  return Object.freeze({
    roadmapSlice: ROADMAP_SLICE,
    version: API_VERSION,
    installed,
    actionForDecision,
    decorate
  });
});
