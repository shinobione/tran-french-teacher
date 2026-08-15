/* Cosmetic appearance preference only. V5.7 gives all four themes parity. */
(()=>{
'use strict';
const KEY='french-tranquille:appearance-theme:v1';
const IDS=['original','aurora','sunset','jade'];
const LABELS={original:'Original',aurora:'Aurora Bleu/Rose',sunset:'Sunset Orange/Violet',jade:'Nocturne Jade/Or'};
const COLORS={original:'#171026',aurora:'#050b22',sunset:'#1a0825',jade:'#04130f'};
const V59A='2.3.23-v59a1';
const V59B='2.3.24-v59b1';
const valid=id=>IDS.includes(id)?id:'original';
const current=()=>valid(localStorage.getItem(KEY)||'original');
function ensureStyle(){
 if(!document.querySelector('link[data-premium-theme-polish]')){
  const l=document.createElement('link');l.rel='stylesheet';l.href='./premium-theme-polish.css?v=2.3.21-v57art1';l.dataset.premiumThemePolish='1';document.head.appendChild(l);
 }
 if(!document.querySelector('script[data-premium-v55-fidelity-runtime]')){
  const r=document.createElement('script');r.src='./premium-v5-fidelity-reset.js?v=2.3.21-v57art1';r.dataset.premiumV55FidelityRuntime='1';r.async=false;document.head.appendChild(r);
 }
 if(!document.querySelector('link[data-premium-v59-interactions-style]')){
  const l=document.createElement('link');l.rel='stylesheet';l.href=`./premium-v59-interactions.css?v=${V59A}`;l.dataset.premiumV59InteractionsStyle='1';document.head.appendChild(l);
 }
 if(!document.querySelector('script[data-premium-v59-interactions-runtime]')){
  const r=document.createElement('script');r.src=`./premium-v59-interactions.js?v=${V59A}`;r.dataset.premiumV59InteractionsRuntime='1';r.async=false;document.head.appendChild(r);
 }
 if(!document.querySelector('link[data-premium-v59-lesson-layout-style]')){
  const l=document.createElement('link');l.rel='stylesheet';l.href=`./premium-v59-lesson-layout.css?v=${V59B}`;l.dataset.premiumV59LessonLayoutStyle='1';document.head.appendChild(l);
 }
 if(!document.querySelector('script[data-premium-v59-lesson-layout-runtime]')){
  const r=document.createElement('script');r.src=`./premium-v59-lesson-layout.js?v=${V59B}`;r.dataset.premiumV59LessonLayoutRuntime='1';r.async=false;document.head.appendChild(r);
 }
 if(!document.querySelector('style[data-modern-home-brand-fix]')){
  const s=document.createElement('style');s.dataset.modernHomeBrandFix='1';s.textContent='.ft-modern-home-brand::before{display:none!important}';document.head.appendChild(s);
 }
}
function sync(theme){document.querySelectorAll('[data-theme-option]').forEach(b=>{const v=b.dataset.themeOption===theme?'true':'false';if(b.getAttribute('aria-pressed')!==v)b.setAttribute('aria-pressed',v)});document.querySelectorAll('[data-theme-current]').forEach(n=>{const v=LABELS[theme];if(n.textContent!==v)n.textContent=v});const m=document.querySelector('meta[name="theme-color"]');if(m&&m.content!==COLORS[theme])m.content=COLORS[theme]}
function apply(id){const t=valid(id);document.documentElement.dataset.theme=t;if(localStorage.getItem(KEY)!==t)localStorage.setItem(KEY,t);sync(t);window.FrenchTranquillePremiumV55?.refresh?.();window.FrenchTranquillePremiumV59Interactions?.refresh?.();window.FrenchTranquillePremiumV59LessonLayout?.refresh?.();return t}
function brand(){const h=document.querySelector('.b27-home');if(!h)return;h.classList.add('ft-modern-home-brand');let img=h.querySelector(':scope>.ft-modern-home-logo');if(!img){img=document.createElement('img');img.className='ft-modern-home-logo';img.src='./assets/HomeLogo.png?v=2.3.2-theme2';img.alt='French Trân’quille';img.decoding='async'}const head=h.querySelector(':scope>.b27-header');if(head){if(head.nextElementSibling!==img)head.insertAdjacentElement('afterend',img)}else if(h.firstElementChild!==img)h.prepend(img)}
function picker(){const host=document.querySelector('.screen-settings .narrow'),tpl=document.getElementById('ft-theme-settings');if(!host||!tpl)return;let p=host.querySelector(':scope>.ft-theme-settings-inline');if(!p){p=tpl.cloneNode(true);p.removeAttribute('id');p.classList.add('ft-theme-settings-inline');p.open=true;const v=p.querySelector('summary>span:last-child');if(v)v.dataset.themeCurrent='1';host.prepend(p)}sync(current())}
function mount(){brand();picker();sync(current());window.FrenchTranquillePremiumV55?.refresh?.();window.FrenchTranquillePremiumV59Interactions?.refresh?.();window.FrenchTranquillePremiumV59LessonLayout?.refresh?.()}
ensureStyle();document.documentElement.dataset.theme=current();const app=document.getElementById('app');if(app)new MutationObserver(mount).observe(app,{childList:true,subtree:true});mount();
window.FrenchTranquilleThemes=Object.freeze({version:'1.3.0-v57art',key:KEY,themes:IDS,current,apply,mountBrand:brand,mountSettingsPicker:picker,mount});
})();
