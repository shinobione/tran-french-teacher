(() => {
  'use strict';

  const DEBUG='tran-french-teacher:debug-fr:v1';
  const LESSON=33;
  const EXERCISE_INDEXES=Object.freeze([0,2,5]);
  const root=document.documentElement;
  const core=window.FrenchTranquilleGeneralizationTransfer;
  const T=(vi,fr)=>localStorage.getItem(DEBUG)==='1'?fr:vi;
  const locale=()=>localStorage.getItem(DEBUG)==='1'?'fr':'vi';
  const esc=(value='')=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  if(!core||core.family?.id!=='subject-substitution-regular-er'){
    root.dataset.transferLessonAdapter='missing';
    console.error('[French Trân’quille] Build 38.2 transfer core is missing');
    return;
  }

  const exercises=Object.freeze(EXERCISE_INDEXES.map(index=>core.catalog[index]));
  let overlay=null,lastTrigger=null,scheduled=false,session=null;

  function currentLessonNumber(){
    const title=document.querySelector('.screen-lesson .topbar h1')?.textContent||'';
    return Number(title.match(/\d+/)?.[0]||0);
  }

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

  function entryMarkup(){
    return `<section class="ft-transfer-entry" data-transfer-entry data-transfer-family="${esc(core.family.id)}"><span class="ft-transfer-eyebrow">🔁 ${esc(T('XÂY CÂU','CONSTRUIRE UNE PHRASE'))}</span><h3>${esc(core.family.title[locale()])}</h3><p>${esc(T('3 câu ngắn: đổi người, giữ ý và động từ, rồi xây lại cả câu. Không bắt buộc để tiếp tục bài.','3 phrases courtes : change la personne, garde l’idée et le verbe, puis reconstruis toute la phrase. Facultatif pour continuer la leçon.'))}</p><button type="button" class="secondary" data-transfer-open>${esc(T('Thử 3 câu • khoảng 2 phút','Essayer 3 phrases • ≈ 2 min'))} ›</button></section>`;
  }

  function mountEntry(){
    const existing=document.querySelector('[data-transfer-entry]');
    if(currentLessonNumber()!==LESSON){
      existing?.remove();
      return;
    }
    if(overlay||existing)return;
    const step=document.querySelector('.screen-lesson .lesson-step');
    if(!step)return;
    const wrap=document.createElement('div');
    wrap.innerHTML=entryMarkup();
    const entry=wrap.firstElementChild;
    step.appendChild(entry);
    lastTrigger=entry.querySelector('[data-transfer-open]');
    lastTrigger.addEventListener('click',open);
  }

  function orderedChoices(view,index){
    const choices=[...view.choices];
    const shift=(index+1)%choices.length;
    return choices.slice(shift).concat(choices.slice(0,shift));
  }

  function initialState(){return {phase:'intro',index:0,answered:false,choice:null,correct:false}}
  function open(){session=initialState();renderOverlay()}
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
      body=`<div class="ft-transfer-copy"><strong>${esc(core.family.instruction[lang])}</strong><p>${esc(T('Không học thêm từ mới. Bạn chỉ dùng những câu và mẫu đã gặp để tự xây một câu khác.','Pas de nouveau vocabulaire : tu réutilises seulement des phrases et des formes déjà rencontrées pour construire une autre phrase.'))}</p></div><button class="primary ft-transfer-next" data-transfer-next>${esc(T('Bắt đầu 3 câu','Commencer les 3 phrases'))} ›</button>`;
    }else if(session.phase==='question'){
      const exercise=exercises[session.index];
      const view=core.view(exercise,lang);
      const choices=orderedChoices(view,session.index);
      const feedback=session.answered
        ? session.correct
          ? T('✓ Đúng. Bạn đã đổi người và xây lại đúng cả câu.','✓ Correct. Tu as changé la personne et reconstruit toute la phrase.')
          : T(`→ Gần đúng. Câu cần xây là : ${view.target}`,`→ Presque. La phrase à reconstruire est : ${view.target}`)
        : '';
      body=`<div class="ft-transfer-q"><span class="muted">${session.index+1}/${exercises.length}</span><h3>${esc(view.cue)}</h3><div class="ft-transfer-source">${esc(view.source)}</div><div class="ft-transfer-options">${choices.map(choice=>{const classes=[];if(session.answered&&choice===view.target)classes.push('ok');if(session.answered&&choice===session.choice&&!session.correct)classes.push('bad');return `<button type="button"${classes.length?` class="${classes.join(' ')}"`:''} data-transfer-choice="${esc(choice)}"${session.answered?' disabled':''}>${esc(choice)}</button>`}).join('')}</div><p class="ft-transfer-feedback" data-transfer-feedback>${esc(feedback)}</p><button class="primary ft-transfer-next" data-transfer-next${session.answered?'':' hidden'}>${esc(session.index===exercises.length-1?T('Kết thúc','Terminer'):T('Câu tiếp theo','Phrase suivante'))} ›</button></div>`;
    }else{
      body=`<div class="ft-transfer-done"><div class="mark">✓</div><h3>${esc(T('Bạn vừa tự xây 3 câu','Tu viens de construire 3 phrases'))}</h3><p>${esc(T('Bạn đã giữ ý chính, đổi người làm hành động và điều chỉnh động từ. Đây là luyện chuyển đổi, không phải điểm “thành thạo”.','Tu as gardé l’idée, changé la personne qui agit et ajusté le verbe. C’est un exercice de transfert, pas un score de « maîtrise ».'))}</p><button class="primary ft-transfer-next" data-transfer-close>${esc(T('Quay lại bài học','Retour à la leçon'))} ›</button></div>`;
    }

    overlay.innerHTML=`<section class="ft-transfer-dialog" data-transfer-active-family="${esc(core.family.id)}"><div class="ft-transfer-top"><div><span class="ft-transfer-eyebrow">BUILD 38.2 • TRANSFER</span><h2>${esc(core.family.title[lang])}</h2></div><button type="button" class="ft-transfer-close" data-transfer-close aria-label="${esc(T('Đóng','Fermer'))}">×</button></div><div class="ft-transfer-bar"><i style="width:${progress()}%"></i></div>${body}</section>`;
    overlay.querySelectorAll('[data-transfer-close]').forEach(button=>button.addEventListener('click',close));
    overlay.querySelector('[data-transfer-next]')?.addEventListener('click',next);
    overlay.querySelectorAll('[data-transfer-choice]').forEach(button=>button.addEventListener('click',()=>answer(button)));
  }

  function next(){
    if(session.phase==='intro'){
      session={...session,phase:'question'};
    }else if(session.phase==='question'&&session.answered){
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
    session={...session,answered:true,choice,correct:core.verify(exercise,choice)};
    renderOverlay();
  }

  function decorate(){
    root.dataset.transferIntegration='38.2';
    root.dataset.transferLesson=String(LESSON);
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
    status:'learner-facing-contextual',
    family:core.family.id,
    lesson:LESSON,
    exerciseIndexes:EXERCISE_INDEXES,
    exercises,
    persistent:false,
    masteryClaim:false,
    refresh:decorate,
    open,
    close
  });
})();
