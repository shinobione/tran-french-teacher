(() => {
  'use strict';

  const api = window.FrenchTranquilleScenarioData;
  if (!api?.scenarios) return;

  const P = 'real-life-jerry-1';
  const scenarios = [
    {
      id:'jerry-parle-vite',pack:P,priority:100,icon:'🗣️',
      titleVi:'Jerry nói quá nhanh',titleFr:'Jerry parle trop vite',
      descVi:'Nói rằng bạn chưa hiểu, xin nhắc lại rồi xin nói chậm hơn.',
      descFr:'Dire que tu ne comprends pas encore, demander de répéter puis de parler plus lentement.',
      requiredLessons:['l2'],
      turns:[
        {
          npcFr:'Trân, on y va après, mais d’abord je dois passer prendre quelque chose et ensuite…',
          npcVi:'Jerry nói một câu dài và nhanh.',
          promptVi:'Bạn không hiểu. Hãy nói điều đó đơn giản.',promptFr:'Tu ne comprends pas. Dis-le simplement.',
          answers:['Je ne comprends pas.','Je ne comprends pas'],model:'Je ne comprends pas.',
          hintVi:'Bắt đầu bằng “Je ne…”',hintFr:'Commence par « Je ne… »',items:['je-ne-comprends-pas']
        },
        {
          npcFr:'D’accord.',npcVi:'Được rồi.',
          promptVi:'Xin Jerry nhắc lại.',promptFr:'Demande à Jerry de répéter.',
          answers:['Pouvez-vous répéter ?','Pouvez-vous répéter','Pouvez vous répéter ?','Pouvez vous repeter ?'],model:'Pouvez-vous répéter ?',
          hintVi:'Câu đã học bắt đầu bằng “Pouvez-vous…”',hintFr:'La phrase apprise commence par « Pouvez-vous… »',items:['repetez']
        },
        {
          npcFr:'Bien sûr. Je répète.',npcVi:'Tất nhiên. Anh nhắc lại.',
          promptVi:'Bây giờ xin Jerry nói chậm hơn.',promptFr:'Demande maintenant à Jerry de parler plus lentement.',
          answers:["Plus lentement, s'il vous plaît.",'Plus lentement, s’il vous plaît.','Plus lentement s il vous plait.','Plus lentement.'],model:"Plus lentement, s'il vous plaît.",
          hintVi:'Bắt đầu bằng “Plus…”',hintFr:'Commence par « Plus… »',items:['plus-lentement','svp']
        }
      ]
    },
    {
      id:'jerry-presente-tran',pack:P,priority:95,icon:'👋',
      titleVi:'Jerry giới thiệu bạn với một người',titleFr:'Jerry te présente à quelqu’un',
      descVi:'Chào hỏi, nói tên và nói bạn đến từ Việt Nam.',
      descFr:'Saluer, donner ton prénom et dire que tu viens du Vietnam.',
      requiredLessons:['l3'],
      turns:[
        {
          npcFr:'Bonjour Trân ! Enchanté.',npcVi:'Xin chào Trân! Rất vui được gặp bạn.',
          promptVi:'Chào lại người đó.',promptFr:'Salue la personne.',
          answers:['Bonjour.','Bonjour'],model:'Bonjour.',hintVi:'Một từ là đủ.',hintFr:'Un mot suffit.',items:['bonjour']
        },
        {
          npcFr:'Moi, c’est Thomas.',npcVi:'Tôi là Thomas.',
          promptVi:'Nói tên của bạn.',promptFr:'Dis ton prénom.',
          answers:["Je m'appelle Trân.","Je m'appelle Tran.",'Je m appelle Trân.','Je m appelle Tran.'],model:"Je m'appelle Trân.",
          hintVi:'Dùng “Je m’appelle…”',hintFr:'Utilise « Je m’appelle… »',items:['je-mappelle']
        },
        {
          npcFr:'Tu viens d’où ?',npcVi:'Bạn đến từ đâu?',
          promptVi:'Nói rằng bạn đến từ Việt Nam.',promptFr:'Dis que tu viens du Vietnam.',
          answers:['Je viens du Vietnam.','Je viens du Vietnam'],model:'Je viens du Vietnam.',
          hintVi:'Bắt đầu bằng “Je viens…”',hintFr:'Commence par « Je viens… »',items:['je-viens-vietnam']
        }
      ]
    },
    {
      id:'jerry-cafe-ensemble',pack:P,priority:90,icon:'☕',
      titleVi:'Uống cà phê với Jerry',titleFr:'Prendre un café avec Jerry',
      descVi:'Chọn đồ uống, hỏi giá và xin hóa đơn.',
      descFr:'Choisir une boisson, demander le prix et demander l’addition.',
      requiredLessons:['l4'],
      turns:[
        {
          npcFr:'Tu veux boire quoi ?',npcVi:'Em muốn uống gì?',
          promptVi:'Bạn muốn một ly trà. Trả lời lịch sự.',promptFr:'Tu veux un thé. Réponds poliment.',
          answers:["Je voudrais un thé, s'il vous plaît.",'Je voudrais un thé, s’il vous plaît.','Je voudrais un thé.'],model:"Je voudrais un thé, s'il vous plaît.",
          hintVi:'Dùng “Je voudrais…”',hintFr:'Utilise « Je voudrais… »',items:['je-voudrais','the','svp']
        },
        {
          npcFr:'On paie ici.',npcVi:'Mình trả tiền ở đây.',
          promptVi:'Hỏi giá bao nhiêu.',promptFr:'Demande combien ça coûte.',
          answers:['Combien ça coûte ?','Combien ça coute ?','Combien ça coûte'],model:'Combien ça coûte ?',
          hintVi:'Bắt đầu bằng “Combien…”',hintFr:'Commence par « Combien… »',items:['combien-ca-coute']
        },
        {
          npcFr:'On a fini.',npcVi:'Mình xong rồi.',
          promptVi:'Xin hóa đơn.',promptFr:'Demande l’addition.',
          answers:["L'addition, s'il vous plaît.",'L’addition, s’il vous plaît.','L addition s il vous plait.','L’addition.'],model:"L'addition, s'il vous plaît.",
          hintVi:'Bắt đầu bằng “L’addition…”',hintFr:'Commence par « L’addition… »',items:['addition','svp']
        }
      ]
    },
    {
      id:'jerry-gouts',pack:P,priority:85,icon:'❤️',
      titleVi:'Nói với Jerry điều bạn thích',titleFr:'Dire à Jerry ce que tu aimes',
      descVi:'Nói mình thích gì, không thích gì và mình thích thứ nào hơn.',
      descFr:'Dire ce que tu aimes, ce que tu n’aimes pas et ce que tu préfères.',
      requiredLessons:['l5'],
      turns:[
        {
          npcFr:'Tu aimes le café ?',npcVi:'Em thích cà phê không?',
          promptVi:'Nói rằng bạn thích cà phê.',promptFr:'Dis que tu aimes le café.',
          answers:["J'aime le café.","J'aime le cafe.",'J aime le café.'],model:"J'aime le café.",
          hintVi:'Dùng “J’aime…”',hintFr:'Utilise « J’aime… »',items:['jaime','cafe']
        },
        {
          npcFr:'Et le thé ?',npcVi:'Còn trà thì sao?',
          promptVi:'Nói rằng bạn không thích trà.',promptFr:'Dis que tu n’aimes pas le thé.',
          answers:["Je n'aime pas le thé.","Je n'aime pas le the.",'Je n aime pas le thé.'],model:"Je n'aime pas le thé.",
          hintVi:'Dùng “Je n’aime pas…”',hintFr:'Utilise « Je n’aime pas… »',items:['je-naime-pas','the']
        },
        {
          npcFr:'Alors tu préfères quoi ?',npcVi:'Vậy em thích thứ nào hơn?',
          promptVi:'Nói rằng bạn thích cà phê hơn.',promptFr:'Dis que tu préfères le café.',
          answers:['Je préfère le café.','Je prefere le cafe.','Je préfère le café'],model:'Je préfère le café.',
          hintVi:'Dùng “Je préfère…”',hintFr:'Utilise « Je préfère… »',items:['je-prefere','cafe']
        }
      ]
    },
    {
      id:'jerry-petit-achat',pack:P,priority:80,icon:'💶',
      titleVi:'Mua một món nhỏ với Jerry',titleFr:'Faire un petit achat avec Jerry',
      descVi:'Hỏi giá, nghe một giá đơn giản và kết thúc lịch sự.',
      descFr:'Demander le prix, comprendre un prix simple et terminer poliment.',
      requiredLessons:['l7'],
      turns:[
        {
          npcFr:'Tu veux acheter ça ?',npcVi:'Em muốn mua cái này không?',
          promptVi:'Hỏi món này giá bao nhiêu.',promptFr:'Demande combien ça coûte.',
          answers:['Combien ça coûte ?','Combien ça coute ?'],model:'Combien ça coûte ?',
          hintVi:'“Combien…”',hintFr:'« Combien… »',items:['combien-ca-coute']
        },
        {
          npcFr:'Ça coûte dix euros.',npcVi:'Giá mười euro.',
          promptVi:'Nhắc lại giá: mười euro.',promptFr:'Répète le prix : dix euros.',
          answers:['Dix euros.','Dix euros','10 euros.','10 euros'],model:'Dix euros.',
          hintVi:'Số 10 + euro.',hintFr:'Le nombre 10 + euros.',items:['dix','euros']
        },
        {
          npcFr:'D’accord ?',npcVi:'Được chứ?',
          promptVi:'Trả lời có và cảm ơn.',promptFr:'Réponds oui et remercie.',
          answers:['Oui, merci.','Oui merci.','Oui. Merci.'],model:'Oui, merci.',
          hintVi:'Hai từ đã học.',hintFr:'Deux mots déjà appris.',items:['oui','merci']
        }
      ]
    },
    {
      id:'jerry-trouver-lieu',pack:P,priority:75,icon:'📍',
      titleVi:'Tìm đường cùng Jerry',titleFr:'Trouver un lieu avec Jerry',
      descVi:'Hỏi nhà ga ở đâu, hiểu trái/phải và cảm ơn.',
      descFr:'Demander où est la gare, comprendre gauche/droite et remercier.',
      requiredLessons:['l8'],
      turns:[
        {
          npcFr:'On cherche la gare.',npcVi:'Mình đang tìm nhà ga.',
          promptVi:'Hỏi một người: nhà ga ở đâu?',promptFr:'Demande à quelqu’un où est la gare.',
          answers:['Où est la gare ?','Ou est la gare ?','Où est la gare'],model:'Où est la gare ?',
          hintVi:'Dùng “Où est…”',hintFr:'Utilise « Où est… »',items:['ou-est','gare']
        },
        {
          npcFr:'À gauche.',npcVi:'Bên trái.',
          promptVi:'Nhắc lại hướng để chắc chắn: bên trái.',promptFr:'Répète la direction pour confirmer : à gauche.',
          answers:['À gauche.','A gauche.','À gauche'],model:'À gauche.',
          hintVi:'Hai từ.',hintFr:'Deux mots.',items:['a-gauche']
        },
        {
          npcFr:'Oui, exactement.',npcVi:'Đúng rồi.',
          promptVi:'Cảm ơn người đã chỉ đường.',promptFr:'Remercie la personne.',
          answers:['Merci.','Merci beaucoup.'],model:'Merci.',
          hintVi:'Một từ là đủ.',hintFr:'Un mot suffit.',items:['merci']
        }
      ]
    }
  ];

  const existing = new Set(api.scenarios.map(s => s.id));
  const added = scenarios.filter(s => !existing.has(s.id));
  api.scenarios.push(...added);
  api.realLifePack1 = { id:P, version:'1.16.0', build:23, scenarioIds:added.map(s=>s.id) };

  window.FrenchTranquilleRealLife1 = {
    version:'1.16.0',build:23,pack:P,
    scenarios:added,
    scenarioIds:added.map(s=>s.id)
  };
})();
