(() => {
  'use strict';

  const PILOT_ID = 'doctor-appointment-r1';

  const R1_AUTHORITIES = Object.freeze({
    [PILOT_ID]: Object.freeze({
      dialogueId: 'doctor-appointment',
      prerequisiteLessonId: 'l45',
      allowedFactIds: Object.freeze([
        'jai-mal-ventre',
        'depuis-hier',
        'rendez-vous-medecin'
      ])
    })
  });

  const R1_ACTIVITIES = Object.freeze({
    [PILOT_ID]: Object.freeze({
      id: PILOT_ID,
      lane: 'A2-R1',
      source: Object.freeze({
        kind: 'listening-dialogue',
        dialogueId: 'doctor-appointment',
        prerequisiteLessonId: 'l45',
        prerequisiteItemIds: Object.freeze([
          'jai-mal-ventre',
          'depuis-hier',
          'rendez-vous-medecin'
        ])
      }),
      questions: Object.freeze([
        Object.freeze({
          id: 'doctor-appointment-r1-pain-location',
          factId: 'jai-mal-ventre',
          questionVi: 'Người B đau ở đâu?',
          questionFr: 'Où la personne B a-t-elle mal ?',
          options: Object.freeze([
            Object.freeze({vi:'Ở bụng', fr:'Au ventre'}),
            Object.freeze({vi:'Ở đầu', fr:'À la tête'}),
            Object.freeze({vi:'Ở chân', fr:'À la jambe'})
          ]),
          answer: 0,
          evidenceItems: Object.freeze(['jai-mal-ventre'])
        }),
        Object.freeze({
          id: 'doctor-appointment-r1-since-when',
          factId: 'depuis-hier',
          questionVi: 'Vấn đề bắt đầu từ khi nào?',
          questionFr: 'Depuis quand le problème a-t-il commencé ?',
          options: Object.freeze([
            Object.freeze({vi:'Từ hôm qua', fr:'Depuis hier'}),
            Object.freeze({vi:'Ngày mai', fr:'Demain'}),
            Object.freeze({vi:'Từ một tuần', fr:'Depuis une semaine'})
          ]),
          answer: 0,
          evidenceItems: Object.freeze(['depuis-hier'])
        }),
        Object.freeze({
          id: 'doctor-appointment-r1-request',
          factId: 'rendez-vous-medecin',
          questionVi: 'Người B yêu cầu điều gì?',
          questionFr: 'Que demande la personne B ?',
          options: Object.freeze([
            Object.freeze({vi:'Đặt lịch với bác sĩ', fr:'Un rendez-vous avec un médecin'}),
            Object.freeze({vi:'Mua thuốc', fr:'Acheter un médicament'}),
            Object.freeze({vi:'Một chuyến tàu', fr:'Un train'})
          ]),
          answer: 0,
          evidenceItems: Object.freeze(['rendez-vous-medecin'])
        })
      ])
    })
  });

  window.FrenchTranquilleA2ReceptionBridgeData = Object.freeze({
    version: '1.0.0-pilot',
    pilotId: PILOT_ID,
    authorities: R1_AUTHORITIES,
    activities: R1_ACTIVITIES
  });
})();