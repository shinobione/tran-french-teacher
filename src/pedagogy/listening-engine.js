(() => {
  'use strict';

  const CURRICULUM = window.FrenchTranquilleCurriculum;
  const DATA = window.FrenchTranquilleListeningData;
  if (!CURRICULUM || !DATA) return;

  const KEY = 'french-tranquille:listening:v1';
  const LEARNER_KEY = CURRICULUM.key;
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const MAX_RECENT = 100;
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi,fr) => isDebug() ? fr : vi;
  const esc = (value='') => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const nowIso = () => new Date().toISOString();
  const itemMap = () => Object.fromEntries((CURRICULUM.items || []).map(item=>[item.id,item]));

  function initialState(){
    return {
      schemaVersion:1,
      totals:{sessions:0,attempts:0,correct:0,misses:0,plays:0,replays:0,slowPlays:0},
      families:{meaning:{attempts:0,correct:0},contrast:{attempts:0,correct:0},dialogue:{attempts:0,correct:0}},
      recent:[],
      updatedAt:null
    };
  }

  function loadState(){
    try{
      const parsed=JSON.parse(localStorage.getItem(KEY)||'null');
      if(!parsed||parsed.schemaVersion!==1)return initialState();
      const base=initialState();
      return {...base,...parsed,totals:{...base.totals,...(parsed.totals||{})},families:{meaning:{...base.families.meaning,...(parsed.families?.meaning||{})},contrast:{...base.families.contrast,...(parsed.families?.contrast||{})},dialogue:{...base.families.dialogue,...(parsed.families?.dialogue||{})}},recent:Array.isArray(parsed.recent)?parsed.recent.slice(-MAX_RECENT):[]};
    }catch{return initialState()}
  }

  let state=loadState();
  let overlay=null;
  let family='meaning';
  let currentExercise=null;
  let answered=false;
  let selectedIndex=null;
  let sessionStarted=false;
  let session={attempts:0,correct:0,misses:0};
  let cursors={meaning:0,contrast:0,dialogue:0};
  let playCount=0;
  let speaking=false;
  let playbackEpoch=0;
  let scheduled=false;
  let r1Active=false;
  let r1Plan=null;
  let r1Dialogue=null;
  let r1Index=0;
  let r1Answered=false;
  let r1SelectedIndex=null;
  let r1Results=[];

  function persist(){
    state.updatedAt=nowIso();
    state.recent=state.recent.slice(-MAX_RECENT);
    localStorage.setItem(KEY,JSON.stringify(state));
  }

  function learner(){
    try{return JSON.parse(localStorage.getItem(LEARNER_KEY)||'{}')||{}}
    catch{return{}}
  }

  function knownSet(){return new Set(learner().knownItems||[])}
  function knownItems(){const known=knownSet();return (CURRICULUM.items||[]).filter(item=>known.has(item.id))}

  function availableContrasts(){
    const known=knownSet();
    return (DATA.contrasts||[]).filter(group=>group.items.every(id=>known.has(id)&&itemMap()[id]));
  }

  function availableDialogues(){
    const known=knownSet();
    return (DATA.dialogues||[]).filter(dialogue=>dialogue.requiredItems.every(id=>known.has(id)&&itemMap()[id]));
  }

  function availability(){
    const known=knownItems();
    return {meaning:known.length>=3,contrast:availableContrasts().length>0,dialogue:availableDialogues().length>0,known:known.length,contrasts:availableContrasts().length,dialogues:availableDialogues().length};
  }

  function r1Candidate(){
    const core=window.FrenchTranquilleA2ReceptionBridgeCore;
    const data=window.FrenchTranquilleA2ReceptionBridgeData;
    const id=data?.pilotId;
    const activity=id?data.activities?.[id]:null;
    const authority=id?data.authorities?.[id]:null;
    if(!core||!activity||!authority)return null;
    try{
      const plan=core.normalizeActivity(activity,authority);
      const dialogue=(DATA.dialogues||[]).find(entry=>entry.id===plan.source.dialogueId);
      if(!dialogue)return null;
      const expected=plan.source.prerequisiteItemIds;
      if(!expected.every(id=>dialogue.requiredItems?.includes(id)&&itemMap()[id]))return null;
      return {core,plan,dialogue};
    }catch{return null}
  }

  function r1Availability(){
    const candidate=r1Candidate();
    if(!candidate)return false;
    const known=knownSet();
    return candidate.plan.source.prerequisiteItemIds.every(id=>known.has(id));
  }

  function chooseIndex(length,name){
    if(!length)return 0;
    const base=Number(state.families?.[name]?.attempts||0)+cursors[name];
    return base%length;
  }

  function rotate(array,offset){
    if(!array.length)return [];
    const n=((offset%array.length)+array.length)%array.length;
    return [...array.slice(n),...array.slice(0,n)];
  }

  function makeMeaning(){
    const learned=knownItems();
    if(learned.length<3)return null;
    const target=learned[chooseIndex(learned.length,'meaning')];
    const others=learned.filter(item=>item.id!==target.id);
    const distractors=rotate(others,chooseIndex(Math.max(others.length,1),'meaning')).slice(0,2);
    const options=rotate([target,...distractors],(Number(state.totals.attempts||0)+target.id.length)%3);
    return {family:'meaning',id:`meaning:${target.id}`,spoken:target.fr,evidenceItems:[target.id],targetId:target.id,questionVi:'Bạn nghe câu hoặc từ nào? Chọn nghĩa tiếng Việt.',questionFr:'Quel sens vietnamien correspond à ce que tu entends ?',options:options.map(item=>({label:item.vi,id:item.id})),correctIndex:options.findIndex(item=>item.id===target.id),revealVi:target.vi,revealFr:target.fr};
  }

  function makeContrast(){
    const groups=availableContrasts();
    if(!groups.length)return null;
    const group=groups[chooseIndex(groups.length,'contrast')];
    const items=group.items.map(id=>itemMap()[id]).filter(Boolean);
    const target=items[(Number(state.families.contrast.attempts||0)+cursors.contrast)%items.length];
    const options=rotate(items,(target.id.length+Number(state.totals.attempts||0))%items.length);
    return {family:'contrast',id:`contrast:${group.id}:${target.id}`,spoken:target.fr,evidenceItems:[target.id],targetId:target.id,questionVi:group.vi,questionFr:group.fr,options:options.map(item=>({label:item.vi,id:item.id})),correctIndex:options.findIndex(item=>item.id===target.id),revealVi:target.vi,revealFr:target.fr};
  }

  function makeDialogue(){
    const dialogues=availableDialogues();
    if(!dialogues.length)return null;
    const dialogue=dialogues[chooseIndex(dialogues.length,'dialogue')];
    return {family:'dialogue',id:`dialogue:${dialogue.id}`,dialogueId:dialogue.id,lines:dialogue.lines,evidenceItems:dialogue.evidenceItems||dialogue.requiredItems.slice(0,1),questionVi:dialogue.questionVi,questionFr:dialogue.questionFr,options:dialogue.options.map(option=>({label:T(option.vi,option.fr)})),correctIndex:dialogue.answer,revealVi:dialogue.titleVi,revealFr:dialogue.titleFr,titleVi:dialogue.titleVi,titleFr:dialogue.titleFr,icon:dialogue.icon||'🎧'};
  }

  function createExercise(name=family){
    if(name==='meaning')return makeMeaning();
    if(name==='contrast')return makeContrast();
    return makeDialogue();
  }

  function voice(){
    const voices=speechSynthesis?.getVoices?.()||[];
    const fr=voices.filter(v=>String(v.lang||'').toLowerCase().startsWith('fr'));
    return fr.find(v=>/google|premium|enhanced|natural|thomas|audrey|amelie|denise/i.test(v.name||''))||fr.find(v=>String(v.lang).toLowerCase()==='fr-fr')||fr[0]||null;
  }

  function utter(text,{slow=false,pitch=1.02}={}){
    return new Promise(resolve=>{
      if(!('speechSynthesis'in window)){resolve();return}
      const u=new SpeechSynthesisUtterance(text);
      u.lang='fr-FR';
      u.rate=slow?.68:.88;
      u.pitch=pitch;
      const v=voice();if(v)u.voice=v;
      u.onend=()=>resolve();u.onerror=()=>resolve();
      speechSynthesis.speak(u);
    });
  }

  function cancelPlayback(){
    playbackEpoch+=1;
    speechSynthesis?.cancel?.();
    speaking=false;
  }

  async function play({slow=false}={}){
    if((!r1Active&&!currentExercise)||speaking)return;
    if(!('speechSynthesis'in window))return;
    const dialogue=r1Active?r1Dialogue:null;
    if(r1Active&&!dialogue)return;
    const startedInR1=r1Active;
    const epoch=++playbackEpoch;
    speaking=true;
    speechSynthesis.cancel();
    state.totals.plays=Number(state.totals.plays||0)+1;
    if(playCount>0)state.totals.replays=Number(state.totals.replays||0)+1;
    if(slow)state.totals.slowPlays=Number(state.totals.slowPlays||0)+1;
    playCount+=1;persist();renderOverlay();
    if(r1Active||currentExercise.family==='dialogue'){
      const lines=r1Active?dialogue.lines:currentExercise.lines;
      for(let i=0;i<lines.length;i+=1){
        if(epoch!==playbackEpoch||(startedInR1&&!r1Active))return;
        const line=lines[i];
        await utter(line.fr,{slow,pitch:line.speaker==='A'?.97:1.06});
        if(epoch!==playbackEpoch||(startedInR1&&!r1Active))return;
      }
    }else {
      await utter(currentExercise.spoken,{slow});
      if(epoch!==playbackEpoch)return;
    }
    if(epoch!==playbackEpoch)return;
    speaking=false;renderOverlay();
  }

  function evidence(ok){
    const source=`listening-${currentExercise.family}`;
    const map=itemMap();
    currentExercise.evidenceItems.forEach(id=>{
      if(!map[id])return;
      window.FrenchTranquilleMemory?.recordPractice?.(id,ok,source);
      window.FrenchTranquilleErrors?.recordAttempt?.({itemId:id,ok,source,input:'',target:map[id].fr});
    });
  }

  function r1Evidence(result){
    const item=itemMap()[result.factId];
    if(!item)return;
    const ok=result.outcome==='success';
    const source='listening-r1';
    window.FrenchTranquilleMemory?.recordPractice?.(result.factId,ok,source);
    window.FrenchTranquilleErrors?.recordAttempt?.({itemId:result.factId,ok,source,input:'',target:item.fr});
  }

  function answerR1(index){
    if(!r1Active||r1Answered||!r1Plan)return;
    const question=r1Plan.questions[r1Index];
    if(!question)return;
    const choice=Number(index);
    let result;
    try{result=window.FrenchTranquilleA2ReceptionBridgeCore.evaluateQuestion(r1Plan,question.id,choice)}catch{return}
    r1SelectedIndex=choice;
    r1Answered=true;
    r1Results.push(result);
    r1Evidence(result);
    renderOverlay();
  }

  function answer(index){
    if(r1Active){answerR1(index);return}
    if(answered||!currentExercise)return;
    selectedIndex=Number(index);
    answered=true;
    const ok=selectedIndex===currentExercise.correctIndex;
    state.totals.attempts=Number(state.totals.attempts||0)+1;
    state.totals[ok?'correct':'misses']=Number(state.totals[ok?'correct':'misses']||0)+1;
    state.families[currentExercise.family].attempts=Number(state.families[currentExercise.family].attempts||0)+1;
    if(ok)state.families[currentExercise.family].correct=Number(state.families[currentExercise.family].correct||0)+1;
    session.attempts+=1;session[ok?'correct':'misses']+=1;
    state.recent.push({at:nowIso(),family:currentExercise.family,id:currentExercise.id,ok,slow:state.totals.slowPlays>0,replays:Math.max(0,playCount-1)});
    state.recent=state.recent.slice(-MAX_RECENT);
    persist();
    evidence(ok);
    renderOverlay();
  }

  function exitR1(){
    cancelPlayback();
    r1Active=false;r1Plan=null;r1Dialogue=null;r1Index=0;r1Answered=false;r1SelectedIndex=null;r1Results=[];playCount=0;
    renderOverlay();
  }

  function nextR1(){
    if(!r1Active||!r1Answered||!r1Plan)return;
    if(r1Index<r1Plan.questions.length-1){
      r1Index+=1;r1Answered=false;r1SelectedIndex=null;renderOverlay();return;
    }
    exitR1();
  }

  function next(){
    if(r1Active){nextR1();return}
    cursors[family]+=1;answered=false;selectedIndex=null;playCount=0;currentExercise=createExercise(family);renderOverlay();
  }

  function setFamily(nextFamily){
    const a=availability();
    if(!a[nextFamily])return;
    family=nextFamily;answered=false;selectedIndex=null;playCount=0;currentExercise=createExercise(family);renderOverlay();
  }

  function openR1(){
    if(!overlay||r1Active||!r1Availability())return;
    const candidate=r1Candidate();
    if(!candidate)return;
    r1Plan=candidate.plan;
    r1Dialogue=candidate.dialogue;
    r1Active=true;r1Index=0;r1Answered=false;r1SelectedIndex=null;r1Results=[];playCount=0;
    renderOverlay();
  }

  function startSession(){
    if(sessionStarted)return;
    sessionStarted=true;state.totals.sessions=Number(state.totals.sessions||0)+1;persist();
  }

  function transcriptHtml(){
    if(!answered||!currentExercise)return '';
    if(currentExercise.family==='dialogue'){
      return `<div class="listening-transcript"><span>${esc(T('Hội thoại','Dialogue'))}</span>${currentExercise.lines.map(line=>`<p><b>${line.speaker}</b> ${esc(line.fr)}</p>`).join('')}</div>`;
    }
    return `<div class="listening-transcript"><span>${esc(T('Bạn đã nghe','Tu as entendu'))}</span><strong>${esc(currentExercise.revealFr)}</strong><small>${esc(currentExercise.revealVi)}</small></div>`;
  }

  function familyLabel(name){return {meaning:T('Ý nghĩa','Sens'),contrast:T('Phân biệt','Contrastes'),dialogue:T('Hội thoại','Mini-dialogues')}[name]}

  function r1EntryHtml(){
    if(!r1Availability())return '';
    return `<section class="listening-r1-entry"><div><strong>🧠 ${esc(T('Nghe và nhớ nhiều thông tin','Écouter et retenir plusieurs informations'))}</strong><small>${esc(T('Nghe một hội thoại hoàn chỉnh rồi trả lời 3 câu hỏi khác nhau.','Écoute un dialogue complet puis réponds à 3 questions différentes.'))}</small></div><button class="secondary" data-listening-r1-open>${esc(T('Bắt đầu','Commencer'))} ›</button></section>`;
  }

  function r1TranscriptHtml(){
    if(!r1Plan||!r1Dialogue||!r1Answered||r1Index!==r1Plan.questions.length-1||r1Results.length!==r1Plan.questions.length)return '';
    return `<div class="listening-transcript"><span>${esc(T('Hội thoại đầy đủ','Dialogue complet'))}</span>${r1Dialogue.lines.map(line=>`<p><b>${line.speaker}</b> ${esc(line.fr)}</p>`).join('')}</div>`;
  }

  function renderR1Overlay(){
    if(!overlay||!r1Plan||!r1Dialogue)return;
    const question=r1Plan.questions[r1Index];
    if(!question){exitR1();return}
    const result=r1Results[r1Index]||null;
    const finalAnswered=r1Answered&&r1Index===r1Plan.questions.length-1&&r1Results.length===r1Plan.questions.length;
    const correctCount=r1Results.filter(entry=>entry.outcome==='success').length;
    overlay.dataset.listeningR1='1';
    overlay.dataset.listeningRevealed=finalAnswered?'1':'0';
    overlay.innerHTML=`<section class="listening-shell listening-r1-active"><header class="listening-top"><button class="listening-close listening-r1-back" data-listening-r1-back aria-label="${esc(T('Quay lại phần nghe','Retour à l’écoute'))}">‹</button><div><span class="eyebrow">FRENCH TRÂN’QUILLE • LISTENING</span><h1>🧠 ${esc(T('Nghe và nhớ nhiều thông tin','Écouter et retenir plusieurs informations'))}</h1></div><div class="listening-session-score"></div></header><main class="listening-main"><section class="listening-audio-card"><span class="listening-mode-pill">${esc(T('Hội thoại hoàn chỉnh','Dialogue complet'))}</span><h2>${r1Dialogue.icon||'🩺'} ${esc(T(r1Dialogue.titleVi,r1Dialogue.titleFr))}</h2><p>${esc(T('Nghe toàn bộ hội thoại. Transcript chỉ xuất hiện sau câu hỏi thứ ba.','Écoute tout le dialogue. Le transcript n’apparaît qu’après la troisième question.'))}</p><div class="listening-play-row"><button class="listening-play primary" data-listening-play ${speaking?'disabled':''}>${speaking?'◌':'▶'} ${esc(T('Tốc độ thường','Vitesse normale'))}</button><button class="listening-play secondary" data-listening-slow ${speaking?'disabled':''}>🐢 ${esc(T('Chậm','Lent'))}</button></div><small class="listening-play-count">${playCount?esc(T(`Đã nghe ${playCount} lần`,`Écouté ${playCount} fois`)):esc(T('Chưa phát âm thanh','Pas encore écouté'))}</small></section><section class="listening-question-card"><div class="listening-r1-progress"><span>${esc(T(`Câu ${r1Index+1} / ${r1Plan.questions.length}`,`Question ${r1Index+1} / ${r1Plan.questions.length}`))}</span><div class="listening-r1-dots">${r1Plan.questions.map((_,index)=>`<i class="${index<r1Index?'done':index===r1Index?'active':''}"></i>`).join('')}</div></div><p class="listening-question">${esc(T(question.questionVi,question.questionFr))}</p><div class="listening-options">${question.options.map((option,index)=>{const cls=r1Answered?(index===question.answer?'correct':index===r1SelectedIndex?'wrong':''):'';return `<button data-listening-answer="${index}" class="${cls}" ${r1Answered?'disabled':''}><span>${String.fromCharCode(65+index)}</span><strong>${esc(T(option.vi,option.fr))}</strong></button>`}).join('')}</div>${r1Answered?`<div class="listening-feedback ${result?.outcome==='success'?'ok':'miss'}"><strong>${result?.outcome==='success'?'✓ '+esc(T('Đúng rồi','Correct')):'↻ '+esc(T('Chưa đúng','Pas encore'))}</strong><p>${esc(finalAnswered?T('Ba thông tin đã được xử lý. Bây giờ bạn có thể xem transcript.','Les trois informations ont été traitées. Tu peux maintenant voir le transcript.'):T('Kết quả này được giữ nguyên. Tiếp tục với thông tin tiếp theo.','Ce résultat reste tel quel. Passe à l’information suivante.'))}</p></div>${r1TranscriptHtml()}${finalAnswered?`<div class="listening-r1-summary"><strong>${esc(T('3 thông tin đã xử lý','3 informations traitées'))}</strong><small>${esc(T(`${correctCount} câu trả lời đúng trên 3. Đây chỉ là tóm tắt của hoạt động này.`,`${correctCount} réponse(s) correcte(s) sur 3. C’est uniquement le résumé de cette activité.`))}</small></div>`:''}<button class="primary full listening-next" data-listening-next>${esc(finalAnswered?T('Quay lại phần nghe','Retour à l’écoute'):T('Thông tin tiếp theo','Information suivante'))} ›</button>`:''}</section></main><footer class="listening-footer"><span>${esc(T('Không có điểm A2 • không có chứng nhận','Pas de score A2 • pas de certification'))}</span><span>${r1Results.length}/${r1Plan.questions.length} ${esc(T('thông tin','informations'))}</span></footer></section>`;
    bindOverlay();
  }

  function renderOverlay(){
    if(!overlay)return;
    if(r1Active){renderR1Overlay();return}
    const a=availability();
    if(!currentExercise||!a[family]){
      family=a.meaning?'meaning':a.contrast?'contrast':a.dialogue?'dialogue':'meaning';
      currentExercise=createExercise(family);
    }
    overlay.dataset.listeningR1='0';
    overlay.dataset.listeningRevealed=answered?'1':'0';
    overlay.innerHTML=`<section class="listening-shell"><header class="listening-top"><button class="listening-close" data-listening-close aria-label="${esc(T('Đóng','Fermer'))}">‹</button><div><span class="eyebrow">FRENCH TRÂN’QUILLE • BUILD 20</span><h1>🎧 ${esc(T('Luyện nghe','Compréhension orale'))}</h1></div><div class="listening-session-score"><strong>${session.correct}/${session.attempts||0}</strong><small>${esc(T('phiên','session'))}</small></div></header><div class="listening-tabs">${['meaning','contrast','dialogue'].map(name=>`<button data-listening-family="${name}" class="${family===name?'active':''}" ${!a[name]?'disabled':''}><strong>${esc(familyLabel(name))}</strong><small>${name==='meaning'?a.known:name==='contrast'?a.contrasts:a.dialogues}</small></button>`).join('')}</div>${r1EntryHtml()}${currentExercise?`<main class="listening-main"><section class="listening-audio-card"><span class="listening-mode-pill">${esc(familyLabel(currentExercise.family))}</span>${currentExercise.family==='dialogue'?`<h2>${currentExercise.icon||'🎧'} ${esc(T(currentExercise.titleVi,currentExercise.titleFr))}</h2>`:`<h2>${esc(T('Nghe trước. Đừng đọc.','Écoute d’abord. Ne lis pas.'))}</h2>`}<p>${esc(T('Câu tiếng Pháp được giấu cho đến khi bạn trả lời.','La phrase française reste masquée jusqu’à ta réponse.'))}</p><div class="listening-play-row"><button class="listening-play primary" data-listening-play ${speaking?'disabled':''}>${speaking?'◌':'▶'} ${esc(T('Tốc độ thường','Vitesse normale'))}</button><button class="listening-play secondary" data-listening-slow ${speaking?'disabled':''}>🐢 ${esc(T('Chậm','Lent'))}</button></div><small class="listening-play-count">${playCount?esc(T(`Đã nghe ${playCount} lần`,`Écouté ${playCount} fois`)):esc(T('Chưa phát âm thanh','Pas encore écouté'))}</small></section><section class="listening-question-card"><p class="listening-question">${esc(T(currentExercise.questionVi,currentExercise.questionFr))}</p><div class="listening-options">${currentExercise.options.map((option,index)=>{const cls=answered?(index===currentExercise.correctIndex?'correct':index===selectedIndex?'wrong':''):'';return `<button data-listening-answer="${index}" class="${cls}" ${answered?'disabled':''}><span>${String.fromCharCode(65+index)}</span><strong>${esc(option.label)}</strong></button>`}).join('')}</div>${answered?`<div class="listening-feedback ${selectedIndex===currentExercise.correctIndex?'ok':'miss'}"><strong>${selectedIndex===currentExercise.correctIndex?'✓ '+esc(T('Đúng rồi','Correct')):'↻ '+esc(T('Chưa đúng','Pas encore'))}</strong><p>${esc(selectedIndex===currentExercise.correctIndex?T('Bạn đã hiểu phần âm thanh này.','Tu as compris cet extrait.'):T('Bây giờ xem transcript, nghe lại nếu muốn, rồi tiếp tục.','Regarde maintenant le transcript, réécoute si tu veux, puis continue.'))}</p></div>${transcriptHtml()}<button class="primary full listening-next" data-listening-next>${esc(T('Tiếp theo','Suivant'))} ›</button>`:''}</section></main>`:`<section class="listening-locked"><span>🎧</span><h2>${esc(T('Học thêm vài mục trước nhé.','Apprends encore quelques éléments.'))}</h2><p>${esc(T('Luyện nghe sẽ mở khi có đủ câu để tạo lựa chọn có ý nghĩa.','L’écoute se débloque dès qu’il y a assez d’acquis pour créer un vrai exercice.'))}</p></section>`}<footer class="listening-footer"><span>${esc(T('0 € • âm thanh từ trình duyệt','0 € • audio du navigateur'))}</span><span>${state.totals.attempts} ${esc(T('lượt thử','tentatives'))} • ${state.totals.correct} ✓</span></footer></section>`;
    bindOverlay();
  }

  function openListening(){
    startSession();
    if(!overlay){overlay=document.createElement('div');overlay.className='listening-overlay';overlay.id='listening-overlay';document.body.appendChild(overlay)}
    document.documentElement.classList.add('listening-open');
    const a=availability();
    if(!a[family])family=a.meaning?'meaning':a.contrast?'contrast':a.dialogue?'dialogue':'meaning';
    r1Active=false;r1Plan=null;r1Dialogue=null;r1Results=[];r1Index=0;r1Answered=false;r1SelectedIndex=null;
    answered=false;selectedIndex=null;playCount=0;currentExercise=createExercise(family);renderOverlay();
  }

  function closeListening(){
    cancelPlayback();
    r1Active=false;r1Plan=null;r1Dialogue=null;r1Results=[];r1Index=0;r1Answered=false;r1SelectedIndex=null;
    overlay?.remove();overlay=null;document.documentElement.classList.remove('listening-open');scheduleDecorate();
  }

  function bindOverlay(){
    overlay?.querySelector('[data-listening-close]')?.addEventListener('click',closeListening);
    overlay?.querySelector('[data-listening-r1-back]')?.addEventListener('click',exitR1);
    overlay?.querySelector('[data-listening-r1-open]')?.addEventListener('click',openR1);
    overlay?.querySelectorAll('[data-listening-family]').forEach(btn=>btn.addEventListener('click',()=>setFamily(btn.dataset.listeningFamily)));
    overlay?.querySelector('[data-listening-play]')?.addEventListener('click',()=>play({slow:false}));
    overlay?.querySelector('[data-listening-slow]')?.addEventListener('click',()=>play({slow:true}));
    overlay?.querySelectorAll('[data-listening-answer]').forEach(btn=>btn.addEventListener('click',()=>answer(btn.dataset.listeningAnswer)));
    overlay?.querySelector('[data-listening-next]')?.addEventListener('click',next);
  }

  function accuracy(){return state.totals.attempts?Math.round(state.totals.correct/state.totals.attempts*100):0}

  function injectHome(){
    const main=document.querySelector('.screen-home .home-main');
    if(!main)return;
    let card=main.querySelector('.listening-home-card');
    if(!card){card=document.createElement('section');card.className='card listening-home-card';const daily=main.querySelector('.daily-coach-card');if(daily)daily.insertAdjacentElement('afterend',card);else main.appendChild(card)}
    const a=availability();const sig=`${a.known}:${a.contrasts}:${a.dialogues}:${state.totals.attempts}:${state.totals.correct}`;if(card.dataset.signature===sig)return;card.dataset.signature=sig;
    card.innerHTML=`<div class="row between"><div><span class="pill">BUILD 20 • LISTENING</span><h2>🎧 ${esc(T('Luyện nghe chủ động','Écoute active'))}</h2></div><span class="listening-home-accuracy">${state.totals.attempts?accuracy()+'%':'—'}</span></div><p>${esc(T('Nghe mà không nhìn câu tiếng Pháp trước. Bắt đầu bằng nghĩa, sau đó phân biệt câu gần nhau và mini-hội thoại.','Écoute sans voir la phrase française à l’avance : sens, contrastes puis mini-dialogues.'))}</p><div class="listening-home-metrics"><span><strong>${a.known}</strong>${esc(T('câu có thể dùng','acquis utilisables'))}</span><span><strong>${a.contrasts}</strong>${esc(T('nhóm phân biệt','contrastes'))}</span><span><strong>${a.dialogues}</strong>${esc(T('hội thoại mở','dialogues ouverts'))}</span></div><button class="primary full" data-listening-open ${!a.meaning?'disabled':''}>🎧 ${esc(a.meaning?T('Bắt đầu nghe','Commencer l’écoute'):T('Mở sau vài mục đầu','Se débloque après quelques acquis'))}</button>`;
  }

  function injectDaily(){
    const steps=document.querySelector('.screen-home .daily-coach-card .daily-steps');if(!steps)return;
    const a=availability();let btn=steps.querySelector('.listening-daily-step');
    if(!a.meaning){btn?.remove();return}
    if(!btn){btn=document.createElement('button');btn.className='daily-step listening-daily-step';btn.dataset.listeningOpen='1';steps.appendChild(btn)}
    const sig=`${state.totals.attempts}:${accuracy()}`;if(btn.dataset.signature===sig)return;btn.dataset.signature=sig;
    btn.innerHTML=`<span class="daily-step-icon">🎧</span><span><strong>${esc(T('Nghe 3 phút','Écouter 3 minutes'))}</strong><small>${esc(T('Không nhìn transcript trước','Sans transcript avant réponse'))}</small></span><b>›</b>`;
  }

  function injectProgress(){
    const column=document.querySelector('.screen-progress .progress-layout > div:first-child');if(!column)return;
    let card=column.querySelector('.listening-progress-card');if(!card){card=document.createElement('section');card.className='card listening-progress-card';const stage3=column.querySelector('.mastery-stage3-card');if(stage3)stage3.insertAdjacentElement('afterend',card);else column.appendChild(card)}
    const a=availability();const sig=`${state.totals.attempts}:${state.totals.correct}:${state.totals.replays}:${state.totals.slowPlays}:${a.contrasts}:${a.dialogues}`;if(card.dataset.signature===sig)return;card.dataset.signature=sig;
    card.innerHTML=`<div class="section-head"><div><span class="pill">LISTENING</span><h2>🎧 ${esc(T('Hiểu bằng tai','Compréhension orale'))}</h2></div><span class="listening-progress-score">${state.totals.attempts?accuracy()+'%':'—'}</span></div><p>${esc(T('Điểm này chỉ đo câu hỏi nghe trong ứng dụng, không phải điểm CEFR và không phải phát âm.','Cet indicateur mesure uniquement les exercices d’écoute de l’app : ce n’est ni un score CECRL ni un score de prononciation.'))}</p><div class="listening-progress-metrics"><div><strong>${state.totals.attempts}</strong><span>${esc(T('lượt thử','tentatives'))}</span></div><div><strong>${state.totals.correct}</strong><span>${esc(T('đúng','correctes'))}</span></div><div><strong>${state.totals.replays}</strong><span>${esc(T('nghe lại','réécoutes'))}</span></div><div><strong>${state.totals.slowPlays}</strong><span>${esc(T('nghe chậm','écoutes lentes'))}</span></div></div><div class="listening-family-progress">${['meaning','contrast','dialogue'].map(name=>{const f=state.families[name];const pct=f.attempts?Math.round(f.correct/f.attempts*100):0;return `<div><span>${esc(familyLabel(name))}</span><strong>${f.attempts?pct+'%':'—'}</strong><i><b style="width:${pct}%"></b></i></div>`}).join('')}</div><button class="secondary full" data-listening-open ${!a.meaning?'disabled':''}>🎧 ${esc(T('Luyện nghe','Ouvrir l’écoute'))}</button>`;
  }

  function injectSettings(){
    const diagnostics=document.querySelector('.screen-settings .diagnostics');if(!diagnostics)return;
    let row=diagnostics.querySelector('[data-listening-diagnostic]');if(!row){row=document.createElement('div');row.dataset.listeningDiagnostic='1';diagnostics.appendChild(row)}
    const sig=`${state.totals.attempts}:${accuracy()}`;if(row.dataset.signature===sig)return;row.dataset.signature=sig;row.innerHTML=`<span>Listening</span><strong>${state.totals.attempts} ${esc(T('lượt','essai(s)'))} • ${state.totals.attempts?accuracy()+'%':'—'}</strong>`;
  }

  function decorate(){injectHome();injectDaily();injectProgress();injectSettings()}
  function scheduleDecorate(){if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;decorate()})}

  document.addEventListener('click',event=>{const open=event.target.closest('[data-listening-open]');if(open&&!open.disabled){event.preventDefault();openListening()}});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&overlay){if(r1Active)exitR1();else closeListening()}});
  const app=document.getElementById('app');if(app)new MutationObserver(scheduleDecorate).observe(app,{childList:true,subtree:true});
  decorate();

  if(new URLSearchParams(location.search).get('listeningSmoke')==='1'){
    setTimeout(()=>{
      const l=learner();
      const seed=['bonjour','merci','au-revoir','je-mappelle','je-voudrais','cafe','svp','il-fait-chaud','jai-chaud','il-fait-froid','jai-froid','je-vais-rentrer-futur','je-viens-rentrer','et-demie','ca-va','ca-va-bien','et-toi','je-suis-tres-fatiguee'];
      l.knownItems=[...new Set([...(l.knownItems||[]),...seed])];localStorage.setItem(LEARNER_KEY,JSON.stringify(l));
      family='meaning';openListening();
      document.documentElement.dataset.listeningSmokeHidden=overlay?.querySelector('.listening-transcript')?'0':'1';
      const wrong=(currentExercise.correctIndex+1)%currentExercise.options.length;answer(wrong);
      const saved=JSON.parse(localStorage.getItem(KEY)||'{}');
      const errors=window.FrenchTranquilleErrors?.summary?.().recent||[];
      document.documentElement.dataset.listeningSmokeRevealed=overlay?.querySelector('.listening-transcript')?'1':'0';
      document.documentElement.dataset.listeningSmokeAttempts=String(saved.totals?.attempts||0);
      document.documentElement.dataset.listeningSmokeErrorSource=String(errors.at(-1)?.source||'');
      document.documentElement.dataset.listeningSmokeErrorType=String(errors.at(-1)?.type||'');
    },220);
  }

  if(new URLSearchParams(location.search).get('a2R1Smoke')==='1'){
    const runSmoke=(attempt=0)=>{
      const l=learner();
      const seed=['jai-mal-ventre','depuis-hier','rendez-vous-medecin'];
      l.knownItems=[...new Set([...(l.knownItems||[]),...seed])];localStorage.setItem(LEARNER_KEY,JSON.stringify(l));
      if(!r1Availability()&&attempt<20){setTimeout(()=>runSmoke(attempt+1),100);return}
      family='meaning';openListening();
      const baseline=localStorage.getItem(KEY)||'';
      const entryVisible=Boolean(overlay?.querySelector('[data-listening-r1-open]'));
      openR1();
      const openStable=(localStorage.getItem(KEY)||'')===baseline;
      const active=overlay?.dataset.listeningR1==='1';
      exitR1();
      const closeStable=(localStorage.getItem(KEY)||'')===baseline;
      openR1();
      const q1=r1Plan?.questions?.[0];
      if(!q1)return;
      const wrong=(q1.answer+1)%q1.options.length;
      answer(wrong);
      const hiddenAfterQ1=!overlay?.querySelector('.listening-transcript');
      next();
      const q2=r1Plan?.questions?.[1];answer(q2?.answer??0);
      const hiddenAfterQ2=!overlay?.querySelector('.listening-transcript');
      next();
      const q3=r1Plan?.questions?.[2];answer(q3?.answer??0);
      const revealedAfterQ3=Boolean(overlay?.querySelector('.listening-transcript'));
      const listeningStateStable=(localStorage.getItem(KEY)||'')===baseline;
      const errors=window.FrenchTranquilleErrors?.summary?.().recent||[];
      const recentR1=errors.filter(entry=>entry.source==='listening-r1').slice(-3);
      document.documentElement.dataset.a2R1SmokeEntry=entryVisible?'1':'0';
      document.documentElement.dataset.a2R1SmokeActive=active?'1':'0';
      document.documentElement.dataset.a2R1SmokeOpenStable=openStable?'1':'0';
      document.documentElement.dataset.a2R1SmokeCloseStable=closeStable?'1':'0';
      document.documentElement.dataset.a2R1SmokeHiddenQ1=hiddenAfterQ1?'1':'0';
      document.documentElement.dataset.a2R1SmokeHiddenQ2=hiddenAfterQ2?'1':'0';
      document.documentElement.dataset.a2R1SmokeRevealedQ3=revealedAfterQ3?'1':'0';
      document.documentElement.dataset.a2R1SmokeResults=String(r1Results.length);
      document.documentElement.dataset.a2R1SmokeListeningStateStable=listeningStateStable?'1':'0';
      document.documentElement.dataset.a2R1SmokeErrorFacts=recentR1.map(entry=>entry.itemId).join(',');
      document.documentElement.dataset.a2R1SmokeErrorSource=recentR1.every(entry=>entry.source==='listening-r1')&&recentR1.length===3?'1':'0';
      exitR1();
      document.documentElement.dataset.a2R1SmokeReturned=overlay?.dataset.listeningR1==='0'?'1':'0';
    };
    setTimeout(()=>runSmoke(),250);
  }

  window.FrenchTranquilleListening={version:'1.14.0',build:20,key:KEY,state:()=>state,availability,r1Availability,open:openListening,close:closeListening};
})();