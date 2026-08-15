(() => {
  'use strict';

  const VERSION = '2.3.23-v59a1';
  const root = document.documentElement;
  let scheduled = false;

  const REAL_LIFE_ICON = `
    <svg class="ft-v59-real-life-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M12 21s6-5.25 6-11a6 6 0 1 0-12 0c0 5.75 6 11 6 11Z"/>
      <circle cx="12" cy="10" r="2.15"/>
      <path d="M8.75 4.9c1.02-.58 2.1-.9 3.25-.9 1.18 0 2.29.33 3.28.92"/>
    </svg>`;

  function rememberAria(panel) {
    if (panel.dataset.v59PreviousAriaHidden !== undefined) return;
    const current = panel.getAttribute('aria-hidden');
    panel.dataset.v59PreviousAriaHidden = current === null ? '__none__' : current;
  }

  function restoreAria(panel) {
    const previous = panel.dataset.v59PreviousAriaHidden;
    if (previous === undefined) return;
    if (previous === '__none__') panel.removeAttribute('aria-hidden');
    else panel.setAttribute('aria-hidden', previous);
    delete panel.dataset.v59PreviousAriaHidden;
  }

  function speakingOwnership() {
    document.querySelectorAll('.screen-lesson .lesson-step').forEach(step => {
      const cards = [...step.querySelectorAll(':scope > .speaking-loop-card')];
      const owner = cards[0] || null;

      /* One visible owner per lesson step. The Speaking Loop already renders one
         capture control; any duplicate direct card is stale ownership, not a
         second pedagogical action. */
      cards.slice(1).forEach(card => card.remove());

      const ownsReplay = Boolean(owner);
      step.classList.toggle('ft-v59-speaking-owner', ownsReplay);
      step.dataset.v59SpeakingOwner = ownsReplay ? 'speaking-loop' : '';

      step.querySelectorAll('.voice-replay-panel').forEach(panel => {
        if (ownsReplay) {
          rememberAria(panel);
          panel.setAttribute('aria-hidden', 'true');
        } else {
          restoreAria(panel);
        }
      });

      if (!owner) return;

      /* Defensive uniqueness inside the active Speaking Loop card. This is a
         guard against stale DOM duplication only; it never creates/replaces
         MediaRecorder handlers or touches the voice engines. */
      [...owner.querySelectorAll('[data-speaking-record]')].slice(1).forEach(node => node.remove());
      [...owner.querySelectorAll('.speaking-loop-note')].slice(1).forEach(node => node.remove());
    });
  }

  function prepareAboutCard() {
    const card = document.getElementById('ft-settings-legal');
    const head = card?.querySelector('.ft-legal-head');
    const toggle = head?.querySelector('[data-v55-about-toggle]');
    if (!card || !head || !toggle) return;

    head.classList.add('ft-v59-about-hit-target');
    head.dataset.v59AboutHitTarget = '1';
    head.setAttribute('role', 'button');
    head.setAttribute('tabindex', '0');
    head.setAttribute('aria-controls', 'ft-settings-legal');
    head.setAttribute('aria-expanded', toggle.getAttribute('aria-expanded') || 'false');
  }

  function syncAboutExpanded() {
    const head = document.querySelector('#ft-settings-legal .ft-legal-head[data-v59-about-hit-target]');
    const toggle = head?.querySelector('[data-v55-about-toggle]');
    if (head && toggle) head.setAttribute('aria-expanded', toggle.getAttribute('aria-expanded') || 'false');
  }

  function decorateRealLifeIcon() {
    document.querySelectorAll('[data-b27-practice-action="real-life"] .b27-practice-icon').forEach(icon => {
      if (icon.dataset.v59RealLifeIcon === '1') return;
      icon.dataset.v59RealLifeIcon = '1';
      icon.innerHTML = REAL_LIFE_ICON;
      icon.setAttribute('aria-hidden', 'true');
    });
  }

  function decorate() {
    speakingOwnership();
    prepareAboutCard();
    syncAboutExpanded();
    decorateRealLifeIcon();
    root.dataset.v59Interactions = '1';
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      decorate();
    });
  }

  document.addEventListener('click', event => {
    const head = event.target.closest?.('#ft-settings-legal .ft-legal-head[data-v59-about-hit-target]');
    if (!head) return;
    if (event.target.closest('button,a,input,select,textarea,label')) return;
    const toggle = head.querySelector('[data-v55-about-toggle]');
    if (!toggle) return;
    event.preventDefault();
    toggle.click();
    queueMicrotask(syncAboutExpanded);
  }, true);

  document.addEventListener('keydown', event => {
    const head = event.target.closest?.('#ft-settings-legal .ft-legal-head[data-v59-about-hit-target]');
    if (!head || !['Enter', ' '].includes(event.key)) return;
    if (event.target.closest('button,a,input,select,textarea')) return;
    event.preventDefault();
    head.querySelector('[data-v55-about-toggle]')?.click();
    queueMicrotask(syncAboutExpanded);
  }, true);

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app, { childList:true, subtree:true });
  new MutationObserver(schedule).observe(document.body, { childList:true, subtree:true });
  window.addEventListener('focus', schedule);

  schedule();
  window.FrenchTranquillePremiumV59Interactions = Object.freeze({
    version: VERSION,
    refresh: decorate
  });
})();
