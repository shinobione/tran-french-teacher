(() => {
  'use strict';

  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const esc = (value='') => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const supported = Boolean(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);
  const smoke = new URLSearchParams(location.search).get('voiceReplaySmoke') === '1';

  let stream = null;
  let recorder = null;
  let chunks = [];
  let blobUrl = '';
  let audio = null;
  let recording = false;
  let busy = false;
  let scheduled = false;
  let lastPromptSignature = '';
  let stopTimer = null;

  document.documentElement.dataset.voiceReplayModule = '1';
  document.documentElement.dataset.voiceReplaySupported = supported ? '1' : '0';

  function labels() {
    return isDebug() ? {
      record:'🎙️ M’enregistrer pour me réécouter',
      recording:'⏹ Terminer l’enregistrement',
      play:'▶ Réécouter ma voix',
      replaying:'❚❚ Ma voix…',
      redo:'↻ Refaire',
      note:'Local uniquement • non sauvegardé',
      unavailable:'Réécoute locale indisponible sur ce navigateur.',
      hint:'Répète la même réponse une fois : cette prise sert seulement à t’écouter.',
      wait:'La reconnaissance termine son écoute… une seconde.'
    } : {
      record:'🎙️ Ghi âm để nghe lại giọng của mình',
      recording:'⏹ Dừng ghi âm',
      play:'▶ Nghe lại giọng của mình',
      replaying:'❚❚ Giọng của mình…',
      redo:'↻ Ghi lại',
      note:'Chỉ trên thiết bị này • không lưu',
      unavailable:'Trình duyệt này chưa hỗ trợ nghe lại giọng cục bộ.',
      hint:'Hãy lặp lại cùng câu một lần. Bản ghi này chỉ để bạn tự nghe.',
      wait:'Nhận dạng giọng nói đang kết thúc… chờ một chút.'
    };
  }

  function promptSignature(card) {
    const prompt = card?.querySelector('.free-voice-prompt');
    return prompt ? prompt.textContent.replace(/\s+/g,' ').trim() : '';
  }

  function recognitionBusy(card) {
    return Boolean(card?.querySelector('#free-voice-mic')?.disabled);
  }

  function clearAudio() {
    if (audio) {
      try { audio.pause(); } catch {}
      audio = null;
    }
    if (blobUrl) {
      try { URL.revokeObjectURL(blobUrl); } catch {}
      blobUrl = '';
    }
  }

  function stopTracks() {
    if (stream) {
      stream.getTracks().forEach(track => {
        try { track.stop(); } catch {}
      });
      stream = null;
    }
  }

  function cleanupRecorder() {
    clearTimeout(stopTimer);
    stopTimer = null;
    recorder = null;
    recording = false;
    busy = false;
    stopTracks();
    schedule();
  }

  function preferredMimeType() {
    if (!window.MediaRecorder?.isTypeSupported) return '';
    return ['audio/mp4','audio/webm;codecs=opus','audio/webm'].find(type => MediaRecorder.isTypeSupported(type)) || '';
  }

  async function startRecording() {
    if (!supported || busy || recording) return;
    const card = document.getElementById('free-voice-card');
    if (!card || !card.querySelector('.free-voice-result') || recognitionBusy(card)) return;

    busy = true;
    clearAudio();
    schedule();

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        },
        video: false
      });

      chunks = [];
      const mimeType = preferredMimeType();
      recorder = mimeType ? new MediaRecorder(stream,{mimeType}) : new MediaRecorder(stream);

      recorder.ondataavailable = event => {
        if (event.data?.size) chunks.push(event.data);
      };

      recorder.onerror = () => {
        chunks = [];
        cleanupRecorder();
      };

      recorder.onstop = () => {
        const type = recorder?.mimeType || mimeType || 'audio/mp4';
        const blob = chunks.length ? new Blob(chunks,{type}) : null;
        chunks = [];
        if (blob?.size) blobUrl = URL.createObjectURL(blob);
        cleanupRecorder();
      };

      recorder.start(120);
      recording = true;
      busy = false;
      document.documentElement.dataset.voiceReplayRecording = '1';
      stopTimer = setTimeout(stopRecording, 9000);
      schedule();
    } catch (error) {
      console.warn('[French Trân’quille] local voice replay unavailable', error);
      document.documentElement.dataset.voiceReplayCaptureError = String(error?.name || 'capture-error');
      chunks = [];
      cleanupRecorder();
    }
  }

  function stopRecording() {
    if (!recorder || recorder.state === 'inactive') {
      cleanupRecorder();
      return;
    }
    busy = true;
    try { recorder.stop(); }
    catch { cleanupRecorder(); }
    document.documentElement.dataset.voiceReplayRecording = '0';
    schedule();
  }

  function playRecording() {
    if (!blobUrl) return;
    if (audio) {
      try { audio.pause(); audio.currentTime = 0; } catch {}
    }
    audio = new Audio(blobUrl);
    audio.addEventListener('play',schedule,{once:true});
    audio.addEventListener('ended',()=>{ audio = null; schedule(); },{once:true});
    audio.addEventListener('error',()=>{ audio = null; schedule(); },{once:true});
    audio.play().catch(()=>{ audio = null; schedule(); });
  }

  function resetForPrompt(nextSignature) {
    if (nextSignature === lastPromptSignature) return;
    lastPromptSignature = nextSignature;
    if (recording) stopRecording();
    clearAudio();
  }

  function render() {
    const card = document.getElementById('free-voice-card');
    if (!card) return;

    resetForPrompt(promptSignature(card));
    let panel = card.querySelector('.voice-replay-panel');
    const result = card.querySelector('.free-voice-result');

    if (!result) {
      panel?.remove();
      return;
    }

    if (!panel) {
      panel = document.createElement('section');
      panel.className = 'voice-replay-panel';
      panel.dataset.voiceReplay = '1';
      result.insertAdjacentElement('afterend',panel);
    }

    const l = labels();
    const isPlaying = Boolean(audio && !audio.paused);
    const waitingForRecognition = recognitionBusy(card) && !recording && !blobUrl;
    const signature = [supported?1:0,recording?1:0,busy?1:0,blobUrl?1:0,isPlaying?1:0,waitingForRecognition?1:0,isDebug()?1:0].join(':');
    if (panel.dataset.signature === signature) return;
    panel.dataset.signature = signature;

    if (!supported) {
      panel.innerHTML = `<small>${esc(l.unavailable)}</small>`;
      return;
    }

    const note = blobUrl ? l.note : waitingForRecognition ? l.wait : l.hint;
    panel.innerHTML = `
      <div class="voice-replay-copy">
        <strong>🎧 ${esc(T('Nghe lại chính mình','Écoute-toi'))}</strong>
        <small>${esc(note)}</small>
      </div>
      <div class="voice-replay-actions">
        ${recording
          ? `<button class="voice-replay-stop" data-voice-replay-stop>${esc(l.recording)}</button>`
          : blobUrl
            ? `<button class="voice-replay-play primary" data-voice-replay-play ${isPlaying?'disabled':''}>${esc(isPlaying?l.replaying:l.play)}</button><button class="voice-replay-redo secondary" data-voice-replay-record>${esc(l.redo)}</button>`
            : `<button class="voice-replay-record secondary" data-voice-replay-record ${busy||waitingForRecognition?'disabled':''}>${esc(l.record)}</button>`}
      </div>`;

    panel.querySelector('[data-voice-replay-record]')?.addEventListener('click',startRecording);
    panel.querySelector('[data-voice-replay-stop]')?.addEventListener('click',stopRecording);
    panel.querySelector('[data-voice-replay-play]')?.addEventListener('click',playRecording);
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      render();
    });
  }

  function runSmoke() {
    if (!smoke) return;
    setTimeout(() => {
      document.querySelector('[data-ux-nav="practice"]')?.click();
      setTimeout(() => {
        document.querySelector('[data-session-practice-mode="voice"]')?.click();
        setTimeout(() => {
          const card = document.getElementById('free-voice-card');
          if (!card) {
            document.documentElement.dataset.voiceReplaySmokeCard = '0';
            return;
          }
          document.documentElement.dataset.voiceReplaySmokeCard = '1';
          if (!card.querySelector('.free-voice-result')) {
            const fake = document.createElement('div');
            fake.className = 'free-voice-result';
            fake.dataset.voiceReplaySmokeResult = '1';
            fake.innerHTML = '<small>Smoke</small><br><strong>Bonjour</strong>';
            card.appendChild(fake);
          }
          render();
          document.documentElement.dataset.voiceReplaySmokePanel = card.querySelector('.voice-replay-panel') ? '1' : '0';
          document.documentElement.dataset.voiceReplaySmokeSupported = supported ? '1' : '0';
        },280);
      },240);
    },220);
  }

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
  window.addEventListener('pagehide',()=>{
    if (recording) stopRecording();
    clearAudio();
    stopTracks();
  });

  schedule();
  runSmoke();

  window.FrenchTranquilleVoiceReplay = {
    version:'1.19.1',
    build:'26.1',
    supported,
    recording:()=>recording,
    hasRecording:()=>Boolean(blobUrl),
    reset(){ clearAudio(); schedule(); }
  };
})();