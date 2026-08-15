(() => {
  'use strict';
  const VERSION='2.3.22-v58debug1';
  const DEBUG_KEY='tran-french-teacher:debug-fr:v1';
  const THEME_KEY='french-tranquille:appearance-theme:v1';
  const params=new URLSearchParams(location.search);
  if(params.get('debug')==='fr')localStorage.setItem(DEBUG_KEY,'1');
  const isDebug=()=>localStorage.getItem(DEBUG_KEY)==='1';

  function injectStyles(){
    if(document.getElementById('debug-fr-style'))return;
    const style=document.createElement('style');style.id='debug-fr-style';style.textContent=`
      .debug-fr-banner{position:sticky;top:0;z-index:40;margin:0;padding:7px 12px;text-align:center;background:#5b3b0a;color:#fff1cf;border-bottom:1px solid #9b6a1d;font:700 11px/1.35 system-ui;letter-spacing:.03em}
      .debug-fr-card{border-color:rgba(245,183,72,.38)!important;background:linear-gradient(180deg,rgba(73,49,13,.72),rgba(28,27,27,.86))!important}
      .debug-fr-card .debug-fr-title{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px}
      .debug-fr-card .debug-fr-status{padding:4px 8px;border-radius:999px;background:#17243a;border:1px solid #425673;font-size:.72rem}
      .debug-fr-card button{width:100%;min-height:48px;border-radius:14px;border:1px solid #8c6425;background:#f2e5ca;color:#172033;font-weight:800;cursor:pointer}
      html:not(.ux-debug-mode)[data-theme] .screen-settings :is(#debug-fr-card,.ft-v55-diagnostics-card,.ft-v55-technical-card){display:none!important}
      html.ux-debug-mode[data-theme] .screen-settings :is(#debug-fr-card,.card.ft-v55-diagnostics-card,.card.ft-v55-technical-card){display:block!important}`;
    document.head.appendChild(style);
  }
  function syncRoot(){
    const active=isDebug(),root=document.documentElement;
    root.classList.toggle('ux-debug-mode',active);
    root.dataset.debugFr=active?'on':'off';
    root.lang=active?'fr':'vi';
    if(!active)document.getElementById('debug-fr-banner')?.remove();
    return active;
  }
  function updateCard(card){
    if(!card)return;
    const active=isDebug(),status=card.querySelector('.debug-fr-status'),copy=card.querySelector('[data-debug-fr-copy]'),button=card.querySelector('#debug-fr-toggle');
    if(status)status.textContent=active?'ON':'OFF';
    if(copy)copy.textContent=active?'Interface française active uniquement dans ce navigateur. Trân garde le vietnamien sur son appareil.':"Active l’interface française pour débugger. Le réglage reste local à ce navigateur.";
    if(button)button.textContent=active?'Désactiver DEBUG FR':'🇫🇷 Activer DEBUG FR';
  }
  function injectCard(){
    const existing=document.getElementById('debug-fr-card');if(existing){updateCard(existing);return}
    const main=document.querySelector('.content');if(!main)return;
    const heading=[...main.querySelectorAll('h2')].find(h=>['Chẩn đoán','Diagnostic'].includes(h.textContent.trim()));if(!heading)return;
    const card=document.createElement('section');card.id='debug-fr-card';card.className='card debug-fr-card';
    card.innerHTML='<div class="debug-fr-title"><div><span class="pill">JERRY</span><h2>🇫🇷 DEBUG FR</h2></div><span class="debug-fr-status"></span></div><p data-debug-fr-copy></p><button type="button" id="debug-fr-toggle"></button>';
    heading.closest('.card').before(card);updateCard(card);
    card.querySelector('#debug-fr-toggle').addEventListener('click',()=>apply(!isDebug(),{reload:true}));
  }
  function injectBanner(){
    if(!isDebug())return;
    const shell=document.querySelector('.app-shell');if(!shell||document.getElementById('debug-fr-banner'))return;
    const b=document.createElement('div');b.id='debug-fr-banner';b.className='debug-fr-banner';b.textContent='🇫🇷 DEBUG FR — Trân voit toujours le vietnamien sur son appareil';shell.prepend(b);
  }
  function refresh(){injectStyles();syncRoot();injectCard();injectBanner()}
  function apply(value,{reload=false}={}){
    const themeBefore=localStorage.getItem(THEME_KEY),active=!!value;
    localStorage.setItem(DEBUG_KEY,active?'1':'0');
    refresh();
    if(localStorage.getItem(THEME_KEY)!==themeBefore){
      if(themeBefore===null)localStorage.removeItem(THEME_KEY);else localStorage.setItem(THEME_KEY,themeBefore);
      throw new Error('DEBUG FR must not mutate the appearance theme');
    }
    window.dispatchEvent(new CustomEvent('french-tranquille:debug-fr-change',{detail:{active}}));
    if(reload)location.reload();
    return active;
  }
  let scheduled=false;const observer=new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;refresh()})});
  const start=()=>{refresh();observer.observe(document.documentElement,{subtree:true,childList:true})};
  window.FrenchTranquilleDebugFr=Object.freeze({version:VERSION,key:DEBUG_KEY,themeKey:THEME_KEY,current:isDebug,apply,toggle:()=>apply(!isDebug()),refresh});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
