const STAGE3_CORE = window.FrenchTranquilleCurriculum;

if (STAGE3_CORE) {
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const LEARNER_KEY = STAGE3_CORE.key;
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const STAGE3 = [
    {
      id:'l26',number:26,icon:'🔢',stage:'a1-core',
      titleVi:'Số 11 đến 20',titleFr:'Les nombres de 11 à 20',
      shortVi:'Nghe và nhận biết nhóm số tiếp theo mà không học cả trăm số cùng lúc.',shortFr:'Reconnaître les nombres 11 à 20 sans avaler toute la numération d’un coup.',
      introVi:'Ta mở rộng những con số đã biết. Hãy nghe nhịp của từ trước khi cố nhớ cách viết.',introFr:'On prolonge les nombres déjà connus. Écoute d’abord leur rythme avant de vouloir tout écrire.',
      grammarVi:'11–16 có tên riêng. 17–19 ghép với dix: dix-sept, dix-huit, dix-neuf. 20 = vingt.',
      grammarFr:'11–16 ont leur propre forme. 17–19 se construisent avec dix : dix-sept, dix-huit, dix-neuf. 20 = vingt.',
      items:[
        {id:'onze-douze',fr:'Onze • douze',vi:'11 • 12'},
        {id:'treize-quatorze',fr:'Treize • quatorze',vi:'13 • 14'},
        {id:'quinze-seize',fr:'Quinze • seize',vi:'15 • 16'},
        {id:'dix-sept',fr:'Dix-sept',vi:'17'},
        {id:'dix-huit',fr:'Dix-huit',vi:'18'},
        {id:'dix-neuf-vingt',fr:'Dix-neuf • vingt',vi:'19 • 20'}
      ],
      challenge:{vi:'Bạn nghe “dix-huit”. Đó là số nào?',fr:'Tu entends « dix-huit ». Quel nombre est-ce ?',answer:'18',options:['18','13','20']}
    },
    {
      id:'l27',number:27,icon:'💶',stage:'a1-core',
      titleVi:'Số lớn hơn & giá tiền',titleFr:'Nombres plus grands & prix',
      shortVi:'20, 30, 40, 50, 60, rồi nhận ra 70/80/90 và 100 trong giá cả.',shortFr:'20, 30, 40, 50, 60 puis repérer 70/80/90 et 100 dans les prix.',
      introVi:'Mục tiêu chưa phải đọc mọi số hoàn hảo: trước tiên hãy nhận ra các mốc quan trọng khi mua hàng.',introFr:'Le but n’est pas encore de réciter tous les nombres : on apprend d’abord les repères utiles pour les prix.',
      grammarVi:'20 vingt • 30 trente • 40 quarante • 50 cinquante • 60 soixante. 70/80/90 có cấu tạo đặc biệt, ta chỉ nhận ra trước.',
      grammarFr:'20 vingt • 30 trente • 40 quarante • 50 cinquante • 60 soixante. 70/80/90 ont une construction particulière : on commence par les reconnaître.',
      items:[
        {id:'vingt',fr:'Vingt',vi:'20'},
        {id:'trente',fr:'Trente',vi:'30'},
        {id:'quarante',fr:'Quarante',vi:'40'},
        {id:'cinquante',fr:'Cinquante',vi:'50'},
        {id:'soixante',fr:'Soixante',vi:'60'},
        {id:'soixante-dix-quatre-vingts',fr:'Soixante-dix • quatre-vingts',vi:'70 • 80'},
        {id:'quatre-vingt-dix-cent',fr:'Quatre-vingt-dix • cent',vi:'90 • 100'}
      ],
      challenge:{vi:'Giá là “quarante euros”. Bao nhiêu?',fr:'Le prix est « quarante euros ». Combien ?',answer:'40 euros',options:['40 euros','14 euros','80 euros']}
    },
    {
      id:'l28',number:28,icon:'📅',stage:'a1-core',
      titleVi:'Các ngày trong tuần',titleFr:'Les jours de la semaine',
      shortVi:'Từ thứ Hai đến Chủ nhật để nói lịch làm việc và hẹn gặp.',shortFr:'Du lundi au dimanche pour parler du travail et des rendez-vous.',
      introVi:'Tên ngày không cần viết hoa trong tiếng Pháp. Hãy học chúng như những mốc trong tuần.',introFr:'Les jours ne prennent normalement pas de majuscule en français. Apprends-les comme des repères dans la semaine.',
      grammarVi:'Trong tiếng Pháp: lundi, mardi… thường viết chữ thường. “Lundi” có thể nghĩa là vào thứ Hai tùy câu.',
      grammarFr:'En français, lundi, mardi… s’écrivent normalement sans majuscule. « Lundi » peut simplement vouloir dire « lundi prochain / ce lundi » selon le contexte.',
      items:[
        {id:'lundi',fr:'Lundi',vi:'Thứ Hai'},
        {id:'mardi',fr:'Mardi',vi:'Thứ Ba'},
        {id:'mercredi',fr:'Mercredi',vi:'Thứ Tư'},
        {id:'jeudi',fr:'Jeudi',vi:'Thứ Năm'},
        {id:'vendredi',fr:'Vendredi',vi:'Thứ Sáu'},
        {id:'samedi',fr:'Samedi',vi:'Thứ Bảy'},
        {id:'dimanche',fr:'Dimanche',vi:'Chủ nhật'}
      ],
      challenge:{vi:'“Dimanche” nghĩa là ngày nào?',fr:'Quel jour signifie « dimanche » ?',answer:'Chủ nhật',options:['Chủ nhật','Thứ Hai','Thứ Sáu']}
    },
    {
      id:'l29',number:29,icon:'🗓️',stage:'a1-core',
      titleVi:'Tháng & ngày tháng',titleFr:'Mois & dates',
      shortVi:'Nhận ra 12 tháng và biết hỏi / nói một ngày đơn giản.',shortFr:'Repérer les 12 mois et demander / donner une date simple.',
      introVi:'Ta gom các tháng theo nhóm để tránh học 12 từ rời rạc trong một lần.',introFr:'On groupe les mois pour éviter d’apprendre douze mots isolés d’un seul coup.',
      grammarVi:'Ngày thường dùng “le + số + tháng”: le 12 août. Ngày mùng 1 dùng “le premier”.',
      grammarFr:'Une date se dit souvent « le + nombre + mois » : le 12 août. Pour le 1er : « le premier ».',
      items:[
        {id:'mois-jan-mar',fr:'Janvier • février • mars',vi:'Tháng 1 • 2 • 3'},
        {id:'mois-avr-juin',fr:'Avril • mai • juin',vi:'Tháng 4 • 5 • 6'},
        {id:'mois-juil-sept',fr:'Juillet • août • septembre',vi:'Tháng 7 • 8 • 9'},
        {id:'mois-oct-dec',fr:'Octobre • novembre • décembre',vi:'Tháng 10 • 11 • 12'},
        {id:'quelle-date',fr:'Quelle est la date ?',vi:'Hôm nay là ngày bao nhiêu?'},
        {id:'nous-sommes-le',fr:'Nous sommes le…',vi:'Hôm nay là ngày…'},
        {id:'mon-anniversaire-le',fr:'Mon anniversaire est le…',vi:'Sinh nhật của tôi là ngày…'}
      ],
      challenge:{vi:'Bạn muốn hỏi hôm nay là ngày bao nhiêu. Câu nào đúng?',fr:'Tu veux demander la date. Quelle phrase convient ?',answer:'Quelle est la date ?',options:['Quelle est la date ?','Quelle heure est-il ?','Quel quai ?']}
    },
    {
      id:'l30',number:30,icon:'🕘',stage:'a1-core',
      titleVi:'Giờ đầy đủ hơn',titleFr:'Dire l’heure plus précisément',
      shortVi:'Giờ đúng, rưỡi, hơn mười lăm, kém mười lăm, trưa và nửa đêm.',shortFr:'Heure pile, et demie, et quart, moins le quart, midi et minuit.',
      introVi:'Giờ Pháp thường dùng vài công thức rất lặp lại. Ta học các mốc dễ nghe nhất.',introFr:'L’heure française utilise quelques formules très répétitives. On apprend d’abord les repères les plus faciles à entendre.',
      grammarVi:'et quart = hơn 15 phút • et demie = rưỡi • moins le quart = kém 15 phút.',
      grammarFr:'et quart = +15 min • et demie = +30 min • moins le quart = -15 min.',
      items:[
        {id:'il-est-huit-heures',fr:'Il est huit heures.',vi:'Bây giờ là 8 giờ.'},
        {id:'et-quart',fr:'Il est huit heures et quart.',vi:'8 giờ 15.'},
        {id:'et-demie',fr:'Il est huit heures et demie.',vi:'8 giờ 30.'},
        {id:'moins-le-quart',fr:'Il est neuf heures moins le quart.',vi:'8 giờ 45.'},
        {id:'midi',fr:'Il est midi.',vi:'12 giờ trưa.'},
        {id:'minuit',fr:'Il est minuit.',vi:'12 giờ đêm.'}
      ],
      challenge:{vi:'“Il est huit heures et demie” là mấy giờ?',fr:'« Il est huit heures et demie » correspond à quelle heure ?',answer:'8:30',options:['8:30','8:15','9:00']}
    },
    {
      id:'l31',number:31,icon:'🔑',stage:'a1-core',
      titleVi:'Mon / ma / mes — đồ của mình',titleFr:'Mon / ma / mes — parler de ses affaires',
      shortVi:'Nói “của tôi” và bắt đầu nhận ra “của bạn” trong đời sống thật.',shortFr:'Dire « mon/ma/mes » et commencer à reconnaître « ton/ta/tes » dans la vie réelle.',
      introVi:'Tiếng Pháp thay đổi từ sở hữu theo danh từ, không theo giới tính của người sở hữu.',introFr:'En français, le possessif dépend du nom possédé, pas du sexe de la personne qui possède.',
      grammarVi:'mon + danh từ giống đực • ma + giống cái • mes + số nhiều. Với “bạn”: ton / ta / tes.',
      grammarFr:'mon + nom masculin • ma + nom féminin • mes + pluriel. Pour « ton » : ton / ta / tes.',
      items:[
        {id:'mon-prenom',fr:'Mon prénom',vi:'Tên của tôi'},
        {id:'ma-famille-poss',fr:'Ma famille',vi:'Gia đình của tôi'},
        {id:'mes-affaires',fr:'Mes affaires',vi:'Đồ đạc của tôi'},
        {id:'ton-telephone',fr:'Ton téléphone',vi:'Điện thoại của bạn'},
        {id:'ta-carte',fr:'Ta carte',vi:'Thẻ / bản đồ của bạn'},
        {id:'tes-cles',fr:'Tes clés',vi:'Chìa khóa của bạn'}
      ],
      challenge:{vi:'Bạn muốn nói “điện thoại của bạn” với Jerry. Câu nào đúng?',fr:'Tu veux dire « ton téléphone » à Jerry. Quelle forme est correcte ?',answer:'Ton téléphone',options:['Ton téléphone','Ta téléphone','Tes téléphone']}
    },
    {
      id:'l32',number:32,icon:'👉',stage:'a1-core',
      titleVi:'Nói với “tu” ở hiện tại',titleFr:'Le présent avec tu',
      shortVi:'Sáu câu rất thường dùng khi nói trực tiếp với người thân.',shortFr:'Six phrases très courantes pour parler directement à un proche.',
      introVi:'Bạn đã quen “je”. Bây giờ ta đổi góc nhìn: nói trực tiếp với Jerry hoặc một người bạn bằng “tu”.',introFr:'Tu connais déjà beaucoup de phrases avec « je ». On change de point de vue pour parler directement à Jerry ou à un proche avec « tu ».',
      grammarVi:'Với nhiều động từ -er: je travaille → tu travailles. Nhưng vouloir/pouvoir/aller có dạng riêng: tu veux, tu peux, tu vas.',
      grammarFr:'Pour beaucoup de verbes en -er : je travaille → tu travailles. Vouloir/pouvoir/aller ont leurs formes : tu veux, tu peux, tu vas.',
      items:[
        {id:'tu-travailles',fr:'Tu travailles ?',vi:'Bạn đang làm việc à?'},
        {id:'tu-habites-ou',fr:'Tu habites où ?',vi:'Bạn sống ở đâu?'},
        {id:'tu-aimes-ca',fr:'Tu aimes ça ?',vi:'Bạn thích cái đó không?'},
        {id:'tu-veux-manger',fr:'Tu veux manger ?',vi:'Bạn muốn ăn không?'},
        {id:'tu-peux-venir',fr:'Tu peux venir ?',vi:'Bạn có thể đến không?'},
        {id:'tu-vas-ou',fr:'Tu vas où ?',vi:'Bạn đi đâu?'}
      ],
      challenge:{vi:'Bạn muốn hỏi Jerry có muốn ăn không. Câu nào tự nhiên?',fr:'Tu veux demander à Jerry s’il veut manger. Quelle phrase est naturelle ?',answer:'Tu veux manger ?',options:['Tu veux manger ?','Tu vouloir manger ?','Tu es manger ?']}
    },
    {
      id:'l33',number:33,icon:'👤',stage:'a1-core',
      titleVi:'Il / elle ở hiện tại',titleFr:'Le présent avec il / elle',
      shortVi:'Nói đơn giản về một người khác mà không học cả bảng động từ.',shortFr:'Parler simplement d’une autre personne sans apprendre un tableau complet.',
      introVi:'Ta dùng cùng một động từ trong hai câu để tai quen với “il” và “elle”.',introFr:'On réutilise les mêmes verbes avec « il » et « elle » pour installer les formes naturellement.',
      grammarVi:'Với nhiều động từ -er, il/elle có dạng giống nhau: il travaille / elle travaille. Với aller: il va / elle va.',
      grammarFr:'Avec beaucoup de verbes en -er, il et elle ont la même forme : il travaille / elle travaille. Avec aller : il va / elle va.',
      items:[
        {id:'il-travaille',fr:'Il travaille.',vi:'Anh ấy làm việc.'},
        {id:'elle-travaille',fr:'Elle travaille.',vi:'Cô ấy làm việc.'},
        {id:'il-habite-ici',fr:'Il habite ici.',vi:'Anh ấy sống ở đây.'},
        {id:'elle-habite-ici',fr:'Elle habite ici.',vi:'Cô ấy sống ở đây.'},
        {id:'il-va-travailler',fr:'Il va travailler.',vi:'Anh ấy đi làm / sẽ làm việc.'},
        {id:'elle-va-rentrer',fr:'Elle va rentrer.',vi:'Cô ấy sẽ về nhà.'}
      ],
      challenge:{vi:'Bạn nói về một phụ nữ sống ở đây. Câu nào đúng?',fr:'Tu parles d’une femme qui habite ici. Quelle phrase convient ?',answer:'Elle habite ici.',options:['Elle habite ici.','Elle habites ici.','Elle suis ici.']}
    },
    {
      id:'l34',number:34,icon:'👥',stage:'a1-core',
      titleVi:'Nous — nói “chúng ta”',titleFr:'Nous — parler de nous',
      shortVi:'Một nhóm nhỏ để nói về hai người cùng làm gì đó.',shortFr:'Un petit groupe pour parler de ce que plusieurs personnes font ensemble.',
      introVi:'“Nous” hơi trang trọng hơn “on” trong lời nói, nhưng rất hữu ích để hiểu cấu trúc. Ta học nó trước, rồi sau này so sánh với “on”.',introFr:'« Nous » est souvent plus formel que « on » à l’oral, mais très utile pour comprendre la structure. On l’installe avant de comparer plus tard avec « on ».',
      grammarVi:'Một số dạng cần nhớ như khối: nous sommes, nous avons, nous allons. Với -er thường có -ons: nous travaillons.',
      grammarFr:'Quelques formes sont à retenir comme des blocs : nous sommes, nous avons, nous allons. Les verbes en -er prennent souvent -ons : nous travaillons.',
      items:[
        {id:'nous-sommes-prets',fr:'Nous sommes prêts.',vi:'Chúng ta sẵn sàng.'},
        {id:'nous-avons-le-temps',fr:'Nous avons le temps.',vi:'Chúng ta có thời gian.'},
        {id:'nous-allons-a',fr:'Nous allons à…',vi:'Chúng ta đi đến…'},
        {id:'nous-mangeons',fr:'Nous mangeons.',vi:'Chúng ta ăn.'},
        {id:'nous-travaillons',fr:'Nous travaillons.',vi:'Chúng ta làm việc.'},
        {id:'nous-rentrons',fr:'Nous rentrons.',vi:'Chúng ta về nhà.'}
      ],
      challenge:{vi:'Bạn và Jerry có thời gian. Bạn nói gì?',fr:'Jerry et toi avez le temps. Que dis-tu ?',answer:'Nous avons le temps.',options:['Nous avons le temps.','Nous a le temps.','Nous sommes le temps.']}
    },
    {
      id:'l35',number:35,icon:'➡️',stage:'a1-core',
      titleVi:'Futur proche — sắp làm gì',titleFr:'Le futur proche — ce qu’on va faire',
      shortVi:'Dùng “aller + động từ” để nói kế hoạch rất gần.',shortFr:'Utiliser « aller + infinitif » pour parler d’un projet proche.',
      introVi:'Đây là một trong những cách hữu ích nhất để nói tương lai trong đời sống hàng ngày.',introFr:'C’est l’une des façons les plus utiles de parler du futur dans la vie quotidienne.',
      grammarVi:'je vais + động từ nguyên mẫu: je vais manger, je vais appeler… Không chia động từ thứ hai.',
      grammarFr:'je vais + infinitif : je vais manger, je vais appeler… Le deuxième verbe reste à l’infinitif.',
      items:[
        {id:'je-vais-manger-futur',fr:'Je vais manger.',vi:'Tôi sắp ăn.'},
        {id:'je-vais-travailler-futur',fr:'Je vais travailler.',vi:'Tôi sắp làm việc.'},
        {id:'je-vais-rentrer-futur',fr:'Je vais rentrer.',vi:'Tôi sắp về nhà.'},
        {id:'je-vais-appeler-jerry',fr:'Je vais appeler Jerry.',vi:'Tôi sẽ gọi cho Jerry.'},
        {id:'je-vais-dormir',fr:'Je vais dormir.',vi:'Tôi sắp đi ngủ.'},
        {id:'on-va-partir',fr:'On va partir.',vi:'Chúng ta sắp đi.'}
      ],
      challenge:{vi:'Bạn sắp gọi Jerry. Câu nào đúng?',fr:'Tu vas appeler Jerry bientôt. Quelle phrase convient ?',answer:'Je vais appeler Jerry.',options:['Je vais appeler Jerry.','Je vais appelle Jerry.','Je appeler Jerry.']}
    },
    {
      id:'l36',number:36,icon:'↩️',stage:'a1-core',
      titleVi:'Venir de — vừa mới làm',titleFr:'Venir de — ce qu’on vient de faire',
      shortVi:'Nói một hành động vừa mới xảy ra bằng một công thức rất đều.',shortFr:'Dire qu’une action vient juste d’avoir lieu avec une structure très régulière.',
      introVi:'“venir de + động từ” rất tiện để kể điều vừa mới xảy ra vài phút trước.',introFr:'« venir de + infinitif » est très pratique pour raconter ce qui vient juste de se passer.',
      grammarVi:'je viens de + động từ nguyên mẫu. Trước nguyên âm: je viens d’arriver.',
      grammarFr:'je viens de + infinitif. Devant une voyelle : je viens d’arriver.',
      items:[
        {id:'je-viens-arriver',fr:"Je viens d'arriver.",vi:'Tôi vừa mới đến.'},
        {id:'je-viens-manger',fr:'Je viens de manger.',vi:'Tôi vừa ăn xong.'},
        {id:'je-viens-finir',fr:'Je viens de finir.',vi:'Tôi vừa xong.'},
        {id:'je-viens-rentrer',fr:'Je viens de rentrer.',vi:'Tôi vừa về nhà.'},
        {id:'il-vient-partir',fr:'Il vient de partir.',vi:'Anh ấy vừa mới đi.'},
        {id:'elle-vient-appeler',fr:"Elle vient d'appeler.",vi:'Cô ấy vừa gọi điện.'}
      ],
      challenge:{vi:'Bạn vừa mới về nhà. Câu nào phù hợp?',fr:'Tu viens juste de rentrer chez toi. Que dis-tu ?',answer:'Je viens de rentrer.',options:['Je viens de rentrer.','Je vais rentrer.','Je suis rentrer.']}
    },
    {
      id:'l37',number:37,icon:'⏮️',stage:'a1-core',
      titleVi:'Passé composé với avoir',titleFr:'Passé composé avec avoir',
      shortVi:'Kể sáu việc rất thường gặp đã xảy ra.',shortFr:'Raconter six actions très courantes déjà terminées.',
      introVi:'Ta không học cả thì quá khứ. Ta bắt đầu bằng sáu câu cực thường dùng và nhận ra mẫu “j’ai + participe passé”.',introFr:'On n’apprend pas tout le passé composé d’un coup. On part de six phrases très fréquentes et du bloc « j’ai + participe passé ».',
      grammarVi:'Mẫu đầu tiên: j’ai + dạng quá khứ: j’ai mangé, j’ai travaillé. Hãy nhớ cả cụm trước khi phân tích.',
      grammarFr:'Premier modèle : j’ai + participe passé : j’ai mangé, j’ai travaillé. Mémorise d’abord le bloc avant l’analyse.',
      items:[
        {id:'jai-mange-passe',fr:"J'ai mangé.",vi:'Tôi đã ăn.'},
        {id:'jai-travaille-passe',fr:"J'ai travaillé.",vi:'Tôi đã làm việc.'},
        {id:'jai-regarde-film-passe',fr:"J'ai regardé un film.",vi:'Tôi đã xem một bộ phim.'},
        {id:'jai-appele-jerry',fr:"J'ai appelé Jerry.",vi:'Tôi đã gọi Jerry.'},
        {id:'jai-achete-ca',fr:"J'ai acheté ça.",vi:'Tôi đã mua cái đó.'},
        {id:'jai-pris-train',fr:"J'ai pris le train.",vi:'Tôi đã đi tàu.'}
      ],
      challenge:{vi:'Bạn đã ăn rồi. Câu nào đúng?',fr:'Tu as déjà mangé. Quelle phrase convient ?',answer:"J'ai mangé.",options:["J'ai mangé.",'Je suis mangé.','Je manger.']}
    },
    {
      id:'l38',number:38,icon:'🚶‍♀️',stage:'a1-core',
      titleVi:'Quá khứ với être — dạng nữ',titleFr:'Le passé avec être — formes féminines',
      shortVi:'Đi, đến, về, ra ngoài… với những dạng phù hợp khi Trân nói về chính mình.',shortFr:'Aller, arriver, rentrer, sortir… avec les formes féminines utiles quand Trân parle d’elle-même.',
      introVi:'Một số động từ chuyển động thường dùng être ở passé composé. Khi Trân nói về mình, dạng viết thường có -e.',introFr:'Certains verbes de déplacement utilisent souvent être au passé composé. Quand Trân parle d’elle-même, la forme écrite prend généralement un -e.',
      grammarVi:'je suis allée / arrivée / rentrée… Dạng nữ có -e trong chữ viết. Khi nói, nhiều cặp nghe giống nhau.',
      grammarFr:'je suis allée / arrivée / rentrée… Le féminin prend -e à l’écrit. À l’oral, beaucoup de ces formes se prononcent pareil.',
      items:[
        {id:'je-suis-allee',fr:'Je suis allée au restaurant.',vi:'Tôi đã đi nhà hàng.'},
        {id:'je-suis-arrivee-passe',fr:'Je suis arrivée à huit heures.',vi:'Tôi đã đến lúc 8 giờ.'},
        {id:'je-suis-rentree',fr:'Je suis rentrée à la maison.',vi:'Tôi đã về nhà.'},
        {id:'je-suis-sortie',fr:'Je suis sortie.',vi:'Tôi đã ra ngoài.'},
        {id:'je-suis-partie',fr:'Je suis partie.',vi:'Tôi đã đi / rời đi.'},
        {id:'je-suis-venue',fr:'Je suis venue avec Jerry.',vi:'Tôi đã đến cùng Jerry.'}
      ],
      challenge:{vi:'Trân nói “Tôi đã về nhà”. Dạng nào đúng?',fr:'Trân veut dire qu’elle est rentrée à la maison. Quelle phrase convient ?',answer:'Je suis rentrée à la maison.',options:['Je suis rentrée à la maison.',"J'ai rentrée à la maison.",'Je rentre hier.']}
    },
    {
      id:'l39',number:39,icon:'📄',stage:'a1-core',
      titleVi:'Hành chính & giấy tờ',titleFr:'Administration & documents',
      shortVi:'Cuộc hẹn, hộ chiếu, tài liệu và xin giải thích một giấy tờ.',shortFr:'Rendez-vous, passeport, document et demander une explication.',
      introVi:'Mục tiêu là đủ câu để không bị im lặng trước một quầy hành chính.',introFr:'Le but est d’avoir assez de phrases pour ne pas rester bloquée devant un guichet administratif.',
      grammarVi:'Trong tình huống lịch sự, “J’ai…”, “Voici…”, “J’ai besoin de…” và “Pouvez-vous…” là những khối rất mạnh.',
      grammarFr:'Dans un contexte formel, « J’ai… », « Voici… », « J’ai besoin de… » et « Pouvez-vous… » sont des blocs très utiles.',
      items:[
        {id:'jai-rendez-vous',fr:"J'ai rendez-vous.",vi:'Tôi có lịch hẹn.'},
        {id:'voici-mon-passeport',fr:'Voici mon passeport.',vi:'Đây là hộ chiếu của tôi.'},
        {id:'jai-besoin-document',fr:"J'ai besoin de ce document.",vi:'Tôi cần tài liệu này.'},
        {id:'je-ne-comprends-document',fr:'Je ne comprends pas ce document.',vi:'Tôi không hiểu tài liệu này.'},
        {id:'pouvez-vous-expliquer',fr:"Pouvez-vous m'expliquer ?",vi:'Bạn có thể giải thích cho tôi không?'},
        {id:'quelle-adresse',fr:"Quelle est l'adresse ?",vi:'Địa chỉ là gì?'}
      ],
      challenge:{vi:'Bạn không hiểu giấy tờ và muốn người ta giải thích. Câu nào hữu ích nhất?',fr:'Tu ne comprends pas le document et tu veux une explication. Quelle phrase est la plus utile ?',answer:"Pouvez-vous m'expliquer ?",options:["Pouvez-vous m'expliquer ?",'Je suis document.','Quel quai ?']}
    },
    {
      id:'l40',number:40,icon:'❤️',stage:'a1-core',
      titleVi:'Cảm xúc, nhu cầu & Jerry',titleFr:'Émotions, besoins & Jerry',
      shortVi:'Nói mình vui, lo, mệt, căng thẳng và cần nói chuyện với người thân.',shortFr:'Dire qu’on est contente, inquiète, fatiguée, stressée et qu’on a besoin de parler.',
      introVi:'A1 không chỉ là mua vé. Ta cần biết nói về trạng thái của mình với người thân.',introFr:'A1 ne sert pas seulement à acheter un billet. Il faut aussi pouvoir dire comment on se sent à quelqu’un de proche.',
      grammarVi:'Với trạng thái: je suis + tính từ. Với nhu cầu: j’ai besoin de… “Tu me manques” = tôi nhớ bạn.',
      grammarFr:'Pour un état : je suis + adjectif. Pour un besoin : j’ai besoin de… « Tu me manques » signifie que l’autre personne nous manque.',
      items:[
        {id:'je-suis-contente',fr:'Je suis contente.',vi:'Tôi vui.'},
        {id:'je-suis-inquiete',fr:'Je suis inquiète.',vi:'Tôi lo lắng.'},
        {id:'je-suis-stressee',fr:'Je suis stressée.',vi:'Tôi căng thẳng.'},
        {id:'je-suis-tres-fatiguee',fr:'Je suis très fatiguée.',vi:'Tôi rất mệt.'},
        {id:'jai-besoin-parler',fr:"J'ai besoin de parler.",vi:'Tôi cần nói chuyện.'},
        {id:'tu-me-manques',fr:'Tu me manques.',vi:'Tôi nhớ bạn.'}
      ],
      challenge:{vi:'Bạn muốn nói với Jerry “Em nhớ anh”. Câu tiếng Pháp nào đúng?',fr:'Tu veux dire à Jerry qu’il te manque. Quelle phrase française convient ?',answer:'Tu me manques.',options:['Tu me manques.','Je te manque.','Tu es manque.']}
    }
  ];

  const stageItems = STAGE3.flatMap(lesson => lesson.items.map(item => ({...item, lessonId:lesson.id, stage:lesson.stage})));
  const lessonIds = new Set(STAGE3_CORE.lessons.map(lesson => lesson.id));
  STAGE3.forEach(lesson => { if (!lessonIds.has(lesson.id)) STAGE3_CORE.lessons.push(lesson); });
  const itemIds = new Set(STAGE3_CORE.items.map(item => item.id));
  STAGE3_CORE.items = [...STAGE3_CORE.items, ...stageItems.filter(item => !itemIds.has(item.id))];
  STAGE3_CORE.stage3 = STAGE3;
  STAGE3_CORE.stage3Items = stageItems;
  STAGE3_CORE.totalLessons = STAGE3_CORE.lessons.length;
  STAGE3_CORE.totalItems = STAGE3_CORE.items.length;

  function activeStage3Lesson() {
    const title = document.querySelector('.screen-lesson .topbar h1')?.textContent || '';
    const match = title.match(/(?:Bài|Leçon)\s+(\d+)/i);
    return STAGE3.find(lesson => lesson.number === Number(match?.[1])) || null;
  }

  function injectGrammarNote() {
    const lesson = activeStage3Lesson();
    const step = document.querySelector('.screen-lesson .lesson-step');
    if (!lesson || !step) return;
    let note = step.querySelector('.stage3-grammar-note');
    if (!note) {
      note = document.createElement('aside');
      note.className = 'stage3-grammar-note';
      step.appendChild(note);
    }
    const signature = `${lesson.id}:${isDebug()?1:0}`;
    if (note.dataset.signature === signature) return;
    note.dataset.signature = signature;
    note.innerHTML = `<span>🧠 ${esc(T('Cấu trúc A1 cần nhớ','Structure A1 utile'))}</span><p>${esc(T(lesson.grammarVi,lesson.grammarFr))}</p>`;
  }

  function patchCurriculumChapter() {
    const list = document.querySelector('.curriculum-card .lesson-list');
    if (!list || list.querySelector('[data-stage3-chapter]')) return;
    const row = [...list.querySelectorAll('.lesson-row')][25];
    if (!row) return;
    const chapter = document.createElement('div');
    chapter.className = 'curriculum-chapter stage3-chapter';
    chapter.dataset.stage3Chapter = '1';
    chapter.textContent = T('CHẶNG 5 • A1 THỰC DỤNG','ÉTAPE 5 • A1 CORE');
    row.before(chapter);
  }

  function injectProgressCard() {
    const column = document.querySelector('.screen-progress .progress-layout > div:first-child');
    if (!column || column.querySelector('.stage3-progress-card')) return;
    const card = document.createElement('section');
    card.className = 'card stage3-progress-card';
    card.innerHTML = `<div class="section-head"><div><span class="pill">A1 CORE</span><h2>🧱 ${esc(T('Khối A1 thực dụng','Bloc A1 pratique'))}</h2></div><span class="muted">15 ${esc(T('bài','leçons'))}</span></div><p>${esc(T('Bài 26–40 thêm số, lịch, giờ, sở hữu, hiện tại với nhiều chủ ngữ, tương lai gần, quá khứ gần, passé composé và những tình huống hành chính / cảm xúc.','Les leçons 26–40 ajoutent nombres, calendrier, heure, possessifs, présent avec plusieurs sujets, futur proche, passé récent, passé composé et situations administratives / émotionnelles.'))}</p><div class="stage3-pill-grid"><span>11→100</span><span>dates</span><span>heure</span><span>possessifs</span><span>tu</span><span>il/elle</span><span>nous</span><span>futur proche</span><span>venir de</span><span>passé composé</span></div>`;
    const errorCard = column.querySelector('.error-intelligence-card');
    if (errorCard) errorCard.insertAdjacentElement('afterend',card); else column.appendChild(card);
  }

  let scheduled = false;
  function decorate() {
    injectGrammarNote();
    patchCurriculumChapter();
    injectProgressCard();
  }
  function scheduleDecorate() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => { scheduled=false; decorate(); });
  }

  const app = document.getElementById('app');
  if (app) new MutationObserver(scheduleDecorate).observe(app,{childList:true,subtree:true});
  decorate();

  window.FrenchTranquilleStage3 = { version:'1.12.0', build:19, lessons:STAGE3, items:stageItems };
}
