(() => {
  'use strict';

  const CURRICULUM = window.FrenchTranquilleCurriculum;
  if (!CURRICULUM) return;

  const LEARNER_KEY = CURRICULUM.key || 'francais-avec-luc:learner:v1';
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  let overlay = null;
  let scheduled = false;

  function learner() {
    try { return JSON.parse(localStorage.getItem(LEARNER_KEY) || '{}') || {}; }
    catch { return {}; }
  }

  function currentScreen() {
    const shell = document.querySelector('#app .app-shell');
    if (!shell) return 'boot';
    const cls = [...shell.classList].find(name => name.startsWith('screen-'));
    return cls ? cls.slice(7) : 'home';
  }

  function curriculumState() {
    const l = learner();
    const lessons = CURRICULUM.lessons || [];
    const completed = new Set(l.completedLessons || []);
    const next = lessons.find((lesson, index) => (index === 0 || completed.has(lessons[index - 1]?.id)) && !completed.has(lesson.id)) || lessons.at(-1) || null;
    const currentProgress = next ? Number(l.lessonProgress?.[next.id] || 0) : 0;
    return {
      learner: l,
      lessons,
      completed,
      completedCount: lessons.filter(x => completed.has(x.id)).length,
      next,
      currentProgress,
      knownCount: (l.knownItems || []).length
    };
  }

  function nativeGo(id) {
    closePractice();
    const target = document.querySelector(`.bottom-nav [data-go="${id}"]`);
    if (target) target.click();
  }

  function listeningAvailable() {
    try { return Boolean(window.FrenchTranquilleListening?.availability?.().meaning); }
    catch { return false; }
  }

  function memoryDue() {
    try { return Number(window.FrenchTranquilleMemory?.summary?.().due?.length || 0); }
    catch { return 0; }
  }

  function renderBottomNav() {
    const screen = currentScreen();
    document.body.dataset.uxScreen = screen;
    document.documentElement.classList.toggle('ux-debug-mode', isDebug());
    document.documentElement.classList.toggle('ux-learner-mode', !isDebug());

    let nav = document.querySelector('.ux-bottom-nav');
    if (!nav) {
      nav = document.createElement('nav');
      nav.className = 'ux-bottom-nav';
      nav.setAttribute('aria-label', T('Điều hướng chính', 'Navigation principale'));
      document.body.appendChild(nav);
    }

    const practiceActive = overlay || ['conversation','review'].includes(screen);
    const items = [
      ['home','⌂',T('Hôm nay','Aujourd’hui'),screen === 'home'],
      ['practice','◎',T('Luyện tập','Pratiquer'),practiceActive],
      ['progress','◔',T('Lộ trình','Parcours'),screen === 'progress']
    ];

    nav.innerHTML = items.map(([id,icon,label,active]) => `
      <button type="button" data-ux-nav="${id}" class="${active ? 'active' : ''}" aria-current="${active ? 'page' : 'false'}">
        <span aria-hidden="true">${icon}</span><strong>${esc(label)}</strong>
      </button>
    `).join('');
  }

  function openPractice() {
    if (overlay) return;
    const due = memoryDue();
    const listen = listeningAvailable();
    overlay = document.createElement('div');
    overlay.className = 'ux-practice-overlay';
    overlay.innerHTML = `
      <section class="ux-practice-sheet" role="dialog" aria-modal="true" aria-label="${esc(T('Luyện tập','Pratiquer'))}">
        <header>
          <div class="ux-practice-title">
            <img src="./assets/Favicon.png" alt="" aria-hidden="true">
            <div><span>${esc(T('Luyện tập','PRATIQUER'))}</span><h1>${esc(T('Bạn muốn luyện gì?','Qu’est-ce que tu veux pratiquer ?'))}</h1></div>
          </div>
          <button type="button" class="ux-close" data-ux-close aria-label="${esc(T('Đóng','Fermer'))}">×</button>
        </header>
        <p class="ux-practice-help">${esc(T('Chọn một hoạt động. Không cần làm tất cả.','Choisis une activité. Pas besoin de tout faire.'))}</p>
        <div class="ux-practice-actions">
          <button type="button" data-ux-practice="review">
            <span class="ux-practice-icon">↻</span>
            <span><strong>${esc(T('Ôn những gì đã học','Réviser mes acquis'))}</strong><small>${esc(due ? T(`${due} mục nên ôn hôm nay`,`${due} élément(s) à revoir aujourd’hui`) : T('Ôn nhẹ để nhớ lâu hơn','Une révision légère pour mieux retenir'))}</small></span>
            <b>›</b>
          </button>
          <button type="button" data-ux-practice="conversation">
            <span class="ux-practice-icon">🎙️</span>
            <span><strong>${esc(T('Nói tiếng Pháp','Parler français'))}</strong><small>${esc(T('Trả lời Lucie bằng giọng nói hoặc bàn phím','Répondre à Lucie à la voix ou au clavier'))}</small></span>
            <b>›</b>
          </button>
          <button type="button" data-ux-practice="listening" ${listen ? '' : 'disabled'}>
            <span class="ux-practice-icon">🎧</span>
            <span><strong>${esc(T('Luyện nghe','Écouter'))}</strong><small>${esc(listen ? T('Nghe trước, rồi chọn điều bạn hiểu','Écouter d’abord, puis choisir ce que tu comprends') : T('Sẽ mở sau khi có đủ từ đã học','Se débloque après quelques acquis'))}</small></span>
            <b>${listen ? '›' : '🔒'}</b>
          </button>
        </div>
      </section>
    `;
    document.body.appendChild(overlay);
    document.documentElement.classList.add('ux-practice-open');
    renderBottomNav();
  }

  function closePractice() {
    overlay?.remove();
    overlay = null;
    document.documentElement.classList.remove('ux-practice-open');
    renderBottomNav();
  }

  function decorateHome() {
    if (currentScreen() !== 'home') return;
    const s = curriculumState();
    const lessonCard = document.querySelector('.screen-home .lesson-card');
    if (lessonCard && !lessonCard.querySelector('.ux-lesson-position')) {
      const chip = document.createElement('span');
      chip.className = 'ux-lesson-position';
      chip.textContent = s.next ? T(`Bài ${s.next.number} / ${s.lessons.length}`,`Leçon ${s.next.number} / ${s.lessons.length}`) : T('Lộ trình hoàn thành','Parcours terminé');
      lessonCard.querySelector('.row.between')?.appendChild(chip);
    } else if (lessonCard) {
      const chip = lessonCard.querySelector('.ux-lesson-position');
      if (chip) chip.textContent = s.next ? T(`Bài ${s.next.number} / ${s.lessons.length}`,`Leçon ${s.next.number} / ${s.lessons.length}`) : T('Lộ trình hoàn thành','Parcours terminé');
    }

    const main = document.querySelector('.screen-home .home-main');
    if (main && !main.querySelector('.ux-home-note')) {
      const note = document.createElement('p');
      note.className = 'ux-home-note';
      note.textContent = T('Một việc mỗi lần. Lucie sẽ hướng dẫn bước tiếp theo.','Une chose à la fois. Lucie te guide vers l’étape suivante.');
      const lesson = main.querySelector('.lesson-card');
      if (lesson) lesson.insertAdjacentElement('beforebegin', note);
    }
  }

  function decorateProgress() {
    if (currentScreen() !== 'progress') return;
    const column = document.querySelector('.screen-progress .progress-layout > div:first-child');
    if (!column) return;
    const s = curriculumState();
    let card = column.querySelector('.ux-journey-summary');
    if (!card) {
      card = document.createElement('section');
      card.className = 'card ux-journey-summary';
      column.prepend(card);
    }
    const pct = s.lessons.length ? Math.round((s.completedCount / s.lessons.length) * 100) : 0;
    const nextLabel = s.next ? `${s.next.icon || '▤'} ${T('Bài','Leçon')} ${s.next.number} — ${T(s.next.titleVi,s.next.titleFr)}` : T('Lộ trình hoàn thành','Parcours terminé');
    card.innerHTML = `
      <span class="ux-kicker">${esc(T('LỘ TRÌNH CỦA TRÂN','PARCOURS DE TRÂN'))}</span>
      <h2>${esc(T(`Bạn đang ở bài ${s.next?.number || s.lessons.length}`,`Tu es à la leçon ${s.next?.number || s.lessons.length}`))}</h2>
      <p>${esc(nextLabel)}</p>
      <div class="ux-journey-bar"><i style="width:${pct}%"></i></div>
      <div class="ux-journey-meta"><span><strong>${s.completedCount}</strong> ${esc(T('bài xong','leçons terminées'))}</span><span><strong>${s.knownCount}</strong> ${esc(T('mục đã học','acquis'))}</span></div>
    `;
  }

  function decorateSettings() {
    if (currentScreen() !== 'settings') return;
    const root = document.querySelector('.screen-settings .narrow');
    if (!root || isDebug() || root.querySelector('.ux-settings-note')) return;
    const note = document.createElement('section');
    note.className = 'card ux-settings-note';
    note.innerHTML = `<strong>⚙️ ${esc(T('Cài đặt đơn giản','Réglages simples'))}</strong><p>${esc(T('Giọng của Lucie và dữ liệu học được giữ nguyên. Các tùy chọn kỹ thuật được ẩn để tránh nhầm lẫn.','La voix de Lucie et les données d’apprentissage restent intactes. Les options techniques sont masquées pour éviter les erreurs.'))}</p>`;
    root.prepend(note);
  }

  function exposeSmoke() {
    const mode = new URLSearchParams(location.search).get('uxSmoke');
    if (mode !== 'lesson8') return;
    const s = curriculumState();
    const rawSnapshot = window.FrenchTranquilleSafety?.snapshot?.();
    let snapLearner = null;
    try {
      const raw = rawSnapshot?.values?.[LEARNER_KEY];
      snapLearner = raw ? JSON.parse(raw) : null;
    } catch {}
    document.documentElement.dataset.uxSmokeCompleted = String(s.completedCount);
    document.documentElement.dataset.uxSmokeNext = String(s.next?.id || '');
    document.documentElement.dataset.uxSmokeL8 = String(s.learner.lessonProgress?.l8 || 0);
    document.documentElement.dataset.uxSmokeKnown = String((s.learner.knownItems || []).length);
    document.documentElement.dataset.uxSmokeSnapshot = snapLearner ? '1' : '0';
    document.documentElement.dataset.uxSmokeSnapshotL8 = String(snapLearner?.lessonProgress?.l8 || 0);
    document.documentElement.dataset.uxSmokeNavItems = String(document.querySelectorAll('.ux-bottom-nav [data-ux-nav]').length);
    document.documentElement.dataset.uxSmokeLogo = document.querySelector('.brand-home-logo') ? '1' : '0';
  }

  function decorate() {
    renderBottomNav();
    decorateHome();
    decorateProgress();
    decorateSettings();
    exposeSmoke();
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; decorate(); });
  }

  document.addEventListener('click', event => {
    const nav = event.target.closest('[data-ux-nav]');
    if (nav) {
      const id = nav.dataset.uxNav;
      if (id === 'practice') openPractice();
      else nativeGo(id);
      return;
    }

    if (event.target.closest('[data-ux-close]')) {
      closePractice();
      return;
    }

    const practice = event.target.closest('[data-ux-practice]');
    if (practice && !practice.disabled) {
      const id = practice.dataset.uxPractice;
      if (id === 'listening') {
        closePractice();
        window.FrenchTranquilleListening?.open?.();
      } else nativeGo(id);
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && overlay) closePractice();
  });

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app, {childList:true,subtree:true});
  window.addEventListener('focus', schedule);

  decorate();

  window.FrenchTranquilleUX = {
    version: '1.15.0',
    build: 22,
    openPractice,
    closePractice,
    refresh: decorate
  };
})();
