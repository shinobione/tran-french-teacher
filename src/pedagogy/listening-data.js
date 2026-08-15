(() => {
  'use strict';

  const CONTRASTS = [
    {id:'chaud-meteo-corps',items:['il-fait-chaud','jai-chaud'],vi:'Trời nóng hay bạn đang nóng?',fr:'Météo chaude ou sensation de chaleur ?'},
    {id:'froid-meteo-corps',items:['il-fait-froid','jai-froid'],vi:'Trời lạnh hay bạn đang lạnh?',fr:'Météo froide ou sensation de froid ?'},
    {id:'rentrer-intention-recent',items:['je-vais-rentrer-futur','je-viens-rentrer'],vi:'Sắp về hay vừa mới về?',fr:'Va rentrer ou vient de rentrer ?'},
    {id:'il-elle-travaille',items:['il-travaille','elle-travaille'],vi:'Nghe đại từ đầu câu: il hay elle?',fr:'Écoute le pronom : il ou elle ?'},
    {id:'midi-minuit',items:['midi','minuit'],vi:'Buổi trưa hay nửa đêm?',fr:'Midi ou minuit ?'},
    {id:'heure-quart-demie',items:['et-quart','et-demie','moins-le-quart'],vi:'Nghe phần cuối của giờ.',fr:'Écoute la fin de l’expression de l’heure.'},
    {id:'prete-je-tu',items:['je-suis-prete','tu-es-prete'],vi:'Ai sẵn sàng: tôi hay bạn?',fr:'Qui est prête : moi ou toi ?'},
    {id:'rentrer-veux-vais-viens',items:['je-veux-rentrer','je-vais-rentrer-futur','je-viens-rentrer'],vi:'Muốn về, sắp về hay vừa về?',fr:'Veut rentrer, va rentrer ou vient de rentrer ?'},
    {id:'heure-date',items:['quelle-heure-est-il','quelle-date'],vi:'Người ta hỏi giờ hay ngày tháng?',fr:'On demande l’heure ou la date ?'},
    {id:'faim-soif',items:['jai-faim','jai-soif'],vi:'Đói hay khát?',fr:'Faim ou soif ?'},
    {id:'gauche-droite',items:['a-gauche','a-droite'],vi:'Trái hay phải?',fr:'Gauche ou droite ?'},
    {id:'billet-simple-retour',items:['aller-simple','aller-retour'],vi:'Vé một chiều hay khứ hồi?',fr:'Aller simple ou aller-retour ?'},
    {id:'emotions',items:['je-suis-contente','je-suis-inquiete','je-suis-stressee'],vi:'Nghe trạng thái cảm xúc.',fr:'Écoute l’état émotionnel.'}
  ];

  const DIALOGUES = [
    {
      id:'cafe-order',icon:'☕',
      titleVi:'Ở quán cà phê',titleFr:'Au café',
      requiredItems:['bonjour','je-voudrais','cafe','svp'],
      lines:[
        {speaker:'A',fr:'Bonjour Madame.'},
        {speaker:'B',fr:"Je voudrais un café, s'il vous plaît."},
        {speaker:'A',fr:'Très bien.'}
      ],
      questionVi:'Người phụ nữ gọi món gì?',questionFr:'Qu’est-ce que la cliente commande ?',
      options:[{vi:'Một ly cà phê',fr:'Un café'},{vi:'Một ly trà',fr:'Un thé'},{vi:'Nước',fr:'De l’eau'}],
      answer:0,evidenceItems:['je-voudrais','cafe']
    },
    {
      id:'train-time',icon:'🚆',
      titleVi:'Ở nhà ga',titleFr:'À la gare',
      requiredItems:['un-billet','quelle-heure','huit','quel-quai'],
      lines:[
        {speaker:'A',fr:'Je voudrais un billet.'},
        {speaker:'B',fr:'À quelle heure ?'},
        {speaker:'A',fr:'À huit heures.'},
        {speaker:'B',fr:'Quel quai ?'}
      ],
      questionVi:'Giờ được nhắc đến là mấy giờ?',questionFr:'Quelle heure est mentionnée ?',
      options:[{vi:'8 giờ',fr:'8 heures'},{vi:'6 giờ',fr:'6 heures'},{vi:'10 giờ',fr:'10 heures'}],
      answer:0,evidenceItems:['quelle-heure','huit']
    },
    {
      id:'phone-return',icon:'📱',
      titleVi:'Điện thoại',titleFr:'Au téléphone',
      requiredItems:['allo','tu-mentends','je-viens-rentrer'],
      lines:[
        {speaker:'A',fr:'Allô ? Tu m’entends ?'},
        {speaker:'B',fr:'Oui. Je viens de rentrer.'}
      ],
      questionVi:'Người thứ hai vừa làm gì?',questionFr:'Qu’est-ce que la deuxième personne vient de faire ?',
      options:[{vi:'Vừa về nhà',fr:'Elle vient de rentrer'},{vi:'Sắp đi làm',fr:'Elle va travailler'},{vi:'Đang ăn',fr:'Elle mange'}],
      answer:0,evidenceItems:['je-viens-rentrer']
    },
    {
      id:'social-fatigue',icon:'🙂',
      titleVi:'Trò chuyện ngắn',titleFr:'Petite conversation',
      requiredItems:['ca-va','ca-va-bien','et-toi','je-suis-tres-fatiguee'],
      lines:[
        {speaker:'A',fr:'Ça va ?'},
        {speaker:'B',fr:'Ça va bien. Et toi ?'},
        {speaker:'A',fr:'Je suis très fatiguée.'}
      ],
      questionVi:'Người cuối cùng cảm thấy thế nào?',questionFr:'Comment se sent la dernière personne ?',
      options:[{vi:'Rất mệt',fr:'Très fatiguée'},{vi:'Rất vui',fr:'Très contente'},{vi:'Đói',fr:'Elle a faim'}],
      answer:0,evidenceItems:['je-suis-tres-fatiguee']
    },
    {
      id:'weather-jacket',icon:'🌦️',
      titleVi:'Trời lạnh',titleFr:'Il fait froid',
      requiredItems:['il-fait-froid','jai-froid','je-prends-veste'],
      lines:[
        {speaker:'A',fr:'Il fait froid.'},
        {speaker:'B',fr:"J'ai froid. Je prends une veste."}
      ],
      questionVi:'Tại sao người thứ hai lấy áo khoác?',questionFr:'Pourquoi la deuxième personne prend-elle une veste ?',
      options:[{vi:'Vì cô ấy lạnh',fr:'Parce qu’elle a froid'},{vi:'Vì cô ấy đói',fr:'Parce qu’elle a faim'},{vi:'Vì trời nóng',fr:'Parce qu’il fait chaud'}],
      answer:0,evidenceItems:['jai-froid','je-prends-veste']
    },
    {
      id:'apartment-hot-water',icon:'🏠',
      titleVi:'Vấn đề trong căn hộ',titleFr:'Problème dans l’appartement',
      requiredItems:['pas-eau-chaude','aidez-moi'],
      lines:[
        {speaker:'A',fr:"Il n'y a pas d'eau chaude."},
        {speaker:'A',fr:"Pouvez-vous m'aider ?"}
      ],
      questionVi:'Vấn đề là gì?',questionFr:'Quel est le problème ?',
      options:[{vi:'Không có nước nóng',fr:'Il n’y a pas d’eau chaude'},{vi:'Không có điện thoại',fr:'Le téléphone ne marche pas'},{vi:'Không tìm thấy nhà ga',fr:'La gare est introuvable'}],
      answer:0,evidenceItems:['pas-eau-chaude','aidez-moi']
    },
    {
      id:'admin-appointment',icon:'📄',
      titleVi:'Tại quầy hành chính',titleFr:'Au guichet administratif',
      requiredItems:['jai-rendez-vous','voici-mon-passeport','pouvez-vous-expliquer'],
      lines:[
        {speaker:'A',fr:"Bonjour. J'ai rendez-vous."},
        {speaker:'A',fr:'Voici mon passeport.'},
        {speaker:'A',fr:"Pouvez-vous m'expliquer ?"}
      ],
      questionVi:'Người này đưa ra giấy tờ gì?',questionFr:'Quel document cette personne présente-t-elle ?',
      options:[{vi:'Hộ chiếu',fr:'Le passeport'},{vi:'Vé tàu',fr:'Un billet de train'},{vi:'Thực đơn',fr:'La carte'}],
      answer:0,evidenceItems:['voici-mon-passeport']
    },
    {
      id:'jerry-call',icon:'❤️',
      titleVi:'Gọi Jerry',titleFr:'Appeler Jerry',
      requiredItems:['tu-me-manques','je-vais-appeler-jerry'],
      lines:[
        {speaker:'A',fr:'Tu me manques.'},
        {speaker:'A',fr:'Je vais appeler Jerry.'}
      ],
      questionVi:'Người này sắp làm gì?',questionFr:'Qu’est-ce que cette personne va faire ?',
      options:[{vi:'Gọi Jerry',fr:'Appeler Jerry'},{vi:'Đi ngủ',fr:'Dormir'},{vi:'Mua vé',fr:'Acheter un billet'}],
      answer:0,evidenceItems:['je-vais-appeler-jerry']
    },
    {
      id:'restaurant-table',icon:'🍽️',
      titleVi:'Vào nhà hàng',titleFr:'Entrer au restaurant',
      requiredItems:['table-deux','la-carte','commander'],
      lines:[
        {speaker:'A',fr:"Une table pour deux, s'il vous plaît."},
        {speaker:'A',fr:"La carte, s'il vous plaît."},
        {speaker:'A',fr:'Je voudrais commander.'}
      ],
      questionVi:'Bàn được yêu cầu cho bao nhiêu người?',questionFr:'Pour combien de personnes la table est-elle demandée ?',
      options:[{vi:'Hai người',fr:'Deux personnes'},{vi:'Một người',fr:'Une personne'},{vi:'Bốn người',fr:'Quatre personnes'}],
      answer:0,evidenceItems:['table-deux']
    },
    {
      id:'time-half-past',icon:'🕣',
      titleVi:'Nghe giờ',titleFr:'Comprendre l’heure',
      requiredItems:['et-demie','je-vais-rentrer-futur'],
      lines:[
        {speaker:'A',fr:'Il est huit heures et demie.'},
        {speaker:'B',fr:'Je vais rentrer.'}
      ],
      questionVi:'Bây giờ là mấy giờ?',questionFr:'Quelle heure est-il ?',
      options:[{vi:'8 giờ 30',fr:'8 h 30'},{vi:'8 giờ 15',fr:'8 h 15'},{vi:'9 giờ kém 15',fr:'8 h 45'}],
      answer:0,evidenceItems:['et-demie']
    }
  ];

  window.FrenchTranquilleListeningData = {
    version:'1.13.0',
    build:20,
    contrasts:CONTRASTS,
    dialogues:DIALOGUES
  };
})();
