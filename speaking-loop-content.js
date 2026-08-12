(() => {
  'use strict';

  const VERSION = '1.22.2';
  const BUILD = '29.2';
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const LEARNER_KEY = 'francais-avec-luc:learner:v1';
  const RECENT_LIMIT = 6;
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const esc = (value='') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const supported = Boolean(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);

  let scheduled = false;
  let activeSignature = '';
  let activeLessonKey = '';
  let stream = null;
  let recorder = null;
  let chunks = [];
  let blobUrl = '';
  let playback = null;
  let recording = false;
  let busy = false;
  let stopTimer = null;
  let recentPhrases = [];
  const planCache = new Map();
  const activatedMoments = new Set();

  const root = document.documentElement;
  root.dataset.speakingLoopModule = '1';
  root.dataset.speakingLoopSupported = supported ? '1' : '0';

  const STOP_WORDS = new Set([
    'a','au','aux','avec','c','ce','ces','cet','cette','d','dans','de','des','du','elle','en','est','et','il','j','je','l','la','le','les',
    'ma','mais','me','mes','mon','ne','nous','on','par','pas','pour','qu','que','qui','sa','se','ses','son','sur','ta','te','tes','ton','tu','un','une','vous'
  ]);

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

  function normalizeText(value='') {
    return String(value)
      .toLocaleLowerCase('fr-FR')
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/[’']/g,"'")
      .replace(/[^a-z0-9€'\s-]/g,' ')
      .replace(/\s+/g,' ')
      .trim();
  }

  function words(value='') {
    return normalizeText(value).match(/[a-z0-9€'-]+/g) || [];
  }

  function semanticTokens(value='') {
    return new Set(words(value).filter(word => word.length > 1 && !STOP_WORDS.has(word)));
  }

  function overlapCount(a, b) {
    let count = 0;
    a.forEach(token => { if (b.has(token)) count += 1; });
    return count;
  }

  function wordCount(text='') {
    return words(text).length;
  }

  function isNumericLike(text='') {
    const value = normalizeText(text);
    return /^\d+(?:[.,]\d+)?(?:\s*(?:€|euro|euros))?$/.test(value);
  }

  function isBareUnit(text='') {
    return /^(?:€|euro|euros)$/.test(normalizeText(text));
  }

  function phraseQuality(text='') {
    const value = String(text).trim();
    const count = wordCount(value);
    let score = 0;
    if (count >= 2 && count <= 9) score += 10;
    else if (count === 1) score += 1;
    if (/^(?:je|j['’]|tu|il|elle|nous|vous|on|c['’]est|où|quel|quelle|combien|pourquoi|comment|pouvez-vous|est-ce)\b/i.test(value)) score += 5;
    if (/[?!.]$/.test(value)) score += 3;
    if (value.length >= 8 && value.length <= 72) score += 2;
    if (isNumericLike(value)) score -= 12;
    if (isBareUnit(value)) score -= 10;
    if (value.includes('•')) score -= 12;
    return score;
  }

  function lessonContext(lesson) {
    return [
      lesson?.titleFr, lesson?.shortFr, lesson?.introFr,
      lesson?.challenge?.fr, lesson?.challenge?.answer
    ].filter(Boolean).join(' ');
  }

  function loadLearnerKnownIds() {
    try {
      const parsed = JSON.parse(localStorage.getItem(LEARNER_KEY) || 'null');
      return new Set(Array.isArray(parsed?.knownItems) ? parsed.knownItems : []);
    } catch {
      return new Set();
    }
  }

  function memoryWeights() {
    const weights = new Map();
    try {
      const summary = window.FrenchTranquilleMemory?.summary?.();
      (summary?.solid || []).forEach(entry => weights.set(entry.id, -1));
      (summary?.learning || []).forEach(entry => weights.set(entry.id, Math.max(weights.get(entry.id) || 0, 2)));
      (summary?.due || []).forEach(entry => weights.set(entry.id, Math.max(weights.get(entry.id) || 0, 5)));
      (summary?.fragile || []).forEach(entry => weights.set(entry.id, Math.max(weights.get(entry.id) || 0, 8)));
    } catch {}
    return weights;
  }

  function itemOwners() {
    const owners = new Map();
    (curriculum()?.lessons || []).forEach(lesson => {
      (lesson.items || []).forEach((item, index) => owners.set(item.id, { lesson, index }));
    });
    return owners;
  }

  function candidateForItem(item, source, owner, index=0) {
    return {
      id: item?.id || `${source}:${normalizeText(item?.fr || '')}`,
      text: String(item?.fr || '').trim(),
      source,
      owner,
      index
    };
  }

  function deDupeCandidates(candidates) {
    const seen = new Set();
    return candidates.filter(candidate => {
      const key = normalizeText(candidate?.text || '');
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function relevantKnownCandidates(lesson, knownIds) {
    const core = curriculum();
    if (!core?.items?.length || !knownIds?.size) return [];
    const owners = itemOwners();
    const context = semanticTokens(lessonContext(lesson));
    const currentIds = new Set((lesson.items || []).map(item => item.id));
    const currentNumber = Number(lesson.number || 0);

    return core.items
      .filter(item => knownIds.has(item.id) && !currentIds.has(item.id))
      .map(item => {
        const ownerInfo = owners.get(item.id);
        const ownerNumber = Number(ownerInfo?.lesson?.number || 0);
        const overlap = overlapCount(semanticTokens(item.fr), context);
        const distance = ownerNumber && currentNumber ? Math.abs(currentNumber - ownerNumber) : 99;
        return { ...candidateForItem(item, 'known', ownerInfo?.lesson || null, ownerInfo?.index || 0), overlap, distance };
      })
      .filter(candidate => candidate.owner && Number(candidate.owner.number) < currentNumber && candidate.overlap > 0)
      .sort((a,b) => b.overlap - a.overlap || a.distance - b.distance || a.index - b.index)
      .slice(0, 16);
  }

  function scoreCandidate(candidate, lesson, role, selectedText, memory, recent) {
    const text = candidate.text;
    const normalized = normalizeText(text);
    const context = semanticTokens(lessonContext(lesson));
    const overlap = overlapCount(semanticTokens(text), context);
    const recentSet = new Set((recent || []).map(normalizeText));
    let score = phraseQuality(text) + overlap * (role === 'recap' ? 6 : 4);

    if (candidate.source === 'current') score += role === 'teach' ? 12 : 7;
    if (candidate.source === 'challenge') score += role === 'recap' ? 11 : 0;
    if (candidate.source === 'known') {
      score += 5;
      const distance = Number.isFinite(candidate.distance) ? candidate.distance : 99;
      score += Math.max(0, 6 - distance);
    }

    score += Number(memory.get(candidate.id) || 0);

    if (candidate.source === 'challenge' && isNumericLike(text)) score -= 60;
    if (role === 'recap' && isBareUnit(text)) score -= 18;
    if (selectedText && normalized === normalizeText(selectedText)) score -= 200;
    if (recentSet.has(normalized)) score -= 120;
    return score;
  }

  function chooseCandidate(candidates, lesson, role, selectedText, memory, recent) {
    const unique = deDupeCandidates(candidates).filter(candidate => candidate.text);
    if (!unique.length) return null;
    const selectedNorm = normalizeText(selectedText || '');
    const recentSet = new Set((recent || []).map(normalizeText));
    const preferred = unique.filter(candidate => {
      const normalized = normalizeText(candidate.text);
      return normalized !== selectedNorm && !recentSet.has(normalized);
    });
    const pool = preferred.length ? preferred : unique.filter(candidate => normalizeText(candidate.text) !== selectedNorm);
    const fallback = pool.length ? pool : unique;
    return fallback
      .map(candidate => ({ candidate, score: scoreCandidate(candidate, lesson, role, selectedText, memory, recent) }))
      .sort((a,b) => b.score - a.score || a.candidate.index - b.candidate.index)[0]?.candidate || null;
  }

  function buildPlan(lesson, options={}) {
    if (!lesson?.items?.length) return null;
    const knownIds = options.knownIds instanceof Set
      ? options.knownIds
      : Array.isArray(options.knownIds)
        ? new Set(options.knownIds)
        : loadLearnerKnownIds();
    const recent = Array.isArray(options.recent) ? options.recent : recentPhrases;
    const memory = options.memory instanceof Map ? options.memory : memoryWeights();

    const current = (lesson.items || []).map((item,index) => candidateForItem(item,'current',lesson,index));
    const primary = chooseCandidate(current, lesson, 'teach', '', memory, recent) || current[0];

    const challengeText = String(lesson.challenge?.answer || '').trim();
    const challenge = challengeText ? [{
      id: `${lesson.id}:challenge`,
      text: challengeText,
      source: 'challenge',
      owner: lesson,
      index: 999
    }] : [];
    const known = relevantKnownCandidates(lesson, knownIds);
    const recap = chooseCandidate([...challenge, ...current, ...known], lesson, 'recap', primary?.text || '', memory, recent)
      || current.find(candidate => normalizeText(candidate.text) !== normalizeText(primary?.text || ''))
      || challenge[0]
      || primary;

    return {
      lessonId: lesson.id,
      primaryItemId: primary?.id || null,
      primaryText: primary?.text || '',
      primarySource: primary?.source || 'current',
      recapItemId: recap?.id || null,
      recapText: recap?.text || '',
      recapSource: recap?.source || 'current',
      challengeText,
      maxMoments: 2
    };
  }

  function selectionForLesson(lessonId, options={}) {
    const lesson = curriculum()?.lessons?.find(entry => entry.id === lessonId);
    if (!lesson) return null;
    const explicit = Object.prototype.hasOwnProperty.call(options,'knownIds') || Object.prototype.hasOwnProperty.call(options,'recent') || Object.prototype.hasOwnProperty.call(options,'memory');
    if (explicit) return buildPlan(lesson, options);
    if (!planCache.has(lesson.id)) planCache.set(lesson.id, buildPlan(lesson));
    return planCache.get(lesson.id);
  }

  function coverage() {
    const lessons = curriculum()?.lessons || [];
    const selected = lessons.map(lesson => buildPlan(lesson, { knownIds:new Set(), recent:[], memory:new Map() }));
    return {
      lessons: lessons.length,
      covered: selected.filter(plan => plan?.primaryText && plan?.recapText && normalizeText(plan.primaryText) !== normalizeText(plan.recapText)).length,
      distinct: selected.filter(plan => plan?.primaryText && plan?.recapText && normalizeText(plan.primaryText) !== normalizeText(plan.recapText)).length,
      maxMoments: 2
    };
  }

  function rememberPhrase(phrase) {
    const normalized = normalizeText(phrase);
    if (!normalized) return;
    recentPhrases = recentPhrases.filter(value => normalizeText(value) !== normalized);
    recentPhrases.unshift(String(phrase).trim());
    recentPhrases = recentPhrases.slice(0, RECENT_LIMIT);
    root.dataset.speakingLoopRecentCount = String(recentPhrases.length);
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
    const recap = kind === 'recap';
    return {
      eyebrow: recap ? T('NHỚ LẠI','JE RÉUTILISE') : T('LUYỆN NÓI','JE PARLE'),
      title: recap ? T('Một câu hữu ích trước khi kết thúc','Une phrase utile avant de terminer') : T('Nghe, nói, rồi nghe lại chính mình','Écoute, répète, puis écoute-toi'),
      intro: recap
        ? T('Nghe Tyffany, rồi nói câu này bằng giọng của bạn. Đây là một câu phù hợp với bài học và khác với câu bạn vừa luyện.','Écoute Tyffany, puis dis cette phrase avec ta voix. Elle reste liée à la leçon et évite de répéter la même cible.')
        : T('Dùng nút « 🔊 Nghe Tyffany » của bài ngay phía trên để nghe mẫu, rồi ghi âm giọng của bạn một lần để so sánh.','Utilise « 🔊 Écouter Tyffany » dans l’exercice juste au-dessus pour entendre le modèle, puis enregistre-toi une fois pour comparer.'),
      local: T('Chỉ trên iPhone này • không lưu vào tiến độ','Local uniquement • non sauvegardé dans la progression'),
      model: T('🔊 Nghe Tyffany','🔊 Écouter Tyffany'),
      record: T('🎙️ Ghi âm giọng của tôi','🎙️ Enregistrer ma voix'),
      stop: T('⏹ Dừng ghi âm','⏹ Terminer'),
      play: T('▶ Giọng của tôi','▶ Ma voix'),
      replaying: T('❚❚ Giọng của tôi…','❚❚ Ma voix…'),
      redo: T('↻ Ghi âm lại','↻ Enregistrer à nouveau'),
      unavailable: T('Thiết bị này chưa hỗ trợ ghi âm cục bộ. Bạn vẫn có thể nghe Tyffany và lặp lại.','L’enregistrement local n’est pas disponible ici. Tu peux quand même écouter Tyffany et répéter.'),
      compare: T('Mẹo: nghe nhịp của cả câu trước, rồi chú ý các âm khác nhau.','Astuce : compare d’abord le rythme de toute la phrase, puis les sons qui te semblent différents.')
    };
  }

  function decorateNativeModelButton() {
    const button = document.querySelector('.screen-lesson .lesson-step .french-block .listen[data-speak]');
    if (!button) return false;
    const label = T('🔊 Nghe Tyffany','🔊 Écouter Tyffany');
    const description = T('Tyffany đọc câu mẫu bằng tiếng Pháp. Nghe một lần rồi lặp lại.','Tyffany lit la phrase modèle en français. Écoute une fois puis répète.');
    if (button.textContent !== label) button.textContent = label;
    if (button.getAttribute('aria-label') !== description) button.setAttribute('aria-label', description);
    if (button.getAttribute('title') !== description) button.setAttribute('title', description);
    button.dataset.speakingModelOwner = 'exercise';
    return true;
  }

  function renderPanel(host, phrase, kind, signature, source) {
    let panel = host.querySelector(':scope > .speaking-loop-card');
    if (!panel) {
      panel = document.createElement('section');
      panel.className = 'speaking-loop-card';
      panel.dataset.speakingLoop = kind;
      host.appendChild(panel);
    }
    const l = labels(kind);
    const isPlaying = Boolean(playback && !playback.paused);
    const nativeModel = kind === 'teach' && Boolean(host.querySelector('.french-block .listen[data-speak]'));
    const uiSignature = [signature,source,supported?1:0,recording?1:0,busy?1:0,blobUrl?1:0,isPlaying?1:0,isDebug()?1:0,nativeModel?1:0].join(':');
    if (panel.dataset.signature === uiSignature) return;
    panel.dataset.signature = uiSignature;
    panel.dataset.speakingLoopPhrase = phrase;
    panel.dataset.speakingLoopSource = source || '';
    panel.dataset.speakingLoopModel = nativeModel ? 'exercise' : 'panel';
    panel.innerHTML = `
      <div class="speaking-loop-head">
        <span class="speaking-loop-eyebrow">${esc(l.eyebrow)}</span>
        <h3>${esc(l.title)}</h3>
        <p>${esc(l.intro)}</p>
      </div>
      <div class="speaking-loop-phrase" lang="fr">${esc(phrase)}</div>
      ${!nativeModel ? `<button type="button" class="listen speaking-loop-model" data-speaking-model>${esc(l.model)}</button>` : ''}
      <div class="speaking-loop-actions ${nativeModel ? 'single-model-owner' : ''}">
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
    const plan = selectionForLesson(lesson.id);
    if (!plan) return null;
    const step = document.querySelector('.screen-lesson .lesson-step');
    if (!step) return null;

    const fr = step.querySelector('.french-block .fr')?.textContent?.trim();
    if (fr) {
      const item = lesson.items?.find(entry => String(entry.fr).trim() === fr);
      if (item && plan.primaryItemId && item.id === plan.primaryItemId) {
        return {host:step, phrase:item.fr, kind:'teach', lesson, id:item.id, source:plan.primarySource};
      }
      return null;
    }

    const finalButton = document.querySelector('.screen-lesson [data-next]:not(:disabled)');
    const finalStep = finalButton && /(?:Terminer|Hoàn thành)/i.test(String(finalButton.textContent || ''));
    if (finalStep && plan.recapText) {
      return {host:step, phrase:plan.recapText, kind:'recap', lesson, id:plan.recapItemId || 'recap', source:plan.recapSource};
    }
    return null;
  }

  function cleanupLessonPlanWhenLeaving(lesson) {
    const nextKey = lesson?.id || '';
    if (activeLessonKey && activeLessonKey !== nextKey) planCache.delete(activeLessonKey);
    activeLessonKey = nextKey;
  }

  function decorate() {
    const stats = coverage();
    root.dataset.speakingLoopLessons = String(stats.lessons);
    root.dataset.speakingLoopCovered = String(stats.covered);
    root.dataset.speakingLoopDistinct = String(stats.distinct);
    root.dataset.speakingLoopMaxMoments = String(stats.maxMoments);

    const lesson = currentLesson();
    cleanupLessonPlanWhenLeaving(lesson);
    decorateNativeModelButton();

    const moment = targetMoment();
    if (!moment) {
      document.querySelectorAll('.speaking-loop-card').forEach(panel => panel.remove());
      if (activeSignature) {
        activeSignature = '';
        resetCapture();
      }
      root.dataset.speakingLoopActive = '';
      return;
    }

    const signature = `${moment.lesson.id}:${moment.kind}:${moment.id}:${moment.phrase}`;
    if (signature !== activeSignature) {
      activeSignature = signature;
      resetCapture();
    }
    if (!activatedMoments.has(signature)) {
      activatedMoments.add(signature);
      rememberPhrase(moment.phrase);
    }
    renderPanel(moment.host, moment.phrase, moment.kind, signature, moment.source);
    root.dataset.speakingLoopActive = moment.kind;
    root.dataset.speakingLoopLesson = moment.lesson.id;
    root.dataset.speakingLoopPhrase = moment.phrase;
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
    recentPhrases: () => [...recentPhrases],
    clearRecent: () => { recentPhrases=[]; planCache.clear(); activatedMoments.clear(); schedule(); },
    hasRecording: () => Boolean(blobUrl),
    recording: () => recording,
    reset: () => { activeSignature=''; planCache.clear(); activatedMoments.clear(); resetCapture(); schedule(); }
  };
})();
