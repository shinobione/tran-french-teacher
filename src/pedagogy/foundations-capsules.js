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

  const NEGATION_RAW = {
    id:'negation-core',
    concepts:['F11'],
    title:{
      vi:'Phủ định: ne / n’ ... pas',
      fr:'La négation : ne / n’ ... pas'
    },
    intro:[
      {
        vi:'Trong tiếng Pháp viết cẩn thận, “không” thường bao quanh động từ: ne ... pas.',
        fr:'En français soigné, la négation entoure généralement le verbe : ne ... pas.'
      },
      {
        vi:'Trước nguyên âm hoặc h câm, ne trở thành n’: J’ai → Je n’ai pas. Mẫu vẫn giống nhau: n’ trước động từ, pas sau động từ.',
        fr:'Devant une voyelle ou un h muet, ne devient n’ : J’ai → Je n’ai pas. Le réflexe reste le même : n’ avant le verbe, pas après.'
      },
      {
        vi:'Trong lời nói nhanh, đôi khi người Pháp bỏ “ne”. Nhưng để học và viết rõ ràng, hãy giữ ne / n’ ... pas làm mẫu cơ bản.',
        fr:'À l’oral rapide, le ne peut parfois disparaître. Pour apprendre et écrire clairement, garde ne / n’ ... pas comme modèle de base.'
      }
    ],
    examples:['Je ne comprends pas.',"Je n'ai pas de monnaie.",'Je ne peux pas.',"Il n'y a pas d'eau chaude."],
    checks:[
      {
        id:'negation-ne',
        prompt:{vi:'Điền từ: Je ___ comprends pas.',fr:'Complète : Je ___ comprends pas.'},
        choices:['ne','n’','pas'],
        answer:'ne',
        feedback:{vi:'Với “comprends”, dùng ne trước động từ và pas sau: Je ne comprends pas.',fr:'Avec « comprends », ne vient avant le verbe et pas après : Je ne comprends pas.'}
      },
      {
        id:'negation-elision',
        prompt:{vi:'Trước “ai”, dùng dạng nào của ne?',fr:'Devant « ai », quelle forme de ne utilise-t-on ?'},
        choices:['ne','n’','pas'],
        answer:'n’',
        feedback:{vi:'Trước nguyên âm, ne rút gọn thành n’: Je n’ai pas de monnaie.',fr:'Devant une voyelle, ne s’élide en n’ : Je n’ai pas de monnaie.'}
      },
      {
        id:'negation-pas',
        prompt:{vi:'Điền từ: Je ne peux ___ .',fr:'Complète : Je ne peux ___ .'},
        choices:['pas','ne','n’'],
        answer:'pas',
        feedback:{vi:'pas đứng sau động từ: Je ne peux pas.',fr:'pas vient après le verbe : Je ne peux pas.'}
      },
      {
        id:'negation-il-y-a',
        prompt:{vi:'Chọn câu đúng:',fr:'Choisis la phrase correcte :'},
        choices:["Il n'y a pas d'eau chaude.","Il ne y a pas d'eau chaude.","Il y a ne pas d'eau chaude."],
        answer:"Il n'y a pas d'eau chaude.",
        feedback:{vi:'“Il y a” trở thành “Il n’y a pas ...” ở dạng phủ định.',fr:'« Il y a » devient « Il n’y a pas ... » à la forme négative.'}
      }
    ],
    conclusion:{
      vi:'Phản xạ cần giữ: ne / n’ trước động từ, pas sau động từ — Je ne comprends pas, Je n’ai pas, Je ne peux pas. Trong lời nói tự nhiên, “ne” đôi khi biến mất, nhưng mẫu đầy đủ vẫn là nền tảng an toàn. Một mini-check đúng chưa có nghĩa là đã “thành thạo”.',
      fr:'Le réflexe à garder : ne / n’ avant le verbe, pas après — Je ne comprends pas, Je n’ai pas, Je ne peux pas. À l’oral naturel, « ne » peut parfois disparaître, mais la forme complète reste la base la plus sûre. Un mini-check réussi ne signifie pas que la règle est « maîtrisée ».'
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
    F01_F04:engine.compile(RAW),
    F11:engine.compile(NEGATION_RAW)
  });

  if (typeof module === 'object' && module.exports) module.exports = CAPSULES;
  if (typeof window !== 'undefined') window.FrenchTranquilleFoundationsCapsules = CAPSULES;
})();