/* Cosmetic appearance preference only. */
(()=>{
'use strict';
const KEY='french-tranquille:appearance-theme:v1';
const IDS=['original','aurora','sunset','jade'];
const LABELS={original:'Original',aurora:'Aurora Bleu/Rose',sunset:'Sunset Orange/Violet',jade:'Nocturne Jade/Or'};
const COLORS={original:'#171026',aurora:'#050b22',sunset:'#1a0825',jade:'#04130f'};
const valid=id=>IDS.includes(id)?id:'original';
const current=()=>valid(localStorage.getItem(KEY)||'original');

function ensurePolish(){
 if(document.querySelector('link[data-premium-theme-polish]'))return;
 const link=document.createElement('link');
 link.rel='stylesheet';
 link.href='./premium-theme-polish.css?v=2.3.2-theme2';
 link.dataset.premiumThemePolish='1';
 document.head.appendChild(link);
}

function syncUi(theme){
 document.querySelectorAll('[data-theme-option]').forEach(button=>button.setAttribute('aria-pressed',button.dataset.themeOption===theme?'true':'false'));
 document.querySelectorAll('[data-theme-current]').forEach(node=>node.textContent=LABELS[theme]);
 const meta=document.querySelector('meta[name="theme-color"]');
 if(meta)meta.setAttribute('content',COLORS[theme]);
}

function apply(id){
 const theme=valid(id);
 document.documentElement.dataset.theme=theme;
 localStorage.setItem(KEY,theme);
 syncUi(theme);
 return theme;
}

function mountBrand(){
 const home=document.querySelector('.b27-home');
 if(!home)return;
 home.classList.add('ft-modern-home-brand');
 let img=home.querySelector(':scope > .ft-modern-home-logo');
 if(!img){
  img=document.createElement('img');
  img.className='ft-modern-home-logo';
  img.src='./assets/HomeLogo.png?v=2.3.2-theme2';
  img.alt='French Trân’quille';
  img.decoding='async';
 }
 const header=home.querySelector(':scope > .b27-header');
 if(header){
  if(header.nextElementSibling!==img)header.insertAdjacentElement('afterend',img);
 }else if(home.firstElementChild!==img){home.prepend(img)}
}

function mountSettingsPicker(){
 const host=document.querySelector('.screen-settings .narrow');
 const template=document.getElementById('ft-theme-settings');
 if(!host||!template)return;
 let picker=host.querySelector(':scope > .ft-theme-settings-inline');
 if(!picker){
  picker=template.cloneNode(true);
  picker.removeAttribute('id');
  picker.classList.add('ft-theme-settings-inline');
  picker.open=true;
  const summaryValue=picker.querySelector('summary>span:last-child');
  if(summaryValue)summaryValue.dataset.themeCurrent='1';
  host.prepend(picker);
 }
 syncUi(current());
}

function mount(){mountBrand();mountSettingsPicker();syncUi(current())}

ensurePolish();
document.documentElement.dataset.theme=current();
const app=document.getElementById('app');
if(app)new MutationObserver(mount).observe(app,{childList:true,subtree:true});
mount();
window.FrenchTranquilleThemes=Object.freeze({version:'1.1.0',key:KEY,themes:IDS,current,apply,mountBrand,mountSettingsPicker,mount});
})();