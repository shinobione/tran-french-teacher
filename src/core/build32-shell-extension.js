(() => {
  'use strict';

  const CURRICULUM = window.FrenchTranquilleCurriculum;
  if (!CURRICULUM?.lessons) return;
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const LEARNER_KEY = CURRICULUM.key || 'francais-avec-luc:learner:v1';
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi,fr) => isDebug() ? fr : vi;
  const esc = (value='') => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const EXTRA = [
    {id:'a1-autonomy',from:41,to:46,vi:'Tự chủ A1',fr:'Autonomie A1'},
    {id:'a1-interaction',from:47,to:52,vi:'Tương tác A1',fr:'Interaction A1'}
  ];
  let selectedStage = null;
  let scheduled = false;

  function learner() {
    try { return JSON.parse(localStorage.getItem(LEARNER_KEY) || '{}') || {}; }
    catch { return {}; }
  }
  function state() {
    const l = learner();
    const completed = new Set(l.completedLessons || []);
    const next = CURRICULUM.lessons.find(lesson => !completed.has(lesson.id)) || CURRICULUM.lessons.at(-1) || null;
    return {l,completed,next};
  }
  function stageFor(number=1) { return EXTRA.find(stage => number>=stage.from && number<=stage.to) || null; }
  function lessonRow(lesson,s) {
    const done = s.completed.has(lesson.id);
    const current = lesson.id === s.next?.id;
    const unlocked = done || current || lesson.number <= (s.next?.number || 1);
    return `<button type="button" class="b27-lesson-row ${done?'is-done':''} ${current?'is-current':''}" ${unlocked?`data-b27-open-lesson="${esc(lesson.id)}"`:'disabled'}><span class="b27-lesson-state">${done?'✓':current?'●':'○'}</span><span class="b27-lesson-copy"><strong>${lesson.number}. ${esc(T(lesson.titleVi,lesson.titleFr))}</strong><small>${esc(current?T('Bài hiện tại','Leçon actuelle'):done?T('Đã hoàn thành','Terminée'):T('Sắp tới','À venir'))}</small></span><b>${unlocked?'›':'🔒'}</b></button>`;
  }
  function stageLessons(stage) { return CURRICULUM.lessons.filter(lesson => lesson.number>=stage.from && lesson.number<=stage.to); }
  function stageTab(stage,s) {
    const lessons = stageLessons(stage);
    const done = lessons.filter(lesson => s.completed.has(lesson.id)).length;
    return `<button type="button" class="b27-stage-tab ${selectedStage===stage.id?'active':''}" data-b32-stage="${stage.id}"><span>${esc(T(stage.vi,stage.fr))}</span><small>${done}/${lessons.length}</small></button>`;
  }

  function patchProgress() {
    const s = state();
    const stage = stageFor(Number(s.next?.number || 0));
    if (!stage) return;
    const card = document.querySelector('.b27-progress-page .b27-stage-card');
    if (!card) return;
    const titleWrap = card.querySelector('.b27-section-title > div');
    const count = card.querySelector('.b27-section-title > small');
    const lessons = stageLessons(stage);
    const done = lessons.filter(lesson => s.completed.has(lesson.id)).length;
    if (titleWrap) titleWrap.innerHTML = `<span>${esc(T(`BƯỚC ${stage.id==='a1-autonomy'?6:7} / 7`,`ÉTAPE ${stage.id==='a1-autonomy'?6:7} / 7`))}</span><h2>${esc(T(stage.vi,stage.fr))}</h2>`;
    if (count) count.textContent = `${done}/${lessons.length}`;
    card.dataset.b32Stage = stage.id;
  }

  function patchJourney() {
    const page = document.querySelector('.b27-journey-page');
    if (!page) { selectedStage = null; return; }
    const tabs = page.querySelector('.b27-stage-tabs');
    const list = page.querySelector('.b27-stage-lessons');
    if (!tabs || !list) return;
    const s = state();
    EXTRA.forEach(stage => {
      if (!tabs.querySelector(`[data-b32-stage="${stage.id}"]`)) tabs.insertAdjacentHTML('beforeend',stageTab(stage,s));
    });
    if (!selectedStage) {
      const current = stageFor(Number(s.next?.number || 0));
      if (current) selectedStage = current.id;
    }
    const stage = EXTRA.find(item => item.id === selectedStage);
    if (!stage) return;
    tabs.querySelectorAll('.b27-stage-tab').forEach(tab => tab.classList.toggle('active',tab.dataset.b32Stage === stage.id));
    const header = page.querySelector('.b27-overlay-header h1');
    if (header) header.textContent = T(stage.vi,stage.fr);
    list.innerHTML = stageLessons(stage).map(lesson => lessonRow(lesson,s)).join('');
    page.dataset.b32JourneyStage = stage.id;
  }

  function patch() { patchProgress(); patchJourney(); }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; patch(); });
  }

  window.addEventListener('click',event => {
    const extra = event.target.closest?.('[data-b32-stage]');
    if (extra) {
      event.preventDefault();
      event.stopPropagation();
      selectedStage = extra.dataset.b32Stage;
      patchJourney();
      return;
    }
    if (event.target.closest?.('[data-b27-stage]')) selectedStage = null;
  },true);

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
  new MutationObserver(schedule).observe(document.body,{childList:true});
  window.FrenchTranquilleBuild32Shell = Object.freeze({version:'2.2.0',build:32,stages:EXTRA,refresh:patch});
  patch();
})();