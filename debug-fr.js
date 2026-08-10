(() => {
  'use strict';

  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const APP_VERSION = '1.0.2';
  const BUILD = 3;
  const params = new URLSearchParams(location.search);
  if (params.get('debug') === 'fr') localStorage.setItem(DEBUG_KEY, '1');
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';

  const exact = new Map(Object.entries({
    'TIẾNG PHÁP CÙNG LUC':'FRANÇAIS AVEC LUC',
    'Xin chào Trân 👋':'Salut Trân 👋',
    'Quay lại':'Retour',
    'Cài đặt':'Réglages',
    'Trang chủ':'Accueil',
    'Hội thoại':'Conversation',
    'Ôn tập':'Révision',
    'Tiến độ':'Progrès',
    'Luc • gia sư của bạn':'Luc • ton professeur',
    'Hôm nay mình học thật nhẹ nhàng.':"Aujourd'hui, on apprend tranquillement.",
    'Chỉ vài phút. Một ít tiếng Pháp, giải thích chủ yếu bằng tiếng Việt.':'Quelques minutes seulement. Un peu de français, expliqué principalement en vietnamien.',
    'Trình độ':'Niveau',
    'Đã học':'Déjà appris',
    'Ngày liên tiếp':'jours consécutifs',
    'Bài hôm nay':"Leçon d'aujourd'hui",
    'Bài 1 — Bonjour':'Leçon 1 — Bonjour',
    '4 điều đầu tiên để chào hỏi và giới thiệu tên.':"Les quatre premiers éléments pour saluer quelqu'un et se présenter.",
    'Xem lại bài học':'Revoir la leçon',
    'Tiếp tục bài học':'Continuer la leçon',
    'Bắt đầu bài học':'Commencer la leçon',
    'Luyện hội thoại':'Pratiquer la conversation',
    'Tập dùng câu đã học':'Entraînez-vous à utiliser les phrases apprises',
    'Nhớ lâu hơn':'Se souvenir plus longtemps',
    'Xem những gì đã học':'Voir ce que vous avez appris',
    'Chào mừng, Trân':'Bienvenue, Trân',
    'Mình là Luc. Chúng ta sẽ học tiếng Pháp thật chậm, từ con số 0. Hôm nay chỉ có vài từ rất hữu ích — không cần học quá nhiều một lúc.':"Je suis Luc. Nous allons apprendre le français progressivement, en partant de zéro. Aujourd'hui, seulement quelques éléments très utiles.",
    'Từ đầu tiên':'Premier mot',
    'Xin chào':'Bonjour / Salut',
    'Đây là cách chào phổ biến và lịch sự trong tiếng Pháp. Nhấn nút nghe, rồi đọc theo nếu bạn muốn.':"C'est une salutation courante et polie en français. Clique sur Écouter, puis répète si tu veux.",
    'Nghe':'Écouter',
    'Nhận biết':'Reconnaissance',
    '“Bonjour” nghĩa là gì?':'Que signifie « Bonjour » ?',
    'Cảm ơn':'Merci',
    'Tạm biệt':'Au revoir',
    'Từ thứ hai':'Deuxième mot',
    'Một từ rất quan trọng. Bạn sẽ dùng nó mỗi ngày.':"Un mot très important. Tu l'utiliseras tous les jours.",
    'Tình huống nhỏ':'Petite situation',
    'Ai đó đưa bạn một ly nước. Bạn nói gì?':"Quelqu'un te donne un verre d'eau. Que dis-tu ?",
    'Khi rời đi':'Quand on se quitte',
    'Dùng khi bạn rời đi hoặc kết thúc một cuộc gặp.':"On l'utilise lorsqu'on part ou qu'on termine une rencontre.",
    'Giới thiệu tên':'Se présenter',
    'Tôi tên là Trân.':"Je m'appelle Trân.",
    'Tạm thời hãy học cả cụm như một khối. Chưa cần phân tích ngữ pháp.':"Pour l'instant, apprends la phrase comme un bloc. Pas besoin d'analyser la grammaire.",
    'Tình huống cuối':'Situation finale',
    'Bạn gặp Luc lần đầu. Chọn câu phù hợp nhất để bắt đầu.':'Tu rencontres Luc pour la première fois. Choisis la meilleure phrase pour commencer.',
    'Xong Bài 1':'Leçon 1 terminée',
    'Hôm nay bạn đã học 4 điều đầu tiên: Bonjour, Merci, Au revoir và Je m’appelle Trân. Ngày mai, chúng ta sẽ dùng lại chúng trước khi học thêm.':"Aujourd'hui, tu as appris tes 4 premiers éléments : Bonjour, Merci, Au revoir et Je m'appelle Trân. La prochaine fois, nous les réutiliserons avant d'ajouter du nouveau contenu.",
    'Trước':'Précédent',
    'Tiếp tục':'Continuer',
    'Hoàn thành':'Terminer',
    'Thực hành có hướng dẫn':'Pratique guidée',
    'Buổi sáng, bạn gặp Luc. Bạn nói gì?':'Le matin, tu rencontres Luc. Que dis-tu ?',
    'Luc đưa bạn một tách trà. Bạn nói gì?':'Luc te donne une tasse de thé. Que dis-tu ?',
    'Bạn muốn giới thiệu tên của mình.':'Tu veux te présenter.',
    'Cuộc gặp kết thúc. Bạn nói gì?':'La rencontre se termine. Que dis-tu ?',
    'Chỉ dùng những gì bạn đã học. Không cần câu dài.':"Utilise uniquement ce que tu as appris. Pas besoin d'une longue phrase.",
    'Gửi câu trả lời':'Envoyer la réponse',
    'Giọng nói — sắp có':'Voix — bientôt disponible',
    'Ở PWA-2, bạn sẽ có thể nói trực tiếp với Luc bằng micro.':'Dans PWA-2, Trân pourra parler directement à Luc avec le micro.',
    'Chưa có gì để ôn.':'Rien à réviser pour le moment.',
    'Hoàn thành vài bước của Bài 1 trước nhé.':"Termine d'abord quelques étapes de la Leçon 1.",
    'Đi tới Bài 1':'Aller à la Leçon 1',
    'Tiếng Pháp của câu này là gì?':'Comment dit-on ceci en français ?',
    'Hiện đáp án':'Afficher la réponse',
    'Bạn nhớ từ này thế nào?':'Comment te souviens-tu de cet élément ?',
    'Khó':'Difficile',
    'Được':'Correct',
    'Dễ':'Facile',
    'Bắt đầu từ con số 0 — từng bước nhỏ.':'Départ de zéro — étape par étape.',
    'Bài hoàn thành':'Leçons terminées',
    'Cần ôn':'À revoir',
    'Điều đã học':'Éléments appris',
    'Danh sách sẽ xuất hiện khi bạn bắt đầu Bài 1.':'La liste apparaîtra lorsque Trân commencera la Leçon 1.',
    'Không có điểm XP.':'Pas de points XP.',
    'Ở đây chỉ theo dõi những gì bạn thực sự hiểu và có thể dùng.':'On suit uniquement ce que Trân comprend réellement et peut utiliser.',
    'Chẩn đoán':'Diagnostic',
    'Phiên bản':'Version',
    'Bài 1':'Leçon 1',
    'Lần cuối':'Dernière activité',
    'Dữ liệu học':"Données d'apprentissage",
    'Chỉ dùng khi cần bắt đầu lại từ đầu.':"À utiliser uniquement s'il faut repartir de zéro.",
    'Đặt lại dữ liệu':'Réinitialiser les données',
    'Đúng rồi. Mình tiếp tục nhé.':'Correct. On continue.'
  }));

  const attrTranslations = new Map([
    ['Viết câu tiếng Pháp…','Écrire la phrase en français…'],
    ['Quay lại','Retour'],
    ['Cài đặt','Réglages']
  ]);

  function dynamic(text) {
    let m;
    if ((m = text.match(/^Bước\s+(\d+)\/(\d+)$/))) return `Étape ${m[1]}/${m[2]}`;
    if ((m = text.match(/^Bước\s+(\d+)$/))) return `Étape ${m[1]}`;
    if ((m = text.match(/^Thẻ\s+(\d+)\/(\d+)$/))) return `Carte ${m[1]}/${m[2]}`;
    if ((m = text.match(/^Chưa phải\. Hãy thử lại —\s*(.+)$/))) return `Pas encore. Réessaie — ${m[1]}`;
    if ((m = text.match(/^Gần đúng\. Hãy thử lại với:\s*(.+)$/))) return `Presque. Réessaie avec : ${m[1]}`;
    return null;
  }

  function translateTextNode(node) {
    if (!isDebug()) return;
    const raw = node.nodeValue;
    if (!raw || !raw.trim()) return;
    const leading = raw.match(/^\s*/)?.[0] || '';
    const trailing = raw.match(/\s*$/)?.[0] || '';
    const text = raw.trim();
    const translated = exact.get(text) || dynamic(text);
    if (translated && translated !== text) node.nodeValue = leading + translated + trailing;
  }

  function translateElementAttributes(el) {
    if (!isDebug() || !(el instanceof Element)) return;
    for (const attr of ['placeholder','aria-label','title']) {
      const value = el.getAttribute(attr);
      if (value && attrTranslations.has(value)) el.setAttribute(attr, attrTranslations.get(value));
    }
  }

  function translateTree(root) {
    if (!isDebug()) return;
    translateElementAttributes(root);
    if (!(root instanceof Node)) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
      else translateElementAttributes(node);
    }
  }

  function injectStyles() {
    if (document.getElementById('debug-fr-style')) return;
    const style = document.createElement('style');
    style.id = 'debug-fr-style';
    style.textContent = `
      .debug-fr-banner{position:sticky;top:0;z-index:20;margin:0;padding:8px 12px;text-align:center;background:#5b3b0a;color:#fff1cf;border-bottom:1px solid #9b6a1d;font:700 11px/1.35 system-ui;letter-spacing:.03em}
      .debug-fr-card{border-color:rgba(245,183,72,.38)!important;background:linear-gradient(180deg,rgba(73,49,13,.72),rgba(28,27,27,.86))!important}
      .debug-fr-card .debug-fr-title{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px}
      .debug-fr-card .debug-fr-status{padding:4px 8px;border-radius:999px;background:#17243a;border:1px solid #425673;font-size:.72rem}
      .debug-fr-card button{width:100%;min-height:48px;border-radius:14px;border:1px solid #8c6425;background:#f2e5ca;color:#172033;font-weight:800;cursor:pointer}
    `;
    document.head.appendChild(style);
  }

  function injectDebugCard() {
    const main = document.querySelector('.content');
    if (!main || document.getElementById('debug-fr-card')) return;
    const diagnosticsHeading = [...main.querySelectorAll('h2')].find(h => ['Chẩn đoán','Diagnostic'].includes(h.textContent.trim()));
    if (!diagnosticsHeading) return;
    const card = document.createElement('section');
    card.id = 'debug-fr-card';
    card.className = 'card debug-fr-card';
    card.innerHTML = `
      <div class="debug-fr-title"><div><span class="pill">JERRY</span><h2>🇫🇷 DEBUG FR</h2></div><span class="debug-fr-status">${isDebug()?'ON':'OFF'}</span></div>
      <p>${isDebug()?"Traduction française active uniquement dans ce navigateur. Trân continue de voir le vietnamien sur son appareil.":"Mode de traduction pour le debug de Jerry. Local à ce navigateur : aucun impact sur l'appareil de Trân."}</p>
      <button type="button" id="debug-fr-toggle">${isDebug()?'Désactiver DEBUG FR':'🇫🇷 Activer DEBUG FR'}</button>
    `;
    diagnosticsHeading.closest('.card').before(card);
    card.querySelector('#debug-fr-toggle').addEventListener('click', () => {
      localStorage.setItem(DEBUG_KEY, isDebug() ? '0' : '1');
      location.reload();
    });
  }

  function injectBanner() {
    const shell = document.querySelector('.app-shell');
    if (!shell || !isDebug() || document.getElementById('debug-fr-banner')) return;
    const banner = document.createElement('div');
    banner.id = 'debug-fr-banner';
    banner.className = 'debug-fr-banner';
    banner.textContent = "🇫🇷 DEBUG FR — Trân voit toujours le vietnamien sur son appareil";
    shell.prepend(banner);
  }

  function patchDisplayedVersion() {
    document.querySelectorAll('.diagnostics strong').forEach(el => {
      if (/^v1\.0\.1\s*•\s*Build\s*2$/.test(el.textContent.trim())) el.textContent = `v${APP_VERSION} • Build ${BUILD}`;
    });
  }

  function refresh() {
    injectStyles();
    patchDisplayedVersion();
    injectDebugCard();
    injectBanner();
    if (isDebug()) {
      document.documentElement.lang = 'fr';
      translateTree(document.getElementById('app'));
    }
  }

  const originalConfirm = window.confirm.bind(window);
  window.confirm = (message) => {
    if (isDebug() && message === 'Xóa toàn bộ tiến độ và bắt đầu lại?') {
      return originalConfirm('Supprimer toute la progression et recommencer ?');
    }
    return originalConfirm(message);
  };

  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; refresh(); });
  });

  const start = () => {
    refresh();
    observer.observe(document.body, {subtree:true, childList:true});
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();