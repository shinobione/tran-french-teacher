const MASTERY_CURRICULUM = window.FrenchTranquilleCurriculum;

if (MASTERY_CURRICULUM) {
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const LEARNER_KEY = MASTERY_CURRICULUM.key;
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const STAGES = [
    { id:'survival-a0', from:1, to:7, icon:'🛟', vi:'Sinh tồn A0', fr:'Survie A0', targetVi:'Chào hỏi, hiểu câu cứu nguy, gọi món và xử lý những nhu cầu rất cơ bản.', targetFr:'Saluer, utiliser les phrases de secours, commander et gérer des besoins très simples.' },
    { id:'daily-a0', from:8, to:15, icon:'🏙️', vi:'Đời sống A0', fr:'Vie quotidienne A0', targetVi:'Di chuyển, mua sắm, ăn uống, sức khỏe, gia đình và những giờ đầu ở Pháp.', targetFr:'Se déplacer, acheter, manger, gérer la santé, les proches et les premières heures en France.' },
    { id:'foundations-a1', from:16, to:20, icon:'🧩', vi:'Nền tảng A1', fr:'Fondations A1', targetVi:'Bắt đầu tạo câu với être, avoir, vouloir, pouvoir và il y a.', targetFr:'Commencer à construire avec être, avoir, vouloir, pouvoir et il y a.' },
    { id:'exchange-a1', from:21, to:25, icon:'💬', vi:'Trao đổi đầu A1', fr:'Premiers échanges A1', targetVi:'Nói về thời tiết, ngày thường và giữ một cuộc hội thoại ngắn bằng câu hỏi đơn giản.', targetFr:'Parler de la météo et du quotidien et maintenir un petit échange avec des questions simples.' }
  ];

  function learner() {
    try { return JSON.parse(localStorage.getItem(LEARNER_KEY) || '{}') || {}; }
    catch { return {}; }
  }

  function memorySummary() {
    return window.FrenchTranquilleMemory?.summary?.() || { entries:[], due:[], fragile:[], learning:[], solid:[] };
  }

  function memoryMap() {
    return Object.fromEntries((memorySummary().entries || []).map(entry => [entry.id, entry]));
  }

  function statusWeight(entry) {
    if (!entry) return 0;
    const status = window.FrenchTranquilleMemory?.statusOf?.(entry) || 'new';
    return { fragile:0.12, new:0.22, learning:0.64, solid:1 }[status] ?? 0;
  }

  function clamp(value, min = 0, max = 1) {
    return Math.max(min, Math.min(max, Number(value) || 0));
  }

  function stageData(stage) {
    const l = learner();
    const completed = new Set(l.completedLessons || []);
    const known = new Set(l.knownItems || []);
    const mem = memoryMap();
    const lessons = MASTERY_CURRICULUM.lessons.filter(lesson => lesson.number >= stage.from && lesson.number <= stage.to);
    const items = MASTERY_CURRICULUM.items.filter(item => lessons.some(lesson => lesson.id === item.lessonId));
    const completedCount = lessons.filter(lesson => completed.has(lesson.id)).length;
    const knownItems = items.filter(item => known.has(item.id));
    const reviewedItems = knownItems.filter(item => Number(mem[item.id]?.attempts || 0) > 0);
    const fragileItems = reviewedItems.filter(item => (window.FrenchTranquilleMemory?.statusOf?.(mem[item.id]) || '') === 'fragile');
    const solidItems = reviewedItems.filter(item => (window.FrenchTranquilleMemory?.statusOf?.(mem[item.id]) || '') === 'solid');
    const lessonRatio = lessons.length ? completedCount / lessons.length : 0;
    const knownRatio = items.length ? knownItems.length / items.length : 0;
    const evidenceRatio = items.length ? reviewedItems.length / items.length : 0;
    const memoryQuality = reviewedItems.length ? reviewedItems.reduce((sum,item) => sum + statusWeight(mem[item.id]), 0) / reviewedItems.length : 0;
    const score = Math.round(100 * clamp(0.44 * lessonRatio + 0.21 * knownRatio + 0.35 * memoryQuality));
    const enoughEvidence = reviewedItems.length >= Math.min(6, Math.max(3, Math.ceil(items.length * 0.18)));
    const mastered = lessonRatio === 1 && knownRatio >= 0.9 && enoughEvidence && memoryQuality >= 0.68 && fragileItems.length <= Math.max(1, Math.floor(reviewedItems.length * 0.2));
    const ready = !mastered && lessonRatio >= 0.85 && knownRatio >= 0.75 && evidenceRatio >= 0.15;
    const practicing = !mastered && !ready && (completedCount > 0 || knownItems.length > 0) && (reviewedItems.length > 0 || lessonRatio >= 0.4);
    const exploring = !mastered && !ready && !practicing && (completedCount > 0 || knownItems.length > 0);
    const state = mastered ? 'mastered' : ready ? 'ready' : practicing ? 'practicing' : exploring ? 'exploring' : 'locked';
    return { ...stage, lessons, items, completedCount, knownItems, reviewedItems, fragileItems, solidItems, lessonRatio, knownRatio, evidenceRatio, memoryQuality, score, enoughEvidence, state };
  }

  function allStages() {
    return STAGES.map(stageData);
  }

  function labelState(state) {
    return {
      locked: T('Chưa bắt đầu','Non commencé'),
      exploring: T('Đang khám phá','Découverte'),
      practicing: T('Đang củng cố','Consolidation'),
      ready: T('Gần vững','Presque solide'),
      mastered: T('Đã vững','Maîtrisé')
    }[state] || state;
  }

  function levelEstimate(stages = allStages()) {
    const mastered = stages.filter(s => s.state === 'mastered').length;
    const active = stages.find(s => s.state !== 'mastered' && s.state !== 'locked') || stages.find(s => s.state === 'locked');
    if (mastered >= 4) return { code:'A1', vi:'A1 đang hình thành', fr:'A1 en construction' };
    if (mastered >= 3 || stages[3]?.score >= 45) return { code:'A1-', vi:'Tiền A1 / đầu A1', fr:'Pré-A1 / début A1' };
    if (mastered >= 2 || stages[2]?.score >= 40) return { code:'A0+', vi:'A0 vững hơn', fr:'A0 renforcé' };
    if (active?.id === 'daily-a0' || stages[0]?.score >= 55) return { code:'A0', vi:'A0 đang tiến bộ', fr:'A0 en progression' };
    return { code:'A0', vi:'A0 khởi đầu', fr:'A0 initial' };
  }

  function focus(stages = allStages()) {
    const active = stages.find(stage => stage.state !== 'mastered' && stage.state !== 'locked') || stages.find(stage => stage.state === 'locked') || stages[stages.length - 1];
    if (!active) return null;
    if (active.fragileItems.length) {
      return { type:'review', stage:active, vi:`Ôn lại ${active.fragileItems.length} mục còn yếu trong “${active.vi}”.`, fr:`Revoir ${active.fragileItems.length} élément(s) fragile(s) dans « ${active.fr} ».` };
    }
    if (active.completedCount < active.lessons.length) {
      const next = active.lessons.find(lesson => !(learner().completedLessons || []).includes(lesson.id));
      return { type:'lesson', stage:active, lesson:next, vi:next ? `Tiếp tục Bài ${next.number}: ${next.titleVi}.` : `Tiếp tục chặng ${active.vi}.`, fr:next ? `Continuer la leçon ${next.number} : ${next.titleFr}.` : `Continuer l’étape ${active.fr}.` };
    }
    return { type:'practice', stage:active, vi:`Dùng lại các câu của “${active.vi}” trong ôn tập hoặc hội thoại.`, fr:`Réutiliser les acquis de « ${active.fr} » en révision ou en conversation.` };
  }

  function metric(label, value) {
    return `<div><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`;
  }

  function homeSignature(stages) {
    return stages.map(s => `${s.id}:${s.state}:${s.score}:${s.fragileItems.length}:${s.reviewedItems.length}`).join('|');
  }

  function injectHome() {
    const side = document.querySelector('.screen-home .home-side');
    if (!side) return;
    const stages = allStages();
    const estimate = levelEstimate(stages);
    const current = stages.find(s => s.state !== 'mastered' && s.state !== 'locked') || stages.find(s => s.state === 'locked') || stages.at(-1);
    const signature = homeSignature(stages);
    let card = side.querySelector('.mastery-home-card');
    if (!card) {
      card = document.createElement('section');
      card.className = 'card mastery-home-card';
      const curriculum = side.querySelector('.curriculum-card');
      if (curriculum) curriculum.before(card); else side.appendChild(card);
    }
    if (card.dataset.signature === signature) return;
    card.dataset.signature = signature;
    card.innerHTML = `<div class="mastery-home-head"><div><span class="pill">MASTERY</span><h2>🎯 ${esc(T('Mức độ làm chủ','Maîtrise réelle'))}</h2></div><span class="mastery-level">${esc(estimate.code)}</span></div><p>${esc(T('Lucie tách “đã xem bài” khỏi “đã dùng được”. Điểm này là chỉ báo nội bộ, không phải chứng chỉ CEFR.','Lucie distingue « leçon parcourue » et « acquis réellement réutilisable ». Cet indicateur est interne, ce n’est pas une certification CECRL.'))}</p>${current ? `<div class="mastery-current"><span>${current.icon}</span><div><small>${esc(T('Chặng hiện tại','Étape actuelle'))}</small><strong>${esc(T(current.vi,current.fr))}</strong><em>${esc(labelState(current.state))} • ${current.score}%</em></div></div>` : ''}<button class="secondary full" data-mastery-progress>${esc(T('Xem chi tiết mức độ làm chủ','Voir le détail de la maîtrise'))}</button>`;
  }

  function progressSignature(stages) {
    return homeSignature(stages) + ':' + stages.map(s => `${s.completedCount}:${s.knownItems.length}:${s.solidItems.length}`).join('|');
  }

  function injectProgress() {
    const column = document.querySelector('.screen-progress .progress-layout > div:first-child');
    if (!column) return;
    const stages = allStages();
    const estimate = levelEstimate(stages);
    const nextFocus = focus(stages);
    const signature = progressSignature(stages);
    let card = column.querySelector('.mastery-progress-card');
    if (!card) {
      card = document.createElement('section');
      card.className = 'card mastery-progress-card';
      const memory = column.querySelector('.memory-progress-card');
      if (memory) memory.insertAdjacentElement('afterend',card); else column.appendChild(card);
    }
    if (card.dataset.signature === signature) return;
    card.dataset.signature = signature;
    card.innerHTML = `<div class="section-head"><div><span class="pill">BUILD 16</span><h2>🎯 ${esc(T('Bản đồ làm chủ','Carte de maîtrise'))}</h2></div><span class="mastery-level large">${esc(estimate.code)}</span></div><p>${esc(T('Một chặng chỉ được coi là vững khi bài học đã hoàn thành VÀ có bằng chứng ôn tập đủ tốt trong bộ nhớ học tập.','Une étape n’est considérée solide que lorsque les leçons sont terminées ET que la mémoire contient assez de preuves de réutilisation.'))}</p><div class="mastery-stage-list">${stages.map(stage => `<article class="mastery-stage mastery-${stage.state}"><div class="mastery-stage-top"><span class="mastery-stage-icon">${stage.icon}</span><div><strong>${esc(T(stage.vi,stage.fr))}</strong><small>${esc(labelState(stage.state))}</small></div><b>${stage.score}%</b></div><div class="mastery-bar"><i style="width:${stage.score}%"></i></div><p>${esc(T(stage.targetVi,stage.targetFr))}</p><div class="mastery-metrics">${metric(T('Bài','Leçons'),`${stage.completedCount}/${stage.lessons.length}`)}${metric(T('Đã học','Acquis'),`${stage.knownItems.length}/${stage.items.length}`)}${metric(T('Đã ôn','Révisés'),stage.reviewedItems.length)}${metric(T('Vững','Solides'),stage.solidItems.length)}${metric(T('Còn yếu','Fragiles'),stage.fragileItems.length)}</div></article>`).join('')}</div>${nextFocus ? `<aside class="mastery-focus"><span>→ ${esc(T('Ưu tiên tiếp theo','Priorité suivante'))}</span><strong>${esc(T(nextFocus.vi,nextFocus.fr))}</strong></aside>` : ''}<p class="mastery-disclaimer">${esc(T('Đây là thước đo nội bộ để điều khiển việc ôn tập. Nó không tuyên bố Trân đã đạt một trình độ CEFR chính thức.','Cette mesure sert à piloter les révisions. Elle ne prétend pas attribuer officiellement un niveau CECRL.'))}</p>`;
  }

  function injectSettings() {
    const rows = document.querySelector('.screen-settings .diagnostics');
    if (!rows || rows.querySelector('[data-mastery-diagnostic]')) return;
    const stages = allStages();
    const estimate = levelEstimate(stages);
    const row = document.createElement('div');
    row.dataset.masteryDiagnostic = '1';
    row.innerHTML = `<span>${esc(T('Mức độ nội bộ','Niveau interne'))}</span><strong>${esc(estimate.code)} • ${esc(T(estimate.vi,estimate.fr))}</strong>`;
    rows.appendChild(row);
  }

  function decorate() {
    injectHome();
    injectProgress();
    injectSettings();
  }

  document.addEventListener('click', event => {
    if (event.target.closest('[data-mastery-progress]')) {
      event.preventDefault();
      document.querySelector('.bottom-nav [data-go="progress"]')?.click();
    }
  });

  const observer = new MutationObserver(() => queueMicrotask(decorate));
  const app = document.getElementById('app');
  if (app) observer.observe(app,{childList:true,subtree:true});
  decorate();

  window.FrenchTranquilleMastery = { stages:allStages, stageData, levelEstimate, focus, version:'1.9.0', build:16 };
}
