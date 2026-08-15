const MASTERY3_CURRICULUM = window.FrenchTranquilleCurriculum;

if (MASTERY3_CURRICULUM && window.FrenchTranquilleStage3) {
  const LEARNER_KEY = MASTERY3_CURRICULUM.key;
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const STAGE_LESSONS = window.FrenchTranquilleStage3.lessons.map(l => l.id);
  const STAGE_ITEMS = window.FrenchTranquilleStage3.items.map(i => i.id);
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi,fr) => isDebug() ? fr : vi;
  const esc = (v='') => String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function learner() {
    try { return JSON.parse(localStorage.getItem(LEARNER_KEY) || '{}') || {}; }
    catch { return {}; }
  }

  function metrics() {
    const l = learner();
    const completed = new Set(l.completedLessons || []);
    const known = new Set(l.knownItems || []);
    const memoryEntries = window.FrenchTranquilleMemory?.summary?.().entries || [];
    const memoryMap = new Map(memoryEntries.map(entry => [entry.id,entry]));
    const statusOf = window.FrenchTranquilleMemory?.statusOf || (()=>'new');
    const stageMemory = STAGE_ITEMS.map(id => memoryMap.get(id)).filter(Boolean);
    const completedCount = STAGE_LESSONS.filter(id => completed.has(id)).length;
    const knownCount = STAGE_ITEMS.filter(id => known.has(id)).length;
    const reviewed = stageMemory.filter(entry => Number(entry.attempts || 0) > 0).length;
    const solid = stageMemory.filter(entry => statusOf(entry) === 'solid').length;
    const fragile = stageMemory.filter(entry => statusOf(entry) === 'fragile').length;
    const lessonRatio = completedCount / STAGE_LESSONS.length;
    const knownRatio = knownCount / STAGE_ITEMS.length;
    const reviewedRatio = reviewed / STAGE_ITEMS.length;
    const solidRatio = solid / STAGE_ITEMS.length;
    const fragileRatio = fragile / Math.max(knownCount,1);
    let score = Math.round((lessonRatio*.32 + knownRatio*.28 + reviewedRatio*.20 + solidRatio*.20) * 100 - Math.min(12,fragileRatio*20));
    score = Math.max(0,Math.min(100,score));
    const mastered = completedCount === STAGE_LESSONS.length && knownRatio >= .95 && reviewedRatio >= .70 && solidRatio >= .55 && fragileRatio <= .20;
    let state = 'not-started';
    if (knownCount || completedCount) state = score < 35 ? 'discovery' : score < 70 ? 'consolidating' : score < 90 ? 'near' : 'consolidating';
    if (mastered) state = 'mastered';
    return {completedCount,knownCount,reviewed,solid,fragile,lessonRatio,knownRatio,reviewedRatio,solidRatio,fragileRatio,score,mastered,state,totalLessons:STAGE_LESSONS.length,totalItems:STAGE_ITEMS.length};
  }

  function stateLabel(state) {
    return {
      'not-started':T('Chưa bắt đầu','Non commencé'),
      discovery:T('Khám phá','Découverte'),
      consolidating:T('Đang củng cố','Consolidation'),
      near:T('Gần vững','Presque solide'),
      mastered:T('Vững','Maîtrisé')
    }[state] || state;
  }

  function nextPriority(m) {
    if (!m.knownCount) return T('Bắt đầu Bài 26 khi chặng trước đã mở đường.','Commencer la leçon 26 quand le parcours précédent est prêt.');
    if (m.fragile) return T(`${m.fragile} mục còn yếu cần quay lại trước.`,`${m.fragile} élément(s) fragile(s) à retravailler en priorité.`);
    if (m.reviewedRatio < .70) return T('Cần thêm bằng chứng ôn tập trước khi xem khối này là vững.','Il faut davantage de preuves de révision avant de considérer ce bloc comme solide.');
    if (m.completedCount < m.totalLessons) return T('Tiếp tục bài tiếp theo trong A1 Core.','Continuer la prochaine leçon du bloc A1 Core.');
    if (!m.mastered) return T('Khóa học đã đi hết, nhưng Lucie vẫn cần thêm tái sử dụng thực tế.','Le parcours est terminé, mais Lucie attend encore davantage de réutilisation réelle.');
    return T('Khối A1 Core đã có bằng chứng vững.','Le bloc A1 Core possède des preuves de consolidation solides.');
  }

  function injectProgress() {
    const column = document.querySelector('.screen-progress .progress-layout > div:first-child');
    if (!column) return;
    const m = metrics();
    let card = column.querySelector('.mastery-stage3-card');
    if (!card) {
      card = document.createElement('section');
      card.className = 'card mastery-stage3-card';
      const stage3 = column.querySelector('.stage3-progress-card');
      if (stage3) stage3.insertAdjacentElement('afterend',card); else column.appendChild(card);
    }
    const sig = `${m.score}:${m.state}:${m.completedCount}:${m.knownCount}:${m.reviewed}:${m.solid}:${m.fragile}`;
    if (card.dataset.signature === sig) return;
    card.dataset.signature = sig;
    card.innerHTML = `<div class="section-head"><div><span class="pill">MASTERY • A1 CORE</span><h2>🧱 ${esc(T('Mức độ làm chủ A1 Core','Maîtrise du bloc A1 Core'))}</h2></div><span class="stage3-mastery-score">${m.score}%</span></div><p>${esc(T('Bài 26–40 là một khối mới: hoàn thành bài không đủ để xem là vững. Lucie chờ thêm bằng chứng từ ôn tập và tái sử dụng.','Les leçons 26–40 forment un nouveau bloc : les terminer ne suffit pas pour le considérer comme maîtrisé. Lucie attend aussi des preuves de révision et de réutilisation.'))}</p><div class="stage3-mastery-state"><span>${esc(stateLabel(m.state))}</span><div><i style="width:${m.score}%"></i></div></div><div class="stage3-mastery-metrics"><div><strong>${m.completedCount}/${m.totalLessons}</strong><span>${esc(T('bài','leçons'))}</span></div><div><strong>${m.knownCount}/${m.totalItems}</strong><span>${esc(T('đã học','acquis'))}</span></div><div><strong>${m.reviewed}</strong><span>${esc(T('đã ôn','révisés'))}</span></div><div><strong>${m.solid}</strong><span>${esc(T('vững','solides'))}</span></div><div><strong>${m.fragile}</strong><span>${esc(T('còn yếu','fragiles'))}</span></div></div><div class="stage3-mastery-priority"><span>→ ${esc(T('Ưu tiên','Priorité'))}</span><p>${esc(nextPriority(m))}</p></div>`;
  }

  function injectHome() {
    const card = document.querySelector('.screen-home .mastery-home-card');
    if (!card) return;
    const m = metrics();
    let chip = card.querySelector('.mastery-stage3-chip');
    if (!chip) {
      chip = document.createElement('div');
      chip.className = 'mastery-stage3-chip';
      card.appendChild(chip);
    }
    const sig = `${m.score}:${m.state}`;
    if (chip.dataset.signature === sig) return;
    chip.dataset.signature = sig;
    chip.innerHTML = `<span>A1 CORE</span><strong>${m.score}%</strong><em>${esc(stateLabel(m.state))}</em>`;
  }

  function injectSettings() {
    const diagnostics = document.querySelector('.screen-settings .diagnostics');
    if (!diagnostics) return;
    let row = diagnostics.querySelector('[data-stage3-mastery-diagnostic]');
    if (!row) {
      row = document.createElement('div');
      row.dataset.stage3MasteryDiagnostic = '1';
      diagnostics.appendChild(row);
    }
    const m = metrics();
    const sig = `${m.score}:${m.state}`;
    if (row.dataset.signature === sig) return;
    row.dataset.signature = sig;
    row.innerHTML = `<span>A1 Core mastery</span><strong>${m.score}% • ${esc(stateLabel(m.state))}</strong>`;
  }

  let scheduled=false;
  function decorate(){injectHome();injectProgress();injectSettings()}
  function schedule(){if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;decorate()})}
  const app=document.getElementById('app');
  if(app)new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
  decorate();

  window.FrenchTranquilleMasteryStage3={version:'1.12.0',build:19,metrics,nextPriority};
}
