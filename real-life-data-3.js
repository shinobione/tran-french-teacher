(() => {
  'use strict';

  const api = window.FrenchTranquilleScenarioData;
  const curriculum = window.FrenchTranquilleCurriculum;
  if (!api?.scenarios || !curriculum?.items) return;

  const PACK = 'real-life-jerry-3';
  const norm = value => String(value || '')
    .toLocaleLowerCase('fr-FR')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[’']/g,' ')
    .replace(/[^a-z0-9\s-]/g,' ')
    .replace(/\s+/g,' ').trim();

  function resolveQuery(query) {
    const q = norm(query);
    const matches = curriculum.items.filter(item => norm(item.fr).includes(q));
    return { query, matches:matches.map(item => item.id), id:matches[0]?.id || null };
  }

  function memory(...queries) {
    const resolution = queries.map(resolveQuery);
    return {
      memoryQueries:queries,
      memoryResolution:resolution,
      items:resolution.map(x=>x.id).filter(Boolean)
    };
  }

  const scenarios = [
    {
      id:'jerry-francais-oral',pack:PACK,icon:'👂',
      titleVi:'Jerry nói tiếng Pháp tự nhiên',titleFr:'Jerry parle naturellement',
      descVi:'Nghe vài dạng nói nhanh thường gặp, rồi trả lời bằng tiếng Pháp bạn đã học.',
      descFr:'Comprendre quelques formes orales courantes, puis répondre avec le français que tu connais.',
      requiredLessons:['l20'],
      turns:[
        {
          npcFr:"T'es prête ?",npcVi:'Dạng nói tự nhiên của « Tu es prête ? »',
          promptVi:'Trả lời tự nhiên. Một câu ngắn là đủ.',promptFr:'Réponds naturellement. Une phrase simple suffit.',
          answers:['Je suis prête.','Oui, je suis prête.','Oui je suis prête.'],model:'Je suis prête.',
          hintVi:'Bạn có thể bắt đầu bằng « Je suis… »',hintFr:'Tu peux commencer par « Je suis… »',
          openResponse:true,...memory('je suis prête')
        },
        {
          npcFr:"J'sais pas… on rentre ?",npcVi:'« J’sais pas » = dạng nói nhanh của « Je ne sais pas »',
          promptVi:'Bạn muốn về. Trả lời bằng câu đã học.',promptFr:'Tu veux rentrer. Réponds avec une phrase que tu connais.',
          answers:['Je veux rentrer.','Oui, je veux rentrer.','Je veux rentrer maintenant.'],model:'Je veux rentrer.',
          hintVi:'Dùng « Je veux… »',hintFr:'Utilise « Je veux… »',
          openResponse:true,...memory('je veux rentrer')
        },
        {
          npcFr:"Y a pas de réseau.",npcVi:'« Y a pas… » = dạng nói rất thường gặp của « Il n’y a pas… »',
          promptVi:'Đề nghị Jerry gửi tin nhắn.',promptFr:'Propose à Jerry de t’envoyer un message.',
          answers:['Envoie-moi un message.','Envoie moi un message.','Alors, envoie-moi un message.'],model:'Envoie-moi un message.',
          hintVi:'Bắt đầu bằng « Envoie-moi… »',hintFr:'Commence par « Envoie-moi… »',
          openResponse:true,...memory('envoie-moi un message')
        }
      ]
    },
    {
      id:'jerry-plan-appel',pack:PACK,icon:'📆',
      titleVi:'Nói về kế hoạch sắp tới',titleFr:'Parler d’un projet proche',
      descVi:'Nói một kế hoạch đơn giản bằng futur proche.',
      descFr:'Exprimer un projet simple au futur proche.',
      requiredLessons:['l35'],
      turns:[
        {
          npcFr:'Tu vas faire quoi après ?',npcVi:'Sau đó em sẽ làm gì?',
          promptVi:'Bạn sẽ gọi cho Jerry. Trả lời tự do bằng một câu đơn giản.',promptFr:'Tu vas appeler Jerry. Réponds librement avec une phrase simple.',
          answers:['Je vais appeler Jerry.','Après, je vais appeler Jerry.','Je vais appeler Jerry après.'],model:'Je vais appeler Jerry.',
          hintVi:'Cấu trúc « Je vais + động từ »',hintFr:'Structure « Je vais + infinitif »',
          openResponse:true,...memory('vais appeler Jerry')
        },
        {
          npcFr:'Ce soir ou demain ?',npcVi:'Tối nay hay ngày mai?',
          promptVi:'Nói lại kế hoạch của bạn, thêm “demain” nếu bạn muốn.',promptFr:'Redis ton projet ; tu peux ajouter « demain ».',
          answers:['Je vais appeler Jerry.','Demain, je vais appeler Jerry.','Je vais appeler Jerry demain.'],model:'Demain, je vais appeler Jerry.',
          hintVi:'Giữ cấu trúc « Je vais appeler… »',hintFr:'Garde la structure « Je vais appeler… »',
          openResponse:true,...memory('vais appeler Jerry')
        },
        {
          npcFr:'D’accord, bonne idée.',npcVi:'Được, ý hay.',
          promptVi:'Kết thúc đơn giản bằng lời cảm ơn.',promptFr:'Termine simplement en remerciant.',
          answers:['Merci.','Merci beaucoup.'],model:'Merci.',hintVi:'Một từ là đủ.',hintFr:'Un mot suffit.',items:['merci']
        }
      ]
    },
    {
      id:'jerry-viens-rentrer',pack:PACK,icon:'🏠',
      titleVi:'Bạn vừa mới về nhà',titleFr:'Tu viens de rentrer',
      descVi:'Nói một việc vừa mới xảy ra.',descFr:'Dire quelque chose qui vient juste de se passer.',
      requiredLessons:['l36'],
      turns:[
        {
          npcFr:'Allô Trân, tu es où ?',npcVi:'Alo Trân, em ở đâu?',
          promptVi:'Bạn vừa về. Trả lời tự nhiên.',promptFr:'Tu viens de rentrer. Réponds naturellement.',
          answers:['Je viens de rentrer.','Je viens juste de rentrer.','Oui, je viens de rentrer.'],model:'Je viens de rentrer.',
          hintVi:'Cấu trúc « Je viens de… »',hintFr:'Structure « Je viens de… »',
          openResponse:true,...memory('viens de rentrer')
        },
        {
          npcFr:'Tout va bien ?',npcVi:'Mọi thứ ổn chứ?',
          promptVi:'Trả lời “oui” theo cách đơn giản.',promptFr:'Réponds simplement oui.',
          answers:['Oui.','Oui, ça va.','Oui ça va.'],model:'Oui.',hintVi:'Một câu rất ngắn là đủ.',hintFr:'Une réponse très courte suffit.',items:['oui']
        },
        {
          npcFr:'Parfait, repose-toi.',npcVi:'Tốt, nghỉ ngơi nhé.',
          promptVi:'Cảm ơn Jerry.',promptFr:'Remercie Jerry.',
          answers:['Merci.','Merci Jerry.','Merci beaucoup.'],model:'Merci.',hintVi:'“Merci” là đủ.',hintFr:'« Merci » suffit.',items:['merci']
        }
      ]
    },
    {
      id:'jerry-raconte-repas',pack:PACK,icon:'🍜',
      titleVi:'Kể một việc đã làm',titleFr:'Raconter une action passée',
      descVi:'Trả lời câu hỏi đơn giản về điều bạn đã làm.',descFr:'Répondre simplement à une question sur ce que tu as fait.',
      requiredLessons:['l37'],
      turns:[
        {
          npcFr:'Tu as mangé ?',npcVi:'Em ăn chưa?',
          promptVi:'Bạn đã ăn rồi. Trả lời tự nhiên.',promptFr:'Tu as déjà mangé. Réponds naturellement.',
          answers:["J'ai mangé.","Oui, j'ai mangé.","Oui j'ai mangé."],model:"J'ai mangé.",
          hintVi:'Cấu trúc passé composé với « avoir »',hintFr:'Passé composé avec « avoir »',
          openResponse:true,...memory("j'ai mangé")
        },
        {
          npcFr:'C’était bon ?',npcVi:'Ngon không?',
          promptVi:'Nói rằng rất ngon.',promptFr:'Dis que c’était très bon.',
          answers:["C'était très bon.",'C etait tres bon.','Oui, c’était très bon.'],model:"C'était très bon.",
          hintVi:'Câu này đã gặp trong tình huống nhà hàng.',hintFr:'Tu as déjà rencontré cette phrase au restaurant.',items:['tres-bon']
        },
        {
          npcFr:'Super.',npcVi:'Tuyệt.',
          promptVi:'Kết thúc bằng một câu ngắn bạn muốn.',promptFr:'Termine avec une petite réponse de ton choix.',
          answers:['Oui.','Merci.','Oui, merci.'],model:'Oui.',hintVi:'“Oui” hoặc “Merci” đều được.',hintFr:'« Oui » ou « Merci » conviennent.',openResponse:true,items:['oui']
        }
      ]
    },
    {
      id:'jerry-rentree-maison',pack:PACK,icon:'🚪',
      titleVi:'Nói rằng bạn đã về đến nhà',titleFr:'Dire que tu es rentrée à la maison',
      descVi:'Dùng passé composé với một động từ chuyển động.',descFr:'Utiliser le passé composé avec un verbe de mouvement.',
      requiredLessons:['l38'],
      turns:[
        {
          npcFr:'Tu es bien arrivée ?',npcVi:'Em về đến nơi an toàn chưa?',
          promptVi:'Nói rằng bạn đã về nhà.',promptFr:'Dis que tu es rentrée à la maison.',
          answers:['Je suis rentrée à la maison.','Oui, je suis rentrée à la maison.','Je suis rentrée à la maison, oui.'],model:'Je suis rentrée à la maison.',
          hintVi:'Bắt đầu bằng « Je suis rentrée… »',hintFr:'Commence par « Je suis rentrée… »',
          openResponse:true,...memory('suis rentrée à la maison')
        },
        {
          npcFr:'Tout va bien ?',npcVi:'Mọi thứ ổn chứ?',
          promptVi:'Trả lời ngắn gọn.',promptFr:'Réponds brièvement.',
          answers:['Oui.','Oui, ça va.','Oui ça va.'],model:'Oui, ça va.',hintVi:'“Oui” là đủ.',hintFr:'« Oui » suffit.',openResponse:true,items:['oui']
        },
        {
          npcFr:'Très bien.',npcVi:'Rất tốt.',
          promptVi:'Cảm ơn.',promptFr:'Remercie.',
          answers:['Merci.','Merci beaucoup.'],model:'Merci.',hintVi:'Một từ.',hintFr:'Un mot.',items:['merci']
        }
      ]
    },
    {
      id:'jerry-papiers-comprendre',pack:PACK,icon:'📄',
      titleVi:'Không hiểu giấy tờ',titleFr:'Ne pas comprendre un document',
      descVi:'Nói rõ rằng bạn không hiểu và yêu cầu giải thích.',descFr:'Dire clairement que tu ne comprends pas et demander une explication.',
      requiredLessons:['l39'],
      turns:[
        {
          npcFr:'Voici le document. Vous devez remplir cette partie.',npcVi:'Đây là giấy tờ. Cô phải điền phần này.',
          promptVi:'Bạn không hiểu. Hãy nói điều đó.',promptFr:'Tu ne comprends pas. Dis-le.',
          answers:['Je ne comprends pas.','Je ne comprends pas bien.'],model:'Je ne comprends pas.',hintVi:'Câu cơ bản đã học từ đầu.',hintFr:'Une phrase de base apprise très tôt.',items:['je-ne-comprends-pas']
        },
        {
          npcFr:'Pas de problème.',npcVi:'Không sao.',
          promptVi:'Yêu cầu người đó giải thích.',promptFr:'Demande à la personne de t’expliquer.',
          answers:["Pouvez-vous m'expliquer ?",'Pouvez vous m expliquer ?','Vous pouvez m’expliquer ?'],model:"Pouvez-vous m'expliquer ?",
          hintVi:'Bắt đầu bằng « Pouvez-vous… »',hintFr:'Commence par « Pouvez-vous… »',
          openResponse:true,...memory("m'expliquer")
        },
        {
          npcFr:'Bien sûr, je vous explique.',npcVi:'Tất nhiên, tôi giải thích.',
          promptVi:'Cảm ơn một cách lịch sự.',promptFr:'Remercie poliment.',
          answers:['Merci.','Merci beaucoup.','Merci beaucoup, monsieur.','Merci beaucoup, madame.'],model:'Merci beaucoup.',hintVi:'“Merci” là đủ.',hintFr:'« Merci » suffit.',openResponse:true,items:['merci']
        }
      ]
    },
    {
      id:'jerry-inquiete-parler',pack:PACK,icon:'💬',
      titleVi:'Bạn lo lắng và muốn nói chuyện',titleFr:'Tu es inquiète et tu veux parler',
      descVi:'Diễn đạt cảm xúc và nhu cầu một cách đơn giản.',descFr:'Exprimer simplement une émotion et un besoin.',
      requiredLessons:['l40'],
      turns:[
        {
          npcFr:'Trân, ça va ?',npcVi:'Trân, em ổn không?',
          promptVi:'Bạn đang lo. Trả lời tự nhiên.',promptFr:'Tu es inquiète. Réponds naturellement.',
          answers:['Je suis inquiète.','Je suis un peu inquiète.','Oui, je suis inquiète.'],model:'Je suis inquiète.',
          hintVi:'Bắt đầu bằng « Je suis… »',hintFr:'Commence par « Je suis… »',
          openResponse:true,...memory('je suis inquiète')
        },
        {
          npcFr:'Tu veux me dire quelque chose ?',npcVi:'Em muốn nói gì với anh không?',
          promptVi:'Nói rằng bạn cần nói chuyện.',promptFr:'Dis que tu as besoin de parler.',
          answers:["J'ai besoin de parler.",'J ai besoin de parler.','Oui, j’ai besoin de parler.'],model:"J'ai besoin de parler.",
          hintVi:'« J’ai besoin de… »',hintFr:'« J’ai besoin de… »',
          openResponse:true,...memory('besoin de parler')
        },
        {
          npcFr:'Je suis là.',npcVi:'Anh ở đây.',
          promptVi:'Nói một điều tình cảm bạn đã học.',promptFr:'Dis une chose affectueuse que tu as apprise.',
          answers:['Tu me manques.','Tu me manques beaucoup.'],model:'Tu me manques.',
          hintVi:'Câu bắt đầu bằng « Tu me… »',hintFr:'La phrase commence par « Tu me… »',
          openResponse:true,...memory('tu me manques')
        }
      ]
    },
    {
      id:'jerry-message-couple',pack:PACK,icon:'❤️',
      titleVi:'Một tin nhắn ngắn cho Jerry',titleFr:'Un petit message pour Jerry',
      descVi:'Kết hợp vài câu đã học mà không cần lặp y nguyên một mẫu dài.',descFr:'Enchaîner quelques phrases connues sans répéter un long modèle mot pour mot.',
      requiredLessons:['l40'],
      turns:[
        {
          npcFr:'Écris-moi quand tu peux.',npcVi:'Nhắn cho anh khi em có thể nhé.',
          promptVi:'Nói rằng bạn vừa về.',promptFr:'Dis que tu viens de rentrer.',
          answers:['Je viens de rentrer.','Je viens juste de rentrer.','Je viens de rentrer à la maison.'],model:'Je viens de rentrer.',
          hintVi:'« Je viens de… »',hintFr:'« Je viens de… »',
          openResponse:true,...memory('viens de rentrer')
        },
        {
          npcFr:'Ça va ?',npcVi:'Em ổn chứ?',
          promptVi:'Bạn hơi lo. Trả lời bằng cách của bạn.',promptFr:'Tu es un peu inquiète. Réponds avec tes mots.',
          answers:['Je suis inquiète.','Je suis un peu inquiète.','Oui, je suis un peu inquiète.'],model:'Je suis un peu inquiète.',
          hintVi:'Dùng « inquiète »',hintFr:'Utilise « inquiète »',
          openResponse:true,...memory('je suis inquiète')
        },
        {
          npcFr:'Je t’appelle ?',npcVi:'Anh gọi cho em nhé?',
          promptVi:'Nói rằng bạn cần nói chuyện.',promptFr:'Dis que tu as besoin de parler.',
          answers:["J'ai besoin de parler.",'Oui, j’ai besoin de parler.','J ai besoin de parler.'],model:"J'ai besoin de parler.",
          hintVi:'« J’ai besoin… »',hintFr:'« J’ai besoin… »',
          openResponse:true,...memory('besoin de parler')
        }
      ]
    }
  ];

  const existing = new Set(api.scenarios.map(s => s.id));
  const added = scenarios.filter(s => !existing.has(s.id));
  api.scenarios.push(...added);

  const resolution = added.flatMap(s => s.turns.flatMap(t => (t.memoryResolution || []).map(r => ({scenario:s.id,...r}))));

  window.FrenchTranquilleRealLife3 = {
    version:'1.18.0',build:25,pack:PACK,
    scenarios:added,
    scenarioIds:added.map(s=>s.id),
    resolution
  };
})();
