/* French Trân’quille V6.1 — additive high-fidelity home/practice decoration.
   No alternate routes, data stores, progress computations, voice calls or fake statistics. */
(() => {
  'use strict';
  if (window.FrenchTranquilleV61) return;
  const root = document.documentElement;
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const bilingual = (vi, fr) => {
    const span = document.createElement('span');
    span.innerHTML = '<span class="v61-vi"></span><span class="v61-fr"></span>';
    span.firstElementChild.textContent = vi;
    span.lastElementChild.textContent = fr;
    return span;
  };
  const heading = (vi, fr) => {
    const el = document.createElement('h2');
    el.className = 'v61-heading';
    el.appendChild(bilingual(vi, fr));
    return el;
  };
  function enhanceHome() {
    const home = document.querySelector('.b27-home');
    if (!home) return;
    const main = home.querySelector('.b27-home-main');
    const side = home.querySelector('.b27-home-side');
    const card = home.querySelector('.b27-primary-card');
    if (!main || !side || !card) return;
    root.dataset.v61Surface = 'home';
    if (!main.querySelector('.v61-loop')) {
      const loop = document.createElement('section');
      loop.className = 'v61-loop';
      loop.setAttribute('aria-label', 'Learning rhythm');
      const items = [
        ['✦','Học','Apprendre','Từ vựng','Des mots'],
        ['◉','Luyện','Pratiquer','Từng bước','Pas à pas'],
        ['✓','Áp dụng','Utiliser','Ngoài đời','Dans la vie']
      ];
      for (const [icon,vi,fr,subVi,subFr] of items) {
        const col = document.createElement('div');
        const symbol = document.createElement('b');
        symbol.textContent = icon;
        const title = document.createElement('strong');
        title.appendChild(bilingual(vi,fr));
        const sub = document.createElement('small');
        sub.appendChild(bilingual(subVi,subFr));
        col.append(symbol,title,sub);
        loop.appendChild(col);
      }
      main.appendChild(loop);
    }
    if (!side.querySelector('.v61-heading')) {
      side.prepend(heading('Luyện tập nhanh ✨','Pratique rapide ✨'));
    }
    if (!side.querySelector('.v61-quick-conversation')) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'b27-quick-card v61-quick-conversation';
      button.dataset.b27Action = 'conversation';
      const icon = document.createElement('span');
      icon.className = 'b27-quick-icon';
      icon.setAttribute('aria-hidden','true');
      const copy = document.createElement('span');
      const title = document.createElement('strong');
      title.appendChild(bilingual('Tập nói','Conversation guidée'));
      const detail = document.createElement('small');
      detail.appendChild(bilingual('Hội thoại cùng Tyffany','Dialogues avec Tyffany'));
      copy.append(title,detail);
      const arrow = document.createElement('b');
      arrow.setAttribute('aria-hidden','true');
      arrow.textContent = '›';
      button.append(icon,copy,arrow);
      const note = side.querySelector('.b27-today-note');
      side.insertBefore(button,note);
    }
  }
  function enhancePractice() {
    const page = document.querySelector('.b27-practice-page');
    if (!page) return;
    const main = page.querySelector('.b27-practice-main');
    const real = main?.querySelector('.b27-practice-action[data-b27-practice-action="real-life"]');
    if (!main || !real) return;
    root.dataset.v61Surface = 'practice';
    const old = main.querySelector('.v61-practice-recommendation');
    if (real.disabled) { old?.remove(); return; }
    if (old) return;
    const rec = document.createElement('section');
    rec.className = 'v61-practice-recommendation';
    const copy = document.createElement('div');
    const tag = document.createElement('span');
    tag.appendChild(bilingual('GỢI Ý CHO BẠN','CONSEILLÉ POUR TOI'));
    const title = document.createElement('h3');
    /* The existing real-life card gets its label from the actual unlocked scenario. */
    title.textContent = real.querySelector('small')?.textContent?.trim()
      || real.querySelector('strong')?.textContent?.trim() || '';
    const explanation = document.createElement('p');
    explanation.appendChild(bilingual('Một tình huống thực tế để luyện tập.',
      'Une situation réelle pour s’entraîner.'));
    const cta = document.createElement('button');
    cta.type = 'button';
    cta.dataset.b27PracticeAction = 'real-life';
    cta.className = 'b27-practice-action';
    cta.appendChild(bilingual('Khám phá →','Explorer →'));
    copy.append(tag,title,explanation,cta);
    const image = document.createElement('img');
    image.src = './assets/premium/practice/real-life-premium.webp';
    image.alt = '';
    image.loading = 'lazy';
    rec.append(copy,image);
    main.appendChild(rec);
  }
  let pending = false;
  function schedule() {
    if (pending) return;
    pending = true;
    queueMicrotask(() => {
      pending = false;
      if (!root.classList.contains('b27-app-shell')) return;
      enhanceHome();
      enhancePractice();
    });
  }
  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
  new MutationObserver(schedule).observe(root,{attributes:true,attributeFilter:['class']});
  window.addEventListener('focus',schedule);
  schedule();
  window.FrenchTranquilleV61 = Object.freeze({version:'6.1.0-review1',refresh:schedule});
})();