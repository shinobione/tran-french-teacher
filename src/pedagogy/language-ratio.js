(() => {
  'use strict';

  const CORE=window.FrenchTranquilleLanguageCore;
  const CURRICULUM=window.FrenchTranquilleCurriculum;
  if(!CORE||!CURRICULUM)return;

  const DEBUG_KEY='tran-french-teacher:debug-fr:v1';
  const LEARNER_KEY=CURRICULUM.key||'francais-avec-luc:learner:v1';
  const MEMORY_KEY='french-tranquille:learning-memory:v1';
  const LISTENING_KEY='french-tranquille:listening:v1';
  const ERROR_KEY='french-tranquille:error-intelligence:v1';
  const SCENARIO_KEY='french-tranquille:scenarios:v1';
  const WATCHED=new Set([LEARNER_KEY,MEMORY_KEY,LISTENING_KEY,ERROR_KEY,SCENARIO_KEY]);
  const DAY=24*60*60*1000;
  const isDebug=()=>localStorage.getItem(DEBUG_KEY)==='1';
  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const read=(key,fallback={})=>{try{return JSON.parse(localStorage.getItem(key)||'null')||fallback}catch{return fallback}};
  const todayMs=()=>Date.now();
  let current=null;
  let scheduled=false;
  let lastSignature='';

  function rawMemoryMetrics(){
    const api=window.FrenchTranquilleMemory;
    if(api?.summary){
      try{
        const s=api.summary();
        const entries=s.entries||[];
        const statusOf=api.statusOf||(()=> 'new');
        return {
          reviewed:entries.filter(e=>Number(e.attempts||0)>0).length,
          solid:entries.filter(e=>statusOf(e)==='solid').length,
          fragile:entries.filter(e=>statusOf(e)==='fragile').length,
          due:(s.due||[]).length
        };
      }catch{}
    }
    const memory=read(MEMORY_KEY,{items:{}});
    const entries=Object.values(memory.items||{});
    const status=e=>{
      if(!e||Number(e.attempts||0)===0)return'new';
      if(Number(e.lastRating)===0||Number(e.misses||0)>Number(e.successes||0))return'fragile';
      if(Number(e.intervalDays||0)>=7||Number(e.strength||0)>=3)return'solid';
      return'learning';
    };
    const now=Date.now();
    return {
      reviewed:entries.filter(e=>Number(e.attempts||0)>0).length,
      solid:entries.filter(e=>status(e)==='solid').length,
      fragile:entries.filter(e=>status(e)==='fragile').length,
      due:entries.filter(e=>new Date(e.dueAt||0).getTime()<=now).length
    };
  }

  function rawListeningMetrics(){
    const api=window.FrenchTranquilleListening;
    if(api?.state){
      try{const s=api.state();return {attempts:Number(s.totals?.attempts||0),correct:Number(s.totals?.correct||0)}}catch{}
    }
    const s=read(LISTENING_KEY,{totals:{}});
    return {attempts:Number(s.totals?.attempts||0),correct:Number(s.totals?.correct||0)};
  }

  function rawErrorMetrics(){
    const api=window.FrenchTranquilleErrors;
    if(api?.summary){
      try{const s=api.summary();return {recent:(s.recent||[]).length,recurring:(s.recurring||[]).length,assisted:(s.assisted||[]).length}}catch{}
    }
    const s=read(ERROR_KEY,{items:{},recent:[]});
    const cutoff=todayMs()-DAY;
    const recent=(s.recent||[]).filter(e=>new Date(e.at||0).getTime()>=cutoff);
    const recurring=Object.values(s.items||{}).filter(e=>Number(e.errorStreak||0)>=2||Number(e.counts?.['repeated-miss']||0)>0);
    return {recent:recent.length,recurring:recurring.length,assisted:recent.filter(e=>e.type==='assisted').length};
  }

  function scenarioSuccesses(){
    const api=window.FrenchTranquilleScenarios;
    try{
      const s=api?.summary?.();
      if(s){
        const direct=Number(s.successes??s.completedTurns??s.correct??0);
        if(Number.isFinite(direct)&&direct>0)return direct;
        const rows=s.scenarios||s.entries||[];
        if(Array.isArray(rows))return rows.reduce((n,row)=>n+Number(row.successes||row.correct||row.completedTurns||0),0);
      }
    }catch{}
    const raw=read(SCENARIO_KEY,{});
    const rows=raw.scenarios||raw.items||raw.stats||{};
    return Object.values(rows).reduce((n,row)=>n+Number(row?.successes||row?.correct||row?.completedTurns||row?.wins||0),0);
  }

  function smokeEvidence(mode){
    if(mode==='beginner')return {
      curriculum:{completed:1,total:40,known:4,totalItems:238},
      memory:{reviewed:0,solid:0,fragile:0,due:0},
      listening:{attempts:0,correct:0},practice:{conversationWins:0,scenarioSuccesses:0},errors:{recent:0,recurring:0,assisted:0}
    };
    if(mode==='strong')return {
      curriculum:{completed:36,total:40,known:220,totalItems:238},
      memory:{reviewed:190,solid:170,fragile:5,due:3},
      listening:{attempts:20,correct:18},practice:{conversationWins:12,scenarioSuccesses:10},errors:{recent:1,recurring:0,assisted:0}
    };
    if(mode==='fragile')return {
      curriculum:{completed:36,total:40,known:220,totalItems:238},
      memory:{reviewed:190,solid:120,fragile:80,due:20},
      listening:{attempts:20,correct:16},practice:{conversationWins:12,scenarioSuccesses:10},errors:{recent:12,recurring:5,assisted:4}
    };
    return null;
  }

  function collectEvidence(){
    const smoke=new URLSearchParams(location.search).get('languageSmoke');
    const synthetic=smokeEvidence(smoke);
    if(synthetic)return synthetic;
    const learner=read(LEARNER_KEY,{});
    const completed=new Set(learner.completedLessons||[]);
    const known=new Set(learner.knownItems||[]);
    return {
      curriculum:{
        completed:(CURRICULUM.lessons||[]).filter(l=>completed.has(l.id)).length,
        total:(CURRICULUM.lessons||[]).length||40,
        known:(CURRICULUM.items||[]).filter(i=>known.has(i.id)).length,
        totalItems:(CURRICULUM.items||[]).length||238
      },
      memory:rawMemoryMetrics(),
      listening:rawListeningMetrics(),
      practice:{conversationWins:Number(learner.conversationWins||0),scenarioSuccesses:scenarioSuccesses()},
      errors:rawErrorMetrics()
    };
  }

  function calculate(){
    const evidence=collectEvidence();
    const profile=CORE.profileFor(evidence);
    const explanation=CORE.explain(evidence);
    current={profile,evidence,explanation,updatedAt:new Date().toISOString()};
    return current;
  }

  function profile(){return current||calculate()}
  function ratioFor(context='daily'){return CORE.ratioFor(profile().profile,context)}
  function text(vi,fr,context='daily'){
    if(isDebug())return fr;
    return CORE.text(vi,fr,profile().profile,context);
  }
  function pair(vi,fr,context='daily'){
    if(isDebug())return {main:fr,support:vi,profile:'debug-fr',context,vi:0,fr:100,primary:'fr',showVietnamese:false,showFrench:true};
    return CORE.pair(vi,fr,profile().profile,context);
  }

  function profileLabels(id){
    return {
      'vi-heavy':['VI rất nhiều','VI-HEAVY'],
      'vi-support':['VI hỗ trợ','VI-SUPPORT'],
      balanced:['Cân bằng','BALANCED'],
      'fr-growing':['FR tăng dần','FR-GROWING']
    }[id]||[id,id];
  }

  function reasonLabels(explain){
    const map={
      'review-evidence':['Có bằng chứng ôn tập','preuves de révision'],
      'solid-memory':['Nhiều mục đã vững','mémoire solide'],
      'listening-comprehension':['Hiểu nghe tốt','compréhension orale'],
      'active-practice':['Có thực hành chủ động','pratique active'],
      'fragile-memory':['Còn nhiều mục yếu','mémoire fragile'],
      'recent-errors':['Có khó khăn gần đây','difficultés récentes'],
      'repeated-errors':['Khó khăn lặp lại','difficultés répétées'],
      'assistance-needed':['Cần hỗ trợ / câu mẫu','assistance nécessaire'],
      'not-enough-evidence':['Chưa đủ bằng chứng','pas assez de preuves']
    };
    return {
      positives:(explain.positives||[]).map(k=>map[k]||[k,k]),
      cautions:(explain.cautions||[]).map(k=>map[k]||[k,k])
    };
  }

  function injectHome(){
    const main=document.querySelector('.screen-home .home-main');
    if(!main)return;
    let card=main.querySelector('.language-profile-card');
    if(!card){
      card=document.createElement('section');card.className='card language-profile-card';
      const listening=main.querySelector('.listening-home-card');
      const daily=main.querySelector('.daily-coach-card');
      if(listening)listening.insertAdjacentElement('afterend',card);else if(daily)daily.insertAdjacentElement('afterend',card);else main.appendChild(card);
    }
    const p=profile();const home=ratioFor('home');const labels=profileLabels(p.profile.id);const reasons=reasonLabels(p.explanation);
    const sig=`${p.profile.id}:${p.explanation.score}:${home.vi}:${p.explanation.cautions.join('|')}`;
    if(card.dataset.signature===sig)return;card.dataset.signature=sig;
    const copy=pair('Lucie giữ tiếng Việt làm điểm tựa và tăng tiếng Pháp khi dữ liệu cho thấy bạn thực sự hiểu.','Lucie garde le vietnamien comme filet de sécurité et augmente le français quand les preuves montrent que tu comprends vraiment.','home');
    card.innerHTML=`<div class="row between"><div><span class="pill">BUILD 21 • LANGUAGE</span><h2>🌐 ${esc(isDebug()?'Équilibre des langues':'Cân bằng ngôn ngữ')}</h2></div><span class="language-profile-badge language-${p.profile.id}">${esc(isDebug()?labels[1]:labels[0])}</span></div><p class="language-main-copy">${esc(copy.main)}</p>${copy.support&&copy.support!==copy.main?`<p class="language-support-copy">${esc(copy.support)}</p>`:''}<div class="language-ratio-bar"><i style="width:${home.vi}%"><span>VI ${home.vi}</span></i><b style="width:${home.fr}%"><span>FR ${home.fr}</span></b></div><div class="language-reasons">${reasons.positives.slice(0,2).map(x=>`<span class="positive">+ ${esc(isDebug()?x[1]:x[0])}</span>`).join('')}${reasons.cautions.slice(0,2).map(x=>`<span class="caution">• ${esc(isDebug()?x[1]:x[0])}</span>`).join('')}</div>`;
  }

  function activeLesson(){
    const title=document.querySelector('.screen-lesson .topbar h1')?.textContent||'';
    const m=title.match(/(?:Bài|Leçon)\s+(\d+)/i);
    return (CURRICULUM.lessons||[]).find(l=>l.number===Number(m?.[1]))||null;
  }

  function injectLessonSupport(){
    const step=document.querySelector('.screen-lesson .lesson-step');
    const lesson=activeLesson();
    if(!step||!lesson)return;
    let strip=step.querySelector('.language-lesson-strip');
    if(!strip){strip=document.createElement('aside');strip.className='language-lesson-strip';step.prepend(strip)}
    const isAdmin=lesson.number===39;
    const context=isAdmin?'admin':'lesson-new';
    const r=ratioFor(context);
    const message=pair(
      'Hãy thử hiểu phần tiếng Pháp trước. Nếu cần, lời giải thích tiếng Việt vẫn ở đây.',
      'Essaie d’abord de comprendre le français. Le vietnamien reste disponible si nécessaire.',
      context
    );
    const sig=`${lesson.id}:${profile().profile.id}:${r.vi}:${isDebug()?1:0}`;
    if(strip.dataset.signature===sig)return;strip.dataset.signature=sig;
    strip.innerHTML=`<span>🌐 ${isDebug()?'Soutien adaptatif':'Hỗ trợ thích ứng'} • VI ${r.vi} / FR ${r.fr}</span><strong>${esc(message.main)}</strong>${message.support!==message.main?`<small>${esc(message.support)}</small>`:''}`;
  }

  function injectProgress(){
    const column=document.querySelector('.screen-progress .progress-layout > div:first-child');
    if(!column)return;
    let card=column.querySelector('.language-progress-card');
    if(!card){card=document.createElement('section');card.className='card language-progress-card';const listening=column.querySelector('.listening-progress-card');if(listening)listening.insertAdjacentElement('afterend',card);else column.appendChild(card)}
    const p=profile();const labels=profileLabels(p.profile.id);const reasons=reasonLabels(p.explanation);
    const contexts=['navigation','lesson-new','lesson-review','listening','scenario','feedback-error','admin'];
    const sig=`${p.profile.id}:${p.explanation.score}:${JSON.stringify(p.explanation.components)}:${p.explanation.cautions.join('|')}`;
    if(card.dataset.signature===sig)return;card.dataset.signature=sig;
    card.innerHTML=`<div class="section-head"><div><span class="pill">ADAPTIVE LANGUAGE</span><h2>🌐 ${esc(isDebug()?'Profil de soutien linguistique':'Hồ sơ hỗ trợ ngôn ngữ')}</h2></div><span class="language-score">${p.explanation.score}/100</span></div><p>${esc(isDebug()?'Ce score interne décide seulement de la quantité de soutien vietnamien. Ce n’est ni un niveau CECRL ni une note de langue.':'Điểm nội bộ này chỉ quyết định mức hỗ trợ tiếng Việt. Đây không phải cấp độ CEFR hay điểm số ngôn ngữ.')}</p><div class="language-context-grid">${contexts.map(ctx=>{const r=ratioFor(ctx);return `<div><span>${esc(ctx)}</span><strong>VI ${r.vi}</strong><small>FR ${r.fr}</small><i><b style="width:${r.fr}%"></b></i></div>`}).join('')}</div><div class="language-evidence-grid"><div><strong>${p.evidence.memory.reviewed}</strong><span>${esc(isDebug()?'révisés':'đã ôn')}</span></div><div><strong>${p.evidence.memory.solid}</strong><span>${esc(isDebug()?'solides':'vững')}</span></div><div><strong>${p.evidence.listening.attempts}</strong><span>Listening</span></div><div><strong>${p.evidence.errors.recent}</strong><span>${esc(isDebug()?'erreurs 24h':'khó khăn 24h')}</span></div></div><div class="language-reason-block"><strong>${esc(isDebug()?labels[1]:labels[0])}</strong>${reasons.positives.map(x=>`<span class="positive">✓ ${esc(isDebug()?x[1]:x[0])}</span>`).join('')}${reasons.cautions.map(x=>`<span class="caution">↻ ${esc(isDebug()?x[1]:x[0])}</span>`).join('')}</div>`;
  }

  function injectSettings(){
    const diagnostics=document.querySelector('.screen-settings .diagnostics');if(!diagnostics)return;
    let row=diagnostics.querySelector('[data-language-diagnostic]');if(!row){row=document.createElement('div');row.dataset.languageDiagnostic='1';diagnostics.appendChild(row)}
    const p=profile();const r=ratioFor('daily');const labels=profileLabels(p.profile.id);const sig=`${p.profile.id}:${p.explanation.score}:${r.vi}`;if(row.dataset.signature===sig)return;row.dataset.signature=sig;
    row.innerHTML=`<span>${esc(isDebug()?'Soutien linguistique':'Hỗ trợ ngôn ngữ')}</span><strong>${esc(isDebug()?labels[1]:labels[0])} • VI ${r.vi} / FR ${r.fr}</strong>`;
  }

  function exposeSmoke(){
    const mode=new URLSearchParams(location.search).get('languageSmoke');if(!mode)return;
    const p=profile();const lesson=ratioFor('lesson-new');
    document.documentElement.dataset.languageSmokeMode=mode;
    document.documentElement.dataset.languageSmokeProfile=p.profile.id;
    document.documentElement.dataset.languageSmokeScore=String(p.explanation.score);
    document.documentElement.dataset.languageSmokeLessonVi=String(lesson.vi);
    document.documentElement.dataset.languageSmokeLessonFr=String(lesson.fr);
  }

  function decorate(){calculate();injectHome();injectLessonSupport();injectProgress();injectSettings();exposeSmoke()}
  function schedule(){if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;decorate()})}

  const previousSetItem=Storage.prototype.setItem;
  Storage.prototype.setItem=function(key,value){
    const result=previousSetItem.call(this,key,value);
    if(this===localStorage&&WATCHED.has(key))schedule();
    return result;
  };

  const app=document.getElementById('app');if(app)new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
  window.addEventListener('focus',schedule);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule()});
  calculate();decorate();

  window.FrenchTranquilleLanguage={version:'1.14.0',build:21,core:CORE,current:profile,refresh:decorate,ratioFor,text,pair,collectEvidence};
})();
