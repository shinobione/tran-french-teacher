(() => {
  'use strict';

  const CORE = window.FrenchTranquilleCurriculum;
  if (!CORE?.lessons || !CORE?.items) return;

  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const STAGE4 = [
    {
      id:'l41',number:41,icon:'🔎',stage:'a1-autonomy',
      titleVi:'Hỏi lại & làm rõ',titleFr:'Clarifier & demander de reformuler',
      shortVi:'Không hiểu một từ hay một câu? Biết cách hỏi lại mà không bị kẹt.',shortFr:'Quand un mot ou une phrase bloque, savoir demander une explication sans abandonner.',
      introVi:'Tự chủ không có nghĩa là hiểu mọi thứ. Quan trọng là biết giữ cuộc hội thoại tiếp tục khi bạn chưa hiểu.',introFr:'Être autonome ne veut pas dire tout comprendre : il faut surtout savoir maintenir l’échange quand quelque chose bloque.',
      grammarVi:'Dùng các khối lịch sự: « Qu’est-ce que ça veut dire ? », « Pouvez-vous… ? ». Không cần tạo câu dài.',
      grammarFr:'Blocs utiles : « Qu’est-ce que ça veut dire ? », « Pouvez-vous… ? ». Pas besoin de fabriquer une longue phrase.',
      items:[
        {id:'quest-ce-que-ca-veut-dire',fr:"Qu'est-ce que ça veut dire ?",vi:'Cái đó có nghĩa là gì?'},
        {id:'comment-on-dit-en-francais',fr:'Comment on dit … en français ?',vi:'… nói bằng tiếng Pháp thế nào?'},
        {id:'pouvez-vous-reformuler',fr:'Pouvez-vous reformuler ?',vi:'Bạn có thể nói lại theo cách khác không?'},
        {id:'pouvez-vous-lecrire',fr:"Pouvez-vous l'écrire ?",vi:'Bạn có thể viết nó ra không?'},
        {id:'pas-compris-dernier-mot',fr:"Je n'ai pas compris le dernier mot.",vi:'Tôi không hiểu từ cuối cùng.'},
        {id:'un-exemple-svp',fr:"Un exemple, s'il vous plaît.",vi:'Cho tôi một ví dụ, làm ơn.'}
      ],
      challenge:{vi:'Bạn hiểu câu nhưng không hiểu từ cuối. Bạn nói gì?',fr:'Tu comprends la phrase sauf le dernier mot. Que dis-tu ?',answer:"Je n'ai pas compris le dernier mot.",options:["Je n'ai pas compris le dernier mot.",'Je suis le dernier mot.','Quel quai ?']}
    },
    {
      id:'l42',number:42,icon:'⚖️',stage:'a1-autonomy',
      titleVi:'Số lượng & bao bì',titleFr:'Quantités & emballages',
      shortVi:'Chai, gói, gram, kilo và “một ít” để mua đúng lượng.',shortFr:'Bouteille, paquet, grammes, kilos et « un peu de » pour demander la bonne quantité.',
      introVi:'Trong cửa hàng, biết tên sản phẩm chưa đủ: thường cần nói số lượng hoặc kiểu bao bì.',introFr:'Dans un magasin, le produit ne suffit pas toujours : il faut souvent préciser une quantité ou un emballage.',
      grammarVi:'Sau số lượng thường dùng « de »: une bouteille d’eau, un paquet de riz, deux kilos de tomates.',
      grammarFr:'Après une quantité, on utilise souvent « de » : une bouteille d’eau, un paquet de riz, deux kilos de tomates.',
      items:[
        {id:'une-bouteille-eau',fr:"Une bouteille d'eau.",vi:'Một chai nước.'},
        {id:'un-paquet-riz',fr:'Un paquet de riz.',vi:'Một gói gạo.'},
        {id:'cinq-cents-grammes',fr:"Cinq cents grammes, s'il vous plaît.",vi:'500 gram, làm ơn.'},
        {id:'deux-kilos-svp',fr:"Deux kilos, s'il vous plaît.",vi:'Hai ký, làm ơn.'},
        {id:'un-peu-de',fr:'Un peu de…',vi:'Một ít…'},
        {id:'combien-il-vous-faut',fr:"Combien il vous faut ?",vi:'Bạn cần bao nhiêu?'}
      ],
      challenge:{vi:'Bạn muốn một chai nước. Câu nào đúng?',fr:'Tu veux une bouteille d’eau. Quelle phrase convient ?',answer:"Une bouteille d'eau.",options:["Une bouteille d'eau.",'Une bouteille de la eau.','Un eau bouteille.']}
    },
    {
      id:'l43',number:43,icon:'↔️',stage:'a1-autonomy',
      titleVi:'So sánh & lựa chọn',titleFr:'Comparer & choisir',
      shortVi:'Đắt hơn, rẻ hơn, lớn hơn và chọn một món cụ thể.',shortFr:'Plus cher, moins cher, plus grand et choisir concrètement entre plusieurs options.',
      introVi:'Khi mua hàng hoặc chọn một dịch vụ, bạn cần so sánh trước khi quyết định.',introFr:'Pour acheter ou choisir un service, il faut souvent comparer avant de décider.',
      grammarVi:'« plus + tính từ » = hơn; « moins + tính từ » = ít hơn. Celui-ci / celui-là giúp chỉ một món giống đực.',
      grammarFr:'« plus + adjectif » et « moins + adjectif » servent à comparer. Celui-ci / celui-là désignent un objet masculin.',
      items:[
        {id:'cest-plus-cher',fr:"C'est plus cher.",vi:'Cái này đắt hơn.'},
        {id:'cest-moins-cher',fr:"C'est moins cher.",vi:'Cái này rẻ hơn.'},
        {id:'cest-plus-grand',fr:"C'est plus grand.",vi:'Cái này lớn hơn.'},
        {id:'je-prefere-celui-ci',fr:'Je préfère celui-ci.',vi:'Tôi thích cái này hơn.'},
        {id:'lequel-est-mieux',fr:'Lequel est mieux ?',vi:'Cái nào tốt hơn?'},
        {id:'je-prends-celui-la',fr:'Je prends celui-là.',vi:'Tôi lấy cái kia.'}
      ],
      challenge:{vi:'Bạn muốn chọn món rẻ hơn. Câu nào mô tả đúng?',fr:'Tu veux repérer l’option moins chère. Quelle phrase convient ?',answer:"C'est moins cher.",options:["C'est moins cher.","C'est plus cher.",'Je suis moins cher.']}
    },
    {
      id:'l44',number:44,icon:'🥂',stage:'a1-autonomy',
      titleVi:'Mời, đề nghị & từ chối lịch sự',titleFr:'Proposer, inviter & refuser poliment',
      shortVi:'Rủ ai đó, đồng ý, từ chối và đề nghị một lần khác.',shortFr:'Inviter quelqu’un, accepter, refuser et proposer une autre fois.',
      introVi:'Một cuộc sống bằng tiếng Pháp cũng có lời mời, kế hoạch và những lúc bạn không thể đi.',introFr:'Vivre en français, c’est aussi recevoir des invitations, faire des projets et parfois dire non.',
      grammarVi:'Với người thân, « Tu veux… ? » và « Ça te va ? » rất tự nhiên. « On » sẽ xuất hiện dần trong các kế hoạch chung.',
      grammarFr:'Avec un proche, « Tu veux… ? » et « Ça te va ? » sont naturels. « On » apparaît progressivement pour les projets communs.',
      items:[
        {id:'tu-veux-venir-avec-nous',fr:'Tu veux venir avec nous ?',vi:'Bạn muốn đi cùng chúng tôi không?'},
        {id:'on-se-retrouve-a',fr:'On se retrouve à…',vi:'Chúng ta gặp nhau lúc / ở…'},
        {id:'avec-plaisir',fr:'Avec plaisir.',vi:'Rất vui / được thôi.'},
        {id:'desolee-je-ne-peux-pas',fr:'Désolée, je ne peux pas.',vi:'Xin lỗi, tôi không thể.'},
        {id:'une-autre-fois',fr:'Une autre fois ?',vi:'Một lần khác nhé?'},
        {id:'ca-te-va',fr:'Ça te va ?',vi:'Như vậy có ổn với bạn không?'}
      ],
      challenge:{vi:'Bạn không thể đi nhưng muốn từ chối lịch sự. Câu nào phù hợp?',fr:'Tu ne peux pas venir et tu veux refuser poliment. Quelle phrase convient ?',answer:'Désolée, je ne peux pas.',options:['Désolée, je ne peux pas.','Non jamais.','Je suis impossible.']}
    },
    {
      id:'l45',number:45,icon:'🩺',stage:'a1-autonomy',
      titleVi:'Sức khỏe & hẹn bác sĩ',titleFr:'Santé & rendez-vous médical',
      shortVi:'Nói đau ở đâu, từ bao giờ, sốt và xin lịch khám.',shortFr:'Dire où on a mal, depuis quand, signaler de la fièvre et demander un rendez-vous.',
      introVi:'Mục tiêu không phải chẩn đoán bệnh: chỉ cần mô tả vấn đề đủ rõ để xin giúp đỡ.',introFr:'Le but n’est pas de poser un diagnostic : seulement décrire assez clairement le problème pour obtenir de l’aide.',
      grammarVi:'« J’ai mal à… » dùng để nói đau. Với thời gian: « depuis hier », « depuis ce matin ».',
      grammarFr:'« J’ai mal à… » sert à localiser une douleur. Pour la durée : « depuis hier », « depuis ce matin ».',
      items:[
        {id:'jai-mal-tete',fr:"J'ai mal à la tête.",vi:'Tôi đau đầu.'},
        {id:'jai-mal-ventre',fr:"J'ai mal au ventre.",vi:'Tôi đau bụng.'},
        {id:'depuis-hier',fr:'Depuis hier.',vi:'Từ hôm qua.'},
        {id:'jai-de-la-fievre',fr:"J'ai de la fièvre.",vi:'Tôi bị sốt.'},
        {id:'rendez-vous-medecin',fr:"Je voudrais un rendez-vous avec un médecin.",vi:'Tôi muốn đặt lịch với bác sĩ.'},
        {id:'cest-urgent',fr:"C'est urgent ?",vi:'Có khẩn cấp không?'}
      ],
      challenge:{vi:'Bạn đau bụng từ hôm qua. Hai mảnh nào hữu ích?',fr:'Tu as mal au ventre depuis hier. Quelles expressions sont utiles ?',answer:"J'ai mal au ventre. Depuis hier.",options:["J'ai mal au ventre. Depuis hier.","J'ai chaud. Demain.",'Je suis ventre.']}
    },
    {
      id:'l46',number:46,icon:'💊',stage:'a1-autonomy',
      titleVi:'Thuốc & hiệu thuốc',titleFr:'Médicaments & pharmacie',
      shortVi:'Nói thuốc đang dùng, dị ứng, liều dùng và hỏi trước/sau bữa ăn.',shortFr:'Parler d’un médicament, d’une allergie, de la fréquence et du moment de prise.',
      introVi:'Ở hiệu thuốc, vài câu rõ ràng giúp tránh hiểu nhầm quan trọng.',introFr:'À la pharmacie, quelques questions claires permettent d’éviter des malentendus importants.',
      grammarVi:'« Combien de fois par jour ? » hỏi tần suất. « Je peux… ? » dùng để kiểm tra một khả năng.',
      grammarFr:'« Combien de fois par jour ? » demande la fréquence. « Je peux… ? » permet de vérifier une possibilité.',
      items:[
        {id:'je-prends-ce-medicament',fr:'Je prends ce médicament.',vi:'Tôi đang dùng thuốc này.'},
        {id:'combien-fois-par-jour',fr:'Combien de fois par jour ?',vi:'Mỗi ngày bao nhiêu lần?'},
        {id:'avant-ou-apres-repas',fr:'Avant ou après le repas ?',vi:'Trước hay sau bữa ăn?'},
        {id:'jai-une-allergie',fr:"J'ai une allergie.",vi:'Tôi bị dị ứng.'},
        {id:'sans-ordonnance',fr:'Sans ordonnance ?',vi:'Không cần đơn thuốc à?'},
        {id:'je-peux-prendre-ca',fr:'Je peux prendre ça ?',vi:'Tôi có thể dùng cái này không?'}
      ],
      challenge:{vi:'Bạn muốn biết uống thuốc mấy lần mỗi ngày. Bạn hỏi gì?',fr:'Tu veux connaître la fréquence de prise. Que demandes-tu ?',answer:'Combien de fois par jour ?',options:['Combien de fois par jour ?','Combien ça coûte ?','Quelle heure est-il ?']}
    },
    {
      id:'l47',number:47,icon:'🧰',stage:'a1-interaction',
      titleVi:'Công việc & hướng dẫn',titleFr:'Travail & consignes',
      shortVi:'Hỏi phải làm gì, báo đã xong và xin người khác chỉ lại.',shortFr:'Demander quoi faire, dire qu’on a terminé et demander qu’on montre à nouveau.',
      introVi:'Một hướng dẫn không hiểu không phải là thất bại. Bạn cần biết cách dừng lại và làm rõ.',introFr:'Ne pas comprendre une consigne n’est pas un échec : il faut savoir s’arrêter et demander une clarification.',
      grammarVi:'« devoir + động từ » nói điều phải làm. « Je peux… ? » giúp xin phép thử lại.',
      grammarFr:'« devoir + infinitif » exprime ce qu’il faut faire. « Je peux… ? » permet de demander l’autorisation de recommencer.',
      items:[
        {id:'quest-ce-que-je-dois-faire',fr:"Qu'est-ce que je dois faire ?",vi:'Tôi phải làm gì?'},
        {id:'je-dois-aller-ou',fr:'Je dois aller où ?',vi:'Tôi phải đi đâu?'},
        {id:'jai-termine',fr:"J'ai terminé.",vi:'Tôi đã làm xong.'},
        {id:'pas-compris-consigne',fr:"Je n'ai pas compris la consigne.",vi:'Tôi không hiểu hướng dẫn.'},
        {id:'je-peux-recommencer',fr:'Je peux recommencer ?',vi:'Tôi có thể làm lại không?'},
        {id:'montrez-moi-svp',fr:"Montrez-moi, s'il vous plaît.",vi:'Hãy chỉ cho tôi, làm ơn.'}
      ],
      challenge:{vi:'Bạn không hiểu hướng dẫn. Câu nào rõ nhất?',fr:'Tu ne comprends pas la consigne. Quelle phrase est la plus claire ?',answer:"Je n'ai pas compris la consigne.",options:["Je n'ai pas compris la consigne.",'Je suis consigne.','Je vais consigne.']}
    },
    {
      id:'l48',number:48,icon:'🔧',stage:'a1-interaction',
      titleVi:'Báo hỏng & xin sửa chữa',titleFr:'Signaler une panne & demander une intervention',
      shortVi:'Rò nước, sưởi, đèn và xin cử người đến sửa.',shortFr:'Fuite, chauffage, lumière et demander l’envoi de quelqu’un pour intervenir.',
      introVi:'Bạn đã biết « không có nước nóng ». Bây giờ ta học cách mô tả vấn đề và yêu cầu giải pháp.',introFr:'Tu sais déjà signaler l’absence d’eau chaude. Maintenant, on décrit le problème et on demande une solution.',
      grammarVi:'« Il y a… » báo một vấn đề tồn tại. « ne marche pas » dùng cho thiết bị không hoạt động.',
      grammarFr:'« Il y a… » signale un problème présent. « ne marche pas » convient à un équipement qui ne fonctionne pas.',
      items:[
        {id:'probleme-dans-appartement',fr:"J'ai un problème dans l'appartement.",vi:'Tôi có vấn đề trong căn hộ.'},
        {id:'il-y-a-une-fuite',fr:'Il y a une fuite.',vi:'Có chỗ rò nước.'},
        {id:'chauffage-ne-marche-pas',fr:'Le chauffage ne marche pas.',vi:'Hệ thống sưởi không hoạt động.'},
        {id:'lumiere-ne-marche-pas',fr:'La lumière ne marche pas.',vi:'Đèn không hoạt động.'},
        {id:'pouvez-vous-envoyer-quelquun',fr:"Pouvez-vous envoyer quelqu'un ?",vi:'Bạn có thể cử ai đó đến không?'},
        {id:'quand-pouvez-vous-venir',fr:'Quand pouvez-vous venir ?',vi:'Khi nào bạn có thể đến?'}
      ],
      challenge:{vi:'Có chỗ rò nước và bạn cần người đến. Câu nào yêu cầu giải pháp?',fr:'Il y a une fuite et tu as besoin d’une intervention. Quelle phrase demande une solution ?',answer:"Pouvez-vous envoyer quelqu'un ?",options:["Pouvez-vous envoyer quelqu'un ?",'Je préfère une fuite.','Quel quai ?']}
    },
    {
      id:'l49',number:49,icon:'🚉',stage:'a1-interaction',
      titleVi:'Tàu trễ, hủy & đổi đường',titleFr:'Retard, annulation & correspondance',
      shortVi:'Tàu trễ, bị hủy, lỡ chuyến nối và tìm phương án khác.',shortFr:'Train en retard ou annulé, correspondance ratée et recherche d’une autre solution.',
      introVi:'Đi lại thật không phải lúc nào cũng đúng giờ. Ta học ngôn ngữ để phản ứng khi kế hoạch thay đổi.',introFr:'Dans la vraie vie, les transports ne suivent pas toujours le plan. On apprend à réagir quand ça change.',
      grammarVi:'« être en retard / annulé » mô tả tình trạng. « Je vais + động từ » giúp nói hậu quả sắp xảy ra.',
      grammarFr:'« être en retard / annulé » décrit l’état du transport. « Je vais + infinitif » exprime une conséquence proche.',
      items:[
        {id:'train-est-en-retard',fr:'Le train est en retard.',vi:'Tàu bị trễ.'},
        {id:'train-est-annule',fr:'Le train est annulé.',vi:'Tàu bị hủy.'},
        {id:'rater-correspondance',fr:'Je vais rater ma correspondance.',vi:'Tôi sẽ lỡ chuyến nối.'},
        {id:'quel-autre-train',fr:'Quel autre train ?',vi:'Có chuyến tàu nào khác?'},
        {id:'ou-est-arret-bus',fr:"Où est l'arrêt de bus ?",vi:'Trạm xe buýt ở đâu?'},
        {id:'ce-bus-va-a',fr:'Ce bus va à… ?',vi:'Xe buýt này có đi đến… không?'}
      ],
      challenge:{vi:'Tàu không chạy nữa hôm nay. Câu nào mô tả đúng?',fr:'Le train ne part plus. Quelle phrase décrit la situation ?',answer:'Le train est annulé.',options:['Le train est annulé.','Le train est à gauche.','Je suis le train.']}
    },
    {
      id:'l50',number:50,icon:'🧵',stage:'a1-interaction',
      titleVi:'Kể chuyện theo thứ tự',titleFr:'Raconter dans l’ordre',
      shortVi:'Nối vài hành động đơn giản bằng “đầu tiên, sau đó, rồi, cuối cùng”.',shortFr:'Relier quelques actions simples avec « d’abord, ensuite, après, puis, finalement ».',
      introVi:'Bạn đã có những câu ở quá khứ. Bây giờ ta nối chúng để kể một chuyện nhỏ thay vì sáu câu rời rạc.',introFr:'Tu as déjà des phrases au passé. On apprend maintenant à les relier pour raconter un petit événement.',
      grammarVi:'Các từ nối không thay đổi động từ: D’abord… Ensuite… Puis… Finalement… Chúng chỉ làm câu chuyện rõ hơn.',
      grammarFr:'Les connecteurs ne changent pas le verbe : D’abord… Ensuite… Puis… Finalement… Ils structurent simplement le récit.',
      items:[
        {id:'dabord',fr:"D'abord…",vi:'Đầu tiên…'},
        {id:'ensuite',fr:'Ensuite…',vi:'Tiếp theo…'},
        {id:'apres-connecteur',fr:'Après…',vi:'Sau đó…'},
        {id:'puis',fr:'Puis…',vi:'Rồi…'},
        {id:'finalement',fr:'Finalement…',vi:'Cuối cùng…'},
        {id:'finalement-je-suis-rentree',fr:'Finalement, je suis rentrée.',vi:'Cuối cùng, tôi đã về nhà.'}
      ],
      challenge:{vi:'Bạn muốn kết thúc một câu chuyện nhỏ. Từ nối nào phù hợp?',fr:'Tu veux terminer un petit récit. Quel connecteur convient ?',answer:'Finalement…',options:['Finalement…',"D'abord…",'Combien ?']}
    },
    {
      id:'l51',number:51,icon:'💭',stage:'a1-interaction',
      titleVi:'Nói ý kiến của mình',titleFr:'Donner son avis simplement',
      shortVi:'“Tôi nghĩ”, “tôi thấy”, đồng ý, không đồng ý và “còn tùy”.',shortFr:'« Je pense », « je trouve », être d’accord, ne pas être d’accord et dire « ça dépend ».',
      introVi:'Một cuộc hội thoại không chỉ là trao đổi thông tin. Bạn cũng cần nói mình nghĩ gì.',introFr:'Une conversation ne sert pas seulement à échanger des informations : il faut aussi pouvoir dire ce qu’on pense.',
      grammarVi:'Sau « Je pense que… / Je trouve que… », bạn có thể dùng một câu rất đơn giản đã biết.',
      grammarFr:'Après « Je pense que… / Je trouve que… », une proposition très simple suffit.',
      items:[
        {id:'je-pense-que',fr:'Je pense que…',vi:'Tôi nghĩ rằng…'},
        {id:'je-trouve-que',fr:'Je trouve que…',vi:'Tôi thấy / tôi cho rằng…'},
        {id:'je-suis-daccord',fr:"Je suis d'accord.",vi:'Tôi đồng ý.'},
        {id:'je-ne-suis-pas-daccord',fr:"Je ne suis pas d'accord.",vi:'Tôi không đồng ý.'},
        {id:'ca-depend',fr:'Ça dépend.',vi:'Còn tùy.'},
        {id:'pour-moi',fr:'Pour moi…',vi:'Theo tôi…'}
      ],
      challenge:{vi:'Bạn muốn nói “Tôi không đồng ý”. Câu nào đúng?',fr:'Tu veux dire que tu n’es pas d’accord. Quelle phrase convient ?',answer:"Je ne suis pas d'accord.",options:["Je ne suis pas d'accord.","Je n'ai pas accord.",'Je suis non.']}
    },
    {
      id:'l52',number:52,icon:'🗣️',stage:'a1-interaction',
      titleVi:'“On” trong tiếng Pháp nói',titleFr:'Le “on” du français oral',
      shortVi:'Hiểu và dùng “on” cho kế hoạch chung trong lời nói tự nhiên.',shortFr:'Comprendre et utiliser « on » pour les projets communs dans le français parlé.',
      introVi:'Bạn đã học « nous ». Trong hội thoại hàng ngày, người Pháp rất thường dùng « on » để nói “chúng ta”.',introFr:'Tu connais « nous ». Dans la conversation quotidienne, les francophones utilisent très souvent « on » pour dire « nous ».',
      grammarVi:'« on » chia động từ như « il/elle »: on va, on peut, on doit. Nghĩa trong các câu này thường là “chúng ta”.',
      grammarFr:'« on » se conjugue comme « il/elle » : on va, on peut, on doit. Dans ces phrases, il signifie souvent « nous ».',
      items:[
        {id:'on-va-manger',fr:'On va manger ?',vi:'Chúng ta đi ăn nhé?'},
        {id:'on-va-ou',fr:'On va où ?',vi:'Chúng ta đi đâu?'},
        {id:'on-se-retrouve',fr:'On se retrouve à…',vi:'Chúng ta gặp nhau lúc / ở…'},
        {id:'on-peut-y-aller',fr:'On peut y aller.',vi:'Chúng ta có thể đi rồi.'},
        {id:'on-doit-partir',fr:'On doit partir.',vi:'Chúng ta phải đi.'},
        {id:'on-rentre',fr:'On rentre ?',vi:'Chúng ta về nhé?'}
      ],
      challenge:{vi:'Jerry đề nghị hai người về nhà. Câu nói tự nhiên nào bạn có thể nghe?',fr:'Jerry propose de rentrer ensemble. Quelle phrase orale naturelle peux-tu entendre ?',answer:'On rentre ?',options:['On rentre ?','Nous êtes rentrer ?','Je suis rentrer ?']}
    }
  ];

  const stageItems = STAGE4.flatMap(lesson => lesson.items.map(item => ({...item, lessonId:lesson.id, stage:lesson.stage})));
  const existingLessonIds = new Set(CORE.lessons.map(lesson => lesson.id));
  STAGE4.forEach(lesson => { if (!existingLessonIds.has(lesson.id)) CORE.lessons.push(lesson); });
  const existingItemIds = new Set(CORE.items.map(item => item.id));
  CORE.items = [...CORE.items, ...stageItems.filter(item => !existingItemIds.has(item.id))];
  CORE.stage4 = STAGE4;
  CORE.stage4Items = stageItems;
  CORE.totalLessons = CORE.lessons.length;
  CORE.totalItems = CORE.items.length;

  function activeLesson() {
    const title = document.querySelector('.screen-lesson .topbar h1')?.textContent || '';
    const match = title.match(/(?:Bài|Leçon)\s+(\d+)/i);
    return STAGE4.find(lesson => lesson.number === Number(match?.[1])) || null;
  }

  function injectGrammarNote() {
    const lesson = activeLesson();
    const step = document.querySelector('.screen-lesson .lesson-step');
    if (!lesson || !step) return;
    let note = step.querySelector('.stage4-grammar-note');
    if (!note) {
      note = document.createElement('aside');
      note.className = 'stage4-grammar-note';
      step.appendChild(note);
    }
    const signature = `${lesson.id}:${isDebug()?1:0}`;
    if (note.dataset.signature === signature) return;
    note.dataset.signature = signature;
    note.innerHTML = `<span>🧭 ${esc(T('Cấu trúc để tự xoay xở','Structure pour devenir autonome'))}</span><p>${esc(T(lesson.grammarVi, lesson.grammarFr))}</p>`;
  }

  let scheduled = false;
  function decorate() { injectGrammarNote(); }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => { scheduled = false; decorate(); });
  }
  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
  decorate();

  window.FrenchTranquilleStage4 = { version:'2.2.0', build:32, lessons:STAGE4, items:stageItems };
})();