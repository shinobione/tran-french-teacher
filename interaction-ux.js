(() => {
  'use strict';

  if (window.FrenchTranquilleInteraction) return;

  const VERSION = '1.17.3';
  const BUILD = 24.3;
  const INTERACTIVE = [
    'button:not(:disabled)',
    'a[href]',
    '[role="button"]:not([aria-disabled="true"])',
    '[data-go]',
    '[data-ux-nav]',
    '[data-ux-practice]',
    '.daily-step',
    '.option:not(:disabled)',
    '.scenario-card:not(.locked)',
    '.listening-option:not([aria-disabled="true"])'
  ].join(',');

  let pressed = null;
  let lastScreen = '';

  const closestInteractive = target => target?.closest?.(INTERACTIVE) || null;

  function clearPressed(delay = 0) {
    const node = pressed;
    pressed = null;
    if (!node) return;
    const clear = () => node.classList.remove('ux-pressing');
    delay ? setTimeout(clear, delay) : clear();
  }

  document.addEventListener('pointerdown', event => {
    if (event.button != null && event.button !== 0) return;
    const node = closestInteractive(event.target);
    if (!node) return;
    clearPressed();
    pressed = node;
    node.classList.add('ux-pressing');
  }, { capture: true, passive: true });

  document.addEventListener('pointerup', () => clearPressed(55), { capture: true, passive: true });
  document.addEventListener('pointercancel', () => clearPressed(), { capture: true, passive: true });
  document.addEventListener('dragstart', () => clearPressed(), { capture: true, passive: true });
  window.addEventListener('blur', () => clearPressed());

  document.addEventListener('click', event => {
    const node = closestInteractive(event.target);
    if (!node) return;
    node.classList.remove('ux-clicked');
    // Restart the short flash even on repeated taps.
    void node.offsetWidth;
    node.classList.add('ux-clicked');
    setTimeout(() => node.classList.remove('ux-clicked'), 240);
  }, { capture: true });

  function animateCurrentScreen() {
    const practice = document.querySelector('.ux-practice-overlay');
    if (practice && !practice.dataset.uxAnimated) {
      practice.dataset.uxAnimated = '1';
      practice.classList.add('ux-screen-enter');
      setTimeout(() => practice.classList.remove('ux-screen-enter'), 220);
    }

    const shell = document.querySelector('#app .app-shell');
    if (!shell) return;
    const screen = [...shell.classList].find(c => c.startsWith('screen-')) || 'screen-home';
    if (screen === lastScreen) return;
    lastScreen = screen;
    shell.classList.remove('ux-screen-enter');
    void shell.offsetWidth;
    shell.classList.add('ux-screen-enter');
    setTimeout(() => shell.classList.remove('ux-screen-enter'), 220);
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      animateCurrentScreen();
    });
  }

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app, { childList: true, subtree: true });
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: false });
  schedule();

  window.FrenchTranquilleInteraction = {
    version: VERSION,
    build: BUILD,
    selector: INTERACTIVE,
    refresh: schedule
  };
})();
