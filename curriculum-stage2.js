const CORE = window.FrenchTranquilleCurriculum;

if (CORE) {
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const LEARNER_KEY = CORE.key;
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const STAGE2 = [
    {
      id:'l16',number:16,icon:'🧩',stage:'A1-foundations',
      titleVi:'Động từ être trong câu thật',titleFr:'Être dans des phrases utiles',
      shortVi:'Je suis, tu es, il/elle est và c’est trong tình huống đơn giản.',shortFr:'Je suis, tu es, il/elle est et c’est dans de vraies petites phrases.',
      introVi:'Không học bảng chia động từ dài. Ta dùng ngay être để mô tả người và tình huống.',introFr:'Pas de grand tableau de conjugaison : on utilise être tout de suite pour décrire une personne ou une situation.',
      grammarVi:'être = “là / ở / trong trạng thái”. Nhóm đầu tiên cần nhớ: je suis • tu es • il/elle est • c’est.',
      grammarFr:'être : premier noyau utile à retenir — je suis • tu es • il/elle est • c’est.',
      items:[
        {id:'je-suis-prete',fr:'Je suis prête.',vi:'Tôi sẵn sàng.'},
        {id:'tu-es-prete',fr:'Tu es prête ?',vi:'Bạn sẵn sàng chưa?'},
        {id:'il-est-francais',fr:'Il est français.',vi:'Anh ấy là người Pháp.'},
        {id:'elle-est-francaise',fr:'Elle est française.',vi:'Cô ấy là người Pháp.'},
        {id:'cest-facile',fr:"C'est facile.",vi:'Cái này dễ.'},
        {id:'cest-difficile',fr:"C'est difficile.",vi:'Cái này khó.'}
      ],
      challenge:{vi:'Lucie hỏi bạn đã sẵn sàng chưa. Bạn trả lời thế nào?',fr:'Lucie te demande si tu es prête. Que réponds-tu ?',answer:'Je suis prête.',options:['Je suis prête.','J’ai prête.','Je voudrais prête.']}
    },
    {
      id:'l17',number:17,icon:'🎒',stage:'A1-foundations',
      titleVi:'Động từ avoir & những gì mình có',titleFr:'Avoir & ce qu’on a',
      shortVi:'J’ai, tu as, je n’ai pas và vài nhu cầu rất thực tế.',shortFr:'J’ai, tu as, je n’ai pas et quelques besoins très concrets.',
      introVi:'Avoir xuất hiện khắp nơi trong tiếng Pháp. Ta bắt đầu bằng những câu bạn thật sự có thể dùng.',introFr:'Avoir est partout en français. On commence avec des phrases que tu peux réellement utiliser.',
      grammarVi:'avoir = “có”. Nhóm đầu tiên: j’ai • tu as. Với phủ định: je n’ai pas…',
      grammarFr:'avoir : j’ai • tu as. Pour nier : je n’ai pas…',
      items:[
        {id:'jai-un-telephone',fr:"J'ai un téléphone.",vi:'Tôi có điện thoại.'},
        {id:'jai-une-question',fr:"J'ai une question.",vi:'Tôi có một câu hỏi.'},
        {id:'tu-as-le-temps',fr:'Tu as le temps ?',vi:'Bạn có thời gian không?'},
        {id:'jai-une-reservation',fr:"J'ai une réservation.",vi:'Tôi có đặt chỗ.'},
        {id:'je-nai-pas-monnaie',fr:"Je n'ai pas de monnaie.",vi:'Tôi không có tiền lẻ.'},
        {id:'jai-besoin-aide',fr:"J'ai besoin d'aide.",vi:'Tôi cần giúp đỡ.'}
      ],
      challenge:{vi:'Bạn muốn nói rằng mình có đặt chỗ. Câu nào đúng?',fr:'Tu veux dire que tu as une réservation. Quelle phrase convient ?',answer:"J'ai une réservation.",options:["J'ai une réservation.",'Je suis une réservation.','Je vais réservation.']}
    },
    {
      id:'l18',number:18,icon:'💬',stage:'A1-foundations',
      titleVi:'Muốn & có thể — vouloir / pouvoir',titleFr:'Vouloir & pouvoir',
      shortVi:'Nói mình muốn gì, có thể làm gì và không thể làm gì.',shortFr:'Dire ce qu’on veut, ce qu’on peut faire et ce qu’on ne peut pas faire.',
      introVi:'Hai động từ cực kỳ hữu ích để tự xoay xở: vouloir và pouvoir.',introFr:'Deux verbes ultra utiles pour devenir autonome : vouloir et pouvoir.',
      grammarVi:'je veux = tôi muốn • je peux = tôi có thể • je ne peux pas = tôi không thể. “Je voudrais” vẫn lịch sự hơn khi gọi món hoặc yêu cầu.',
      grammarFr:'je veux = volonté directe • je peux = possibilité • je ne peux pas = impossibilité. Je voudrais reste plus poli pour demander.',
      items:[
        {id:'je-veux-rentrer',fr:'Je veux rentrer.',vi:'Tôi muốn về.'},
        {id:'je-veux-ca',fr:'Je veux ça.',vi:'Tôi muốn cái đó.'},
        {id:'je-peux-entrer',fr:'Je peux entrer ?',vi:'Tôi có thể vào không?'},
        {id:'je-peux-attendre',fr:'Je peux attendre.',vi:'Tôi có thể đợi.'},
        {id:'je-ne-peux-pas',fr:'Je ne peux pas.',vi:'Tôi không thể.'},
        {id:'vous-pouvez-aider',fr:"Vous pouvez m'aider ?",vi:'Bạn có thể giúp tôi không?'}
      ],
      challenge:{vi:'Bạn không thể làm điều gì đó. Bạn nói ngắn gọn thế nào?',fr:'Tu ne peux pas faire quelque chose. Que dis-tu simplement ?',answer:'Je ne peux pas.',options:['Je ne peux pas.','Je ne suis pas.','Je ne voudrais pas être.']}
    },
    {
      id:'l19',number:19,icon:'🏠',stage:'A1-foundations',
      titleVi:'Nhà ở & il y a',titleFr:'Le logement & il y a',
      shortVi:'Căn hộ, chìa khóa, cửa, phòng và một vấn đề trong nhà.',shortFr:'Appartement, clé, porte, chambre et un petit problème à la maison.',
      introVi:'Những câu rất cơ bản nhưng cực hữu ích khi sống trong một căn hộ ở Pháp.',introFr:'Des phrases simples mais très utiles pour vivre dans un logement en France.',
      grammarVi:'il y a = “có / có một…”. Phủ định: il n’y a pas…',
      grammarFr:'il y a = « il existe / on trouve ». Négation : il n’y a pas…',
      items:[
        {id:'cest-mon-appartement',fr:"C'est mon appartement.",vi:'Đây là căn hộ của tôi.'},
        {id:'ou-est-la-cle',fr:'Où est la clé ?',vi:'Chìa khóa ở đâu?'},
        {id:'porte-fermee',fr:'La porte est fermée.',vi:'Cửa đang đóng / khóa.'},
        {id:'il-y-a-chambre',fr:'Il y a une chambre.',vi:'Có một phòng ngủ.'},
        {id:'il-y-a-cuisine',fr:'Il y a une cuisine.',vi:'Có một nhà bếp.'},
        {id:'pas-eau-chaude',fr:"Il n'y a pas d'eau chaude.",vi:'Không có nước nóng.'}
      ],
      challenge:{vi:'Trong căn hộ không có nước nóng. Bạn nói gì?',fr:"Il n'y a pas d'eau chaude dans l'appartement. Que dis-tu ?",answer:"Il n'y a pas d'eau chaude.",options:["Il n'y a pas d'eau chaude.",'Je suis eau chaude.','Où est chaud ?']}
    },
    {
      id:'l20',number:20,icon:'📱',stage:'A1-foundations',
      titleVi:'Điện thoại & tin nhắn',titleFr:'Téléphone & messages',
      shortVi:'Alo, nghe rõ, gọi điện, nhắn tin, mất mạng và điện thoại hỏng.',shortFr:'Allô, entendre, appeler, envoyer un message, réseau et téléphone en panne.',
      introVi:'Một nhóm câu thực tế để xử lý những tình huống điện thoại hằng ngày.',introFr:'Un petit kit concret pour gérer les situations téléphoniques du quotidien.',
      grammarVi:'Các câu ngắn trong điện thoại thường rất trực tiếp. “Tu…” dùng với người thân; “vous…” lịch sự hơn với người lạ.',
      grammarFr:'Au téléphone, les phrases sont souvent courtes et directes. Tu avec les proches, vous avec les inconnus.',
      items:[
        {id:'allo',fr:'Allô ?',vi:'Alo?'},
        {id:'tu-mentends',fr:"Tu m'entends ?",vi:'Bạn nghe thấy tôi không?'},
        {id:'je-tappelle',fr:"Je t'appelle.",vi:'Tôi gọi cho bạn.'},
        {id:'envoie-message',fr:'Envoie-moi un message.',vi:'Gửi cho tôi một tin nhắn.'},
        {id:'telephone-marche-pas',fr:'Mon téléphone ne marche pas.',vi:'Điện thoại của tôi không hoạt động.'},
        {id:'pas-de-reseau',fr:"Je n'ai pas de réseau.",vi:'Tôi không có sóng / mạng.'}
      ],
      challenge:{vi:'Bạn gọi điện nhưng không chắc người kia nghe thấy. Bạn hỏi gì?',fr:"Tu téléphones mais tu ne sais pas si l'autre personne t'entend. Que demandes-tu ?",answer:"Tu m'entends ?",options:["Tu m'entends ?",'Tu me regardes ?','Tu es téléphone ?']}
    },
    {
      id:'l21',number:21,icon:'🌦️',stage:'early-A1',
      titleVi:'Thời tiết & cảm giác nóng/lạnh',titleFr:'Météo & sensations',
      shortVi:'Trời nóng, lạnh, mưa; mình nóng, lạnh; lấy áo khoác.',shortFr:'Il fait chaud/froid, il pleut, j’ai chaud/froid, prendre une veste.',
      introVi:'Tiếng Pháp dùng hai cấu trúc khác nhau: “il fait…” cho thời tiết và “j’ai…” cho cảm giác cơ thể.',introFr:'Le français distingue « il fait… » pour la météo et « j’ai… » pour la sensation du corps.',
      grammarVi:'Thời tiết: il fait chaud / froid. Cảm giác của bạn: j’ai chaud / froid. Đừng nói “je suis chaud” trong nghĩa này.',
      grammarFr:'Météo : il fait chaud / froid. Sensation : j’ai chaud / froid. Évite « je suis chaud » dans ce sens.',
      items:[
        {id:'il-fait-chaud',fr:'Il fait chaud.',vi:'Trời nóng.'},
        {id:'il-fait-froid',fr:'Il fait froid.',vi:'Trời lạnh.'},
        {id:'il-pleut',fr:'Il pleut.',vi:'Trời mưa.'},
        {id:'jai-chaud',fr:"J'ai chaud.",vi:'Tôi nóng.'},
        {id:'jai-froid',fr:"J'ai froid.",vi:'Tôi lạnh.'},
        {id:'je-prends-veste',fr:'Je prends une veste.',vi:'Tôi lấy / mặc thêm áo khoác.'}
      ],
      challenge:{vi:'Bạn đang cảm thấy lạnh. Câu nào đúng?',fr:'Tu as froid. Quelle phrase est correcte ?',answer:"J'ai froid.",options:["J'ai froid.",'Je suis froid.','Il est froid moi.']}
    },
    {
      id:'l22',number:22,icon:'🛒',stage:'early-A1',
      titleVi:'Đi siêu thị & đồ ăn cơ bản',titleFr:'Courses alimentaires',
      shortVi:'Bánh mì, sữa, trứng, số lượng, “hết rồi” và quầy tính tiền.',shortFr:'Pain, lait, œufs, quantité, « c’est tout » et les caisses.',
      introVi:'Mục tiêu: mua vài thứ cơ bản mà không cần dịch từng từ.',introFr:'Objectif : acheter quelques produits simples sans traduire mot par mot.',
      grammarVi:'Một ít ngữ pháp rất thực tế: du pain • du lait • des œufs. Đây là cách nói một lượng không xác định.',
      grammarFr:'Articles partitifs utiles : du pain • du lait • des œufs pour une quantité non précisée.',
      items:[
        {id:'du-pain',fr:'Du pain, s’il vous plaît.',vi:'Cho tôi bánh mì.'},
        {id:'du-lait',fr:'Du lait, s’il vous plaît.',vi:'Cho tôi sữa.'},
        {id:'des-oeufs',fr:'Des œufs.',vi:'Trứng.'},
        {id:'un-kilo',fr:'Un kilo, s’il vous plaît.',vi:'Một ký, làm ơn.'},
        {id:'cest-tout',fr:"C'est tout, merci.",vi:'Chỉ vậy thôi, cảm ơn.'},
        {id:'ou-caisses',fr:'Où sont les caisses ?',vi:'Quầy tính tiền ở đâu?'}
      ],
      challenge:{vi:'Bạn đã mua xong và không cần gì thêm. Bạn nói gì?',fr:"Tu as fini tes achats et tu ne veux rien d'autre. Que dis-tu ?",answer:"C'est tout, merci.",options:["C'est tout, merci.",'Je suis tout.','Tout est moi.']}
    },
    {
      id:'l23',number:23,icon:'🙂',stage:'early-A1',
      titleVi:'Nói chuyện xã giao ngắn',titleFr:'Petite conversation sociale',
      shortVi:'Ça va, hỏi lại, hỏi người kia đang làm gì và vài câu trả lời.',shortFr:'Ça va, retourner la question, demander ce que fait l’autre et répondre simplement.',
      introVi:'Bắt đầu tạo những cuộc trao đổi 2–3 lượt thay vì chỉ nói một câu riêng lẻ.',introFr:'On commence à construire de vrais petits échanges de 2 ou 3 tours, pas seulement des phrases isolées.',
      grammarVi:'Với người thân, “Et toi ?” rất tự nhiên. “Qu’est-ce que tu fais ?” = bạn đang làm gì / bạn làm gì?',
      grammarFr:'Avec un proche, « Et toi ? » est naturel. « Qu’est-ce que tu fais ? » sert à demander ce que fait la personne.',
      items:[
        {id:'ca-va',fr:'Ça va ?',vi:'Bạn khỏe không? / ổn không?'},
        {id:'ca-va-bien',fr:'Ça va bien.',vi:'Tôi khỏe / ổn.'},
        {id:'et-toi',fr:'Et toi ?',vi:'Còn bạn?'},
        {id:'quest-ce-tu-fais',fr:"Qu'est-ce que tu fais ?",vi:'Bạn đang làm gì?'},
        {id:'je-travaille',fr:'Je travaille.',vi:'Tôi đang làm việc.'},
        {id:'je-me-repose',fr:'Je me repose.',vi:'Tôi đang nghỉ ngơi.'}
      ],
      challenge:{vi:'Một người hỏi “Ça va ?”. Bạn khỏe và muốn hỏi lại. Câu nào tự nhiên?',fr:'Quelqu’un te demande « Ça va ? ». Tu vas bien et tu veux retourner la question.',answer:'Ça va bien. Et toi ?',options:['Ça va bien. Et toi ?','Je suis ça va.','Et toi travaille.']}
    },
    {
      id:'l24',number:24,icon:'☀️',stage:'early-A1',
      titleVi:'Một ngày bình thường — động từ hiện tại',titleFr:'Une journée simple au présent',
      shortVi:'Thức dậy, làm việc, ăn, về nhà, xem phim và ngủ.',shortFr:'Se lever, travailler, manger, rentrer, regarder un film et dormir.',
      introVi:'Không học “thì hiện tại” như một bảng. Ta kể một ngày bằng sáu động từ rất quen.',introFr:'On ne fait pas un tableau du présent : on raconte une journée avec six verbes très courants.',
      grammarVi:'Ở giai đoạn này, hãy nhận ra mẫu “je + động từ”. Sau này ta sẽ mở rộng sang tu / il / elle.',
      grammarFr:'Pour l’instant, repère surtout le modèle « je + verbe ». On élargira ensuite à tu / il / elle.',
      items:[
        {id:'je-me-leve',fr:'Je me lève.',vi:'Tôi thức dậy.'},
        {id:'je-travaille-journee',fr:'Je travaille.',vi:'Tôi làm việc.'},
        {id:'je-mange',fr:'Je mange.',vi:'Tôi ăn.'},
        {id:'je-rentre-maison',fr:'Je rentre à la maison.',vi:'Tôi về nhà.'},
        {id:'je-regarde-film',fr:'Je regarde un film.',vi:'Tôi xem phim.'},
        {id:'je-dors',fr:'Je dors.',vi:'Tôi ngủ.'}
      ],
      challenge:{vi:'Bạn muốn nói “Tôi về nhà”. Câu nào phù hợp?',fr:'Tu veux dire « je rentre à la maison ». Quelle phrase convient ?',answer:'Je rentre à la maison.',options:['Je rentre à la maison.','Je maison rentre.','Je suis rentrer maison.']}
    },
    {
      id:'l25',number:25,icon:'❓',stage:'early-A1',
      titleVi:'Câu hỏi ngắn để tiếp tục hội thoại',titleFr:'Questions simples pour continuer',
      shortVi:'Ở đâu, khi nào, tại sao, với ai, cái gì và bởi vì.',shortFr:'Où, quand, pourquoi, avec qui, quoi et parce que.',
      introVi:'Một cuộc hội thoại sống được nhờ câu hỏi. Ta thêm sáu công cụ cực ngắn để bạn không bị “hết câu”.',introFr:'Une conversation vit grâce aux questions. On ajoute six petits outils pour ne plus rester sans suite.',
      grammarVi:'Bạn chưa cần đảo động từ. Trong hội thoại, những câu ngắn như “Pourquoi ?”, “Quand ?”, “Avec qui ?” đã rất hữu ích.',
      grammarFr:'Pas besoin d’inversion pour l’instant : à l’oral, « Pourquoi ? », « Quand ? », « Avec qui ? » sont déjà très utiles.',
      items:[
        {id:'ou',fr:'Où ?',vi:'Ở đâu?'},
        {id:'quand',fr:'Quand ?',vi:'Khi nào?'},
        {id:'pourquoi',fr:'Pourquoi ?',vi:'Tại sao?'},
        {id:'avec-qui',fr:'Avec qui ?',vi:'Với ai?'},
        {id:'quoi',fr:'Quoi ?',vi:'Cái gì?'},
        {id:'parce-que',fr:'Parce que…',vi:'Bởi vì…'}
      ],
      challenge:{vi:'Jerry nói rằng anh ấy về muộn. Bạn muốn hỏi lý do. Câu ngắn nào đủ tự nhiên?',fr:'Jerry dit qu’il rentre tard. Tu veux demander la raison. Quelle petite question suffit ?',answer:'Pourquoi ?',options:['Pourquoi ?','Où est pourquoi ?','Parce que ?']}
    }
  ];

  const stageItems = STAGE2.flatMap(lesson => lesson.items.map(item => ({...item, lessonId:lesson.id, stage:lesson.stage})));
  const existingLessonIds = new Set(CORE.lessons.map(l => l.id));
  STAGE2.forEach(lesson => { if (!existingLessonIds.has(lesson.id)) CORE.lessons.push(lesson); });
  const existingItemIds = new Set(CORE.items.map(i => i.id));
  CORE.items = [...CORE.items, ...stageItems.filter(item => !existingItemIds.has(item.id))];
  CORE.stage2 = STAGE2;
  CORE.stage2Items = stageItems;
  CORE.totalLessons = CORE.lessons.length;
  CORE.totalItems = CORE.items.length;

  function learner() {
    try { return JSON.parse(localStorage.getItem(LEARNER_KEY) || '{}') || {}; }
    catch { return {}; }
  }

  function stage2Known() {
    const known = new Set(learner().knownItems || []);
    return stageItems.filter(item => known.has(item.id));
  }

  function patchCounts() {
    const l = learner();
    const known = new Set(l.knownItems || []);
    const totalKnown = CORE.items.filter(item => known.has(item.id)).length;
    const currentScreen = document.querySelector('.app-shell');
    if (!currentScreen) return;

    document.querySelectorAll('.screen-home .home-side .stats .stat').forEach(stat => {
      const label = stat.querySelector('small')?.textContent?.trim()?.toLocaleLowerCase();
      if (['đã học','acquis'].includes(label)) {
        const value = stat.querySelector('span');
        if (value) value.textContent = String(totalKnown);
      }
    });

    document.querySelectorAll('.screen-settings .diagnostics > div').forEach(row => {
      const label = row.querySelector('span')?.textContent?.trim()?.toLocaleLowerCase();
      const value = row.querySelector('strong');
      if (!value) return;
      if (label === 'đã học' || label === 'acquis') value.textContent = `${totalKnown}/${CORE.items.length}`;
      if (label === 'bài hoàn thành' || label === 'leçons terminées') value.textContent = `${(l.completedLessons || []).filter(id => CORE.lessons.some(x => x.id === id)).length}/${CORE.lessons.length}`;
    });
  }

  function patchCurriculum() {
    const card = document.querySelector('.curriculum-card');
    if (!card) return;
    const pill = card.querySelector('.section-head .pill');
    const title = card.querySelector('.section-head h2');
    if (pill) pill.textContent = T(`A0 → A1 • ${CORE.lessons.length} bài`,`A0 → A1 • ${CORE.lessons.length} leçons`);
    if (title) title.textContent = T('Lộ trình A0 → A1 đầu tiên','Premier parcours A0 → A1');
    const list = card.querySelector('.lesson-list');
    if (!list || list.querySelector('.curriculum-chapter')) return;
    const rows = [...list.querySelectorAll('.lesson-row')];
    const chapters = [
      {start:1,vi:'CHẶNG 1 • SỐNG SÓT A0',fr:'ÉTAPE 1 • SURVIE A0'},
      {start:8,vi:'CHẶNG 2 • CUỘC SỐNG HẰNG NGÀY',fr:'ÉTAPE 2 • VIE QUOTIDIENNE'},
      {start:16,vi:'CHẶNG 3 • NỀN TẢNG A1',fr:'ÉTAPE 3 • FONDATIONS A1'},
      {start:21,vi:'CHẶNG 4 • TRAO ĐỔI ĐẦU TIÊN',fr:'ÉTAPE 4 • PREMIERS ÉCHANGES'}
    ];
    chapters.forEach(chapter => {
      const target = rows[chapter.start - 1];
      if (!target) return;
      const sep = document.createElement('div');
      sep.className = 'curriculum-chapter';
      sep.dataset.chapter = String(chapter.start);
      sep.textContent = T(chapter.vi, chapter.fr);
      target.before(sep);
    });
  }

  function activeStageLesson() {
    const title = document.querySelector('.screen-lesson .topbar h1')?.textContent || '';
    const m = title.match(/(?:Bài|Leçon)\s+(\d+)/i);
    const number = Number(m?.[1]);
    return STAGE2.find(l => l.number === number) || null;
  }

  function injectGrammarNote() {
    const lesson = activeStageLesson();
    const step = document.querySelector('.screen-lesson .lesson-step');
    if (!lesson || !step || step.querySelector('.stage2-grammar-note')) return;
    const note = document.createElement('aside');
    note.className = 'stage2-grammar-note';
    note.innerHTML = `<span>🧩 ${esc(T('Mẫu câu cần nhớ','Structure utile'))}</span><p>${esc(T(lesson.grammarVi, lesson.grammarFr))}</p>`;
    step.appendChild(note);
  }

  let practiceIndex = 0;
  let practiceFeedback = '';
  function normalize(value='') { return String(value).toLocaleLowerCase('fr-FR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ').replace(/[^a-z0-9\s-]/g,' ').replace(/\s+/g,' ').trim(); }
  function accepted(item, value) {
    const a = normalize(item.fr.replace('…',''));
    const b = normalize(value);
    return Boolean(b && (a === b || b.includes(a) || (a.length > 5 && a.includes(b) && b.length >= 4)));
  }

  function injectStagePractice() {
    const root = document.querySelector('.screen-conversation .narrow');
    if (!root) return;
    const known = stage2Known();
    let card = root.querySelector('.stage2-practice-card');
    if (!known.length) { card?.remove(); return; }
    if (!card) {
      card = document.createElement('section');
      card.className = 'card stage2-practice-card';
      const quiet = root.querySelector('.quiet');
      if (quiet) quiet.before(card); else root.appendChild(card);
    }
    const item = known[practiceIndex % known.length];
    card.innerHTML = `<div class="row between"><div><span class="pill">A1 START</span><h2>💬 ${esc(T('Tái sử dụng câu mới','Réutiliser les nouvelles structures'))}</h2></div><span class="muted">${practiceIndex % known.length + 1}/${known.length}</span></div><p>${esc(T(`Hãy nói hoặc viết bằng tiếng Pháp: ${item.vi}`,`Dis ou écris en français : ${item.vi}`))}</p><input data-stage2-input autocomplete="off" placeholder="${esc(T('Câu tiếng Pháp…','Phrase en français…'))}"><button class="secondary full" data-stage2-check>${esc(T('Kiểm tra','Vérifier'))}</button>${practiceFeedback ? `<div class="feedback-box">${esc(practiceFeedback)}</div>` : ''}`;
  }

  function injectProgressStage2() {
    const column = document.querySelector('.screen-progress .progress-layout > div:first-child');
    if (!column || column.querySelector('.stage2-progress-card')) return;
    const known = stage2Known();
    const card = document.createElement('section');
    card.className = 'card stage2-progress-card';
    card.innerHTML = `<div class="section-head"><div><span class="pill">A0 → A1</span><h2>🧩 ${esc(T('Nền tảng A1 đầu tiên','Premières fondations A1'))}</h2></div><span class="muted">${known.length}/${stageItems.length}</span></div><p>${esc(T('Từ Bài 16, Lucie bắt đầu ghép từ vựng với các cấu trúc thật: être, avoir, vouloir, pouvoir, il y a, hiện tại và câu hỏi ngắn.','À partir de la leçon 16, Lucie relie le vocabulaire à de vraies structures : être, avoir, vouloir, pouvoir, il y a, présent et questions courtes.'))}</p><div class="stage2-foundations"><span>être</span><span>avoir</span><span>vouloir</span><span>pouvoir</span><span>il y a</span><span>présent</span><span>questions</span></div>`;
    const learnedCard = [...column.querySelectorAll('.card')].find(c => c.querySelector('h2')?.textContent?.match(/Điều đã học|Éléments appris/i));
    if (learnedCard) learnedCard.before(card); else column.appendChild(card);
  }

  function decorate() {
    patchCounts();
    patchCurriculum();
    injectGrammarNote();
    injectStagePractice();
    injectProgressStage2();
  }

  document.addEventListener('click', event => {
    const check = event.target.closest('[data-stage2-check]');
    if (!check) return;
    const known = stage2Known();
    if (!known.length) return;
    const item = known[practiceIndex % known.length];
    const input = document.querySelector('[data-stage2-input]')?.value || '';
    const ok = accepted(item, input);
    practiceFeedback = ok ? T('✓ Đúng rồi. Chuyển sang câu tiếp theo.','✓ Correct. On passe à la suivante.') : T(`Thử lại với: ${item.fr}`,`Réessaie avec : ${item.fr}`);
    if (ok) {
      window.FrenchTranquilleMemory?.recordPractice?.(item.id, true, 'stage2-text');
      practiceIndex = (practiceIndex + 1) % known.length;
    } else {
      window.FrenchTranquilleMemory?.recordPractice?.(item.id, false, 'stage2-text');
    }
    injectStagePractice();
  });

  const observer = new MutationObserver(() => queueMicrotask(decorate));
  const app = document.getElementById('app');
  if (app) observer.observe(app,{childList:true,subtree:true});
  decorate();

  window.FrenchTranquilleStage2 = { lessons: STAGE2, items: stageItems, version:'1.8.0', build:15 };
}
