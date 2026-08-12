(() => {
  'use strict';

  const VERSION = '1.22.1';
  const BUILD = '29.1';
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const esc = (value='') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const supported = Boolean(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);

  let scheduled = false;
  let activeSignature = '';
  let stream = null;
  let recorder = null;
  let chunks = [];
  let blobUrl = '';
  let playback = null;
  let recording = false;
  let busy = false;
  let stopTimer = null;

  const root = document.documentElement;
  root.dataset.speakingLoopModule = '1';
  root.dataset.speakingLoopSupported = supported ? '1' : '0';

  function curriculum() {
    return window.FrenchTranquilleCurriculum || null;
  }

  function currentLesson() {
    const core = curriculum();
    if (!core?.lessons?.length) return null;
    const heading = document.querySelector('.screen-lesson .topbar h1');
    const number = Number(heading?.textContent?.match(/\d+/)?.[0] || 0);
    return core.lessons.find(lesson => Number(lesson.number) === number) || null;
  }

  function itemScore(item, lesson) {
    const text = String(item?.fr || '').trim();
    if (!text) return -1000;
    let score = 0;
    if (text === String(lesson?.challenge?.answer || '').trim()) score += 20;
    if (/^(je|j['’]|tu|il|elle|nous|vous|on|c['’]est|où|quel|quelle|combien|pourquoi|comment|mon|ma|mes)\b/i.test(text)) score += 7;
    if (/[?!.]$/.test(text)) score += 4;
    if ((text.match(/\s+/g) || []).length >= 1) score += 5;
    if ((text.match(/\s+/g) || []).length >= 2) score += 2;
    if (/['’]/.test(text)) score += 2;
    if (text.length >= 8 && text.length <= 64) score += 2;
    if (text.includes('•')) score -= 8;
    return score;
  }

  function primaryItemForLesson(lesson) {
    if (!lesson?.items?.length) return null;
    return [...lesson.items]
      .map((item, index) => ({item, index, score:itemScore(item, lesson)}))
      .sort((a,b) => b.score - a.score || a.index - b.index)[0]?.item || lesson.items[0];
  }

  function selectionForLesson(lessonId) {
    const lesson = curriculum()?.lessons?.find(entry => entry.id === lessonId);
    if (!lesson) return null;
    const primary = primaryItemForLesson(lesson);
    return {
      lessonId: lesson.id,
      primaryItemId: primary?.id || null,
      primaryText: primary?.fr || '',
      challengeText: String(lesson.challenge?.answer || '').trim(),
      maxMoments: 2
    };
  }

  function coverage() {
    const lessons = curriculum()?.lessons || [];
    const selected = lessons.map(lesson => selectionForLesson(lesson.id));
    return {
      lessons: lessons.length,
      covered: selected.filter(x => x?.primaryText && x?.challengeText).length,
      maxMoments: 2
    };
  }

  function stopTracks() {
    if (!stream) return;
    stream.getTracks().forEach(track => { try { track.stop(); } catch {} });
    stream = null;
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

  function resetCapture() {
    clearTimeout(stopTimer);
    stopTimer = null;
    if (recorder && recorder.state !== 'inactive') {
      try { recorder.stop(); } catch {}
    }
    recorder = null;
    chunks = [];
    recording = false;
    busy = false;
    stopTracks();
    clearPlayback();
  }

  function preferredMimeType() {
    if (!window.MediaRecorder?.isTypeSupported) return '';
    return ['audio/mp4','audio/webm;codecs=opus','audio/webm'].find(type => MediaRecorder.isTypeSupported(type)) || '';
  }

  function speakModel(text) {
    if (!text || !('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) return;
    try { speechSynthesis.cancel(); } catch {}
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    speechSynthesis.speak(utterance);
  }

  async function startRecording() {
    if (!supported || busy || recording) return;
    busy = true;
    clearPlayback();
    schedule();
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation:true, noiseSuppression:true, autoGainControl:true },
        video: false
      });
      chunks = [];
      const mimeType = preferredMimeType();
      recorder = mimeType ? new MediaRecorder(stream,{mimeType}) : new MediaRecorder(stream);
      recorder.ondataavailable = event => { if (event.data?.size) chunks.push(event.data); };
      recorder.onerror = () => { resetCapture(); schedule(); };
      recorder.onstop = () => {
        const type = recorder?.mimeType || mimeType || 'audio/mp4';
        const blob = chunks.length ? new Blob(chunks,{type}) : null;
        chunks = [];
        if (blob?.size) blobUrl = URL.createObjectURL(blob);
        recorder = null;
        recording = false;
        busy = false;
        clearTimeout(stopTimer);
        stopTimer = null;
        stopTracks();
        root.dataset.speakingLoopRecording = '0';
        schedule();
      };
      recorder.start(120);
      recording = true;
      busy = false;
      root.dataset.speakingLoopRecording = '1';
      stopTimer = setTimeout(stopRecording, 9000);
      schedule();
    } catch (error) {
      root.dataset.speakingLoopCaptureError = String(error?.name || 'capture-error');
      resetCapture();
      schedule();
    }
  }

  function stopRecording() {
    if (!recorder || recorder.state === 'inactive') {
      recording = false;
      busy = false;
      stopTracks();
      schedule();
      return;
    }
    busy = true;
    try { recorder.stop(); } catch { resetCapture(); }
    schedule();
  }

  function playOwnVoice() {
    if (!blobUrl) return;
    if (playback) {
      try { playback.pause(); } catch {}
      playback = null;
    }
    playback = new Audio(blobUrl);
    playback.addEventListener('ended', () => { playback = null; schedule(); }, {once:true});
    playback.addEventListener('error', () => { playback = null; schedule(); }, {once:true});
    playback.play().then(schedule).catch(() => { playback = null; schedule(); });
  }

  function labels(kind) {
    const challenge = kind === 'challenge';
    return {
      eyebrow: challenge ? T('NÓI THẬT','JE LE DIS MAINTENANT') : T('LUYỆN NÓI','JE PARLE'),
      title: challenge ? T('Nói câu này bằng giọng của bạn','Dis cette phrase avec ta voix') : T('Nghe, nói, rồi nghe lại chính mình','Écoute, répète, puis écoute-toi'),
      intro: T('Nghe Tyffany một lần. Sau đó ghi âm giọng của bạn và nghe hai giọng cạnh nhau. Không có điểm phát âm giả — bạn chỉ nghe và so sánh.','Écoute Tyffany une fois. Puis enregistre ta voix et écoute les deux l’une après l’autre. Aucun faux score de prononciation : tu écoutes et tu compares.'),
      local: T('Chỉ trên iPhone này • không lưu vào tiến độ','Local uniquement • non sauvegardé dans la progression'),
      model: T('🔊 Nghe Tyffany','🔊 Tyffany'),
      record: T('🎙️ Ghi âm giọng của tôi','🎙️ Enregistrer ma voix'),
      stop: T('⏹ Dừng ghi âm','⏹ Terminer'),
      play: T('▶ Giọng của tôi','▶ Ma voix'),
      replaying: T('❚❚ Giọng của tôi…','❚❚ Ma voix…'),
      redo: T('↻ Ghi lại','↻ Refaire'),
      unavailable: T('Thiết bị này chưa hỗ trợ ghi âm cục bộ. Bạn vẫn có thể nghe Tyffany và lặp lại.','L’enregistrement local n’est pas disponible ici. Tu peux quand même écouter Tyffany et répéter.'),
      compare: T('Mẹo: nghe nhịp của cả câu trước, rồi chú ý các âm khác nhau.','Astuce : compare d’abord le rythme de toute la phrase, puis les sons qui te semblent différents.')
    };
  }

  function renderPanel(host, phrase, kind, signature) {
    let panel = host.querySelector(':scope > .speaking-loop-card');
    if (!panel) {
      panel = document.createElement('section');
      panel.className = 'speaking-loop-card';
      panel.dataset.speakingLoop = kind;
      host.appendChild(panel);
    }
    const l = labels(kind);
    const isPlaying = Boolean(playback && !playback.paused);
    const uiSignature = [signature,supported?1:0,recording?1:0,busy?1:0,blobUrl?1:0,isPlaying?1:0,isDebug()?1:0].join(':');
    if (panel.dataset.signature === uiSignature) return;
    panel.dataset.signature = uiSignature;
    panel.dataset.speakingLoopPhrase = phrase;
    panel.innerHTML = `
      <div class="speaking-loop-head">
        <span class="speaking-loop-eyebrow">${esc(l.eyebrow)}</span>
        <h3>${esc(l.title)}</h3>
        <p>${esc(l.intro)}</p>
      </div>
      <div class="speaking-loop-phrase" lang="fr">${esc(phrase)}</div>
      <div class="speaking-loop-actions">
        <button type="button" class="speaking-loop-model" data-speaking-model>${esc(l.model)}</button>
        ${supported ? (recording
          ? `<button type="button" class="speaking-loop-stop" data-speaking-stop>${esc(l.stop)}</button>`
          : blobUrl
            ? `<button type="button" class="speaking-loop-own primary" data-speaking-play ${isPlaying?'disabled':''}>${esc(isPlaying?l.replaying:l.play)}</button><button type="button" class="speaking-loop-redo" data-speaking-record>${esc(l.redo)}</button>`
            : `<button type="button" class="speaking-loop-record primary" data-speaking-record ${busy?'disabled':''}>${esc(l.record)}</button>`)
          : ''}
      </div>
      <small class="speaking-loop-note">${esc(supported ? (blobUrl ? l.compare : l.local) : l.unavailable)}</small>`;

    panel.querySelector('[data-speaking-model]')?.addEventListener('click', () => speakModel(phrase));
    panel.querySelector('[data-speaking-record]')?.addEventListener('click', startRecording);
    panel.querySelector('[data-speaking-stop]')?.addEventListener('click', stopRecording);
    panel.querySelector('[data-speaking-play]')?.addEventListener('click', playOwnVoice);
  }

  function targetMoment() {
    const lesson = currentLesson();
    if (!lesson) return null;
    const step = document.querySelector('.screen-lesson .lesson-step');
    if (!step) return null;

    const fr = step.querySelector('.french-block .fr')?.textContent?.trim();
    if (fr) {
      const item = lesson.items?.find(entry => String(entry.fr).trim() === fr);
      const primary = primaryItemForLesson(lesson);
      if (item && primary && item.id === primary.id) {
        return {host:step, phrase:item.fr, kind:'teach', lesson, id:item.id};
      }
      return null;
    }

    const correctChallenge = step.querySelector('.quiz .feedback.ok');
    if (correctChallenge && lesson.challenge?.answer) {
      return {host:step, phrase:lesson.challenge.answer, kind:'challenge', lesson, id:'challenge'};
    }
    return null;
  }

  function decorate() {
    const stats = coverage();
    root.dataset.speakingLoopLessons = String(stats.lessons);
    root.dataset.speakingLoopCovered = String(stats.covered);
    root.dataset.speakingLoopMaxMoments = String(stats.maxMoments);

    const moment = targetMoment();
    if (!moment) {
      document.querySelectorAll('.speaking-loop-card').forEach(panel => panel.remove());
      if (activeSignature) {
        activeSignature = '';
        resetCapture();
      }
      return;
    }

    const signature = `${moment.lesson.id}:${moment.id}:${moment.phrase}`;
    if (signature !== activeSignature) {
      activeSignature = signature;
      resetCapture();
    }
    renderPanel(moment.host, moment.phrase, moment.kind, signature);
    root.dataset.speakingLoopActive = moment.kind;
    root.dataset.speakingLoopLesson = moment.lesson.id;
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      decorate();
    });
  }

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
  window.addEventListener('pagehide', resetCapture);
  schedule();

  window.FrenchTranquilleSpeakingLoop = {
    version: VERSION,
    build: BUILD,
    supported,
    refresh: decorate,
    selectionForLesson,
    coverage,
    hasRecording: () => Boolean(blobUrl),
    recording: () => recording,
    reset: () => { activeSignature=''; resetCapture(); schedule(); }
  };
})();