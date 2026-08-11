(() => {
  'use strict';

  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const params = new URLSearchParams(location.search);
  const smokeMode = params.get('voiceReplaySmoke') === '1';
  const MAX_RECORDING_MS = 15000;
  const START_GUARD_MS = 1400;

  let recorder = null;
  let stream = null;
  let chunks = [];
  let objectUrl = '';
  let activeContext = '';
  let lastContext = '';
  let startedAt = 0;
  let durationMs = 0;
  let sawListeningState = false;
  let stopTimer = 0;
  let startGuardTimer = 0;
  let generation = 0;
  let scheduled = false;
  let lastError = '';

  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const supported = () => Boolean(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);

  function chooseMimeType() {
    if (!window.MediaRecorder?.isTypeSupported) return '';
    const candidates = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4;codecs=mp4a.40.2',
      'audio/mp4'
    ];
    return candidates.find(type => MediaRecorder.isTypeSupported(type)) || '';
  }

  function stopTracks(target = stream) {
    try { target?.getTracks?.().forEach(track => track.stop()); } catch {}
  }

  function revokeRecording() {
    if (objectUrl) {
      try { URL.revokeObjectURL(objectUrl); } catch {}
      objectUrl = '';
    }
  }

  function resetActive() {
    if (stopTimer) clearTimeout(stopTimer);
    if (startGuardTimer) clearTimeout(startGuardTimer);
    stopTimer = 0;
    startGuardTimer = 0;
    stopTracks(stream);
    stream = null;
    recorder = null;
    chunks = [];
    activeContext = '';
    sawListeningState = false;
  }

  function contextButton(context) {
    if (context === 'free') return document.querySelector('#free-voice-mic');
    if (context === 'scenario') return document.querySelector('[data-scenario-mic]');
    return null;
  }

  function isListening(context, button = contextButton(context)) {
    if (!button) return false;
    if (context === 'free') return Boolean(button.disabled);
    if (context === 'scenario') return button.dataset.listening === '1';
    return false;
  }

  function targetForContext(context) {
    if (context === 'free') {
      const card = document.querySelector('#free-voice-card');
      if (!card) return null;
      return card.querySelector('.free-voice-feedback') || card.querySelector('.free-voice-transcript') || card;
    }
    if (context === 'scenario') return document.querySelector('.scenario-runner');
    return null;
  }

  function replayPanel() {
    const panel = document.createElement('aside');
    panel.className = 'voice-replay-panel';
    panel.dataset.voiceReplay = '1';
    panel.innerHTML = `
      <div class="voice-replay-copy">
        <span class="voice-replay-icon">🎧</span>
        <span>
          <strong>${T('Giọng của tôi','Ma voix')}</strong>
          <small>${T('Nghe lại rồi so sánh với Lucie.','Réécoute-toi puis compare avec Lucie.')}</small>
        </span>
      </div>
      <button type="button" class="voice-replay-play" data-voice-replay-play>▶ ${T('Nghe lại','Réécouter')}</button>
      <small class="voice-replay-local">${T('Chỉ giữ trong phiên này trên thiết bị.','Conservé seulement sur cet appareil pendant cette session.')}</small>
    `;
    return panel;
  }

  function injectReplay() {
    if (!objectUrl || !lastContext) return;
    const target = targetForContext(lastContext);
    if (!target) return;
    const existing = target.querySelector('.voice-replay-panel') || target.parentElement?.querySelector?.('.voice-replay-panel');
    if (existing) return;
    const panel = replayPanel();
    if (lastContext === 'free' && target.id !== 'free-voice-card') target.insertAdjacentElement('afterend', panel);
    else target.appendChild(panel);
  }

  function publishRecording(blob, context, elapsed) {
    if (!blob || !blob.size) return;
    revokeRecording();
    objectUrl = URL.createObjectURL(blob);
    lastContext = context;
    durationMs = Math.max(0, Number(elapsed || 0));
    scheduleDecorate();
  }

  async function start(context) {
    if (!supported() || recorder || !context) return false;
    const token = ++generation;
    activeContext = context;
    sawListeningState = false;
    startedAt = Date.now();
    lastError = '';
    try {
      const captured = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      if (token !== generation || activeContext !== context) {
        stopTracks(captured);
        return false;
      }
      stream = captured;
      const mimeType = chooseMimeType();
      const nextRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      chunks = [];
      nextRecorder.ondataavailable = event => { if (event.data?.size) chunks.push(event.data); };
      nextRecorder.onerror = event => { lastError = String(event?.error?.name || event?.error || 'MediaRecorder error'); };
      nextRecorder.onstop = () => {
        const elapsed = Date.now() - startedAt;
        const type = nextRecorder.mimeType || chunks[0]?.type || mimeType || 'audio/mp4';
        const blob = chunks.length ? new Blob(chunks, { type }) : null;
        const recordedContext = context;
        resetActive();
        if (blob?.size) publishRecording(blob, recordedContext, elapsed);
      };
      recorder = nextRecorder;
      recorder.start();
      sawListeningState = isListening(context);
      startGuardTimer = window.setTimeout(() => {
        if (recorder === nextRecorder && activeContext === context && !sawListeningState && !isListening(context)) stop('recognition-not-active');
      }, START_GUARD_MS);
      stopTimer = window.setTimeout(() => stop('timeout'), MAX_RECORDING_MS);
      return true;
    } catch (error) {
      lastError = String(error?.name || error?.message || error || 'capture unavailable');
      if (token === generation) resetActive();
      return false;
    }
  }

  function stop() {
    generation += 1;
    if (stopTimer) clearTimeout(stopTimer);
    if (startGuardTimer) clearTimeout(startGuardTimer);
    stopTimer = 0;
    startGuardTimer = 0;
    const current = recorder;
    if (current && current.state !== 'inactive') {
      try { current.stop(); return; } catch {}
    }
    resetActive();
  }

  function observeListeningLifecycle() {
    if (!activeContext) return;
    const button = contextButton(activeContext);
    const listening = isListening(activeContext, button);
    if (listening) sawListeningState = true;
    if (sawListeningState && !listening) stop('recognition-ended');
  }

  function scheduleDecorate() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      observeListeningLifecycle();
      injectReplay();
    });
  }

  async function playLast() {
    if (!objectUrl) return;
    try {
      const audio = new Audio(objectUrl);
      await audio.play();
    } catch (error) {
      lastError = String(error?.name || error?.message || error || 'playback unavailable');
    }
  }

  document.addEventListener('click', event => {
    const replay = event.target.closest('[data-voice-replay-play]');
    if (replay) {
      event.preventDefault();
      playLast();
      return;
    }

    const mic = event.target.closest('#free-voice-mic,[data-scenario-mic]');
    if (!mic || mic.disabled) return;
    const context = mic.id === 'free-voice-mic' ? 'free' : 'scenario';
    // Best-effort parallel capture. We never block or cancel the validated recognition handler.
    start(context);
  }, true);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && recorder) stop('hidden');
  });
  window.addEventListener('pagehide', () => {
    stop('pagehide');
    revokeRecording();
  });

  const app = document.getElementById('app');
  if (app) new MutationObserver(scheduleDecorate).observe(app, { childList: true, subtree: true, attributes: true, attributeFilter: ['disabled','data-listening'] });

  function installSmoke() {
    if (!smokeMode) return;
    document.documentElement.dataset.voiceReplaySmoke = '1';
    document.documentElement.dataset.voiceReplaySupported = supported() ? '1' : '0';
    const blob = new Blob(['French Tranquille voice replay smoke'], { type: 'audio/mp4' });
    revokeRecording();
    objectUrl = URL.createObjectURL(blob);
    lastContext = 'smoke';
    const mount = () => {
      const shell = document.querySelector('.app-shell');
      if (!shell || shell.querySelector('.voice-replay-panel')) return false;
      const panel = replayPanel();
      panel.dataset.voiceReplaySmokePanel = '1';
      shell.appendChild(panel);
      document.documentElement.dataset.voiceReplayPersistent = '0';
      return true;
    };
    if (!mount() && app) {
      const smokeObserver = new MutationObserver(() => { if (mount()) smokeObserver.disconnect(); });
      smokeObserver.observe(app, { childList: true, subtree: true });
    }
  }

  window.FrenchTranquilleVoiceReplay = {
    supported,
    start,
    stop,
    play: playLast,
    state: () => ({ active: Boolean(recorder), context: activeContext, lastContext, durationMs, hasRecording: Boolean(objectUrl), error: lastError }),
    version: '1.19.1',
    build: '26.1'
  };

  installSmoke();
})();