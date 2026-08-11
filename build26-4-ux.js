(() => {
  'use strict';

  const VERSION = '1.19.4';
  const BUILD = '26.4';
  const OLD_NAME = 'Lucie';
  const NEW_NAME = 'Tyffany';
  const params = new URLSearchParams(location.search);
  const smoke = params.get('b264Smoke');
  let scheduled = false;

  const replaceName = value => typeof value === 'string' && value.includes(OLD_NAME)
    ? value.split(OLD_NAME).join(NEW_NAME)
    : value;

  function patchText(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const pending = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.nodeValue?.includes(OLD_NAME)) pending.push(node);
    }
    pending.forEach(node => {
      const next = replaceName(node.nodeValue);
      if (next !== node.nodeValue) node.nodeValue = next;
    });
  }

  function patchAttributes(root) {
    const nodes = [];
    if (root?.nodeType === Node.ELEMENT_NODE) nodes.push(root);
    root?.querySelectorAll?.('*').forEach(node => nodes.push(node));
    const safeAttributes = ['aria-label','title','alt','placeholder','data-speak'];
    nodes.forEach(node => {
      safeAttributes.forEach(name => {
        if (!node.hasAttribute?.(name)) return;
        const current = node.getAttribute(name);
        const next = replaceName(current);
        if (next !== current) node.setAttribute(name,next);
      });
    });
  }

  function patchExports() {
    const curriculum = window.FrenchTranquilleCurriculum;
    if (curriculum && typeof curriculum === 'object' && curriculum.tutor !== NEW_NAME) curriculum.tutor = NEW_NAME;
    window.FrenchTranquilleTeacher = Object.freeze({ name: NEW_NAME, previousName: OLD_NAME, version: VERSION, build: BUILD });
  }

  function installSpeechNameBridge() {
    const synth = window.speechSynthesis;
    if (!synth?.speak || synth.__frenchTranquilleTeacherNameBridge) return;
    const inheritedSpeak = synth.speak.bind(synth);
    synth.speak = utterance => {
      try {
        if (utterance && typeof utterance.text === 'string' && utterance.text.includes(OLD_NAME)) {
          utterance.text = replaceName(utterance.text);
        }
      } catch {}
      return inheritedSpeak(utterance);
    };
    synth.__frenchTranquilleTeacherNameBridge = true;
  }

  function patchVisibleBrand() {
    patchText(document.body);
    patchAttributes(document.body);
    patchExports();
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      installSpeechNameBridge();
      patchVisibleBrand();
    });
  }

  function exposeProgressDiagnostics() {
    const details = document.querySelector('.screen-progress .progress-ux-details');
    if (!details) return;
    const style = getComputedStyle(details);
    const overflowY = style.overflowY;
    const maxHeight = style.maxHeight;
    const nested = ['auto','scroll'].includes(overflowY) && details.scrollHeight > details.clientHeight + 2;
    const pageScrollable = document.documentElement.scrollHeight > innerHeight + 2;
    document.documentElement.dataset.b264ProgressOverflowY = overflowY;
    document.documentElement.dataset.b264ProgressMaxHeight = maxHeight;
    document.documentElement.dataset.b264ProgressNestedScroll = nested ? '1' : '0';
    document.documentElement.dataset.b264ProgressPageScrollable = pageScrollable ? '1' : '0';
    document.documentElement.dataset.b264ProgressSingleScroll = !nested && innerWidth >= 861 ? '1' : '0';
  }

  function runSmokeHooks() {
    if (smoke === 'brand') {
      setTimeout(() => {
        schedule();
        setTimeout(() => {
          const bodyText = document.body?.innerText || '';
          document.documentElement.dataset.b264SmokeTyffany = bodyText.includes(NEW_NAME) ? '1' : '0';
          document.documentElement.dataset.b264SmokeNoLucie = bodyText.includes(OLD_NAME) ? '0' : '1';
          document.documentElement.dataset.b264SmokeTutorExport = window.FrenchTranquilleCurriculum?.tutor === NEW_NAME ? '1' : '0';
        }, 120);
      }, 650);
    }

    if (smoke === 'progress') {
      setTimeout(() => {
        (document.querySelector('[data-ux-nav="progress"]') || document.querySelector('.bottom-nav [data-go="progress"]'))?.click();
        setTimeout(() => {
          document.querySelector('.progress-ux-details')?.setAttribute('open','');
          window.FrenchTranquilleProgressDetailsDashboard?.open?.('mastery');
          setTimeout(() => {
            exposeProgressDiagnostics();
            const details = document.querySelector('.screen-progress .progress-ux-details');
            document.documentElement.dataset.b264SmokeProgress = details ? '1' : '0';
            document.documentElement.dataset.b264SmokeMastery = document.documentElement.dataset.detailsDashboardActive === 'mastery' ? '1' : '0';
          }, 320);
        }, 680);
      }, 220);
    }
  }

  const app = document.getElementById('app');
  if (app) new MutationObserver(schedule).observe(app,{subtree:true,childList:true,characterData:true});
  window.addEventListener('resize',() => requestAnimationFrame(exposeProgressDiagnostics));

  installSpeechNameBridge();
  patchVisibleBrand();
  runSmokeHooks();

  window.FrenchTranquilleBuild264UX = {
    version: VERSION,
    build: BUILD,
    teacher: NEW_NAME,
    refresh: schedule,
    progressDiagnostics: exposeProgressDiagnostics
  };
})();
