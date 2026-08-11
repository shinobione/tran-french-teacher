const ERROR_CURRICULUM = window.FrenchTranquilleCurriculum;

if (ERROR_CURRICULUM) {
  const KEY = 'french-tranquille:error-intelligence:v1';
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const MAX_ITEM_EVENTS = 20;
  const MAX_RECENT_EVENTS = 120;
  const RECENT_WINDOW = 24 * 60 * 60 * 1000;
  const REPEAT_WINDOW = 30 * 60 * 1000;
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const nowIso = () => new Date().toISOString();
  const itemById = () => Object.fromEntries((ERROR_CURRICULUM.items || []).map(item => [item.id, item]));

  const TYPE_META = {
    'retrieval-difficult': { icon:'↻', vi:'Khó nhớ lại', fr:'Rappel difficile' },
    'text-mismatch': { icon:'⌨️', vi:'Câu viết chưa khớp', fr:'Réponse texte différente' },
    'scenario-miss': { icon:'🎭', vi:'Vấp trong tình huống', fr:'Erreur en situation' },
    'assisted': { icon:'🛟', vi:'Cần câu mẫu', fr:'Modèle nécessaire' },
    'voice-unrecognized': { icon:'🎙️', vi:'Câu nói chưa được nhận ra', fr:'Phrase vocale non reconnue' },
    'partial': { icon:'◐', vi:'Câu trả lời một phần', fr:'Réponse partielle' },
    'practice-miss': { icon:'○', vi:'Cần luyện lại', fr:'À retravailler' },
    'repeated-miss': { icon:'⚠', vi:'Lặp lại nhiều lần', fr:'Difficulté répétée' }
  };

  function emptyCounts() {
    return Object.fromEntries(Object.keys(TYPE_META).map(type => [type, 0]));
  }

  function initialState() {
    return {
      schemaVersion: 1,
      items: {},
      recent: [],
      totals: { errors:0, recoveries:0, assisted:0, voice:0, repeated:0 },
      updatedAt: null
    };
  }

  function normalizeState(parsed) {
    const base = initialState();
    if (!parsed || parsed.schemaVersion !== 1) return base;
    return {
      ...base,
      ...parsed,
      items: parsed.items || {},
      recent: Array.isArray(parsed.recent) ? parsed.recent.slice(-MAX_RECENT_EVENTS) : [],
      totals: { ...base.totals, ...(parsed.totals || {}) }
    };
  }

  function loadState() {
    try { return normalizeState(JSON.parse(localStorage.getItem(KEY) || 'null')); }
    catch { return initialState(); }
  }

  let state = loadState();
  let memorySnapshot = new Map();
  let memoryPrimed = false;
  const session = { errors:0, recoveries:0, types:{} };

  function persist() {
    state.updatedAt = nowIso();
    state.recent = state.recent.slice(-MAX_RECENT_EVENTS);
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function ensureItem(id) {
    if (!state.items[id]) {
      state.items[id] = {
        id,
        counts: emptyCounts(),
        totalErrors:0,
        recoveries:0,
        errorStreak:0,
        lastErrorAt:null,
        lastRecoveryAt:null,
        lastType:null,
        lastSource:null,
        events:[]
      };
    } else {
      state.items[id].counts = { ...emptyCounts(), ...(state.items[id].counts || {}) };
      state.items[id].events = Array.isArray(state.items[id].events) ? state.items[id].events.slice(-MAX_ITEM_EVENTS) : [];
    }
    return state.items[id];
  }

  function typeMeta(type) {
    return TYPE_META[type] || TYPE_META['practice-miss'];
  }

  function labelType(type) {
    const meta = typeMeta(type);
    return `${meta.icon} ${T(meta.vi, meta.fr)}`;
  }

  function tokenize(value = '') {
    return String(value)
      .toLocaleLowerCase('fr-FR')
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/[’']/g,' ')
      .replace(/[^a-z0-9\s-]/g,' ')
      .replace(/\s+/g,' ')
      .trim()
      .split(' ')
      .filter(Boolean);
  }

  function demonstrablyPartial(input, target) {
    const a = new Set(tokenize(input));
    const b = tokenize(target);
    if (!a.size || b.length < 2) return false;
    const overlap = b.filter(token => a.has(token)).length;
    return overlap >= 1 && overlap < b.length && overlap / b.length >= 0.4;
  }

  function recordError(id, type, source = 'unknown', detail = {}) {
    if (!id || !itemById()[id]) return null;
    const entry = ensureItem(id);
    const at = nowIso();
    const previousAt = entry.lastErrorAt ? new Date(entry.lastErrorAt).getTime() : 0;
    const repeated = previousAt > 0 && Date.now() - previousAt <= REPEAT_WINDOW;
    const amount = Math.max(1, Number(detail.amount || 1));

    entry.counts[type] = Number(entry.counts[type] || 0) + amount;
    entry.totalErrors = Number(entry.totalErrors || 0) + amount;
    entry.errorStreak = Number(entry.errorStreak || 0) + amount;
    entry.lastErrorAt = at;
    entry.lastType = type;
    entry.lastSource = source;

    if (repeated || entry.errorStreak >= 2) {
      entry.counts['repeated-miss'] = Number(entry.counts['repeated-miss'] || 0) + 1;
      state.totals.repeated = Number(state.totals.repeated || 0) + 1;
    }

    const event = {
      id,
      type,
      source,
      at,
      repeated: Boolean(repeated || entry.errorStreak >= 2),
      note: detail.note || null
    };
    entry.events.push(event);
    entry.events = entry.events.slice(-MAX_ITEM_EVENTS);
    state.recent.push(event);
    state.recent = state.recent.slice(-MAX_RECENT_EVENTS);
    state.totals.errors = Number(state.totals.errors || 0) + amount;
    if (type === 'assisted') state.totals.assisted = Number(state.totals.assisted || 0) + amount;
    if (type === 'voice-unrecognized') state.totals.voice = Number(state.totals.voice || 0) + amount;
    session.errors += amount;
    session.types[type] = Number(session.types[type] || 0) + amount;
    persist();
    scheduleDecorate();
    return entry;
  }

  function recordRecovery(id, source = 'unknown') {
    if (!id || !itemById()[id]) return null;
    const entry = ensureItem(id);
    if (!entry.totalErrors) return entry;
    entry.recoveries = Number(entry.recoveries || 0) + 1;
    entry.errorStreak = 0;
    entry.lastRecoveryAt = nowIso();
    entry.lastSource = source;
    state.totals.recoveries = Number(state.totals.recoveries || 0) + 1;
    session.recoveries += 1;
    persist();
    scheduleDecorate();
    return entry;
  }

  function recordAttempt({ itemId, ok, source = 'practice', input = '', target = '' } = {}) {
    if (!itemId) return;
    if (ok) {
      recordRecovery(itemId, source);
      return;
    }
    let type = 'practice-miss';
    if (source.includes('voice')) type = 'voice-unrecognized';
    else if (source.includes('text')) type = demonstrablyPartial(input, target) ? 'partial' : 'text-mismatch';
    else if (source.includes('scenario-assisted')) type = 'assisted';
    else if (source.includes('scenario')) type = 'scenario-miss';
    recordError(itemId, type, source);
  }

  function memoryEntries() {
    try { return window.FrenchTranquilleMemory?.summary?.().entries || []; }
    catch { return []; }
  }

  function memorySnapshotFor(entry) {
    return {
      attempts:Number(entry.attempts || 0),
      misses:Number(entry.misses || 0),
      successes:Number(entry.successes || 0),
      lastRating:entry.lastRating,
      lastSource:entry.lastSource || '',
      lastSeen:entry.lastSeen || null,
      lastReviewed:entry.lastReviewed || null
    };
  }

  function primeMemorySnapshot() {
    memorySnapshot = new Map(memoryEntries().map(entry => [entry.id, memorySnapshotFor(entry)]));
    memoryPrimed = true;
  }

  function classifyMemoryChange(entry, before, after) {
    const source = after.lastSource || 'learning-memory';
    const missDelta = Math.max(0, after.misses - before.misses);
    const successDelta = Math.max(0, after.successes - before.successes);

    // Free Voice sends richer evidence directly through recordAttempt().
    // Skipping it here prevents double-counting the same user attempt.
    if (source.startsWith('free-voice-')) return;

    if (missDelta > 0) {
      let type = 'practice-miss';
      if ((source === 'smart-review' || source === 'legacy-review') && Number(after.lastRating) === 0) type = 'retrieval-difficult';
      else if (source === 'scenario-assisted') type = 'assisted';
      else if (source === 'scenario-miss') type = 'scenario-miss';
      recordError(entry.id, type, source, { amount:missDelta });
      return;
    }

    if (successDelta > 0) recordRecovery(entry.id, source);
  }

  function syncFromMemory() {
    const entries = memoryEntries();
    if (!memoryPrimed) {
      primeMemorySnapshot();
      return;
    }
    const next = new Map();
    entries.forEach(entry => {
      const after = memorySnapshotFor(entry);
      const before = memorySnapshot.get(entry.id);
      if (before && after.attempts > before.attempts) classifyMemoryChange(entry, before, after);
      next.set(entry.id, after);
    });
    memorySnapshot = next;
  }

  function dominantType(entry) {
    if (!entry || entry.totalErrors < 2) return null;
    const candidates = Object.entries(entry.counts || {}).filter(([type]) => type !== 'repeated-miss');
    candidates.sort((a,b) => b[1] - a[1]);
    const [type,count] = candidates[0] || [];
    if (!type || count < 2) return null;
    return type;
  }

  function recencyScore(iso) {
    if (!iso) return 0;
    const age = Math.max(0, Date.now() - new Date(iso).getTime());
    if (age <= 60 * 60 * 1000) return 4;
    if (age <= 6 * 60 * 60 * 1000) return 3;
    if (age <= 24 * 60 * 60 * 1000) return 2;
    if (age <= 3 * 24 * 60 * 60 * 1000) return 1;
    return 0;
  }

  function priorityScore(entry) {
    if (!entry) return 0;
    const dominant = dominantType(entry);
    const typeWeight = dominant === 'assisted' ? 3 : dominant === 'voice-unrecognized' ? 2 : 1;
    return recencyScore(entry.lastErrorAt) * 3 + Math.min(5, Number(entry.errorStreak || 0)) * 2 + Math.min(6, Number(entry.totalErrors || 0)) + typeWeight - Math.min(4, Number(entry.recoveries || 0));
  }

  function priorityItems(limit = 5) {
    const items = itemById();
    return Object.values(state.items)
      .filter(entry => items[entry.id] && entry.totalErrors > 0)
      .map(entry => ({ entry, item:items[entry.id], score:priorityScore(entry), dominant:dominantType(entry) }))
      .sort((a,b) => b.score - a.score || new Date(b.entry.lastErrorAt || 0) - new Date(a.entry.lastErrorAt || 0))
      .slice(0, limit);
  }

  function recentEvents() {
    const cutoff = Date.now() - RECENT_WINDOW;
    return state.recent.filter(event => new Date(event.at).getTime() >= cutoff);
  }

  function summary() {
    const recent = recentEvents();
    const recurring = Object.values(state.items).filter(entry => Number(entry.errorStreak || 0) >= 2 || Number(entry.counts?.['repeated-miss'] || 0) > 0);
    const assisted = recent.filter(event => event.type === 'assisted');
    const voice = recent.filter(event => event.type === 'voice-unrecognized');
    const top = priorityItems(5);
    return {
      recent,
      recurring,
      assisted,
      voice,
      top,
      totalItems:Object.values(state.items).filter(entry => entry.totalErrors > 0).length,
      totals:state.totals,
      session:{ ...session, types:{...session.types} }
    };
  }

  function dueText(iso) {
    if (!iso) return '';
    const delta = Date.now() - new Date(iso).getTime();
    if (delta < 60 * 60 * 1000) return T('vừa xảy ra','à l’instant');
    if (delta < 24 * 60 * 60 * 1000) return T('hôm nay',"aujourd’hui");
    const days = Math.max(1, Math.floor(delta / (24 * 60 * 60 * 1000)));
    return T(`${days} ngày trước`,`il y a ${days} j`);
  }

  function injectDailyFocus() {
    const daily = document.querySelector('.screen-home .daily-coach-card');
    if (!daily) return;
    const top = priorityItems(1)[0];
    let focus = daily.querySelector('.error-daily-focus');
    if (!top || top.score < 6) {
      focus?.remove();
      return;
    }
    if (!focus) {
      focus = document.createElement('button');
      focus.className = 'error-daily-focus';
      focus.dataset.errorOpenReview = '1';
      const steps = daily.querySelector('.daily-steps');
      if (steps) steps.before(focus); else daily.appendChild(focus);
    }
    const signature = `${top.item.id}:${top.entry.errorStreak}:${top.entry.totalErrors}:${top.dominant || ''}:${top.score}`;
    if (focus.dataset.signature === signature) return;
    focus.dataset.signature = signature;
    focus.innerHTML = `<span class="error-focus-icon">🧠</span><span><small>${esc(T('Ưu tiên vì lỗi lặp lại','Priorité selon les difficultés'))}</small><strong>${esc(top.item.fr)}</strong><em>${esc(top.dominant ? labelType(top.dominant) : T('Cần quay lại','À retravailler'))} • ${esc(dueText(top.entry.lastErrorAt))}</em></span><b>›</b>`;
  }

  function progressSignature(s) {
    return `${s.recent.length}:${s.recurring.length}:${s.assisted.length}:${s.voice.length}:${s.top.map(x => `${x.item.id}-${x.entry.totalErrors}-${x.entry.errorStreak}-${x.entry.recoveries}`).join('|')}`;
  }

  function injectProgress() {
    const column = document.querySelector('.screen-progress .progress-layout > div:first-child');
    if (!column) return;
    const s = summary();
    let card = column.querySelector('.error-intelligence-card');
    if (!card) {
      card = document.createElement('section');
      card.className = 'card error-intelligence-card';
      const scenarios = column.querySelector('.scenario-progress-card');
      if (scenarios) scenarios.insertAdjacentElement('afterend',card);
      else {
        const mastery = column.querySelector('.mastery-progress-card');
        if (mastery) mastery.insertAdjacentElement('afterend',card); else column.appendChild(card);
      }
    }
    const signature = progressSignature(s);
    if (card.dataset.signature === signature) return;
    card.dataset.signature = signature;
    card.innerHTML = `<div class="section-head"><div><span class="pill">BUILD 18</span><h2>🧠 ${esc(T('Trí tuệ lỗi','Error Intelligence'))}</h2></div><span class="error-badge">${s.recent.length}</span></div><p>${esc(T('Lucie ghi lại những khó khăn có thể quan sát được: nơi bạn vấp, mức độ lặp lại và khi nào bạn cần câu mẫu. Không suy đoán lỗi ngữ pháp nếu dữ liệu không chứng minh được.','Lucie mémorise les difficultés observables : où ça bloque, si cela se répète et quand un modèle est nécessaire. Elle n’invente pas un diagnostic grammatical que les données ne prouvent pas.'))}</p><div class="error-metrics"><div><strong>${s.recent.length}</strong><span>${esc(T('24 giờ','24 h'))}</span></div><div><strong>${s.recurring.length}</strong><span>${esc(T('lặp lại','récurrentes'))}</span></div><div><strong>${s.assisted.length}</strong><span>${esc(T('cần mẫu','assistées'))}</span></div><div><strong>${s.voice.length}</strong><span>${esc(T('giọng nói','voix'))}</span></div><div><strong>${state.totals.recoveries || 0}</strong><span>${esc(T('phục hồi','récupérations'))}</span></div></div>${s.top.length ? `<div class="error-priority-list"><span class="error-priority-title">${esc(T('Điểm nên quay lại','Points à retravailler'))}</span>${s.top.map(({item,entry,dominant,score}) => `<article><div><strong>${esc(item.fr)}</strong><small>${esc(item.vi)}</small></div><span>${esc(dominant ? labelType(dominant) : labelType(entry.lastType || 'practice-miss'))}</span><em>x${entry.totalErrors} • ${esc(dueText(entry.lastErrorAt))}</em><i style="width:${Math.min(100,score*8)}%"></i></article>`).join('')}</div>` : `<p class="muted">${esc(T('Chưa có khó khăn lặp lại để phân tích.','Pas encore assez de difficultés observées pour dégager une priorité.'))}</p>`}<div class="error-session"><span>${esc(T('Phiên hiện tại','Session actuelle'))}</span><strong>${session.errors} ${esc(T('khó khăn','difficulté(s)'))} • ${session.recoveries} ${esc(T('phục hồi','récupération(s)'))}</strong></div>`;
  }

  function injectSettings() {
    const root = document.querySelector('.screen-settings .narrow');
    if (!root) return;
    let card = root.querySelector('.error-export-card');
    if (!card) {
      card = document.createElement('section');
      card.className = 'card error-export-card';
      const danger = root.querySelector('.danger-zone');
      if (danger) root.insertBefore(card,danger); else root.appendChild(card);
    }
    const s = summary();
    const signature = `${state.totals.errors}:${state.totals.recoveries}:${s.totalItems}`;
    if (card.dataset.signature !== signature) {
      card.dataset.signature = signature;
      card.innerHTML = `<span class="pill">LOCAL • BUILD 18</span><h2>🧠 ${esc(T('Dữ liệu khó khăn','Données de difficultés'))}</h2><p>${esc(T('Xuất riêng dữ liệu Error Intelligence dưới dạng JSON. Không có dữ liệu nào được gửi lên máy chủ.','Exporte séparément les données Error Intelligence en JSON. Rien n’est envoyé vers un serveur.'))}</p><div class="error-export-stats"><span>${state.totals.errors || 0} ${esc(T('sự kiện','événements'))}</span><span>${s.totalItems} ${esc(T('mục','éléments'))}</span></div><button class="secondary full" data-error-export>⇩ ${esc(T('Xuất dữ liệu lỗi','Exporter les difficultés'))}</button>`;
    }

    const diagnostics = document.querySelector('.screen-settings .diagnostics');
    if (diagnostics) {
      let row = diagnostics.querySelector('[data-error-diagnostic]');
      if (!row) {
        row = document.createElement('div');
        row.dataset.errorDiagnostic = '1';
        diagnostics.appendChild(row);
      }
      const diagSig = `${s.recent.length}:${s.recurring.length}:${state.totals.errors}`;
      if (row.dataset.signature !== diagSig) {
        row.dataset.signature = diagSig;
        row.innerHTML = `<span>${esc(T('Khó khăn gần đây','Difficultés récentes'))}</span><strong>${s.recent.length} / 24h • ${s.recurring.length} ${esc(T('lặp lại','récurrente(s)'))}</strong>`;
      }
    }
  }

  function exportData() {
    const payload = {
      format:'french-tranquille-error-intelligence',
      version:1,
      exportedAt:nowIso(),
      app:{ version:window.FrenchTranquilleBuildMeta?.version || '1.11.0', build:window.FrenchTranquilleBuildMeta?.build || 18 },
      state
    };
    const blob = new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `french-tranquille-errors-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  let decorateScheduled = false;
  function decorate() {
    syncFromMemory();
    injectDailyFocus();
    injectProgress();
    injectSettings();
  }

  function scheduleDecorate() {
    if (decorateScheduled) return;
    decorateScheduled = true;
    queueMicrotask(() => {
      decorateScheduled = false;
      decorate();
    });
  }

  document.addEventListener('click', event => {
    if (event.target.closest('[data-error-open-review]')) {
      event.preventDefault();
      document.querySelector('.bottom-nav [data-go="review"]')?.click();
      return;
    }
    if (event.target.closest('[data-error-export]')) {
      event.preventDefault();
      exportData();
    }
  });

  const app = document.getElementById('app');
  if (app) new MutationObserver(scheduleDecorate).observe(app,{childList:true,subtree:true});
  window.addEventListener('focus',scheduleDecorate);
  document.addEventListener('visibilitychange',() => { if (!document.hidden) scheduleDecorate(); });

  primeMemorySnapshot();
  decorate();

  if (new URLSearchParams(location.search).get('errorSmoke') === '1') {
    setTimeout(() => {
      recordError('bonjour','scenario-miss','ci-smoke');
      recordError('bonjour','scenario-miss','ci-smoke');
      recordError('merci','assisted','ci-smoke');
      document.querySelector('.bottom-nav [data-go="progress"]')?.click();
    },120);
  }

  window.FrenchTranquilleErrors = {
    key:KEY,
    schemaVersion:1,
    version:'1.11.0',
    build:18,
    recordError,
    recordRecovery,
    recordAttempt,
    sync:syncFromMemory,
    summary,
    priorityItems,
    dominantType,
    exportData
  };
}
