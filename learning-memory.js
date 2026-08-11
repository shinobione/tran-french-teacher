const CURRICULUM = window.FrenchTranquilleCurriculum;

if (CURRICULUM) {
  const LEARNER_KEY = CURRICULUM.key;
  const MEMORY_KEY = 'french-tranquille:learning-memory:v1';
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const ITEM_BY_ID = Object.fromEntries(CURRICULUM.items.map(item => [item.id, item]));
  const originalSetItem = Storage.prototype.setItem;
  const DAY = 24 * 60 * 60 * 1000;
  const HOUR = 60 * 60 * 1000;

  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const nowIso = () => new Date().toISOString();

  function initialMemory() {
    return {
      schemaVersion: 1,
      items: {},
      totals: { reviews: 0, difficult: 0, correct: 0, easy: 0 },
      updatedAt: null
    };
  }

  function loadLearner() {
    try { return JSON.parse(localStorage.getItem(LEARNER_KEY) || 'null') || {}; }
    catch { return {}; }
  }

  function loadMemory() {
    try {
      const parsed = JSON.parse(localStorage.getItem(MEMORY_KEY) || 'null');
      if (!parsed || parsed.schemaVersion !== 1) return initialMemory();
      return { ...initialMemory(), ...parsed, items: parsed.items || {}, totals: { ...initialMemory().totals, ...(parsed.totals || {}) } };
    } catch { return initialMemory(); }
  }

  let memory = loadMemory();

  function persistMemory() {
    memory.updatedAt = nowIso();
    originalSetItem.call(localStorage, MEMORY_KEY, JSON.stringify(memory));
  }

  function baseItem(id, legacyRating) {
    const now = Date.now();
    let dueAt = now;
    let lastRating = null;
    let intervalDays = 0;
    let strength = 0;
    if (legacyRating === 0) {
      lastRating = 0;
      dueAt = now;
    } else if (legacyRating === 1) {
      lastRating = 1;
      intervalDays = 1;
      strength = 1;
      dueAt = now + DAY;
    } else if (legacyRating === 2) {
      lastRating = 2;
      intervalDays = 3;
      strength = 2;
      dueAt = now + 3 * DAY;
    }
    return {
      id,
      firstSeen: nowIso(),
      lastSeen: null,
      lastReviewed: null,
      dueAt: new Date(dueAt).toISOString(),
      intervalDays,
      attempts: 0,
      successes: 0,
      misses: 0,
      streak: 0,
      strength,
      lastRating,
      lastSource: 'migration'
    };
  }

  function syncKnownItems(learner = loadLearner()) {
    const known = Array.isArray(learner.knownItems) ? learner.knownItems : [];
    let changed = false;
    known.forEach(id => {
      if (!ITEM_BY_ID[id] || memory.items[id]) return;
      memory.items[id] = baseItem(id, learner.reviewState?.[id]);
      changed = true;
    });
    if (changed) persistMemory();
  }

  function statusOf(entry) {
    if (!entry || entry.attempts === 0) return 'new';
    if (entry.lastRating === 0 || entry.misses > entry.successes) return 'fragile';
    if (Number(entry.intervalDays || 0) >= 7 || Number(entry.strength || 0) >= 3) return 'solid';
    return 'learning';
  }

  function labelStatus(status) {
    return {
      new: T('Mới học', 'Nouveau'),
      fragile: T('Còn yếu', 'Fragile'),
      learning: T('Đang học', 'En cours'),
      solid: T('Vững', 'Solide')
    }[status] || status;
  }

  function applyRating(id, rating, source = 'review') {
    if (!ITEM_BY_ID[id]) return;
    const learner = loadLearner();
    syncKnownItems(learner);
    const entry = memory.items[id] || baseItem(id, learner.reviewState?.[id]);
    const r = Math.max(0, Math.min(2, Number(rating)));
    const now = Date.now();
    entry.attempts = Number(entry.attempts || 0) + 1;
    entry.lastSeen = nowIso();
    entry.lastReviewed = nowIso();
    entry.lastRating = r;
    entry.lastSource = source;

    if (r === 0) {
      entry.misses = Number(entry.misses || 0) + 1;
      entry.streak = 0;
      entry.strength = Math.max(0, Number(entry.strength || 0) - 1);
      entry.intervalDays = 0.25;
      entry.dueAt = new Date(now + 6 * HOUR).toISOString();
      memory.totals.difficult += 1;
    } else if (r === 1) {
      entry.successes = Number(entry.successes || 0) + 1;
      entry.streak = Number(entry.streak || 0) + 1;
      entry.strength = Math.min(4, Number(entry.strength || 0) + 0.5);
      const previous = Number(entry.intervalDays || 0);
      entry.intervalDays = previous >= 1 ? Math.min(21, Math.max(1, Math.round(previous * 1.7))) : 1;
      entry.dueAt = new Date(now + entry.intervalDays * DAY).toISOString();
      memory.totals.correct += 1;
    } else {
      entry.successes = Number(entry.successes || 0) + 1;
      entry.streak = Number(entry.streak || 0) + 1;
      entry.strength = Math.min(4, Number(entry.strength || 0) + 1);
      const previous = Number(entry.intervalDays || 0);
      entry.intervalDays = previous >= 1 ? Math.min(30, Math.max(3, Math.round(previous * 2.4))) : 3;
      entry.dueAt = new Date(now + entry.intervalDays * DAY).toISOString();
      memory.totals.easy += 1;
    }
    memory.items[id] = entry;
    memory.totals.reviews += 1;
    persistMemory();
    return entry;
  }

  function recordPractice(id, ok, source = 'practice') {
    if (!ITEM_BY_ID[id]) return;
    const learner = loadLearner();
    syncKnownItems(learner);
    const entry = memory.items[id] || baseItem(id, learner.reviewState?.[id]);
    entry.attempts = Number(entry.attempts || 0) + 1;
    entry.lastSeen = nowIso();
    entry.lastSource = source;
    if (ok) {
      entry.successes = Number(entry.successes || 0) + 1;
      entry.streak = Number(entry.streak || 0) + 1;
      entry.strength = Math.min(4, Number(entry.strength || 0) + 0.25);
      if (new Date(entry.dueAt || 0).getTime() < Date.now()) entry.dueAt = new Date(Date.now() + 12 * HOUR).toISOString();
    } else {
      entry.misses = Number(entry.misses || 0) + 1;
      entry.streak = 0;
      entry.strength = Math.max(0, Number(entry.strength || 0) - 0.25);
      entry.dueAt = new Date(Math.min(new Date(entry.dueAt || Date.now()).getTime(), Date.now() + 6 * HOUR)).toISOString();
    }
    memory.items[id] = entry;
    persistMemory();
  }

  function learnedEntries() {
    const learner = loadLearner();
    syncKnownItems(learner);
    const known = Array.isArray(learner.knownItems) ? learner.knownItems : [];
    return known.map(id => memory.items[id]).filter(Boolean);
  }

  function summary() {
    const entries = learnedEntries();
    const now = Date.now();
    const due = entries.filter(e => new Date(e.dueAt || 0).getTime() <= now);
    const fragile = entries.filter(e => statusOf(e) === 'fragile');
    const learning = entries.filter(e => ['new','learning'].includes(statusOf(e)));
    const solid = entries.filter(e => statusOf(e) === 'solid');
    const tomorrowEnd = now + 2 * DAY;
    const tomorrow = entries.filter(e => {
      const d = new Date(e.dueAt || 0).getTime();
      return d > now && d <= tomorrowEnd;
    });
    return { entries, due, fragile, learning, solid, tomorrow };
  }

  function dueQueue() {
    const { entries } = summary();
    const now = Date.now();
    return [...entries].sort((a, b) => {
      const aDue = new Date(a.dueAt || 0).getTime() <= now ? 0 : 1;
      const bDue = new Date(b.dueAt || 0).getTime() <= now ? 0 : 1;
      if (aDue !== bDue) return aDue - bDue;
      const weight = { fragile: 0, new: 1, learning: 2, solid: 3 };
      const statusDelta = weight[statusOf(a)] - weight[statusOf(b)];
      if (statusDelta) return statusDelta;
      return new Date(a.dueAt || 0).getTime() - new Date(b.dueAt || 0).getTime();
    });
  }

  function dueLabel(entry) {
    const due = new Date(entry.dueAt || 0).getTime();
    const delta = due - Date.now();
    if (delta <= 0) return T('Ôn ngay', 'À revoir');
    if (delta < DAY) return T('Trong hôm nay', "Aujourd'hui");
    const days = Math.max(1, Math.ceil(delta / DAY));
    return T(`Sau ${days} ngày`, `Dans ${days} j`);
  }

  function updateLegacyReview(id, rating) {
    const learner = loadLearner();
    learner.reviewState = { ...(learner.reviewState || {}), [id]: Number(rating) };
    learner.lastActivity = nowIso();
    originalSetItem.call(localStorage, LEARNER_KEY, JSON.stringify(learner));
  }

  let currentReviewId = null;
  let reviewRevealed = false;
  let sessionSeen = new Set();

  function chooseReviewItem() {
    const queue = dueQueue();
    if (!queue.length) return null;
    const fresh = queue.find(e => !sessionSeen.has(e.id));
    if (fresh) return fresh;
    sessionSeen = new Set();
    return queue[0];
  }

  function renderSmartReview() {
    const card = document.querySelector('.screen-review .flashcard');
    if (!card) return;
    const entry = currentReviewId ? memory.items[currentReviewId] : chooseReviewItem();
    if (!entry || !ITEM_BY_ID[entry.id]) return;
    currentReviewId = entry.id;
    const item = ITEM_BY_ID[entry.id];
    const s = summary();
    card.dataset.memoryReview = '1';
    card.innerHTML = `
      <div class="memory-review-head">
        <span class="pill">🧠 ${esc(T('Trí nhớ của Lucie','Mémoire de Lucie'))}</span>
        <span class="memory-status memory-${statusOf(entry)}">${esc(labelStatus(statusOf(entry)))}</span>
      </div>
      <p class="prompt">${esc(T('Tiếng Pháp của câu này là gì?','Comment dit-on ceci en français ?'))}</p>
      <h2>${esc(item.vi)}</h2>
      <p class="memory-due">${esc(dueLabel(entry))} • ${s.due.length} ${esc(T('mục đến hạn','à revoir'))}</p>
      ${!reviewRevealed ? `
        <button class="primary full" data-memory-reveal>${esc(T('Hiện đáp án','Afficher la réponse'))}</button>
      ` : `
        <div class="answer"><span>${esc(item.fr)}</span><button class="listen" data-memory-speak="${esc(item.fr)}">🔊 ${esc(T('Nghe','Écouter'))}</button></div>
        <p class="muted center">${esc(T('Bạn nhớ mục này thế nào?','Comment te souviens-tu de cet élément ?'))}</p>
        <div class="ratings memory-ratings">
          <button data-memory-rate="0">${esc(T('Khó','Difficile'))}</button>
          <button data-memory-rate="1">${esc(T('Được','Correct'))}</button>
          <button data-memory-rate="2">${esc(T('Dễ','Facile'))}</button>
        </div>
      `}
    `;
  }

  function memoryMetricsHtml(compact = false) {
    const s = summary();
    const metrics = [
      ['↻', s.due.length, T('Ôn hôm nay','À revoir')],
      ['⚠', s.fragile.length, T('Còn yếu','Fragiles')],
      ['◌', s.learning.length, T('Đang học','En cours')],
      ['✓', s.solid.length, T('Vững','Solides')]
    ];
    return `<div class="memory-metrics ${compact ? 'compact' : ''}">${metrics.map(([icon,value,label]) => `<div><span>${icon} <strong>${value}</strong></span><small>${esc(label)}</small></div>`).join('')}</div>`;
  }

  function injectHome() {
    const main = document.querySelector('.screen-home .home-main');
    if (!main || main.querySelector('.memory-home-card')) return;
    const s = summary();
    const card = document.createElement('section');
    card.className = 'card memory-home-card';
    card.dataset.learningMemory = '1';
    card.innerHTML = `
      <div class="row between memory-title-row"><div><span class="pill">PWA-3</span><h2>🧠 ${esc(T('Trí nhớ của Lucie','Mémoire de Lucie'))}</h2></div><span class="memory-home-due">${s.due.length}</span></div>
      <p>${esc(s.due.length ? T(`Có ${s.due.length} mục nên ôn lại hôm nay. Lucie sẽ ưu tiên những mục còn yếu.`,`${s.due.length} élément(s) à revoir aujourd'hui. Lucie donnera la priorité aux plus fragiles.`) : T('Không có mục nào bắt buộc ôn ngay. Lucie vẫn theo dõi những gì bạn đang học.','Rien d’urgent à réviser. Lucie continue de suivre ce qui est en cours d’acquisition.'))}</p>
      ${memoryMetricsHtml(true)}
      <button class="secondary full" data-memory-open-review>${esc(T('Ôn theo trí nhớ','Réviser intelligemment'))}</button>
    `;
    const lessonCard = main.querySelector('.lesson-card');
    if (lessonCard) lessonCard.insertAdjacentElement('afterend', card); else main.appendChild(card);
  }

  function injectProgress() {
    const column = document.querySelector('.screen-progress .progress-layout > div:first-child');
    if (!column || column.querySelector('.memory-progress-card')) return;
    const s = summary();
    const card = document.createElement('section');
    card.className = 'card memory-progress-card';
    card.dataset.learningMemory = '1';
    const fragileItems = s.fragile.slice(0, 5).map(e => ITEM_BY_ID[e.id]).filter(Boolean);
    card.innerHTML = `
      <div class="section-head"><div><span class="pill">PWA-3</span><h2>🧠 ${esc(T('Trí nhớ học tập','Mémoire d’apprentissage'))}</h2></div><span class="muted">${s.entries.length}</span></div>
      ${memoryMetricsHtml()}
      ${fragileItems.length ? `<div class="memory-fragile-list"><strong>${esc(T('Ưu tiên tiếp theo','Priorités suivantes'))}</strong>${fragileItems.map(item => `<span>${esc(item.fr)} <small>${esc(item.vi)}</small></span>`).join('')}</div>` : `<p class="muted">${esc(T('Chưa có điểm yếu rõ ràng.','Aucune fragilité claire pour le moment.'))}</p>`}
    `;
    const stats = column.querySelector('.stats');
    if (stats) stats.insertAdjacentElement('afterend', card); else column.appendChild(card);
    decorateLearnedList();
  }

  function decorateLearnedList() {
    const rows = document.querySelectorAll('.screen-progress .learned-list > div');
    if (!rows.length) return;
    rows.forEach(row => {
      if (row.querySelector('.memory-mini-status')) return;
      const fr = row.querySelector('strong')?.textContent?.trim();
      const item = CURRICULUM.items.find(i => i.fr === fr);
      const entry = item ? memory.items[item.id] : null;
      if (!entry) return;
      const badge = document.createElement('em');
      badge.className = `memory-mini-status memory-${statusOf(entry)}`;
      badge.textContent = labelStatus(statusOf(entry));
      row.appendChild(badge);
    });
  }

  function injectSettings() {
    const root = document.querySelector('.screen-settings .narrow');
    if (!root || root.querySelector('.memory-backup-card')) return;
    const card = document.createElement('section');
    card.className = 'card memory-backup-card';
    card.dataset.learningMemory = '1';
    card.innerHTML = `
      <span class="pill">LOCAL</span>
      <h2>💾 ${esc(T('Sao lưu tiến độ','Sauvegarde locale'))}</h2>
      <p>${esc(T('Xuất một tệp JSON để giữ bản sao tiến độ và trí nhớ học tập. Có thể nhập lại trên thiết bị khác.','Exporte un fichier JSON contenant la progression et la mémoire d’apprentissage. Il pourra être réimporté sur un autre appareil.'))}</p>
      <div class="memory-backup-actions"><button class="secondary" data-memory-export>⇩ ${esc(T('Xuất dữ liệu','Exporter'))}</button><button class="secondary" data-memory-import>⇧ ${esc(T('Nhập dữ liệu','Importer'))}</button></div>
      <input type="file" accept="application/json,.json" data-memory-file hidden>
    `;
    const danger = root.querySelector('.danger-zone');
    if (danger) root.insertBefore(card, danger); else root.appendChild(card);
  }

  function decorate() {
    syncKnownItems();
    injectHome();
    injectProgress();
    injectSettings();
    if (document.querySelector('.screen-review .flashcard')) renderSmartReview();
  }

  function exportBackup() {
    const payload = {
      format: 'french-tranquille-backup',
      version: 1,
      exportedAt: nowIso(),
      app: { version: window.FrenchTranquilleBuildMeta?.version || CURRICULUM.version, build: window.FrenchTranquilleBuildMeta?.build || CURRICULUM.build },
      learner: loadLearner(),
      memory
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `french-tranquille-backup-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function importBackup(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = JSON.parse(String(reader.result || ''));
        if (payload?.format !== 'french-tranquille-backup' || !payload.learner || !payload.memory) throw new Error('invalid-backup');
        originalSetItem.call(localStorage, LEARNER_KEY, JSON.stringify(payload.learner));
        originalSetItem.call(localStorage, MEMORY_KEY, JSON.stringify(payload.memory));
        location.reload();
      } catch {
        alert(T('Tệp sao lưu không hợp lệ.','Fichier de sauvegarde invalide.'));
      }
    };
    reader.readAsText(file);
  }

  Storage.prototype.setItem = function(key, value) {
    let before = null;
    if (this === localStorage && key === LEARNER_KEY) before = loadLearner();
    const result = originalSetItem.call(this, key, value);
    if (this === localStorage && key === LEARNER_KEY) {
      try {
        const after = JSON.parse(String(value));
        syncKnownItems(after);
        const beforeReview = before?.reviewState || {};
        const afterReview = after?.reviewState || {};
        Object.keys(afterReview).forEach(id => {
          if (beforeReview[id] !== afterReview[id]) applyRating(id, afterReview[id], 'legacy-review');
        });
      } catch {}
      queueMicrotask(decorate);
    }
    return result;
  };

  document.addEventListener('click', event => {
    const reveal = event.target.closest('[data-memory-reveal]');
    if (reveal) {
      event.preventDefault();
      event.stopImmediatePropagation();
      reviewRevealed = true;
      renderSmartReview();
      return;
    }

    const rate = event.target.closest('[data-memory-rate]');
    if (rate) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (currentReviewId) {
        const rating = Number(rate.dataset.memoryRate);
        applyRating(currentReviewId, rating, 'smart-review');
        updateLegacyReview(currentReviewId, rating);
        sessionSeen.add(currentReviewId);
      }
      currentReviewId = chooseReviewItem()?.id || null;
      reviewRevealed = false;
      renderSmartReview();
      injectProgress();
      return;
    }

    const speak = event.target.closest('[data-memory-speak]');
    if (speak) {
      event.preventDefault();
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(speak.dataset.memorySpeak || '');
        utterance.lang = 'fr-FR';
        utterance.rate = 0.84;
        utterance.pitch = 1.04;
        speechSynthesis.speak(utterance);
      }
      return;
    }

    const openReview = event.target.closest('[data-memory-open-review]');
    if (openReview) {
      event.preventDefault();
      document.querySelector('.bottom-nav [data-go="review"]')?.click();
      return;
    }

    if (event.target.closest('[data-memory-export]')) {
      event.preventDefault();
      exportBackup();
      return;
    }

    if (event.target.closest('[data-memory-import]')) {
      event.preventDefault();
      document.querySelector('[data-memory-file]')?.click();
    }
  }, true);

  document.addEventListener('change', event => {
    const input = event.target.closest('[data-memory-file]');
    if (input) importBackup(input.files?.[0]);
  });

  const observer = new MutationObserver(() => queueMicrotask(decorate));
  const appRoot = document.getElementById('app');
  if (appRoot) observer.observe(appRoot, { childList: true, subtree: true });

  syncKnownItems();
  decorate();

  window.FrenchTranquilleMemory = {
    key: MEMORY_KEY,
    schemaVersion: 1,
    summary,
    statusOf,
    applyRating,
    recordPractice,
    sync: syncKnownItems,
    exportBackup
  };
}
