(() => {
  'use strict';
  const VERSION='2.3.0',BUILD='34',DEBUG='tran-french-teacher:debug-fr:v1';
  const T=(vi,fr)=>localStorage.getItem(DEBUG)==='1'?fr:vi;
  const locale=()=>localStorage.getItem(DEBUG)==='1'?'fr':'vi';
  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const root=document.documentElement;
  const engine=window.FrenchTranquilleFoundationsCapsuleEngine;
  const capsule=window.FrenchTranquilleFoundationsCapsules?.F01_F04;
  if(!engine||!capsule){
    root.dataset.foundationsAdapter='missing';
    console.error('[French Trân’quille] Foundations 37.3 adapter dependencies are missing');
    return;
  }

  let offered=false,overlay=null,lastTrigger=null,scheduled=false,session=null;

  function installStyle(){
    if(document.getElementById('ft-foundations-pilot-style'))return;
    const s=document.createElement('style');s.id='ft-foundations-pilot-style';s.textContent=`
      .ft-foundation-entry{margin-top:16px;padding:15px;border:1px solid rgba(116,238,199,.25);border-radius:18px;background:linear-gradient(145deg,rgba(54,107,101,.2),rgba(109,77,153,.13));display:grid;gap:10px}.ft-foundation-entry h3{margin:0}.ft-foundation-entry p{margin:0;color:#9fb0c5;line-height:1.5}.ft-foundation-entry button{min-height:46px;width:100%}
      .ft-foundation-overlay{position:fixed;inset:0;z-index:1500;background:rgba(4,9,17,.9);backdrop-filter:blur(12px);display:flex;padding:max(16px,env(safe-area-inset-top)) 12px max(16px,env(safe-area-inset-bottom));overflow:auto}.ft-foundation-dialog{width:min(620px,100%);margin:auto;background:#111d2e;border:1px solid rgba(183,203,231,.18);border-radius:24px;padding:20px;display:grid;gap:17px;box-shadow:0 24px 80px rgba(0,0,0,.4)}.ft-foundation-top{display:flex;justify-content:space-between;gap:12px}.ft-foundation-top h2{margin:4px 0 0}.ft-foundation-close{min-width:46px;height:46px}.ft-foundation-eyebrow{font-size:.72rem;letter-spacing:.15em;font-weight:800;color:#7ee9c9}.ft-foundation-bar{height:5px;background:rgba(255,255,255,.08);border-radius:99px;overflow:hidden}.ft-foundation-bar i{display:block;height:100%;background:linear-gradient(90deg,#74e8c6,#c397f3)}.ft-foundation-copy{line-height:1.58;color:#d7e0ec}.ft-foundation-examples{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.ft-foundation-examples b{padding:11px;border-radius:13px;text-align:center;background:#091522}.ft-foundation-q{display:grid;gap:12px}.ft-foundation-q h3{margin:0}.ft-foundation-options{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.ft-foundation-options button{min-height:48px}.ft-foundation-options .ok{outline:2px solid #74e8c6}.ft-foundation-options .bad{outline:2px solid #e86f7d}.ft-foundation-feedback{min-height:25px;margin:0;color:#aebdd0}.ft-foundation-next{min-height:48px}.ft-foundation-done{text-align:center}.ft-foundation-done .mark{font-size:2.4rem}.ft-foundation-done p{color:#b6c4d6;line-height:1.55}@media(max-width:520px){.ft-foundation-dialog{padding:17px;border-radius:20px}.ft-foundation-options{grid-template-columns:1fr}}`;
    document.head.appendChild(s);
  }

  function currentLessonNumber(){
    const title=document.querySelector('.screen-lesson .topbar h1')?.textContent||'';
    return Number(title.match(/\d+/)?.[0]||0);
  }

  function updateMeta(){
    const params=new URLSearchParams(location.search);
    if(params.has('b32Audit')||params.has('b31Audit')||params.has('b30Audit')||params.has('v2Audit'))return;
    const meta=window.FrenchTranquilleBuildMeta;
    if(meta){meta.version=VERSION;meta.build=BUILD}
    root.dataset.foundationsPilot='1';root.dataset.foundationsVersion=VERSION;root.dataset.foundationsBuild=BUILD;root.dataset.foundationsAdapter='37.3';
  }

  function entryMarkup(){return `<section class="ft-foundation-entry" data-foundation-entry><span class="ft-foundation-eyebrow">🧩 ${esc(T('NỀN TẢNG NHỎ','PETITE BASE UTILE'))}</span><h3>${esc(T('le / la / les • un / une','le / la / les • un / une'))}</h3><p>${esc(T('5 phút để hiểu vì sao tiếng Pháp đổi “từ nhỏ” trước danh từ. Không bắt buộc để tiếp tục bài.','5 minutes pour comprendre pourquoi le petit mot devant le nom change. Cette base reste facultative pour continuer la leçon.'))}</p><button type="button" class="secondary" data-foundation-open>${esc(T('Mở nền tảng • khoảng 5 phút','Ouvrir la base • ≈ 5 min'))} ›</button></section>`}

  function mountEntry(){
    if(offered||overlay)return;
    const n=currentLessonNumber();
    if(n<8||n>13)return;
    const step=document.querySelector('.screen-lesson .lesson-step');
    if(!step||step.querySelector('[data-foundation-entry]'))return;
    const wrap=document.createElement('div');wrap.innerHTML=entryMarkup();const entry=wrap.firstElementChild;step.appendChild(entry);offered=true;lastTrigger=entry.querySelector('[data-foundation-open]');lastTrigger.addEventListener('click',open);
  }

  function open(){session=engine.initialState(capsule);renderOverlay()}
  function close(){overlay?.remove();overlay=null;session=null;lastTrigger?.focus?.()}

  function legacyProgress(state){
    const total=capsule.checks.length+1;
    if(state.phase==='intro')return 0;
    if(state.phase==='done')return 100;
    return Math.round(((state.questionIndex+1)/total)*100);
  }

  function renderOverlay(){
    installStyle();
    if(!session)session=engine.initialState(capsule);
    if(!overlay){overlay=document.createElement('div');overlay.className='ft-foundation-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');document.body.appendChild(overlay)}
    const lang=locale(),view=engine.view(capsule,session,lang),pct=legacyProgress(session);
    let body='';
    if(session.phase==='intro'){
      body=`<div class="ft-foundation-copy"><strong>${esc(view.intro[0])}</strong><p>${esc(view.intro[1])}</p><p>${esc(view.intro[2])}</p></div><div class="ft-foundation-examples">${view.examples.map(example=>`<b>${esc(example)}</b>`).join('')}</div><button class="primary ft-foundation-next" data-foundation-next>${esc(T('Thử 4 câu ngắn','Essayer 4 mini-questions'))} ›</button>`;
    }else if(session.phase==='question'){
      const answer=session.answers[session.answers.length-1];
      body=`<div class="ft-foundation-q"><span class="muted">${view.questionNumber}/${view.questionTotal}</span><h3>${esc(view.prompt)}</h3><div class="ft-foundation-options">${view.choices.map(choice=>{const classes=[];if(session.answered&&choice===view.correctAnswer)classes.push('ok');if(session.answered&&answer?.choice===choice&&!answer.correct)classes.push('bad');return `<button type="button"${classes.length?` class="${classes.join(' ')}"`:''} data-foundation-choice="${esc(choice)}"${session.answered?' disabled':''}>${esc(choice)}</button>`}).join('')}</div><p class="ft-foundation-feedback" data-foundation-feedback>${session.answered?`${view.correct?'✓':'→'} ${esc(view.feedback)}`:''}</p><button class="primary ft-foundation-next" data-foundation-next${session.answered?'':' hidden'}>${esc(view.questionNumber===view.questionTotal?T('Kết thúc','Terminer'):T('Tiếp tục','Continuer'))} ›</button></div>`;
    }else{
      body=`<div class="ft-foundation-done"><div class="mark">✓</div><h3>${esc(T('Xong nền tảng nhỏ','Petite base terminée'))}</h3><p>${esc(view.conclusion)}</p><button class="primary ft-foundation-next" data-foundation-close>${esc(T('Quay lại bài học','Retour à la leçon'))} ›</button></div>`;
    }
    overlay.innerHTML=`<section class="ft-foundation-dialog"><div class="ft-foundation-top"><div><span class="ft-foundation-eyebrow">F01–F04 • PILOT</span><h2>${esc(view.title)}</h2></div><button type="button" class="ft-foundation-close" data-foundation-close aria-label="${esc(T('Đóng','Fermer'))}">×</button></div><div class="ft-foundation-bar"><i style="width:${pct}%"></i></div>${body}</section>`;
    overlay.querySelectorAll('[data-foundation-close]').forEach(button=>button.addEventListener('click',close));
    overlay.querySelector('[data-foundation-next]')?.addEventListener('click',next);
    overlay.querySelectorAll('[data-foundation-choice]').forEach(button=>button.addEventListener('click',()=>answer(button)));
  }

  function next(){
    session=engine.reduce(capsule,session,{type:'NEXT'});
    renderOverlay();
  }

  function answer(button){
    if(session?.answered)return;
    session=engine.reduce(capsule,session,{type:'ANSWER',choice:button.dataset.foundationChoice});
    renderOverlay();
  }

  function decorate(){updateMeta();mountEntry()}
  function schedule(){if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;decorate()})}
  installStyle();const app=document.getElementById('app');if(app)new MutationObserver(schedule).observe(app,{childList:true,subtree:true});window.addEventListener('pagehide',close);decorate();
  window.FrenchTranquilleFoundationsPilot=Object.freeze({version:VERSION,build:BUILD,concepts:['F01','F02','F03','F04'],persistent:false,adapter:'37.3',engineSchema:engine.schema,refresh:decorate,open});
})();
