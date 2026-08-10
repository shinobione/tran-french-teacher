(() => {
  'use strict';
  const DEBUG_KEY='tran-french-teacher:debug-fr:v1';
  const params=new URLSearchParams(location.search);
  if(params.get('debug')==='fr') localStorage.setItem(DEBUG_KEY,'1');
  const isDebug=()=>localStorage.getItem(DEBUG_KEY)==='1';

  function injectStyles(){
    if(document.getElementById('debug-fr-style'))return;
    const style=document.createElement('style');style.id='debug-fr-style';style.textContent=`
      .debug-fr-banner{position:sticky;top:0;z-index:40;margin:0;padding:7px 12px;text-align:center;background:#5b3b0a;color:#fff1cf;border-bottom:1px solid #9b6a1d;font:700 11px/1.35 system-ui;letter-spacing:.03em}
      .debug-fr-card{border-color:rgba(245,183,72,.38)!important;background:linear-gradient(180deg,rgba(73,49,13,.72),rgba(28,27,27,.86))!important}
      .debug-fr-card .debug-fr-title{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px}
      .debug-fr-card .debug-fr-status{padding:4px 8px;border-radius:999px;background:#17243a;border:1px solid #425673;font-size:.72rem}
      .debug-fr-card button{width:100%;min-height:48px;border-radius:14px;border:1px solid #8c6425;background:#f2e5ca;color:#172033;font-weight:800;cursor:pointer}`;
    document.head.appendChild(style);
  }
  function injectCard(){
    const main=document.querySelector('.content');if(!main||document.getElementById('debug-fr-card'))return;
    const heading=[...main.querySelectorAll('h2')].find(h=>['Chẩn đoán','Diagnostic'].includes(h.textContent.trim()));if(!heading)return;
    const card=document.createElement('section');card.id='debug-fr-card';card.className='card debug-fr-card';
    card.innerHTML=`<div class="debug-fr-title"><div><span class="pill">JERRY</span><h2>🇫🇷 DEBUG FR</h2></div><span class="debug-fr-status">${isDebug()?'ON':'OFF'}</span></div><p>${isDebug()?"Interface française active uniquement dans ce navigateur. Trân garde le vietnamien sur son appareil.":"Active l'interface française pour débugger. Le réglage reste local à ce navigateur."}</p><button type="button" id="debug-fr-toggle">${isDebug()?'Désactiver DEBUG FR':'🇫🇷 Activer DEBUG FR'}</button>`;
    heading.closest('.card').before(card);
    card.querySelector('#debug-fr-toggle').addEventListener('click',()=>{localStorage.setItem(DEBUG_KEY,isDebug()?'0':'1');location.reload()});
  }
  function injectBanner(){
    const shell=document.querySelector('.app-shell');if(!shell||!isDebug()||document.getElementById('debug-fr-banner'))return;
    const b=document.createElement('div');b.id='debug-fr-banner';b.className='debug-fr-banner';b.textContent='🇫🇷 DEBUG FR — Trân voit toujours le vietnamien sur son appareil';shell.prepend(b);
  }
  function refresh(){injectStyles();injectCard();injectBanner();document.documentElement.lang=isDebug()?'fr':'vi'}
  let scheduled=false;const observer=new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;refresh()})});
  const start=()=>{refresh();observer.observe(document.documentElement,{subtree:true,childList:true})};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
