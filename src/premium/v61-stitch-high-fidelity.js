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

    // A real, decorative café illustration assembled from accepted runtime assets.
    // No text baked into the art, no fake learning values and no click interception.
    if (!card.querySelector('.v61-cafe-scene')) {
      const scene = document.createElement('div');
      scene.className = 'v61-cafe-scene';
      scene.setAttribute('aria-hidden','true');
      const cafe = document.createElement('img');
      cafe.className = 'v61-cafe-art';
      cafe.src = './assets/premium/practice/real-life-premium.webp';
      cafe.alt = '';
      cafe.decoding = 'async';
      const goat = document.createElement('img');
      goat.className = 'v61-goat-sticker';
      goat.src = './assets/premium/brand/goat-app-icon-180.png';
      goat.alt = '';
      goat.decoding = 'async';
      scene.append(cafe,goat);
      card.appendChild(scene);
    }
    if (!main.querySelector('.v61-home-section-label')) {
      const title = heading('Hôm nay bạn sẽ học gì?','Aperçu du jour');
      title.classList.add('v61-home-section-label');
      const loop = main.querySelector('.v61-loop');
      if (loop) main.insertBefore(title,loop);
    }

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

    // Visual-only accents inside the existing routed button.
    // Every module still has one and only one real click target.
    const labels = {
      conversation:['NÓI','PARLER','Bắt đầu','Commencer'],
      listening:['NGHE','ÉCOUTER','Bắt đầu','Commencer'],
      review:['ÔN TẬP','RÉVISER','Xem thẻ','Voir les cartes'],
      'real-life':['THỰC TẾ','VRAIE VIE','Khám phá','Explorer']
    };
    main.querySelectorAll('.b27-practice-list > [data-b27-practice-action]').forEach(action => {
      const values = labels[action.dataset.b27PracticeAction];
      if (!values) return;
      if (!action.querySelector(':scope > .v61-card-kicker')) {
        const kicker = document.createElement('span');
        kicker.className = 'v61-card-kicker';
        kicker.appendChild(bilingual(values[0],values[1]));
        action.prepend(kicker);
      }
      if (!action.querySelector(':scope > .v61-card-cta')) {
        const cta = document.createElement('span');
        cta.className = 'v61-card-cta';
        cta.appendChild(action.disabled
          ? bilingual('Chưa mở','À débloquer')
          : bilingual(values[2],values[3]));
        action.appendChild(cta);
      }
    });

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
  window.FrenchTranquilleV61 = Object.freeze({version:'6.1.0-review2',refresh:schedule});
})();