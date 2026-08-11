(() => {
  'use strict';

  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const LEARNER_KEY = 'francais-avec-luc:learner:v1';
  const MEMORY_KEY = 'french-tranquille:learning-memory:v1';
  const SCENARIO_KEY = 'french-tranquille:scenarios:v1';
  const MILESTONE_KEY = 'french-tranquille:milestones:v1';
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const esc = (value='') => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const json = (key, fallback={}) => { try { return JSON.parse(localStorage.getItem(key)||'null') || fallback; } catch { return fallback; } };

  let scheduled = false;
  let practiceMode = null;
  let listeningOverlay = null;
  let listeningSession = null;
  let reviewScreen = null;
  let reviewSession = null;
  let voiceSession = null;
  let pendingLessonFinish = false;
  let milestoneTimer = null;
  const params = new URLSearchParams(location.search);
  const smoke = params.get('sessionSmoke');

  function learner(){ return json(LEARNER_KEY,{}); }
  function memoryState(){ return json(MEMORY_KEY,{totals:{reviews:0,correct:0,easy:0},items:{}}); }
  function scenarioState(){ return json(SCENARIO_KEY,{totalCompletions:0,scenarios:{}}); }
  function listeningState(){ return window.FrenchTranquilleListening?.state?.() || {totals:{attempts:0,correct:0}}; }
  function memoryGood(mem=memoryState()){ return Number(mem.totals?.correct||0)+Number(mem.totals?.easy||0); }

  function navigateHome(){
    window.FrenchTranquilleListening?.close?.();
    const home = document.querySelector('[data-ux-nav="home"]') || document.querySelector('.bottom-nav [data-go="home"]');
    home?.click();
  }

  function sessionProgressHtml({icon='✓',label,current,target,sub=''}){
    const pct = target ? Math.min(100,Math.round(current/target*100)) : 0;
    return `<div class="session-contract"><div class="session-contract-copy"><span>${icon} ${esc(label)}</span><strong>${Math.min(current,target)} / ${target}</strong></div><div class="session-contract-bar"><i style="width:${pct}%"></i></div>${sub?`<small>${esc(sub)}</small>`:''}</div>`;
  }

  function successHtml({icon='✓',title,summary,primary=T('Về Hôm nay','Retour à Aujourd’hui'),secondary=T('Thêm 3 phút','Encore 3 minutes'),kind='generic'}){
    return `<section class="session-success session-success-${kind}" data-session-complete="${kind}"><div class="session-success-mark"><span>${icon}</span></div><span class="session-success-eyebrow">${esc(T('Xong phiên','Session terminée'))}</span><h2>${esc(title)}</h2><p>${esc(summary)}</p><div class="session-success-actions"><button class="primary" data-session-home>${esc(primary)} <span>›</span></button>${secondary?`<button class="secondary" data-session-more="${kind}">${esc(secondary)}</button>`:''}</div></section>`;
  }

  function achievedMilestones(){
    const l=learner();
    const mem=window.FrenchTranquilleMemory?.summary?.();
    const entries=mem?.entries||[];
    const solid=mem?.solid?.length||0;
    const scen=scenarioState();
    const listen=listeningState();
    return {
      'first-lesson': (l.completedLessons||[]).length>=1,
      'first-listening': Number(listen.totals?.attempts||0)>=5,
      'first-scenario': Number(scen.totalCompletions||0)>=1,
      'first-review': memoryGood()>=1,
      'first-voice': entries.some(e=>e.lastSource==='free-voice-voice' && Number(e.successes||0)>0),
      'solid-10': solid>=10,
      'solid-25': solid>=25,
      'solid-50': solid>=50,
      'a0-block': (l.completedLessons||[]).includes('l15'),
      'a1-block': (l.completedLessons||[]).includes('l40')
    };
  }

  const MILESTONE_COPY = {
    'first-lesson':['🎓','Bài học đầu tiên hoàn thành','Première leçon terminée'],
    'first-listening':['🎧','Phiên nghe đầu tiên hoàn thành','Première session d’écoute terminée'],
    'first-scenario':['🎭','Tình huống thực tế đầu tiên','Première situation réelle terminée'],
    'first-review':['🧠','Lần nhớ lại đầu tiên thành công','Premier rappel réussi'],
    'first-voice':['🎙️','Câu nói đầu tiên được nhận ra','Première réponse vocale reconnue'],
    'solid-10':['✦','10 mục đã vững','10 acquis consolidés'],
    'solid-25':['✦','25 mục đã vững','25 acquis consolidés'],
    'solid-50':['✦','50 mục đã vững','50 acquis consolidés'],
    'a0-block':['🌱','Hoàn thành khối A0 đầu tiên','Premier bloc A0 terminé'],
    'a1-block':['🌟','Hoàn thành lộ trình A1 đầu tiên','Premier parcours A1 terminé']
  };

  function loadMilestones(){
    const existing=json(MILESTONE_KEY,null);
    if(existing?.schemaVersion===1)return existing;
    const current=achievedMilestones();
    const seen={};Object.entries(current).forEach(([id,ok])=>{if(ok)seen[id]='baseline'});
    const initial={schemaVersion:1,seen,updatedAt:new Date().toISOString()};
    localStorage.setItem(MILESTONE_KEY,JSON.stringify(initial));
    return initial;
  }
  let milestones=loadMilestones();

  function showMilestone(id){
    const copy=MILESTONE_COPY[id];if(!copy)return;
    document.querySelector('.milestone-toast')?.remove();
    const toast=document.createElement('div');toast.className='milestone-toast';toast.dataset.milestone=id;
    toast.innerHTML=`<span>${copy[0]}</span><div><small>${esc(T('Cột mốc mới','Nouveau jalon'))}</small><strong>${esc(T(copy[1],copy[2]))}</strong></div>`;
    document.body.appendChild(toast);
    requestAnimationFrame(()=>toast.classList.add('show'));
    clearTimeout(milestoneTimer);milestoneTimer=setTimeout(()=>{toast.classList.remove('show');setTimeout(()=>toast.remove(),220)},3200);
  }

  function unlockMilestone(id){
    if(milestones.seen?.[id])return;
    milestones.seen={...(milestones.seen||{}),[id]:new Date().toISOString()};milestones.updatedAt=new Date().toISOString();
    localStorage.setItem(MILESTONE_KEY,JSON.stringify(milestones));showMilestone(id);
  }

  function checkMilestones(){
    const current=achievedMilestones();
    Object.entries(current).forEach(([id,ok])=>{if(ok&&!milestones.seen?.[id])unlockMilestone(id)});
  }

  function beginListeningSession(overlay,target=5){
    const st=listeningState();
    listeningOverlay=overlay;
    listeningSession={baselineAttempts:Number(st.totals?.attempts||0),baselineCorrect:Number(st.totals?.correct||0),target,done:false};
  }

  function decorateListening(){
    const overlay=document.querySelector('.listening-overlay');
    if(!overlay){listeningOverlay=null;listeningSession=null;return}
    if(overlay!==listeningOverlay||!listeningSession)beginListeningSession(overlay,5);
    const shell=overlay.querySelector('.listening-shell');if(!shell)return;
    const st=listeningState();
    const attempts=Math.max(0,Number(st.totals?.attempts||0)-listeningSession.baselineAttempts);
    const correct=Math.max(0,Number(st.totals?.correct||0)-listeningSession.baselineCorrect);
    const target=listeningSession.target;
    let contract=shell.querySelector(':scope > .session-listening-contract');
    const signature=`${attempts}:${correct}:${target}:${listeningSession.done?1:0}`;
    if(!contract){contract=document.createElement('div');contract.className='session-listening-contract';shell.querySelector('.listening-top')?.insertAdjacentElement('afterend',contract)}
    if(contract.dataset.signature!==signature){contract.dataset.signature=signature;contract.innerHTML=sessionProgressHtml({icon:'🎧',label:T(`Mục tiêu: ${target} câu nghe`, `Objectif : ${target} questions`),current:attempts,target,sub:attempts<target?T(`Còn ${Math.max(0,target-attempts)} câu`,`Encore ${Math.max(0,target-attempts)}`):T('Mục tiêu hoàn thành','Objectif atteint')})}
    if(attempts>=target&&!listeningSession.done){listeningSession.done=true;unlockMilestone('first-listening')}
    shell.classList.toggle('session-complete-mode',listeningSession.done);
    if(listeningSession.done){
      let done=shell.querySelector(':scope > .session-success');
      if(!done){done=document.createElement('div');done.innerHTML=successHtml({icon:'✓',title:T('Bạn đã hoàn thành phần nghe','Ta session d’écoute est terminée'),summary:T(`${correct}/${target} câu đúng. Tiến độ đã được lưu.`,`${correct}/${target} réponses correctes. Ta progression est enregistrée.`),kind:'listening'});shell.appendChild(done.firstElementChild)}
    }else shell.querySelector(':scope > .session-success')?.remove();
    document.documentElement.dataset.sessionListeningProgress=`${Math.min(attempts,target)}/${target}`;
    document.documentElement.dataset.sessionListeningDone=listeningSession.done?'1':'0';
  }

  function reviewTotals(){const m=memoryState();return {reviews:Number(m.totals?.reviews||0),good:memoryGood(m)}}
  function beginReviewSession(screen){
    const totals=reviewTotals();
    const summary=window.FrenchTranquilleMemory?.summary?.()||{entries:[],due:[]};
    const available=summary.due?.length||summary.entries?.length||1;
    reviewScreen=screen;reviewSession={baselineReviews:totals.reviews,baselineGood:totals.good,target:Math.max(1,Math.min(5,available)),done:false};
  }

  function decorateReview(){
    const screen=document.querySelector('.screen-review');
    if(!screen){reviewScreen=null;reviewSession=null;return}
    const flash=screen.querySelector('.flashcard');if(!flash)return;
    if(screen!==reviewScreen||!reviewSession)beginReviewSession(screen);
    const totals=reviewTotals();const count=Math.max(0,totals.reviews-reviewSession.baselineReviews);const good=Math.max(0,totals.good-reviewSession.baselineGood);const target=reviewSession.target;
    let goal=screen.querySelector('.session-review-contract');if(!goal){goal=document.createElement('div');goal.className='session-review-contract narrow';flash.insertAdjacentElement('beforebegin',goal)}
    const sig=`${count}:${good}:${target}:${reviewSession.done?1:0}`;if(goal.dataset.signature!==sig){goal.dataset.signature=sig;goal.innerHTML=sessionProgressHtml({icon:'🧠',label:T(`Ôn ${target} mục quan trọng`,`Réviser ${target} élément${target>1?'s':''} prioritaire${target>1?'s':''}`),current:count,target,sub:count<target?T(`Còn ${target-count} mục`,`Encore ${target-count}`):T('Đã hoàn thành','Terminé')})}
    if(count>=target&&!reviewSession.done){reviewSession.done=true;if(good>0)unlockMilestone('first-review')}
    flash.classList.toggle('session-hidden',reviewSession.done);
    let done=screen.querySelector('.session-review-success');
    if(reviewSession.done&&!done){done=document.createElement('div');done.className='session-review-success narrow';done.innerHTML=successHtml({icon:'✓',title:T('Ôn tập xong','Révision terminée'),summary:T(`${good}/${target} mục được nhớ đúng hoặc dễ. Tiến độ đã lưu.`,`${good}/${target} élément(s) rappelé(s) correctement. Progression enregistrée.`),kind:'review'});flash.insertAdjacentElement('afterend',done)}
    if(!reviewSession.done)done?.remove();
    document.documentElement.dataset.sessionReviewProgress=`${Math.min(count,target)}/${target}`;document.documentElement.dataset.sessionReviewDone=reviewSession.done?'1':'0';
  }

  function launcherHtml(recommended='scenario'){
    const scenarioAvailable=Boolean(document.querySelector('.scenario-lab-card [data-scenario-start]'));
    const options=[
      ['scenario','🎭',T('Tình huống thực tế','Situation réelle'),T('Một tình huống ngắn, có mục tiêu rõ ràng.','Une situation courte avec un objectif clair.'),scenarioAvailable],
      ['voice','🎙️',T('Lặp lại bằng giọng nói','Répondre à l’oral'),T('5 câu đã học, bằng micro hoặc bàn phím.','5 réponses déjà apprises, micro ou clavier.'),true],
      ['guided','💬',T('Thực hành có hướng dẫn','Pratique guidée'),T('Một câu đơn giản với Lucie.','Une phrase simple avec Lucie.'),true]
    ];
    const primary=options.find(o=>o[0]===recommended&&o[4])||options.find(o=>o[4]);
    return `<section class="card practice-session-hub"><span class="session-success-eyebrow">${esc(T('Lucie đề xuất','Recommandé maintenant'))}</span><h2>${primary[1]} ${esc(primary[2])}</h2><p>${esc(primary[3])}</p><button class="primary full" data-session-practice-mode="${primary[0]}">${esc(T('Bắt đầu • khoảng 3 phút','Commencer • ≈ 3 min'))} <span>›</span></button><div class="practice-session-alternatives"><small>${esc(T('Cách khác để luyện','Autres façons de pratiquer'))}</small>${options.filter(o=>o[0]!==primary[0]).map(o=>`<button data-session-practice-mode="${o[0]}" ${o[4]?'':'disabled'}><span>${o[1]}</span><strong>${esc(o[2])}</strong><b>›</b></button>`).join('')}</div></section>`;
  }

  function decoratePractice(){
    const root=document.querySelector('.screen-conversation .narrow');if(!root){practiceMode=null;voiceSession=null;return}
    const scenario=root.querySelector('.scenario-lab-card');const voice=root.querySelector('#free-voice-card');const guided=root.querySelector('.conversation-card');const quiet=root.querySelector('.card.quiet');
    const scenarioRunning=Boolean(scenario?.querySelector('.scenario-runner,.scenario-done'));
    if(scenarioRunning)practiceMode='scenario';
    let hub=root.querySelector(':scope > .practice-session-hub');
    if(!practiceMode){if(!hub){const wrap=document.createElement('div');wrap.innerHTML=launcherHtml('scenario');hub=wrap.firstElementChild;root.prepend(hub)} }
    else hub?.remove();
    [scenario,voice,guided,quiet].forEach(el=>el?.classList.add('session-mode-hidden'));
    if(practiceMode==='scenario')scenario?.classList.remove('session-mode-hidden');
    if(practiceMode==='voice')voice?.classList.remove('session-mode-hidden');
    if(practiceMode==='guided')guided?.classList.remove('session-mode-hidden');
    quiet?.classList.add('session-mode-hidden');
    let modeHead=root.querySelector(':scope > .practice-mode-head');
    if(practiceMode&&!scenarioRunning){if(!modeHead){modeHead=document.createElement('div');modeHead.className='practice-mode-head';modeHead.innerHTML=`<button class="secondary" data-session-practice-back>‹ ${esc(T('Chọn cách luyện khác','Changer de pratique'))}</button>`;root.prepend(modeHead)}}else modeHead?.remove();
    document.documentElement.dataset.sessionPracticeMode=practiceMode||'hub';
    decorateVoice();decorateScenario();
  }

  function beginVoiceSession(target=5){voiceSession={count:0,target,done:false}}
  function decorateVoice(){
    if(practiceMode!=='voice')return;
    const card=document.querySelector('#free-voice-card');if(!card)return;
    if(!voiceSession)beginVoiceSession(5);
    if(voiceSession.done){if(!card.querySelector('.session-success'))card.innerHTML=successHtml({icon:'🎙️',title:T('Luyện nói xong','Pratique orale terminée'),summary:T(`${voiceSession.target} câu đã được nhận đúng. Tiến độ đã lưu.`,`${voiceSession.target} réponses reconnues. Progression enregistrée.`),kind:'voice'});return}
    card.classList.add('session-voice-managed');
    let goal=card.querySelector(':scope > .session-voice-contract');if(!goal){goal=document.createElement('div');goal.className='session-voice-contract';card.prepend(goal)}
    goal.innerHTML=sessionProgressHtml({icon:'🎙️',label:T(`Mục tiêu: ${voiceSession.target} câu`,`Objectif : ${voiceSession.target} réponses`),current:voiceSession.count,target:voiceSession.target,sub:T(`Còn ${Math.max(0,voiceSession.target-voiceSession.count)} câu`,`Encore ${Math.max(0,voiceSession.target-voiceSession.count)}`)});
    document.documentElement.dataset.sessionVoiceProgress=`${voiceSession.count}/${voiceSession.target}`;
  }

  function decorateScenario(){
    const runner=document.querySelector('.scenario-runner');
    if(runner){const turn=runner.querySelector('.scenario-turn')?.textContent?.trim()||'';let goal=runner.querySelector(':scope > .session-scenario-contract');if(!goal){goal=document.createElement('div');goal.className='session-scenario-contract';runner.querySelector('.scenario-runner-head')?.insertAdjacentElement('afterend',goal)}goal.innerHTML=`<span>🎭 ${esc(T('Mục tiêu: hoàn thành 1 tình huống','Objectif : terminer 1 situation'))}</span><strong>${esc(turn)}</strong>`;}
    const done=document.querySelector('.scenario-done');
    if(done){done.classList.add('session-native-success');unlockMilestone('first-scenario');const actions=done.querySelector('.scenario-done-actions');if(actions&&!actions.querySelector('[data-session-home]')){const replay=actions.querySelector('[data-scenario-replay]');if(replay)replay.classList.add('session-tertiary-hidden');const home=document.createElement('button');home.className='primary';home.dataset.sessionHome='1';home.innerHTML=`${esc(T('Về Hôm nay','Retour à Aujourd’hui'))} <span>›</span>`;actions.appendChild(home)}}
  }

  function decorateDaily(){
    const card=document.querySelector('.daily-coach-card');const steps=card?.querySelector('.daily-steps');if(!card||!steps)return;
    const all=[...steps.querySelectorAll(':scope > .daily-step')];
    const more=card.querySelector('.session-daily-more');if(more){[...more.querySelectorAll('.daily-step')].forEach(btn=>steps.appendChild(btn));more.remove()}
    const buttons=[...steps.querySelectorAll(':scope > .daily-step')];if(buttons.length<=2)return;
    const plan=window.FrenchTranquilleDailyCoach?.plan?.();const review=buttons.find(b=>b.matches('[data-daily-review]'));const lesson=buttons.find(b=>b.matches('[data-daily-lesson]'));const conversation=buttons.find(b=>b.matches('[data-daily-conversation]'));const listening=buttons.find(b=>b.matches('.listening-daily-step'));
    const primary=[];if(plan?.mem?.due?.length&&review)primary.push(review);if(lesson&&!primary.includes(lesson))primary.push(lesson);if(primary.length<2&&conversation&&!conversation.disabled)primary.push(conversation);if(primary.length<2&&listening&&!listening.disabled)primary.push(listening);if(primary.length<2&&review&&!primary.includes(review))primary.push(review);
    const extras=buttons.filter(b=>!primary.includes(b));primary.forEach(b=>steps.appendChild(b));
    if(extras.length){const details=document.createElement('details');details.className='session-daily-more';details.innerHTML=`<summary>${esc(T('Xem hoạt động khác','Voir les autres activités'))} <span>⌄</span></summary><div></div>`;extras.forEach(b=>details.querySelector('div').appendChild(b));steps.insertAdjacentElement('afterend',details)}
    card.dataset.sessionDailyVisible=String(primary.length);card.dataset.sessionDailyExtra=String(extras.length);
  }

  function decorateLesson(){
    const lesson=document.querySelector('.screen-lesson');
    if(!lesson){if(pendingLessonFinish)decorateLessonCompletion();return}
    const next=lesson.querySelector('[data-next]');if(!next)return;
    const isFinal=/Hoàn thành|Terminer/i.test(next.textContent||'');
    lesson.classList.toggle('session-lesson-final',isFinal);
    if(isFinal){const step=lesson.querySelector('.lesson-step');if(step&&!step.querySelector('.session-lesson-finish-note')){const note=document.createElement('div');note.className='session-lesson-finish-note';note.innerHTML=`<span>✓</span><div><strong>${esc(T('Bước cuối cùng','Dernière étape'))}</strong><small>${esc(T('Nhấn Hoàn thành để lưu bài học.','Appuie sur Terminer pour enregistrer la leçon.'))}</small></div>`;step.appendChild(note)}}
  }

  function decorateLessonCompletion(){
    const home=document.querySelector('.screen-home .content');if(!home||!pendingLessonFinish)return;
    pendingLessonFinish=false;
    if(home.querySelector('.lesson-session-complete'))return;
    const box=document.createElement('div');box.className='lesson-session-complete';box.innerHTML=`<div class="session-success-mark"><span>✓</span></div><div><small>${esc(T('Bài học đã lưu','Leçon enregistrée'))}</small><strong>${esc(T('Xong bài này. Bạn có thể dừng ở đây.','Leçon terminée. Tu peux t’arrêter ici.'))}</strong></div><button data-session-dismiss-lesson aria-label="OK">×</button>`;
    const top=home.querySelector('.topbar');if(top)top.insertAdjacentElement('afterend',box);else home.prepend(box);
    checkMilestones();
  }

  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;decorate()})}
  function decorate(){decorateListening();decorateReview();decoratePractice();decorateDaily();decorateLesson();checkMilestones();runSmokeHook()}

  document.addEventListener('click',event=>{
    if(event.target.closest('[data-session-home]')){event.preventDefault();navigateHome();return}
    const more=event.target.closest('[data-session-more]');if(more){event.preventDefault();const kind=more.dataset.sessionMore;if(kind==='listening'&&listeningSession){const st=listeningState();listeningSession={baselineAttempts:Number(st.totals?.attempts||0),baselineCorrect:Number(st.totals?.correct||0),target:3,done:false};const shell=document.querySelector('.listening-shell');shell?.classList.remove('session-complete-mode');shell?.querySelector(':scope > .session-success')?.remove();shell?.querySelector('[data-listening-next]')?.click();schedule()}if(kind==='review'&&reviewSession){const totals=reviewTotals();reviewSession={baselineReviews:totals.reviews,baselineGood:totals.good,target:Math.max(1,Math.min(3,window.FrenchTranquilleMemory?.summary?.().entries?.length||3)),done:false};document.querySelector('.screen-review .flashcard')?.classList.remove('session-hidden');document.querySelector('.session-review-success')?.remove();schedule()}if(kind==='voice'){beginVoiceSession(3);document.querySelector('#free-voice-card')?.remove();schedule()}return}
    const mode=event.target.closest('[data-session-practice-mode]');if(mode){event.preventDefault();practiceMode=mode.dataset.sessionPracticeMode;if(practiceMode==='voice')beginVoiceSession(5);schedule();return}
    if(event.target.closest('[data-session-practice-back]')){event.preventDefault();practiceMode=null;voiceSession=null;schedule();return}
    if(event.target.closest('#free-voice-next')&&practiceMode==='voice'&&voiceSession&&!voiceSession.done){voiceSession.count+=1;if(voiceSession.count>=voiceSession.target){voiceSession.done=true;const mem=window.FrenchTranquilleMemory?.summary?.();if(mem?.entries?.some(e=>e.lastSource==='free-voice-voice'&&Number(e.successes||0)>0))unlockMilestone('first-voice')}setTimeout(schedule,0)}
    if(event.target.closest('.screen-lesson [data-next]')&&document.querySelector('.screen-lesson')?.classList.contains('session-lesson-final'))pendingLessonFinish=true;
    if(event.target.closest('[data-session-dismiss-lesson]'))event.target.closest('.lesson-session-complete')?.remove();
  },true);

  const app=document.getElementById('app');if(app)new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
  const bodyObserver=new MutationObserver(schedule);bodyObserver.observe(document.body,{childList:true,subtree:false});

  let smokeStarted=false;
  function runSmokeHook(){
    if(!smoke||smokeStarted)return;
    smokeStarted=true;
    if(smoke==='practice')setTimeout(()=>{document.querySelector('[data-ux-nav="practice"]')?.click();setTimeout(()=>{document.querySelector('[data-practice-action="conversation"]')?.click?.();schedule();document.documentElement.dataset.sessionSmokePractice=document.querySelector('.practice-session-hub')?'1':'0'},250)},120);
    if(smoke==='review')setTimeout(()=>{document.querySelector('.bottom-nav [data-go="review"]')?.click();let n=0;const step=()=>{if(n>=5){schedule();return}const reveal=document.querySelector('[data-memory-reveal]');if(reveal)reveal.click();setTimeout(()=>{const rate=document.querySelector('[data-memory-rate="1"]');if(rate){rate.click();n+=1}setTimeout(step,70)},50)};setTimeout(step,180)},120);
    if(smoke==='listening')setTimeout(()=>{const l=learner();l.knownItems=[...new Set([...(l.knownItems||[]),'bonjour','merci','au-revoir','je-mappelle','je-voudrais','cafe','svp'])];localStorage.setItem(LEARNER_KEY,JSON.stringify(l));window.FrenchTranquilleListening?.open?.();let n=0;const step=()=>{if(n>=5){schedule();return}const answer=document.querySelector('[data-listening-answer]');if(!answer){setTimeout(step,80);return}answer.click();n+=1;setTimeout(()=>{document.querySelector('[data-listening-next]')?.click();setTimeout(step,70)},70)};setTimeout(step,180)},120);
  }

  schedule();
  window.FrenchTranquilleSessionUX={version:'1.18.2',build:'25.2',milestoneKey:MILESTONE_KEY,schedule,state:()=>({practiceMode,listeningSession,reviewSession,voiceSession})};
})();
