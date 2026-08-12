(() => {
  'use strict';
  const VERSION = '2.1.0-b31';

  if (!document.querySelector('link[data-build31-style]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `./learner-intelligence.css?v=${VERSION}`;
    link.dataset.build31Style = '1';
    document.head.appendChild(link);
  }

  const loadSmoke = () => {
    if (!new URLSearchParams(location.search).has('b31Audit')) return;
    if (document.querySelector('script[data-build31-smoke]')) return;
    const smoke = document.createElement('script');
    smoke.src = `./learner-intelligence-smoke.js?v=${VERSION}`;
    smoke.dataset.build31Smoke = '1';
    document.body.appendChild(smoke);
  };

  if (window.FrenchTranquilleLearnerIntelligence) {
    loadSmoke();
    return;
  }
  if (document.querySelector('script[data-build31-intelligence]')) return;

  const script = document.createElement('script');
  script.src = `./learner-intelligence.js?v=${VERSION}`;
  script.dataset.build31Intelligence = '1';
  script.addEventListener('load', loadSmoke, { once:true });
  document.body.appendChild(script);
})();
