(() => {
  const S = [
    {
      id:'cafe',icon:'☕',titleVi:'Ở quán cà phê',titleFr:'Au café',
      descVi:'Gọi đồ uống, trả lời một câu hỏi ngắn và kết thúc lịch sự.',descFr:'Commander une boisson, répondre à une question courte et terminer poliment.',
      requiredLessons:['l4'],
      turns:[
        {npcFr:'Bonjour Madame, vous désirez ?',npcVi:'Xin chào, cô muốn dùng gì?',promptVi:'Hãy gọi một ly cà phê một cách lịch sự.',promptFr:'Commande un café poliment.',answers:["Je voudrais un café, s'il vous plaît.",'Je voudrais un café.'],model:"Je voudrais un café, s'il vous plaît.",hintVi:'Bắt đầu bằng “Je voudrais…”',hintFr:'Commence par « Je voudrais… »',items:['je-voudrais','cafe','svp']},
        {npcFr:'Avec du lait ?',npcVi:'Có sữa không?',promptVi:'Bạn không muốn sữa. Trả lời ngắn và lịch sự.',promptFr:'Tu ne veux pas de lait. Réponds brièvement et poliment.',answers:['Non, merci.','Non merci.'],model:'Non, merci.',hintVi:'Dùng “Non” + một từ lịch sự.',hintFr:'Utilise « Non » + un mot poli.',items:['non','merci']},
        {npcFr:"Très bien. C'est tout ?",npcVi:'Được rồi. Chỉ vậy thôi phải không?',promptVi:'Đúng, chỉ vậy thôi. Cảm ơn.',promptFr:"Oui, c'est tout. Remercie.",answers:["Oui, c'est tout, merci.","Oui, c'est tout. Merci.",'Oui, merci.'],model:"Oui, c'est tout, merci.",hintVi:'Bạn có thể dùng “Oui” và “merci”.',hintFr:'Tu peux utiliser « Oui » et « merci ».',items:['oui','merci','cest-tout']}
      ]
    },
    {
      id:'gare',icon:'🚆',titleVi:'Ở nhà ga',titleFr:'À la gare',
      descVi:'Nói điểm đến, chọn vé và hỏi sân ga.',descFr:'Donner la destination, choisir le billet et demander le quai.',
      requiredLessons:['l9'],
      turns:[
        {npcFr:'Bonjour. Vous allez où ?',npcVi:'Xin chào. Cô đi đâu?',promptVi:'Nói rằng bạn đi Toulouse.',promptFr:'Dis que tu vas à Toulouse.',answers:['Je vais à Toulouse.','Je vais a Toulouse.'],model:'Je vais à Toulouse.',hintVi:'Dùng cấu trúc “Je vais à…”',hintFr:'Utilise « Je vais à… »',items:['je-vais-a']},
        {npcFr:'Un aller simple ou un aller-retour ?',npcVi:'Một chiều hay khứ hồi?',promptVi:'Bạn muốn vé một chiều.',promptFr:'Tu veux un aller simple.',answers:['Un aller simple.','Je voudrais un aller simple.'],model:'Un aller simple.',hintVi:'Cụm từ đã học bắt đầu bằng “Un aller…”',hintFr:'La formule commence par « Un aller… »',items:['aller-simple']},
        {npcFr:'Très bien. Le train part bientôt.',npcVi:'Được rồi. Tàu sắp chạy.',promptVi:'Hỏi sân ga nào.',promptFr:'Demande quel quai.',answers:['Quel quai ?','Quel quai, s’il vous plaît ?','Quel quai, s\'il vous plaît ?'],model:'Quel quai ?',hintVi:'Chỉ cần hai từ.',hintFr:'Deux mots suffisent.',items:['quel-quai']}
      ]
    },
    {
      id:'restaurant',icon:'🍽️',titleVi:'Ở nhà hàng',titleFr:'Au restaurant',
      descVi:'Xin bàn, xin thực đơn và bắt đầu gọi món.',descFr:'Demander une table, la carte et commencer à commander.',
      requiredLessons:['l12'],
      turns:[
        {npcFr:'Bonsoir, vous êtes combien ?',npcVi:'Chào buổi tối, có mấy người?',promptVi:'Xin một bàn cho hai người.',promptFr:'Demande une table pour deux.',answers:['Une table pour deux, s’il vous plaît.','Une table pour deux, s\'il vous plaît.','Une table pour deux.'],model:'Une table pour deux, s’il vous plaît.',hintVi:'Bắt đầu bằng “Une table…”',hintFr:'Commence par « Une table… »',items:['table-deux','svp']},
        {npcFr:'Voilà votre table.',npcVi:'Đây là bàn của cô.',promptVi:'Xin thực đơn.',promptFr:'Demande la carte.',answers:['La carte, s’il vous plaît.','La carte, s\'il vous plaît.','La carte.'],model:'La carte, s’il vous plaît.',hintVi:'Từ “carte” ở đây là thực đơn.',hintFr:'Ici « carte » signifie le menu.',items:['la-carte','svp']},
        {npcFr:'Vous avez choisi ?',npcVi:'Cô chọn xong chưa?',promptVi:'Nói rằng bạn muốn gọi món.',promptFr:'Dis que tu voudrais commander.',answers:['Je voudrais commander.','Je veux commander.'],model:'Je voudrais commander.',hintVi:'Dùng “Je voudrais…”',hintFr:'Utilise « Je voudrais… »',items:['commander','je-voudrais']}
      ]
    },
    {
      id:'supermarche',icon:'🛒',titleVi:'Ở siêu thị',titleFr:'Au supermarché',
      descVi:'Tìm đồ ăn cơ bản và kết thúc mua sắm.',descFr:'Chercher quelques aliments et terminer ses achats.',
      requiredLessons:['l11','l22'],
      turns:[
        {npcFr:'Bonjour, vous cherchez quelque chose ?',npcVi:'Xin chào, cô đang tìm gì?',promptVi:'Nói rằng bạn đang tìm sữa.',promptFr:'Dis que tu cherches du lait.',answers:['Je cherche du lait.','Je cherche le lait.'],model:'Je cherche du lait.',hintVi:'Dùng “Je cherche…” + “du lait”.',hintFr:'Utilise « Je cherche… » + « du lait ».',items:['je-cherche','du-lait']},
        {npcFr:"C'est juste ici. Autre chose ?",npcVi:'Ở ngay đây. Còn gì nữa không?',promptVi:'Bạn muốn trứng.',promptFr:'Tu veux des œufs.',answers:['Des œufs.','Des oeufs.','Je voudrais des œufs.','Je voudrais des oeufs.'],model:'Des œufs.',hintVi:'Dùng “des…”',hintFr:'Utilise « des… »',items:['des-oeufs','je-voudrais']},
        {npcFr:'Très bien. Autre chose ?',npcVi:'Được rồi. Còn gì nữa không?',promptVi:'Không, chỉ vậy thôi. Cảm ơn.',promptFr:"Non, c'est tout. Remercie.",answers:["Non, c'est tout, merci.","C'est tout, merci.",'Non, merci.'],model:"C'est tout, merci.",hintVi:'Câu đã học có “C’est tout…”',hintFr:'La phrase apprise contient « C’est tout… »',items:['cest-tout','merci','non']}
      ]
    },
    {
      id:'pharmacie',icon:'🩺',titleVi:'Ở hiệu thuốc',titleFr:'À la pharmacie',
      descVi:'Nói triệu chứng đơn giản và yêu cầu trợ giúp.',descFr:'Décrire un symptôme simple et demander de l’aide.',
      requiredLessons:['l13'],
      turns:[
        {npcFr:"Bonjour Madame. Qu'est-ce qui ne va pas ?",npcVi:'Xin chào. Cô bị sao?',promptVi:'Nói rằng bạn đau đầu.',promptFr:'Dis que tu as mal à la tête.',answers:["J'ai mal à la tête.","J'ai mal a la tete."],model:"J'ai mal à la tête.",hintVi:'Bắt đầu bằng “J’ai mal…”',hintFr:'Commence par « J’ai mal… »',items:['mal-tete']},
        {npcFr:'Depuis longtemps ?',npcVi:'Đã lâu chưa?',promptVi:'Bạn chưa biết nói thời gian. Chỉ cần nói rằng bạn đang bị ốm.',promptFr:'Tu ne sais pas encore préciser la durée. Dis simplement que tu es malade.',answers:['Je suis malade.'],model:'Je suis malade.',hintVi:'Dùng “Je suis…”',hintFr:'Utilise « Je suis… »',items:['je-suis-malade']},
        {npcFr:'Si ça continue, il faut consulter.',npcVi:'Nếu tiếp tục, cô nên đi khám.',promptVi:'Nói rằng bạn cần bác sĩ.',promptFr:'Dis que tu as besoin d’un médecin.',answers:["J'ai besoin d'un médecin.","J'ai besoin d'un medecin."],model:"J'ai besoin d'un médecin.",hintVi:'Cấu trúc “J’ai besoin…”',hintFr:'Utilise « J’ai besoin… »',items:['besoin-medecin']}
      ]
    },
    {
      id:'appartement',icon:'🏠',titleVi:'Vấn đề trong căn hộ',titleFr:'Problème dans l’appartement',
      descVi:'Giải thích một vấn đề đơn giản trong nhà.',descFr:'Expliquer un problème simple dans le logement.',
      requiredLessons:['l19'],
      turns:[
        {npcFr:'Bonjour, tout va bien dans l’appartement ?',npcVi:'Xin chào, căn hộ ổn chứ?',promptVi:'Nói rằng không có nước nóng.',promptFr:"Dis qu'il n'y a pas d'eau chaude.",answers:["Il n'y a pas d'eau chaude.",'Il n y a pas d eau chaude.'],model:"Il n'y a pas d'eau chaude.",hintVi:'Bắt đầu bằng “Il n’y a pas…”',hintFr:'Commence par « Il n’y a pas… »',items:['pas-eau-chaude']},
        {npcFr:'D’accord. La porte fonctionne ?',npcVi:'Được rồi. Cửa hoạt động chứ?',promptVi:'Nói rằng cửa đang đóng.',promptFr:'Dis que la porte est fermée.',answers:['La porte est fermée.','La porte est fermee.'],model:'La porte est fermée.',hintVi:'“La porte est…”',hintFr:'« La porte est… »',items:['porte-fermee']},
        {npcFr:'Je vais regarder ça.',npcVi:'Tôi sẽ xem.',promptVi:'Cảm ơn.',promptFr:'Remercie.',answers:['Merci.','Merci beaucoup.'],model:'Merci.',hintVi:'Một từ là đủ.',hintFr:'Un mot suffit.',items:['merci']}
      ]
    },
    {
      id:'appel-jerry',icon:'📱',titleVi:'Gọi cho Jerry',titleFr:'Appeler Jerry',
      descVi:'Một cuộc gọi ngắn khi điện thoại hoặc mạng có vấn đề.',descFr:'Un petit appel quand le téléphone ou le réseau pose problème.',
      requiredLessons:['l20'],
      turns:[
        {npcFr:'Allô Trân, tu m’entends ?',npcVi:'Alo Trân, em nghe anh không?',promptVi:'Trả lời rằng có.',promptFr:'Réponds oui.',answers:['Oui.','Oui, je t’entends.','Oui je t entends.'],model:'Oui.',hintVi:'Một từ là đủ.',hintFr:'Un seul mot suffit.',items:['oui']},
        {npcFr:'Ton téléphone marche bien ?',npcVi:'Điện thoại của em hoạt động tốt không?',promptVi:'Nói rằng điện thoại của bạn không hoạt động.',promptFr:'Dis que ton téléphone ne marche pas.',answers:['Mon téléphone ne marche pas.','Mon telephone ne marche pas.'],model:'Mon téléphone ne marche pas.',hintVi:'Bắt đầu bằng “Mon téléphone…”',hintFr:'Commence par « Mon téléphone… »',items:['telephone-marche-pas']},
        {npcFr:'Tu as du réseau ?',npcVi:'Em có sóng/mạng không?',promptVi:'Nói rằng bạn không có mạng.',promptFr:'Dis que tu n’as pas de réseau.',answers:["Je n'ai pas de réseau.",'Je n ai pas de reseau.'],model:"Je n'ai pas de réseau.",hintVi:'Bắt đầu bằng “Je n’ai pas…”',hintFr:'Commence par « Je n’ai pas… »',items:['pas-de-reseau']}
      ]
    },
    {
      id:'arrivee-france',icon:'🇫🇷',titleVi:'Đến Pháp',titleFr:'Arrivée en France',
      descVi:'Nói bạn đã đến nơi và diễn tả những nhu cầu đầu tiên.',descFr:'Dire que tu es arrivée et exprimer les premiers besoins.',
      requiredLessons:['l15'],
      turns:[
        {npcFr:'Trân ! Tu es arrivée ?',npcVi:'Trân! Em đến rồi à?',promptVi:'Trả lời rằng bạn đã đến nơi.',promptFr:'Dis que tu es arrivée.',answers:['Oui, je suis arrivée.','Je suis arrivée.','Oui je suis arrivee.','Je suis arrivee.'],model:'Je suis arrivée.',hintVi:'Dùng “Je suis arrivée.”',hintFr:'Utilise « Je suis arrivée. »',items:['je-suis-arrivee','oui']},
        {npcFr:'Ça va ?',npcVi:'Em ổn không?',promptVi:'Nói rằng bạn mệt.',promptFr:'Dis que tu es fatiguée.',answers:['Je suis fatiguée.','Je suis fatiguee.'],model:'Je suis fatiguée.',hintVi:'Dùng “Je suis…”',hintFr:'Utilise « Je suis… »',items:['je-suis-fatiguee']},
        {npcFr:'Tu veux manger quelque chose ?',npcVi:'Em muốn ăn gì không?',promptVi:'Nói rằng bạn đói.',promptFr:'Dis que tu as faim.',answers:["J'ai faim.",'J ai faim.'],model:"J'ai faim.",hintVi:'Dùng “J’ai…”',hintFr:'Utilise « J’ai… »',items:['jai-faim']}
      ]
    },
    {
      id:'proches',icon:'👨‍👩‍👧',titleVi:'Gặp người thân của Jerry',titleFr:'Rencontrer des proches',
      descVi:'Chào hỏi, giới thiệu và bắt đầu một cuộc trò chuyện nhỏ.',descFr:'Saluer, se présenter et commencer un petit échange.',
      requiredLessons:['l14','l23'],
      turns:[
        {npcFr:'Bonjour Trân, bienvenue !',npcVi:'Xin chào Trân, chào mừng!',promptVi:'Chào và nói rất vui được gặp.',promptFr:'Salue et dis que tu es enchantée.',answers:['Bonjour, enchantée.','Bonjour. Enchantée.','Enchantée.'],model:'Bonjour, enchantée.',hintVi:'Bạn biết “Bonjour” và “Enchantée”.',hintFr:'Tu connais « Bonjour » et « Enchantée ».',items:['bonjour','enchantee']},
        {npcFr:'Ça va ?',npcVi:'Bạn khỏe không?',promptVi:'Nói rằng bạn khỏe và hỏi lại.',promptFr:'Dis que ça va bien et retourne la question.',answers:['Ça va bien. Et toi ?','Ca va bien. Et toi ?','Ça va bien, et toi ?'],model:'Ça va bien. Et toi ?',hintVi:'Câu đã học có “Ça va bien” + “Et toi ?”',hintFr:'Utilise « Ça va bien » + « Et toi ? »',items:['ca-va-bien','et-toi']},
        {npcFr:"Très bien ! Qu'est-ce que tu fais aujourd'hui ?",npcVi:'Rất tốt! Hôm nay bạn làm gì?',promptVi:'Nói rằng bạn nghỉ ngơi.',promptFr:'Dis que tu te reposes.',answers:['Je me repose.'],model:'Je me repose.',hintVi:'Bắt đầu bằng “Je…”',hintFr:'Commence par « Je… »',items:['je-me-repose']}
      ]
    },
    {
      id:'demander-aide',icon:'🆘',titleVi:'Xin người lạ giúp đỡ',titleFr:'Demander de l’aide',
      descVi:'Thu hút sự chú ý, xin giúp và nói rằng bạn không hiểu.',descFr:'Attirer l’attention, demander de l’aide et dire que tu ne comprends pas.',
      requiredLessons:['l2','l15'],
      turns:[
        {npcFr:'…',npcVi:'Bạn cần bắt chuyện với một người lạ.',promptVi:'Bắt đầu một cách lịch sự để thu hút sự chú ý.',promptFr:'Commence poliment pour attirer l’attention.',answers:['Excusez-moi.','Excusez moi.'],model:'Excusez-moi.',hintVi:'Câu bắt đầu bằng “Excusez…”',hintFr:'La phrase commence par « Excusez… »',items:['excusez-moi']},
        {npcFr:'Oui Madame ?',npcVi:'Vâng, thưa cô?',promptVi:'Xin người đó giúp bạn.',promptFr:'Demande à la personne de t’aider.',answers:["Pouvez-vous m'aider ?",'Pouvez vous m aider ?'],model:"Pouvez-vous m'aider ?",hintVi:'Dùng “Pouvez-vous…”',hintFr:'Utilise « Pouvez-vous… »',items:['aidez-moi']},
        {npcFr:'Bien sûr. Qu’est-ce qu’il y a ?',npcVi:'Tất nhiên. Có chuyện gì?',promptVi:'Bạn không hiểu. Nói điều đó.',promptFr:'Tu ne comprends pas. Dis-le.',answers:['Je ne comprends pas.'],model:'Je ne comprends pas.',hintVi:'Dùng “Je ne…”',hintFr:'Utilise « Je ne… »',items:['je-ne-comprends-pas']}
      ]
    },
    {
      id:'rendez-vous',icon:'🕒',titleVi:'Hẹn giờ',titleFr:'Prendre un rendez-vous',
      descVi:'Chọn ngày, hỏi giờ và nói rằng bạn có thể chờ.',descFr:'Choisir un jour, demander l’heure et dire que tu peux attendre.',
      requiredLessons:['l10','l18'],
      turns:[
        {npcFr:'Vous pouvez venir demain ?',npcVi:'Cô có thể đến ngày mai không?',promptVi:'Trả lời đồng ý.',promptFr:'Réponds oui.',answers:['Oui.','Oui, demain.'],model:'Oui.',hintVi:'Một từ là đủ.',hintFr:'Un mot suffit.',items:['oui','demain']},
        {npcFr:'Très bien.',npcVi:'Rất tốt.',promptVi:'Hỏi mấy giờ.',promptFr:'Demande à quelle heure.',answers:['À quelle heure ?','A quelle heure ?'],model:'À quelle heure ?',hintVi:'Bắt đầu bằng “À quelle…”',hintFr:'Commence par « À quelle… »',items:['quelle-heure']},
        {npcFr:'Il faudra peut-être attendre un peu.',npcVi:'Có thể cô sẽ phải chờ một chút.',promptVi:'Nói rằng bạn có thể chờ.',promptFr:'Dis que tu peux attendre.',answers:['Je peux attendre.'],model:'Je peux attendre.',hintVi:'Dùng “Je peux…”',hintFr:'Utilise « Je peux… »',items:['je-peux-attendre']}
      ]
    },
    {
      id:'social',icon:'🙂',titleVi:'Trò chuyện xã giao',titleFr:'Petite conversation sociale',
      descVi:'Giữ một cuộc hội thoại ngắn bằng câu trả lời và câu hỏi đơn giản.',descFr:'Maintenir un petit échange avec des réponses et questions simples.',
      requiredLessons:['l23','l25'],
      turns:[
        {npcFr:'Salut Trân, ça va ?',npcVi:'Chào Trân, khỏe không?',promptVi:'Nói rằng bạn khỏe và hỏi lại.',promptFr:'Dis que ça va bien et demande en retour.',answers:['Ça va bien. Et toi ?','Ca va bien. Et toi ?','Ça va bien, et toi ?'],model:'Ça va bien. Et toi ?',hintVi:'Ghép hai câu đã học.',hintFr:'Assemble deux petites phrases déjà apprises.',items:['ca-va-bien','et-toi']},
        {npcFr:'Oui, très bien. Je rentre tard ce soir.',npcVi:'Ừ, rất ổn. Tối nay tôi về muộn.',promptVi:'Hỏi tại sao.',promptFr:'Demande pourquoi.',answers:['Pourquoi ?'],model:'Pourquoi ?',hintVi:'Một từ hỏi là đủ.',hintFr:'Un seul mot-question suffit.',items:['pourquoi']},
        {npcFr:'Parce que je travaille.',npcVi:'Vì tôi làm việc.',promptVi:'Hỏi người đó làm việc với ai.',promptFr:'Demande avec qui la personne travaille.',answers:['Avec qui ?'],model:'Avec qui ?',hintVi:'Hai từ.',hintFr:'Deux mots.',items:['avec-qui']}
      ]
    }
  ];

  window.FrenchTranquilleScenarioData = { version:'1.10.0', build:17, scenarios:S };
})();
