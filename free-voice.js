(() => {
  'use strict';

  const VERSION = '1.3.0';
  const BUILD = 8;
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const LEARNER_KEY = 'francais-avec-luc:learner:v1';
  const SESSION_KEY = 'tran-french-teacher:guided-voice-session:v1';
  const MASTERY_KEY = 'tran-french-teacher:guided-voice-mastery:v1';
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  const ITEMS = {
    bonjour: {
      fr: 'Bonjour',
      vi: 'Xin chào',
      hintVi: 'Gợi ý: từ bắt đầu bằng “Bon…”',
      hintFr: 'Indice : le mot commence par « Bon… »',
      variants: ['bonjour']
    },
    merci: {
      fr: 'Merci',
      vi: 'Cảm ơn',
      hintVi: 'Gợi ý: từ bắt đầu bằng “Mer…”',
      hintFr: 'Indice : le mot commence par « Mer… »',
      variants: ['merci']
    },
    'au-revoir': {
      fr: 'Au revoir',
      vi: 'Tạm biệt',
      hintVi: 'Gợi ý: có hai từ, bắt đầu bằng “Au…”',
      hintFr: 'Indice : deux mots, cela commence par « Au… »',
      variants: ['au revoir']
    },
    'je-mappelle': {
      fr: "Je m'appelle Trân.",
      vi: 'Tôi tên là Trân.',
      hintVi: 'Gợi ý: “Je m’…”',
      hintFr: 'Indice : « Je m’… »',
      variants: ['je m appelle tran', 'je m appelle']
    }
  };

  const BASE_ROUNDS = [
    { item:'bonjour', vi:'Buổi sáng, bạn gặp Luc lần đầu. Bạn nói gì?', debug:'Le matin, tu rencontres Luc pour la première fois. Que dis-tu ?' },
    { item:'merci', vi:'Luc đưa bạn một ly nước. Bạn nói gì?', debug:"Luc te donne un verre d'eau. Que dis-tu ?" },
    { item:'je-mappelle', vi:'Luc hỏi tên bạn. Hãy giới thiệu tên của bạn.', debug:'Luc te demande ton prénom. Présente-toi.' },
    { item:'au-revoir', vi:'Cuộc gặp kết thúc. Bạn nói gì?', debug:'La rencontre se termine. Que dis-tu ?' },
    { item:'bonjour', vi:'Bạn bước vào một cửa hàng vào buổi sáng. Câu đầu tiên?', debug:'Tu entres dans un magasin le matin. Première phrase ?' },
    { item:'merci', vi:'Nhân viên đưa đồ bạn vừa mua. Bạn đáp lại thế nào?', debug:"L'employé te donne ce que tu viens d'acheter. Que réponds-tu ?" },
    { item:'je-mappelle', vi:'Bạn gặp một người mới và muốn nói tên mình.', debug:'Tu rencontres quelqu’un de nouveau et tu veux dire ton prénom.' },
    { item:'au-revoir', vi:'Bạn rời quán cà phê. Nói một câu ngắn trước khi đi.', debug:'Tu quittes le café. Une courte phrase avant de partir.' }
  ];

  let recognition = null;
  let listening = false;
  let transcript = '';
  let alternatives = [];
  let feedback = '';
  let success = false;
  let textMode = false;
  let lastMatch = 0;

  function defaultSession() {
    return {
      version: 1,
      index: 0,
      attemptsOnRound: 0,
      totalAttempts: 0,
      successes: 0,
      failedItems: [],
      retryQueue: [],
      completed: false,
      startedAt: new Date().toISOString()
    };
  }

  function session() {
    try {
      const value = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
      if (value && value.version === 1) return {...defaultSession(), ...value};
    } catch {}
    const value = defaultSession();
    saveSession(value);
    return value;
  }

  function saveSession(value) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(value));
  }

  function mastery() {
    try { return JSON.parse(localStorage.getItem(MASTERY_KEY) || '{}') || {}; }
    catch { return {}; }
  }

  function saveMastery(value) {
    localStorage.setItem(MASTERY_KEY, JSON.stringify(value));
  }

  function currentRound(s = session()) {
    if (s.index < BASE_ROUNDS.length) return {...BASE_ROUNDS[s.index], baseIndex:s.index, retry:false};
    const retryIndex = s.index - BASE_ROUNDS.length;
    const baseIndex = s.retryQueue[retryIndex];
    if (Number.isInteger(baseIndex) && BASE_ROUNDS[baseIndex]) return {...BASE_ROUNDS[baseIndex], baseIndex, retry:true};
    return null;
  }

  function norm(value='') {
    return String(value)
      .toLocaleLowerCase('fr-FR')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[’']/g, ' ')
      .replace(/[^a-z\s-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function editDistance(a, b) {
    const x = norm(a), y = norm(b);
    const dp = Array.from({length:x.length + 1}, () => Array(y.length + 1).fill(0));
    for (let i=0;i<=x.length;i++) dp[i][0]=i;
    for (let j=0;j<=y.length;j++) dp[0][j]=j;
    for (let i=1;i<=x.length;i++) for (let j=1;j<=y.length;j++) {
      dp[i][j] = Math.min(
        dp[i-1][j] + 1,
        dp[i][j-1] + 1,
        dp[i-1][j-1] + (x[i-1] === y[j-1] ? 0 : 1)
      );
    }
    return dp[x.length][y.length];
  }

  function scoreCandidate(itemId, candidate) {
    const item = ITEMS[itemId];
    const c = norm(candidate);
    if (!c) return 0;
    let best = 0;
    for (const variant of item.variants) {
      const v = norm(variant);
      if (c === v) best = Math.max(best, 100);
      else if (c.includes(v) || v.includes(c) && c.length >= Math.max(4, v.length - 3)) best = Math.max(best, 92);
      else {
        const distance = editDistance(c, v);
        const maxLen = Math.max(c.length, v.length, 1);
        const similarity = Math.round((1 - distance / maxLen) * 100);
        best = Math.max(best, similarity);
      }
    }
    return best;
  }

  function isAccepted(itemId, candidates) {
    let best = 0;
    for (const candidate of candidates) best = Math.max(best, scoreCandidate(itemId, candidate));
    lastMatch = best;
    const threshold = itemId === 'je-mappelle' ? 68 : 76;
    return best >= threshold;
  }

  function labels() {
    if (isDebug()) return {
      badge: 'PWA-2 • 0 €',
      title: 'Entraînement vocal guidé',
      intro: "Luc te fait pratiquer les éléments déjà appris dans plusieurs situations. Safari transcrit ; l'app vérifie le texte reconnu. Ce n'est pas une note de prononciation.",
      listen: 'Luc écoute…',
      mic: '🎙️ Répondre au micro',
      model: '🔊 Écouter le modèle',
      text: '⌨️ Écrire ma réponse',
      hideText: 'Masquer le clavier',
      validateText: 'Valider',
      next: 'Continuer ›',
      heard: "Safari a reconnu",
      ok: 'Réponse reconnue. Bien — on la réutilisera plus tard.',
      retry: "Pas encore reconnue. Réessaie tranquillement.",
      unavailable: "Reconnaissance vocale indisponible ici. Sur l’iPhone, utiliser Safari/PWA et autoriser le micro. Le mode texte fonctionne toujours.",
      reveal: 'Voir la réponse',
      answer: 'Réponse attendue',
      attempt: 'Essai',
      progress: 'Progression de la séance',
      repeat: 'Ce point reviendra une fois à la fin de la séance.',
      doneTitle: 'Séance terminée',
      done: 'La séance vocale est terminée. Les points fragiles ont été répétés automatiquement.',
      restart: '↺ Nouvelle séance',
      fragile: 'À revoir',
      solid: 'Reconnu sans difficulté',
      noPaidApi: '0 € : aucune API payante ni backend.',
      notPronunciation: 'La reconnaissance vérifie des mots/phrases, pas la qualité phonétique exacte.'
    };
    return {
      badge: 'PWA-2 • MIỄN PHÍ',
      title: 'Luyện nói có hướng dẫn',
      intro: 'Luc giúp bạn dùng lại những gì đã học trong nhiều tình huống. Safari chuyển giọng nói thành chữ; ứng dụng kiểm tra phần chữ được nhận ra. Đây không phải điểm phát âm.',
      listen: 'Luc đang nghe…',
      mic: '🎙️ Trả lời bằng giọng nói',
      model: '🔊 Nghe câu mẫu',
      text: '⌨️ Viết câu trả lời',
      hideText: 'Ẩn bàn phím',
      validateText: 'Kiểm tra',
      next: 'Tiếp tục ›',
      heard: 'Safari nhận được',
      ok: 'Câu trả lời đã được nhận ra. Tốt — lát nữa mình sẽ dùng lại.',
      retry: 'Chưa nhận ra đúng. Hãy thử lại thật bình tĩnh.',
      unavailable: 'Nhận dạng giọng nói chưa khả dụng ở đây. Trên iPhone, hãy dùng Safari/PWA và cho phép micro. Bạn vẫn có thể viết câu trả lời.',
      reveal: 'Xem đáp án',
      answer: 'Câu trả lời mong đợi',
      attempt: 'Lần thử',
      progress: 'Tiến độ buổi luyện',
      repeat: 'Phần này sẽ quay lại một lần ở cuối buổi luyện.',
      doneTitle: 'Hoàn thành buổi luyện',
      done: 'Buổi luyện nói đã kết thúc. Các phần còn yếu đã được lặp lại tự động.',
      restart: '↺ Luyện một buổi mới',
      fragile: 'Cần ôn lại',
      solid: 'Đã nhận ra dễ dàng',
      noPaidApi: '0 €: không dùng API trả phí hay máy chủ trả phí.',
      notPronunciation: 'Nhận dạng giọng nói kiểm tra từ/câu, không chấm chất lượng phát âm chính xác.'
    };
  }

  function speakFrench(text) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'fr-FR';
    u.rate = .84;
    u.pitch = .96;
    speechSynthesis.speak(u);
  }

  function updateMastery(itemId, ok, attemptsForRound) {
    const all = mastery();
    const entry = all[itemId] || {attempts:0, successes:0, firstTry:0, lastSeen:null};
    entry.attempts += 1;
    if (ok) {
      entry.successes += 1;
      if (attemptsForRound === 1) entry.firstTry += 1;
    }
    entry.lastSeen = new Date().toISOString();
    all[itemId] = entry;
    saveMastery(all);
  }

  function updateLearnerWin() {
    try {
      const state = JSON.parse(localStorage.getItem(LEARNER_KEY) || '{}');
      state.conversationWins = Number(state.conversationWins || 0) + 1;
      state.lastActivity = new Date().toISOString();
      localStorage.setItem(LEARNER_KEY, JSON.stringify(state));
    } catch {}
  }

  function evaluateCandidates(candidates) {
    const s = session();
    const round = currentRound(s);
    if (!round) return;
    const l = labels();
    s.attemptsOnRound += 1;
    s.totalAttempts += 1;
    alternatives = candidates.filter(Boolean);
    transcript = alternatives[0] || '';
    success = isAccepted(round.item, alternatives);
    updateMastery(round.item, success, s.attemptsOnRound);

    if (success) {
      s.successes += 1;
      feedback = l.ok;
      updateLearnerWin();
    } else {
      feedback = l.retry;
      if (!s.failedItems.includes(round.item)) s.failedItems.push(round.item);
      if (s.attemptsOnRound >= 2 && !round.retry && !s.retryQueue.includes(round.baseIndex)) {
        s.retryQueue.push(round.baseIndex);
      }
    }
    saveSession(s);
  }

  function startRecognition() {
    const l = labels();
    if (!SpeechRecognition || listening) return;
    transcript = '';
    alternatives = [];
    feedback = '';
    success = false;
    lastMatch = 0;
    renderCard();

    recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;

    recognition.onstart = () => { listening = true; renderCard(); };
    recognition.onresult = event => {
      const candidates = [];
      const result = event.results[0];
      for (let i = 0; i < result.length; i++) candidates.push(result[i].transcript || '');
      evaluateCandidates(candidates);
    };
    recognition.onerror = event => {
      feedback = ['not-allowed','service-not-allowed'].includes(event.error) ? l.unavailable : l.retry;
    };
    recognition.onend = () => { listening = false; renderCard(); };
    try { recognition.start(); } catch { feedback = l.unavailable; renderCard(); }
  }

  function evaluateText() {
    const input = document.getElementById('free-voice-text-input');
    if (!input) return;
    evaluateCandidates([input.value]);
    renderCard();
  }

  function nextRound() {
    const s = session();
    s.index += 1;
    s.attemptsOnRound = 0;
    const total = BASE_ROUNDS.length + s.retryQueue.length;
    if (s.index >= total) s.completed = true;
    saveSession(s);
    transcript = '';
    alternatives = [];
    feedback = '';
    success = false;
    textMode = false;
    lastMatch = 0;
    renderCard();
  }

  function restartSession() {
    saveSession(defaultSession());
    transcript = '';
    alternatives = [];
    feedback = '';
    success = false;
    textMode = false;
    lastMatch = 0;
    renderCard();
  }

  function summaryHtml(s, l) {
    const data = mastery();
    const fragile = Object.entries(data)
      .filter(([,v]) => Number(v.attempts || 0) > 0 && (Number(v.successes || 0) / Number(v.attempts || 1) < .75))
      .map(([id]) => ITEMS[id]?.fr)
      .filter(Boolean);
    const solid = Object.entries(data)
      .filter(([,v]) => Number(v.firstTry || 0) >= 2)
      .map(([id]) => ITEMS[id]?.fr)
      .filter(Boolean);
    return `
      <div class="free-voice-summary">
        <div><span>${l.solid}</span><strong>${solid.length ? solid.map(escapeHtml).join(' • ') : '—'}</strong></div>
        <div><span>${l.fragile}</span><strong>${fragile.length ? fragile.map(escapeHtml).join(' • ') : '—'}</strong></div>
        <div><span>${l.attempt}</span><strong>${s.totalAttempts}</strong></div>
      </div>`;
  }

  function injectStyles() {
    if (document.getElementById('free-voice-style')) return;
    const style = document.createElement('style');
    style.id = 'free-voice-style';
    style.textContent = `
      .free-voice-card{border-color:rgba(70,190,130,.28)!important;overflow:hidden}
      .free-voice-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
      .free-voice-badge{display:inline-flex;padding:5px 9px;border-radius:999px;border:1px solid rgba(85,190,135,.35);background:rgba(35,110,75,.18);color:#a9ddbf;font-size:.7rem;font-weight:800}
      .free-voice-progress{height:5px;border-radius:999px;background:#132238;overflow:hidden;margin:14px 0 8px}
      .free-voice-progress>span{display:block;height:100%;background:linear-gradient(90deg,#d9e6f5,#e8ddd0);transition:width .2s ease}
      .free-voice-progress-label{display:flex;justify-content:space-between;gap:10px;color:#7f93ac;font-size:.74rem}
      .free-voice-prompt{margin:14px 0;padding:15px;border-radius:14px;background:#0c1726;border:1px solid #263b53;color:#e8eef5;line-height:1.5}
      .free-voice-prompt .retry-tag{display:inline-flex;margin-bottom:7px;padding:3px 7px;border-radius:999px;background:#3a2c13;color:#ddc995;font-size:.68rem;font-weight:800}
      .free-voice-actions{display:grid;grid-template-columns:1fr 1fr;gap:9px}
      .free-voice-actions button{min-height:50px;border-radius:14px;border:1px solid #344b66;background:#13243a;color:#eaf1f8;font-weight:800;cursor:pointer;padding:8px 10px}
      .free-voice-actions .free-mic{grid-column:1/-1;background:#f4efe6;color:#0a1422;border:0;min-height:56px}
      .free-voice-actions .free-mic.listening{background:#2d2030;color:#f5d8e6}
      .free-voice-result{margin-top:13px;padding:12px 13px;border-radius:12px;background:#0d1929}
      .free-voice-result small{display:block;color:#7f93ac;margin-bottom:5px}
      .free-voice-feedback{margin-top:9px;color:#d5c58c;line-height:1.45}
      .free-voice-feedback.ok{color:#a8d9be}
      .free-voice-hint{margin-top:9px;padding:10px 12px;border-left:2px solid #bba76a;background:#151b25;color:#cfc4a7;font-size:.82rem}
      .free-voice-answer{margin-top:9px;padding:10px 12px;border-radius:10px;background:#151d2a;color:#edf1f4}
      .free-voice-note{font-size:.74rem!important;color:#71869f!important;margin-top:12px!important}
      .free-voice-card .free-next{width:100%;margin-top:10px;min-height:48px;border:0;border-radius:13px;background:#e8e0d2;color:#0b1421;font-weight:800;cursor:pointer}
      .free-voice-textbox{display:grid;grid-template-columns:1fr auto;gap:8px;margin-top:10px}
      .free-voice-textbox input{min-width:0;min-height:48px;border-radius:12px;border:1px solid #354961;background:#0d1929;color:#eef4fb;padding:0 12px;font-size:16px}
      .free-voice-textbox button{min-width:84px;border-radius:12px;border:1px solid #3b526f;background:#17283d;color:#eef4fb;font-weight:800}
      .free-voice-summary{display:grid;gap:8px;margin:14px 0}
      .free-voice-summary>div{display:grid;gap:4px;padding:11px 12px;border-radius:12px;background:#0d1929}
      .free-voice-summary span{color:#7f93ac;font-size:.74rem}
      .free-voice-summary strong{font-size:.9rem;color:#e9eff6}
    `;
    document.head.appendChild(style);
  }

  function renderCard() {
    const card = document.getElementById('free-voice-card');
    if (!card) return;
    const l = labels();
    const s = session();
    const round = currentRound(s);
    const available = Boolean(SpeechRecognition);

    if (s.completed || !round) {
      card.innerHTML = `
        <div class="free-voice-head"><div><span class="free-voice-badge">${l.badge}</span><h2>${l.doneTitle}</h2></div><span>✓</span></div>
        <p>${l.done}</p>
        ${summaryHtml(s,l)}
        <button class="free-next" id="free-voice-restart">${l.restart}</button>
        <p class="free-voice-note">${l.noPaidApi}</p>`;
      card.querySelector('#free-voice-restart')?.addEventListener('click', restartSession);
      return;
    }

    const item = ITEMS[round.item];
    const total = BASE_ROUNDS.length + s.retryQueue.length;
    const displayIndex = Math.min(s.index + 1, total);
    const pct = Math.max(0, Math.min(100, Math.round((s.index / Math.max(total,1)) * 100)));
    const prompt = isDebug() ? round.debug : round.vi;
    const hint = isDebug() ? item.hintFr : item.hintVi;
    const showHint = s.attemptsOnRound >= 1 && !success;
    const showAnswer = s.attemptsOnRound >= 2 && !success;

    card.innerHTML = `
      <div class="free-voice-head"><div><span class="free-voice-badge">${l.badge}</span><h2>${l.title}</h2></div><span>🎙️</span></div>
      <p>${l.intro}</p>
      <div class="free-voice-progress"><span style="width:${pct}%"></span></div>
      <div class="free-voice-progress-label"><span>${l.progress}</span><span>${displayIndex}/${total}</span></div>
      <div class="free-voice-prompt">${round.retry ? `<span class="retry-tag">↺ ${escapeHtml(l.fragile)}</span><br>` : ''}${escapeHtml(prompt)}</div>
      <div class="free-voice-actions">
        <button class="free-mic ${listening ? 'listening' : ''}" id="free-voice-mic" ${!available || listening ? 'disabled' : ''}>${listening ? l.listen : l.mic}</button>
        <button id="free-voice-model">${l.model}</button>
        <button id="free-voice-text" type="button">${textMode ? l.hideText : l.text}</button>
      </div>
      ${textMode ? `<div class="free-voice-textbox"><input id="free-voice-text-input" type="text" autocomplete="off" autocapitalize="sentences" placeholder="${escapeHtml(item.fr)}"><button id="free-voice-validate-text">${l.validateText}</button></div>` : ''}
      ${!available ? `<div class="free-voice-feedback">${l.unavailable}</div>` : ''}
      ${transcript ? `<div class="free-voice-result"><small>${l.heard}</small><strong>${escapeHtml(transcript)}</strong></div>` : ''}
      ${feedback ? `<div class="free-voice-feedback ${success ? 'ok' : ''}">${escapeHtml(feedback)}</div>` : ''}
      ${showHint ? `<div class="free-voice-hint">${escapeHtml(hint)}</div>` : ''}
      ${showAnswer ? `<div class="free-voice-answer"><small>${l.answer}</small><br><strong>${escapeHtml(item.fr)}</strong>${!round.retry ? `<div class="free-voice-note">${l.repeat}</div>` : ''}</div>` : ''}
      ${success ? `<button class="free-next" id="free-voice-next">${l.next}</button>` : ''}
      <p class="free-voice-note">${l.noPaidApi} ${l.notPronunciation} ${isIOS ? 'iPhone / iOS' : ''}</p>
    `;

    card.querySelector('#free-voice-mic')?.addEventListener('click', startRecognition);
    card.querySelector('#free-voice-model')?.addEventListener('click', () => speakFrench(item.fr));
    card.querySelector('#free-voice-next')?.addEventListener('click', nextRound);
    card.querySelector('#free-voice-text')?.addEventListener('click', () => { textMode = !textMode; renderCard(); });
    card.querySelector('#free-voice-validate-text')?.addEventListener('click', evaluateText);
    card.querySelector('#free-voice-text-input')?.addEventListener('keydown', event => { if (event.key === 'Enter') evaluateText(); });
  }

  function escapeHtml(value='') {
    return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function injectConversationCard() {
    const conversationCard = document.querySelector('.conversation-card');
    if (!conversationCard || document.getElementById('free-voice-card')) return;
    const card = document.createElement('section');
    card.id = 'free-voice-card';
    card.className = 'card free-voice-card';
    conversationCard.before(card);
    renderCard();

    const legacy = [...document.querySelectorAll('.quiet')].find(el => /Giọng nói|Voix/.test(el.textContent));
    if (legacy) legacy.classList.add('hidden');
  }

  function patchDisplayedVersion() {
    document.querySelectorAll('.diagnostics strong').forEach(el => {
      if (/^v\d+\.\d+\.\d+\s*•\s*Build\s*\d+$/.test(el.textContent.trim())) el.textContent = `v${VERSION} • Build ${BUILD}`;
    });
  }

  function refresh() {
    injectStyles();
    patchDisplayedVersion();
    injectConversationCard();
  }

  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; refresh(); });
  });

  const start = () => {
    refresh();
    observer.observe(document.documentElement, {subtree:true,childList:true,characterData:true});
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();

  window.FreeVoice = {
    version: VERSION,
    build: BUILD,
    available: Boolean(SpeechRecognition),
    isIOS,
    reset: restartSession
  };
})();