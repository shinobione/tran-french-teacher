(()=>{
  const root=document.documentElement;
  root.dataset.fieldNavigationV2Started='1';
  const frame=document.createElement('iframe');
  frame.src='./index.html?uxSmoke=lesson8&fieldNavV3=1';
  frame.style.cssText='width:390px;height:844px;border:0';
  document.body.appendChild(frame);
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const finish=(ok,detail)=>{root.dataset.fieldNavigationV2Smoke=ok?'ok':'fail';root.dataset.fieldNavigationV2Detail=detail};
  let step='boot';
  async function press(w,button,delay=650){if(!button)throw Error(`${step}:missing-button`);button.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true}));await wait(delay)}
  function active(d){return [...d.querySelectorAll('.ux-bottom-nav [data-ux-nav].active')].map(x=>x.dataset.uxNav)}
  function visible(w,node){if(!node?.isConnected)return false;const s=w.getComputedStyle(node),r=node.getBoundingClientRect(),o=parseFloat(s.opacity||'1');return s.display!=='none'&&s.visibility!=='hidden'&&o>.05&&r.width>1&&r.height>1&&!node.classList.contains('b27-leaving')}
  function clean(d){return !d.querySelector('.listening-overlay,.b27-practice-page,.b27-journey-page,.ux-practice-overlay')}
  function detail(w,node){if(!node)return 'missing';const s=w.getComputedStyle(node),r=node.getBoundingClientRect();return `class=${node.className};opacity=${s.opacity};display=${s.display};visibility=${s.visibility};rect=${Math.round(r.width)}x${Math.round(r.height)}`}
  function assertDestination(w,d,id){
    const a=active(d);if(a.length!==1||a[0]!==id)throw Error(`${step}:active:${id}:${a.join(',')}`);
    const node=id==='home'?d.querySelector('.screen-home .b27-home'):id==='progress'?d.querySelector('.screen-progress .b27-progress-page'):d.querySelector('.b27-practice-page');
    if(!visible(w,node))throw Error(`${step}:${id}-not-visible:${detail(w,node)}`);
    if(id!=='practice'&&!clean(d))throw Error(`${step}:stale-overlay:${id}`);
    if(d.querySelector('.b27-page.b27-leaving'))throw Error(`${step}:persistent-leaving:${id}`);
  }
  function assertSettings(w,d,source){
    const shell=d.querySelector('#app .app-shell.screen-settings');
    const narrow=d.querySelector('.screen-settings .narrow');
    if(!visible(w,shell)||!visible(w,narrow))throw Error(`${step}:settings-not-visible:${detail(w,shell)}:${detail(w,narrow)}`);
    if(d.documentElement.dataset.fieldSettingsReturn!==source)throw Error(`${step}:settings-return:${d.documentElement.dataset.fieldSettingsReturn||'missing'}`);
    if(d.querySelector('.b27-page.b27-leaving'))throw Error(`${step}:settings-persistent-leaving`);
    if(d.documentElement.dataset.fieldRouteError)throw Error(`${step}:settings-route-error:${d.documentElement.dataset.fieldRouteError}`);
  }
  frame.addEventListener('load',()=>setTimeout(async()=>{
    try{
      const d=frame.contentDocument,w=frame.contentWindow;
      const style=d.createElement('style');
      style.dataset.fieldNavSmokeMotion='off';
      style.textContent='*,*::before,*::after{transition-duration:0s!important;animation-duration:0s!important;animation-delay:0s!important}';
      d.head.appendChild(style);
      const keys=['francais-avec-luc:learner:v1','french-tranquille:learning-memory:v1','french-tranquille:error-intelligence:v1','french-tranquille:scenarios:v1','french-tranquille:milestones:v1'];
      const before=Object.fromEntries(keys.map(k=>[k,w.localStorage.getItem(k)]));
      step='initial-home';assertDestination(w,d,'home');

      step='home-settings-open';await press(w,d.querySelector('.screen-home .b27-home [data-b27-settings]'));assertSettings(w,d,'home');
      step='home-settings-return';await press(w,d.querySelector('.screen-settings [data-back]'));assertDestination(w,d,'home');

      step='progress-before-settings';await press(w,d.querySelector('[data-ux-nav="progress"]'));assertDestination(w,d,'progress');
      step='progress-settings-open';await press(w,d.querySelector('.screen-progress .b27-progress-page [data-b27-settings]'));assertSettings(w,d,'progress');
      step='progress-settings-theme-stability';
      const jade=d.querySelector('[data-theme-option="jade"]');if(jade)await press(w,jade,150);assertSettings(w,d,'progress');
      step='progress-settings-return';await press(w,d.querySelector('.screen-settings [data-back]'));assertDestination(w,d,'progress');

      step='progress-home-reset';await press(w,d.querySelector('[data-ux-nav="home"]'));assertDestination(w,d,'home');
      step='home-quick-listening-open';
      const quickListen=d.querySelector('[data-b27-action="listening"]');
      if(!quickListen||quickListen.disabled)throw Error(`${step}:unavailable`);
      await press(w,quickListen,650);
      if(!visible(w,d.querySelector('.listening-overlay')))throw Error(`${step}:not-visible`);
      step='home-quick-listening-close';await press(w,d.querySelector('[data-listening-close]'),650);assertDestination(w,d,'home');
      for(let n=0;n<5;n++){
        step=`cycle${n+1}-practice-a`;await press(w,d.querySelector('[data-ux-nav="practice"]'));assertDestination(w,d,'practice');
        step=`cycle${n+1}-home-a`;await press(w,d.querySelector('[data-ux-nav="home"]'));assertDestination(w,d,'home');
        step=`cycle${n+1}-progress`;await press(w,d.querySelector('[data-ux-nav="progress"]'));assertDestination(w,d,'progress');
        step=`cycle${n+1}-practice-b`;await press(w,d.querySelector('[data-ux-nav="practice"]'));assertDestination(w,d,'practice');
        step=`cycle${n+1}-practice-listening`;const listen=d.querySelector('[data-b27-practice-action="listening"]');if(!listen||listen.disabled)throw Error(`${step}:unavailable`);
        await press(w,listen,650);if(!visible(w,d.querySelector('.listening-overlay')))throw Error(`${step}:not-visible`);
        step=`cycle${n+1}-home-b`;await press(w,d.querySelector('[data-ux-nav="home"]'));assertDestination(w,d,'home');
      }
      const after=Object.fromEntries(keys.map(k=>[k,w.localStorage.getItem(k)]));
      for(const k of keys){if(before[k]!==after[k])throw Error(`store-mutated:${k}`)}
      if(Number(d.documentElement.dataset.fieldRouteCount||0)<18)throw Error('route-count');
      if(Number(d.documentElement.dataset.fieldSettingsOpenCount||0)<2)throw Error('settings-open-count');
      if(Number(d.documentElement.dataset.fieldSettingsReturnCount||0)<2)throw Error('settings-return-count');
      if(d.documentElement.dataset.fieldRouteError)throw Error(`route-error:${d.documentElement.dataset.fieldRouteError}`);
      finish(true,`settings home/progress return + visible-home-listening-close + 5x route cycle; transactions=${d.documentElement.dataset.fieldRouteCount||0}`)
    }catch(e){finish(false,e.message)}
  },3200),{once:true});
  setTimeout(()=>{if(!root.dataset.fieldNavigationV2Smoke)finish(false,'timeout')},36000)
})();