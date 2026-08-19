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

  const REGULAR_ER_RAW = {
    id:'regular-er-present-core',concepts:['F08'],
    title:{vi:'Hiện tại với động từ -er: je • tu • il/elle',fr:'Le présent régulier en -er : je • tu • il/elle'},
    intro:[
      {vi:'Bạn đã gặp “travaille”, “habite” và “aime” trong nhiều câu. Bây giờ ta nối chúng thành một mẫu viết đơn giản.',fr:'Tu as déjà rencontré « travaille », « habite » et « aime » dans plusieurs phrases. On relie maintenant ces formes avec un petit modèle écrit.'},
      {vi:'Với nhiều động từ kết thúc bằng -er: bỏ -er, rồi dùng je = -e • tu = -es • il/elle = -e.',fr:'Pour beaucoup de verbes en -er : enlève -er, puis utilise je = -e • tu = -es • il/elle = -e.'},
      {vi:'Ba dạng này thường nghe giống nhau khi nói. Đại từ giúp biết ai làm hành động. Các động từ rất thường gặp như aller, vouloir, pouvoir có dạng riêng: tu vas, tu veux, tu peux.',fr:'À l’oral, ces trois formes se prononcent souvent pareil. Le pronom aide à savoir qui fait l’action. Des verbes très fréquents comme aller, vouloir, pouvoir gardent leurs formes particulières : tu vas, tu veux, tu peux.'}
    ],
    examples:['Je travaille.','Tu travailles ?','Elle travaille.','J’habite ici.','Tu habites où ?'],
    checks:[
      {id:'er-je-travaille',prompt:{vi:'Trân nói về mình: Je travaill___ .',fr:'Trân parle d’elle-même : Je travaill___ .'},choices:['e','es','ent'],answer:'e',feedback:{vi:'Với je, động từ -er thường có -e: Je travaille.',fr:'Avec je, un verbe régulier en -er prend souvent -e : Je travaille.'}},
      {id:'er-tu-travailles',prompt:{vi:'Bạn hỏi Jerry: Tu travaill___ ?',fr:'Tu demandes à Jerry : Tu travaill___ ?'},choices:['e','es','ons'],answer:'es',feedback:{vi:'Với tu, mẫu -er thường có -es: Tu travailles ?',fr:'Avec tu, le modèle régulier en -er prend -es : Tu travailles ?'}},
      {id:'er-elle-travaille',prompt:{vi:'Bạn nói về một phụ nữ: Elle travaill___ .',fr:'Tu parles d’une femme : Elle travaill___ .'},choices:['e','es','ent'],answer:'e',feedback:{vi:'Với il/elle, mẫu -er thường có -e: Elle travaille.',fr:'Avec il/elle, le modèle régulier en -er prend -e : Elle travaille.'}},
      {id:'er-tu-habites',prompt:{vi:'Chọn câu đúng để hỏi Jerry sống ở đâu:',fr:'Choisis la bonne phrase pour demander à Jerry où il habite :'},choices:['Tu habites où ?','Tu habite où ?','Tu habiter où ?'],answer:'Tu habites où ?',feedback:{vi:'Với tu + habiter: Tu habites où ?',fr:'Avec tu + habiter : Tu habites où ?'}},
      {id:'er-exception-aller',prompt:{vi:'Câu nào giữ dạng riêng và không dùng mẫu -er này?',fr:'Quelle phrase garde une forme particulière et ne suit pas ce petit modèle en -er ?'},choices:['Tu vas où ?','Tu travailles ?','Tu habites où ?'],answer:'Tu vas où ?',feedback:{vi:'aller là động từ rất thường gặp nhưng có dạng riêng: tu vas. Đừng tạo “tu alles”.',fr:'aller est très fréquent mais garde une forme particulière : tu vas. Ne fabrique pas « tu alles ».'}}
    ],
    conclusion:{vi:'Phản xạ viết cần giữ: với nhiều động từ -er, je = -e, tu = -es, il/elle = -e. Khi nói, các dạng này thường nghe giống nhau, vì vậy hãy nghe cả đại từ. Đây là một mẫu hữu ích, không phải quy tắc cho mọi động từ. Một mini-check đúng chưa có nghĩa là đã “thành thạo”.',fr:'Le réflexe écrit : pour beaucoup de verbes en -er, je = -e, tu = -es, il/elle = -e. À l’oral, ces formes sonnent souvent pareil : écoute aussi le pronom. C’est un modèle utile, pas une règle pour tous les verbes. Un mini-check réussi ne signifie pas que la règle est « maîtrisée ».'},
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

  const ADJECTIVE_AGREEMENT_RAW = {
    id:'adjective-agreement-core',concepts:['F13'],
    title:{vi:'Tính từ nói về Trân — dạng nữ',fr:'L’adjectif avec Trân — forme féminine'},
    intro:[
      {vi:'Bạn đã dùng “je suis + tính từ” để nói mình sẵn sàng, vui, lo hoặc mệt. Bây giờ ta nhìn vào hình thức của tính từ khi nó mô tả Trân.',fr:'Tu utilises déjà « je suis + adjectif » pour dire que tu es prête, contente, inquiète ou fatiguée. On regarde maintenant la forme de l’adjectif quand il décrit Trân.'},
      {vi:'Trong tiếng Pháp, tính từ thường hòa hợp với người hoặc vật mà nó mô tả. Khi Trân nói về chính mình, ta dùng dạng nữ: prête, contente, fatiguée, stressée.',fr:'En français, l’adjectif s’accorde souvent avec la personne ou la chose qu’il décrit. Quand Trân parle d’elle-même, on utilise la forme féminine : prête, contente, fatiguée, stressée.'},
      {vi:'Không có một mẹo duy nhất cho mọi tính từ. Nhiều từ thêm -e; -é thường thành -ée; nhưng một số từ đổi nhiều hơn: français → française, inquiet → inquiète. Khi nói, có cặp nghe khác nhau và có cặp nghe giống nhau.',fr:'Il n’existe pas une seule astuce pour tous les adjectifs. Beaucoup ajoutent -e ; -é devient souvent -ée ; mais certaines formes changent davantage : français → française, inquiet → inquiète. À l’oral, certaines paires s’entendent différemment et d’autres non.'}
    ],
    examples:['Je suis prête.','Je suis contente.','Je suis très fatiguée.','Je suis stressée.','Elle est française.'],
    checks:[
      {id:'adj-prete',prompt:{vi:'Trân nói “Tôi sẵn sàng”: Je suis ___ .',fr:'Trân dit « Je suis prête » : choisis la bonne forme.'},choices:['prête','prêt','prêtes'],answer:'prête',feedback:{vi:'Tính từ mô tả Trân: Je suis prête.',fr:'L’adjectif décrit Trân : Je suis prête.'}},
      {id:'adj-contente',prompt:{vi:'Trân nói mình vui: Je suis ___ .',fr:'Trân dit qu’elle est contente : Je suis ___ .'},choices:['contente','content','contents'],answer:'contente',feedback:{vi:'Với Trân: contente — Je suis contente.',fr:'Avec Trân : contente — Je suis contente.'}},
      {id:'adj-fatiguee',prompt:{vi:'Trân nói mình rất mệt: Je suis très ___ .',fr:'Trân dit qu’elle est très fatiguée : Je suis très ___ .'},choices:['fatiguée','fatigué','fatigués'],answer:'fatiguée',feedback:{vi:'fatigué → fatiguée trong dạng nữ viết: Je suis très fatiguée.',fr:'fatigué → fatiguée à la forme féminine écrite : Je suis très fatiguée.'}},
      {id:'adj-francaise',prompt:{vi:'Bạn nói về một phụ nữ Pháp: Elle est ___ .',fr:'Tu parles d’une femme française : Elle est ___ .'},choices:['française','français','françaises'],answer:'française',feedback:{vi:'français → française: Elle est française.',fr:'français → française : Elle est française.'}},
      {id:'adj-inquiete',prompt:{vi:'Trân nói mình lo lắng. Câu nào đúng?',fr:'Trân dit qu’elle est inquiète. Quelle phrase est correcte ?'},choices:['Je suis inquiète.','Je suis inquiet.','Je suis inquiètes.'],answer:'Je suis inquiète.',feedback:{vi:'Dạng đã học là: Je suis inquiète. Đây là ví dụ cho thấy không phải lúc nào chỉ thêm một chữ -e đơn giản.',fr:'La forme déjà apprise est : Je suis inquiète. Cet exemple montre qu’on ne peut pas toujours appliquer mécaniquement « ajoute -e ».'}}
    ],
    conclusion:{vi:'Phản xạ cần giữ: trước tiên hỏi “tính từ đang mô tả ai?”. Khi Trân nói về mình, chọn dạng nữ đã học: prête, contente, fatiguée, inquiète… Nhiều mẫu có -e hoặc -ée, nhưng không có một quy tắc duy nhất cho mọi từ. Hãy học những tính từ thường dùng cùng với dạng của chúng. Một mini-check đúng chưa có nghĩa là đã “thành thạo”.',fr:'Le réflexe : demande-toi d’abord « l’adjectif décrit qui ? ». Quand Trân parle d’elle-même, choisis la forme féminine déjà apprise : prête, contente, fatiguée, inquiète… Beaucoup de formes utilisent -e ou -ée, mais il n’existe pas une règle unique pour tous les mots. Apprends les adjectifs fréquents avec leurs formes. Un mini-check réussi ne signifie pas que la règle est « maîtrisée ».'},
    optional:true,persistence:'ephemeral-only',masteryClaim:false
  };

  const CONTRACTIONS_RAW = {
    id:'a-de-contractions-core',concepts:['F16'],
    title:{vi:'Co rút à / de với le • les',fr:'Contractions de à / de avec le • les'},
    intro:[
      {vi:'Ở bài 38, bạn đã gặp « au restaurant » và « à la maison ». Cả hai dùng à + mạo từ xác định: à + le co lại thành au, còn à + la giữ nguyên.',fr:'À la leçon 38, tu as déjà vu « au restaurant » et « à la maison ». Les deux utilisent à + article défini : à + le se contracte en au, tandis que à + la reste séparé.'},
      {vi:'Mẫu cơ học: à + le → au • à + les → aux • de + le → du • de + les → des. Với la hoặc l’, không co rút: à la, à l’, de la, de l’.',fr:'Le mécanisme est simple : à + le → au • à + les → aux • de + le → du • de + les → des. Avec la ou l’, pas de contraction : à la, à l’, de la, de l’.'},
      {vi:'Quan trọng: phần này chỉ giải thích sự co rút khi câu đã cần à hoặc de + mạo từ xác định; nó không chọn giới từ thay bạn. Và « du / des » ở bài 22 có thể là mạo từ bộ phận — Du pain. / Des œufs. — cùng cách viết nhưng chức năng khác. « aux » và de + les → des dưới đây là mẫu giảng dạy, không phải bằng chứng bạn đã học chúng trước đó.',fr:'Important : cette base explique seulement la contraction quand la phrase demande déjà à ou de + article défini ; elle ne choisit pas la préposition à ta place. Et « du / des » à la leçon 22 peuvent être des partitifs — Du pain. / Des œufs. — même écriture, autre fonction. « aux » et de + les → des ci-dessous sont des recombinaisons d’enseignement, pas la preuve que tu les maîtrisais déjà.'}
    ],
    examples:['✓ au restaurant','✓ à la maison','✓ du Vietnam','→ à + les = aux','→ de + les = des'],
    checks:[
      {id:'f16-l38-au',prompt:{vi:'Bài 38: Je suis allée ___ restaurant.',fr:'Leçon 38 : Je suis allée ___ restaurant.'},choices:['au','à la','aux'],answer:'au',feedback:{vi:'restaurant đi với le; à + le → au: Je suis allée au restaurant.',fr:'restaurant est avec le ; à + le → au : Je suis allée au restaurant.'}},
      {id:'f16-l38-a-la',prompt:{vi:'Bài 38: Je suis rentrée ___ maison.',fr:'Leçon 38 : Je suis rentrée ___ maison.'},choices:['à la','au','aux'],answer:'à la',feedback:{vi:'maison đi với la; à + la không co rút: à la maison.',fr:'maison est avec la ; à + la ne se contracte pas : à la maison.'}},
      {id:'f16-a-les',prompt:{vi:'Mẫu cơ học: à + les → ?',fr:'Mécanique : à + les → ?'},choices:['aux','au','à les'],answer:'aux',feedback:{vi:'à + les luôn co lại thành aux. Đây là mẫu giảng dạy, không phải một câu đã được coi là thành thạo.',fr:'à + les se contracte en aux. Ici, c’est une recombinaison d’enseignement, pas une phrase prétendue déjà maîtrisée.'}},
      {id:'f16-de-le',prompt:{vi:'Mẫu cơ học: de + le → ?',fr:'Mécanique : de + le → ?'},choices:['du','des','de le'],answer:'du',feedback:{vi:'de + le → du. Bạn đã gặp dạng thật trong « Je viens du Vietnam. »',fr:'de + le → du. Tu as déjà rencontré une vraie forme dans « Je viens du Vietnam. »'}},
      {id:'f16-de-les',prompt:{vi:'Mẫu cơ học: de + les → ?',fr:'Mécanique : de + les → ?'},choices:['des','du','de les'],answer:'des',feedback:{vi:'de + les → des. Đây là mẫu giảng dạy; nó không biến « Des œufs. » của bài 22 thành bằng chứng về sự co rút.',fr:'de + les → des. C’est une recombinaison d’enseignement ; elle ne transforme pas « Des œufs. » de la leçon 22 en preuve de contraction.'}},
      {id:'f16-partitive-contrast',prompt:{vi:'Trong « Du pain. » ở bài 22, « du » có vai trò gì?',fr:'Dans « Du pain. » à la leçon 22, quel est le rôle de « du » ?'},choices:['article partitif','contraction de + le','les deux'],answer:'article partitif',feedback:{vi:'Ở đây « du » là mạo từ bộ phận cho một lượng không xác định. Cùng cách viết không có nghĩa là cùng quy tắc.',fr:'Ici, « du » est un article partitif pour une quantité non précisée. Même écriture ne veut pas dire même règle.'}}
    ],
    conclusion:{vi:'Phản xạ cần giữ: khi cấu trúc đã cần à/de + mạo từ xác định, nhìn mạo từ. le/les co rút: au/aux, du/des. la/l’ giữ tách: à la/à l’, de la/de l’. Đừng dùng quy tắc này để tự chọn à hay de, và đừng nhầm du/des co rút với mạo từ bộ phận của bài 22. Một mini-check đúng chưa có nghĩa là đã “thành thạo”.',fr:'Le réflexe : quand la structure demande déjà à/de + article défini, regarde l’article. le/les se contractent : au/aux, du/des. la/l’ restent séparés : à la/à l’, de la/de l’. N’utilise pas cette règle pour choisir à ou de, et ne confonds pas le du/des de contraction avec les partitifs de la leçon 22. Un mini-check réussi ne signifie pas que la règle est « maîtrisée ».'},
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
    F08:engine.compile(REGULAR_ER_RAW),
    F12:engine.compile(QUESTIONS_RAW),
    F13:engine.compile(ADJECTIVE_AGREEMENT_RAW),
    F16:engine.compile(CONTRACTIONS_RAW)
  });

  if (typeof module === 'object' && module.exports) module.exports = CAPSULES;
  if (typeof window !== 'undefined') window.FrenchTranquilleFoundationsCapsules = CAPSULES;
})();