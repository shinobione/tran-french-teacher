(() => {
  'use strict';

  const api = window.FrenchTranquilleListeningData;
  const curriculum = window.FrenchTranquilleCurriculum;
  if (!api?.contrasts || !api?.dialogues || !curriculum?.items) return;

  const itemIds = new Set(curriculum.items.map(item => item.id));
  const contrasts = [
    {id:'prix-plus-moins-cher',items:['cest-plus-cher','cest-moins-cher'],vi:'Đắt hơn hay rẻ hơn?',fr:'Plus cher ou moins cher ?'},
    {id:'train-retard-annule',items:['train-est-en-retard','train-est-annule'],vi:'Tàu bị trễ hay bị hủy?',fr:'Train en retard ou annulé ?'},
    {id:'douleur-tete-ventre',items:['jai-mal-tete','jai-mal-ventre'],vi:'Đau đầu hay đau bụng?',fr:'Mal à la tête ou au ventre ?'},
    {id:'accord-desaccord',items:['je-suis-daccord','je-ne-suis-pas-daccord'],vi:'Đồng ý hay không đồng ý?',fr:'D’accord ou pas d’accord ?'}
  ];

  const dialogues = [
    {
      id:'reformulation-service',icon:'🔎',titleVi:'Yêu cầu nói lại',titleFr:'Demander de reformuler',
      requiredItems:['pouvez-vous-reformuler','pouvez-vous-lecrire'],
      lines:[{speaker:'A',fr:'Vous devez fournir un justificatif.'},{speaker:'B',fr:'Pouvez-vous reformuler ?'},{speaker:'A',fr:'Oui. Un document avec votre adresse.'},{speaker:'B',fr:"Pouvez-vous l'écrire ?"}],
      questionVi:'Người B yêu cầu điều gì đầu tiên?',questionFr:'Que demande la personne B en premier ?',
      options:[{vi:'Nói lại theo cách khác',fr:'Reformuler'},{vi:'Đổi tàu',fr:'Changer de train'},{vi:'Đưa hóa đơn',fr:'Donner l’addition'}],answer:0,evidenceItems:['pouvez-vous-reformuler']
    },
    {
      id:'shop-compare',icon:'🛍️',titleVi:'So sánh giá',titleFr:'Comparer les prix',
      requiredItems:['cest-plus-cher','cest-moins-cher','je-prends-celui-la'],
      lines:[{speaker:'A',fr:'Celui-ci coûte cinquante euros.'},{speaker:'B',fr:"C'est plus cher."},{speaker:'A',fr:'Celui-là coûte trente euros.'},{speaker:'B',fr:"C'est moins cher. Je prends celui-là."}],
      questionVi:'Người B chọn món nào?',questionFr:'Quelle option choisit la personne B ?',
      options:[{vi:'Món rẻ hơn',fr:'La moins chère'},{vi:'Món 50 euro',fr:'Celle à 50 euros'},{vi:'Không mua gì',fr:'Aucune'}],answer:0,evidenceItems:['cest-moins-cher','je-prends-celui-la']
    },
    {
      id:'invite-refuse',icon:'🥂',titleVi:'Lời mời',titleFr:'Une invitation',
      requiredItems:['tu-veux-venir-avec-nous','desolee-je-ne-peux-pas','une-autre-fois'],
      lines:[{speaker:'A',fr:'Tu veux venir avec nous ce soir ?'},{speaker:'B',fr:'Désolée, je ne peux pas. Une autre fois ?'}],
      questionVi:'Người B có đi tối nay không?',questionFr:'La personne B vient-elle ce soir ?',
      options:[{vi:'Không, nhưng đề nghị lần khác',fr:'Non, mais elle propose une autre fois'},{vi:'Có',fr:'Oui'},{vi:'Cô ấy chưa nghe câu hỏi',fr:'Elle n’a pas compris'}],answer:0,evidenceItems:['desolee-je-ne-peux-pas','une-autre-fois']
    },
    {
      id:'doctor-appointment',icon:'🩺',titleVi:'Hẹn bác sĩ',titleFr:'Rendez-vous médical',
      requiredItems:['jai-mal-ventre','depuis-hier','rendez-vous-medecin'],
      lines:[{speaker:'A',fr:'Qu’est-ce qui vous arrive ?'},{speaker:'B',fr:"J'ai mal au ventre."},{speaker:'A',fr:'Depuis quand ?'},{speaker:'B',fr:'Depuis hier. Je voudrais un rendez-vous avec un médecin.'}],
      questionVi:'Vấn đề bắt đầu từ khi nào?',questionFr:'Depuis quand le problème a-t-il commencé ?',
      options:[{vi:'Từ hôm qua',fr:'Depuis hier'},{vi:'Ngày mai',fr:'Demain'},{vi:'Từ một tuần',fr:'Depuis une semaine'}],answer:0,evidenceItems:['depuis-hier']
    },
    {
      id:'work-instruction',icon:'🧰',titleVi:'Hướng dẫn công việc',titleFr:'Une consigne au travail',
      requiredItems:['pas-compris-consigne','montrez-moi-svp','jai-termine'],
      lines:[{speaker:'A',fr:'Tu dois préparer ces trois dossiers.'},{speaker:'B',fr:"Je n'ai pas compris la consigne. Montrez-moi, s'il vous plaît."},{speaker:'A',fr:'Comme ça.'},{speaker:'B',fr:"D'accord. J'ai terminé."}],
      questionVi:'Tại sao người B yêu cầu chỉ lại?',questionFr:'Pourquoi la personne B demande-t-elle qu’on lui montre ?',
      options:[{vi:'Vì không hiểu hướng dẫn',fr:'Parce qu’elle n’a pas compris la consigne'},{vi:'Vì muốn về nhà',fr:'Parce qu’elle veut rentrer'},{vi:'Vì tàu trễ',fr:'Parce que le train est en retard'}],answer:0,evidenceItems:['pas-compris-consigne','montrez-moi-svp']
    },
    {
      id:'housing-leak',icon:'🔧',titleVi:'Rò nước trong căn hộ',titleFr:'Une fuite dans l’appartement',
      requiredItems:['il-y-a-une-fuite','pouvez-vous-envoyer-quelquun','quand-pouvez-vous-venir'],
      lines:[{speaker:'A',fr:'Quel est le problème ?'},{speaker:'B',fr:"Il y a une fuite. Pouvez-vous envoyer quelqu'un ?"},{speaker:'A',fr:'Oui, cet après-midi.'},{speaker:'B',fr:'Quand pouvez-vous venir ?'}],
      questionVi:'Vấn đề trong căn hộ là gì?',questionFr:'Quel est le problème dans l’appartement ?',
      options:[{vi:'Có chỗ rò nước',fr:'Il y a une fuite'},{vi:'Không có mạng',fr:'Il n’y a pas de réseau'},{vi:'Cửa hàng đóng cửa',fr:'Le magasin est fermé'}],answer:0,evidenceItems:['il-y-a-une-fuite']
    },
    {
      id:'train-disruption',icon:'🚉',titleVi:'Sự cố tàu',titleFr:'Perturbation du train',
      requiredItems:['train-est-en-retard','rater-correspondance','quel-autre-train'],
      lines:[{speaker:'A',fr:'Le train est en retard de trente minutes.'},{speaker:'B',fr:'Je vais rater ma correspondance.'},{speaker:'A',fr:'Il y a un autre train à dix heures.'},{speaker:'B',fr:'Quel autre train ?'}],
      questionVi:'Người B lo điều gì?',questionFr:'Qu’est-ce qui inquiète la personne B ?',
      options:[{vi:'Sẽ lỡ chuyến nối',fr:'Elle va rater sa correspondance'},{vi:'Không có hộ chiếu',fr:'Elle n’a pas son passeport'},{vi:'Cô ấy đói',fr:'Elle a faim'}],answer:0,evidenceItems:['rater-correspondance']
    },
    {
      id:'on-plan',icon:'🗣️',titleVi:'Kế hoạch với “on”',titleFr:'Un plan avec « on »',
      requiredItems:['on-va-manger','on-va-ou','on-peut-y-aller','on-rentre'],
      lines:[{speaker:'A',fr:'On va manger ?'},{speaker:'B',fr:'Oui. On va où ?'},{speaker:'A',fr:'Au petit restaurant près d’ici.'},{speaker:'B',fr:'D’accord, on peut y aller. Après, on rentre ?'}],
      questionVi:'Hai người định làm gì trước tiên?',questionFr:'Qu’est-ce qu’ils vont faire d’abord ?',
      options:[{vi:'Đi ăn',fr:'Manger'},{vi:'Đi làm',fr:'Travailler'},{vi:'Mua vé tàu',fr:'Acheter un billet'}],answer:0,evidenceItems:['on-va-manger']
    }
  ];

  const existingContrasts = new Set(api.contrasts.map(item => item.id));
  const existingDialogues = new Set(api.dialogues.map(item => item.id));
  const addedContrasts = contrasts.filter(item => !existingContrasts.has(item.id));
  const addedDialogues = dialogues.filter(item => !existingDialogues.has(item.id));
  api.contrasts.push(...addedContrasts);
  api.dialogues.push(...addedDialogues);

  const referenced = [
    ...addedContrasts.flatMap(item => item.items || []),
    ...addedDialogues.flatMap(item => [...(item.requiredItems || []), ...(item.evidenceItems || [])])
  ];
  const invalidItems = [...new Set(referenced.filter(id => !itemIds.has(id)))];

  window.FrenchTranquilleListeningData2 = {
    version:'2.2.0',build:32,
    contrasts:addedContrasts,
    dialogues:addedDialogues,
    invalidItems
  };
})();