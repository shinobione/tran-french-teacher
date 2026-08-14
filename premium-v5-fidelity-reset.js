(() => {
  'use strict';

  const VERSION = '2.3.20-v5fidelity4';
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const ORIGIN = { review:'home', conversation:'practice', listening:'home', scenario:'scenario-list' };
  const isPremium = () => (document.documentElement.dataset.theme || 'original') !== 'original';
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  let scheduled = false;

  function currentScreen() {
    const shell = document.querySelector('#app .app-shell');
    if (!shell) return '';
    const cls = [...shell.classList].find(name => name.startsWith('screen-'));
    return cls ? cls.slice(7) : '';
  }

  function remember(node) {
    if (!node || node.dataset.v55Remembered === '1') return;
    node.dataset.v55Remembered = '1';
    node.dataset.v55Text = node.textContent || '';
    node.dataset.v55WasInvisible = node.classList.contains('invisible') ? '1' : '0';
  }

  function setText(node, text) {
    if (node && node.textContent !== text) node.textContent = text;
  }

  function restoreNode(node) {
    if (!node || node.dataset.v55Remembered !== '1') return;
    setText(node, node.dataset.v55Text || '');
    if (node.dataset.v55WasInvisible === '1') node.classList.add('invisible');
    node.classList.remove('ft-v55-subview-back','ft-v55-settings-close','ft-v55-settings-gear');
    delete node.dataset.v55Return;
  }

  function openPracticeWithoutFlash() {
    const api = window.FrenchTranquilleBuild27Shell;
    const home = () => document.querySelector('.bottom-nav [data-go="home"]');
    if (!api?.openPractice) {
      home()?.click();
      return;
    }
    api.openPractice();
    requestAnimationFrame(() => {
      if (currentScreen() !== 'home') home()?.click();
    });
  }

  function markBack(node, origin = 'home') {
    if (!node) return;
    remember(node);
    node.classList.remove('invisible');
    node.classList.add('ft-v55-subview-back');
    if (node.dataset.v55Return !== origin) node.dataset.v55Return = origin;
    setText(node, '‹');
    const label = T('Quay lại','Retour');
    if (node.getAttribute('aria-label') !== label) node.setAttribute('aria-label', label);
  }

  function controls() {
    if (!isPremium()) return;

    document.querySelectorAll('[data-b27-settings], .listening-settings, .screen-home [data-go="settings"]')
      .forEach(node => node.classList.add('ft-v55-settings-gear'));

    const reviewBack = document.querySelector('.screen-review .topbar [data-back]');
    if (reviewBack) markBack(reviewBack, ORIGIN.review);

    const conversationBack = document.querySelector('.screen-conversation .topbar [data-back]');
    if (conversationBack) markBack(conversationBack, ORIGIN.conversation);

    const listeningBack = document.querySelector('.listening-overlay .listening-close');
    if (listeningBack) markBack(listeningBack, ORIGIN.listening);

    const scenarioBack = document.querySelector('.scenario-runner .scenario-close');
    if (scenarioBack) markBack(scenarioBack, ORIGIN.scenario);

    document.querySelectorAll('.b27-practice-page .b27-back').forEach(node => markBack(node, 'home'));

    const settingsBack = document.querySelector('.screen-settings .topbar [data-back]');
    if (settingsBack) {
      remember(settingsBack);
      settingsBack.classList.remove('invisible','ft-v55-subview-back');
      settingsBack.classList.add('ft-v55-settings-close');
      setText(settingsBack, '×');
      const label = T('Đóng cài đặt','Fermer les réglages');
      if (settingsBack.getAttribute('aria-label') !== label) settingsBack.setAttribute('aria-label', label);
    }
  }

  function progressRoute() {
    const card = document.querySelector('.b27-progress-page .b27-level-card');
    if (!card) return;
    const existing = card.querySelector(':scope > .ft-v55-level-route');

    if (!isPremium()) {
      if (existing) {
        const track = existing.querySelector('.b27-level-track');
        if (track) existing.before(track);
        existing.remove();
      }
      return;
    }

    if (existing) return;
    const track = card.querySelector(':scope > .b27-level-track');
    if (!track) return;

    const route = document.createElement('div');
    route.className = 'ft-v55-level-route';
    route.dataset.v55LevelRoute = '1';
    const a0 = document.createElement('span');
    a0.className = 'ft-v55-level-node';
    a0.textContent = 'A0';
    const a1 = document.createElement('span');
    a1.className = 'ft-v55-level-node';
    a1.textContent = 'A1';
    track.before(route);
    route.append(a0, track, a1);
  }

  function aboutPanel() {
    const card = document.getElementById('ft-settings-legal');
    if (!card) return;
    const head = card.querySelector('.ft-legal-head');
    const title = head?.querySelector('h2');

    if (!isPremium()) {
      card.removeAttribute('data-v55-open');
      head?.querySelector('.ft-v55-about-toggle')?.remove();
      if (title?.dataset.v55OriginalTitle) {
        setText(title, title.dataset.v55OriginalTitle);
        delete title.dataset.v55OriginalTitle;
      }
      return;
    }

    if (title && !title.dataset.v55OriginalTitle) title.dataset.v55OriginalTitle = title.textContent || '';
    if (title) setText(title, T('Giới thiệu','À propos'));
    if (!head?.querySelector('.ft-v55-about-toggle')) {
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'ft-v55-about-toggle';
      toggle.dataset.v55AboutToggle = '1';
      toggle.setAttribute('aria-label', T('Mở phần giới thiệu','Ouvrir À propos'));
      toggle.setAttribute('aria-expanded','false');
      toggle.textContent = '›';
      head?.appendChild(toggle);
    }
  }

  function themePicker() {
    const picker = document.querySelector('.screen-settings .ft-theme-settings-inline');
    if (!picker) return;
    if (!isPremium()) {
      if (picker.dataset.v55Prepared === '1' && picker.dataset.v55WasOpen === '1') picker.open = true;
      delete picker.dataset.v55Prepared;
      delete picker.dataset.v55WasOpen;
      return;
    }
    if (picker.dataset.v55Prepared === '1') return;
    picker.dataset.v55Prepared = '1';
    picker.dataset.v55WasOpen = picker.open ? '1' : '0';
    picker.open = false;
  }

  function classifySettings() {
    const settings = document.querySelector('.screen-settings');
    const narrow = settings?.querySelector('.narrow');
    if (!settings || !narrow) return;

    const debugCard = settings.querySelector('#debug-fr-card');
    if (debugCard) debugCard.classList.add('ft-v55-technical-card');
    const diagnosticCard = settings.querySelector('.diagnostics')?.closest('.card');
    if (diagnosticCard) diagnosticCard.classList.add('ft-v55-diagnostics-card');

    [...narrow.children].forEach(card => {
      if (!(card instanceof HTMLElement)) return;
      if (card.id === 'ft-settings-legal' || card.matches('.ft-theme-settings-inline,.ux-settings-note')) return;
      const text = (card.textContent || '').replace(/\s+/g,' ').trim();
      const recovery = card.matches('.memory-backup-card,.danger-zone') || !!card.querySelector('[data-memory-export],[data-memory-import],[data-memory-file]');
      const technical = card.id === 'debug-fr-card' || !!card.querySelector('.diagnostics') || /LOCAL\s*[•·-]\s*BUILD|ERROR INTELLIGENCE|DỮ LIỆU KHÓ KHĂN|DONNÉES DIFFICILES|DIAGNOSTIC|CHẨN ĐOÁN|BUILD\s*18/i.test(text);
      if (recovery) card.classList.add('ft-v55-recovery-card');
      else if (technical) card.classList.add('ft-v55-technical-card');
    });
  }

  function cleanupSettings() {
    document.querySelectorAll('.screen-settings .ft-v55-diagnostics-card,.screen-settings .ft-v55-technical-card,.screen-settings .ft-v55-recovery-card').forEach(node => {
      node.classList.remove('ft-v55-diagnostics-card','ft-v55-technical-card','ft-v55-recovery-card');
    });
  }

  function cleanupOriginal() {
    if (isPremium()) return;
    document.querySelectorAll('[data-v55-remembered="1"]').forEach(restoreNode);
    progressRoute();
    aboutPanel();
    themePicker();
    cleanupSettings();
    delete document.documentElement.dataset.v55Fidelity;
  }

  function decorate() {
    if (!isPremium()) {
      cleanupOriginal();
      return;
    }
    controls();
    progressRoute();
    aboutPanel();
    themePicker();
    classifySettings();
    if (document.documentElement.dataset.v55Fidelity !== '1') document.documentElement.dataset.v55Fidelity = '1';
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
    const practiceAction = event.target.closest('[data-b27-practice-action]');
    if (practiceAction) {
      const id = practiceAction.dataset.b27PracticeAction;
      if (id === 'review') ORIGIN.review = 'practice';
      if (id === 'conversation') ORIGIN.conversation = 'practice';
      if (id === 'listening') ORIGIN.listening = 'practice';
      if (id === 'real-life') { ORIGIN.conversation = 'practice'; ORIGIN.scenario = 'scenario-list'; }
      schedule();
    }

    const homeAction = event.target.closest('[data-b27-action]');
    if (homeAction) {
      const id = homeAction.dataset.b27Action;
      if (id === 'review') ORIGIN.review = 'home';
      if (id === 'listening') ORIGIN.listening = 'home';
    }

    const back = event.target.closest('.ft-v55-subview-back');
    if (back?.dataset.v55Return === 'practice' && (back.matches('[data-back]') || back.matches('.b27-back'))) {
      event.preventDefault();
      event.stopImmediatePropagation();
      openPracticeWithoutFlash();
      return;
    }

    const listening = event.target.closest('.listening-close.ft-v55-subview-back');
    if (listening?.dataset.v55Return === 'practice') setTimeout(openPracticeWithoutFlash, 0);

    /* Scenario Close keeps its native semantic first: active scenario → list.
       The Conversation Back at the same physical anchor then returns to Practice. */

    const about = event.target.closest('[data-v55-about-toggle]');
    if (about) {
      event.preventDefault();
      const card = about.closest('#ft-settings-legal');
      if (card) {
        const next = card.dataset.v55Open === '1' ? '0' : '1';
        if (card.dataset.v55Open !== next) card.dataset.v55Open = next;
        about.setAttribute('aria-expanded', next === '1' ? 'true' : 'false');
      }
    }
  }, true);

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app, { childList:true, subtree:true });
  new MutationObserver(schedule).observe(document.body, { childList:true, subtree:true });
  new MutationObserver(schedule).observe(document.documentElement, { attributes:true, attributeFilter:['data-theme','class'] });
  window.addEventListener('storage', event => { if (event.key === DEBUG_KEY) schedule(); });
  window.addEventListener('focus', schedule);

  schedule();
  window.FrenchTranquillePremiumV55 = Object.freeze({ version:VERSION, refresh:decorate, openPractice:openPracticeWithoutFlash });
})();
