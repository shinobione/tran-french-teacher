(() => {
  function ensureScenarioHost() {
    const content = document.querySelector('.screen-conversation .content');
    if (!content || content.querySelector('.narrow')) return;
    const topbar = content.querySelector('.topbar');
    const movable = [...content.children].filter(node => node !== topbar);
    if (!movable.length) return;
    const host = document.createElement('div');
    host.className = 'narrow scenario-host';
    movable.forEach(node => host.appendChild(node));
    content.appendChild(host);
  }

  ensureScenarioHost();
  const app = document.getElementById('app');
  if (app) {
    new MutationObserver(() => queueMicrotask(ensureScenarioHost)).observe(app, { childList:true, subtree:true });
  }

  window.FrenchTranquilleScenarioHost = { version:'1.10.0', build:17, ensure:ensureScenarioHost };
})();
