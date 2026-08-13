(() => {
  'use strict';

  const api = window.FrenchTranquilleScenarioData;
  const curriculum = window.FrenchTranquilleCurriculum;
  if (!api?.scenarios || !curriculum?.items) return;

  const PACK = 'real-life-practical-a1-4';
  const itemIds = new Set(curriculum.items.map(item => item.id));
  const keep = ids => ids.filter(id => itemIds.has(id));

  const scenarios = [
    {
      id:'practical-reformuler',pack:PACK,icon:'🔎',
      titleVi:'Bạn chưa hiểu ở quầy dịch vụ',titleFr:'Tu n’as pas compris au guichet',
      descVi:'Giữ cuộc hội thoại tiếp tục bằng cách yêu cầu nói lại, viết hoặc cho ví dụ.',descFr:'Maintenir l’échange en demandant de reformuler, d’écrire ou de donner un exemple.',
      requiredLessons:['l41'],
      turns:[
        {npcFr:'Vous devez joindre un justificatif récent.',npcVi:'Bạn cần đính kèm một giấy tờ chứng minh gần đây.',promptVi:'Bạn không hiểu từ cuối. Hãy nói rõ điều đó.',promptFr:'Tu n’as pas compris le dernier mot. Dis-le clairement.',answers:["Je n'ai pas compris le dernier mot.","Je n’ai pas compris le dernier mot."],model:"Je n'ai pas compris le dernier mot.",hintVi:'Bắt đầu bằng « Je n’ai pas compris… »',hintFr:'Commence par « Je n’ai pas compris… »',openResponse:true,items:keep(['pas-compris-dernier-mot'])},
        {npcFr:'Un justificatif récent.',npcVi:'Một giấy tờ chứng minh gần đây.',promptVi:'Yêu cầu người đó nói lại theo cách khác.',promptFr:'Demande à la personne de reformuler.',answers:['Pouvez-vous reformuler ?','Vous pouvez reformuler ?'],model:'Pouvez-vous reformuler ?',hintVi:'« Pouvez-vous… ? »',hintFr:'« Pouvez-vous… ? »',openResponse:true,items:keep(['pouvez-vous-reformuler'])},
        {npcFr:'Bien sûr. C’est un document qui prouve votre adresse.',npcVi:'Tất nhiên. Đó là giấy tờ chứng minh địa chỉ.',promptVi:'Bạn muốn họ viết từ đó ra.',promptFr:'Tu veux que la personne écrive le mot.',answers:["Pouvez-vous l'écrire ?","Pouvez-vous l’écrire ?",'Vous pouvez l écrire ?'],model:"Pouvez-vous l'écrire ?",hintVi:'Dùng « l’écrire »',hintFr:'Utilise « l’écrire »',openResponse:true,items:keep(['pouvez-vous-lecrire'])}
      ]
    },
    {
      id:'practical-comparer-choisir',pack:PACK,icon:'🛍️',
      titleVi:'So sánh trước khi mua',titleFr:'Comparer avant d’acheter',
      descVi:'So sánh hai lựa chọn rồi quyết định món nào bạn lấy.',descFr:'Comparer deux options puis décider laquelle acheter.',
      requiredLessons:['l43'],
      turns:[
        {npcFr:'Celui-ci coûte quarante euros. Celui-là coûte trente euros.',npcVi:'Cái này 40 euro. Cái kia 30 euro.',promptVi:'Nói rằng cái kia rẻ hơn.',promptFr:'Dis que l’autre est moins cher.',answers:["C'est moins cher.",'Celui-là est moins cher.'],model:"C'est moins cher.",hintVi:'« moins cher »',hintFr:'« moins cher »',openResponse:true,items:keep(['cest-moins-cher'])},
        {npcFr:'Vous préférez lequel ?',npcVi:'Bạn thích cái nào hơn?',promptVi:'Bạn thích cái này hơn.',promptFr:'Tu préfères celui-ci.',answers:['Je préfère celui-ci.','Celui-ci.'],model:'Je préfère celui-ci.',hintVi:'« Je préfère… »',hintFr:'« Je préfère… »',openResponse:true,items:keep(['je-prefere-celui-ci'])},
        {npcFr:'Très bien.',npcVi:'Được rồi.',promptVi:'Cuối cùng bạn đổi ý và lấy cái kia.',promptFr:'Finalement tu changes d’avis et tu prends l’autre.',answers:['Je prends celui-là.','Finalement, je prends celui-là.'],model:'Je prends celui-là.',hintVi:'« Je prends… »',hintFr:'« Je prends… »',openResponse:true,items:keep(['je-prends-celui-la'])}
      ]
    },
    {
      id:'practical-invitation-jerry',pack:PACK,icon:'🥂',
      titleVi:'Jerry rủ bạn đi cùng',titleFr:'Jerry t’invite à venir',
      descVi:'Chấp nhận một lời mời hoặc từ chối lịch sự rồi đề nghị lần khác.',descFr:'Accepter une invitation ou refuser poliment puis proposer une autre fois.',
      requiredLessons:['l44'],
      turns:[
        {npcFr:'Tu veux venir avec nous ce soir ?',npcVi:'Tối nay em muốn đi cùng bọn anh không?',promptVi:'Lần này bạn rất muốn đi.',promptFr:'Cette fois, tu as envie de venir.',answers:['Avec plaisir.','Oui, avec plaisir.'],model:'Avec plaisir.',hintVi:'Một câu ngắn là đủ.',hintFr:'Une réponse courte suffit.',openResponse:true,items:keep(['avec-plaisir'])},
        {npcFr:'On se retrouve à huit heures ?',npcVi:'Chúng ta gặp nhau lúc 8 giờ nhé?',promptVi:'Hỏi Jerry xem giờ đó có ổn không.',promptFr:'Demande à Jerry si cette heure lui convient.',answers:['Ça te va ?','Huit heures, ça te va ?'],model:'Ça te va ?',hintVi:'« Ça te… »',hintFr:'« Ça te… »',openResponse:true,items:keep(['ca-te-va'])},
        {npcFr:'Demain aussi on sort.',npcVi:'Ngày mai bọn anh cũng đi chơi.',promptVi:'Ngày mai bạn không thể. Từ chối lịch sự.',promptFr:'Demain tu ne peux pas. Refuse poliment.',answers:['Désolée, je ne peux pas.','Désolée, je ne peux pas demain.','Une autre fois ?'],model:'Désolée, je ne peux pas. Une autre fois ?',hintVi:'Bạn có thể thêm « Une autre fois ? »',hintFr:'Tu peux ajouter « Une autre fois ? »',openResponse:true,items:keep(['desolee-je-ne-peux-pas','une-autre-fois'])}
      ]
    },
    {
      id:'practical-medecin',pack:PACK,icon:'🩺',
      titleVi:'Đặt lịch với bác sĩ',titleFr:'Prendre rendez-vous chez le médecin',
      descVi:'Mô tả một triệu chứng đơn giản và xin lịch khám.',descFr:'Décrire un symptôme simple et demander un rendez-vous.',
      requiredLessons:['l45'],
      turns:[
        {npcFr:'Bonjour, qu’est-ce qui vous arrive ?',npcVi:'Xin chào, cô bị gì vậy?',promptVi:'Bạn đau bụng.',promptFr:'Tu as mal au ventre.',answers:["J'ai mal au ventre.","J’ai mal au ventre."],model:"J'ai mal au ventre.",hintVi:'« J’ai mal… »',hintFr:'« J’ai mal… »',openResponse:true,items:keep(['jai-mal-ventre'])},
        {npcFr:'Depuis quand ?',npcVi:'Từ bao giờ?',promptVi:'Từ hôm qua.',promptFr:'Depuis hier.',answers:['Depuis hier.','Depuis hier'],model:'Depuis hier.',hintVi:'Hai từ.',hintFr:'Deux mots.',items:keep(['depuis-hier'])},
        {npcFr:'D’accord.',npcVi:'Được rồi.',promptVi:'Xin một lịch hẹn với bác sĩ.',promptFr:'Demande un rendez-vous avec un médecin.',answers:["Je voudrais un rendez-vous avec un médecin.",'Je voudrais un rendez vous avec un médecin.'],model:"Je voudrais un rendez-vous avec un médecin.",hintVi:'Bắt đầu bằng « Je voudrais… »',hintFr:'Commence par « Je voudrais… »',openResponse:true,items:keep(['rendez-vous-medecin'])}
      ]
    },
    {
      id:'practical-travail-consigne',pack:PACK,icon:'🧰',
      titleVi:'Ngày làm việc: bạn chưa hiểu hướng dẫn',titleFr:'Au travail : une consigne n’est pas claire',
      descVi:'Hỏi phải làm gì, yêu cầu chỉ lại rồi báo khi đã xong.',descFr:'Demander quoi faire, demander qu’on montre à nouveau puis dire qu’on a terminé.',
      requiredLessons:['l47'],
      turns:[
        {npcFr:'Trân, tu peux commencer ici.',npcVi:'Trân, bạn có thể bắt đầu ở đây.',promptVi:'Bạn chưa biết phải làm gì.',promptFr:'Tu ne sais pas encore ce que tu dois faire.',answers:["Qu'est-ce que je dois faire ?","Qu’est-ce que je dois faire ?"],model:"Qu'est-ce que je dois faire ?",hintVi:'« je dois faire »',hintFr:'« je dois faire »',openResponse:true,items:keep(['quest-ce-que-je-dois-faire'])},
        {npcFr:'Tu dois préparer ça comme ça.',npcVi:'Bạn phải chuẩn bị nó như thế này.',promptVi:'Bạn vẫn chưa hiểu. Xin họ chỉ cho bạn.',promptFr:'Ce n’est toujours pas clair. Demande qu’on te montre.',answers:["Montrez-moi, s'il vous plaît.","Montrez-moi, s’il vous plaît."],model:"Montrez-moi, s'il vous plaît.",hintVi:'« Montrez-moi… »',hintFr:'« Montrez-moi… »',openResponse:true,items:keep(['montrez-moi-svp'])},
        {npcFr:'Voilà, c’est ça.',npcVi:'Đó, đúng như vậy.',promptVi:'Bạn đã làm xong.',promptFr:'Tu as terminé.',answers:["J'ai terminé.","J’ai terminé."],model:"J'ai terminé.",hintVi:'« J’ai… »',hintFr:'« J’ai… »',openResponse:true,items:keep(['jai-termine'])}
      ]
    },
    {
      id:'practical-appartement-reparation',pack:PACK,icon:'🔧',
      titleVi:'Gọi báo sự cố trong căn hộ',titleFr:'Appeler pour une panne dans l’appartement',
      descVi:'Mô tả sự cố rồi hỏi khi nào có người đến.',descFr:'Décrire la panne puis demander quand quelqu’un peut intervenir.',
      requiredLessons:['l48'],
      turns:[
        {npcFr:'Bonjour, quel est le problème ?',npcVi:'Xin chào, vấn đề là gì?',promptVi:'Có chỗ rò nước trong căn hộ.',promptFr:'Il y a une fuite dans l’appartement.',answers:["J'ai un problème dans l'appartement. Il y a une fuite.",'Il y a une fuite.'],model:"J'ai un problème dans l'appartement. Il y a une fuite.",hintVi:'Bạn có thể dùng hai câu ngắn.',hintFr:'Tu peux utiliser deux phrases courtes.',openResponse:true,items:keep(['probleme-dans-appartement','il-y-a-une-fuite'])},
        {npcFr:'D’accord, nous allons regarder.',npcVi:'Được, chúng tôi sẽ kiểm tra.',promptVi:'Yêu cầu họ cử người đến.',promptFr:'Demande qu’on envoie quelqu’un.',answers:["Pouvez-vous envoyer quelqu'un ?","Pouvez-vous envoyer quelqu’un ?"],model:"Pouvez-vous envoyer quelqu'un ?",hintVi:'« Pouvez-vous envoyer… »',hintFr:'« Pouvez-vous envoyer… »',openResponse:true,items:keep(['pouvez-vous-envoyer-quelquun'])},
        {npcFr:'Oui.',npcVi:'Vâng.',promptVi:'Hỏi khi nào họ có thể đến.',promptFr:'Demande quand ils peuvent venir.',answers:['Quand pouvez-vous venir ?'],model:'Quand pouvez-vous venir ?',hintVi:'« Quand… ? »',hintFr:'« Quand… ? »',openResponse:true,items:keep(['quand-pouvez-vous-venir'])}
      ]
    },
    {
      id:'practical-train-retard',pack:PACK,icon:'🚉',
      titleVi:'Tàu trễ và bạn phải báo Jerry',titleFr:'Le train est en retard et tu préviens Jerry',
      descVi:'Hiểu sự cố giao thông, tìm phương án khác rồi báo hậu quả.',descFr:'Comprendre le problème de transport, chercher une solution et expliquer la conséquence.',
      requiredLessons:['l49'],
      turns:[
        {npcFr:'Votre train a vingt-cinq minutes de retard.',npcVi:'Tàu của cô trễ 25 phút.',promptVi:'Nói lại tình trạng bằng câu đơn giản.',promptFr:'Reformule la situation avec une phrase simple.',answers:['Le train est en retard.','Mon train est en retard.'],model:'Le train est en retard.',hintVi:'« en retard »',hintFr:'« en retard »',openResponse:true,items:keep(['train-est-en-retard'])},
        {npcFr:'La correspondance part dans dix minutes.',npcVi:'Chuyến nối đi trong 10 phút.',promptVi:'Bạn sẽ lỡ chuyến nối.',promptFr:'Tu vas rater ta correspondance.',answers:['Je vais rater ma correspondance.'],model:'Je vais rater ma correspondance.',hintVi:'Futur proche: « Je vais… »',hintFr:'Futur proche : « Je vais… »',openResponse:true,items:keep(['rater-correspondance'])},
        {npcFr:'Il y a peut-être une autre solution.',npcVi:'Có thể có phương án khác.',promptVi:'Hỏi có chuyến tàu nào khác.',promptFr:'Demande quel autre train est possible.',answers:['Quel autre train ?','Il y a un autre train ?'],model:'Quel autre train ?',hintVi:'Ba từ là đủ.',hintFr:'Trois mots suffisent.',openResponse:true,items:keep(['quel-autre-train'])}
      ]
    },
    {
      id:'practical-on-jerry',pack:PACK,icon:'🗣️',
      titleVi:'Một kế hoạch tự nhiên với Jerry',titleFr:'Un petit plan naturel avec Jerry',
      descVi:'Hiểu và dùng “on” trong một cuộc trao đổi rất đời thường.',descFr:'Comprendre et utiliser « on » dans un échange très quotidien.',
      requiredLessons:['l52'],
      turns:[
        {npcFr:'On va manger ?',npcVi:'Mình đi ăn nhé?',promptVi:'Bạn đồng ý và nói có thể đi rồi.',promptFr:'Tu es d’accord et tu dis qu’on peut y aller.',answers:['On peut y aller.','Oui, on peut y aller.'],model:'On peut y aller.',hintVi:'« On peut… »',hintFr:'« On peut… »',openResponse:true,items:keep(['on-peut-y-aller'])},
        {npcFr:'On va où ?',npcVi:'Mình đi đâu?',promptVi:'Bạn chưa quyết định. Hỏi ý kiến Jerry bằng một câu ngắn.',promptFr:'Tu n’as pas décidé. Tu peux simplement renvoyer la question.',answers:['On va où ?','Je sais pas. On va où ?','Je ne sais pas. On va où ?'],model:'On va où ?',hintVi:'Bạn có thể lặp lại câu hỏi.',hintFr:'Tu peux reprendre la question.',openResponse:true,items:keep(['on-va-ou'])},
        {npcFr:'On mange ici, puis on rentre ?',npcVi:'Mình ăn ở đây rồi về nhé?',promptVi:'Đồng ý về nhà.',promptFr:'Accepte de rentrer.',answers:['Oui, on rentre.','On rentre.','Oui.'],model:'Oui, on rentre.',hintVi:'« on rentre »',hintFr:'« on rentre »',openResponse:true,items:keep(['on-rentre','oui'])}
      ]
    }
  ];

  const existing = new Set(api.scenarios.map(scenario => scenario.id));
  const added = scenarios.filter(scenario => !existing.has(scenario.id));
  api.scenarios.push(...added);

  const invalidItems = added.flatMap(scenario => scenario.turns.flatMap(turn =>
    (turn.items || []).filter(id => !itemIds.has(id)).map(id => ({scenario:scenario.id,id}))
  ));

  window.FrenchTranquilleRealLife4 = {
    version:'2.2.0', build:32, pack:PACK,
    scenarios:added,
    scenarioIds:added.map(scenario => scenario.id),
    invalidItems
  };
})();