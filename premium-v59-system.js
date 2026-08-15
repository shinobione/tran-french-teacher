(() => {
  'use strict';

  const VERSION = '2.3.25-v59c1';
  const root = document.documentElement;
  const LONG_PRESS_MS = 820;
  let scheduled = false;
  let pressTimer = null;
  let pressTarget = null;

  function mark(node, role) {
    if (!(node instanceof HTMLElement)) return;
    node.dataset.v59Premium = role;
  }

  function decorateSurfaces() {
    document.querySelectorAll('.b27-quick-card').forEach(node => mark(node, 'quick-card'));
    document.querySelectorAll('.b27-practice-action').forEach(node => mark(node, 'practice-card'));
    document.querySelectorAll('.b27-primary-action,.b27-secondary-action').forEach(node => mark(node, 'cta'));
    document.querySelectorAll('.b27-level-card,.b27-current-card,.b27-stage-card').forEach(node => mark(node, 'content-card'));
    document.querySelectorAll('.listening-audio-card,.listening-question-card').forEach(node => mark(node, 'content-card'));
    document.querySelectorAll('.screen-settings .ft-theme-settings-inline,#ft-settings-legal,.screen-settings .memory-backup-card').forEach(node => mark(node, 'settings-card'));
    document.querySelectorAll('.b27-practice-icon,.b27-quick-icon,.ft-v55-recovery-icon').forEach(node => mark(node, 'icon-circle'));
  }

  function settingsTitle() {
    return document.querySelector('.screen-settings .topbar h1,.screen-settings .topbar h2,.screen-settings .content > h1');
  }

  function prepareDebugEntry() {
    const title = settingsTitle();
    if (!title) return;
    title.dataset.v59DebugEntry = 'long-press';
    title.setAttribute('data-v59-admin-only', '1');
  }

  function clearPress() {
    if (pressTimer) clearTimeout(pressTimer);
    pressTimer = null;
    pressTarget = null;
  }

  function toggleDebug(source) {
    const api = window.FrenchTranquilleDebugFr;
    if (!api?.toggle) return false;
    const themeBefore = localStorage.getItem('french-tranquille:appearance-theme:v1');
    api.toggle();
    const themeAfter = localStorage.getItem('french-tranquille:appearance-theme:v1');
    if (themeAfter !== themeBefore) {
      if (themeBefore === null) localStorage.removeItem('french-tranquille:appearance-theme:v1');
      else localStorage.setItem('french-tranquille:appearance-theme:v1', themeBefore);
      throw new Error('V5.9 DEBUG entry must never mutate theme');
    }
    root.dataset.v59DebugEntryUsed = source;
    return true;
  }

  function decorate() {
    decorateSurfaces();
    prepareDebugEntry();
    root.dataset.v59PremiumSystem = '1';
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      decorate();
    });
  }

  document.addEventListener('pointerdown', event => {
    const title = event.target.closest?.('[data-v59-debug-entry="long-press"]');
    if (!title || event.button > 0) return;
    clearPress();
    pressTarget = title;
    pressTimer = setTimeout(() => {
      if (pressTarget !== title) return;
      clearPress();
      try { toggleDebug('long-press'); } catch (error) { console.error(error); }
    }, LONG_PRESS_MS);
  }, true);

  ['pointerup','pointercancel','pointerleave'].forEach(type => {
    document.addEventListener(type, event => {
      if (!pressTarget) return;
      if (event.target === pressTarget || pressTarget.contains?.(event.target) || type !== 'pointerleave') clearPress();
    }, true);
  });

  document.addEventListener('keydown', event => {
    if (!(event.altKey && event.shiftKey && event.code === 'KeyD')) return;
    if (event.target.closest?.('input,textarea,select,[contenteditable="true"]')) return;
    event.preventDefault();
    try { toggleDebug('keyboard'); } catch (error) { console.error(error); }
  }, true);

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app, { childList:true, subtree:true });
  new MutationObserver(schedule).observe(document.body, { childList:true, subtree:true });
  window.addEventListener('focus', schedule);

  schedule();
  window.FrenchTranquillePremiumV59System = Object.freeze({
    version: VERSION,
    refresh: decorate,
    toggleDebug: () => toggleDebug('api')
  });
})();
