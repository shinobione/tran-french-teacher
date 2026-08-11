(() => {
  'use strict';

  if (window.FrenchTranquilleBuild263UX) return;

  const VERSION = '1.19.3';
  const BUILD = '26.3';
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const params = new URLSearchParams(location.search);
  const smoke = params.get('b263Smoke');

  let scheduled = false;
  let dailyCard = null;
  let dailyMoreOpen = false;
  const progressInitialized = new WeakSet();

  function listeningAvailable() {
    try { return Boolean(window.FrenchTranquilleListening?.availability?.().meaning); }
    catch { return false; }
  }

  function dailyPlan() {
    try { return window.FrenchTranquilleDailyCoach?.plan?.() || null; }
    catch { return null; }
  }

  function dailyLegacySignature(p) {
    return [
      p.lesson?.id || 'done',
      p.mem?.due?.length || 0,
      p.mem?.fragile?.length || 0,
      p.knownCount || 0,
      p.reviewedToday || 0,
      p.practicedToday || 0,
      isDebug() ? 1 : 0
    ].join(':');
  }

  function dailyHeadline(p) {
    if (!p.knownCount) return T('Bắt đầu nhẹ nhàng: một bài, rồi dừng.', 'Commence doucement : une leçon, puis on s’arrête.');
    if (p.mem?.due?.length) return T(`Hôm nay có ${p.mem.due.length} mục cần quay lại trước.`, `${p.mem.due.length} élément(s) méritent de revenir en premier aujourd’hui.`);
    if (p.mem?.fragile?.length) return T('Không có gì khẩn cấp, nhưng Lucie vẫn giữ vài điểm yếu trong tầm mắt.', 'Rien d’urgent, mais Lucie garde quelques fragilités dans le viseur.');
    return T('Bộ nhớ ổn. Hôm nay có thể ưu tiên bài mới và nói một chút.', 'La mémoire est calme : priorité à une nouvelle leçon et un peu de conversation.');
  }

  function dailyActions(p) {
    const listen = listeningAvailable();
    const lessonText = p.lesson
      ? `${p.lesson.icon || '▤'} ${T('Bài', 'Leçon')} ${p.lesson.number}`
      : T('Lộ trình hoàn thành', 'Parcours terminé');
    return [
      {
        id: 'review', icon: '↻', enabled: Boolean(p.knownCount),
        title: T('Ôn trí nhớ', 'Révision mémoire'),
        subtitle: p.mem?.due?.length
          ? T(`${p.mem.due.length} mục đến hạn`, `${p.mem.due.length} à revoir`)
          : T(`${p.reviewedToday || 0} mục đã ôn hôm nay`, `${p.reviewedToday || 0} revu(s) aujourd’hui`),
        badge: String(p.mem?.due?.length || '✓'), tone: p.mem?.due?.length ? 'priority' : 'calm'
      },
      {
        id: 'lesson', icon: '▤', enabled: Boolean(p.lesson), lessonId: p.lesson?.id || '',
        title: T('Tiếp tục lộ trình', 'Continuer le parcours'), subtitle: lessonText,
        badge: p.lesson ? '›' : '✓', tone: ''
      },
      {
        id: 'conversation', icon: '◌', enabled: Boolean(p.canTalk),
        title: T('Nói 3 phút', 'Parler 3 minutes'),
        subtitle: p.canTalk ? T('Dùng lại những gì đã học', 'Réutiliser les acquis') : T('Mở sau vài mục đầu tiên', 'Se débloque après quelques acquis'),
        badge: '›', tone: ''
      },
      {
        id: 'listening', icon: '🎧', enabled: listen,
        title: T('Nghe 3 phút', 'Écouter 3 minutes'),
        subtitle: listen ? T('Không nhìn transcript trước', 'Sans transcript avant réponse') : T('Mở sau vài mục đầu tiên', 'Se débloque après quelques acquis'),
        badge: listen ? '›' : '🔒', tone: ''
      }
    ];
  }

  function chooseDailyPrimary(p, actions) {
    const by = id => actions.find(action => action.id === id && action.enabled);
    const primary = [];
    const add = action => { if (action && !primary.includes(action) && primary.length < 2) primary.push(action); };
    if (p.mem?.due?.length) add(by('review'));
    add(by('lesson'));
    add(by('conversation'));
    add(by('listening'));
    add(by('review'));
    return primary;
  }

  function actionButton(action, extra = false) {
    const cls = ['daily-step', extra ? 'b263-daily-extra-action' : 'b263-daily-primary-action', action.tone || ''].filter(Boolean).join(' ');
    return `<button type="button" class="${cls}" data-b263-daily-action="${action.id}" ${action.lessonId ? `data-b263-lesson="${esc(action.lessonId)}"` : ''} ${action.enabled ? '' : 'disabled'}>
      <span class="daily-step-icon">${action.icon}</span>
      <span><strong>${esc(action.title)}</strong><small>${esc(action.subtitle)}</small></span>
      <b>${action.badge}</b>
    </button>`;
  }

  function applyDailyMoreState(card) {
    const toggle = card?.querySelector('[data-b263-daily-toggle]');
    const extras = card?.querySelector('.b263-daily-extras');
    if (!toggle || !extras) return;
    toggle.setAttribute('aria-expanded', dailyMoreOpen ? 'true' : 'false');
    extras.hidden = !dailyMoreOpen;
    const label = toggle.querySelector('strong');
    const arrow = toggle.querySelector('span');
    if (label) label.textContent = dailyMoreOpen ? T('Ẩn hoạt động khác', 'Masquer les autres activités') : T('Xem hoạt động khác', 'Voir les autres activités');
    if (arrow) arrow.textContent = dailyMoreOpen ? '⌃' : '⌄';
    card.dataset.b263DailyMoreOpen = dailyMoreOpen ? '1' : '0';
  }

  function decorateDaily() {
    const card = document.querySelector('.screen-home .daily-coach-card');
    const p = dailyPlan();
    if (!card || !p) {
      dailyCard = null;
      dailyMoreOpen = false;
      return;
    }

    if (card !== dailyCard) {
      dailyCard = card;
      dailyMoreOpen = false;
    }

    const actions = dailyActions(p);
    const primary = chooseDailyPrimary(p, actions);
    const extras = actions.filter(action => action.enabled && !primary.includes(action));
    const legacySignature = dailyLegacySignature(p);
    const signature = `${legacySignature}|listen:${listeningAvailable() ? 1 : 0}|primary:${primary.map(a => a.id).join(',')}|extras:${extras.map(a => a.id).join(',')}`;

    // Keep the original Daily Coach engine satisfied: if its underlying plan did not
    // change, it must not rebuild this card. Build 26.3 owns only the stable surface.
    card.dataset.dailySignature = legacySignature;

    if (card.dataset.b263Signature !== signature || !card.querySelector('.b263-daily-root')) {
      card.dataset.b263Signature = signature;
      card.innerHTML = `<div class="b263-daily-root">
        <div class="daily-head"><div><span class="pill">PWA-3 • TODAY</span><h2>☀️ ${esc(T('Buổi học hôm nay', 'Séance du jour'))}</h2></div><span class="daily-time">≈ 10–15 min</span></div>
        <p>${esc(dailyHeadline(p))}</p>
        <div class="daily-steps" data-b263-daily-primary>
          ${primary.map(action => actionButton(action)).join('')}
          ${listeningAvailable() ? '<button type="button" class="listening-daily-step b263-listening-proxy" data-listening-open hidden tabindex="-1" aria-hidden="true"></button>' : ''}
        </div>
        ${extras.length ? `<button type="button" class="b263-daily-more-toggle" data-b263-daily-toggle aria-expanded="false"><strong>${esc(T('Xem hoạt động khác', 'Voir les autres activités'))}</strong><span>⌄</span></button><div class="b263-daily-extras" hidden>${extras.map(action => actionButton(action, true)).join('')}</div>` : ''}
        <div class="daily-foot"><span>${esc(T(`Đã học: ${p.knownCount || 0}`, `Acquis : ${p.knownCount || 0}`))}</span><span>${esc(T(`Đã chạm hôm nay: ${p.practicedToday || 0}`, `Travaillés aujourd’hui : ${p.practicedToday || 0}`))}</span></div>
      </div>`;
      card.dataset.dailySignature = legacySignature;
      card.dataset.sessionDailyVisible = String(primary.length);
      card.dataset.sessionDailyExtra = String(extras.length);
    }

    applyDailyMoreState(card);
    document.documentElement.dataset.b263DailyReady = '1';
    document.documentElement.dataset.b263DailyPrimary = primary.map(action => action.id).join(',');
    document.documentElement.dataset.b263DailyExtra = extras.map(action => action.id).join(',');
  }

  function legacyGo(id) {
    const target = document.querySelector(`.bottom-nav [data-go="${CSS.escape(id)}"]`);
    if (!target) return false;
    target.click();
    return true;
  }

  function routeDailyAction(button) {
    const action = button.dataset.b263DailyAction;
    document.documentElement.dataset.b263LastAction = action || '';
    if (action === 'review') {
      legacyGo('review');
      return;
    }
    if (action === 'lesson') {
      const id = button.dataset.b263Lesson;
      if (id) document.querySelector(`[data-open-lesson="${CSS.escape(id)}"]`)?.click();
      return;
    }
    if (action === 'conversation') {
      legacyGo('conversation');
      return;
    }
    if (action === 'listening') {
      window.FrenchTranquilleListening?.open?.();
    }
  }

  function decorateProgress() {
    const layout = document.querySelector('.screen-progress .progress-layout.progress-ux-ready');
    const details = layout?.querySelector('.progress-ux-details');
    if (!layout || !details) return;

    if (!progressInitialized.has(details)) {
      progressInitialized.add(details);
      const desktop = window.matchMedia?.('(min-width: 861px)')?.matches ?? innerWidth >= 861;
      details.open = Boolean(desktop);
      details.dataset.b263ResponsiveDefault = desktop ? 'desktop-open' : 'mobile-closed';
    }

    layout.dataset.b263ProgressLayout = '1';
    document.documentElement.dataset.b263ProgressReady = '1';
    document.documentElement.dataset.b263ProgressDetailsOpen = details.open ? '1' : '0';
  }

  function decorate() {
    decorateDaily();
    decorateProgress();
    runSmokeHook();
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
    const toggle = event.target.closest('[data-b263-daily-toggle]');
    if (toggle) {
      event.preventDefault();
      dailyMoreOpen = !dailyMoreOpen;
      applyDailyMoreState(toggle.closest('.daily-coach-card'));
      return;
    }

    const action = event.target.closest('[data-b263-daily-action]');
    if (action && !action.disabled) {
      event.preventDefault();
      routeDailyAction(action);
    }
  }, { capture: true });

  document.addEventListener('toggle', event => {
    if (event.target.matches?.('.progress-ux-details')) {
      document.documentElement.dataset.b263ProgressDetailsOpen = event.target.open ? '1' : '0';
    }
  }, true);

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app, { childList: true, subtree: true });
  window.addEventListener('focus', schedule);

  let smokeStarted = false;
  function runSmokeHook() {
    if (!smoke || smokeStarted) return;
    smokeStarted = true;

    if (smoke === 'daily') {
      setTimeout(() => {
        decorateDaily();
        const card = document.querySelector('.daily-coach-card');
        const toggle = card?.querySelector('[data-b263-daily-toggle]');
        const toggleRef = toggle;
        document.documentElement.dataset.b263SmokeDailyReady = card?.dataset.b263DailyReady || document.documentElement.dataset.b263DailyReady || '0';
        toggle?.click();
        setTimeout(() => {
          const extras = card?.querySelector('.b263-daily-extras');
          document.documentElement.dataset.b263SmokeMore = extras && !extras.hidden ? '1' : '0';
          document.documentElement.dataset.b263SmokeToggleStable = toggleRef && toggleRef === card?.querySelector('[data-b263-daily-toggle]') ? '1' : '0';
          const listen = card?.querySelector('[data-b263-daily-action="listening"]');
          listen?.click();
          setTimeout(() => {
            document.documentElement.dataset.b263SmokeListening = document.querySelector('.listening-overlay') ? '1' : '0';
            window.FrenchTranquilleListening?.close?.();
            const review = card?.querySelector('[data-b263-daily-action="review"]');
            review?.click();
            setTimeout(() => {
              document.documentElement.dataset.b263SmokeReview = document.querySelector('.screen-review') ? '1' : '0';
              legacyGo('home');
              setTimeout(() => {
                decorateDaily();
                const nextCard = document.querySelector('.daily-coach-card');
                const lesson = nextCard?.querySelector('[data-b263-daily-action="lesson"]');
                lesson?.click();
                setTimeout(() => {
                  document.documentElement.dataset.b263SmokeLesson = document.querySelector('.screen-lesson') ? '1' : '0';
                }, 180);
              }, 180);
            }, 180);
          }, 180);
        }, 100);
      }, 420);
    }

    if (smoke === 'progress' || smoke === 'progress-mobile') {
      setTimeout(() => {
        (document.querySelector('[data-ux-nav="progress"]') || document.querySelector('.bottom-nav [data-go="progress"]'))?.click();
        setTimeout(() => {
          decorateProgress();
          const layout = document.querySelector('.screen-progress .progress-layout.progress-ux-ready');
          const first = layout?.querySelector(':scope > div:first-child');
          const details = layout?.querySelector('.progress-ux-details');
          const curriculum = layout?.querySelector('.progress-ux-curriculum');
          const overview = layout?.querySelector('.progress-ux-overview');
          document.documentElement.dataset.b263SmokeProgress = layout && details && curriculum && overview ? '1' : '0';
          document.documentElement.dataset.b263SmokeContents = first && getComputedStyle(first).display === 'contents' ? '1' : '0';
          document.documentElement.dataset.b263SmokeDesktop = innerWidth >= 861 ? '1' : '0';
          document.documentElement.dataset.b263SmokeDetailsOpen = details?.open ? '1' : '0';
          document.documentElement.dataset.b263SmokeSticky = details && innerWidth >= 861 && getComputedStyle(details).position === 'sticky' ? '1' : '0';
        }, 520);
      }, 180);
    }
  }

  schedule();

  window.FrenchTranquilleBuild263UX = {
    version: VERSION,
    build: BUILD,
    refresh: schedule,
    daily: () => ({ moreOpen: dailyMoreOpen }),
    routeDailyAction
  };
})();
