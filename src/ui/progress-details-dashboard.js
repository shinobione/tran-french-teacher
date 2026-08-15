(() => {
  'use strict';

  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const esc = (value='') => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const params = new URLSearchParams(location.search);
  const smokeGroup = params.get('detailsDashboardSmoke');

  const GROUPS = [
    {key:'memory',icon:'🧠',vi:'Trí nhớ & ôn lại',fr:'Mémoire & révisions',hintVi:'Điều cần ôn và những điểm hay vấp.',hintFr:'Ce qui est à revoir et les difficultés observées.'},
    {key:'mastery',icon:'🎯',vi:'Mức độ làm chủ',fr:'Maîtrise',hintVi:'Những gì đã thật sự vững, không chỉ đã xem.',hintFr:'Ce qui est réellement consolidé, pas seulement parcouru.'},
    {key:'listening',icon:'🎧',vi:'Nghe hiểu',fr:'Compréhension orale',hintVi:'Tiến bộ trong các bài nghe.',hintFr:'Progression dans les exercices d’écoute.'},
    {key:'real-life',icon:'🎭',vi:'Tiếng Pháp thực tế',fr:'Français réel',hintVi:'Tình huống và cách dùng trong đời sống.',hintFr:'Situations et réutilisation dans la vraie vie.'},
    {key:'path',icon:'🧩',vi:'A1 & nhịp học',fr:'A1 & rythme',hintVi:'Khối A1, nhịp và mức hỗ trợ phù hợp.',hintFr:'Bloc A1, rythme et niveau de soutien.'},
    {key:'other',icon:'⋯',vi:'Khác',fr:'Autres détails',hintVi:'Các chỉ báo bổ sung.',hintFr:'Indicateurs complémentaires.'}
  ];
  const META = Object.fromEntries(GROUPS.map(group => [group.key,group]));
  const VALID_KEYS = new Set(GROUPS.map(group => group.key));

  let activeKey = smokeGroup && META[smokeGroup] ? smokeGroup : null;
  let scheduled = false;

  function classify(card) {
    const owned = card.dataset.progressDetailFamily;
    if (VALID_KEYS.has(owned)) return owned;

    // Prefer stable structural classes. Text is only a compatibility fallback.
    if (card.matches('.memory-progress-card,.error-intelligence-card') || card.querySelector('.learned-list')) return 'memory';
    if (card.matches('.mastery-progress-card,.stage3-mastery-card,.mastery-stage3-card')) return 'mastery';
    if (card.matches('.listening-progress-card,.listening-card')) return 'listening';
    if (card.matches('.scenario-progress-card,.real-life-progress-card')) return 'real-life';
    if (card.matches('.stage2-progress-card,.stage3-progress-card,.language-ratio-card,.daily-coach-card')) return 'path';

    const value = `${card.className || ''} ${card.querySelector('h2')?.textContent || ''}`.toLocaleLowerCase();
    if (/memory|error|erreur|mémoire|memoire|éléments appris|elements appris|điều đã học/.test(value)) return 'memory';
    if (/mastery|maîtr|maitr/.test(value)) return 'mastery';
    if (/listening|écoute|ecoute|oral/.test(value)) return 'listening';
    if (/scenario|real-life|situation|français réel|francais reel/.test(value)) return 'real-life';
    if (/stage2|stage3|a1|language|ratio|daily|coach|rythme|adaptive|adapt/.test(value)) return 'path';
    return 'other';
  }

  function isForbidden(card) {
    return card.matches('.progress-ux-overview,.progress-ux-curriculum,.curriculum-card');
  }

  function ensureDashboard(body) {
    let dashboard = body.querySelector(':scope > .progress-detail-dashboard');
    if (dashboard) return dashboard;
    dashboard = document.createElement('section');
    dashboard.className = 'progress-detail-dashboard';
    dashboard.dataset.progressDetailDashboard = '1';
    dashboard.innerHTML = `<div class="progress-detail-grid" role="list"></div><div class="progress-detail-panels"></div>`;
    body.prepend(dashboard);
    return dashboard;
  }

  function ensurePanel(dashboard,key) {
    const panels = dashboard.querySelector('.progress-detail-panels');
    let panel = panels.querySelector(`[data-progress-detail-panel="${key}"]`);
    if (panel) return panel;
    const meta = META[key];
    panel = document.createElement('section');
    panel.className = 'progress-detail-panel';
    panel.dataset.progressDetailPanel = key;
    panel.hidden = true;
    panel.innerHTML = `<header class="progress-detail-panel-head"><span>${meta.icon}</span><div><strong>${esc(T(meta.vi,meta.fr))}</strong><small>${esc(T(meta.hintVi,meta.hintFr))}</small></div><button type="button" data-progress-detail-close aria-label="${esc(T('Đóng','Fermer'))}">×</button></header><div class="progress-detail-panel-cards"></div>`;
    panels.appendChild(panel);
    return panel;
  }

  function moveCards(body,dashboard) {
    const flow = body.closest('.progress-ux-composition')?.querySelector(':scope > .progress-ux-left-flow');
    const directCards = [...body.children].filter(child => child.classList?.contains('card'));

    directCards.forEach(card => {
      // Defensive recovery: summary/curriculum cards can never belong to Details.
      if (isForbidden(card)) {
        if (flow) flow.appendChild(card);
        return;
      }
      const key = classify(card);
      card.dataset.progressDetailFamily = key;
      ensurePanel(dashboard,key).querySelector('.progress-detail-panel-cards').appendChild(card);
    });

    // Once a card has an owner, DOM/text mutations must not reclassify it.
    dashboard.querySelectorAll('.progress-detail-panel-cards > .card').forEach(card => {
      if (isForbidden(card)) {
        if (flow) flow.appendChild(card);
        return;
      }
      const current = card.closest('[data-progress-detail-panel]')?.dataset.progressDetailPanel;
      const key = VALID_KEYS.has(card.dataset.progressDetailFamily) ? card.dataset.progressDetailFamily : classify(card);
      card.dataset.progressDetailFamily = key;
      if (current !== key) ensurePanel(dashboard,key).querySelector('.progress-detail-panel-cards').appendChild(card);
    });
  }

  function cardCount(dashboard,key) {
    return dashboard.querySelectorAll(`[data-progress-detail-panel="${key}"] .progress-detail-panel-cards > .card`).length;
  }

  function metric(key,count) {
    try {
      if (key === 'memory') {
        const memory = window.FrenchTranquilleMemory?.summary?.();
        const due = memory?.due?.length || 0;
        const fragile = memory?.fragile?.length || 0;
        if (due) return T(`${due} cần ôn`,`${due} à revoir`);
        if (fragile) return T(`${fragile} còn yếu`,`${fragile} fragile${fragile>1?'s':''}`);
        const solid = memory?.solid?.length || 0;
        return solid ? T(`${solid} đã vững`,`${solid} solide${solid>1?'s':''}`) : T('Theo dõi','Suivi');
      }
      if (key === 'mastery') {
        const estimate = window.FrenchTranquilleMastery?.levelEstimate?.();
        const stage3 = window.FrenchTranquilleMasteryStage3?.metrics?.();
        if (stage3 && Number.isFinite(Number(stage3.score)) && Number(stage3.knownCount||0)>0) return `${estimate?.code || 'A0'} • ${stage3.score}% A1`;
        return estimate?.code || 'A0';
      }
      if (key === 'listening') {
        const state = window.FrenchTranquilleListening?.state?.();
        const attempts = Number(state?.totals?.attempts || 0);
        const correct = Number(state?.totals?.correct || 0);
        return attempts ? `${Math.round(correct/attempts*100)}% • ${attempts}` : T('Chưa bắt đầu','À commencer');
      }
      if (key === 'real-life') return T('Tình huống','Situations');
      if (key === 'path') {
        const stage3 = window.FrenchTranquilleMasteryStage3?.metrics?.();
        if (stage3 && Number(stage3.knownCount||0)>0) return `${stage3.score}% A1`;
        return T('Lộ trình','Parcours');
      }
    } catch {}
    return `${count} ${T('thẻ','carte'+(count>1?'s':''))}`;
  }

  function stateOf(dashboard) {
    const counts = Object.fromEntries(GROUPS.map(group => [group.key, cardCount(dashboard,group.key)]));
    return { counts, total: Object.values(counts).reduce((sum,value) => sum + value,0), active: activeKey };
  }

  function renderDashboard(details,dashboard) {
    const available = GROUPS.filter(group => cardCount(dashboard,group.key) > 0);
    if (activeKey && !available.some(group => group.key === activeKey)) activeKey = null;
    const state = stateOf(dashboard);
    const signature = available.map(group => `${group.key}:${state.counts[group.key]}:${metric(group.key,state.counts[group.key])}`).join('|') + `#${activeKey || ''}#${isDebug()?1:0}`;
    if (dashboard.dataset.signature === signature) return;
    dashboard.dataset.signature = signature;

    const grid = dashboard.querySelector('.progress-detail-grid');
    grid.innerHTML = available.map(group => {
      const count = state.counts[group.key];
      const active = activeKey === group.key;
      return `<button type="button" role="listitem" class="progress-detail-tile ${active?'active':''}" data-progress-detail-open="${group.key}" aria-expanded="${active?'true':'false'}"><span class="progress-detail-icon">${group.icon}</span><span class="progress-detail-tile-copy"><strong>${esc(T(group.vi,group.fr))}</strong><small>${esc(T(group.hintVi,group.hintFr))}</small></span><b>${esc(metric(group.key,count))}</b><i aria-hidden="true">${active?'⌃':'⌄'}</i></button>`;
    }).join('');

    GROUPS.forEach(group => {
      const panel = dashboard.querySelector(`[data-progress-detail-panel="${group.key}"]`);
      if (!panel) return;
      const shouldShow = activeKey === group.key && cardCount(dashboard,group.key) > 0;
      panel.hidden = !shouldShow;
    });

    details.dataset.progressDetailDashboard = '1';
    details.dataset.progressDetailGroups = String(available.length);
    details.dataset.progressDetailActive = activeKey || '';
    details.dataset.progressDetailTotalCards = String(state.total);
    details.dataset.progressDetailOtherCards = String(state.counts.other || 0);
    document.documentElement.dataset.detailsDashboardGroups = String(available.length);
    document.documentElement.dataset.detailsDashboardActive = activeKey || '';
    document.documentElement.dataset.detailsDashboardTotalCards = String(state.total);
    document.documentElement.dataset.detailsDashboardOtherCards = String(state.counts.other || 0);
  }

  function decorate() {
    const details = document.querySelector('.screen-progress .progress-ux-details');
    const body = details?.querySelector('.progress-ux-details-body');
    if (!details || !body) return;
    if (smokeGroup) details.open = true;
    const dashboard = ensureDashboard(body);
    moveCards(body,dashboard);
    renderDashboard(details,dashboard);
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      decorate();
    });
  }

  document.addEventListener('click',event => {
    const open = event.target.closest('[data-progress-detail-open]');
    if (open) {
      event.preventDefault();
      const key = open.dataset.progressDetailOpen;
      activeKey = activeKey === key ? null : key;
      schedule();
      return;
    }
    if (event.target.closest('[data-progress-detail-close]')) {
      event.preventDefault();
      activeKey = null;
      schedule();
    }
  },true);

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
  document.addEventListener('toggle',event=>{
    if (event.target.matches?.('.progress-ux-details')) schedule();
  },true);

  schedule();

  window.FrenchTranquilleProgressDetailsDashboard = {
    version:'1.19.6',
    build:'26.6',
    decorate,
    active:()=>activeKey,
    state(){
      const dashboard = document.querySelector('.progress-detail-dashboard');
      return dashboard ? stateOf(dashboard) : { counts:{}, total:0, active:activeKey };
    },
    open(key){ if (META[key]) { activeKey=key; schedule(); } },
    close(){ activeKey=null; schedule(); }
  };
})();