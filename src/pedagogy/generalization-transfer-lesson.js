(() => {
  'use strict';

  const DEBUG='tran-french-teacher:debug-fr:v1';
  const LESSON=33;
  const EXERCISE_INDEXES=Object.freeze([0,2,5]);
  const FUTURE_LESSON=35;
  const FUTURE_EXERCISE_INDEXES=Object.freeze([0,1,3]);
  const NUMBER_LESSON=13;
  const NUMBER_EXERCISE_INDEXES=Object.freeze([0,2,3]);
  const NEGATION_LESSON=34;
  const NEGATION_EXERCISE_INDEXES=Object.freeze([0,1,2]);
  const SPOKEN_ON_LESSON=52;
  const SPOKEN_ON_EXERCISE_INDEXES=Object.freeze([0,1,2]);
  const root=document.documentElement;
  const core=window.FrenchTranquilleGeneralizationTransfer;
  const futureCore=window.FrenchTranquilleGeneralizationFuturProche;
  const numberCore=window.FrenchTranquilleGeneralizationNumber;
  const negationCore=window.FrenchTranquilleGeneralizationNegation;
  const spokenOnCore=window.FrenchTranquilleGeneralizationSpokenOn;
  const T=(vi,fr)=>localStorage.getItem(DEBUG)==='1'?fr:vi;
  const locale=()=>localStorage.getItem(DEBUG)==='1'?'fr':'vi';
  const esc=(value='')=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[char]));

  if(!core||core.family?.id!=='subject-substitution-regular-er'||!futureCore||futureCore.family?.id!=='present-futur-proche-travailler-singular'){
    root.dataset.transferLessonAdapter='missing';
    console.error('[French Trân’quille] Build 38.5 transfer dependencies are missing');
    return;
  }

  const hasNumberCore=numberCore?.family?.id==='singular-plural-regular-noun-phrases';
  const hasNegationCore=negationCore?.family?.id==='affirmation-negation-regular-er-je';
  const hasSpokenOnCore=spokenOnCore?.family?.id==='nous-on-spoken-equivalence';
  const legacyExercises=Object.freeze(EXERCISE_INDEXES.map(index=>core.catalog[index]));
  const futureExercises=Object.freeze(FUTURE_EXERCISE_INDEXES.map(index=>futureCore.catalog[index]));
  const numberExercises=Object.freeze(hasNumberCore?NUMBER_EXERCISE_INDEXES.map(index=>numberCore.catalog[index]):[]);
  const negationExercises=Object.freeze(hasNegationCore?NEGATION_EXERCISE_INDEXES.map(index=>negationCore.catalog[index]):[]);
  const spokenOnExercises=Object.freeze(hasSpokenOnCore?SPOKEN_ON_EXERCISE_INDEXES.map(index=>spokenOnCore.catalog[index]):[]);
  const ROUTES=Object.freeze([
    Object.freeze({
      lesson:LESSON,
      slice:'38.2',
      core,
      family:core.family.id,
      exerciseIndexes:EXERCISE_INDEXES,
      exercises:legacyExercises,
      entryCopyVi:'3 câu ngắn: đổi người, giữ ý và động từ, rồi xây lại cả câu. Không bắt buộc để tiếp tục bài.',
      entryCopyFr:'3 phrases courtes : change la personne, garde l’idée et le verbe, puis reconstruis toute la phrase. Facultatif pour continuer la leçon.',
      introCopyVi:'Không học thêm từ mới. Bạn chỉ dùng những câu và mẫu đã gặp để tự xây một câu khác.',
      introCopyFr:'Pas de nouveau vocabulaire : tu réutilises seulement des phrases et des formes déjà rencontrées pour construire une autre phrase.',
      correctVi:'✓ Đúng. Bạn đã đổi người và xây lại đúng cả câu.',
      correctFr:'✓ Correct. Tu as changé la personne et reconstruit toute la phrase.',
      doneTitleVi:'Bạn vừa tự xây 3 câu',
      doneTitleFr:'Tu viens de construire 3 phrases',
      doneCopyVi:'Bạn đã giữ ý chính, đổi người làm hành động và điều chỉnh động từ. Đây là luyện chuyển đổi, không phải điểm “thành thạo”.',
      doneCopyFr:'Tu as gardé l’idée, changé la personne qui agit et ajusté le verbe. C’est un exercice de transfert, pas un score de « maîtrise ».'
    }),
    Object.freeze({
      lesson:FUTURE_LESSON,
      slice:'38.5',
      core:futureCore,
      family:futureCore.family.id,
      exerciseIndexes:FUTURE_EXERCISE_INDEXES,
      exercises:futureExercises,
      entryCopyVi:'3 câu ngắn: giữ cùng người và hành động, rồi chuyển sang “sắp làm” với aller + động từ nguyên mẫu. Không bắt buộc để tiếp tục bài.',
      entryCopyFr:'3 phrases courtes : garde la même personne et l’action, puis passe au futur proche avec aller + infinitif. Facultatif pour continuer la leçon.',
      introCopyVi:'Bạn không học thêm từ mới. Chỉ giữ cùng người và hành động, rồi dùng đúng dạng aller + travailler.',
      introCopyFr:'Pas de nouveau vocabulaire : garde la même personne et la même action, puis utilise la bonne forme de aller + travailler.',
      correctVi:'✓ Đúng. Bạn đã giữ cùng người và chuyển hành động sang tương lai gần.',
      correctFr:'✓ Correct. Tu as gardé la même personne et reconstruit l’action au futur proche.',
      doneTitleVi:'Bạn vừa xây 3 câu ở tương lai gần',
      doneTitleFr:'Tu viens de construire 3 phrases au futur proche',
      doneCopyVi:'Bạn đã giữ cùng người và hành động, rồi dùng aller + động từ nguyên mẫu. Đây là luyện chuyển đổi, không phải điểm “thành thạo”.',
      doneCopyFr:'Tu as gardé la même personne et la même action, puis utilisé aller + infinitif. C’est un exercice de transfert, pas un score de « maîtrise ».'
    }),
    hasNumberCore?Object.freeze({
      lesson:NUMBER_LESSON,
      slice:'38.7',
      core:numberCore,
      family:numberCore.family.id,
      exerciseIndexes:NUMBER_EXERCISE_INDEXES,
      exercises:numberExercises,
      eyebrowVi:'CHUYỂN ĐỔI',
      eyebrowFr:'TRANSFORMER',
      entryCtaVi:'Thử 3 nhóm từ • khoảng 2 phút',
      entryCtaFr:'Essayer 3 groupes • ≈ 2 min',
      startCtaVi:'Bắt đầu 3 nhóm từ',
      startCtaFr:'Commencer les 3 groupes',
      entryCopyVi:'3 nhóm từ đã gặp: đổi từ số ít sang số nhiều bằng cách đổi cả từ đứng trước và danh từ. Không bắt buộc để tiếp tục bài.',
      entryCopyFr:'3 groupes déjà rencontrés : passe du singulier au pluriel en changeant le déterminant et le nom. Facultatif pour continuer la leçon.',
      introCopyVi:'Không có từ mới. Bạn đổi cả hai phần: la → les hoặc un/une → des, rồi thêm -s cho danh từ thường.',
      introCopyFr:'Pas de nouveau vocabulaire. Change les deux parties : la → les ou un/une → des, puis ajoute -s au nom régulier.',
      correctVi:'✓ Đúng. Bạn đã đổi cả từ đứng trước và danh từ sang số nhiều.',
      correctFr:'✓ Correct. Tu as mis le déterminant et le nom au pluriel.',
      doneTitleVi:'Bạn vừa chuyển 3 nhóm từ sang số nhiều',
      doneTitleFr:'Tu viens de passer 3 groupes au pluriel',
      doneCopyVi:'Bạn đã đổi cả từ đứng trước và danh từ. Đây là luyện chuyển đổi, không phải điểm “thành thạo”.',
      doneCopyFr:'Tu as transformé le déterminant et le nom. C’est un exercice de transfert, pas un score de « maîtrise ».'
    }):null,
    hasNegationCore?Object.freeze({
      lesson:NEGATION_LESSON,
      slice:'38.8',
      core:negationCore,
      family:negationCore.family.id,
      exerciseIndexes:NEGATION_EXERCISE_INDEXES,
      exercises:negationExercises,
      eyebrowVi:'CHUYỂN ĐỔI',
      eyebrowFr:'TRANSFORMER',
      entryCopyVi:'3 câu đã gặp: giữ cùng người, động từ và ý chính, rồi chuyển sang phủ định đầy đủ với ne / n’ ... pas. Không bắt buộc để tiếp tục bài.',
      entryCopyFr:'3 phrases déjà rencontrées : garde la même personne, le même verbe et la même idée, puis passe à la négation complète avec ne / n’ ... pas. Facultatif pour continuer la leçon.',
      introCopyVi:'Không có từ mới. Giữ nguyên câu, đặt ne / n’ trước động từ và pas sau động từ.',
      introCopyFr:'Pas de nouveau vocabulaire. Garde la phrase et place ne / n’ avant le verbe, puis pas après le verbe.',
      correctVi:'✓ Đúng. Bạn đã giữ nguyên ý và xây lại câu ở dạng phủ định đầy đủ.',
      correctFr:'✓ Correct. Tu as gardé la même idée et reconstruit la phrase à la négation complète.',
      doneTitleVi:'Bạn vừa chuyển 3 câu sang phủ định',
      doneTitleFr:'Tu viens de passer 3 phrases à la négation',
      doneCopyVi:'Bạn đã giữ cùng người, động từ và ý chính, rồi thêm ne / n’ ... pas đúng chỗ. Đây là luyện chuyển đổi, không phải điểm “thành thạo”.',
      doneCopyFr:'Tu as gardé la même personne, le même verbe et la même idée, puis placé ne / n’ ... pas correctement. C’est un exercice de transfert, pas un score de « maîtrise ».'
    }):null,
    hasSpokenOnCore?Object.freeze({
      lesson:SPOKEN_ON_LESSON,
      slice:'38.10',
      core:spokenOnCore,
      family:spokenOnCore.family.id,
      exerciseIndexes:SPOKEN_ON_EXERCISE_INDEXES,
      exercises:spokenOnExercises,
      eyebrowVi:'NÓI TỰ NHIÊN',
      eyebrowFr:'FRANÇAIS ORAL',
      entryCopyVi:'3 câu bạn đã học với « nous »: giữ cùng nhóm người và hành động, rồi tự xây lại theo cách nói rất thường gặp với « on ». Không bắt buộc để tiếp tục bài.',
      entryCopyFr:'3 phrases déjà apprises avec « nous » : garde le même groupe et la même action, puis reconstruis-les comme on les dit très souvent avec « on ». Facultatif pour continuer la leçon.',
      introCopyVi:'Quy tắc đã có trong bài. Ở đây bạn không học thêm: hãy tự chuyển « nous » sang « on » và dùng dạng động từ như với il/elle.',
      introCopyFr:'La règle est déjà dans la leçon. Ici, rien de nouveau : transforme toi-même « nous » en « on » et prends la forme verbale de il/elle.',
      correctVi:'✓ Đúng. Bạn đã giữ cùng ý “chúng ta” và xây lại câu với « on » đúng dạng động từ.',
      correctFr:'✓ Correct. Tu as gardé le même sens « nous » et reconstruit la phrase avec « on » et la bonne forme verbale.',
      doneTitleVi:'Bạn vừa chuyển 3 câu từ « nous » sang « on »',
      doneTitleFr:'Tu viens de passer 3 phrases de « nous » à « on »',
      doneCopyVi:'Bạn đã lấy những câu « nous » đã biết và tự tạo phiên bản nói tự nhiên với « on ». Đây là luyện chuyển đổi, không phải điểm “thành thạo”.',
      doneCopyFr:'Tu as repris des phrases connues avec « nous » et construit leur version orale naturelle avec « on ». C’est un exercice de transfert, pas un score de « maîtrise ».'
    }):null
  ].filter(Boolean));

  let overlay=null,lastTrigger=null,scheduled=false,session=null,activeRoute=ROUTES[0],activeCore=core,exercises=legacyExercises;

  function currentLessonNumber(){
    const title=document.querySelector('.screen-lesson .topbar h1')?.textContent||'';
    return Number(title.match(/\d+/)?.[0]||0);
  }

  function routeForLesson(number){return ROUTES.find(route=>route.lesson===number)||null}

  function installStyle(){
    if(document.getElementById('ft-transfer-lesson-style'))return;
    const style=document.createElement('style');
    style.id='ft-transfer-lesson-style';
    style.textContent=`
      .ft-transfer-entry{margin-top:12px;padding:15px;border:1px solid rgba(126,233,201,.25);border-radius:18px;background:linear-gradient(145deg,rgba(40,104,102,.2),rgba(72,67,137,.14));display:grid;gap:10px}.ft-transfer-entry h3{margin:0}.ft-transfer-entry p{margin:0;color:#9fb0c5;line-height:1.5}.ft-transfer-entry button{width:100%;min-height:46px}.ft-transfer-eyebrow{font-size:.72rem;letter-spacing:.14em;font-weight:800;color:#7ee9c9}
      .ft-transfer-overlay{position:fixed;inset:0;z-index:1510;background:rgba(4,9,17,.91);backdrop-filter:blur(12px);display:flex;padding:max(16px,env(safe-area-inset-top)) 12px max(16px,env(safe-area-inset-bottom));overflow:auto}.ft-transfer-dialog{width:min(620px,100%);margin:auto;background:#111d2e;border:1px solid rgba(183,203,231,.18);border-radius:24px;padding:20px;display:grid;gap:17px;box-shadow:0 24px 80px rgba(0,0,0,.4)}.ft-transfer-top{display:flex;justify-content:space-between;gap:12px}.ft-transfer-top h2{margin:4px 0 0}.ft-transfer-close{min-width:46px;height:46px}.ft-transfer-bar{height:5px;background:rgba(255,255,255,.08);border-radius:99px;overflow:hidden}.ft-transfer-bar i{display:block;height:100%;background:linear-gradient(90deg,#74e8c6,#9fa9ff)}.ft-transfer-copy{line-height:1.58;color:#d7e0ec}.ft-transfer-copy p{margin-bottom:0}.ft-transfer-source{padding:14px;border-radius:15px;background:#091522;text-align:center;font-size:1.05rem;font-weight:800}.ft-transfer-q{display:grid;gap:12px}.ft-transfer-q h3{margin:0}.ft-transfer-options{display:grid;gap:8px}.ft-transfer-options button{min-height:48px}.ft-transfer-options .ok{outline:2px solid #74e8c6}.ft-transfer-options .bad{outline:2px solid #e86f7d}.ft-transfer-feedback{min-height:25px;margin:0;color:#aebdd0;line-height:1.45}.ft-transfer-next{min-height:48px}.ft-transfer-done{text-align:center}.ft-transfer-done .mark{font-size:2.4rem}.ft-transfer-done p{color:#b6c4d6;line-height:1.55}@media(max-width:520px){.ft-transfer-dialog{padding:17px;border-radius:20px}}
    `;
    document.head.appendChild(style);
  }

  function entryMarkup(route){
    const eyebrow=T(route.eyebrowVi||'XÂY CÂU',route.eyebrowFr||'CONSTRUIRE UNE PHRASE');
    const cta=T(route.entryCtaVi||'Thử 3 câu • khoảng 2 phút',route.entryCtaFr||'Essayer 3 phrases • ≈ 2 min');
    return `<section class="ft-transfer-entry" data-transfer-entry data-transfer-family="${esc(route.family)}" data-transfer-lesson="${route.lesson}"><span class="ft-transfer-eyebrow">🔁 ${esc(eyebrow)}</span><h3>${esc(route.core.family.title[locale()])}</h3><p>${esc(T(route.entryCopyVi,route.entryCopyFr))}</p><button type="button" class="secondary" data-transfer-open>${esc(cta)} ›</button></section>`;
  }

  function activateRoute(route){
    activeRoute=route;
    activeCore=route.core;
    exercises=route.exercises;
  }

  function mountEntry(){
    const route=routeForLesson(currentLessonNumber());
    const existing=document.querySelector('[data-transfer-entry]');
    if(!route){existing?.remove();return}
    activateRoute(route);
    if(overlay)return;
    if(existing?.dataset.transferFamily===route.family&&Number(existing.dataset.transferLesson)===route.lesson){
      lastTrigger=existing.querySelector('[data-transfer-open]');
      return;
    }
    existing?.remove();
    const step=document.querySelector('.screen-lesson .lesson-step');
    if(!step)return;
    const wrap=document.createElement('div');
    wrap.innerHTML=entryMarkup(route);
    const entry=wrap.firstElementChild;
    step.appendChild(entry);
    lastTrigger=entry.querySelector('[data-transfer-open]');
    lastTrigger.addEventListener('click',()=>open(route));
  }

  function orderedChoices(view,index){
    const choices=[...view.choices];
    const shift=(index+1)%choices.length;
    return choices.slice(shift).concat(choices.slice(0,shift));
  }

  function initialState(){return {phase:'intro',index:0,answered:false,choice:null,correct:false}}
  function open(route=activeRoute){activateRoute(route);session=initialState();renderOverlay()}
  function close(){overlay?.remove();overlay=null;session=null;lastTrigger?.focus?.()}

  function progress(){
    if(!session||session.phase==='intro')return 0;
    if(session.phase==='done')return 100;
    return Math.round(((session.index+1)/exercises.length)*100);
  }

  function renderOverlay(){
    installStyle();
    if(!session)session=initialState();
    if(!overlay){
      overlay=document.createElement('div');
      overlay.className='ft-transfer-overlay';
      overlay.setAttribute('role','dialog');
      overlay.setAttribute('aria-modal','true');
      document.body.appendChild(overlay);
    }

    const lang=locale();
    let body='';
    if(session.phase==='intro'){
      const start=T(activeRoute.startCtaVi||'Bắt đầu 3 câu',activeRoute.startCtaFr||'Commencer les 3 phrases');
      body=`<div class="ft-transfer-copy"><strong>${esc(activeCore.family.instruction[lang])}</strong><p>${esc(T(activeRoute.introCopyVi,activeRoute.introCopyFr))}</p></div><button class="primary ft-transfer-next" data-transfer-next>${esc(start)} ›</button>`;
    }else if(session.phase==='question'){
      const exercise=exercises[session.index];
      const view=activeCore.view(exercise,lang);
      const choices=orderedChoices(view,session.index);
      const correct=session.answered&&activeCore.verify(exercise,session.choice);
      const feedback=session.answered
        ? correct
          ? T(activeRoute.correctVi,activeRoute.correctFr)
          : T(`→ Gần đúng. Câu cần xây là : ${view.target}`,`→ Presque. La phrase à reconstruire est : ${view.target}`)
        : '';
      body=`<div class="ft-transfer-q"><span class="muted">${session.index+1}/${exercises.length}</span><h3>${esc(view.cue)}</h3><div class="ft-transfer-source">${esc(view.source)}</div><div class="ft-transfer-options">${choices.map(choice=>{const classes=[];if(session.answered&&choice===view.target)classes.push('ok');if(session.answered&&choice===session.choice&&!correct)classes.push('bad');return `<button type="button"${classes.length?` class="${classes.join(' ')}"`:''} data-transfer-choice="${esc(choice)}"${session.answered?' disabled':''}>${esc(choice)}</button>`}).join('')}</div><p class="ft-transfer-feedback" data-transfer-feedback>${esc(feedback)}</p><button class="primary ft-transfer-next" data-transfer-next${session.answered?'':' hidden'}>${esc(session.index===exercises.length-1?T('Kết thúc','Terminer'):T('Câu tiếp theo','Phrase suivante'))} ›</button></div>`;
    }else{
      body=`<div class="ft-transfer-done"><div class="mark">✓</div><h3>${esc(T(activeRoute.doneTitleVi,activeRoute.doneTitleFr))}</h3><p>${esc(T(activeRoute.doneCopyVi,activeRoute.doneCopyFr))}</p><button class="primary ft-transfer-next" data-transfer-close>${esc(T('Quay lại bài học','Retour à la leçon'))} ›</button></div>`;
    }

    overlay.innerHTML=`<section class="ft-transfer-dialog" data-transfer-active-family="${esc(activeRoute.family)}" data-transfer-active-lesson="${activeRoute.lesson}"><div class="ft-transfer-top"><div><span class="ft-transfer-eyebrow">BUILD ${esc(activeRoute.slice)} • TRANSFER</span><h2>${esc(activeCore.family.title[lang])}</h2></div><button type="button" class="ft-transfer-close" data-transfer-close aria-label="${esc(T('Đóng','Fermer'))}">×</button></div><div class="ft-transfer-bar"><i style="width:${progress()}%"></i></div>${body}</section>`;
    overlay.querySelectorAll('[data-transfer-close]').forEach(button=>button.addEventListener('click',close));
    overlay.querySelector('[data-transfer-next]')?.addEventListener('click',next);
    overlay.querySelectorAll('[data-transfer-choice]').forEach(button=>button.addEventListener('click',()=>answer(button)));
  }

  function next(){
    if(session.phase==='intro')session={...session,phase:'question'};
    else if(session.phase==='question'&&session.answered){
      session=session.index===exercises.length-1
        ? {...session,phase:'done'}
        : {phase:'question',index:session.index+1,answered:false,choice:null,correct:false};
    }
    renderOverlay();
  }

  function answer(button){
    if(session?.phase!=='question'||session.answered)return;
    const exercise=exercises[session.index];
    const choice=button.dataset.transferChoice;
    const correct=activeCore.verify(exercise,choice);
    session={...session,answered:true,choice,correct};
    renderOverlay();
  }

  function decorate(){
    root.dataset.transferIntegration='38.5';
    root.dataset.transferNumberIntegration=hasNumberCore?'38.7':'0';
    root.dataset.transferNegationIntegration=hasNegationCore?'38.8':'0';
    root.dataset.transferSpokenOnIntegration=hasSpokenOnCore?'38.10':'0';
    root.dataset.transferLesson=String(currentLessonNumber());
    mountEntry();
  }
  function schedule(){if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;decorate()})}

  installStyle();
  const app=document.getElementById('app');
  if(app)new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
  window.addEventListener('pagehide',close);
  decorate();

  window.FrenchTranquilleTransferLesson=Object.freeze({
    build:38,
    slice:'38.2',
    integration:'38.5',
    numberIntegration:hasNumberCore?'38.7':null,
    negationIntegration:hasNegationCore?'38.8':null,
    spokenOnIntegration:hasSpokenOnCore?'38.10':null,
    status:'learner-facing-contextual',
    family:core.family.id,
    lesson:LESSON,
    exerciseIndexes:EXERCISE_INDEXES,
    exercises:legacyExercises,
    futureFamily:futureCore.family.id,
    futureLesson:FUTURE_LESSON,
    futureExerciseIndexes:FUTURE_EXERCISE_INDEXES,
    futureExercises,
    numberFamily:hasNumberCore?numberCore.family.id:null,
    numberLesson:hasNumberCore?NUMBER_LESSON:null,
    numberExerciseIndexes:hasNumberCore?NUMBER_EXERCISE_INDEXES:Object.freeze([]),
    numberExercises,
    negationFamily:hasNegationCore?negationCore.family.id:null,
    negationLesson:hasNegationCore?NEGATION_LESSON:null,
    negationExerciseIndexes:hasNegationCore?NEGATION_EXERCISE_INDEXES:Object.freeze([]),
    negationExercises,
    spokenOnFamily:hasSpokenOnCore?spokenOnCore.family.id:null,
    spokenOnLesson:hasSpokenOnCore?SPOKEN_ON_LESSON:null,
    spokenOnExerciseIndexes:hasSpokenOnCore?SPOKEN_ON_EXERCISE_INDEXES:Object.freeze([]),
    spokenOnExercises,
    routes:ROUTES,
    persistent:false,
    masteryClaim:false,
    refresh:decorate,
    open,
    close
  });
})();