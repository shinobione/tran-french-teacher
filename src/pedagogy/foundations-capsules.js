(() => {
  'use strict';

  const RAW = {
    id:'articles-gender-number',
    concepts:['F01','F02','F03','F04'],
    title:{
      vi:'Mạo từ, giống & số nhiều',
      fr:'Articles, genre & pluriel'
    },
    intro:[
      {
        vi:'Trong tiếng Pháp, hãy học danh từ cùng với “người bạn nhỏ” đứng trước nó.',
        fr:'En français, apprends le nom avec son petit compagnon placé devant.'
      },
      {
        vi:'Danh từ thường có giống ngữ pháp: giống đực hoặc giống cái. Không phải lúc nào cũng đoán được, vì vậy học “la gare”, không chỉ học “gare”.',
        fr:'Les noms ont généralement un genre grammatical, masculin ou féminin. On ne peut pas toujours le deviner : apprends « la gare », pas seulement « gare ».'
      },
      {
        vi:'Số nhiều dùng “les” cho cả hai giống. Với một thứ chưa xác định: un (đực), une (cái), des (số nhiều).',
        fr:'Au pluriel, « les » fonctionne pour les deux genres. Pour une chose non identifiée : un (masculin), une (féminin), des (pluriel).'
      }
    ],
    examples:['🚉 la gare','🎫 un billet','🍽️ une table','🚻 les toilettes'],
    checks:[
      {
        id:'gare-definite',
        prompt:{vi:'Chọn từ đúng: ___ gare',fr:'Choisis : ___ gare'},
        choices:['le','la','les'],
        answer:'la',
        feedback:{vi:'“gare” là danh từ giống cái: la gare.',fr:'« gare » est féminin : la gare.'}
      },
      {
        id:'billet-indefinite',
        prompt:{vi:'Bạn nói về một vé chưa xác định: ___ billet',fr:'Tu parles d’un billet non encore identifié : ___ billet'},
        choices:['un','une','des'],
        answer:'un',
        feedback:{vi:'“billet” là giống đực: un billet.',fr:'« billet » est masculin : un billet.'}
      },
      {
        id:'table-indefinite',
        prompt:{vi:'Bạn xin một cái bàn: ___ table',fr:'Tu demandes une table : ___ table'},
        choices:['un','une','des'],
        answer:'une',
        feedback:{vi:'“table” là giống cái: une table.',fr:'« table » est féminin : une table.'}
      },
      {
        id:'pharmacie-plural',
        prompt:{vi:'Số nhiều: la pharmacie → ___ pharmacies',fr:'Au pluriel : la pharmacie → ___ pharmacies'},
        choices:['le','la','les'],
        answer:'les',
        feedback:{vi:'Ở số nhiều, le/la trở thành les.',fr:'Au pluriel, le/la devient les.'}
      }
    ],
    conclusion:{
      vi:'Điểm quan trọng: học danh từ cùng với mạo từ — la gare, un billet, une table. Khi chuyển sang số nhiều, le/la → les. Một bài kiểm tra đúng chưa có nghĩa là đã “thành thạo”; Tyffany sẽ cho các mẫu này quay lại sau.',
      fr:'L’idée clé : apprends le nom avec son article — la gare, un billet, une table. Au pluriel, le/la → les. Une bonne réponse ne signifie pas que la règle est « maîtrisée » ; Tyffany la fera revenir plus tard.'
    },
    optional:true,
    persistence:'ephemeral-only',
    masteryClaim:false
  };

  const engine = typeof module === 'object' && module.exports
    ? require('./foundations-capsule-engine.js')
    : window.FrenchTranquilleFoundationsCapsuleEngine;
  if (!engine) throw new Error('Foundations capsule engine must load before capsule definitions');

  const CAPSULES = Object.freeze({
    F01_F04:engine.compile(RAW)
  });

  if (typeof module === 'object' && module.exports) module.exports = CAPSULES;
  if (typeof window !== 'undefined') window.FrenchTranquilleFoundationsCapsules = CAPSULES;
})();
