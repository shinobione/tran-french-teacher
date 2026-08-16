(() => {
  'use strict';

  const RAW = {
    id:'articles-gender-number',
    concepts:['F01','F02','F03','F04'],
    title:{vi:'Mạo từ, giống & số nhiều',fr:'Articles, genre & pluriel'},
    intro:[
      {vi:'Trong tiếng Pháp, hãy học danh từ cùng với “người bạn nhỏ” đứng trước nó.',fr:'En français, apprends le nom avec son petit compagnon placé devant.'},
      {vi:'Danh từ thường có giống ngữ pháp: giống đực hoặc giống cái. Không phải lúc nào cũng đoán được, vì vậy học “la gare”, không chỉ học “gare”.',fr:'Les noms ont généralement un genre grammatical, masculin ou féminin. On ne peut pas toujours le deviner : apprends « la gare », pas seulement « gare ».'},
      {vi:'Số nhiều dùng “les” cho cả hai giống. Với một thứ chưa xác định: un (đực), une (cái), des (số nhiều).',fr:'Au pluriel, « les » fonctionne pour les deux genres. Pour une chose non identifiée : un (masculin), une (féminin), des (pluriel).'}
    ],
    examples:['🚉 la gare','🎫 un billet','🍽️ une table','🚻 les toilettes'],
    checks:[
      {id:'gare-definite',prompt:{vi:'Chọn từ đúng: ___ gare',fr:'Choisis : ___ gare'},choices:['le','la','les'],answer:'la',feedback:{vi:'“gare” là danh từ giống cái: la gare.',fr:'« gare » est féminin : la gare.'}},
      {id:'billet-indefinite',prompt:{vi:'Bạn nói về một vé chưa xác định: ___ billet',fr:'Tu parles d’un billet non encore identifié : ___ billet'},choices:['un','une','des'],answer:'un',feedback:{vi:'“billet” là giống đực: un billet.',fr:'« billet » est masculin : un billet.'}},
      {id:'table-indefinite',prompt:{vi:'Bạn xin một cái bàn: ___ table',fr:'Tu demandes une table : ___ table'},choices:['un','une','des'],answer:'une',feedback:{vi:'“table” là giống cái: une table.',fr:'« table » est féminin : une table.'}},
      {id:'pharmacie-plural',prompt:{vi:'Số nhiều: la pharmacie → ___ pharmacies',fr:'Au pluriel : la pharmacie → ___ pharmacies'},choices:['le','la','les'],answer:'les',feedback:{vi:'Ở số nhiều, le/la trở thành les.',fr:'Au pluriel, le/la devient les.'}}
    ],
    conclusion:{vi:'Điểm quan trọng: học danh từ cùng với mạo từ — la gare, un billet, une table. Khi chuyển sang số nhiều, le/la → les. Một bài kiểm tra đúng chưa có nghĩa là đã “thành thạo”; Tyffany sẽ cho các mẫu này quay lại sau.',fr:'L’idée clé : apprends le nom avec son article — la gare, un billet, une table. Au pluriel, le/la → les. Une bonne réponse ne signifie pas que la règle est « maîtrisée » ; Tyffany la fera revenir plus tard.'},
    optional:true,persistence:'ephemeral-only',masteryClaim:false
  };

  const NEGATION_RAW = {
    id:'negation-core',concepts:['F11'],
    title:{vi:'Phủ định: ne / n’ ... pas',fr:'La négation : ne / n’ ... pas'},
    intro:[
      {vi:'Trong tiếng Pháp viết cẩn thận, “không” thường bao quanh động từ: ne ... pas.',fr:'En français soigné, la négation entoure généralement le verbe : ne ... pas.'},
      {vi:'Trước nguyên âm hoặc h câm, ne trở thành n’: J’ai → Je n’ai pas. Mẫu vẫn giống nhau: n’ trước động từ, pas sau động từ.',fr:'Devant une voyelle ou un h muet, ne devient n’ : J’ai → Je n’ai pas. Le réflexe reste le même : n’ avant le verbe, pas après.'},
      {vi:'Trong lời nói nhanh, đôi khi người Pháp bỏ “ne”. Nhưng để học và viết rõ ràng, hãy giữ ne / n’ ... pas làm mẫu cơ bản.',fr:'À l’oral rapide, le ne peut parfois disparaître. Pour apprendre et écrire clairement, garde ne / n’ ... pas comme modèle de base.'}
    ],
    examples:['Je ne comprends pas.',"Je n'ai pas de monnaie.",'Je ne peux pas.',"Il n'y a pas d'eau chaude."],
    checks:[
      {id:'negation-ne',prompt:{vi:'Điền từ: Je ___ comprends pas.',fr:'Complète : Je ___ comprends pas.'},choices:['ne','n’','pas'],answer:'ne',feedback:{vi:'Với “comprends”, dùng ne trước động từ và pas sau: Je ne comprends pas.',fr:'Avec « comprends », ne vient avant le verbe et pas après : Je ne comprends pas.'}},
      {id:'negation-elision',prompt:{vi:'Trước “ai”, dùng dạng nào của ne?',fr:'Devant « ai », quelle forme de ne utilise-t-on ?'},choices:['ne','n’','pas'],answer:'n’',feedback:{vi:'Trước nguyên âm, ne rút gọn thành n’: Je n’ai pas de monnaie.',fr:'Devant une voyelle, ne s’élide en n’ : Je n’ai pas de monnaie.'}},
      {id:'negation-pas',prompt:{vi:'Điền từ: Je ne peux ___ .',fr:'Complète : Je ne peux ___ .'},choices:['pas','ne','n’'],answer:'pas',feedback:{vi:'pas đứng sau động từ: Je ne peux pas.',fr:'pas vient après le verbe : Je ne peux pas.'}},
      {id:'negation-il-y-a',prompt:{vi:'Chọn câu đúng:',fr:'Choisis la phrase correcte :'},choices:["Il n'y a pas d'eau chaude.","Il ne y a pas d'eau chaude.","Il y a ne pas d'eau chaude."],answer:"Il n'y a pas d'eau chaude.",feedback:{vi:'“Il y a” trở thành “Il n’y a pas ...” ở dạng phủ định.',fr:'« Il y a » devient « Il n’y a pas ... » à la forme négative.'}}
    ],
    conclusion:{vi:'Phản xạ cần giữ: ne / n’ trước động từ, pas sau động từ — Je ne comprends pas, Je n’ai pas, Je ne peux pas. Trong lời nói tự nhiên, “ne” đôi khi biến mất, nhưng mẫu đầy đủ vẫn là nền tảng an toàn. Một mini-check đúng chưa có nghĩa là đã “thành thạo”.',fr:'Le réflexe à garder : ne / n’ avant le verbe, pas après — Je ne comprends pas, Je n’ai pas, Je ne peux pas. À l’oral naturel, « ne » peut parfois disparaître, mais la forme complète reste la base la plus sûre. Un mini-check réussi ne signifie pas que la règle est « maîtrisée ».'},
    optional:true,persistence:'ephemeral-only',masteryClaim:false
  };

  const SUBJECT_PRONOUNS_RAW = {
    id:'subject-pronouns-core',concepts:['F05'],
    title:{vi:'Ai làm hành động? je • tu • il/elle • nous • vous',fr:'Qui fait l’action ? je • tu • il/elle • nous • vous'},
    intro:[
      {vi:'Bạn đã gặp các từ nhỏ này trong nhiều câu. Chúng cho biết ai đang làm hành động hoặc ai đang ở trong một trạng thái.',fr:'Tu as déjà rencontré ces petits mots dans beaucoup de phrases. Ils indiquent qui fait l’action ou qui est dans un état.'},
      {vi:'je = tôi • tu = bạn/người thân • il/elle = anh ấy/cô ấy • nous = chúng ta/chúng tôi • vous = bạn lịch sự hoặc nhiều người.',fr:'je = moi • tu = un proche • il/elle = une autre personne • nous = nous ensemble • vous = une personne poliment ou plusieurs personnes.'},
      {vi:'Mục tiêu ở đây không phải học cả bảng chia động từ. Chỉ cần nhìn người hoặc nhóm người trước, rồi chọn đúng đại từ.',fr:'Le but ici n’est pas d’apprendre un tableau de conjugaison. Regarde d’abord la personne ou le groupe, puis choisis le bon pronom.'}
    ],
    examples:['Je suis prête.','Tu veux manger ?','Elle travaille.','Nous avons le temps.','Vous pouvez m’aider ?'],
    checks:[
      {id:'pronoun-self',prompt:{vi:'Trân nói về chính mình: ___ suis prête.',fr:'Trân parle d’elle-même : ___ suis prête.'},choices:['Je','Tu','Elle'],answer:'Je',feedback:{vi:'Khi nói về chính mình, Trân dùng je: Je suis prête.',fr:'Quand Trân parle d’elle-même, elle utilise je : Je suis prête.'}},
      {id:'pronoun-jerry',prompt:{vi:'Trân nói trực tiếp với Jerry: ___ veux manger ?',fr:'Trân parle directement à Jerry : ___ veux manger ?'},choices:['Tu','Il','Nous'],answer:'Tu',feedback:{vi:'Với Jerry hoặc người thân, dùng tu: Tu veux manger ?',fr:'Avec Jerry ou un proche, on utilise tu : Tu veux manger ?'}},
      {id:'pronoun-woman',prompt:{vi:'Bạn nói về một phụ nữ: ___ travaille.',fr:'Tu parles d’une femme : ___ travaille.'},choices:['Il','Elle','Vous'],answer:'Elle',feedback:{vi:'Nói về một phụ nữ: elle — Elle travaille.',fr:'Pour parler d’une femme : elle — Elle travaille.'}},
      {id:'pronoun-together',prompt:{vi:'Trân và Jerry có thời gian: ___ avons le temps.',fr:'Trân et Jerry ont le temps : ___ avons le temps.'},choices:['Nous','Vous','Ils'],answer:'Nous',feedback:{vi:'Khi Trân nói “chúng ta/chúng tôi”, dùng nous: Nous avons le temps.',fr:'Quand Trân inclut son groupe, elle utilise nous : Nous avons le temps.'}},
      {id:'pronoun-polite',prompt:{vi:'Bạn hỏi lịch sự một người lạ: ___ pouvez m’aider ?',fr:'Tu demandes poliment à une personne inconnue : ___ pouvez m’aider ?'},choices:['Tu','Vous','Elle'],answer:'Vous',feedback:{vi:'Với một người lạ trong tình huống lịch sự, vous là lựa chọn an toàn: Vous pouvez m’aider ?',fr:'Avec une personne inconnue dans une situation polie, vous est le choix sûr : Vous pouvez m’aider ?'}}
    ],
    conclusion:{vi:'Phản xạ cần giữ: trước tiên xác định “ai?” — tôi = je, người thân = tu, người khác = il/elle, nhóm có mình = nous, lịch sự hoặc nhiều người = vous. “On” rất quan trọng trong lời nói tự nhiên nhưng Tyffany sẽ nối nó riêng khi bạn đến phần đó. Một mini-check đúng chưa có nghĩa là đã “thành thạo”.',fr:'Le réflexe : demande-toi d’abord « qui ? » — moi = je, un proche = tu, une autre personne = il/elle, mon groupe = nous, politesse ou plusieurs personnes = vous. « On » est très important à l’oral, mais Tyffany le reconnectera séparément au bon moment. Un mini-check réussi ne signifie pas que la règle est « maîtrisée ».'},
    optional:true,persistence:'ephemeral-only',masteryClaim:false
  };

  const QUESTIONS_RAW = {
    id:'questions-core',concepts:['F12'],
    title:{vi:'Hỏi tự nhiên: ngữ điệu • từ để hỏi • lịch sự',fr:'Poser une question : intonation • mot interrogatif • politesse'},
    intro:[
      {vi:'Bạn đã gặp nhiều câu hỏi thật trong các bài trước. Mục tiêu là nhận ra vài cách hỏi đơn giản và chọn cách phù hợp với tình huống.',fr:'Tu as déjà rencontré beaucoup de vraies questions. Le but est de reconnaître quelques façons simples de demander quelque chose et de choisir celle qui convient.'},
      {vi:'Với người thân, chỉ cần câu bình thường + ngữ điệu hỏi: Tu travailles ? Bạn cũng có thể đặt từ hỏi ở cuối: Tu habites où ?',fr:'Avec un proche, une phrase normale + l’intonation suffit souvent : Tu travailles ? On peut aussi placer le mot interrogatif à la fin : Tu habites où ?'},
      {vi:'Để hỏi lý do hoặc làm rõ, các khối ngắn như Pourquoi ? hoặc Qu’est-ce que ça veut dire ? rất hữu ích. Với người lạ, Pouvez-vous… ? là mẫu lịch sự an toàn.',fr:'Pour demander une raison ou clarifier, des blocs comme Pourquoi ? ou Qu’est-ce que ça veut dire ? sont très utiles. Avec une personne inconnue, Pouvez-vous… ? est un modèle poli et sûr.'}
    ],
    examples:['Tu travailles ?','Tu habites où ?','Pourquoi ?',"Qu'est-ce que ça veut dire ?",'Pouvez-vous reformuler ?'],
    checks:[
      {id:'question-intonation',prompt:{vi:'Bạn muốn hỏi Jerry có đang làm việc không. Câu nào tự nhiên?',fr:'Tu veux demander à Jerry s’il travaille. Quelle phrase est naturelle ?'},choices:['Tu travailles ?','Tu travaille où.','Travail tu ?'],answer:'Tu travailles ?',feedback:{vi:'Với người thân, câu bình thường + ngữ điệu hỏi là đủ: Tu travailles ?',fr:'Avec un proche, la phrase normale + l’intonation suffit : Tu travailles ?'}},
      {id:'question-word-end',prompt:{vi:'Bạn muốn hỏi Jerry sống ở đâu. Câu nào bạn đã gặp?',fr:'Tu veux demander où Jerry habite. Quelle forme as-tu déjà rencontrée ?'},choices:['Tu habites où ?','Où tu habite.','Tu où habites ?'],answer:'Tu habites où ?',feedback:{vi:'Trong hội thoại, từ hỏi có thể đứng cuối trong mẫu bạn đã học: Tu habites où ?',fr:'À l’oral, le mot interrogatif peut venir à la fin dans le modèle déjà appris : Tu habites où ?'}},
      {id:'question-reason',prompt:{vi:'Jerry nói anh ấy về muộn. Bạn muốn hỏi lý do bằng một từ ngắn.',fr:'Jerry dit qu’il rentre tard. Tu veux demander la raison avec un mot très court.'},choices:['Pourquoi ?','Quand ?','Quoi ?'],answer:'Pourquoi ?',feedback:{vi:'Để hỏi lý do: Pourquoi ?',fr:'Pour demander la raison : Pourquoi ?'}},
      {id:'question-meaning',prompt:{vi:'Bạn không hiểu nghĩa của một cách nói. Câu nào giúp làm rõ?',fr:'Tu ne comprends pas le sens d’une expression. Quelle question permet de clarifier ?'},choices:["Qu'est-ce que ça veut dire ?",'Quelle est la date ?','Ça va ?'],answer:"Qu'est-ce que ça veut dire ?",feedback:{vi:'Để hỏi nghĩa: Qu’est-ce que ça veut dire ?',fr:'Pour demander le sens : Qu’est-ce que ça veut dire ?'}},
      {id:'question-polite',prompt:{vi:'Bạn muốn lịch sự nhờ một người lạ nói lại theo cách khác.',fr:'Tu veux demander poliment à une personne inconnue de reformuler.'},choices:['Pouvez-vous reformuler ?','Tu reformules ?','Pourquoi reformuler.'],answer:'Pouvez-vous reformuler ?',feedback:{vi:'Trong tình huống lịch sự, Pouvez-vous… ? là một mẫu an toàn: Pouvez-vous reformuler ?',fr:'Dans une situation polie, Pouvez-vous… ? est un modèle sûr : Pouvez-vous reformuler ?'}}
    ],
    conclusion:{vi:'Phản xạ cần giữ: với người thân, câu bình thường + ngữ điệu hỏi thường đủ; từ để hỏi cho biết bạn cần thông tin gì; với người lạ, Pouvez-vous… ? giúp giữ sự lịch sự. Chưa cần học đảo động từ. Một mini-check đúng chưa có nghĩa là đã “thành thạo”.',fr:'Le réflexe : avec un proche, la phrase normale + l’intonation suffit souvent ; le mot interrogatif indique l’information recherchée ; avec une personne inconnue, Pouvez-vous… ? garde une demande polie. Pas besoin d’apprendre l’inversion maintenant. Un mini-check réussi ne signifie pas que la règle est « maîtrisée ».'},
    optional:true,persistence:'ephemeral-only',masteryClaim:false
  };

  const engine = typeof module === 'object' && module.exports
    ? require('./foundations-capsule-engine.js')
    : window.FrenchTranquilleFoundationsCapsuleEngine;
  if (!engine) throw new Error('Foundations capsule engine must load before capsule definitions');

  const CAPSULES = Object.freeze({
    F01_F04:engine.compile(RAW),
    F11:engine.compile(NEGATION_RAW),
    F05:engine.compile(SUBJECT_PRONOUNS_RAW),
    F12:engine.compile(QUESTIONS_RAW)
  });

  if (typeof module === 'object' && module.exports) module.exports = CAPSULES;
  if (typeof window !== 'undefined') window.FrenchTranquilleFoundationsCapsules = CAPSULES;
})();