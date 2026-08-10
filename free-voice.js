(() => {
  'use strict';

  const VERSION = '1.2.0';
  const BUILD = 7;
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const LEARNER_KEY = 'francais-avec-luc:learner:v1';
  const ROUND_KEY = 'tran-french-teacher:free-voice-round:v1';
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  const rounds = [
    {
      vi: 'Buổi sáng, bạn gặp Luc. Bạn nói gì?',
      fr: 'Bonjour',
      test: t => /(^|\s)bonjour(\s|$)/.test(t)
    },
    {
      vi: 'Luc đưa bạn một ly nước. Bạn nói gì?',
      fr: 'Merci',
      test: t => /(^|\s)merci(\s|$)/.test(t)
    },
    {
      vi: 'Bạn muốn giới thiệu tên của mình.',
      fr: "Je m'appelle Trân.",
      test: t => /je\s+m\s*appelle/.test(t)
    },
    {
      vi: 'Cuộc gặp kết thúc. Bạn nói gì?',
      fr: 'Au revoir',
      test: t => /au\s+revoir/.test(t)
    }
  ];

  let listening = false;
  let recognition = null;
  let transcript = '';
  let feedback = '';
  let success = false;

  function roundIndex() {
    const n = Number(localStorage.getItem(ROUND_KEY));
    return Number.isInteger(n) && n >= 0 && n < rounds.length ? n : 0;
  }

  function setRound(n) {
    localStorage.setItem(ROUND_KEY, String((n + rounds.length) % rounds.length));
  }

  function norm(value='') {
    return String(value)
      .toLocaleLowerCase('fr-FR')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[’']/g, ' ')
      .replace(/[^a-zà-ÿ\s-]/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function labels() {
    if (isDebug()) return {
      badge: 'PWA-2 • 0 €',
      title: 'Pratique vocale gratuite',
      intro: 'La reconnaissance vocale utilise les fonctions Web Speech de Safari/iPhone. Aucun backend, aucune API payante, aucune clé.',
      listen: 'Luc écoute…',
      ready: 'Appuie sur le micro puis réponds en français.',
      mic: '🎙️ Répondre au micro',
      model: '🔊 Écouter le modèle',
      next: 'Continuer ›',
      heard: "J'ai entendu",
      ok: 'Oui — réponse reconnue. On continue.',
      retry: 'Pas encore. Réessaie, ou écoute le modèle.',
      unavailable: "La reconnaissance vocale n'est pas disponible ici. Sur iPhone, ouvre l'app avec Safari et vérifie que Siri est activé. Le mode texte reste disponible.",
      done: 'Les 4 mini-situations sont terminées. Tu peux recommencer quand tu veux.',
      restart: '↺ Recommencer',
      local: 'Tout reste sur cet appareil.'
    };
    return {
      badge: 'PWA-2 • MIỄN PHÍ',
      title: 'Luyện nói miễn phí',
      intro: 'Ứng dụng dùng chức năng nhận dạng giọng nói của Safari/iPhone. Không có máy chủ trả phí, không có API trả phí.',
      listen: 'Luc đang nghe…',
      ready: 'Nhấn micro rồi trả lời bằng tiếng Pháp.',
      mic: '🎙️ Trả lời bằng giọng nói',
      model: '🔊 Nghe câu mẫu',
      next: 'Tiếp tục ›',
      heard: 'Mình nghe được',
      ok: 'Đúng rồi — câu trả lời đã được nhận ra. Mình tiếp tục nhé.',
      retry: 'Chưa đúng. Hãy thử lại hoặc nghe câu mẫu.',
      unavailable: 'Nhận dạng giọng nói chưa khả dụng ở đây. Trên iPhone, hãy mở bằng Safari và kiểm tra Siri đã được bật. Bạn vẫn có thể dùng bài tập chữ.',
      done: 'Bạn đã hoàn thành 4 tình huống nói ngắn. Bạn có thể luyện lại bất cứ lúc nào.',
      restart: '↺ Luyện lại',
      local: 'Mọi thứ của bài tập này được xử lý trên thiết bị.'
    };
  }

  function speakFrench(text) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'fr-FR';
    u.rate = .86;
    u.pitch = .96;
    speechSynthesis.speak(u);
  }

  function updateLearnerWin() {
    try {
      const state = JSON.parse(localStorage.getItem(LEARNER_KEY) || '{}');
      state.conversationWins = Number(state.conversationWins || 0) + 1;
      state.lastActivity = new Date().toISOString();
      localStorage.setItem(LEARNER_KEY, JSON.stringify(state));
    } catch {}
  }

  function startRecognition() {
    const l = labels();
    if (!SpeechRecognition || listening) return;
    transcript = '';
    feedback = '';
    success = false;
    renderCard();

    recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    recognition.onstart = () => {
      listening = true;
      renderCard();
    };
    recognition.onresult = event => {
      const candidates = [];
      for (let i = 0; i < event.results[0].length; i++) candidates.push(event.results[0][i].transcript || '');
      transcript = candidates[0] || '';
      const round = rounds[roundIndex()];
      success = candidates.some(c => round.test(norm(c)));
      feedback = success ? l.ok : l.retry;
      if (success) updateLearnerWin();
    };
    recognition.onerror = event => {
      feedback = event.error === 'not-allowed' || event.error === 'service-not-allowed' ? l.unavailable : l.retry;
    };
    recognition.onend = () => {
      listening = false;
      renderCard();
    };
    try { recognition.start(); } catch { feedback = l.unavailable; renderCard(); }
  }

  function nextRound() {
    const i = roundIndex();
    transcript = '';
    feedback = '';
    success = false;
    if (i === rounds.length - 1) {
      setRound(0);
      localStorage.setItem('tran-french-teacher:free-voice-complete:v1', '1');
    } else setRound(i + 1);
    renderCard();
  }

  function injectStyles() {
    if (document.getElementById('free-voice-style')) return;
    const style = document.createElement('style');
    style.id = 'free-voice-style';
    style.textContent = `
      .free-voice-card{border-color:rgba(70,190,130,.28)!important;overflow:hidden}
      .free-voice-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
      .free-voice-badge{display:inline-flex;padding:5px 9px;border-radius:999px;border:1px solid rgba(85,190,135,.35);background:rgba(35,110,75,.18);color:#a9ddbf;font-size:.7rem;font-weight:800}
      .free-voice-prompt{margin:16px 0;padding:15px;border-radius:14px;background:#0c1726;border:1px solid #263b53;color:#e8eef5;line-height:1.5}
      .free-voice-actions{display:grid;grid-template-columns:1fr 1fr;gap:9px}
      .free-voice-actions button{min-height:50px;border-radius:14px;border:1px solid #344b66;background:#13243a;color:#eaf1f8;font-weight:800;cursor:pointer;padding:8px 10px}
      .free-voice-actions .free-mic{grid-column:1/-1;background:#f4efe6;color:#0a1422;border:0;min-height:56px}
      .free-voice-actions .free-mic.listening{background:#2d2030;color:#f5d8e6}
      .free-voice-result{margin-top:13px;padding:12px 13px;border-radius:12px;background:#0d1929}
      .free-voice-result small{display:block;color:#7f93ac;margin-bottom:5px}
      .free-voice-feedback{margin-top:9px;color:#d5c58c;line-height:1.45}
      .free-voice-feedback.ok{color:#a8d9be}
      .free-voice-note{font-size:.76rem!important;color:#71869f!important;margin-top:12px!important}
      .free-voice-card .free-next{width:100%;margin-top:10px;min-height:48px;border:0;border-radius:13px;background:#e8e0d2;color:#0b1421;font-weight:800;cursor:pointer}
    `;
    document.head.appendChild(style);
  }

  function renderCard() {
    const card = document.getElementById('free-voice-card');
    if (!card) return;
    const l = labels();
    const i = roundIndex();
    const r = rounds[i];
    const available = Boolean(SpeechRecognition);
    const completed = localStorage.getItem('tran-french-teacher:free-voice-complete:v1') === '1' && i === 0 && !transcript && !feedback;

    card.innerHTML = `
      <div class="free-voice-head"><div><span class="free-voice-badge">${l.badge}</span><h2>${l.title}</h2></div><span>🎙️</span></div>
      <p>${l.intro}</p>
      ${completed ? `<div class="free-voice-prompt">${l.done}</div><button class="free-next" id="free-voice-restart">${l.restart}</button>` : `
        <div class="free-voice-prompt"><strong>${i + 1}/${rounds.length}</strong><br>${r.vi}</div>
        <div class="free-voice-actions">
          <button class="free-mic ${listening ? 'listening' : ''}" id="free-voice-mic" ${!available || listening ? 'disabled' : ''}>${listening ? l.listen : l.mic}</button>
          <button id="free-voice-model">${l.model}</button>
          <button id="free-voice-text" type="button">${isDebug() ? 'Utiliser le mode texte' : 'Dùng bài tập chữ'}</button>
        </div>
        ${!available ? `<div class="free-voice-feedback">${l.unavailable}</div>` : ''}
        ${transcript ? `<div class="free-voice-result"><small>${l.heard}</small><strong>${escapeHtml(transcript)}</strong></div>` : ''}
        ${feedback ? `<div class="free-voice-feedback ${success ? 'ok' : ''}">${feedback}</div>` : ''}
        ${success ? `<button class="free-next" id="free-voice-next">${l.next}</button>` : ''}
        <p class="free-voice-note">${l.local} ${isIOS ? 'iPhone / iOS' : ''}</p>
      `}
    `;

    card.querySelector('#free-voice-mic')?.addEventListener('click', startRecognition);
    card.querySelector('#free-voice-model')?.addEventListener('click', () => speakFrench(r.fr));
    card.querySelector('#free-voice-next')?.addEventListener('click', nextRound);
    card.querySelector('#free-voice-restart')?.addEventListener('click', () => {
      localStorage.removeItem('tran-french-teacher:free-voice-complete:v1');
      setRound(0); transcript=''; feedback=''; success=false; renderCard();
    });
    card.querySelector('#free-voice-text')?.addEventListener('click', () => card.nextElementSibling?.scrollIntoView({behavior:'smooth',block:'start'}));
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

  window.FreeVoice = { version: VERSION, build: BUILD, available: Boolean(SpeechRecognition), isIOS };
})();