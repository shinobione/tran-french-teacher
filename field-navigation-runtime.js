(()=>{
'use strict';
if(window.FrenchTranquilleFieldNavigation)return;

const params=new URLSearchParams(location.search);
const historical=params.has('b31Audit')||params.has('b30Audit')||params.has('v2Audit')||[...params.keys()].some(key=>/smoke/i.test(key));
const forced=params.has('fieldNavV2')||params.has('fieldNavV3');
if(historical&&!forced)return;

const R=document.documentElement;
let seq=0;
let settingsReturn=null;
let settingsReturnNav=null;
let settingsListeningUnderlay=null;
let suspendedListening=null;
let controlsScheduled=false;
const sleep=n=>new Promise(r=>setTimeout(r,n));

function active(id){
  document.querySelectorAll('.ux-bottom-nav [data-ux-nav]').forEach(b=>{
    const on=b.dataset.uxNav===id;
    b.classList.toggle('active',on);
    b.setAttribute('aria-current',on?'page':'false');
  });
}

function currentActiveNav(){
  return document.querySelector('.ux-bottom-nav [data-ux-nav].active')?.dataset.uxNav||'home';
}

function settleFacades(){
  document.querySelectorAll('#app .b27-page.b27-entering,#app .b27-page.b27-leaving').forEach(n=>n.classList.remove('b27-entering','b27-leaving'));
  document.querySelectorAll('body > .b27-overlay.b27-entering').forEach(n=>n.classList.remove('b27-entering'));
}

function legacy(id){
  const b=document.querySelector(`.bottom-nav [data-go="${id}"]`);
  if(!b)return false;
  b.click();
  return true;
}

function currentScreen(){
  const shell=document.querySelector('#app .app-shell');
  if(!shell)return 'boot';
  const cls=[...shell.classList].find(name=>name.startsWith('screen-'));
  return cls?cls.slice(7):'home';
}

function settingsLabel(){
  try{return localStorage.getItem('tran-french-teacher:debug-fr:v1')==='1'?'Réglages':'Cài đặt'}
  catch{return 'Cài đặt'}
}

function ensurePracticeSettings(){
  const header=document.querySelector('.b27-practice-page:not(.b27-leaving) .b27-overlay-header');
  const slot=header?.lastElementChild;
  if(!slot||slot.querySelector('[data-b27-settings]'))return;
  const button=document.createElement('button');
  button.type='button';
  button.className='b27-icon-button b27-practice-settings';
  button.dataset.b27Settings='';
  button.setAttribute('aria-label',settingsLabel());
  button.textContent='⚙';
  slot.appendChild(button);
}

function ensureListeningSettings(){
  const listeningOverlay=document.querySelector('body > .listening-overlay');
  const header=listeningOverlay?.querySelector('.listening-top');
  if(!header)return;
  let button=header.querySelector('[data-b27-settings]');
  if(!button){
    button=document.createElement('button');
    button.type='button';
    button.className='b27-icon-button listening-settings';
    button.dataset.b27Settings='';
    button.setAttribute('aria-label',settingsLabel());
    button.textContent='⚙';
    header.appendChild(button);
  }
  button.disabled=!!listeningOverlay.querySelector('[data-listening-play][disabled],[data-listening-slow][disabled]');
}

function scheduleControls(){
  if(controlsScheduled)return;
  controlsScheduled=true;
  queueMicrotask(()=>{
    controlsScheduled=false;
    ensurePracticeSettings();
    ensureListeningSettings();
  });
}

function listeningUnderlay(){
  if(document.querySelector('body > .b27-practice-page:not(.b27-leaving)'))return 'practice';
  const screen=currentScreen();
  if(['home','progress'].includes(screen))return screen;
  const nav=currentActiveNav();
  return ['home','practice','progress'].includes(nav)?nav:'home';
}

function suspendListeningForSettings(){
  const node=document.querySelector('body > .listening-overlay');
  if(!node)return false;
  if(node.querySelector('[data-listening-play][disabled],[data-listening-slow][disabled]'))return false;
  settingsListeningUnderlay=listeningUnderlay();
  suspendedListening=node;
  node.remove();
  R.classList.remove('listening-open');
  return true;
}

function restoreListeningFromSettings(){
  const node=suspendedListening;
  suspendedListening=null;
  if(!node)return false;
  document.body.appendChild(node);
  R.classList.add('listening-open');
  ensureListeningSettings();
  settleFacades();
  return true;
}

function closeTransient({preserveListening=false}={}){
  if(!preserveListening){
    window.FrenchTranquilleListening?.close?.();
    suspendedListening=null;
    settingsListeningUnderlay=null;
  }
  window.FrenchTranquilleUX?.closePractice?.();
  document.querySelector('[data-b27-close-practice]')?.click();
  window.FrenchTranquilleBuild27Shell?.closeJourney?.();
}

async function waitGone(sel,limit=320){
  for(let t=0;t<limit;t+=20){
    if(!document.querySelector(sel))return true;
    await sleep(20);
  }
  return !document.querySelector(sel);
}

function refresh(){
  window.FrenchTranquilleBuild27Shell?.refresh?.();
  window.FrenchTranquilleBuild32Shell?.refresh?.();
  ensurePracticeSettings();
  ensureListeningSettings();
  settleFacades();
}

function settingsSource(){
  if(document.querySelector('body > .listening-overlay'))return 'listening';
  if(document.querySelector('.b27-practice-page'))return 'practice';
  const screen=currentScreen();
  return ['home','progress'].includes(screen)?screen:'home';
}

function openSettings(){
  const source=settingsSource();
  settingsReturn=source;
  settingsReturnNav=currentActiveNav();
  R.dataset.fieldSettingsReturn=source;
  R.dataset.fieldSettingsReturnNav=settingsReturnNav;
  R.dataset.fieldSettingsReady='0';
  R.dataset.fieldRouteError='';
  R.dataset.fieldSettingsOpenCount=String(Number(R.dataset.fieldSettingsOpenCount||0)+1);
  ++seq;

  const preserveListening=source==='listening'&&suspendListeningForSettings();
  if(source==='listening'&&!preserveListening){
    settingsListeningUnderlay=null;
    R.dataset.fieldRouteError='settings-listening-busy';
    return false;
  }
  closeTransient({preserveListening});
  settleFacades();

  if(currentScreen()!=='home'&&!legacy('home')){
    R.dataset.fieldRouteError='settings-missing-home';
    return false;
  }
  settleFacades();

  const target=[...document.querySelectorAll('.screen-home [data-go="settings"]')].find(node=>!node.closest('.b27-page,.b27-overlay'))||document.querySelector('.screen-home [data-go="settings"]');
  if(!target){
    R.dataset.fieldRouteError='settings-missing-trigger';
    return false;
  }
  target.click();
  settleFacades();
  active(source==='practice'?'practice':source==='listening'?(settingsReturnNav||'home'):source);
  requestAnimationFrame(()=>{
    settleFacades();
    const ready=currentScreen()==='settings';
    R.dataset.fieldSettingsReady=ready?'1':'0';
    if(!ready)R.dataset.fieldRouteError='settings-not-visible';
  });
  return true;
}

function restoreListeningUnderlay(id){
  const target=['home','practice','progress'].includes(id)?id:'home';
  if(target==='practice'){
    if(currentScreen()!=='home'&&!legacy('home'))return false;
    refresh();
    window.FrenchTranquilleBuild27Shell?.openPractice?.();
    const practice=document.querySelector('body > .b27-practice-page');
    if(!practice)return false;
    ensurePracticeSettings();
    settleFacades();
    active('practice');
    return true;
  }
  if(currentScreen()!==target&&!legacy(target))return false;
  refresh();
  active(target);
  return true;
}

async function returnFromSettings(){
  const target=settingsReturn||R.dataset.fieldSettingsReturn||'home';
  const returnNav=settingsReturnNav||R.dataset.fieldSettingsReturnNav||'home';
  settingsReturn=null;
  settingsReturnNav=null;
  R.dataset.fieldSettingsReady='0';
  R.dataset.fieldSettingsReturn='';
  R.dataset.fieldSettingsReturnNav='';
  R.dataset.fieldSettingsReturnCount=String(Number(R.dataset.fieldSettingsReturnCount||0)+1);

  if(target==='listening'){
    ++seq;
    R.dataset.fieldRouteIntent='listening';
    R.dataset.fieldRouteReady='0';
    R.dataset.fieldRouteError='';
    const underlay=settingsListeningUnderlay||(['home','practice','progress'].includes(returnNav)?returnNav:'home');
    settingsListeningUnderlay=null;
    if(!restoreListeningUnderlay(underlay)){
      R.dataset.fieldRouteError=`listening-underlay-${underlay}-restore-failed`;
      suspendedListening=null;
      return;
    }
    if(!restoreListeningFromSettings()){
      R.dataset.fieldRouteError='listening-restore-failed';
      return;
    }
    active(underlay);
    R.dataset.fieldRouteReady='1';
    return;
  }

  settingsListeningUnderlay=null;
  if(target==='practice'){
    await go('practice');
    return;
  }
  await go(['home','progress'].includes(target)?target:'home');
}

async function go(id){
  const token=++seq;
  R.dataset.fieldRouteIntent=id;
  R.dataset.fieldRouteReady='0';
  R.dataset.fieldRouteError='';
  closeTransient();
  await waitGone('.b27-practice-page');
  if(token!==seq)return;

  if(id==='practice'){
    const host=currentScreen();
    window.FrenchTranquilleBuild27Shell?.openPractice?.();
    const practice=document.querySelector('body > .b27-practice-page');
    if(!practice){R.dataset.fieldRouteError='practice-open-failed';return}
    ensurePracticeSettings();
    active('practice');
    if(host!=='home'){
      legacy('home');
      window.FrenchTranquilleBuild27Shell?.refresh?.();
      window.FrenchTranquilleBuild32Shell?.refresh?.();
    }
    requestAnimationFrame(()=>{
      if(token!==seq)return;
      ensurePracticeSettings();
      active('practice');
      R.dataset.fieldRouteReady=document.querySelector('.b27-practice-page')?'1':'0';
    });
    return;
  }

  if(!legacy(id)){R.dataset.fieldRouteError=`missing-${id}`;return}
  refresh();
  active(id);
  requestAnimationFrame(()=>{
    if(token!==seq)return;
    refresh();
    active(id);
    R.dataset.fieldRouteReady='1';
  });
  setTimeout(()=>{
    if(token!==seq)return;
    refresh();
    active(id);
  },180);
}

function onNav(e){
  const b=e.target?.closest?.('.ux-bottom-nav [data-ux-nav]');
  if(!b)return;
  const id=b.dataset.uxNav;
  if(!['home','practice','progress'].includes(id))return;
  e.preventDefault();
  e.stopImmediatePropagation();
  R.dataset.fieldRouteCount=String(Number(R.dataset.fieldRouteCount||0)+1);
  go(id);
}

function onSettings(e){
  const trigger=e.target?.closest?.('[data-b27-settings]');
  if(!trigger||trigger.disabled)return;
  e.preventDefault();
  e.stopImmediatePropagation();
  openSettings();
}

function onSettingsBack(e){
  const back=e.target?.closest?.('.screen-settings [data-back]');
  if(!back||!R.dataset.fieldSettingsReturn)return;
  e.preventDefault();
  e.stopImmediatePropagation();
  returnFromSettings();
}

function onSettingsEscape(e){
  if(e.key!=='Escape'||R.dataset.fieldSettingsReturn!=='listening')return;
  e.preventDefault();
  e.stopImmediatePropagation();
  returnFromSettings();
}

function onListening(e){
  if(!e.target?.closest?.('[data-b27-action="listening"],[data-b27-practice-action="listening"],[data-listening-close]'))return;
  setTimeout(()=>{settleFacades();ensureListeningSettings()},220);
}

window.addEventListener('click',onNav,true);
window.addEventListener('click',onSettings,true);
window.addEventListener('click',onSettingsBack,true);
window.addEventListener('keydown',onSettingsEscape,true);
window.addEventListener('click',onListening,true);
if(document.body)new MutationObserver(scheduleControls).observe(document.body,{childList:true,subtree:true});
setTimeout(()=>{
  settleFacades();
  ensurePracticeSettings();
  ensureListeningSettings();
  const p=document.querySelector('.b27-practice-page:not(.b27-leaving)');
  if(p)active('practice');
},250);

window.FrenchTranquilleFieldNavigation=Object.freeze({
  version:'2.3.7',
  build:'34.7',
  go,
  openSettings,
  returnFromSettings,
  settle:settleFacades,
  ensurePracticeSettings,
  ensureListeningSettings
});
})();