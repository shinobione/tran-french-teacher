(() => {
  'use strict';

  if (window.FrenchTranquilleFieldAudioSession) return;

  const root = document.documentElement;
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const supported = Boolean(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);
  const T = (vi, fr) => localStorage.getItem(DEBUG_KEY) === '1' ? fr : vi;
  const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[c]));

  let captureSeq = 0;
  let pending = false;
  let session = null;
  let blobUrl = '';
  let playback = null;
  let activeSignature = '';
  let lastError = '';
  let scheduled = false;

  root.dataset.fieldAudioModule = '2';
  root.dataset.fieldAudioSupported = supported ? '1' : '0';

  function card() {
    return document.querySelector('.screen-lesson .speaking-loop-card');
  }

  function signatureFor(panel) {
    if (!panel) return '';
    const lesson = document.querySelector('.screen-lesson .topbar h1')?.textContent?.trim() || '';
    const kind = panel.dataset.speakingLoop || '';
    const phrase = panel.dataset.speakingLoopPhrase || '';
    return `${lesson}|${kind}|${phrase}`;
  }

  function stopTracks(stream) {
    stream?.getTracks?.().forEach(track => {
      try { track.stop(); } catch {}
    });
  }

  function clearPlayback() {
    if (playback) {
      try { playback.pause(); } catch {}
      playback = null;
    }
    if (blobUrl) {
      try { URL.revokeObjectURL(blobUrl); } catch {}
      blobUrl = '';
    }
  }

  function telemetry(s, phase) {
    root.dataset.fieldAudioPhase = phase;
    root.dataset.fieldAudioToken = String(s?.token || 0);
    root.dataset.fieldAudioEvents = String(s?.events || 0);
    root.dataset.fieldAudioBytes = String(s?.bytes || 0);
  }

  function errorText() {
    if (lastError === 'no-data') {
      return T(
        '⚠️ Không nhận được dữ liệu âm thanh. Hãy thử ghi lại một lần.',
        '⚠️ Aucun audio n’a été reçu. Essaie une nouvelle prise.'
      );
    }
    if (lastError === 'capture') {
      return T(
        '⚠️ Không thể mở bản ghi cục bộ. Hãy thử lại.',
        '⚠️ Impossible de démarrer l’enregistrement local. Réessaie.'
      );
    }
    if (lastError === 'recorder') {
      return T(
        '⚠️ Bản ghi bị gián đoạn. Hãy thử lại.',
        '⚠️ L’enregistrement a été interrompu. Réessaie.'
      );
    }
    return '';
  }

  function labels() {
    return {
      record: T('🎙️ Ghi âm giọng của tôi', '🎙️ Enregistrer ma voix'),
      stop: T('⏹ Dừng ghi âm', '⏹ Terminer'),
      stopping: T('… Đang hoàn tất bản ghi', '… Finalisation de la prise'),
      play: T('▶ Giọng của tôi', '▶ Ma voix'),
      playing: T('❚❚ Giọng của tôi…', '❚❚ Ma voix…'),
      redo: T('↻ Ghi âm lại', '↻ Enregistrer à nouveau'),
      local: T('Chỉ trên iPhone này • không lưu vào tiến độ', 'Local uniquement • non sauvegardé dans la progression'),
      ready: T('Bản ghi đã sẵn sàng để nghe lại.', 'La prise est prête à être réécoutée.'),
      unavailable: T('Thiết bị này chưa hỗ trợ ghi âm cục bộ.', 'L’enregistrement local n’est pas disponible sur cet appareil.')
    };
  }

  function ensureFieldActions(panel) {
    if (!panel) return null;
    const legacy = panel.querySelector('.speaking-loop-actions');
    if (legacy) {
      legacy.hidden = true;
      legacy.setAttribute('aria-hidden', 'true');
    }

    let host = panel.querySelector('.field-speaking-audio');
    if (!host) {
      host = document.createElement('div');
      host.className = 'field-speaking-audio';
      if (legacy) legacy.insertAdjacentElement('afterend', host);
      else panel.appendChild(host);
    }
    return host;
  }

  function render() {
    const panel = card();
    if (!panel) {
      if (session) cancelSession(session, 'panel-left');
      return;
    }

    const signature = signatureFor(panel);
    if (activeSignature && signature !== activeSignature) {
      if (session) cancelSession(session, 'moment-changed');
      clearPlayback();
      lastError = '';
    }
    activeSignature = signature;

    const host = ensureFieldActions(panel);
    if (!host) return;
    const l = labels();
    const isPlaying = Boolean(playback && !playback.paused);
    const current = session?.signature === signature ? session : null;
    const state = current?.status || (pending ? 'pending' : blobUrl ? 'ready' : 'idle');
    const sig = [state, blobUrl ? 1 : 0, isPlaying ? 1 : 0, lastError, supported ? 1 : 0, signature].join(':');
    if (host.dataset.signature === sig) return;
    host.dataset.signature = sig;

    let buttons = '';
    if (!supported) {
      buttons = '';
    } else if (state === 'recording') {
      buttons = `<button type="button" class="speaking-loop-stop" data-field-audio-stop>${esc(l.stop)}</button>`;
    } else if (state === 'stopping' || state === 'pending') {
      buttons = `<button type="button" class="speaking-loop-stop" disabled>${esc(l.stopping)}</button>`;
    } else if (blobUrl) {
      buttons = `<button type="button" class="speaking-loop-own primary" data-field-audio-play ${isPlaying ? 'disabled' : ''}>${esc(isPlaying ? l.playing : l.play)}</button><button type="button" class="speaking-loop-redo" data-field-audio-record>${esc(l.redo)}</button>`;
    } else {
      buttons = `<button type="button" class="speaking-loop-record primary" data-field-audio-record>${esc(l.record)}</button>`;
    }

    const note = !supported ? l.unavailable : errorText() || (blobUrl ? l.ready : l.local);
    host.innerHTML = `<div class="speaking-loop-actions field-speaking-actions">${buttons}</div><small class="speaking-loop-note field-speaking-note">${esc(note)}</small>`;
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      render();
    });
  }

  async function startRecording(panel) {
    if (!supported || pending || session) return;
    const signature = signatureFor(panel);
    if (!signature) return;

    clearPlayback();
    lastError = '';
    pending = true;
    root.dataset.fieldAudioError = '';
    schedule();

    const token = ++captureSeq;
    let stream = null;
    try {
      // Keep the capture request deliberately simple on iOS. Let Safari choose
      // its native audio format instead of forcing a MIME type.
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      if (token !== captureSeq || signatureFor(card()) !== signature) {
        stopTracks(stream);
        pending = false;
        schedule();
        return;
      }

      const recorder = new MediaRecorder(stream);
      const s = {
        token,
        signature,
        stream,
        recorder,
        chunks: [],
        bytes: 0,
        events: 0,
        status: 'recording',
        publish: true,
        timer: null
      };
      session = s;
      pending = false;

      recorder.addEventListener('dataavailable', event => {
        s.events += 1;
        if (event.data?.size) {
          s.chunks.push(event.data);
          s.bytes += Number(event.data.size || 0);
        }
        telemetry(s, 'data');
      });

      recorder.addEventListener('error', () => {
        lastError = 'recorder';
        root.dataset.fieldAudioError = 'recorder';
        s.publish = false;
        finishSession(s, null, 'error');
      }, { once: true });

      recorder.addEventListener('stop', () => {
        // dataavailable is specified before stop; one task gives WebKit any
        // final queued Blob event a chance to land before we assemble the take.
        setTimeout(() => finalizeSession(s), 0);
      }, { once: true });

      recorder.start();
      telemetry(s, 'recording');
      root.dataset.fieldAudioStarted = String(Number(root.dataset.fieldAudioStarted || 0) + 1);
      s.timer = setTimeout(() => stopRecording(s), 9000);
      schedule();
    } catch (error) {
      stopTracks(stream);
      pending = false;
      lastError = 'capture';
      root.dataset.fieldAudioError = String(error?.name || 'capture');
      root.dataset.fieldAudioPhase = 'capture-error';
      schedule();
    }
  }

  function stopRecording(s = session) {
    if (!s || s !== session) return;
    if (s.status === 'stopping') return;
    s.status = 'stopping';
    clearTimeout(s.timer);
    s.timer = null;
    telemetry(s, 'stop-requested');
    root.dataset.fieldAudioStopRequested = String(Number(root.dataset.fieldAudioStopRequested || 0) + 1);
    schedule();

    try {
      if (s.recorder.state === 'recording' && typeof s.recorder.requestData === 'function') s.recorder.requestData();
    } catch {}

    // WebKit can deliver the requestData chunk asynchronously. Do not call
    // stop() in the very same stack frame.
    setTimeout(() => {
      try {
        if (s.recorder.state !== 'inactive') s.recorder.stop();
        else finalizeSession(s);
      } catch {
        lastError = 'recorder';
        root.dataset.fieldAudioError = 'stop';
        finishSession(s, null, 'stop-error');
      }
    }, 80);
  }

  function finalizeSession(s) {
    if (!s || s.finalized) return;
    s.finalized = true;
    clearTimeout(s.timer);
    s.timer = null;

    const type = s.recorder?.mimeType || s.chunks.find(chunk => chunk?.type)?.type || 'audio/mp4';
    const blob = s.bytes > 0 && s.chunks.length ? new Blob(s.chunks, { type }) : null;
    root.dataset.fieldAudioBlobBytes = String(blob?.size || 0);
    telemetry(s, blob?.size ? 'blob-ready' : 'no-data');

    if (!s.publish || signatureFor(card()) !== s.signature) {
      finishSession(s, null, 'discarded');
      return;
    }

    if (!blob?.size) {
      lastError = 'no-data';
      root.dataset.fieldAudioError = 'no-data';
      finishSession(s, null, 'no-data');
      return;
    }

    clearPlayback();
    blobUrl = URL.createObjectURL(blob);
    lastError = '';
    root.dataset.fieldAudioCompleted = String(Number(root.dataset.fieldAudioCompleted || 0) + 1);
    finishSession(s, blob, 'ready');
  }

  function finishSession(s, blob, phase) {
    clearTimeout(s?.timer);
    stopTracks(s?.stream);
    if (session === s) session = null;
    telemetry(s, phase);
    schedule();
    return blob;
  }

  function cancelSession(s, reason) {
    if (!s) return;
    s.publish = false;
    clearTimeout(s.timer);
    s.timer = null;
    root.dataset.fieldAudioCancelled = reason;
    try {
      if (s.recorder?.state !== 'inactive') s.recorder.stop();
    } catch {}
    stopTracks(s.stream);
    if (session === s) session = null;
    schedule();
  }

  function playRecording() {
    if (!blobUrl) return;
    if (playback) {
      try { playback.pause(); } catch {}
      playback = null;
    }
    playback = new Audio(blobUrl);
    playback.addEventListener('ended', () => { playback = null; schedule(); }, { once: true });
    playback.addEventListener('error', () => { playback = null; schedule(); }, { once: true });
    playback.play().then(schedule).catch(() => { playback = null; schedule(); });
    schedule();
  }

  function handleClick(event) {
    const target = event.target?.closest?.(
      '.speaking-loop-card [data-speaking-record], .speaking-loop-card [data-speaking-stop], .speaking-loop-card [data-speaking-play], [data-field-audio-record], [data-field-audio-stop], [data-field-audio-play]'
    );
    if (!target) return;
    const panel = target.closest('.speaking-loop-card');
    if (!panel) return;

    // Bypass the historical recorder handlers. Their UI remains the lesson
    // content host, but capture ownership belongs to this field-safe session.
    event.preventDefault();
    event.stopImmediatePropagation();

    if (target.matches('[data-speaking-stop], [data-field-audio-stop]')) stopRecording();
    else if (target.matches('[data-speaking-play], [data-field-audio-play]')) playRecording();
    else startRecording(panel);
  }

  window.addEventListener('click', handleClick, true);

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app, { childList: true, subtree: true });
  window.addEventListener('pagehide', () => {
    if (session) cancelSession(session, 'pagehide');
    clearPlayback();
  });

  schedule();

  window.FrenchTranquilleFieldAudioSession = Object.freeze({
    version: '2.3.1',
    build: '34.1',
    supported,
    recording: () => Boolean(session?.status === 'recording'),
    stopping: () => Boolean(session?.status === 'stopping'),
    hasRecording: () => Boolean(blobUrl),
    state: () => ({
      pending,
      status: session?.status || (blobUrl ? 'ready' : 'idle'),
      events: session?.events || 0,
      bytes: session?.bytes || 0,
      error: lastError
    })
  });
})();
