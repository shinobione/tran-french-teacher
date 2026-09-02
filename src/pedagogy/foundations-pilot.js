(() => {
  'use strict';
  const VERSION='2.3.0',BUILD='34',DEBUG='tran-french-teacher:debug-fr:v1';
  const T=(vi,fr)=>localStorage.getItem(DEBUG)==='1'?fr:vi;
  const locale=()=>localStorage.getItem(DEBUG)==='1'?'fr':'vi';
  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));
  const root=document.documentElement;
  const engine=window.FrenchTranquilleFoundationsCapsuleEngine;
  const primaryCapsule=window.FrenchTranquilleFoundationsCapsules?.F01_F04;
  const negationCapsule=window.FrenchTranquilleFoundationsCapsules?.F11;
  const subjectPronounsCapsule=window.FrenchTranquilleFoundationsCapsules?.F05;
  const regularErCapsule=window.FrenchTranquilleFoundationsCapsules?.F08;
  const questionsCapsule=window.FrenchTranquilleFoundationsCapsules?.F12;
  const adjectiveAgreementCapsule=window.FrenchTranquilleFoundationsCapsules?.F13;
  const contractionsCapsule=window.FrenchTranquilleFoundationsCapsules?.F16;
  if(!engine||!primaryCapsule||!negationCapsule||!subjectPronounsCapsule||!regularErCapsule||!questionsCapsule||!adjectiveAgreementCapsule||!contractionsCapsule){
    root.dataset.foundationsAdapter='missing';
    console.error('[French Trân’quille] Foundations adapter dependencies are missing');
    return;
  }

  const RULES=Object.freeze([
    Object.freeze({
      id:'F01_F04',capsule:primaryCapsule,min:8,max:13,overlayLabel:'F01–F04 • PILOT',
      entryTitle:'le / la / les • un / une',
      entryCopyVi:'5 phút để hiểu vì sao tiếng Pháp đổi “từ nhỏ” trước danh từ. Không bắt buộc để tiếp tục bài.',
      entryCopyFr:'5 minutes pour comprendre pourquoi le petit mot devant le nom change. Cette base reste facultative pour continuer la leçon.'
    }),
    Object.freeze({
      id:'F11',capsule:negationCapsule,min:17,max:20,overlayLabel:'F11 • CORE',
      entryTitle:'ne / n’ … pas',
      entryCopyVi:'Khoảng 5 phút để nối các mẫu bạn đã gặp: ne / n’ trước động từ, pas sau động từ. Không bắt buộc để tiếp tục bài.',
      entryCopyFr:'Environ 5 minutes pour relier des formes déjà rencontrées : ne / n’ avant le verbe, pas après. Cette base reste facultative pour continuer la leçon.'
    }),
    Object.freeze({
      id:'F08',capsule:regularErCapsule,min:32,max:33,overlayLabel:'F08 • CONSOLIDATION',
      entryTitle:'je travaille • tu travailles • elle travaille',
      entryCopyVi:'Khoảng 5 phút để nối một mẫu viết -er đã gặp trong bài: je = -e, tu = -es, il/elle = -e. Không học cả bảng chia động từ.',
      entryCopyFr:'Environ 5 minutes pour relier un modèle écrit en -er déjà rencontré : je = -e, tu = -es, il/elle = -e. Pas de tableau complet de conjugaison.'
    }),
    Object.freeze({
      id:'F05',capsule:subjectPronounsCapsule,min:34,max:36,overlayLabel:'F05 • CONSOLIDATION',
      entryTitle:'je • tu • il/elle • nous • vous',
      entryCopyVi:'Khoảng 5 phút để nối những đại từ bạn đã gặp và nhìn ngay “ai làm hành động?”. Không cần học bảng chia động từ.',
      entryCopyFr:'Environ 5 minutes pour relier les pronoms déjà rencontrés et repérer immédiatement « qui fait l’action ? ». Pas de tableau de conjugaison.'
    }),
    Object.freeze({
      id:'F16',capsule:contractionsCapsule,min:38,max:38,overlayLabel:'F16 • CORE',
      entryTitle:'au • aux • du • des',
      entryCopyVi:'Khoảng 5 phút để nối à / de với le / les mà không nhầm du / des co rút với mạo từ bộ phận. Không bắt buộc để tiếp tục bài.',
      entryCopyFr:'Environ 5 minutes pour relier à / de avec le / les sans confondre les contractions du / des avec les partitifs. Cette base reste facultative pour continuer la leçon.'
    }),
    Object.freeze({
      id:'F13',capsule:adjectiveAgreementCapsule,min:40,max:40,overlayLabel:'F13 • CORE',
      entryTitle:'prête • contente • fatiguée • française',
      entryCopyVi:'Khoảng 5 phút để nối các dạng tính từ nữ bạn đã dùng khi nói về chính mình. Không có quy tắc “chỉ thêm -e” cho mọi từ.',
      entryCopyFr:'Environ 5 minutes pour relier les formes féminines déjà utilisées quand Trân parle d’elle-même. Pas de règle magique « ajoute simplement -e ».'
    }),
    Object.freeze({
      id:'F12',capsule:questionsCapsule,min:41,max:43,overlayLabel:'F12 • CORE',
      entryTitle:'Tu… ? • Où ? • Pouvez-vous… ?',
      entryCopyVi:'Khoảng 5 phút để nối các kiểu câu hỏi bạn đã gặp: ngữ điệu, từ để hỏi và câu lịch sự. Chưa cần đảo động từ.',
      entryCopyFr:'Environ 5 minutes pour relier les questions déjà rencontrées : intonation, mot interrogatif et demande polie. Pas besoin d’inversion.'
    })
  ]);

  let overlay=null,lastTrigger=null,scheduled=false,session=null,activeRule=RULES[0],activeCapsule=primaryCapsule;

  function installStyle(){
    if(document.getElementById('ft-foundations-pilot-style'))return;
    const s=document.createElement('style');s.id='ft-foundations-pilot-style';s.textContent=`
      .ft-foundation-entry{margin-top:16px;padding:15px;border:1px solid rgba(116,238,199,.25);border-radius:18px;background:linear-gradient(145deg,rgba(54,107,101,.2),rgba(109,77,153,.13));display:grid;gap:10px}.ft-foundation-entry h3{margin:0}.ft-foundation-entry p{margin:0;color:#9fb0c5;line-height:1.5}.ft-foundation-entry button{min-height:46px;width:100%}
      .ft-foundation-overlay{position:fixed;inset:0;z-index:1500;background:rgba(4,9,17,.9);backdrop-filter:blur(12px);display:flex;padding:max(16px,env(safe-area-inset-top)) 12px max(16px,env(safe-area-inset-bottom));overflow:auto}.ft-foundation-dialog{width:min(620px,100%);margin:auto;background:#111d2e;border:1px solid rgba(183,203,231,.18);border-radius:24px;padding:20px;display:grid;gap:17px;box-shadow:0 24px 80px rgba(0,0,0,.4)}.ft-foundation-top{display:flex;justify-content:space-between;gap:12px}.ft-foundation-top h2{margin:4px 0 0}.ft-foundation-close{min-width:46px;height:46px}.ft-foundation-eyebrow{font-size:.72rem;letter-spacing:.15em;font-weight:800;color:#7ee9c9}.ft-foundation-bar{height:5px;background:rgba(255,255,255,.08);border-radius:99px;overflow:hidden}.ft-foundation-bar i{display:block;height:100%;background:linear-gradient(90deg,#74e8c6,#c397f3)}.ft-foundation-copy{line-height:1.58;color:#d7e0ec}.ft-foundation-examples{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.ft-foundation-examples b{padding:11px;border-radius:13px;text-align:center;background:#091522}.ft-foundation-q{display:grid;gap:12px}.ft-foundation-q h3{margin:0}.ft-foundation-options{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.ft-foundation-options button{min-height:48px}.ft-foundation-options .ok{outline:2px solid #74e8c6}.ft-foundation-options .bad{outline:2px solid #e86f7d}.ft-foundation-feedback{min-height:25px;margin:0;color:#aebdd0}.ft-foundation-next{min-height:48px}.ft-foundation-done{text-align:center}.ft-foundation-done .mark{font-size:2.4rem}.ft-foundation-done p{color:#b6c4d6;line-height:1.55}@media(max-width:520px){.ft-foundation-dialog{padding:17px;border-radius:20px}.ft-foundation-options{grid-template-columns:1fr}}
    `;
    document.head.appendChild(s);
  }

  function currentLessonNumber(){
    const title=document.querySelector('.screen-lesson .topbar h1')?.textContent||'';
    return Number(title.match(/\d+/)?.[0]||0);
  }

  function ruleForLesson(number){return RULES.find(rule=>number>=rule.min&&number<=rule.max)||null}

  function updateMeta(){
    const params=new URLSearchParams(location.search);
    if(params.has('b32Audit')||params.has('b31Audit')||params.has('b30Audit')||params.has('v2Audit'))return;
    const meta=window.FrenchTranquilleBuildMeta;
    if(meta){meta.version=VERSION;meta.build=BUILD}
    root.dataset.foundationsPilot='1';root.dataset.foundationsVersion=VERSION;root.dataset.foundationsBuild=BUILD;root.dataset.foundationsAdapter='37.3';root.dataset.foundationsExpansion='37.4';root.dataset.foundationsConsolidation='37.5';root.dataset.foundationsVerbPattern='37.6';root.dataset.foundationsSystematization='37.7';root.dataset.foundationsAgreement='37.8';root.dataset.foundationsContractions='42.2';
  }

  function entryMarkup(rule){return `<section class="ft-foundation-entry" data-foundation-entry data-foundation-capsule="${esc(rule.id)}"><span class="ft-foundation-eyebrow">🧩 ${esc(T('NỀN TẢNG NHỎ','PETITE BASE UTILE'))}</span><h3>${esc(rule.entryTitle)}</h3><p>${esc(T(rule.entryCopyVi,rule.entryCopyFr))}</p><button type="button" class="secondary" data-foundation-open>${esc(T('Mở nền tảng • khoảng 5 phút','Ouvrir la base • ≈ 5 min'))} ›</button></section>`}

  function mountEntry(){
    if(overlay)return;
    const rule=ruleForLesson(currentLessonNumber());
    if(!rule)return;
    const step=document.querySelector('.screen-lesson .lesson-step');
    if(!step)return;
    const existing=step.querySelector('[data-foundation-entry]');
    if(existing?.dataset.foundationCapsule===rule.id)return;
    existing?.remove();
    activeRule=rule;activeCapsule=rule.capsule;
    const wrap=document.createElement('div');wrap.innerHTML=entryMarkup(rule);const entry=wrap.firstElementChild;step.appendChild(entry);lastTrigger=entry.querySelector('[data-foundation-open]');lastTrigger.addEventListener('click',()=>open(rule));
  }

  function open(rule=activeRule||RULES[0]){activeRule=rule;activeCapsule=rule.capsule;session=engine.initialState(activeCapsule);renderOverlay()}
  function close(){overlay?.remove();overlay=null;session=null;lastTrigger?.focus?.()}

  function legacyProgress(state){
    const total=activeCapsule.checks.length+1;
    if(state.phase==='intro')return 0;
    if(state.phase==='done')return 100;
    return Math.round(((state.questionIndex+1)/total)*100);
  }

  function renderOverlay(){
    installStyle();
    if(!session)session=engine.initialState(activeCapsule);
    if(!overlay){overlay=document.createElement('div');overlay.className='ft-foundation-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');document.body.appendChild(overlay)}
    const lang=locale(),view=engine.view(activeCapsule,session,lang),pct=legacyProgress(session);
    let body='';
    if(session.phase==='intro'){
      body=`<div class="ft-foundation-copy"><strong>${esc(view.intro[0])}</strong><p>${esc(view.intro[1])}</p><p>${esc(view.intro[2])}</p></div><div class="ft-foundation-examples">${view.examples.map(example=>`<b>${esc(example)}</b>`).join('')}</div><button class="primary ft-foundation-next" data-foundation-next>${esc(T(`Thử ${activeCapsule.checks.length} câu ngắn`,`Essayer ${activeCapsule.checks.length} mini-questions`))} ›</button>`;
    }else if(session.phase==='question'){
      const answer=session.answers[session.answers.length-1];
      body=`<div class="ft-foundation-q"><span class="muted">${view.questionNumber}/${view.questionTotal}</span><h3>${esc(view.prompt)}</h3><div class="ft-foundation-options">${view.choices.map(choice=>{const classes=[];if(session.answered&&choice===view.correctAnswer)classes.push('ok');if(session.answered&&answer?.choice===choice&&!answer.correct)classes.push('bad');return `<button type="button"${classes.length?` class="${classes.join(' ')}"`:''} data-foundation-choice="${esc(choice)}"${session.answered?' disabled':''}>${esc(choice)}</button>`}).join('')}</div><p class="ft-foundation-feedback" data-foundation-feedback>${session.answered?`${view.correct?'✓':'→'} ${esc(view.feedback)}`:''}</p><button class="primary ft-foundation-next" data-foundation-next${session.answered?'':' hidden'}>${esc(view.questionNumber===view.questionTotal?T('Kết thúc','Terminer'):T('Tiếp tục','Continuer'))} ›</button></div>`;
    }else{
      body=`<div class="ft-foundation-done"><div class="mark">✓</div><h3>${esc(T('Xong nền tảng nhỏ','Petite base terminée'))}</h3><p>${esc(view.conclusion)}</p><button class="primary ft-foundation-next" data-foundation-close>${esc(T('Quay lại bài học','Retour à la leçon'))} ›</button></div>`;
    }
    overlay.innerHTML=`<section class="ft-foundation-dialog" data-foundation-active-capsule="${esc(activeRule.id)}"><div class="ft-foundation-top"><div><span class="ft-foundation-eyebrow">${esc(activeRule.overlayLabel)}</span><h2>${esc(view.title)}</h2></div><button type="button" class="ft-foundation-close" data-foundation-close aria-label="${esc(T('Đóng','Fermer'))}">×</button></div><div class="ft-foundation-bar"><i style="width:${pct}%"></i></div>${body}</section>`;
    overlay.querySelectorAll('[data-foundation-close]').forEach(button=>button.addEventListener('click',close));
    overlay.querySelector('[data-foundation-next]')?.addEventListener('click',next);
    overlay.querySelectorAll('[data-foundation-choice]').forEach(button=>button.addEventListener('click',()=>answer(button)));
  }

  function next(){if(session?.phase==='question'&&!session?.answered)return;session=engine.reduce(activeCapsule,session,{type:'NEXT'});renderOverlay()}
  function answer(button){if(session?.answered||button.dataset.foundationBusy==='1')return;button.dataset.foundationBusy='1';session=engine.reduce(activeCapsule,session,{type:'ANSWER',choice:button.dataset.foundationChoice});renderOverlay();button.dataset.foundationBusy='0';}
  function decorate(){updateMeta();mountEntry()}
  function schedule(){if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;decorate()})}
  installStyle();const app=document.getElementById('app');if(app)new MutationObserver(schedule).observe(app,{childList:true,subtree:true});window.addEventListener('pagehide',close);decorate();
  window.FrenchTranquilleFoundationsPilot=Object.freeze({version:VERSION,build:BUILD,concepts:['F01','F02','F03','F04'],expansionConcepts:['F11'],consolidationConcepts:['F05'],verbPatternConcepts:['F08'],systematizationConcepts:['F12'],agreementConcepts:['F13'],contractionConcepts:['F16'],persistent:false,adapter:'37.3',expansion:'37.4',consolidation:'37.5',verbPattern:'37.6',systematization:'37.7',agreement:'37.8',contractions:'42.2',engineSchema:engine.schema,refresh:decorate,open});
})();