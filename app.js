const APP_VERSION = '1.6.0';
const BUILD = 11;
const BRAND = 'French Trân’quille';
const TUTOR = 'Lucie';
const KEY = 'francais-avec-luc:learner:v1'; // legacy key kept to preserve existing progress
const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';

const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
const T = (vi, fr) => isDebug() ? fr : vi;

const LESSONS = [
  {
    id:'l1', number:1, icon:'👋',
    titleVi:'Chào hỏi & giới thiệu', titleFr:'Saluer & se présenter',
    shortVi:'4 câu đầu tiên để chào hỏi và nói tên.', shortFr:'4 premières expressions pour saluer et dire son prénom.',
    introVi:'Bắt đầu thật đơn giản: chào, cảm ơn, tạm biệt và nói tên của bạn.',
    introFr:'On commence très simplement : saluer, remercier, dire au revoir et donner son prénom.',
    items:[
      {id:'bonjour',fr:'Bonjour',vi:'Xin chào'}, {id:'merci',fr:'Merci',vi:'Cảm ơn'},
      {id:'au-revoir',fr:'Au revoir',vi:'Tạm biệt'}, {id:'je-mappelle',fr:"Je m'appelle Trân.",vi:'Tôi tên là Trân.'}
    ],
    challenge:{vi:'Bạn gặp Lucie lần đầu. Bạn bắt đầu thế nào?',fr:'Tu rencontres Lucie pour la première fois. Comment commences-tu ?',answer:"Bonjour. Je m'appelle Trân.",options:["Bonjour. Je m'appelle Trân.",'Merci. Au revoir.','Au revoir. Merci.']}
  },
  {
    id:'l2', number:2, icon:'🆘',
    titleVi:'Lịch sự & hiểu người khác', titleFr:'Politesse & compréhension',
    shortVi:'Những câu cứu nguy khi bạn chưa hiểu.', shortFr:'Les phrases de survie quand tu ne comprends pas encore.',
    introVi:'Bạn chưa cần hiểu mọi thứ. Quan trọng là biết cách yêu cầu người khác giúp bạn hiểu.',
    introFr:"Tu n'as pas besoin de tout comprendre. L'important est de savoir demander de l'aide.",
    items:[
      {id:'svp',fr:"S'il vous plaît.",vi:'Làm ơn / vui lòng.'}, {id:'excusez-moi',fr:'Excusez-moi.',vi:'Xin lỗi / làm phiền một chút.'},
      {id:'je-comprends',fr:'Je comprends.',vi:'Tôi hiểu.'}, {id:'je-ne-comprends-pas',fr:'Je ne comprends pas.',vi:'Tôi không hiểu.'},
      {id:'repetez',fr:'Pouvez-vous répéter ?',vi:'Bạn có thể nhắc lại không?'}, {id:'plus-lentement',fr:"Plus lentement, s'il vous plaît.",vi:'Chậm hơn một chút, làm ơn.'}
    ],
    challenge:{vi:'Một người nói quá nhanh và bạn không hiểu. Câu nào hữu ích nhất?',fr:"Quelqu'un parle trop vite et tu ne comprends pas. Quelle phrase est la plus utile ?",answer:"Plus lentement, s'il vous plaît.",options:["Plus lentement, s'il vous plaît.",'Je comprends.','Au revoir.']}
  },
  {
    id:'l3', number:3, icon:'🙋‍♀️',
    titleVi:'Nói thêm về bản thân', titleFr:'Parler un peu de soi',
    shortVi:'Quốc tịch, nơi ở và vài câu trả lời đơn giản.', shortFr:'Nationalité, lieu de vie et réponses très simples.',
    introVi:'Bây giờ bạn có thể nói thêm vài điều thật về bản thân.', introFr:'Maintenant, tu peux dire quelques choses simples et vraies sur toi.',
    items:[
      {id:'je-suis-vietnamienne',fr:'Je suis vietnamienne.',vi:'Tôi là người Việt Nam.'}, {id:'je-viens-vietnam',fr:'Je viens du Vietnam.',vi:'Tôi đến từ Việt Nam.'},
      {id:'jhabite-hcm',fr:"J'habite à Hô Chi Minh-Ville.",vi:'Tôi sống ở Thành phố Hồ Chí Minh.'}, {id:'et-vous',fr:'Et vous ?',vi:'Còn bạn thì sao?'},
      {id:'oui',fr:'Oui.',vi:'Vâng / có.'}, {id:'non',fr:'Non.',vi:'Không.'}
    ],
    challenge:{vi:'Một người hỏi bạn đến từ đâu. Bạn trả lời câu nào?',fr:"Quelqu'un te demande d'où tu viens. Que réponds-tu ?",answer:'Je viens du Vietnam.',options:['Je viens du Vietnam.','Je comprends.','Merci.']}
  },
  {
    id:'l4', number:4, icon:'☕',
    titleVi:'Gọi đồ ở quán cà phê', titleFr:'Commander au café',
    shortVi:'Nước, cà phê, trà và cách gọi món lịch sự.', shortFr:'Eau, café, thé et une commande polie.',
    introVi:'Một tình huống rất thực tế: gọi đồ uống mà không cần dịch từng từ.', introFr:'Situation très concrète : commander une boisson sans traduire chaque mot.',
    items:[
      {id:'je-voudrais',fr:'Je voudrais…',vi:'Tôi muốn… (lịch sự).'}, {id:'eau',fr:"De l'eau.",vi:'Nước.'},
      {id:'cafe',fr:'Un café.',vi:'Một ly cà phê.'}, {id:'the',fr:'Un thé.',vi:'Một ly trà.'},
      {id:'addition',fr:"L'addition, s'il vous plaît.",vi:'Cho tôi xin hóa đơn.'}, {id:'combien-ca-coute',fr:'Combien ça coûte ?',vi:'Cái này giá bao nhiêu?'}
    ],
    challenge:{vi:'Bạn muốn gọi một ly cà phê. Câu nào tự nhiên và lịch sự?',fr:'Tu veux commander un café. Quelle phrase est naturelle et polie ?',answer:"Je voudrais un café, s'il vous plaît.",options:["Je voudrais un café, s'il vous plaît.",'Je suis un café.','Au revoir café.']}
  },
  {
    id:'l5', number:5, icon:'❤️',
    titleVi:'Nói điều mình thích', titleFr:'Dire ce qu’on aime',
    shortVi:'Thích, không thích, một chút, rất nhiều, thích hơn.', shortFr:'Aimer, ne pas aimer, un peu, beaucoup, préférer.',
    introVi:'Những câu rất ngắn nhưng giúp bạn bắt đầu nói về sở thích của mình.', introFr:'Des phrases très courtes pour commencer à parler de tes goûts.',
    items:[
      {id:'jaime',fr:"J'aime…",vi:'Tôi thích…'}, {id:'je-naime-pas',fr:"Je n'aime pas…",vi:'Tôi không thích…'},
      {id:'beaucoup',fr:'Beaucoup.',vi:'Rất nhiều.'}, {id:'un-peu',fr:'Un peu.',vi:'Một chút.'},
      {id:'cest-bon',fr:"C'est bon.",vi:'Ngon / tốt.'}, {id:'je-prefere',fr:'Je préfère…',vi:'Tôi thích … hơn.'}
    ],
    challenge:{vi:'Bạn thích trà hơn cà phê. Câu nào phù hợp?',fr:'Tu préfères le thé au café. Quelle phrase convient ?',answer:'Je préfère le thé.',options:['Je préfère le thé.','Je ne comprends pas le thé.','Je suis le thé.']}
  },
  {
    id:'l6', number:6, icon:'🔢',
    titleVi:'Số từ 0 đến 5', titleFr:'Les nombres de 0 à 5',
    shortVi:'Sáu con số đầu tiên, nghe và nhận biết.', shortFr:'Les six premiers nombres, à écouter et reconnaître.',
    introVi:'Học số theo nhóm nhỏ để dễ nghe và nhớ.', introFr:'On apprend les nombres par petit groupe pour mieux les entendre et les retenir.',
    items:[
      {id:'zero',fr:'Zéro',vi:'0'}, {id:'un',fr:'Un',vi:'1'}, {id:'deux',fr:'Deux',vi:'2'},
      {id:'trois',fr:'Trois',vi:'3'}, {id:'quatre',fr:'Quatre',vi:'4'}, {id:'cinq',fr:'Cinq',vi:'5'}
    ],
    challenge:{vi:'Số 4 trong tiếng Pháp là gì?',fr:'Comment dit-on 4 en français ?',answer:'Quatre',options:['Quatre','Deux','Cinq']}
  },
  {
    id:'l7', number:7, icon:'💶',
    titleVi:'Số 6 đến 10 & hỏi giá', titleFr:'Les nombres 6 à 10 & le prix',
    shortVi:'Hoàn thành 0–10 và dùng số trong tình huống mua hàng.', shortFr:'Compléter 0–10 et utiliser les nombres pour un prix.',
    introVi:'Hoàn thành những con số cơ bản rồi dùng ngay trong một tình huống thực tế.', introFr:'On termine les nombres de base et on les réutilise tout de suite en situation.',
    items:[
      {id:'six',fr:'Six',vi:'6'}, {id:'sept',fr:'Sept',vi:'7'}, {id:'huit',fr:'Huit',vi:'8'},
      {id:'neuf',fr:'Neuf',vi:'9'}, {id:'dix',fr:'Dix',vi:'10'}, {id:'euros',fr:'euros',vi:'euro'}
    ],
    challenge:{vi:'Bạn nghe “dix euros”. Đó là bao nhiêu?',fr:'Tu entends « dix euros ». Combien est-ce ?',answer:'10 euros',options:['10 euros','2 euros','6 euros']}
  },
  {
    id:'l8', number:8, icon:'📍',
    titleVi:'Hỏi đường & tìm địa điểm', titleFr:'Demander son chemin',
    shortVi:'Nhà ga, nhà vệ sinh, hiệu thuốc, trái và phải.', shortFr:'Gare, toilettes, pharmacie, gauche et droite.',
    introVi:'Khi ở một nơi mới, bạn chỉ cần vài câu ngắn để tìm đúng chỗ.', introFr:'Dans un endroit nouveau, quelques phrases courtes suffisent pour se repérer.',
    items:[
      {id:'ou-est',fr:'Où est… ?',vi:'… ở đâu?'}, {id:'toilettes',fr:'Les toilettes.',vi:'Nhà vệ sinh.'},
      {id:'gare',fr:'La gare.',vi:'Nhà ga.'}, {id:'pharmacie',fr:'La pharmacie.',vi:'Hiệu thuốc.'},
      {id:'a-gauche',fr:'À gauche.',vi:'Bên trái.'}, {id:'a-droite',fr:'À droite.',vi:'Bên phải.'}
    ],
    challenge:{vi:'Bạn muốn tìm nhà ga. Bạn hỏi thế nào?',fr:'Tu veux trouver la gare. Que demandes-tu ?',answer:'Où est la gare ?',options:['Où est la gare ?','Je suis la gare.','La gare est bon.']}
  },
  {
    id:'l9', number:9, icon:'🚆',
    titleVi:'Đi tàu & mua vé', titleFr:'Prendre le train & acheter un billet',
    shortVi:'Vé một chiều, khứ hồi, giờ đi và sân ga.', shortFr:'Aller simple, aller-retour, horaire et quai.',
    introVi:'Một nhóm câu rất hữu ích để đi tàu mà không cần nói dài.', introFr:'Un petit groupe de phrases très utiles pour prendre le train sans parler longtemps.',
    items:[
      {id:'je-vais-a',fr:'Je vais à…',vi:'Tôi đi đến…'}, {id:'un-billet',fr:'Je voudrais un billet.',vi:'Tôi muốn một vé.'},
      {id:'aller-simple',fr:'Un aller simple.',vi:'Vé một chiều.'}, {id:'aller-retour',fr:'Un aller-retour.',vi:'Vé khứ hồi.'},
      {id:'quelle-heure',fr:'À quelle heure ?',vi:'Mấy giờ?'}, {id:'quel-quai',fr:'Quel quai ?',vi:'Sân ga nào?'}
    ],
    challenge:{vi:'Bạn muốn mua vé một chiều. Câu nào phù hợp?',fr:'Tu veux acheter un aller simple. Quelle phrase convient ?',answer:'Je voudrais un billet. Un aller simple.',options:['Je voudrais un billet. Un aller simple.','Je préfère la gare.','Quel café ?']}
  },
  {
    id:'l10', number:10, icon:'🕒',
    titleVi:'Thời gian & hẹn gặp', titleFr:'L’heure & les rendez-vous',
    shortVi:'Hôm nay, ngày mai, bây giờ và hỏi giờ.', shortFr:'Aujourd’hui, demain, maintenant et demander l’heure.',
    introVi:'Bắt đầu nói về thời gian mà chưa cần học cả đồng hồ.', introFr:"On commence à parler du temps sans apprendre toute l'horloge d'un coup.",
    items:[
      {id:'quelle-heure-est-il',fr:'Quelle heure est-il ?',vi:'Bây giờ là mấy giờ?'}, {id:'une-heure',fr:'Il est une heure.',vi:'Bây giờ là 1 giờ.'},
      {id:'deux-heures',fr:'Il est deux heures.',vi:'Bây giờ là 2 giờ.'}, {id:'aujourdhui',fr:"Aujourd'hui.",vi:'Hôm nay.'},
      {id:'demain',fr:'Demain.',vi:'Ngày mai.'}, {id:'maintenant',fr:'Maintenant.',vi:'Bây giờ.'}
    ],
    challenge:{vi:'Bạn muốn biết bây giờ là mấy giờ. Bạn hỏi gì?',fr:"Tu veux savoir l'heure. Que demandes-tu ?",answer:'Quelle heure est-il ?',options:['Quelle heure est-il ?','Quel quai ?','Combien ça coûte ?']}
  },
  {
    id:'l11', number:11, icon:'🛍️',
    titleVi:'Mua sắm đơn giản', titleFr:'Faire des achats simples',
    shortVi:'Tìm đồ, chọn món, giá cao và thanh toán bằng thẻ.', shortFr:'Chercher, choisir, trouver trop cher et payer par carte.',
    introVi:'Bạn không cần nhiều từ để mua một món đồ đơn giản.', introFr:"Tu n'as pas besoin de beaucoup de mots pour faire un achat simple.",
    items:[
      {id:'je-cherche',fr:'Je cherche…',vi:'Tôi đang tìm…'}, {id:'je-voudrais-ceci',fr:'Je voudrais ceci.',vi:'Tôi muốn cái này.'},
      {id:'trop-cher',fr:"C'est trop cher.",vi:'Cái này quá đắt.'}, {id:'payer-carte',fr:'Je peux payer par carte ?',vi:'Tôi có thể trả bằng thẻ không?'},
      {id:'je-prends-ca',fr:'Je prends ça.',vi:'Tôi lấy cái này.'}, {id:'vous-avez',fr:'Vous avez… ?',vi:'Bạn có … không?'}
    ],
    challenge:{vi:'Bạn muốn trả bằng thẻ. Bạn hỏi câu nào?',fr:'Tu veux payer par carte. Que demandes-tu ?',answer:'Je peux payer par carte ?',options:['Je peux payer par carte ?','Je suis par carte.','À droite, carte.']}
  },
  {
    id:'l12', number:12, icon:'🍽️',
    titleVi:'Ở nhà hàng', titleFr:'Au restaurant',
    shortVi:'Xin bàn, xem thực đơn, gọi món và nói “không có…”.', shortFr:'Demander une table, la carte, commander et dire « sans… ».',
    introVi:'Bây giờ ta mở rộng từ quán cà phê sang một bữa ăn thật.', introFr:'On élargit maintenant le café à un vrai repas.',
    items:[
      {id:'table-deux',fr:'Une table pour deux, s’il vous plaît.',vi:'Cho hai người một bàn.'}, {id:'la-carte',fr:'La carte, s’il vous plaît.',vi:'Cho tôi xem thực đơn.'},
      {id:'commander',fr:'Je voudrais commander.',vi:'Tôi muốn gọi món.'}, {id:'sans',fr:'Sans…',vi:'Không có…'},
      {id:'avec',fr:'Avec…',vi:'Có / với…'}, {id:'tres-bon',fr:"C'était très bon.",vi:'Món ăn rất ngon.'}
    ],
    challenge:{vi:'Bạn vào nhà hàng cùng một người khác. Bạn xin bàn thế nào?',fr:'Tu entres au restaurant avec une autre personne. Que dis-tu ?',answer:'Une table pour deux, s’il vous plaît.',options:['Une table pour deux, s’il vous plaît.','Je suis deux tables.','Deux toilettes, merci.']}
  },
  {
    id:'l13', number:13, icon:'🩺',
    titleVi:'Sức khỏe & hiệu thuốc', titleFr:'Santé & pharmacie',
    shortVi:'Nói đau ở đâu, cần bác sĩ và tình huống khẩn cấp.', shortFr:'Dire où on a mal, demander un médecin et signaler une urgence.',
    introVi:'Mục tiêu không phải học y khoa: chỉ cần nói đủ để được giúp đỡ.', introFr:"Le but n'est pas d'apprendre la médecine : juste pouvoir demander de l'aide.",
    items:[
      {id:'jai-mal-ici',fr:"J'ai mal ici.",vi:'Tôi đau ở đây.'}, {id:'je-suis-malade',fr:'Je suis malade.',vi:'Tôi bị ốm.'},
      {id:'mal-tete',fr:"J'ai mal à la tête.",vi:'Tôi đau đầu.'}, {id:'besoin-medecin',fr:"J'ai besoin d'un médecin.",vi:'Tôi cần bác sĩ.'},
      {id:'ou-pharmacie',fr:'Où est la pharmacie ?',vi:'Hiệu thuốc ở đâu?'}, {id:'urgent',fr:"C'est urgent.",vi:'Khẩn cấp.'}
    ],
    challenge:{vi:'Bạn cần bác sĩ. Câu nào rõ ràng nhất?',fr:"Tu as besoin d'un médecin. Quelle phrase est la plus claire ?",answer:"J'ai besoin d'un médecin.",options:["J'ai besoin d'un médecin.",'Je préfère un médecin.','Quel quai médecin ?']}
  },
  {
    id:'l14', number:14, icon:'👨‍👩‍👧',
    titleVi:'Gia đình & người thân', titleFr:'Famille & proches',
    shortVi:'Giới thiệu Jerry, gia đình và chào hỏi lịch sự.', shortFr:'Présenter Jerry, la famille et saluer poliment.',
    introVi:'Một vài câu ngắn để giới thiệu những người quan trọng với bạn.', introFr:'Quelques phrases courtes pour présenter les personnes importantes pour toi.',
    items:[
      {id:'voici-jerry',fr:'Voici Jerry.',vi:'Đây là Jerry.'}, {id:'mon-fiance',fr:"C'est mon fiancé.",vi:'Đây là chồng sắp cưới của tôi.'},
      {id:'ma-famille',fr:"C'est ma famille.",vi:'Đây là gia đình của tôi.'}, {id:'mon-ami',fr:"C'est mon ami.",vi:'Đây là bạn của tôi.'},
      {id:'enchantee',fr:'Enchantée.',vi:'Rất vui được gặp bạn.'}, {id:'comment-allez-vous',fr:'Comment allez-vous ?',vi:'Bạn khỏe không? (lịch sự)'}
    ],
    challenge:{vi:'Bạn gặp một người lần đầu. Bạn muốn nói “rất vui được gặp bạn”.',fr:'Tu rencontres quelqu’un pour la première fois. Que dis-tu ?',answer:'Enchantée.',options:['Enchantée.','À gauche.','Un aller simple.']}
  },
  {
    id:'l15', number:15, icon:'🇫🇷',
    titleVi:'Ngày đầu tiên ở Pháp', titleFr:'Premier jour en France',
    shortVi:'Đến nơi, mệt, đói, khát, lạc đường và xin giúp đỡ.', shortFr:'Arriver, être fatiguée, avoir faim/soif, être perdue et demander de l’aide.',
    introVi:'Một mini-bộ sinh tồn cho những giờ đầu tiên ở Pháp.', introFr:'Un mini-kit de survie pour les premières heures en France.',
    items:[
      {id:'je-suis-arrivee',fr:'Je suis arrivée.',vi:'Tôi đã đến nơi.'}, {id:'je-suis-fatiguee',fr:'Je suis fatiguée.',vi:'Tôi mệt.'},
      {id:'jai-faim',fr:"J'ai faim.",vi:'Tôi đói.'}, {id:'jai-soif',fr:"J'ai soif.",vi:'Tôi khát.'},
      {id:'je-suis-perdue',fr:'Je suis perdue.',vi:'Tôi bị lạc.'}, {id:'aidez-moi',fr:"Pouvez-vous m'aider ?",vi:'Bạn có thể giúp tôi không?'}
    ],
    challenge:{vi:'Bạn bị lạc và cần giúp đỡ. Câu nào hữu ích nhất?',fr:"Tu es perdue et tu as besoin d'aide. Quelle phrase est la plus utile ?",answer:"Pouvez-vous m'aider ?",options:["Pouvez-vous m'aider ?",'Je prends ça.','Il est deux heures.']}
  }
];

const ALL_ITEMS = LESSONS.flatMap(l => l.items.map(item => ({...item, lessonId:l.id})));
const ITEM_BY_ID = Object.fromEntries(ALL_ITEMS.map(i => [i.id, i]));

function initialState(){return {schemaVersion:2,learnerName:'Trân',level:'A0',lessonProgress:Object.fromEntries(LESSONS.map(l=>[l.id,0])),completedLessons:[],knownItems:[],reviewState:{},conversationWins:0,lastActivity:null,streak:{current:0,lastDate:null}}}
function migrateState(parsed){const base=initialState();if(!parsed||typeof parsed!=='object')return base;if(parsed.schemaVersion===2)return {...base,...parsed,lessonProgress:{...base.lessonProgress,...(parsed.lessonProgress||{})},completedLessons:Array.isArray(parsed.completedLessons)?parsed.completedLessons:[],knownItems:Array.isArray(parsed.knownItems)?parsed.knownItems:[],reviewState:parsed.reviewState||{},streak:{...base.streak,...(parsed.streak||{})}};if(parsed.schemaVersion===1||'lesson1Step'in parsed){const completed=Boolean(parsed.lesson1Completed);return {...base,knownItems:Array.isArray(parsed.knownItems)?parsed.knownItems:[],reviewState:parsed.reviewState||{},conversationWins:Number(parsed.conversationWins||0),lastActivity:parsed.lastActivity||null,streak:{...base.streak,...(parsed.streak||{})},lessonProgress:{...base.lessonProgress,l1:completed?999:Number(parsed.lesson1Step||0)},completedLessons:completed?['l1']:[]}}return base}
function loadState(){try{return migrateState(JSON.parse(localStorage.getItem(KEY)||'null'))}catch{return initialState()}}
let state=loadState(),screen='home',activeLessonId=nextLessonId(),lessonChoice=null,lessonFeedback='',reviewIndex=0,reviewRevealed=false,conversationIndex=0,conversationReply='';

function saveState(next){const today=new Date().toISOString().slice(0,10);let streak={...(next.streak||{current:0,lastDate:null})};if(streak.lastDate!==today){const y=new Date();y.setDate(y.getDate()-1);const yd=y.toISOString().slice(0,10);streak={current:streak.lastDate===yd?Number(streak.current||0)+1:1,lastDate:today}}state={...next,schemaVersion:2,lastActivity:new Date().toISOString(),streak};localStorage.setItem(KEY,JSON.stringify(state))}
function h(value=''){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function tutorAvatar(small=false){return `<div class="luc ${small?'small':''}" aria-hidden="true"><span>L</span></div>`}
function completedCount(){return state.completedLessons.filter(id=>LESSONS.some(l=>l.id===id)).length}
function knownCount(){return state.knownItems.filter(id=>ITEM_BY_ID[id]).length}
function isUnlocked(index){return index===0||state.completedLessons.includes(LESSONS[index-1].id)}
function nextLessonId(){const lesson=LESSONS.find((l,i)=>isUnlocked(i)&&!state.completedLessons.includes(l.id));return lesson?.id||LESSONS[LESSONS.length-1].id}
function lessonById(id){return LESSONS.find(l=>l.id===id)||LESSONS[0]}

function buildSteps(lesson){const steps=[{type:'intro',title:T('Bài học mới','Nouvelle leçon'),body:T(lesson.introVi,lesson.introFr)}];lesson.items.forEach((item,index)=>{steps.push({type:'teach',title:T(`Mục ${index+1}`,`Élément ${index+1}`),item});if(index%2===1){const target=lesson.items[index],pool=lesson.items.filter(x=>x.id!==target.id).slice(0,2),options=[target.vi,...pool.map(x=>x.vi)].sort((a,b)=>a.localeCompare(b,'vi'));steps.push({type:'quiz',title:T('Nhận biết nhanh','Reconnaissance rapide'),question:T(`“${target.fr}” nghĩa là gì ?`,`Que signifie « ${target.fr} » ?`),options,answer:target.vi,itemId:target.id})}});steps.push({type:'challenge',title:T('Tình huống nhỏ','Petite situation'),question:T(lesson.challenge.vi,lesson.challenge.fr),options:lesson.challenge.options,answer:lesson.challenge.answer});steps.push({type:'done',title:T('Xong bài này','Leçon terminée'),body:T('Bạn vừa học một nhóm nhỏ, hữu ích. Những mục này sẽ quay lại trong phần ôn tập và hội thoại.','Tu viens d’apprendre un petit groupe utile. Ces éléments reviendront dans les révisions et la conversation.')});return steps}
function topBar(title,{back=false,settings=false}={}){return `<header class="topbar"><button class="icon-btn ${back?'':'invisible'}" data-back aria-label="${h(T('Quay lại','Retour'))}">‹</button><div><div class="eyebrow">FRENCH TRÂN’QUILLE</div><h1>${h(title)}</h1></div><button class="icon-btn ${settings?'':'invisible'}" data-go="settings" aria-label="${h(T('Cài đặt','Réglages'))}">⚙</button></header>`}
function nav(){const buttons=[['home','⌂',T('Trang chủ','Accueil')],['conversation','◌',T('Hội thoại','Conversation')],['review','↻',T('Ôn tập','Révision')],['progress','✦',T('Tiến độ','Progrès')]];return `<nav class="bottom-nav">${buttons.map(([id,g,l])=>`<button data-go="${id}" class="${screen===id?'active':''}"><b>${g}</b><span>${h(l)}</span></button>`).join('')}</nav>`}
function shell(content){return `<div class="app-shell screen-${screen}"><main class="content">${content}</main>${nav()}</div>`}
function lessonPercent(lesson){if(state.completedLessons.includes(lesson.id))return 100;const steps=buildSteps(lesson);return Math.min(99,Math.round((Number(state.lessonProgress[lesson.id]||0)/Math.max(steps.length-1,1))*100))}
function curriculumList(){return `<section class="card curriculum-card"><div class="section-head"><div><span class="pill">A0 • ${LESSONS.length} ${h(T('bài','leçons'))}</span><h2>${h(T('Lộ trình đầu tiên','Premier parcours'))}</h2></div><span class="muted">${completedCount()}/${LESSONS.length}</span></div><div class="lesson-list">${LESSONS.map((lesson,index)=>{const unlocked=isUnlocked(index),done=state.completedLessons.includes(lesson.id),pct=lessonPercent(lesson);return `<button class="lesson-row ${done?'done':''} ${!unlocked?'locked':''}" ${unlocked?`data-open-lesson="${lesson.id}"`:'disabled'}><span class="lesson-row-icon">${lesson.icon}</span><span class="lesson-row-copy"><strong>${lesson.number}. ${h(T(lesson.titleVi,lesson.titleFr))}</strong><small>${h(T(lesson.shortVi,lesson.shortFr))}</small><span class="mini-progress"><i style="width:${pct}%"></i></span></span><span class="lesson-row-state">${done?'✓':unlocked?'›':'🔒'}</span></button>`}).join('')}</div></section>`}
function home(){const lesson=lessonById(nextLessonId()),pct=lessonPercent(lesson);return `${topBar(T('Xin chào Trân 👋','Salut Trân 👋'),{settings:true})}<section class="brand-home" aria-label="${BRAND}"><img class="brand-home-logo" src="./assets/LOGO.png" alt="${BRAND}" decoding="async"><p>${h(T('Học tiếng Pháp thật nhẹ nhàng, từng chút một.','Apprendre le français tranquillement, un petit pas à la fois.'))}</p></section><div class="home-dashboard"><div class="home-main"><section class="hero card"><div class="luc-row">${tutorAvatar()}<div><span class="muted">${T('Lucie • gia sư của bạn','Lucie • ta professeure')}</span><h2>${h(T('Hôm nay mình học thật nhẹ nhàng.','Aujourd’hui, on avance tranquillement.'))}</h2></div></div><p>${h(T('Mỗi bài chỉ thêm một nhóm nhỏ rồi bắt bạn dùng lại ngay.','Chaque leçon ajoute un petit groupe d’éléments puis te les fait réutiliser immédiatement.'))}</p></section><section class="lesson-card card"><div class="row between"><span class="pill">${h(T('Bài tiếp theo','Prochaine leçon'))}</span><span class="muted">${pct}%</span></div><h2>${lesson.icon} ${h(T(lesson.titleVi,lesson.titleFr))}</h2><p>${h(T(lesson.shortVi,lesson.shortFr))}</p><div class="progressbar"><span style="width:${Math.max(4,pct)}%"></span></div><button class="primary" data-open-lesson="${lesson.id}"><span class="glyph">▤</span>${h(state.completedLessons.includes(lesson.id)?T('Xem lại bài học','Revoir la leçon'):pct?T('Tiếp tục bài học','Continuer la leçon'):T('Bắt đầu bài học','Commencer la leçon'))}<span>›</span></button></section><section class="grid-actions"><button class="action-card" data-go="conversation"><span class="glyph">◌</span><strong>${h(T('Luyện hội thoại','Pratiquer'))}</strong><span>${h(T('Dùng lại những gì đã học','Réutiliser les acquis'))}</span></button><button class="action-card" data-go="review"><span class="glyph">↻</span><strong>${h(T('Ôn tập','Révision'))}</strong><span>${h(T('Nhớ lâu hơn','Mémoriser'))}</span></button><button class="action-card" data-go="progress"><span class="glyph">✦</span><strong>${h(T('Tiến độ','Progrès'))}</strong><span>${h(T('Xem lộ trình','Voir le parcours'))}</span></button></section></div><aside class="home-side"><section class="stats"><div class="stat"><span>A0</span><small>${h(T('Trình độ','Niveau'))}</small></div><div class="stat"><span>${knownCount()}</span><small>${h(T('Đã học','Acquis'))}</small></div><div class="stat"><span>🔥 ${state.streak.current}</span><small>${h(T('Ngày liên tiếp','Jours'))}</small></div></section>${curriculumList()}</aside></div>`}
function lesson(){const lesson=lessonById(activeLessonId),steps=buildSteps(lesson),i=Math.min(Number(state.lessonProgress[lesson.id]||0),steps.length-1),s=steps[i],correct=!['quiz','challenge'].includes(s.type)||lessonFeedback.startsWith('✓');let body='';if(s.type==='intro'||s.type==='done')body=`<h2>${h(s.title)}</h2><p>${h(s.body)}</p>`;if(s.type==='teach')body=`<h2>${h(s.title)}</h2><div class="french-block"><span class="fr">${h(s.item.fr)}</span><span class="vi">${h(s.item.vi)}</span><button class="listen" data-speak="${h(s.item.fr)}">🔊 ${h(T('Nghe','Écouter'))}</button></div><p>${h(T('Nghe một lần, đọc theo nếu bạn muốn, rồi tiếp tục.','Écoute une fois, répète si tu veux, puis continue.'))}</p>`;if(s.type==='quiz'||s.type==='challenge')body=`<h2>${h(s.title)}</h2><div class="quiz"><p class="question">${h(s.question)}</p>${s.options.map(o=>`<button class="option ${lessonChoice===o?'selected':''}" data-choice="${h(o)}">${h(o)}</button>`).join('')}${lessonFeedback?`<p class="feedback ${correct?'ok':''}">${h(lessonFeedback)}</p>`:''}</div>`;return `${topBar(`${T('Bài','Leçon')} ${lesson.number} — ${T(lesson.titleVi,lesson.titleFr)}`,{back:true})}<div class="lesson-wrap"><div class="lesson-progress"><span style="width:${((i+1)/steps.length)*100}%"></span></div><section class="teacher-line">${tutorAvatar(true)}<div><strong>Lucie</strong><span>${h(T('Bước','Étape'))} ${i+1}/${steps.length}</span></div></section><section class="card lesson-step">${body}</section><div class="lesson-nav"><button class="secondary" data-prev ${i===0?'disabled':''}>‹ ${h(T('Trước','Précédent'))}</button><button class="primary" data-next ${correct?'':'disabled'}>${h(i===steps.length-1?T('Hoàn thành','Terminer'):T('Tiếp tục','Continuer'))} ›</button></div></div>`}

const PRACTICE_PROMPTS={
  'bonjour':['Buổi sáng, bạn gặp một người. Bạn nói gì?','Le matin, tu rencontres quelqu’un. Que dis-tu ?'],
  'merci':['Ai đó giúp bạn. Bạn nói gì?','Quelqu’un t’aide. Que dis-tu ?'],
  'je-mappelle':['Hãy giới thiệu tên của bạn.','Présente-toi.'],
  'je-ne-comprends-pas':['Bạn không hiểu. Hãy nói điều đó.','Tu ne comprends pas. Dis-le.'],
  'plus-lentement':['Người kia nói quá nhanh. Bạn yêu cầu gì?','La personne parle trop vite. Que demandes-tu ?'],
  'je-viens-vietnam':['Nói rằng bạn đến từ Việt Nam.','Dis que tu viens du Vietnam.'],
  'jhabite-hcm':['Nói nơi bạn sống.','Dis où tu habites.'],
  'je-voudrais':['Bắt đầu một câu gọi món lịch sự.','Commence une commande polie.'],
  'addition':['Bạn muốn thanh toán ở quán.','Tu veux payer au café.'],
  'combien-ca-coute':['Bạn muốn hỏi giá.','Tu veux demander le prix.'],
  'ou-est':['Bạn muốn hỏi một nơi ở đâu.','Tu veux demander où se trouve un endroit.'],
  'un-billet':['Bạn muốn mua một vé.','Tu veux acheter un billet.'],
  'quelle-heure':['Bạn muốn hỏi giờ khởi hành.','Tu veux demander l’heure de départ.'],
  'quel-quai':['Bạn cần biết sân ga nào.','Tu dois connaître le quai.'],
  'quelle-heure-est-il':['Bạn muốn biết bây giờ là mấy giờ.','Tu veux savoir quelle heure il est.'],
  'payer-carte':['Bạn muốn biết có thể trả bằng thẻ không.','Tu veux savoir si tu peux payer par carte.'],
  'table-deux':['Bạn cần một bàn cho hai người.','Tu veux une table pour deux.'],
  'jai-mal-ici':['Bạn đau và muốn chỉ vị trí.','Tu as mal et tu veux montrer l’endroit.'],
  'besoin-medecin':['Bạn cần bác sĩ.','Tu as besoin d’un médecin.'],
  'enchantee':['Bạn gặp một người lần đầu.','Tu rencontres quelqu’un pour la première fois.'],
  'je-suis-perdue':['Bạn bị lạc.','Tu es perdue.'],
  'aidez-moi':['Bạn cần người khác giúp.','Tu as besoin d’aide.']
};
function norm(v=''){return String(v).toLocaleLowerCase('fr-FR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ').replace(/[^a-z0-9\s-]/g,' ').replace(/\s+/g,' ').trim()}
function practiceRounds(){return ALL_ITEMS.filter(item=>state.knownItems.includes(item.id)).map(item=>{const custom=PRACTICE_PROMPTS[item.id];return {item:item.id,vi:custom?.[0]||`Hãy nói bằng tiếng Pháp: ${item.vi}`,fr:custom?.[1]||`Dis en français : ${item.vi}`}})}
function conversation(){const rounds=practiceRounds();if(!rounds.length)return `${topBar(T('Luyện hội thoại','Conversation'))}<section class="empty card"><span class="glyph">◌</span><h2>${h(T('Học vài mục trước nhé.','Apprends d’abord quelques éléments.'))}</h2><p>${h(T('Sau đó Lucie sẽ cho bạn dùng chúng trong những tình huống khác nhau.','Ensuite Lucie te les fera réutiliser dans différentes situations.'))}</p><button class="primary" data-open-lesson="l1">${h(T('Đi tới Bài 1','Aller à la leçon 1'))}</button></section>`;const r=rounds[conversationIndex%rounds.length],item=ITEM_BY_ID[r.item];return `${topBar(T('Luyện hội thoại','Conversation'))}<div class="narrow"><section class="card conversation-card"><div class="luc-row">${tutorAvatar()}<div><strong>Lucie</strong><span class="muted">${h(T('Thực hành có hướng dẫn','Pratique guidée'))}</span></div></div><p>${h(T(r.vi,r.fr))}</p><div class="hint">${h(T('Chỉ dùng những gì bạn đã học. Không cần câu dài.','Utilise seulement ce que tu as déjà appris. Pas besoin d’une longue phrase.'))}</div><input id="conversationInput" placeholder="${h(T('Viết câu tiếng Pháp…','Écrire la phrase en français…'))}" autocomplete="off"><button class="primary full" data-conversation>${h(T('Gửi câu trả lời','Valider'))}</button>${conversationReply?`<div class="feedback-box">${h(conversationReply)}</div>`:''}</section><section class="card quiet"><span class="glyph">🎙️</span><div><strong>${h(T('Luyện nói miễn phí','Entraînement vocal gratuit'))}</strong><p>${h(T('Phần luyện bằng micro xuất hiện ngay phía trên khi trình duyệt hỗ trợ nhận dạng giọng nói.','Le module micro apparaît juste au-dessus lorsque le navigateur expose la reconnaissance vocale.'))}</p></div></section></div>`}
function review(){const learned=ALL_ITEMS.filter(i=>state.knownItems.includes(i.id));if(!learned.length)return `${topBar(T('Ôn tập','Révision'))}<section class="empty card narrow"><span class="glyph">↻</span><h2>${h(T('Chưa có gì để ôn.','Rien à réviser pour le moment.'))}</h2><p>${h(T('Bắt đầu Bài 1 trước nhé.','Commence par la leçon 1.'))}</p><button class="primary" data-open-lesson="l1">${h(T('Đi tới Bài 1','Aller à la leçon 1'))}</button></section>`;const item=learned[reviewIndex%learned.length];return `${topBar(T('Ôn tập','Révision'))}<section class="card flashcard narrow"><span class="pill">${h(T('Thẻ','Carte'))} ${(reviewIndex%learned.length)+1}/${learned.length}</span><p class="prompt">${h(T('Tiếng Pháp của câu này là gì?','Comment dit-on ceci en français ?'))}</p><h2>${h(item.vi)}</h2>${!reviewRevealed?`<button class="primary full" data-reveal>${h(T('Hiện đáp án','Afficher la réponse'))}</button>`:`<div class="answer"><span>${h(item.fr)}</span><button class="listen" data-speak="${h(item.fr)}">🔊 ${h(T('Nghe','Écouter'))}</button></div><p class="muted center">${h(T('Bạn nhớ mục này thế nào?','Comment te souviens-tu de cet élément ?'))}</p><div class="ratings"><button data-rate="0">${h(T('Khó','Difficile'))}</button><button data-rate="1">${h(T('Được','Correct'))}</button><button data-rate="2">${h(T('Dễ','Facile'))}</button></div>`}</section>`}
function progress(){const learned=ALL_ITEMS.filter(i=>state.knownItems.includes(i.id)),weak=learned.filter(i=>(state.reviewState[i.id]??1)===0).length;return `${topBar(T('Tiến độ','Progrès'))}<div class="progress-layout"><div><section class="progress-hero card"><span class="glyph">👤</span><div><span class="muted">Trân</span><h2>${h(T('Trình độ A0','Niveau A0'))}</h2><p>${h(T('Bắt đầu từ con số 0 — từng bước nhỏ.','Départ de zéro — étape par étape.'))}</p></div></section><section class="stats"><div class="stat"><span>${completedCount()}</span><small>${h(T('Bài xong','Leçons'))}</small></div><div class="stat"><span>${learned.length}</span><small>${h(T('Đã học','Acquis'))}</small></div><div class="stat"><span>${weak}</span><small>${h(T('Cần ôn','À revoir'))}</small></div></section><section class="card"><h2>${h(T('Điều đã học','Éléments appris'))}</h2>${learned.length?`<div class="learned-list">${learned.map(i=>`<div><strong>${h(i.fr)}</strong><span>${h(i.vi)}</span></div>`).join('')}</div>`:`<p class="muted">${h(T('Danh sách sẽ xuất hiện khi bạn bắt đầu học.','La liste apparaîtra dès que tu commenceras à apprendre.'))}</p>`}</section></div>${curriculumList()}</div>`}
function settings(){return `${topBar(T('Cài đặt','Réglages'),{back:true})}<div class="narrow"><section class="card"><h2>${h(T('Chẩn đoán','Diagnostic'))}</h2><div class="diagnostics"><div><span>${h(T('Phiên bản','Version'))}</span><strong>v${APP_VERSION} • Build ${BUILD}</strong></div><div><span>Schema</span><strong>${state.schemaVersion}</strong></div><div><span>${h(T('Trình độ','Niveau'))}</span><strong>${state.level}</strong></div><div><span>${h(T('Bài hoàn thành','Leçons terminées'))}</span><strong>${completedCount()}/${LESSONS.length}</strong></div><div><span>${h(T('Đã học','Acquis'))}</span><strong>${knownCount()}/${ALL_ITEMS.length}</strong></div><div><span>${h(T('Thiết bị chính','Cible principale'))}</span><strong>iPhone / Safari / PWA iOS</strong></div><div><span>${h(T('Thiết bị phụ','Cibles secondaires'))}</span><strong>Android • PC</strong></div><div><span>${h(T('Lần cuối','Dernière activité'))}</span><strong>${state.lastActivity?new Date(state.lastActivity).toLocaleString(isDebug()?'fr-FR':'vi-VN'):'—'}</strong></div></div></section><section class="card danger-zone"><h2>${h(T('Dữ liệu học','Données d’apprentissage'))}</h2><p>${h(T('Chỉ dùng khi cần bắt đầu lại từ đầu.','À utiliser seulement pour repartir de zéro.'))}</p><button class="danger" data-reset>${h(T('Đặt lại dữ liệu','Réinitialiser les données'))}</button></section></div>`}
function render(){const content=screen==='home'?home():screen==='lesson'?lesson():screen==='conversation'?conversation():screen==='review'?review():screen==='progress'?progress():settings();document.querySelector('#app').innerHTML=shell(content);bind()}
function go(id){screen=id;render();window.scrollTo({top:0,behavior:'smooth'})}
function openLesson(id){activeLessonId=id;lessonChoice=null;lessonFeedback='';screen='lesson';render();window.scrollTo({top:0,behavior:'smooth'})}
function speak(text){if(!('speechSynthesis'in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='fr-FR';u.rate=.84;u.pitch=1.04;speechSynthesis.speak(u)}
function learn(id){if(!ITEM_BY_ID[id])return;saveState({...state,knownItems:state.knownItems.includes(id)?state.knownItems:[...state.knownItems,id]})}
function nextLessonStep(){const lesson=lessonById(activeLessonId),steps=buildSteps(lesson),i=Math.min(Number(state.lessonProgress[lesson.id]||0),steps.length-1),current=steps[i];if(current.type==='teach')learn(current.item.id);if(i===steps.length-1){const known=new Set(state.knownItems);lesson.items.forEach(item=>known.add(item.id));const completed=new Set(state.completedLessons);completed.add(lesson.id);saveState({...state,knownItems:[...known],completedLessons:[...completed],lessonProgress:{...state.lessonProgress,[lesson.id]:steps.length-1}});activeLessonId=nextLessonId();screen='home';render();return}lessonChoice=null;lessonFeedback='';saveState({...state,lessonProgress:{...state.lessonProgress,[lesson.id]:i+1}});render()}
function answerAccepted(item,input){const target=norm(item.fr.replace('…','')),got=norm(input);if(!got)return false;if(got===target||got.includes(target)||(target.length>5&&target.includes(got)&&got.length>=4))return true;if(item.id==='je-voudrais'&&got.startsWith('je voudrais'))return true;if(item.id==='ou-est'&&got.startsWith('ou est'))return true;if(item.id==='je-vais-a'&&got.startsWith('je vais a'))return true;if(item.id==='je-cherche'&&got.startsWith('je cherche'))return true;if(item.id==='vous-avez'&&got.startsWith('vous avez'))return true;if(['sans','avec'].includes(item.id)&&got.startsWith(target))return true;return false}
function bind(){document.querySelectorAll('[data-go]').forEach(el=>el.addEventListener('click',()=>go(el.dataset.go)));document.querySelectorAll('[data-open-lesson]').forEach(el=>el.addEventListener('click',()=>openLesson(el.dataset.openLesson)));document.querySelectorAll('[data-back]').forEach(el=>el.addEventListener('click',()=>go('home')));document.querySelectorAll('[data-speak]').forEach(el=>el.addEventListener('click',()=>speak(el.dataset.speak)));document.querySelectorAll('[data-choice]').forEach(el=>el.addEventListener('click',()=>{const lesson=lessonById(activeLessonId),steps=buildSteps(lesson),s=steps[Math.min(Number(state.lessonProgress[lesson.id]||0),steps.length-1)];lessonChoice=el.dataset.choice;lessonFeedback=lessonChoice===s.answer?T('✓ Đúng rồi. Mình tiếp tục nhé.','✓ Correct. On continue.'):`${T('Chưa đúng. Hãy thử lại.','Pas encore. Réessaie.')} ${s.type==='quiz'?`→ ${s.answer}`:''}`;render()}));document.querySelector('[data-prev]')?.addEventListener('click',()=>{const lesson=lessonById(activeLessonId),i=Number(state.lessonProgress[lesson.id]||0);lessonChoice=null;lessonFeedback='';saveState({...state,lessonProgress:{...state.lessonProgress,[lesson.id]:Math.max(0,i-1)}});render()});const next=document.querySelector('[data-next]');if(next&&!next.disabled)next.addEventListener('click',nextLessonStep);const conv=document.querySelector('[data-conversation]');if(conv)conv.addEventListener('click',()=>{const rounds=practiceRounds();if(!rounds.length)return;const r=rounds[conversationIndex%rounds.length],item=ITEM_BY_ID[r.item],input=document.querySelector('#conversationInput')?.value||'',ok=answerAccepted(item,input);conversationReply=ok?T('✓ Đúng rồi. Lucie sẽ cho câu này quay lại sau.','✓ Correct. Lucie te fera réutiliser cette phrase plus tard.'):T(`Thử lại với: ${item.fr}`,`Réessaie avec : ${item.fr}`);if(ok){saveState({...state,conversationWins:Number(state.conversationWins||0)+1});conversationIndex=(conversationIndex+1)%rounds.length}render()});document.querySelector('[data-reveal]')?.addEventListener('click',()=>{reviewRevealed=true;render()});document.querySelectorAll('[data-rate]').forEach(el=>el.addEventListener('click',()=>{const learned=ALL_ITEMS.filter(i=>state.knownItems.includes(i.id)),item=learned[reviewIndex%learned.length];saveState({...state,reviewState:{...state.reviewState,[item.id]:Number(el.dataset.rate)}});reviewIndex=(reviewIndex+1)%learned.length;reviewRevealed=false;render()}));document.querySelector('[data-reset]')?.addEventListener('click',()=>{if(confirm(T('Xóa toàn bộ tiến độ và bắt đầu lại?','Supprimer toute la progression et recommencer ?'))){localStorage.removeItem(KEY);state=initialState();activeLessonId='l1';screen='home';render()}})}

window.FrenchTranquilleCurriculum={version:APP_VERSION,build:BUILD,lessons:LESSONS,items:ALL_ITEMS,key:KEY,brand:BRAND,tutor:TUTOR};
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
render();