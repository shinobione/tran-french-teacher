/* Cosmetic appearance preference only. */
(()=>{
'use strict';
const KEY='french-tranquille:appearance-theme:v1';
const IDS=['original','aurora','sunset','jade'];
const valid=id=>IDS.includes(id)?id:'original';
const current=()=>valid(localStorage.getItem(KEY)||'original');
function apply(id){
 const theme=valid(id);
 document.documentElement.dataset.theme=theme;
 localStorage.setItem(KEY,theme);
 return theme;
}
function mountBrand(){
 const home=document.querySelector('.b27-home');
 if(!home||home.querySelector('.ft-modern-home-logo'))return;
 home.classList.add('ft-modern-home-brand');
 const img=document.createElement('img');
 img.className='ft-modern-home-logo';
 img.src='./assets/HomeLogo.png?v=2.3.1-theme1';
 img.alt='French Trân’quille';
 img.decoding='async';
 home.prepend(img);
}
const style=document.createElement('style');
style.textContent='.ft-modern-home-brand::before{display:none!important}.ft-modern-home-logo{display:block;width:min(430px,92vw);height:auto;max-height:260px;object-fit:contain;margin:0 auto 12px;filter:drop-shadow(0 16px 34px rgba(35,0,70,.28))}@media(max-width:520px){.ft-modern-home-logo{width:min(340px,94vw);margin-bottom:8px}}';
document.head.appendChild(style);
document.documentElement.dataset.theme=current();
const app=document.getElementById('app');if(app)new MutationObserver(mountBrand).observe(app,{childList:true,subtree:true});mountBrand();
window.FrenchTranquilleThemes=Object.freeze({version:'1.0.0',key:KEY,themes:IDS,current,apply,mountBrand});
})();