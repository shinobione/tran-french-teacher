(() => {
  'use strict';

  const api = window.FrenchTranquilleScenarioData;
  if (!api?.scenarios) return;

  const PACK = 'real-life-jerry-2';
  const scenarios = [
    {
      id:'jerry-rdv-train',pack:PACK,icon:'🚆',titleVi:'Đi tàu để gặp Jerry',titleFr:'Prendre le train pour retrouver Jerry',
      descVi:'Xác nhận điểm đến, chọn vé và hỏi giờ.',descFr:'Confirmer la destination, choisir le billet et demander l’heure.',
      requiredLessons:['l9','l10'],
      turns:[
        {npcFr:'On se retrouve à Toulouse.',npcVi:'Mình gặp nhau ở Toulouse nhé.',promptVi:'Xác nhận rằng bạn đi Toulouse.',promptFr:'Confirme que tu vas à Toulouse.',answers:['Je vais à Toulouse.','Je vais a Toulouse.'],model:'Je vais à Toulouse.',hintVi:'Dùng “Je vais à…”',hintFr:'Utilise « Je vais à… »',items:['je-vais-a']},
        {npcFr:'Tu reviens aussi ce soir ?',npcVi:'Tối nay em cũng quay về chứ?',promptVi:'Bạn muốn vé khứ hồi.',promptFr:'Tu veux un aller-retour.',answers:['Un aller-retour.','Je voudrais un aller-retour.'],model:'Un aller-retour.',hintVi:'Cụm bắt đầu bằng “Un aller…”',hintFr:'La formule commence par « Un aller… »',items:['aller-retour']},
        {npcFr:'D’accord, on regarde le départ.',npcVi:'Được, mình xem giờ đi.',promptVi:'Hỏi mấy giờ.',promptFr:'Demande à quelle heure.',answers:['À quelle heure ?','A quelle heure ?'],model:'À quelle heure ?',hintVi:'“À quelle…”',hintFr:'« À quelle… »',items:['quelle-heure']}
      ]
    },
    {
      id:'jerry-shopping-budget',pack:PACK,icon:'🛍️',titleVi:'Đi mua sắm với Jerry',titleFr:'Faire du shopping avec Jerry',
      descVi:'Thấy món quá đắt, chọn món khác và hỏi trả bằng thẻ.',descFr:'Trouver un article trop cher, choisir autre chose et demander à payer par carte.',
      requiredLessons:['l11'],
      turns:[
        {npcFr:'Tu aimes celui-ci ?',npcVi:'Em thích cái này không?',promptVi:'Bạn thấy nó quá đắt.',promptFr:'Dis que c’est trop cher.',answers:["C'est trop cher.",'C est trop cher.'],model:"C'est trop cher.",hintVi:'Dùng “C’est…”',hintFr:'Utilise « C’est… »',items:['trop-cher']},
        {npcFr:'Et celui-là ?',npcVi:'Còn cái kia?',promptVi:'Bạn lấy cái đó.',promptFr:'Dis que tu prends ça.',answers:['Je prends ça.','Je prends ca.'],model:'Je prends ça.',hintVi:'“Je prends…”',hintFr:'« Je prends… »',items:['je-prends-ca']},
        {npcFr:'Très bien.',npcVi:'Rất tốt.',promptVi:'Hỏi xem có thể trả bằng thẻ không.',promptFr:'Demande si tu peux payer par carte.',answers:['Je peux payer par carte ?','Je peux payer par carte.'],model:'Je peux payer par carte ?',hintVi:'Bắt đầu bằng “Je peux…”',hintFr:'Commence par « Je peux… »',items:['payer-carte']}
      ]
    },
    {
      id:'jerry-diner-choix',pack:PACK,icon:'🍽️',titleVi:'Ăn tối với Jerry',titleFr:'Dîner avec Jerry',
      descVi:'Nói sở thích, bắt đầu gọi món và kết thúc bữa ăn.',descFr:'Exprimer une préférence, commander et terminer le repas.',
      requiredLessons:['l5','l12'],
      turns:[
        {npcFr:'Tu préfères le thé ou le café ?',npcVi:'Em thích trà hay cà phê hơn?',promptVi:'Nói rằng bạn thích trà hơn.',promptFr:'Dis que tu préfères le thé.',answers:['Je préfère le thé.','Je prefere le the.'],model:'Je préfère le thé.',hintVi:'Dùng “Je préfère…”',hintFr:'Utilise « Je préfère… »',items:['je-prefere','the']},
        {npcFr:'On peut commander.',npcVi:'Mình có thể gọi món.',promptVi:'Nói rằng bạn muốn gọi món.',promptFr:'Dis que tu voudrais commander.',answers:['Je voudrais commander.','Je veux commander.'],model:'Je voudrais commander.',hintVi:'“Je voudrais…”',hintFr:'« Je voudrais… »',items:['commander','je-voudrais']},
        {npcFr:'Alors, c’était comment ?',npcVi:'Vậy món ăn thế nào?',promptVi:'Nói rằng món ăn rất ngon.',promptFr:'Dis que c’était très bon.',answers:["C'était très bon.",'C etait tres bon.'],model:"C'était très bon.",hintVi:'Câu bắt đầu bằng “C’était…”',hintFr:'La phrase commence par « C’était… »',items:['tres-bon']}
      ]
    },
    {
      id:'jerry-mal-dehors',pack:PACK,icon:'🩺',titleVi:'Bạn không khỏe khi đang ở ngoài',titleFr:'Tu ne te sens pas bien dehors',
      descVi:'Nói mình đau, tìm hiệu thuốc và báo tình huống khẩn.',descFr:'Dire où tu as mal, trouver une pharmacie et signaler une urgence.',
      requiredLessons:['l8','l13'],
      turns:[
        {npcFr:'Trân, ça va ?',npcVi:'Trân, em ổn không?',promptVi:'Nói rằng bạn đau ở đây.',promptFr:'Dis que tu as mal ici.',answers:["J'ai mal ici.",'J ai mal ici.'],model:"J'ai mal ici.",hintVi:'“J’ai mal…”',hintFr:'« J’ai mal… »',items:['jai-mal-ici']},
        {npcFr:'On va chercher de l’aide.',npcVi:'Mình đi tìm trợ giúp.',promptVi:'Hỏi hiệu thuốc ở đâu.',promptFr:'Demande où est la pharmacie.',answers:['Où est la pharmacie ?','Ou est la pharmacie ?'],model:'Où est la pharmacie ?',hintVi:'“Où est…”',hintFr:'« Où est… »',items:['ou-pharmacie','pharmacie']},
        {npcFr:'Tu veux attendre ?',npcVi:'Em muốn chờ không?',promptVi:'Tình huống khẩn. Nói điều đó.',promptFr:'C’est urgent. Dis-le.',answers:["C'est urgent.",'C est urgent.'],model:"C'est urgent.",hintVi:'“C’est…”',hintFr:'« C’est… »',items:['urgent']}
      ]
    },
    {
      id:'jerry-presente-fiance',pack:PACK,icon:'👨‍👩‍👧',titleVi:'Giới thiệu Jerry với người khác',titleFr:'Présenter Jerry à quelqu’un',
      descVi:'Giới thiệu Jerry, nói anh ấy là vị hôn phu và chào người mới.',descFr:'Présenter Jerry, dire qu’il est ton fiancé et saluer une nouvelle personne.',
      requiredLessons:['l14'],
      turns:[
        {npcFr:'Tu peux me présenter ?',npcVi:'Em giới thiệu anh được không?',promptVi:'Giới thiệu Jerry.',promptFr:'Présente Jerry.',answers:['Voici Jerry.'],model:'Voici Jerry.',hintVi:'“Voici…”',hintFr:'« Voici… »',items:['voici-jerry']},
        {npcFr:'Et Jerry, c’est qui pour toi ?',npcVi:'Jerry là ai với em?',promptVi:'Nói rằng đây là vị hôn phu của bạn.',promptFr:'Dis que c’est ton fiancé.',answers:["C'est mon fiancé.",'C est mon fiance.'],model:"C'est mon fiancé.",hintVi:'“C’est mon…”',hintFr:'« C’est mon… »',items:['mon-fiance']},
        {npcFr:'Bonjour Trân, ravie de vous rencontrer.',npcVi:'Xin chào Trân, rất vui được gặp bạn.',promptVi:'Trả lời “rất vui được gặp”.',promptFr:'Réponds que tu es enchantée.',answers:['Enchantée.','Enchantee.'],model:'Enchantée.',hintVi:'Một từ đã học.',hintFr:'Un mot déjà appris.',items:['enchantee']}
      ]
    },
    {
      id:'jerry-prete-rentrer',pack:PACK,icon:'🚪',titleVi:'Sẵn sàng rồi muốn về',titleFr:'Être prête puis vouloir rentrer',
      descVi:'Nói mình sẵn sàng, muốn về và có thể đợi.',descFr:'Dire que tu es prête, que tu veux rentrer et que tu peux attendre.',
      requiredLessons:['l16','l18'],
      turns:[
        {npcFr:'Trân, tu es prête ?',npcVi:'Trân, em sẵn sàng chưa?',promptVi:'Nói rằng bạn sẵn sàng.',promptFr:'Dis que tu es prête.',answers:['Je suis prête.','Je suis prete.'],model:'Je suis prête.',hintVi:'“Je suis…”',hintFr:'« Je suis… »',items:['je-suis-prete']},
        {npcFr:'Tu veux faire quoi ?',npcVi:'Em muốn làm gì?',promptVi:'Nói rằng bạn muốn về.',promptFr:'Dis que tu veux rentrer.',answers:['Je veux rentrer.'],model:'Je veux rentrer.',hintVi:'“Je veux…”',hintFr:'« Je veux… »',items:['je-veux-rentrer']},
        {npcFr:'J’arrive dans quelques minutes.',npcVi:'Anh đến trong vài phút.',promptVi:'Nói rằng bạn có thể đợi.',promptFr:'Dis que tu peux attendre.',answers:['Je peux attendre.'],model:'Je peux attendre.',hintVi:'“Je peux…”',hintFr:'« Je peux… »',items:['je-peux-attendre']}
      ]
    },
    {
      id:'jerry-reservation-aide',pack:PACK,icon:'📋',titleVi:'Có đặt chỗ nhưng cần giúp',titleFr:'Avoir une réservation et demander de l’aide',
      descVi:'Nói mình có đặt chỗ, có câu hỏi và cần trợ giúp.',descFr:'Dire que tu as une réservation, une question et besoin d’aide.',
      requiredLessons:['l17'],
      turns:[
        {npcFr:'Bonjour Madame, vous avez réservé ?',npcVi:'Xin chào, cô có đặt chỗ không?',promptVi:'Nói rằng bạn có đặt chỗ.',promptFr:'Dis que tu as une réservation.',answers:["J'ai une réservation.",'J ai une reservation.'],model:"J'ai une réservation.",hintVi:'“J’ai…”',hintFr:'« J’ai… »',items:['jai-une-reservation']},
        {npcFr:'Très bien.',npcVi:'Rất tốt.',promptVi:'Nói rằng bạn có một câu hỏi.',promptFr:'Dis que tu as une question.',answers:["J'ai une question.",'J ai une question.'],model:"J'ai une question.",hintVi:'“J’ai…”',hintFr:'« J’ai… »',items:['jai-une-question']},
        {npcFr:'Bien sûr, dites-moi.',npcVi:'Tất nhiên, cô nói đi.',promptVi:'Nói rằng bạn cần giúp đỡ.',promptFr:'Dis que tu as besoin d’aide.',answers:["J'ai besoin d'aide.",'J ai besoin d aide.'],model:"J'ai besoin d'aide.",hintVi:'“J’ai besoin…”',hintFr:'« J’ai besoin… »',items:['jai-besoin-aide']}
      ]
    },
    {
      id:'jerry-cle-appartement',pack:PACK,icon:'🔑',titleVi:'Không tìm thấy chìa khóa',titleFr:'Ne pas trouver la clé',
      descVi:'Tìm chìa khóa, nói cửa đóng và xin giúp.',descFr:'Chercher la clé, dire que la porte est fermée et demander de l’aide.',
      requiredLessons:['l18','l19'],
      turns:[
        {npcFr:'On est devant l’appartement.',npcVi:'Mình đang đứng trước căn hộ.',promptVi:'Hỏi chìa khóa ở đâu.',promptFr:'Demande où est la clé.',answers:['Où est la clé ?','Ou est la cle ?'],model:'Où est la clé ?',hintVi:'“Où est…”',hintFr:'« Où est… »',items:['ou-est-la-cle']},
        {npcFr:'Tu peux ouvrir ?',npcVi:'Em mở được không?',promptVi:'Nói rằng cửa đang đóng.',promptFr:'Dis que la porte est fermée.',answers:['La porte est fermée.','La porte est fermee.'],model:'La porte est fermée.',hintVi:'“La porte est…”',hintFr:'« La porte est… »',items:['porte-fermee']},
        {npcFr:'Tu veux que je t’aide ?',npcVi:'Em muốn anh giúp không?',promptVi:'Xin giúp một cách đơn giản.',promptFr:'Demande de l’aide simplement.',answers:["Vous pouvez m'aider ?",'Vous pouvez m aider ?'],model:"Vous pouvez m'aider ?",hintVi:'“Vous pouvez…”',hintFr:'« Vous pouvez… »',items:['vous-pouvez-aider']}
      ]
    },
    {
      id:'jerry-probleme-eau',pack:PACK,icon:'🚿',titleVi:'Có vấn đề trong căn hộ',titleFr:'Un problème dans l’appartement',
      descVi:'Nói đây là căn hộ, không có nước nóng và cần trợ giúp.',descFr:'Dire que c’est l’appartement, qu’il n’y a pas d’eau chaude et demander de l’aide.',
      requiredLessons:['l17','l19'],
      turns:[
        {npcFr:'C’est bien ici ?',npcVi:'Đúng chỗ này không?',promptVi:'Nói rằng đây là căn hộ của bạn.',promptFr:'Dis que c’est ton appartement.',answers:["C'est mon appartement.",'C est mon appartement.'],model:"C'est mon appartement.",hintVi:'“C’est mon…”',hintFr:'« C’est mon… »',items:['cest-mon-appartement']},
        {npcFr:'Quel est le problème ?',npcVi:'Có vấn đề gì?',promptVi:'Nói rằng không có nước nóng.',promptFr:'Dis qu’il n’y a pas d’eau chaude.',answers:["Il n'y a pas d'eau chaude.",'Il n y a pas d eau chaude.'],model:"Il n'y a pas d'eau chaude.",hintVi:'“Il n’y a pas…”',hintFr:'« Il n’y a pas… »',items:['pas-eau-chaude']},
        {npcFr:'D’accord.',npcVi:'Được rồi.',promptVi:'Nói rằng bạn cần giúp đỡ.',promptFr:'Dis que tu as besoin d’aide.',answers:["J'ai besoin d'aide.",'J ai besoin d aide.'],model:"J'ai besoin d'aide.",hintVi:'“J’ai besoin…”',hintFr:'« J’ai besoin… »',items:['jai-besoin-aide']}
      ]
    },
    {
      id:'jerry-reseau-message',pack:PACK,icon:'📱',titleVi:'Mạng yếu khi gọi Jerry',titleFr:'Le réseau coupe pendant l’appel',
      descVi:'Kiểm tra xem Jerry có nghe, nói mạng có vấn đề và chuyển sang tin nhắn.',descFr:'Vérifier que Jerry entend, signaler le réseau et passer au message.',
      requiredLessons:['l20'],
      turns:[
        {npcFr:'Allô Trân ?',npcVi:'Alo Trân?',promptVi:'Hỏi Jerry có nghe bạn không.',promptFr:'Demande à Jerry s’il t’entend.',answers:["Tu m'entends ?",'Tu m entends ?'],model:"Tu m'entends ?",hintVi:'“Tu m…”',hintFr:'« Tu m… »',items:['tu-mentends']},
        {npcFr:'Oui, mais ça coupe.',npcVi:'Có, nhưng bị ngắt quãng.',promptVi:'Nói rằng bạn không có mạng.',promptFr:'Dis que tu n’as pas de réseau.',answers:["Je n'ai pas de réseau.",'Je n ai pas de reseau.'],model:"Je n'ai pas de réseau.",hintVi:'“Je n’ai pas…”',hintFr:'« Je n’ai pas… »',items:['pas-de-reseau']},
        {npcFr:'On fait comment ?',npcVi:'Mình làm sao đây?',promptVi:'Bảo Jerry gửi tin nhắn.',promptFr:'Demande à Jerry de t’envoyer un message.',answers:['Envoie-moi un message.','Envoie moi un message.'],model:'Envoie-moi un message.',hintVi:'“Envoie-moi…”',hintFr:'« Envoie-moi… »',items:['envoie-message']}
      ]
    }
  ];

  const existing = new Set(api.scenarios.map(s => s.id));
  const added = scenarios.filter(s => !existing.has(s.id));
  api.scenarios.push(...added);

  window.FrenchTranquilleRealLife2 = {
    version:'1.17.0',build:24,pack:PACK,
    scenarios:added,
    scenarioIds:added.map(s=>s.id)
  };
})();
