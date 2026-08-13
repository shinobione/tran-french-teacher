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
document.documentElement.dataset.theme=current();
window.FrenchTranquilleThemes=Object.freeze({version:'1.0.0',key:KEY,themes:IDS,current,apply});
})();