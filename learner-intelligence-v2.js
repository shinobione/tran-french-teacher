(() => {
  'use strict';

  const CURRICULUM = window.FrenchTranquilleCurriculum;
  if (!CURRICULUM) return;

  const VERSION = '2.2.0';
  const BUILD = 32;
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const LEARNER_KEY = CURRICULUM.key;
  const DAY = 24 * 60 * 60 * 1000;
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, Number(value) || 0));

  const BANDS = Object.freeze([
    { id:'survival-a0', from:1, to:7, icon:'🛟', vi:'Sinh tồn A0', fr:'Survie A0' },
    { id:'daily-a0', from:8, to:15, icon:'🏙️', vi:'Đời sống A0', fr:'Vie quotidienne A0' },
    { id:'foundations-a1', from:16, to:20, icon:'🧩', vi:'Nền tảng A1', fr:'Fondations A1' },
    { id:'exchange-a1', from:21, to:25, icon:'💬', vi:'Trao đổi đầu A1', fr:'Premiers échanges A1' },
    { id:'a1-core', from:26, to:40, icon:'🧱', vi:'A1 cốt lõi', fr:'A1 Core' },
    { id:'a1-autonomy', from:41, to:46, icon:'🧭', vi:'Tự chủ A1', fr:'Autonomie A1' },
    { id:'a1-interaction', from:47, to:52, icon:'🤝', vi:'Tương tác A1', fr:'Interaction A1' }
  ]);

  const LESSON_BY_ID = Object.fromEntries((CURRICULUM.lessons || []).map(lesson => [lesson.id, lesson]));
  const ITEM_BY_ID = Object.fromEntries((CURRICULUM.items || []).map(item => [item.id, item]));

  function learner() {
    try { return JSON.parse(localStorage.getItem(LEARNER_KEY) || '{}') || {}; }
    catch { return {}; }
  }

  function memorySnapshot() {
    const summary = window.FrenchTranquilleMemory?.summary?.() || { entries:[], due:[], fragile:[], learning:[], solid:[] };
    const entries = Array.isArray(summary.entries) ? summary.entries : [];
    return { summary, map:new Map(entries.map(entry => [entry.id, entry])) };
  }

  function errorSnapshot() {
    const priorities = window.FrenchTranquilleErrors?.priorityItems?.((CURRICULUM.items || []).length) || [];
    return { priorities, map:new Map(priorities.map(row => [row.item?.id, row]).filter(([id]) => Boolean(id))) };
  }

  function memoryStatus(entry) {
    return window.FrenchTranquilleMemory?.statusOf?.(entry) || (!entry || !entry.attempts ? 'new' : 'learning');
  }

  function statusWeight(entry) {
    return { fragile:0.18, new:0.24, learning:0.62, solid:1 }[memoryStatus(entry)] ?? 0.24;
  }

  function sourceKind(source = '') {
    const value = String(source).toLowerCase();
    if (value.includes('voice')) return 'recognition';
    if (value.includes('scenario')) return 'scenario';
    if (value.includes('listening')) return 'listening';
    if (value.includes('review')) return 'retrieval';
    if (value.includes('text')) return 'text';
    if (value.includes('practice')) return 'practice';
    return value ? 'other' : 'unknown';
  }

  function sourceKinds(memoryEntry, errorRow) {
    const kinds = new Set();
    if (memoryEntry?.lastSource) kinds.add(sourceKind(memoryEntry.lastSource));
    (errorRow?.entry?.events || []).forEach(event => kinds.add(sourceKind(event.source)));
    kinds.delete('unknown');
    return [...kinds];
  }

  function itemEvidence(id, snapshots = {}) {
    const item = ITEM_BY_ID[id];
    if (!item) return null;
    const l = snapshots.learner || learner();
    const completed = snapshots.completed || new Set(l.completedLessons || []);
    const known = snapshots.known || new Set(l.knownItems || []);
    const memory = snapshots.memory || memorySnapshot();
    const errors = snapshots.errors || errorSnapshot();
    const mem = memory.map.get(id) || null;
    const err = errors.map.get(id) || null;
    const reviewed = Number(mem?.attempts || 0) > 0;
    const dueAt = new Date(mem?.dueAt || 0).getTime();
    const due = reviewed && Number.isFinite(dueAt) && dueAt <= Date.now();
    const retention = known.has(id) ? statusWeight(mem) : 0;
    const errorPriority = clamp(Number(err?.score || 0) / 14);
    const fragile = memoryStatus(mem) === 'fragile';
    const overdueAge = due && dueAt > 0 ? clamp((Date.now() - dueAt) / (7 * DAY)) : 0;
    const risk = clamp((fragile ? 0.48 : 0) + (due ? 0.18 : 0) + errorPriority * 0.28 + overdueAge * 0.06);
    const kinds = sourceKinds(mem, err);
    return {
      id,item,lesson:LESSON_BY_ID[item.lessonId] || null,
      known:known.has(id),lessonCompleted:completed.has(item.lessonId),reviewed,due,fragile,retention,risk,
      memoryStatus:memoryStatus(mem),memory:mem,error:err,sourceKinds:kinds,evidenceChannels:kinds.length
    };
  }

  function bandMetrics(band, snapshots = {}) {
    const l = snapshots.learner || learner();
    const completed = snapshots.completed || new Set(l.completedLessons || []);
    const known = snapshots.known || new Set(l.knownItems || []);
    const memory = snapshots.memory || memorySnapshot();
    const errors = snapshots.errors || errorSnapshot();
    const shared = { learner:l,completed,known,memory,errors };
    const lessons = (CURRICULUM.lessons || []).filter(lesson => lesson.number >= band.from && lesson.number <= band.to);
    const lessonIds = new Set(lessons.map(lesson => lesson.id));
    const items = (CURRICULUM.items || []).filter(item => lessonIds.has(item.lessonId));
    const evidence = items.map(item => itemEvidence(item.id, shared)).filter(Boolean);
    const completedCount = lessons.filter(lesson => completed.has(lesson.id)).length;
    const knownEvidence = evidence.filter(row => row.known);
    const reviewed = evidence.filter(row => row.reviewed);
    const solid = evidence.filter(row => row.memoryStatus === 'solid');
    const fragile = evidence.filter(row => row.fragile);
    const due = evidence.filter(row => row.due);
    const lessonRatio = lessons.length ? completedCount / lessons.length : 0;
    const knownRatio = items.length ? knownEvidence.length / items.length : 0;
    const reviewedRatio = items.length ? reviewed.length / items.length : 0;
    const retentionRatio = items.length ? evidence.reduce((sum,row) => sum + row.retention,0) / items.length : 0;
    const riskPressure = items.length ? evidence.reduce((sum,row) => sum + row.risk,0) / items.length : 0;
    const channels = new Set(evidence.flatMap(row => row.sourceKinds));
    const confidence = Math.round(100 * clamp(reviewedRatio * 0.68 + Math.min(1,channels.size / 4) * 0.22 + lessonRatio * 0.10));
    const score = Math.round(100 * clamp(lessonRatio * 0.38 + knownRatio * 0.24 + retentionRatio * 0.38 - riskPressure * 0.10));
    let state = 'locked';
    if (completedCount || knownEvidence.length) state = score < 35 ? 'exploring' : score < 65 ? 'learning' : score < 82 ? 'consolidating' : 'strong';
    if (lessonRatio === 1 && knownRatio >= 0.92 && retentionRatio >= 0.68 && confidence >= 55 && fragile.length <= Math.max(1,Math.floor(reviewed.length * 0.18))) state = 'strong';
    return {
      ...band,lessons,items,completedCount,knownCount:knownEvidence.length,reviewedCount:reviewed.length,solidCount:solid.length,
      fragileCount:fragile.length,dueCount:due.length,lessonRatio,knownRatio,reviewedRatio,retentionRatio,riskPressure,confidence,score,state,channels:[...channels]
    };
  }

  function levelEstimate(bands) {
    const interaction = bands[6];
    const autonomy = bands[5];
    const core = bands[4];
    const exchange = bands[3];
    const foundations = bands[2];
    const daily = bands[1];
    const survival = bands[0];
    if (interaction?.score >= 78 && interaction?.confidence >= 60 && interaction?.lessonRatio === 1 && autonomy?.score >= 75) {
      return { code:'A1+', vi:'A1 thực hành vững hơn', fr:'A1 pratique plus solide' };
    }
    if ((interaction?.lessonRatio || 0) > 0 || (autonomy?.lessonRatio || 0) > 0 || (autonomy?.knownRatio || 0) >= 0.20) {
      return { code:'A1', vi:'A1 thực hành đang phát triển', fr:'A1 pratique en développement' };
    }
    if (core?.score >= 78 && core?.confidence >= 60 && core?.lessonRatio === 1) return { code:'A1', vi:'A1 đang được củng cố', fr:'A1 en consolidation' };
    if ((core?.lessonRatio || 0) >= 0.20 || (core?.knownRatio || 0) >= 0.20) return { code:'A1-', vi:'A1 đang hình thành', fr:'A1 en construction' };
    if ((exchange?.score || 0) >= 52 || (foundations?.score || 0) >= 65) return { code:'Pré-A1', vi:'Tiền A1 / đầu A1', fr:'Pré-A1 / début A1' };
    if ((daily?.score || 0) >= 55) return { code:'A0+', vi:'A0 vững hơn', fr:'A0 renforcé' };
    if ((survival?.score || 0) >= 50) return { code:'A0', vi:'A0 đang tiến bộ', fr:'A0 en progression' };
    return { code:'A0', vi:'A0 khởi đầu', fr:'A0 initial' };
  }

  function recommendationFrom(context) {
    const { l,memory,errors,evidence,bands } = context;
    const topError = errors.priorities[0] || null;
    const topEvidence = topError?.item?.id ? evidence.get(topError.item.id) : null;
    const fragile = [...evidence.values()].filter(row => row?.known && row.fragile).sort((a,b) => b.risk - a.risk);
    const due = [...evidence.values()].filter(row => row?.known && row.due).sort((a,b) => b.risk - a.risk);
    const completed = new Set(l.completedLessons || []);
    const nextLesson = (CURRICULUM.lessons || []).find(lesson => !completed.has(lesson.id)) || null;

    if (topEvidence && Number(topError.score || 0) >= 8 && (topEvidence.fragile || topEvidence.due)) {
      return { type:'review',itemId:topEvidence.id,lessonId:topEvidence.item.lessonId,
        vi:`Ôn lại “${topEvidence.item.fr}” trước: mục này vừa yếu vừa xuất hiện trong các khó khăn gần đây.`,
        fr:`Revoir « ${topEvidence.item.fr} » en priorité : cet acquis est fragile et revient dans les difficultés récentes.` };
    }
    if (fragile.length >= 2 || due.length >= 4) {
      const first = fragile[0] || due[0];
      return { type:'review',itemId:first?.id || null,lessonId:first?.item?.lessonId || null,
        vi:`Ưu tiên một phiên ôn ngắn: ${fragile.length} mục còn yếu và ${due.length} mục đã đến hạn.`,
        fr:`Priorité à une courte révision : ${fragile.length} fragile(s) et ${due.length} élément(s) arrivés à échéance.` };
    }
    if (nextLesson) {
      return { type:'lesson',lessonId:nextLesson.id,itemId:null,
        vi:`Tiếp tục Bài ${nextLesson.number}: ${nextLesson.titleVi || nextLesson.titleFr}.`,
        fr:`Continuer la leçon ${nextLesson.number} : ${nextLesson.titleFr || nextLesson.titleVi}.` };
    }
    const lowConfidence = [...bands].sort((a,b) => a.confidence - b.confidence)[0];
    if (lowConfidence && lowConfidence.confidence < 65) {
      return { type:'practice',bandId:lowConfidence.id,
        vi:`Đã đi hết bài học, nhưng cần thêm bằng chứng sử dụng lại trong “${lowConfidence.vi}”.`,
        fr:`Les leçons sont parcourues, mais il manque encore des preuves de réutilisation dans « ${lowConfidence.fr} ».` };
    }
    return { type:'maintain',vi:'Không có điểm yếu cấp bách. Giữ nhịp bằng hội thoại, nghe và ôn ngắn.',fr:'Aucune fragilité urgente. Entretenir avec conversation, écoute et révisions courtes.' };
  }

  function profile() {
    const l = learner();
    const completed = new Set(l.completedLessons || []);
    const known = new Set(l.knownItems || []);
    const memory = memorySnapshot();
    const errors = errorSnapshot();
    const shared = { learner:l,completed,known,memory,errors };
    const evidence = new Map((CURRICULUM.items || []).map(item => [item.id,itemEvidence(item.id,shared)]));
    const bands = BANDS.map(band => bandMetrics(band,shared));
    const reviewed = [...evidence.values()].filter(row => row?.reviewed);
    const channels = new Set(reviewed.flatMap(row => row.sourceKinds));
    const reviewedCoverage = (CURRICULUM.items || []).length ? reviewed.length / CURRICULUM.items.length : 0;
    const overallConfidence = Math.round(100 * clamp(reviewedCoverage * 0.72 + Math.min(1,channels.size / 5) * 0.18 + (completed.size / Math.max(1,CURRICULUM.lessons.length)) * 0.10));
    const level = levelEstimate(bands);
    const recommendation = recommendationFrom({ l,memory,errors,evidence,bands });
    const denominator = Math.max(1,bands.reduce((sum,band) => sum + band.items.length,0));
    const overallScore = Math.round(bands.reduce((sum,band) => sum + band.score * band.items.length,0) / denominator);
    return {
      version:VERSION,build:BUILD,level,overallScore,confidence:overallConfidence,bands,recommendation,
      metrics:{
        lessons:(CURRICULUM.lessons || []).length,items:(CURRICULUM.items || []).length,completedLessons:completed.size,knownItems:known.size,
        reviewedItems:reviewed.length,due:memory.summary.due?.length || 0,fragile:memory.summary.fragile?.length || 0,
        recentDifficulties:window.FrenchTranquilleErrors?.summary?.().recent?.length || 0,evidenceChannels:[...channels]
      }
    };
  }

  function stateLabel(state) {
    return {locked:T('Chưa bắt đầu','Non commencé'),exploring:T('Khám phá','Découverte'),learning:T('Đang học','En cours'),consolidating:T('Đang củng cố','Consolidation'),strong:T('Vững hơn','Plus solide')}[state] || state;
  }

  function injectProgress() {
    const column = document.querySelector('.screen-progress .progress-layout > div:first-child');
    if (!column) return;
    const p = profile();
    let card = column.querySelector('.learner-intelligence-card');
    const wasOpen = Boolean(card?.querySelector('details')?.open);
    if (!card) {
      card = document.createElement('section');
      card.className = 'card learner-intelligence-card';
      const stage3 = column.querySelector('.mastery-stage3-card');
      if (stage3) stage3.insertAdjacentElement('afterend',card);
      else column.appendChild(card);
    }
    const signature = `${p.level.code}:${p.overallScore}:${p.confidence}:${p.metrics.reviewedItems}:${p.metrics.due}:${p.metrics.fragile}:${p.recommendation.type}:${p.recommendation.itemId || p.recommendation.lessonId || ''}`;
    if (card.dataset.signature === signature) return;
    card.dataset.signature = signature;
    card.dataset.learnerIntelligence = '1';
    card.innerHTML = `
      <div class="li-head"><div><span class="pill">V2.2 • BUILD 32</span><h2>🧠 ${esc(T('Kế hoạch học thông minh','Plan d’apprentissage intelligent'))}</h2></div><span class="li-level">${esc(p.level.code)}</span></div>
      <p class="li-intro">${esc(T('Mô hình kết hợp tiến độ, trí nhớ, tái sử dụng và khó khăn quan sát được. Đây không phải chẩn đoán phát âm hay chứng chỉ CEFR.','Le modèle combine progression, mémoire, réutilisation et difficultés observables. Ce n’est ni un diagnostic de prononciation ni une certification CECRL.'))}</p>
      <div class="li-summary"><div><strong>${p.overallScore}%</strong><span>${esc(T('chỉ số nội bộ','indice interne'))}</span></div><div><strong>${p.confidence}%</strong><span>${esc(T('độ tin cậy','confiance'))}</span></div><div><strong>${p.metrics.reviewedItems}</strong><span>${esc(T('mục có bằng chứng','acquis éprouvés'))}</span></div></div>
      <aside class="li-next li-${esc(p.recommendation.type)}"><span>→ ${esc(T('Ưu tiên tiếp theo','Priorité suivante'))}</span><strong>${esc(T(p.recommendation.vi,p.recommendation.fr))}</strong></aside>
      <details class="li-details" ${wasOpen ? 'open' : ''}><summary>${esc(T('Xem cách mô hình suy luận','Voir comment le modèle raisonne'))}</summary><div class="li-band-list">${p.bands.map(band => `<article><div><span>${band.icon}</span><strong>${esc(T(band.vi,band.fr))}</strong><small>${esc(stateLabel(band.state))}</small></div><b>${band.score}%</b><em>${band.confidence}% ${esc(T('tin cậy','confiance'))}</em></article>`).join('')}</div><p class="li-note">${esc(T('Một lỗi nhận dạng giọng nói chỉ là tín hiệu của hệ thống nhận dạng. French Trân’quille không biến tín hiệu đó thành điểm phát âm.','Une non-reconnaissance vocale reste un signal du système de reconnaissance. French Trân’quille ne la transforme pas en note de prononciation.'))}</p></details>`;
  }

  function injectSettings() {
    const diagnostics = document.querySelector('.screen-settings .diagnostics');
    if (!diagnostics) return;
    let row = diagnostics.querySelector('[data-learner-intelligence-diagnostic]');
    if (!row) { row = document.createElement('div'); row.dataset.learnerIntelligenceDiagnostic = '1'; diagnostics.appendChild(row); }
    const p = profile();
    const next = `${p.level.code} • ${p.confidence}%`;
    if (row.dataset.signature === next) return;
    row.dataset.signature = next;
    row.innerHTML = `<span>${esc(T('Mô hình học tập','Learner model'))}</span><strong>v${VERSION} • Build ${BUILD} • ${esc(next)}</strong>`;
  }

  let scheduled = false;
  function decorate() { injectProgress(); injectSettings(); }
  function schedule() { if (scheduled) return; scheduled = true; queueMicrotask(() => { scheduled = false; decorate(); }); }
  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
  window.addEventListener('focus',schedule);
  document.addEventListener('visibilitychange',() => { if (!document.hidden) schedule(); });

  window.FrenchTranquilleLearnerIntelligence = Object.freeze({
    version:VERSION,build:BUILD,bands:() => profile().bands,profile,recommendation:() => profile().recommendation,itemEvidence,sourceKind,refresh:decorate
  });
  decorate();
})();