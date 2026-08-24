'use strict';

const assert = require('node:assert/strict');
const core = require('../../src/pedagogy/a2-reception-bridge-core.js');

const ALLOWED_FACTS = ['jai-mal-ventre', 'depuis-hier', 'rendez-vous-medecin'];
const authority = (extraFacts = []) => ({
  dialogueId: 'doctor-appointment',
  prerequisiteLessonId: 'l45',
  allowedFactIds: [...ALLOWED_FACTS, ...extraFacts]
});

function fixture() {
  return {
    id: 'doctor-appointment-multi-fact',
    lane: 'A2-R1',
    source: {
      kind: 'listening-dialogue',
      dialogueId: 'doctor-appointment',
      prerequisiteLessonId: 'l45',
      prerequisiteItemIds: [...ALLOWED_FACTS]
    },
    questions: [
      {
        id: 'doctor-symptom',
        factId: 'jai-mal-ventre',
        questionVi: 'Người B đau ở đâu?',
        questionFr: 'Où la personne B a-t-elle mal ?',
        options: [
          { vi: 'Đau bụng', fr: 'Au ventre' },
          { vi: 'Đau đầu', fr: 'À la tête' },
          { vi: 'Đau lưng', fr: 'Au dos' }
        ],
        answer: 0,
        evidenceItems: ['jai-mal-ventre']
      },
      {
        id: 'doctor-duration',
        factId: 'depuis-hier',
        questionVi: 'Vấn đề bắt đầu từ khi nào?',
        questionFr: 'Depuis quand le problème a-t-il commencé ?',
        options: [
          { vi: 'Từ hôm qua', fr: 'Depuis hier' },
          { vi: 'Từ sáng nay', fr: 'Depuis ce matin' },
          { vi: 'Ngày mai', fr: 'Demain' }
        ],
        answer: 0,
        evidenceItems: ['depuis-hier']
      },
      {
        id: 'doctor-action',
        factId: 'rendez-vous-medecin',
        questionVi: 'Người B muốn làm gì?',
        questionFr: 'Que veut faire la personne B ?',
        options: [
          { vi: 'Đặt lịch với bác sĩ', fr: 'Prendre rendez-vous avec un médecin' },
          { vi: 'Mua vé tàu', fr: 'Acheter un billet de train' },
          { vi: 'Đặt bàn', fr: 'Réserver une table' }
        ],
        answer: 0,
        evidenceItems: ['rendez-vous-medecin']
      }
    ]
  };
}

function expectCode(code, fn) {
  assert.throws(fn, error => error && error.name === 'R1ContractError' && error.code === code);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

(function run() {
  assert.equal(core.roadmapSlice, 'A2-R1-pure-contract-proof');
  assert.equal(core.lane, 'A2-R1');
  assert.equal(core.schema, 'french-tranquille-a2-r1-reception/v1');

  const input = fixture();
  const before = clone(input);
  const plan = core.normalizeActivity(input, authority());

  assert.equal(plan.source.dialogueId, 'doctor-appointment');
  assert.equal(plan.source.prerequisiteLessonId, 'l45');
  assert.deepEqual(plan.source.prerequisiteItemIds, ALLOWED_FACTS);
  assert.deepEqual(plan.questions.map(question => question.factId), ALLOWED_FACTS);
  assert.deepEqual(input, before, 'normalization must not mutate source fixture');
  assert.notEqual(plan, input, 'normalized output must be detached');
  assert.notEqual(plan.source, input.source, 'nested source must be detached');
  assert.notEqual(plan.questions[0], input.questions[0], 'nested question must be detached');
  assert.ok(Object.isFrozen(plan));
  assert.ok(Object.isFrozen(plan.source));
  assert.ok(Object.isFrozen(plan.source.prerequisiteItemIds));
  assert.ok(Object.isFrozen(plan.questions));
  assert.ok(Object.isFrozen(plan.questions[0]));
  assert.ok(Object.isFrozen(plan.questions[0].options));
  assert.ok(Object.isFrozen(plan.questions[0].options[0]));
  assert.ok(Object.isFrozen(plan.questions[0].evidenceItems));

  input.source.prerequisiteItemIds[0] = 'mutated-source';
  input.questions[0].options[0].fr = 'MUTATED';
  assert.equal(plan.source.prerequisiteItemIds[0], 'jai-mal-ventre');
  assert.equal(plan.questions[0].options[0].fr, 'Au ventre');

  const success = core.evaluateQuestion(plan, 'doctor-symptom', 0);
  const miss = core.evaluateQuestion(plan, 'doctor-symptom', 1);
  assert.deepEqual(success, {
    questionId: 'doctor-symptom',
    factId: 'jai-mal-ventre',
    choiceIndex: 0,
    answerIndex: 0,
    outcome: 'success'
  });
  assert.equal(miss.outcome, 'miss');
  assert.ok(Object.isFrozen(success));
  assert.ok(['success', 'miss'].includes(success.outcome));
  assert.ok(['success', 'miss'].includes(miss.outcome));

  for (const size of [0, 1, 5]) {
    const row = fixture();
    row.questions = row.questions.slice(0, size);
    if (size === 5) {
      row.questions = [
        ...fixture().questions,
        ...fixture().questions.slice(0, 2).map((question, index) => ({
          ...clone(question),
          id: `extra-${index}`,
          factId: `extra-fact-${index}`,
          evidenceItems: [`extra-fact-${index}`]
        }))
      ];
    }
    expectCode('invalid-question-count', () => core.normalizeActivity(row, authority(['extra-fact-0', 'extra-fact-1'])));
  }

  {
    const row = fixture();
    row.questions[1].id = row.questions[0].id;
    expectCode('duplicate-question-id', () => core.normalizeActivity(row, authority()));
  }

  {
    const row = fixture();
    row.questions[1].factId = row.questions[0].factId;
    row.questions[1].evidenceItems = [row.questions[0].factId];
    expectCode('duplicate-fact-id', () => core.normalizeActivity(row, authority()));
  }

  {
    const row = fixture();
    row.questions[1].evidenceItems = [row.questions[0].factId];
    expectCode('fact-evidence-mismatch', () => core.normalizeActivity(row, authority()));
  }

  {
    const row = fixture();
    row.questions[1].questionFr = `  ${row.questions[0].questionFr.toUpperCase()}  `;
    expectCode('duplicate-prompt', () => core.normalizeActivity(row, authority()));
  }

  {
    const row = fixture();
    row.questions[1].questionVi = `  ${row.questions[0].questionVi.toUpperCase()}  `;
    expectCode('duplicate-prompt', () => core.normalizeActivity(row, authority()));
  }

  {
    const row = fixture();
    row.questions[0].options[1] = {
      vi: `  ${row.questions[0].options[0].vi.toUpperCase()}  `,
      fr: `  ${row.questions[0].options[0].fr.toUpperCase()}  `
    };
    expectCode('duplicate-option', () => core.normalizeActivity(row, authority()));
  }

  for (const badAnswer of [-1, 3, 1.5, null]) {
    const row = fixture();
    row.questions[0].answer = badAnswer;
    expectCode('invalid-answer', () => core.normalizeActivity(row, authority()));
  }

  {
    const row = fixture();
    row.questions[0].options = [];
    expectCode('invalid-options', () => core.normalizeActivity(row, authority()));
  }

  {
    const row = fixture();
    row.questions[0].options[0].fr = '';
    expectCode('invalid-text', () => core.normalizeActivity(row, authority()));
  }

  {
    const row = fixture();
    row.questions[0].evidenceItems = [];
    expectCode('invalid-evidence-shape', () => core.normalizeActivity(row, authority()));
  }

  {
    const row = fixture();
    row.questions[0].factId = 'not-authorized';
    row.questions[0].evidenceItems = ['not-authorized'];
    expectCode('unauthorized-fact', () => core.normalizeActivity(row, authority()));
  }

  {
    const row = fixture();
    row.source.prerequisiteItemIds.push('not-authorized');
    expectCode('unauthorized-prerequisite', () => core.normalizeActivity(row, authority()));
  }

  {
    const row = fixture();
    row.questions[0].evidenceItems = ['depuis-hier'];
    expectCode('fact-evidence-mismatch', () => core.normalizeActivity(row, authority()));
  }

  {
    const row = fixture();
    row.source.dialogueId = 'invite-refuse';
    expectCode('source-dialogue-mismatch', () => core.normalizeActivity(row, authority()));
  }

  {
    const row = fixture();
    row.source.prerequisiteLessonId = 'l1';
    expectCode('source-lesson-mismatch', () => core.normalizeActivity(row, authority()));
  }

  {
    const wrongAuthority = authority();
    wrongAuthority.dialogueId = 'invite-refuse';
    expectCode('source-dialogue-mismatch', () => core.normalizeActivity(fixture(), wrongAuthority));
  }

  {
    const wrongAuthority = authority();
    wrongAuthority.prerequisiteLessonId = 'l1';
    expectCode('source-lesson-mismatch', () => core.normalizeActivity(fixture(), wrongAuthority));
  }

  expectCode('missing-authority', () => core.normalizeActivity(fixture()));
  expectCode('unknown-question', () => core.evaluateQuestion(plan, 'unknown-question', 0));
  expectCode('invalid-choice', () => core.evaluateQuestion(plan, 'doctor-symptom', 9));
  expectCode('invalid-plan', () => core.evaluateQuestion({}, 'doctor-symptom', 0));

  const sourceShape = fixture();
  const sourceSingleQuestionFields = {
    questionVi: 'Vấn đề bắt đầu từ khi nào?',
    questionFr: 'Depuis quand le problème a-t-il commencé ?',
    answer: 0
  };
  const sourceSnapshot = clone(sourceSingleQuestionFields);
  core.normalizeActivity(sourceShape, authority());
  assert.deepEqual(sourceSingleQuestionFields, sourceSnapshot, 'pure core must not rewrite existing single-question source fields');

  console.log('A2-R1 pure multi-fact reception contract: PASS');
})();
