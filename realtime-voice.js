(() => {
  'use strict';

  const VERSION = '1.1.0';
  const BUILD = 5;
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const ENDPOINT_KEY = 'tran-french-teacher:realtime-endpoint:v1';
  const LEARNER_KEY = 'francais-avec-luc:learner:v1';
  const params = new URLSearchParams(location.search);
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1' || params.get('debug') === 'fr';
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  const paramEndpoint = params.get('realtime');
  if (paramEndpoint && /^https:\/\//i.test(paramEndpoint)) localStorage.setItem(ENDPOINT_KEY, paramEndpoint.replace(/\/$/, ''));

  let pc = null;
  let dc = null;
  let localStream = null;
  let remoteAudio = null;
  let active = false;
  let assistantTranscript = '';
  let userTranscript = '';

  function endpoint() {
    const stored = localStorage.getItem(ENDPOINT_KEY);
    if (stored) return stored;
    if (!location.hostname.endsWith('github.io')) return `${location.origin}/api/realtime`;
    return '';
  }

  function learnerContext() {
    try {
      const raw = JSON.parse(localStorage.getItem(LEARNER_KEY) || '{}');
      return {
        level: raw.level || 'A0',
        lesson1Completed: Boolean(raw.lesson1Completed),
        knownItems: Array.isArray(raw.knownItems) ? raw.knownItems : [],
        reviewState: raw.reviewState || {}
      };
    } catch {
      return { level: 'A0', lesson1Completed: false, knownItems: [], reviewState: {} };
    }
  }

  function labels() {
    if (isDebug()) {
      return {
        title: 'Conversation vocale avec Luc',
        intro: 'PWA-2 Voice — conversation Realtime sur iPhone. La voix système n’est plus utilisée pendant cette session.',
        start: '🎙️ Démarrer la conversation',
        stop: '■ Arrêter',
        ready: 'Prêt',
        connecting: 'Connexion… autorise le micro sur l’iPhone.',
        live: 'En ligne — parle naturellement',
        listening: 'Luc t’écoute…',
        speaking: 'Luc répond…',
        unavailable: 'Backend Realtime non configuré sur cet appareil.',
        error: 'Impossible de démarrer la voix Realtime.',
        you: 'Trân',
        luc: 'Luc'
      };
    }
    return {
      title: 'Nói chuyện với Luc',
      intro: 'Luyện nói trực tiếp với Luc. Hãy nói tự nhiên; Luc sẽ giải thích chủ yếu bằng tiếng Việt.',
      start: '🎙️ Bắt đầu nói với Luc',
      stop: '■ Dừng',
      ready: 'Sẵn sàng',
      connecting: 'Đang kết nối… hãy cho phép dùng micro.',
      live: 'Đã kết nối — bạn có thể nói',
      listening: 'Luc đang nghe…',
      speaking: 'Luc đang trả lời…',
      unavailable: 'Chế độ giọng nói tự nhiên chưa được kết nối trên thiết bị này.',
      error: 'Không thể bắt đầu hội thoại bằng giọng nói.',
      you: 'Trân',
      luc: 'Luc'
    };
  }

  function setStatus(text, state = 'idle') {
    const el = document.getElementById('realtime-status');
    if (!el) return;
    el.textContent = text;
    el.dataset.state = state;
  }

  function updateTranscript() {
    const user = document.getElementById('realtime-user-transcript');
    const luc = document.getElementById('realtime-luc-transcript');
    if (user) user.textContent = userTranscript || '—';
    if (luc) luc.textContent = assistantTranscript || '—';
  }

  function handleServerEvent(event) {
    const l = labels();
    switch (event.type) {
      case 'input_audio_buffer.speech_started':
        setStatus(l.listening, 'listening');
        break;
      case 'input_audio_buffer.speech_stopped':
        setStatus(l.live, 'live');
        break;
      case 'conversation.item.input_audio_transcription.completed':
        userTranscript = event.transcript || '';
        updateTranscript();
        break;
      case 'response.created':
        assistantTranscript = '';
        updateTranscript();
        setStatus(l.speaking, 'speaking');
        break;
      case 'response.output_audio_transcript.delta':
        assistantTranscript += event.delta || '';
        updateTranscript();
        break;
      case 'response.output_audio_transcript.done':
        assistantTranscript = event.transcript || assistantTranscript;
        updateTranscript();
        break;
      case 'response.done':
        setStatus(l.live, 'live');
        break;
      case 'error':
        console.error('Realtime event error', event.error || event);
        setStatus(`${l.error}${isDebug() && event.error?.message ? ` — ${event.error.message}` : ''}`, 'error');
        break;
    }
  }

  function createRemoteAudio() {
    remoteAudio = document.createElement('audio');
    remoteAudio.autoplay = true;
    remoteAudio.playsInline = true;
    remoteAudio.setAttribute('playsinline', '');
    remoteAudio.style.display = 'none';
    document.body.appendChild(remoteAudio);
    return remoteAudio;
  }

  async function startRealtime() {
    const l = labels();
    if (active) return;
    const url = endpoint();
    if (!url) {
      setStatus(l.unavailable, 'error');
      if (isDebug()) goSettingsHint();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || !window.RTCPeerConnection) {
      setStatus(l.error, 'error');
      return;
    }

    try {
      setStatus(l.connecting, 'connecting');
      const button = document.getElementById('realtime-start');
      if (button) button.disabled = true;

      localStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1
        }
      });

      pc = new RTCPeerConnection();
      remoteAudio = createRemoteAudio();
      pc.ontrack = event => {
        remoteAudio.srcObject = event.streams[0];
        remoteAudio.play().catch(() => {});
      };

      for (const track of localStream.getTracks()) pc.addTrack(track, localStream);

      dc = pc.createDataChannel('oai-events');
      dc.addEventListener('message', message => {
        try { handleServerEvent(JSON.parse(message.data)); } catch {}
      });
      dc.addEventListener('open', () => {
        active = true;
        renderButtons();
        setStatus(l.live, 'live');
        dc.send(JSON.stringify({
          type: 'response.create',
          response: {
            instructions: 'Commence cette session vocale maintenant. Salue Trân très brièvement en vietnamien, dis que vous allez pratiquer tranquillement, puis enseigne ou révise UNE seule petite chose adaptée à son niveau A0. Laisse-la répondre immédiatement après.'
          }
        }));
      });
      dc.addEventListener('close', () => stopRealtime(false));

      const offer = await pc.createOffer({ offerToReceiveAudio: true });
      await pc.setLocalDescription(offer);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sdp: offer.sdp, learnerContext: learnerContext() })
      });
      const answer = await response.text();
      if (!response.ok) throw new Error(answer || `HTTP ${response.status}`);

      await pc.setRemoteDescription({ type: 'answer', sdp: answer });
    } catch (error) {
      console.error('Realtime startup failed', error);
      setStatus(`${l.error}${isDebug() ? ` — ${error.message}` : ''}`, 'error');
      stopRealtime(false);
      renderButtons();
    }
  }

  function stopRealtime(update = true) {
    active = false;
    try { dc?.close(); } catch {}
    try { pc?.close(); } catch {}
    try { localStream?.getTracks().forEach(track => track.stop()); } catch {}
    try { remoteAudio?.pause(); remoteAudio?.remove(); } catch {}
    dc = null;
    pc = null;
    localStream = null;
    remoteAudio = null;
    if (update) setStatus(labels().ready, 'idle');
    renderButtons();
  }

  function renderButtons() {
    const start = document.getElementById('realtime-start');
    const stop = document.getElementById('realtime-stop');
    if (start) {
      start.disabled = active;
      start.classList.toggle('hidden', active);
    }
    if (stop) stop.classList.toggle('hidden', !active);
  }

  function goSettingsHint() {
    const note = document.getElementById('realtime-config-note');
    if (note) note.hidden = false;
  }

  function injectStyles() {
    if (document.getElementById('realtime-voice-style')) return;
    const style = document.createElement('style');
    style.id = 'realtime-voice-style';
    style.textContent = `
      .realtime-card{border-color:rgba(85,170,255,.28)!important;overflow:hidden}
      .realtime-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}
      .realtime-badge{font-size:.69rem;padding:5px 8px;border:1px solid #35597d;border-radius:999px;color:#a8c9eb;background:#10263c}
      .realtime-status{padding:10px 12px;border-radius:12px;background:#0b1727;color:#94a8bf;font-size:.82rem;margin:14px 0}
      .realtime-status[data-state="live"]{color:#a8d9be;border:1px solid rgba(77,180,122,.25)}
      .realtime-status[data-state="listening"],.realtime-status[data-state="speaking"]{color:#d9c78f;border:1px solid rgba(218,183,77,.25)}
      .realtime-status[data-state="error"]{color:#efaaaa;border:1px solid rgba(239,100,100,.25)}
      .realtime-actions{display:grid;grid-template-columns:1fr;gap:9px}
      .realtime-actions button{min-height:54px;border-radius:15px;border:0;font-weight:800;cursor:pointer}
      #realtime-start{background:#f4efe6;color:#0a1422}
      #realtime-stop{background:#3a161d;color:#ffbbc1;border:1px solid #7a303b}
      .realtime-transcripts{display:grid;gap:8px;margin-top:14px}
      .realtime-line{padding:11px 12px;border-radius:12px;background:#0d1929}
      .realtime-line small{display:block;color:#7589a2;margin-bottom:4px}
      .realtime-line span{color:#dce6f0;line-height:1.45}
      .realtime-config-card input{width:100%;min-height:48px;border-radius:12px;border:1px solid #354961;background:#0d1929;color:#eef4fb;padding:0 12px;margin:10px 0}
      .realtime-config-card button{min-height:46px;border-radius:12px;border:1px solid #3a5270;background:#14253a;color:#e9f1f9;font-weight:700;padding:0 13px;cursor:pointer}
      .realtime-config-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px}
    `;
    document.head.appendChild(style);
  }

  function injectConversationCard() {
    const conversationCard = document.querySelector('.conversation-card');
    if (!conversationCard || document.getElementById('realtime-card')) return;
    const configured = Boolean(endpoint());
    if (!configured && !isDebug()) return;
    const l = labels();
    const card = document.createElement('section');
    card.id = 'realtime-card';
    card.className = 'card realtime-card';
    card.innerHTML = `
      <div class="realtime-head"><div><span class="realtime-badge">PWA-2 • REALTIME</span><h2>${l.title}</h2></div><span>🎙️</span></div>
      <p>${l.intro}</p>
      <div id="realtime-status" class="realtime-status" data-state="idle">${configured ? l.ready : l.unavailable}</div>
      <div class="realtime-actions">
        <button id="realtime-start" type="button" ${configured ? '' : 'disabled'}>${l.start}</button>
        <button id="realtime-stop" type="button" class="hidden">${l.stop}</button>
      </div>
      <p id="realtime-config-note" class="muted" ${configured ? 'hidden' : ''}>${isDebug() ? 'Configure l’URL du backend Realtime dans Réglages.' : ''}</p>
      <div class="realtime-transcripts">
        <div class="realtime-line"><small>${l.you}</small><span id="realtime-user-transcript">—</span></div>
        <div class="realtime-line"><small>${l.luc}</small><span id="realtime-luc-transcript">—</span></div>
      </div>
    `;
    conversationCard.before(card);
    card.querySelector('#realtime-start')?.addEventListener('click', startRealtime);
    card.querySelector('#realtime-stop')?.addEventListener('click', () => stopRealtime(true));

    const legacy = [...document.querySelectorAll('.quiet')].find(el => /Giọng nói|Voix/.test(el.textContent));
    if (legacy) legacy.classList.add('hidden');
  }

  function injectSettingsCard() {
    if (!isDebug()) return;
    const main = document.querySelector('.content');
    if (!main || document.getElementById('realtime-config-card')) return;
    const diagnosticsHeading = [...main.querySelectorAll('h2')].find(h => ['Chẩn đoán','Diagnostic'].includes(h.textContent.trim()));
    if (!diagnosticsHeading) return;
    const current = endpoint();
    const card = document.createElement('section');
    card.id = 'realtime-config-card';
    card.className = 'card realtime-config-card';
    card.innerHTML = `
      <span class="pill">PWA-2 BACKEND</span>
      <h2>🎙️ OpenAI Realtime</h2>
      <p>Endpoint serveur utilisé par l’iPhone. La clé OpenAI reste exclusivement côté serveur.</p>
      <input id="realtime-endpoint-input" type="url" inputmode="url" placeholder="https://mon-backend.vercel.app/api/realtime" value="${escapeHtml(current)}">
      <div class="realtime-config-actions"><button id="realtime-save-endpoint">Enregistrer</button><button id="realtime-clear-endpoint">Effacer</button></div>
      <p class="muted">Plateforme actuelle : ${isIOS ? 'iPhone / iOS' : 'autre navigateur'} • v${VERSION} Build ${BUILD}</p>
    `;
    const voiceCard = document.getElementById('luc-voice-card');
    if (voiceCard) voiceCard.after(card);
    else diagnosticsHeading.closest('.card').before(card);

    card.querySelector('#realtime-save-endpoint').addEventListener('click', () => {
      const value = card.querySelector('#realtime-endpoint-input').value.trim().replace(/\/$/, '');
      if (value && !/^https:\/\//i.test(value) && !/^http:\/\/localhost/i.test(value)) return alert('Endpoint HTTPS requis.');
      if (value) localStorage.setItem(ENDPOINT_KEY, value); else localStorage.removeItem(ENDPOINT_KEY);
      location.reload();
    });
    card.querySelector('#realtime-clear-endpoint').addEventListener('click', () => {
      localStorage.removeItem(ENDPOINT_KEY);
      location.reload();
    });
  }

  function patchDisplayedVersion() {
    document.querySelectorAll('.diagnostics strong').forEach(el => {
      if (/^v\d+\.\d+\.\d+\s*•\s*Build\s*\d+$/.test(el.textContent.trim())) el.textContent = `v${VERSION} • Build ${BUILD}`;
    });
  }

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function refresh() {
    injectStyles();
    patchDisplayedVersion();
    injectConversationCard();
    injectSettingsCard();
  }

  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; refresh(); });
  });

  const start = () => {
    refresh();
    observer.observe(document.documentElement, { subtree: true, childList: true, characterData: true });
    window.addEventListener('beforeunload', () => stopRealtime(false));
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();

  window.LucRealtime = { start: startRealtime, stop: stopRealtime, endpoint, version: VERSION, build: BUILD, isIOS };
})();
