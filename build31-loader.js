(() => {
  'use strict';
  const VERSION = '2.1.0-b31';
  const params = new URLSearchParams(location.search);
  const historicalSmoke = [...params.keys()].some(key => /smoke/i.test(key)) && !params.has('v2Audit') && !params.has('b32Audit');
  const legacyAudit = params.has('b31Audit') || params.has('b30Audit') || historicalSmoke;

  if (!legacyAudit) {
    if (document.querySelector('script[data-build32-loader]')) return;
    const successor = document.createElement('script');
    successor.src = './build32-loader.js?v=2.2.0-b32';
    successor.dataset.build32Loader = '1';
    document.body.appendChild(successor);
    return;
  }

  if (!document.querySelector('link[data-build31-style]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `./learner-intelligence.css?v=${VERSION}`;
    link.dataset.build31Style = '1';
    document.head.appendChild(link);
  }

  const loadSmoke = () => {
    if (!params.has('b31Audit')) return;
    if (document.querySelector('script[data-build31-smoke]')) return;
    const smoke = document.createElement('script');
    smoke.src = `./learner-intelligence-smoke.js?v=${VERSION}`;
    smoke.dataset.build31Smoke = '1';
    document.body.appendChild(smoke);
  };

  if (window.FrenchTranquilleLearnerIntelligence) { loadSmoke(); return; }
  if (document.querySelector('script[data-build31-intelligence]')) return;

  const script = document.createElement('script');
  script.src = `./learner-intelligence.js?v=${VERSION}`;
  script.dataset.build31Intelligence = '1';
  script.addEventListener('load', loadSmoke, { once:true });
  document.body.appendChild(script);
})();