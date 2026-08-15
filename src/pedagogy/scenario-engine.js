const SCENARIO_DATA = window.FrenchTranquilleScenarioData;
const SCENARIO_CURRICULUM = window.FrenchTranquilleCurriculum;

if (SCENARIO_DATA && SCENARIO_CURRICULUM) {
  const KEY = 'french-tranquille:scenarios:v1';
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const LEARNER_KEY = SCENARIO_CURRICULUM.key;
  const scenarios = SCENARIO_DATA.scenarios;
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function initialState() {
    return { schemaVersion:1, scenarios:{}, totalCompletions:0, updatedAt:null };
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY) || 'null');
      return parsed?.schemaVersion === 1 ? { ...initialState(), ...parsed, scenarios:parsed.scenarios || {} } : initialState();
    } catch { return initialState(); }
  }

  let state = loadState();
  let activeId = null;
  let turnIndex = 0;
  let turnFails = 0;
  let sessionErrors = 0;
  let sessionAssisted = 0;
  let feedback = '';
  let feedbackKind = '';
  let waitingNext = false;
  let completedSummary = null;
  let recognition = null;

  function persist() {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function learner() {
    try { return JSON.parse(localStorage.getItem(LEARNER_KEY) || '{}') || {}; }
    catch { return {}; }
  }

  function normalize(value = '') {
    return String(value)
      .toLocaleLowerCase('fr-FR')
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/[’']/g,' ')
      .replace(/[^a-z0-9\s-]/g,' ')
      .replace(/\s+/g,' ')
      .trim();
  }

  function accepted(turn, value) {
    const got = normalize(value);
    if (!got) return false;
    return turn.answers.some(answer => {
      const expected = normalize(answer);
      return got === expected || (expected.length >= 8 && got.includes(expected));
    });
  }

  function unlocked(scenario) {
    const completed = new Set(learner().completedLessons || []);
    return scenario.requiredLessons.every(id => completed.has(id));
  }

  function statsFor(id) {
    return state.scenarios[id] || { plays:0, completions:0, bestErrors:null, lastPlayed:null, lastCompleted:null };
  }

  function completionCount() {
    return scenarios.filter(s => statsFor(s.id).completions > 0).length;
  }

  function unlockedCount() {
    return scenarios.filter(unlocked).length;
  }

  function activeScenario() {
    return scenarios.find(s => s.id === activeId) || null;
  }

  function currentTurn() {
    const scenario = activeScenario();
    return scenario?.turns?.[turnIndex] || null;
  }

  function recordTurn(turn, ok, source) {
    if (!turn?.items?.length) return;
    turn.items.forEach(id => window.FrenchTranquilleMemory?.recordPractice?.(id, ok, source));
  }

  function startScenario(id) {
    const scenario = scenarios.find(s => s.id === id);
    if (!scenario || !unlocked(scenario)) return;
    const old = statsFor(id);
    state.scenarios[id] = { ...old, plays:Number(old.plays || 0) + 1, lastPlayed:new Date().toISOString() };
    persist();
    activeId = id;
    turnIndex = 0;
    turnFails = 0;
    sessionErrors = 0;
    sessionAssisted = 0;
    feedback = '';
    feedbackKind = '';
    waitingNext = false;
    completedSummary = null;
    decorate();
  }

  function closeScenario() {
    activeId = null;
    turnIndex = 0;
    turnFails = 0;
    feedback = '';
    feedbackKind = '';
    waitingNext = false;
    completedSummary = null;
    recognition?.abort?.();
    decorate();
  }

  function finishScenario() {
    const scenario = activeScenario();
    if (!scenario) return;
    const old = statsFor(scenario.id);
    const errors = sessionErrors + sessionAssisted;
    const best = old.bestErrors == null ? errors : Math.min(Number(old.bestErrors), errors);
    state.scenarios[scenario.id] = {
      ...old,
      completions:Number(old.completions || 0) + 1,
      bestErrors:best,
      lastCompleted:new Date().toISOString()
    };
    state.totalCompletions = Number(state.totalCompletions || 0) + 1;
    persist();
    completedSummary = { scenario, errors:sessionErrors, assisted:sessionAssisted, bestErrors:best };
    activeId = null;
    waitingNext = false;
    feedback = '';
    feedbackKind = '';
    decorate();
  }

  function advanceTurn() {
    const scenario = activeScenario();
    if (!scenario) return;
    if (turnIndex >= scenario.turns.length - 1) {
      finishScenario();
      return;
    }
    turnIndex += 1;
    turnFails = 0;
    feedback = '';
    feedbackKind = '';
    waitingNext = false;
    decorate();
  }

  function checkAnswer() {
    const turn = currentTurn();
    if (!turn || waitingNext) return;
    const input = document.querySelector('[data-scenario-input]');
    const value = input?.value || '';
    if (accepted(turn, value)) {
      recordTurn(turn, true, 'scenario-success');
      feedback = T('✓ Đúng. Bạn giữ được cuộc hội thoại.','✓ Correct. Tu gardes la conversation en mouvement.');
      feedbackKind = 'success';
      waitingNext = true;
      decorate();
      return;
    }

    turnFails += 1;
    sessionErrors += 1;
    recordTurn(turn, false, 'scenario-miss');
    if (turnFails === 1) {
      feedback = T(`Chưa đúng. Gợi ý: ${turn.hintVi}`,`Pas encore. Indice : ${turn.hintFr}`);
      feedbackKind = 'hint';
    } else {
      feedback = T('Vẫn chưa. Lucie cho bạn xem một mẫu để không bị mắc kẹt.','Toujours pas. Lucie te montre un modèle pour ne pas rester bloquée.');
      feedbackKind = 'model';
    }
    decorate();
  }

  function useModel() {
    const turn = currentTurn();
    if (!turn) return;
    sessionAssisted += 1;
    recordTurn(turn, false, 'scenario-assisted');
    waitingNext = true;
    feedback = T('Mẫu đã được dùng. Câu này sẽ có lý do để quay lại trong bộ nhớ.','Modèle utilisé. Cette phrase aura une bonne raison de revenir dans la mémoire.');
    feedbackKind = 'assisted';
    decorate();
  }

  function speak(text) {
    if (!('speechSynthesis' in window) || !text) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.86;
    utterance.pitch = 1.02;
    speechSynthesis.speak(utterance);
  }

  function startRecognition() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition || !currentTurn()) return;
    try { recognition?.abort?.(); } catch {}
    recognition = new Recognition();
    recognition.lang = 'fr-FR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;
    const button = document.querySelector('[data-scenario-mic]');
    if (button) button.dataset.listening = '1';
    recognition.onresult = event => {
      const text = event.results?.[0]?.[0]?.transcript || '';
      const input = document.querySelector('[data-scenario-input]');
      if (input) input.value = text;
    };
    recognition.onerror = () => {
      feedback = T('Micro indisponible ou reconnaissance refusée. Vous pouvez toujours écrire.','Micro indisponible ou reconnaissance refusée. Tu peux toujours écrire.');
      feedbackKind = 'hint';
      decorate();
    };
    recognition.onend = () => {
      const b = document.querySelector('[data-scenario-mic]');
      if (b) delete b.dataset.listening;
    };
    try { recognition.start(); } catch {}
  }

  function requirementText(scenario) {
    const nums = scenario.requiredLessons.map(id => SCENARIO_CURRICULUM.lessons.find(l => l.id === id)?.number).filter(Boolean);
    return T(`Mở sau Bài ${nums.join(' + ')}`,`Débloqué après la/les leçon(s) ${nums.join(' + ')}`);
  }

  function scenarioListHtml() {
    return `<div class="scenario-grid">${scenarios.map(scenario => {
      const open = unlocked(scenario);
      const st = statsFor(scenario.id);
      const done = st.completions > 0;
      return `<button class="scenario-tile ${open?'unlocked':'locked'} ${done?'done':''}" ${open?`data-scenario-start="${scenario.id}"`:'disabled'}><span class="scenario-icon">${scenario.icon}</span><span class="scenario-copy"><strong>${esc(T(scenario.titleVi,scenario.titleFr))}</strong><small>${esc(T(scenario.descVi,scenario.descFr))}</small><em>${done ? esc(T(`${st.completions} lần hoàn thành`,`${st.completions} réussite(s)`)) : open ? esc(T('Sẵn sàng','Disponible')) : esc(requirementText(scenario))}</em></span><b>${done?'✓':open?'›':'🔒'}</b></button>`;
    }).join('')}</div>`;
  }

  function activeHtml(scenario, turn) {
    const progress = Math.round(((turnIndex + (waitingNext ? 1 : 0)) / scenario.turns.length) * 100);
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    return `<div class="scenario-runner"><div class="scenario-runner-head"><button class="scenario-close" data-scenario-close aria-label="${esc(T('Thoát','Quitter'))}">‹</button><div><span class="pill">SCENARIO LAB</span><h2>${scenario.icon} ${esc(T(scenario.titleVi,scenario.titleFr))}</h2></div><span class="scenario-turn">${turnIndex+1}/${scenario.turns.length}</span></div><div class="scenario-progress"><i style="width:${progress}%"></i></div><div class="scenario-npc"><div class="scenario-avatar">${scenario.icon}</div><div><span>${esc(T('Người đối thoại','Interlocuteur'))}</span><strong>${esc(turn.npcFr)}</strong><small>${esc(turn.npcVi)}</small><button class="scenario-listen" data-scenario-listen>🔊 ${esc(T('Nghe','Écouter'))}</button></div></div><div class="scenario-task"><span>🎯 ${esc(T('Lượt của bạn','À toi'))}</span><p>${esc(T(turn.promptVi,turn.promptFr))}</p></div><div class="scenario-input-row"><input data-scenario-input autocomplete="off" autocapitalize="sentences" placeholder="${esc(T('Trả lời bằng tiếng Pháp…','Réponds en français…'))}" ${waitingNext?'disabled':''}>${Recognition && !waitingNext ? `<button class="scenario-mic" data-scenario-mic aria-label="Micro">🎙️</button>` : ''}</div>${feedback ? `<div class="scenario-feedback ${feedbackKind}">${esc(feedback)}</div>` : ''}${turnFails >= 2 && !waitingNext ? `<div class="scenario-model"><span>${esc(T('Mẫu','Modèle'))}</span><strong>${esc(turn.model)}</strong><button class="secondary" data-scenario-use-model>${esc(T('Dùng mẫu và tiếp tục','Utiliser le modèle et continuer'))}</button></div>` : ''}<div class="scenario-actions">${waitingNext ? `<button class="primary full" data-scenario-next>${esc(turnIndex === scenario.turns.length - 1 ? T('Kết thúc tình huống','Terminer la situation') : T('Tiếp tục hội thoại','Continuer le dialogue'))} ›</button>` : `<button class="primary full" data-scenario-check>${esc(T('Trả lời','Répondre'))}</button>`}</div><p class="scenario-footnote">${esc(T('Lucie đánh giá câu được nhận dạng / viết, không tuyên bố chấm phát âm.',"Lucie évalue la phrase reconnue/écrite ; elle ne prétend pas noter la prononciation."))}</p></div>`;
  }

  function doneHtml(summary) {
    const s = summary.scenario;
    return `<div class="scenario-done"><span class="scenario-done-icon">${s.icon}</span><span class="pill">✓ SCENARIO</span><h2>${esc(T('Tình huống hoàn thành','Situation terminée'))}</h2><p>${esc(T(`Bạn đã đi hết “${s.titleVi}”. Lucie đã gửi các điểm khó vào bộ nhớ học tập.`,`Tu as terminé « ${s.titleFr} ». Lucie a renvoyé les difficultés vers la mémoire d’apprentissage.`))}</p><div class="scenario-summary"><div><strong>${s.turns.length}</strong><span>${esc(T('lượt','tours'))}</span></div><div><strong>${summary.errors}</strong><span>${esc(T('lỗi','erreurs'))}</span></div><div><strong>${summary.assisted}</strong><span>${esc(T('mẫu dùng','aides'))}</span></div><div><strong>${summary.bestErrors}</strong><span>${esc(T('tốt nhất','meilleur'))}</span></div></div><div class="scenario-done-actions"><button class="secondary" data-scenario-list>${esc(T('Các tình huống','Situations'))}</button><button class="primary" data-scenario-replay="${s.id}">${esc(T('Chơi lại','Rejouer'))}</button></div></div>`;
  }

  function injectConversation() {
    const root = document.querySelector('.screen-conversation .narrow');
    if (!root) return;
    let card = root.querySelector('.scenario-lab-card');
    if (!card) {
      card = document.createElement('section');
      card.className = 'card scenario-lab-card';
      root.prepend(card);
    }
    const scenario = activeScenario();
    const turn = currentTurn();
    const sig = completedSummary ? `done:${completedSummary.scenario.id}:${completedSummary.errors}:${completedSummary.assisted}` : scenario && turn ? `run:${scenario.id}:${turnIndex}:${turnFails}:${waitingNext}:${feedbackKind}:${feedback}` : `list:${unlockedCount()}:${completionCount()}:${state.totalCompletions}`;
    if (card.dataset.signature === sig) return;
    card.dataset.signature = sig;
    if (completedSummary) {
      card.innerHTML = doneHtml(completedSummary);
    } else if (scenario && turn) {
      card.innerHTML = activeHtml(scenario, turn);
    } else {
      card.innerHTML = `<div class="scenario-head"><div><span class="pill">BUILD 17</span><h2>🎭 ${esc(T('Phòng tình huống','Scenario Lab'))}</h2></div><span class="scenario-count">${completionCount()}/${scenarios.length}</span></div><p>${esc(T('Không phải câu hỏi rời rạc nữa: chọn một tình huống và giữ cuộc hội thoại trong nhiều lượt. Tất cả chạy cục bộ, không có IA payante.','Plus de phrases isolées : choisis une situation et tiens le dialogue sur plusieurs tours. Tout fonctionne localement, sans IA payante.'))}</p><div class="scenario-stats"><span>🔓 ${unlockedCount()} ${esc(T('mở','disponibles'))}</span><span>✓ ${completionCount()} ${esc(T('đã xong','terminées'))}</span><span>↻ ${state.totalCompletions || 0} ${esc(T('lượt hoàn thành','sessions'))}</span></div>${scenarioListHtml()}`;
    }
  }

  function injectProgress() {
    const column = document.querySelector('.screen-progress .progress-layout > div:first-child');
    if (!column) return;
    const signature = scenarios.map(s => `${s.id}:${unlocked(s)?1:0}:${statsFor(s.id).completions}:${statsFor(s.id).bestErrors ?? '-'}`).join('|');
    let card = column.querySelector('.scenario-progress-card');
    if (!card) {
      card = document.createElement('section');
      card.className = 'card scenario-progress-card';
      const mastery = column.querySelector('.mastery-progress-card');
      if (mastery) mastery.insertAdjacentElement('afterend', card); else column.appendChild(card);
    }
    if (card.dataset.signature === signature) return;
    card.dataset.signature = signature;
    card.innerHTML = `<div class="section-head"><div><span class="pill">SCENARIOS</span><h2>🎭 ${esc(T('Tình huống thực tế','Situations réelles'))}</h2></div><span class="muted">${completionCount()}/${scenarios.length}</span></div><p>${esc(T('Mỗi tình huống yêu cầu giữ một cuộc hội thoại qua nhiều lượt. Một ✓ nghĩa là bạn đã hoàn thành ít nhất một lần, không có nghĩa là kỹ năng đã hoàn toàn vững.','Chaque situation demande de tenir plusieurs tours. Un ✓ signifie au moins une session terminée, pas une maîtrise définitive.'))}</p><div class="scenario-progress-list">${scenarios.map(s => {const st=statsFor(s.id),open=unlocked(s);return `<div class="scenario-progress-row ${open?'':'locked'}"><span>${s.icon}</span><div><strong>${esc(T(s.titleVi,s.titleFr))}</strong><small>${st.completions ? esc(T(`${st.completions} hoàn thành • tốt nhất ${st.bestErrors} lỗi`,`${st.completions} réussite(s) • meilleur ${st.bestErrors} erreur(s)`)) : open ? esc(T('Sẵn sàng để thử','Disponible')) : esc(requirementText(s))}</small></div><b>${st.completions?'✓':open?'○':'🔒'}</b></div>`}).join('')}</div>`;
  }

  function injectSettings() {
    const rows = document.querySelector('.screen-settings .diagnostics');
    if (!rows || rows.querySelector('[data-scenario-diagnostic]')) return;
    const row = document.createElement('div');
    row.dataset.scenarioDiagnostic = '1';
    row.innerHTML = `<span>${esc(T('Tình huống','Scénarios'))}</span><strong>${completionCount()}/${scenarios.length} • ${state.totalCompletions || 0} sessions</strong>`;
    rows.appendChild(row);
  }

  function decorate() {
    injectConversation();
    injectProgress();
    injectSettings();
  }

  document.addEventListener('click', event => {
    const start = event.target.closest('[data-scenario-start]');
    if (start) { event.preventDefault(); startScenario(start.dataset.scenarioStart); return; }
    if (event.target.closest('[data-scenario-close]')) { event.preventDefault(); closeScenario(); return; }
    if (event.target.closest('[data-scenario-check]')) { event.preventDefault(); checkAnswer(); return; }
    if (event.target.closest('[data-scenario-next]')) { event.preventDefault(); advanceTurn(); return; }
    if (event.target.closest('[data-scenario-use-model]')) { event.preventDefault(); useModel(); return; }
    if (event.target.closest('[data-scenario-listen]')) { event.preventDefault(); speak(currentTurn()?.npcFr); return; }
    if (event.target.closest('[data-scenario-mic]')) { event.preventDefault(); startRecognition(); return; }
    if (event.target.closest('[data-scenario-list]')) { event.preventDefault(); completedSummary = null; decorate(); return; }
    const replay = event.target.closest('[data-scenario-replay]');
    if (replay) { event.preventDefault(); completedSummary = null; startScenario(replay.dataset.scenarioReplay); return; }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Enter' && document.activeElement?.matches?.('[data-scenario-input]') && !waitingNext) {
      event.preventDefault();
      checkAnswer();
    }
  });

  const observer = new MutationObserver(() => queueMicrotask(decorate));
  const app = document.getElementById('app');
  if (app) observer.observe(app, { childList:true, subtree:true });
  decorate();

  if (new URLSearchParams(location.search).get('scenarioSmoke') === '1') {
    setTimeout(() => document.querySelector('.bottom-nav [data-go="conversation"]')?.click(), 80);
  }

  window.FrenchTranquilleScenarios = {
    key:KEY,
    version:'1.10.0',
    build:17,
    scenarios,
    unlocked,
    statsFor,
    completionCount,
    start:startScenario
  };
}
