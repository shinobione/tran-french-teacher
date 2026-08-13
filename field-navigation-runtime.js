(()=>{
'use strict';
if(window.FrenchTranquilleFieldNavigation)return;
const R=document.documentElement;let seq=0;
const sleep=n=>new Promise(r=>setTimeout(r,n));
function active(id){document.querySelectorAll('.ux-bottom-nav [data-ux-nav]').forEach(b=>{const on=b.dataset.uxNav===id;b.classList.toggle('active',on);b.setAttribute('aria-current',on?'page':'false')})}
function settleFacades(){document.querySelectorAll('#app .b27-page.b27-entering,#app .b27-page.b27-leaving').forEach(n=>n.classList.remove('b27-entering','b27-leaving'))}
function legacy(id){const b=document.querySelector(`.bottom-nav [data-go="${id}"]`);if(!b)return false;b.click();return true}
function closeTransient(){window.FrenchTranquilleListening?.close?.();window.FrenchTranquilleUX?.closePractice?.();document.querySelector('[data-b27-close-practice]')?.click();window.FrenchTranquilleBuild27Shell?.closeJourney?.()}
async function waitGone(sel,limit=320){for(let t=0;t<limit;t+=20){if(!document.querySelector(sel))return true;await sleep(20)}return !document.querySelector(sel)}
function refresh(){window.FrenchTranquilleBuild27Shell?.refresh?.();window.FrenchTranquilleBuild32Shell?.refresh?.();settleFacades()}
async function go(id){const token=++seq;R.dataset.fieldRouteIntent=id;R.dataset.fieldRouteReady='0';R.dataset.fieldRouteError='';closeTransient();await waitGone('.b27-practice-page');if(token!==seq)return;
if(id==='practice'){legacy('home');refresh();await sleep(20);if(token!==seq)return;window.FrenchTranquilleBuild27Shell?.openPractice?.();requestAnimationFrame(()=>{if(token!==seq)return;active('practice');R.dataset.fieldRouteReady=document.querySelector('.b27-practice-page')?'1':'0'});return}
if(!legacy(id)){R.dataset.fieldRouteError=`missing-${id}`;return}refresh();active(id);requestAnimationFrame(()=>{if(token!==seq)return;refresh();active(id);R.dataset.fieldRouteReady='1'});setTimeout(()=>{if(token!==seq)return;refresh();active(id)},180)}
function onNav(e){const b=e.target?.closest?.('.ux-bottom-nav [data-ux-nav]');if(!b)return;const id=b.dataset.uxNav;if(!['home','practice','progress'].includes(id))return;e.preventDefault();e.stopImmediatePropagation();R.dataset.fieldRouteCount=String(Number(R.dataset.fieldRouteCount||0)+1);go(id)}
function onListening(e){if(!e.target?.closest?.('[data-b27-action="listening"],[data-b27-practice-action="listening"],[data-listening-close]'))return;setTimeout(settleFacades,220)}
window.addEventListener('click',onNav,true);window.addEventListener('click',onListening,true);setTimeout(()=>{settleFacades();const p=document.querySelector('.b27-practice-page:not(.b27-leaving)');if(p)active('practice')},250);
window.FrenchTranquilleFieldNavigation=Object.freeze({version:'2.3.1',build:'34.2',go,settle:settleFacades});
})();