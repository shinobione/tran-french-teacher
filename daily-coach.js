const DAILY_CURRICULUM = window.FrenchTranquilleCurriculum;

if (DAILY_CURRICULUM) {
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const LEARNER_KEY = DAILY_CURRICULUM.key;
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function learner() {
    try { return JSON.parse(localStorage.getItem(LEARNER_KEY) || '{}') || {}; }
    catch { return {}; }
  }

  function todayKey(value) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2,'0');
    const day = String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${day}`;
  }

  function nextLesson() {
    const l = learner();
    const completed = new Set(l.completedLessons || []);
    return DAILY_CURRICULUM.lessons.find((lesson,index) => (index === 0 || completed.has(DAILY_CURRICULUM.lessons[index-1].id)) && !completed.has(lesson.id)) || null;
  }

  function plan() {
    const l = learner();
    const mem = window.FrenchTranquilleMemory?.summary?.() || {entries:[],due:[],fragile:[],learning:[],solid:[]};
    const today = todayKey(new Date());
    const reviewedToday = mem.entries.filter(entry => todayKey(entry.lastReviewed) === today).length;
    const practicedToday = mem.entries.filter(entry => todayKey(entry.lastSeen) === today && entry.lastSource && entry.lastSource !== 'migration').length;
    const lesson = nextLesson();
    const known = new Set(l.knownItems || []);
    const knownCount = DAILY_CURRICULUM.items.filter(item => known.has(item.id)).length;
    const reviewGoal = Math.min(8, Math.max(3, mem.due.length || (knownCount ? 3 : 0)));
    const reviewDone = mem.due.length === 0 && reviewedToday > 0;
    const canTalk = knownCount >= 4;
    return {l,mem,lesson,knownCount,reviewedToday,practicedToday,reviewGoal,reviewDone,canTalk};
  }

  function headline(p) {
    if (!p.knownCount) return T('Bắt đầu nhẹ nhàng: một bài, rồi dừng.', 'Commence doucement : une leçon, puis on s’arrête.');
    if (p.mem.due.length) return T(`Hôm nay có ${p.mem.due.length} mục cần quay lại trước.`, `${p.mem.due.length} élément(s) méritent de revenir en premier aujourd’hui.`);
    if (p.mem.fragile.length) return T('Không có gì khẩn cấp, nhưng Lucie vẫn giữ vài điểm yếu trong tầm mắt.', 'Rien d’urgent, mais Lucie garde quelques fragilités dans le viseur.');
    return T('Bộ nhớ ổn. Hôm nay có thể ưu tiên bài mới và nói một chút.', 'La mémoire est calme : priorité à une nouvelle leçon et un peu de conversation.');
  }

  function injectHome() {
    const main = document.querySelector('.screen-home .home-main');
    if (!main) return;
    let card = main.querySelector('.daily-coach-card');
    if (!card) {
      card = document.createElement('section');
      card.className = 'card daily-coach-card';
      const memoryCard = main.querySelector('.memory-home-card');
      const lessonCard = main.querySelector('.lesson-card');
      if (memoryCard) memoryCard.insertAdjacentElement('afterend',card);
      else if (lessonCard) lessonCard.insertAdjacentElement('afterend',card);
      else main.appendChild(card);
    }
    const p = plan();
    const signature = [p.lesson?.id || 'done',p.mem.due.length,p.mem.fragile.length,p.knownCount,p.reviewedToday,p.practicedToday,isDebug()?1:0].join(':');
    if (card.dataset.dailySignature === signature) return;
    card.dataset.dailySignature = signature;
    const lessonText = p.lesson ? `${p.lesson.icon} ${T('Bài','Leçon')} ${p.lesson.number}` : T('Parcours terminé','Parcours terminé');
    card.innerHTML = `
      <div class="daily-head"><div><span class="pill">PWA-3 • TODAY</span><h2>☀️ ${esc(T('Buổi học hôm nay','Séance du jour'))}</h2></div><span class="daily-time">≈ 10–15 min</span></div>
      <p>${esc(headline(p))}</p>
      <div class="daily-steps">
        <button class="daily-step ${p.mem.due.length ? 'priority' : 'calm'}" data-daily-review ${p.knownCount ? '' : 'disabled'}>
          <span class="daily-step-icon">↻</span><span><strong>${esc(T('Ôn trí nhớ','Révision mémoire'))}</strong><small>${p.mem.due.length ? esc(T(`${p.mem.due.length} mục đến hạn`,`${p.mem.due.length} à revoir`)) : esc(T(`${p.reviewedToday} mục đã ôn hôm nay`,`${p.reviewedToday} revu(s) aujourd’hui`))}</small></span><b>${p.mem.due.length || '✓'}</b>
        </button>
        <button class="daily-step" ${p.lesson ? `data-daily-lesson="${p.lesson.id}"` : 'disabled'}>
          <span class="daily-step-icon">▤</span><span><strong>${esc(T('Tiếp tục lộ trình','Continuer le parcours'))}</strong><small>${esc(lessonText)}</small></span><b>${p.lesson ? '›' : '✓'}</b>
        </button>
        <button class="daily-step" data-daily-conversation ${p.canTalk ? '' : 'disabled'}>
          <span class="daily-step-icon">◌</span><span><strong>${esc(T('Nói 3 phút','Parler 3 minutes'))}</strong><small>${esc(p.canTalk ? T('Dùng lại những gì đã học','Réutiliser les acquis') : T('Mở sau vài mục đầu tiên','Se débloque après quelques acquis'))}</small></span><b>›</b>
        </button>
      </div>
      <div class="daily-foot"><span>${esc(T(`Đã học: ${p.knownCount}`,`Acquis : ${p.knownCount}`))}</span><span>${esc(T(`Đã chạm hôm nay: ${p.practicedToday}`,`Travaillés aujourd’hui : ${p.practicedToday}`))}</span></div>
    `;
  }

  function injectProgress() {
    const column = document.querySelector('.screen-progress .progress-layout > div:first-child');
    if (!column || column.querySelector('.daily-rhythm-card')) return;
    const card = document.createElement('section');
    card.className = 'card daily-rhythm-card';
    card.innerHTML = `
      <div class="section-head"><div><span class="pill">RHYTHME</span><h2>⏱️ ${esc(T('Nhịp học đề xuất','Rythme conseillé'))}</h2></div><span class="muted">10–15 min</span></div>
      <div class="daily-rhythm-grid"><div><strong>1</strong><span>${esc(T('bài nhỏ','petite leçon'))}</span></div><div><strong>3–8</strong><span>${esc(T('mục ôn','révisions'))}</span></div><div><strong>3 min</strong><span>${esc(T('hội thoại','conversation'))}</span></div></div>
      <p class="muted">${esc(T('Không cần làm cả ba nếu mệt. Lucie ưu tiên đều đặn và nhớ lâu hơn là học thật nhiều trong một ngày.','Pas besoin de faire les trois si tu es fatiguée. Lucie privilégie la régularité et la mémoire à long terme plutôt qu’une grosse session.'))}</p>
    `;
    const memoryCard = column.querySelector('.memory-progress-card');
    if (memoryCard) memoryCard.insertAdjacentElement('afterend',card); else column.appendChild(card);
  }

  function decorate() {
    injectHome();
    injectProgress();
  }

  document.addEventListener('click', event => {
    const review = event.target.closest('[data-daily-review]');
    if (review && !review.disabled) {
      event.preventDefault();
      document.querySelector('.bottom-nav [data-go="review"]')?.click();
      return;
    }
    const lessonButton = event.target.closest('[data-daily-lesson]');
    if (lessonButton && !lessonButton.disabled) {
      event.preventDefault();
      const id = lessonButton.dataset.dailyLesson;
      const target = document.querySelector(`[data-open-lesson="${id}"]`);
      if (target) target.click();
      return;
    }
    const conversation = event.target.closest('[data-daily-conversation]');
    if (conversation && !conversation.disabled) {
      event.preventDefault();
      document.querySelector('.bottom-nav [data-go="conversation"]')?.click();
    }
  });

  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; decorate(); });
  });
  const app = document.getElementById('app');
  if (app) observer.observe(app,{childList:true,subtree:true});
  decorate();

  window.FrenchTranquilleDailyCoach = { plan, version:'1.8.0', build:15 };
}
