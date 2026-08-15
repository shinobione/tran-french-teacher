(() => {
  'use strict';
  const VERSION='2.3.0',BUILD='34',DEBUG='tran-french-teacher:debug-fr:v1';
  const T=(vi,fr)=>localStorage.getItem(DEBUG)==='1'?fr:vi;
  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const root=document.documentElement;
  let offered=false,overlay=null,stepIndex=0,answered=false,lastTrigger=null,scheduled=false;

  const questions=[
    {vi:'Chọn từ đúng: ___ gare',fr:'Choisis : ___ gare',choices:['le','la','les'],answer:'la',whyVi:'“gare” là danh từ giống cái: la gare.',whyFr:'« gare » est féminin : la gare.'},
    {vi:'Bạn nói về một vé chưa xác định: ___ billet',fr:'Tu parles d’un billet non encore identifié : ___ billet',choices:['un','une','des'],answer:'un',whyVi:'“billet” là giống đực: un billet.',whyFr:'« billet » est masculin : un billet.'},
    {vi:'Bạn xin một cái bàn: ___ table',fr:'Tu demandes une table : ___ table',choices:['un','une','des'],answer:'une',whyVi:'“table” là giống cái: une table.',whyFr:'« table » est féminin : une table.'},
    {vi:'Số nhiều: la pharmacie → ___ pharmacies',fr:'Au pluriel : la pharmacie → ___ pharmacies',choices:['le','la','les'],answer:'les',whyVi:'Ở số nhiều, le/la trở thành les.',whyFr:'Au pluriel, le/la devient les.'}
  ];

  function installStyle(){
    if(document.getElementById('ft-foundations-pilot-style'))return;
    const s=document.createElement('style');s.id='ft-foundations-pilot-style';s.textContent=`
      .ft-foundation-entry{margin-top:16px;padding:15px;border:1px solid rgba(116,238,199,.25);border-radius:18px;background:linear-gradient(145deg,rgba(54,107,101,.2),rgba(109,77,153,.13));display:grid;gap:10px}.ft-foundation-entry h3{margin:0}.ft-foundation-entry p{margin:0;color:#9fb0c5;line-height:1.5}.ft-foundation-entry button{min-height:46px;width:100%}
      .ft-foundation-overlay{position:fixed;inset:0;z-index:1500;background:rgba(4,9,17,.9);backdrop-filter:blur(12px);display:flex;padding:max(16px,env(safe-area-inset-top)) 12px max(16px,env(safe-area-inset-bottom));overflow:auto}.ft-foundation-dialog{width:min(620px,100%);margin:auto;background:#111d2e;border:1px solid rgba(183,203,231,.18);border-radius:24px;padding:20px;display:grid;gap:17px;box-shadow:0 24px 80px rgba(0,0,0,.4)}.ft-foundation-top{display:flex;justify-content:space-between;gap:12px}.ft-foundation-top h2{margin:4px 0 0}.ft-foundation-close{min-width:46px;height:46px}.ft-foundation-eyebrow{font-size:.72rem;letter-spacing:.15em;font-weight:800;color:#7ee9c9}.ft-foundation-bar{height:5px;background:rgba(255,255,255,.08);border-radius:99px;overflow:hidden}.ft-foundation-bar i{display:block;height:100%;background:linear-gradient(90deg,#74e8c6,#c397f3)}.ft-foundation-copy{line-height:1.58;color:#d7e0ec}.ft-foundation-examples{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.ft-foundation-examples b{padding:11px;border-radius:13px;text-align:center;background:#091522}.ft-foundation-q{display:grid;gap:12px}.ft-foundation-q h3{margin:0}.ft-foundation-options{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.ft-foundation-options button{min-height:48px}.ft-foundation-options .ok{outline:2px solid #74e8c6}.ft-foundation-options .bad{outline:2px solid #e86f7d}.ft-foundation-feedback{min-height:25px;margin:0;color:#aebdd0}.ft-foundation-next{min-height:48px}.ft-foundation-done{text-align:center}.ft-foundation-done .mark{font-size:2.4rem}.ft-foundation-done p{color:#b6c4d6;line-height:1.55}@media(max-width:520px){.ft-foundation-dialog{padding:17px;border-radius:20px}.ft-foundation-options{grid-template-columns:1fr}}`;
    document.head.appendChild(s);
  }

  function currentLessonNumber(){
    const title=document.querySelector('.screen-lesson .topbar h1')?.textContent||'';
    return Number(title.match(/\d+/)?.[0]||0);
  }

  function updateMeta(){
    const params=new URLSearchParams(location.search);
    if(params.has('b32Audit')||params.has('b31Audit')||params.has('b30Audit')||params.has('v2Audit'))return;
    const meta=window.FrenchTranquilleBuildMeta;
    if(meta){meta.version=VERSION;meta.build=BUILD}
    root.dataset.foundationsPilot='1';root.dataset.foundationsVersion=VERSION;root.dataset.foundationsBuild=BUILD;
  }

  function entryMarkup(){return `<section class="ft-foundation-entry" data-foundation-entry><span class="ft-foundation-eyebrow">🧩 ${esc(T('NỀN TẢNG NHỎ','PETITE BASE UTILE'))}</span><h3>${esc(T('le / la / les • un / une','le / la / les • un / une'))}</h3><p>${esc(T('5 phút để hiểu vì sao tiếng Pháp đổi “từ nhỏ” trước danh từ. Không bắt buộc để tiếp tục bài.','5 minutes pour comprendre pourquoi le petit mot devant le nom change. Cette base reste facultative pour continuer la leçon.'))}</p><button type="button" class="secondary" data-foundation-open>${esc(T('Mở nền tảng • khoảng 5 phút','Ouvrir la base • ≈ 5 min'))} ›</button></section>`}

  function mountEntry(){
    if(offered||overlay)return;
    const n=currentLessonNumber();
    if(n<8||n>13)return;
    const step=document.querySelector('.screen-lesson .lesson-step');
    if(!step||step.querySelector('[data-foundation-entry]'))return;
    const wrap=document.createElement('div');wrap.innerHTML=entryMarkup();const entry=wrap.firstElementChild;step.appendChild(entry);offered=true;lastTrigger=entry.querySelector('[data-foundation-open]');lastTrigger.addEventListener('click',open);
  }

  function open(){stepIndex=0;answered=false;renderOverlay()}
  function close(){overlay?.remove();overlay=null;lastTrigger?.focus?.()}

  function renderOverlay(){
    installStyle();
    if(!overlay){overlay=document.createElement('div');overlay.className='ft-foundation-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');document.body.appendChild(overlay)}
    const total=questions.length+1,pct=Math.round((Math.min(stepIndex,total)/total)*100);
    let body='';
    if(stepIndex===0){
      body=`<div class="ft-foundation-copy"><strong>${esc(T('Trong tiếng Pháp, hãy học danh từ cùng với “người bạn nhỏ” đứng trước nó.','En français, apprends le nom avec son petit compagnon placé devant.'))}</strong><p>${esc(T('Danh từ thường có giống ngữ pháp: giống đực hoặc giống cái. Không phải lúc nào cũng đoán được, vì vậy học “la gare”, không chỉ học “gare”.','Les noms ont généralement un genre grammatical, masculin ou féminin. On ne peut pas toujours le deviner : apprends « la gare », pas seulement « gare ».'))}</p><p>${esc(T('Số nhiều dùng “les” cho cả hai giống. Với một thứ chưa xác định: un (đực), une (cái), des (số nhiều).','Au pluriel, « les » fonctionne pour les deux genres. Pour une chose non identifiée : un (masculin), une (féminin), des (pluriel).'))}</p></div><div class="ft-foundation-examples"><b>🚉 la gare</b><b>🎫 un billet</b><b>🍽️ une table</b><b>🚻 les toilettes</b></div><button class="primary ft-foundation-next" data-foundation-next>${esc(T('Thử 4 câu ngắn','Essayer 4 mini-questions'))} ›</button>`;
    }else if(stepIndex<=questions.length){
      const q=questions[stepIndex-1];body=`<div class="ft-foundation-q"><span class="muted">${stepIndex}/${questions.length}</span><h3>${esc(T(q.vi,q.fr))}</h3><div class="ft-foundation-options">${q.choices.map(c=>`<button type="button" data-foundation-choice="${esc(c)}">${esc(c)}</button>`).join('')}</div><p class="ft-foundation-feedback" data-foundation-feedback></p><button class="primary ft-foundation-next" data-foundation-next hidden>${esc(stepIndex===questions.length?T('Kết thúc','Terminer'):T('Tiếp tục','Continuer'))} ›</button></div>`;
    }else{
      body=`<div class="ft-foundation-done"><div class="mark">✓</div><h3>${esc(T('Xong nền tảng nhỏ','Petite base terminée'))}</h3><p>${esc(T('Điểm quan trọng: học danh từ cùng với mạo từ — la gare, un billet, une table. Khi chuyển sang số nhiều, le/la → les. Một bài kiểm tra đúng chưa có nghĩa là đã “thành thạo”; Tyffany sẽ cho các mẫu này quay lại sau.','L’idée clé : apprends le nom avec son article — la gare, un billet, une table. Au pluriel, le/la → les. Une bonne réponse ne signifie pas que la règle est « maîtrisée » ; Tyffany la fera revenir plus tard.'))}</p><button class="primary ft-foundation-next" data-foundation-close>${esc(T('Quay lại bài học','Retour à la leçon'))} ›</button></div>`;
    }
    overlay.innerHTML=`<section class="ft-foundation-dialog"><div class="ft-foundation-top"><div><span class="ft-foundation-eyebrow">F01–F04 • PILOT</span><h2>${esc(T('Mạo từ, giống & số nhiều','Articles, genre & pluriel'))}</h2></div><button type="button" class="ft-foundation-close" data-foundation-close aria-label="${esc(T('Đóng','Fermer'))}">×</button></div><div class="ft-foundation-bar"><i style="width:${pct}%"></i></div>${body}</section>`;
    overlay.querySelectorAll('[data-foundation-close]').forEach(b=>b.addEventListener('click',close));
    overlay.querySelector('[data-foundation-next]')?.addEventListener('click',()=>{stepIndex++;answered=false;renderOverlay()});
    overlay.querySelectorAll('[data-foundation-choice]').forEach(b=>b.addEventListener('click',()=>answer(b)));
  }

  function answer(button){
    if(answered)return;answered=true;const q=questions[stepIndex-1],value=button.dataset.foundationChoice,ok=value===q.answer;
    overlay.querySelectorAll('[data-foundation-choice]').forEach(b=>{b.disabled=true;if(b.dataset.foundationChoice===q.answer)b.classList.add('ok')});
    if(!ok)button.classList.add('bad');const feedback=overlay.querySelector('[data-foundation-feedback]');if(feedback)feedback.textContent=`${ok?'✓':'→'} ${T(q.whyVi,q.whyFr)}`;const next=overlay.querySelector('[data-foundation-next]');if(next)next.hidden=false;
  }

  function decorate(){updateMeta();mountEntry()}
  function schedule(){if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;decorate()})}
  installStyle();const app=document.getElementById('app');if(app)new MutationObserver(schedule).observe(app,{childList:true,subtree:true});window.addEventListener('pagehide',close);decorate();
  window.FrenchTranquilleFoundationsPilot=Object.freeze({version:VERSION,build:BUILD,concepts:['F01','F02','F03','F04'],persistent:false,refresh:decorate,open});
})();