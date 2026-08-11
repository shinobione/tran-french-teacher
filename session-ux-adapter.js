(() => {
  'use strict';

  const DEBUG_KEY='tran-french-teacher:debug-fr:v1';
  const LEARNER_KEY='francais-avec-luc:learner:v1';
  const isDebug=()=>localStorage.getItem(DEBUG_KEY)==='1';
  const T=(vi,fr)=>isDebug()?fr:vi;
  const esc=(value='')=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const learner=()=>{try{return JSON.parse(localStorage.getItem(LEARNER_KEY)||'{}')||{}}catch{return{}}};
  let guided=null;
  let scheduled=false;
  const smoke=new URLSearchParams(location.search).get('sessionSmoke');
  let smokeStarted=false;

  function genericProgress(current,target){const pct=Math.min(100,Math.round(current/Math.max(target,1)*100));return `<div class="session-contract"><div class="session-contract-copy"><span>💬 ${esc(T('Mục tiêu: 1 câu đúng','Objectif : 1 réponse correcte'))}</span><strong>${Math.min(current,target)} / ${target}</strong></div><div class="session-contract-bar"><i style="width:${pct}%"></i></div><small>${esc(current>=target?T('Đã hoàn thành','Terminé'):T('Một câu đơn giản là đủ','Une phrase simple suffit'))}</small></div>`}

  function success(){return `<section class="session-success session-success-guided" data-session-complete="guided"><div class="session-success-mark"><span>✓</span></div><span class="session-success-eyebrow">${esc(T('Xong phiên','Session terminée'))}</span><h2>${esc(T('Thực hành xong','Pratique terminée'))}</h2><p>${esc(T('Một câu đúng là đủ cho mini-session này. Tiến độ đã được lưu.','Une réponse correcte suffit pour cette mini-session. Ta progression est enregistrée.'))}</p><div class="session-success-actions"><button class="primary" data-session-home>${esc(T('Về Hôm nay','Retour à Aujourd’hui'))} <span>›</span></button><button class="secondary" data-guided-again>${esc(T('Làm thêm 1 câu','Encore 1 phrase'))}</button></div></section>`}

  function decorate(){
    const mode=document.documentElement.dataset.sessionPracticeMode||'';
    const card=document.querySelector('.screen-conversation .conversation-card');
    if(mode!=='guided'||!card){guided=null;document.querySelector('.session-guided-success')?.remove();return}
    if(!guided)guided={baseline:Number(learner().conversationWins||0),target:1,done:false};
    const count=Math.max(0,Number(learner().conversationWins||0)-guided.baseline);
    if(count>=guided.target)guided.done=true;
    let goal=card.querySelector(':scope > .session-guided-contract');
    if(!goal){goal=document.createElement('div');goal.className='session-guided-contract';card.prepend(goal)}
    const signature=`${count}:${guided.target}:${guided.done?1:0}`;
    if(goal.dataset.signature!==signature){goal.dataset.signature=signature;goal.innerHTML=genericProgress(count,guided.target)}
    card.classList.toggle('session-hidden',guided.done);
    let done=document.querySelector('.session-guided-success');
    if(guided.done&&!done){done=document.createElement('div');done.className='session-guided-success';done.innerHTML=success();card.insertAdjacentElement('afterend',done)}
    if(!guided.done)done?.remove();
    document.documentElement.dataset.sessionGuidedProgress=`${Math.min(count,guided.target)}/${guided.target}`;
    document.documentElement.dataset.sessionGuidedDone=guided.done?'1':'0';
    smokeHook();
  }

  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;decorate()})}

  // Window capture runs before the Session UX document handler. Reset a completed
  // Scenario to its list before leaving, so the next visit opens the practice hub.
  window.addEventListener('click',event=>{
    if(event.target.closest?.('[data-session-home]')&&document.querySelector('.scenario-done')){
      document.querySelector('.scenario-done [data-scenario-list]')?.click();
    }
    if(event.target.closest?.('[data-guided-again]')){
      event.preventDefault();
      guided={baseline:Number(learner().conversationWins||0),target:1,done:false};
      document.querySelector('.session-guided-success')?.remove();
      document.querySelector('.screen-conversation .conversation-card')?.classList.remove('session-hidden');
      schedule();
    }
  },true);

  function smokeHook(){
    if(smokeStarted)return;
    if(smoke==='practice'){
      smokeStarted=true;
      setTimeout(()=>{
        document.querySelector('[data-ux-nav="practice"]')?.click();
        setTimeout(()=>{
          document.querySelector('[data-ux-practice="conversation"]')?.click();
          setTimeout(()=>{
            schedule();
            document.documentElement.dataset.sessionSmokePractice=document.querySelector('.practice-session-hub')?'1':'0';
          },300);
        },180);
      },120);
    }
  }

  const app=document.getElementById('app');if(app)new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
  new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['data-session-practice-mode']});

  // Listening renders outside #app and replaces the overlay's innerHTML after each
  // answer/next action. Wake the main Session UX only for those overlay mutations;
  // otherwise its 5-question counter would stay frozen at the opening baseline.
  new MutationObserver(mutations=>{
    const listeningChanged=mutations.some(m=>{
      const target=m.target?.nodeType===1?m.target:null;
      if(target?.closest?.('.listening-overlay'))return true;
      return [...m.addedNodes,...m.removedNodes].some(node=>node?.nodeType===1&&(node.matches?.('.listening-overlay')||node.querySelector?.('.listening-overlay')));
    });
    if(listeningChanged)window.FrenchTranquilleSessionUX?.schedule?.();
  }).observe(document.body,{childList:true,subtree:true});

  schedule();smokeHook();

  window.FrenchTranquilleSessionUXAdapter={version:'1.18.2',build:'25.2'};
})();