(() => {
  'use strict';

  const CARD_ID = 'ft-settings-legal';
  const STYLE_ID = 'ft-settings-legal-style';
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';

  if (!document.querySelector('script[data-build31-loader]')) {
    const loader = document.createElement('script');
    loader.src = './build31-loader.js?v=2.1.0-b31';
    loader.dataset.build31Loader = '1';
    document.body.appendChild(loader);
  }

  const COPY = {
    vi: {
      title: 'Thông tin, quyền riêng tư & bản quyền',
      intro: 'Thông tin ngắn gọn về dữ liệu, giọng nói và quyền sử dụng French Trân’quille.',
      privacyTitle: '🔐 Quyền riêng tư & dữ liệu',
      privacy1: 'Tiến độ học, cài đặt và bộ nhớ học được lưu cục bộ trên thiết bị này. French Trân’quille không có tài khoản, quảng cáo hoặc hệ thống phân tích người dùng của riêng ứng dụng.',
      privacy2: 'Nếu bạn xóa dữ liệu của trình duyệt/PWA, dữ liệu cục bộ có thể bị mất. Hãy tạo bản sao lưu trước khi đặt lại hoặc xóa dữ liệu.',
      voiceTitle: '🎙️ Giọng nói & micro',
      voice1: 'Bản ghi “Nghe lại giọng của mình” là bản ghi tạm thời trên thiết bị, không được tải lên và không được thêm vào tiến độ học hay bản sao lưu.',
      voice2: 'Nhận dạng giọng nói được cung cấp bởi Safari/iOS hoặc trình duyệt. Việc xử lý âm thanh có thể phụ thuộc vào nhà cung cấp và chính sách riêng tư của họ; French Trân’quille không kiểm soát dịch vụ nhận dạng đó.',
      limitsTitle: '🎓 Giới hạn học tập',
      limits1: 'French Trân’quille là công cụ hỗ trợ học tiếng Pháp. Nhận dạng giọng nói và phản hồi tự động có thể nhầm; đây không phải kỳ thi CEFR chính thức hay chứng nhận trình độ.',
      limits2: 'Ứng dụng không đưa ra điểm phát âm tự động. Một câu được nhận dạng đúng chỉ có nghĩa là hệ thống nhận dạng đã hiểu câu đó, không phải là chứng nhận phát âm hoàn hảo.',
      rightsTitle: '© Bản quyền & quyền sử dụng',
      rights1: '© 2026 ShinoBiWan — French Trân’quille. Mọi quyền được bảo lưu.',
      rights2: 'Kho mã nguồn công khai hiện không kèm giấy phép tái sử dụng. Không có quyền sao chép, sửa đổi hoặc phân phối lại nếu chưa có sự cho phép rõ ràng.',
      source: 'Mã nguồn trên GitHub'
    },
    fr: {
      title: 'À propos, confidentialité & droits',
      intro: 'Informations courtes sur les données, la voix et les droits liés à French Trân’quille.',
      privacyTitle: '🔐 Confidentialité & données',
      privacy1: 'La progression, les réglages et la mémoire d’apprentissage sont stockés localement sur cet appareil. French Trân’quille n’intègre ni compte utilisateur, ni publicité, ni outil d’analytics propre à l’application.',
      privacy2: 'Effacer les données du navigateur ou de la PWA peut supprimer les données locales. Utilise une sauvegarde avant toute réinitialisation ou suppression de données.',
      voiceTitle: '🎙️ Voix & microphone',
      voice1: 'L’enregistrement « Ma voix » est temporaire et local à l’appareil : il n’est pas uploadé et n’est ajouté ni à la progression ni aux sauvegardes.',
      voice2: 'La reconnaissance vocale est fournie par Safari/iOS ou le navigateur. Le traitement audio peut dépendre du fournisseur et de sa propre politique de confidentialité ; French Trân’quille ne contrôle pas ce service de reconnaissance.',
      limitsTitle: '🎓 Limites pédagogiques',
      limits1: 'French Trân’quille est un outil d’apprentissage du français. La reconnaissance vocale et les retours automatiques peuvent se tromper ; ils ne constituent ni un examen CECRL officiel ni une certification de niveau.',
      limits2: 'L’application n’attribue pas de score automatique de prononciation. Une phrase reconnue signifie seulement que le système de reconnaissance l’a comprise, pas que la prononciation est certifiée parfaite.',
      rightsTitle: '© Droits & réutilisation',
      rights1: '© 2026 ShinoBiWan — French Trân’quille. Tous droits réservés.',
      rights2: 'Le dépôt public ne contient actuellement aucune licence de réutilisation. Aucune autorisation de copie, modification ou redistribution n’est accordée sans permission explicite.',
      source: 'Code source sur GitHub'
    }
  };

  const locale = () => localStorage.getItem(DEBUG_KEY) === '1' ? 'fr' : 'vi';
  const h = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[char]));

  function installStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${CARD_ID}{display:grid;gap:16px}
      #${CARD_ID} .ft-legal-head{display:flex;gap:12px;align-items:flex-start}
      #${CARD_ID} .ft-legal-head .glyph{flex:0 0 auto;font-size:1.35rem;line-height:1.2}
      #${CARD_ID} .ft-legal-head h2{margin:0 0 6px}
      #${CARD_ID} .ft-legal-head p{margin:0;line-height:1.55}
      #${CARD_ID} .ft-legal-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
      #${CARD_ID} .ft-legal-block{padding:14px;border:1px solid rgba(180,199,224,.14);border-radius:16px;background:rgba(8,17,29,.28)}
      #${CARD_ID} .ft-legal-block h3{margin:0 0 8px;font-size:.96rem}
      #${CARD_ID} .ft-legal-block p{margin:0 0 8px;line-height:1.55;font-size:.88rem}
      #${CARD_ID} .ft-legal-block p:last-child{margin-bottom:0}
      #${CARD_ID} .ft-legal-foot{display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding-top:2px;font-size:.8rem}
      #${CARD_ID} .ft-legal-foot span{opacity:.78}
      #${CARD_ID} .ft-legal-foot a{color:inherit;text-underline-offset:3px;font-weight:700}
      @media (max-width:640px){#${CARD_ID} .ft-legal-grid{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function cardMarkup(lang) {
    const c = COPY[lang];
    return `<section class="card ft-legal-card" id="${CARD_ID}" data-ft-legal-locale="${lang}" aria-labelledby="ft-legal-title">
      <div class="ft-legal-head">
        <span class="glyph" aria-hidden="true">ⓘ</span>
        <div><h2 id="ft-legal-title">${h(c.title)}</h2><p class="muted">${h(c.intro)}</p></div>
      </div>
      <div class="ft-legal-grid">
        <div class="ft-legal-block"><h3>${h(c.privacyTitle)}</h3><p>${h(c.privacy1)}</p><p>${h(c.privacy2)}</p></div>
        <div class="ft-legal-block"><h3>${h(c.voiceTitle)}</h3><p>${h(c.voice1)}</p><p>${h(c.voice2)}</p></div>
        <div class="ft-legal-block"><h3>${h(c.limitsTitle)}</h3><p>${h(c.limits1)}</p><p>${h(c.limits2)}</p></div>
        <div class="ft-legal-block"><h3>${h(c.rightsTitle)}</h3><p>${h(c.rights1)}</p><p>${h(c.rights2)}</p></div>
      </div>
      <div class="ft-legal-foot"><span>${h(c.rights1)}</span><a href="https://github.com/shinobione/tran-french-teacher" target="_blank" rel="noopener noreferrer">${h(c.source)} ↗</a></div>
    </section>`;
  }

  function mount() {
    installStyle();
    const host = document.querySelector('#app .app-shell.screen-settings .narrow');
    if (!host) return false;

    const lang = locale();
    const current = document.getElementById(CARD_ID);
    if (current && current.dataset.ftLegalLocale === lang && current.parentElement === host) return true;

    const template = document.createElement('template');
    template.innerHTML = cardMarkup(lang).trim();
    const next = template.content.firstElementChild;
    if (!next) return false;

    if (current) current.replaceWith(next);
    else {
      const danger = host.querySelector('.danger-zone');
      if (danger) host.insertBefore(next, danger);
      else host.appendChild(next);
    }
    return true;
  }

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      mount();
    });
  };

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app, { childList:true, subtree:true });
  window.addEventListener('storage', event => { if (event.key === DEBUG_KEY) schedule(); });
  mount();

  window.FrenchTranquilleLegalSettings = Object.freeze({
    version: 'post-v2-maintenance',
    refresh: mount
  });
})();