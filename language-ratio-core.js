(() => {
  'use strict';

  const PROFILES = {
    'vi-heavy':   { id:'vi-heavy',   vi:90, fr:10, viLabel:'VI rất nhiều', frLabel:'VI-HEAVY' },
    'vi-support': { id:'vi-support', vi:70, fr:30, viLabel:'VI hỗ trợ', frLabel:'VI-SUPPORT' },
    'balanced':   { id:'balanced',   vi:50, fr:50, viLabel:'Cân bằng', frLabel:'BALANCED' },
    'fr-growing': { id:'fr-growing', vi:30, fr:70, viLabel:'FR tăng dần', frLabel:'FR-GROWING' }
  };

  const CONTEXTS = {
    navigation:       { viDelta:-15 },
    home:             { viDelta:-5 },
    daily:            { viDelta:0 },
    'lesson-new':     { viDelta:15 },
    'lesson-review':  { viDelta:-10 },
    grammar:          { viDelta:15 },
    listening:        { viDelta:-10 },
    scenario:         { viDelta:-10 },
    'scenario-hint':  { viDelta:15 },
    'feedback-error': { viDelta:20 },
    'feedback-ok':    { viDelta:-10 },
    admin:            { viDelta:15, minVi:60 },
    safety:           { viDelta:20, minVi:70 }
  };

  const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
  const ratio=(a,b)=>b>0?a/b:0;
  const round=value=>Math.round(Number(value||0));

  function normalizeEvidence(input={}) {
    const curriculum=input.curriculum||{};
    const memory=input.memory||{};
    const listening=input.listening||{};
    const practice=input.practice||{};
    const errors=input.errors||{};
    const completed=Math.max(0,Number(curriculum.completed||0));
    const totalLessons=Math.max(1,Number(curriculum.total||40));
    const known=Math.max(0,Number(curriculum.known||0));
    const totalItems=Math.max(1,Number(curriculum.totalItems||238));
    const reviewed=Math.max(0,Number(memory.reviewed||0));
    const solid=Math.max(0,Number(memory.solid||0));
    const fragile=Math.max(0,Number(memory.fragile||0));
    const due=Math.max(0,Number(memory.due||0));
    const listeningAttempts=Math.max(0,Number(listening.attempts||0));
    const listeningCorrect=Math.max(0,Math.min(listeningAttempts,Number(listening.correct||0)));
    const conversationWins=Math.max(0,Number(practice.conversationWins||0));
    const scenarioSuccesses=Math.max(0,Number(practice.scenarioSuccesses||0));
    const recentErrors=Math.max(0,Number(errors.recent||0));
    const recurringErrors=Math.max(0,Number(errors.recurring||0));
    const assisted=Math.max(0,Number(errors.assisted||0));
    return {
      completed,totalLessons,known,totalItems,reviewed,solid,fragile,due,
      listeningAttempts,listeningCorrect,conversationWins,scenarioSuccesses,
      recentErrors,recurringErrors,assisted,
      knownRatio:ratio(known,totalItems),
      lessonRatio:ratio(completed,totalLessons),
      reviewedRatio:ratio(reviewed,Math.max(known,1)),
      solidRatio:ratio(solid,Math.max(known,1)),
      fragileRatio:ratio(fragile,Math.max(known,1)),
      listeningAccuracy:ratio(listeningCorrect,Math.max(listeningAttempts,1)),
      practiceEvidence:conversationWins+scenarioSuccesses,
      evidenceCount:reviewed+listeningAttempts+conversationWins+scenarioSuccesses
    };
  }

  function scoreEvidence(input={}) {
    const e=normalizeEvidence(input);
    const curriculumScore=clamp(e.lessonRatio,0,1)*12 + clamp(e.knownRatio,0,1)*8;
    const memoryScore=clamp(e.reviewedRatio,0,1)*22 + clamp(e.solidRatio,0,1)*23;
    const listeningConfidence=clamp(e.listeningAttempts/12,0,1);
    const listeningScore=e.listeningAccuracy*listeningConfidence*20;
    const practiceScore=clamp(e.practiceEvidence/12,0,1)*15;
    const fragilePenalty=clamp(e.fragileRatio,0,1)*18;
    const duePenalty=clamp(e.due/12,0,1)*5;
    const recentPenalty=clamp(e.recentErrors/12,0,1)*10;
    const recurringPenalty=clamp(e.recurringErrors/6,0,1)*10;
    const assistedPenalty=clamp(e.assisted/5,0,1)*7;
    const raw=curriculumScore+memoryScore+listeningScore+practiceScore-fragilePenalty-duePenalty-recentPenalty-recurringPenalty-assistedPenalty;
    const score=clamp(Math.round(raw),0,100);
    return {
      ...e,
      score,
      components:{
        curriculum:round(curriculumScore),memory:round(memoryScore),listening:round(listeningScore),practice:round(practiceScore),
        penalties:{fragile:round(fragilePenalty),due:round(duePenalty),recent:round(recentPenalty),recurring:round(recurringPenalty),assisted:round(assistedPenalty)}
      }
    };
  }

  function profileFor(input={}) {
    const e=scoreEvidence(input);
    const enoughListening=e.listeningAttempts>=4 && e.listeningAccuracy>=.55;
    const enoughPractice=e.practiceEvidence>=6;
    let id='vi-heavy';
    if(e.score>=28 && e.evidenceCount>=7 && e.reviewed>=4) id='vi-support';
    if(e.score>=50 && e.evidenceCount>=14 && e.reviewed>=8 && (enoughListening||enoughPractice)) id='balanced';
    if(
      e.score>=72 && e.evidenceCount>=28 && e.reviewed>=16 &&
      e.listeningAttempts>=8 && e.listeningAccuracy>=.68 &&
      e.fragileRatio<=.25 && e.recurringErrors<=2 && e.assisted<=2
    ) id='fr-growing';
    if(e.recentErrors>=8 || e.recurringErrors>=4 || e.fragileRatio>=.45) {
      id=id==='fr-growing'?'balanced':id==='balanced'?'vi-support':id;
    }
    if(e.evidenceCount<6 || e.reviewed<3) id='vi-heavy';
    return {...PROFILES[id],evidence:e};
  }

  function ratioFor(profileOrInput,context='daily') {
    const profile=typeof profileOrInput?.id==='string'&&PROFILES[profileOrInput.id]?profileOrInput:profileFor(profileOrInput||{});
    const config=CONTEXTS[context]||{viDelta:0};
    let vi=clamp(Number(profile.vi||90)+Number(config.viDelta||0),20,95);
    if(Number.isFinite(config.minVi))vi=Math.max(vi,config.minVi);
    const fr=100-vi;
    return {
      profile:profile.id,context,vi,fr,
      primary:vi>=55?'vi':'fr',
      showVietnamese:vi>=30,
      showFrench:fr>=20,
      support:vi>=55?'fr':'vi'
    };
  }

  function text(vi,fr,profileOrInput,context='daily') {
    const r=ratioFor(profileOrInput,context);
    return r.primary==='fr'?fr:vi;
  }

  function pair(vi,fr,profileOrInput,context='daily') {
    const r=ratioFor(profileOrInput,context);
    return r.primary==='fr'?{main:fr,support:vi,...r}:{main:vi,support:fr,...r};
  }

  function explain(input={}) {
    const p=profileFor(input),e=p.evidence;
    const positives=[];const cautions=[];
    if(e.reviewed>=8)positives.push('review-evidence');
    if(e.solidRatio>=.45)positives.push('solid-memory');
    if(e.listeningAttempts>=4&&e.listeningAccuracy>=.65)positives.push('listening-comprehension');
    if(e.practiceEvidence>=6)positives.push('active-practice');
    if(e.fragileRatio>=.25)cautions.push('fragile-memory');
    if(e.recentErrors>=4)cautions.push('recent-errors');
    if(e.recurringErrors>=2)cautions.push('repeated-errors');
    if(e.assisted>=2)cautions.push('assistance-needed');
    if(e.evidenceCount<14)cautions.push('not-enough-evidence');
    return {profile:p.id,score:e.score,positives,cautions,evidenceCount:e.evidenceCount,components:e.components};
  }

  const api={version:'1.14.0',build:21,profiles:PROFILES,contexts:CONTEXTS,normalizeEvidence,scoreEvidence,profileFor,ratioFor,text,pair,explain};
  if(typeof window!=='undefined')window.FrenchTranquilleLanguageCore=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})();
