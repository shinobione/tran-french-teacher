(()=>{
  'use strict';
  const nav='.ux-bottom-nav [data-ux-nav]';
  function sync(){
    if(document.querySelector('.listening-overlay')) return;
    let id='';
    if(document.querySelector('.b27-practice-page:not(.b27-leaving)')) id='practice';
    else if(document.querySelector('.screen-progress .b27-progress-page')) id='progress';
    else if(document.querySelector('.screen-home .b27-home')) id='home';
    if(!id) return;
    document.querySelectorAll(nav).forEach(b=>{
      const on=b.dataset.uxNav===id;
      if(b.classList.contains('active')!==on) b.classList.toggle('active',on);
      const aria=on?'page':'false';
      if(b.getAttribute('aria-current')!==aria) b.setAttribute('aria-current',aria);
    });
    document.documentElement.dataset.visibleNavOwner=id;
  }
  new MutationObserver(sync).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','hidden']});
  requestAnimationFrame(sync);
  window.FrenchTranquilleVisibleNavOwner=Object.freeze({sync});
})();