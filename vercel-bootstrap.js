(() => {
  'use strict';

  const VERSION = '1.1.1';
  const BUILD = 6;
  const TOKEN_KEY = 'tran-french-teacher:tutor-access-token:v1';
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const ENDPOINT_KEY = 'tran-french-teacher:realtime-endpoint:v1';
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1' || new URLSearchParams(location.search).get('debug') === 'fr';
  const nativeFetch = window.fetch.bind(window);

  function storedToken() {
    return localStorage.getItem(TOKEN_KEY) || '';
  }

  function isRealtimeRequest(input) {
    try {
      const url = input instanceof Request ? input.url : String(input);
      return new URL(url, location.href).pathname.endsWith('/api/realtime');
    } catch {
      return false;
    }
  }

  window.fetch = (input, init = {}) => {
    if (!isRealtimeRequest(input)) return nativeFetch(input, init);
    const headers = new Headers(input instanceof Request ? input.headers : undefined);
    new Headers(init.headers || {}).forEach((value, key) => headers.set(key, value));
    const token = storedToken();
    if (token) headers.set('X-Tutor-Token', token);
    if (input instanceof Request) return nativeFetch(new Request(input, { ...init, headers }));
    return nativeFetch(input, { ...init, headers });
  };

  function labels() {
    if (isDebug()) return {
      setupTitle: 'Activation privée de la voix',
      setupText: "Entre une seule fois le TUTOR_ACCESS_TOKEN configuré dans Vercel. Il reste uniquement dans ce navigateur et n’est jamais envoyé à GitHub.",
      placeholder: 'TUTOR_ACCESS_TOKEN',
      save: 'Activer la voix',
      missing: 'Activation requise avant de démarrer Luc Realtime.',
      settingsTitle: 'Protection Vercel',
      configured: 'Jeton configuré sur cet appareil',
      absent: 'Aucun jeton configuré',
      replace: 'Enregistrer / remplacer',
      clear: 'Effacer',
      health: 'Tester le backend',
      healthOk: 'Backend Vercel OK',
      healthBad: 'Backend indisponible ou incomplet'
    };
    return {
      setupTitle: 'Kích hoạt giọng nói riêng tư',
      setupText: 'Nhập mã kích hoạt một lần để sử dụng giọng nói của Luc trên thiết bị này.',
      placeholder: 'Mã kích hoạt',
      save: 'Kích hoạt giọng nói',
      missing: 'Cần mã kích hoạt trước khi bắt đầu nói với Luc.',
      settingsTitle: 'Bảo vệ Vercel',
      configured: 'Thiết bị này đã được kích hoạt',
      absent: 'Thiết bị này chưa được kích hoạt',
      replace: 'Lưu mã',
      clear: 'Xóa mã',
      health: 'Kiểm tra máy chủ',
      healthOk: 'Máy chủ Vercel hoạt động',
      healthBad: 'Máy chủ chưa sẵn sàng'
    };
  }

  function endpoint() {
    const stored = localStorage.getItem(ENDPOINT_KEY);
    if (stored) return stored;
    if (!location.hostname.endsWith('github.io')) return `${location.origin}/api/realtime`;
    return '';
  }

  function healthEndpoint() {
    const url = endpoint();
    if (!url) return '';
    try {
      const parsed = new URL(url, location.href);
      parsed.pathname = parsed.pathname.replace(/\/api\/realtime\/?$/, '/api/health');
      parsed.search = '';
      return parsed.toString();
    } catch {
      return '';
    }
  }

  function injectStyles() {
    if (document.getElementById('vercel-bootstrap-style')) return;
    const style = document.createElement('style');
    style.id = 'vercel-bootstrap-style';
    style.textContent = `
      .tutor-access-box{margin-top:12px;padding:13px;border-radius:13px;background:#0b1727;border:1px solid rgba(91,155,217,.28)}
      .tutor-access-box h3{margin:0 0 6px;font-size:.98rem}.tutor-access-box p{margin:0 0 10px;font-size:.82rem}
      .tutor-access-box input,.tutor-access-settings input{width:100%;min-height:48px;border-radius:12px;border:1px solid #354961;background:#0d1929;color:#eef4fb;padding:0 12px;margin:8px 0}
      .tutor-access-box button,.tutor-access-settings button{min-height:46px;border-radius:12px;border:1px solid #3a5270;background:#14253a;color:#e9f1f9;font-weight:700;padding:0 13px;cursor:pointer}
      .tutor-access-box button{width:100%}.tutor-access-settings .access-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px}
      .tutor-access-state{font-size:.8rem;color:#91a5bc;margin:8px 0}.tutor-access-health{margin-top:10px;font-size:.8rem;color:#91a5bc}
    `;
    document.head.appendChild(style);
  }

  function saveToken(value) {
    const token = String(value || '').trim();
    if (token.length < 12) return false;
    localStorage.setItem(TOKEN_KEY, token);
    refresh();
    return true;
  }

  function injectConversationActivation() {
    const card = document.getElementById('realtime-card');
    if (!card) return;
    const l = labels();
    const button = card.querySelector('#realtime-start');
    let box = card.querySelector('#tutor-access-box');
    if (storedToken()) {
      box?.remove();
      return;
    }
    if (button) button.disabled = true;
    const status = card.querySelector('#realtime-status');
    if (status) {
      status.textContent = l.missing;
      status.dataset.state = 'error';
    }
    if (box) return;
    box = document.createElement('div');
    box.id = 'tutor-access-box';
    box.className = 'tutor-access-box';
    box.innerHTML = `<h3>🔐 ${l.setupTitle}</h3><p>${l.setupText}</p><input id="tutor-access-input" type="password" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="${l.placeholder}"><button id="tutor-access-save" type="button">${l.save}</button>`;
    card.appendChild(box);
    box.querySelector('#tutor-access-save').addEventListener('click', () => {
      if (saveToken(box.querySelector('#tutor-access-input').value)) location.reload();
    });
  }

  async function testHealth(target) {
    const l = labels();
    const health = healthEndpoint();
    if (!health) {
      target.textContent = l.healthBad;
      return;
    }
    target.textContent = '…';
    try {
      const response = await nativeFetch(health, { cache: 'no-store' });
      const data = await response.json();
      target.textContent = response.ok && data.ok && data.openaiConfigured && data.accessProtected
        ? `${l.healthOk} • ${data.realtimeVoice || 'voice'} • ${data.region || 'auto'}`
        : `${l.healthBad} • OpenAI:${Boolean(data.openaiConfigured)} • Protection:${Boolean(data.accessProtected)}`;
    } catch {
      target.textContent = l.healthBad;
    }
  }

  function injectSettings() {
    if (!isDebug()) return;
    const main = document.querySelector('.content');
    if (!main || document.getElementById('tutor-access-settings')) return;
    const diagnosticsHeading = [...main.querySelectorAll('h2')].find(h => ['Chẩn đoán','Diagnostic'].includes(h.textContent.trim()));
    if (!diagnosticsHeading) return;
    const l = labels();
    const card = document.createElement('section');
    card.id = 'tutor-access-settings';
    card.className = 'card tutor-access-settings';
    card.innerHTML = `
      <span class="pill">VERCEL SECURITY</span>
      <h2>🔐 ${l.settingsTitle}</h2>
      <div class="tutor-access-state">${storedToken() ? l.configured : l.absent}</div>
      <input id="tutor-access-settings-input" type="password" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="${l.placeholder}">
      <div class="access-actions"><button id="tutor-access-settings-save">${l.replace}</button><button id="tutor-access-settings-clear">${l.clear}</button></div>
      <button id="tutor-access-health" style="width:100%;margin-top:8px">${l.health}</button>
      <div id="tutor-access-health-result" class="tutor-access-health"></div>
      <p class="muted">v${VERSION} • Build ${BUILD}</p>`;
    const realtimeConfig = document.getElementById('realtime-config-card');
    if (realtimeConfig) realtimeConfig.after(card);
    else diagnosticsHeading.closest('.card').before(card);
    card.querySelector('#tutor-access-settings-save').addEventListener('click', () => {
      if (saveToken(card.querySelector('#tutor-access-settings-input').value)) location.reload();
    });
    card.querySelector('#tutor-access-settings-clear').addEventListener('click', () => {
      localStorage.removeItem(TOKEN_KEY);
      location.reload();
    });
    card.querySelector('#tutor-access-health').addEventListener('click', () => testHealth(card.querySelector('#tutor-access-health-result')));
  }

  function patchVersion() {
    document.querySelectorAll('.diagnostics strong').forEach(el => {
      if (/^v\d+\.\d+\.\d+\s*•\s*Build\s*\d+$/.test(el.textContent.trim())) el.textContent = `v${VERSION} • Build ${BUILD}`;
    });
  }

  function refresh() {
    injectStyles();
    patchVersion();
    injectConversationActivation();
    injectSettings();
  }

  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      refresh();
    });
  });

  const start = () => {
    refresh();
    observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();

  window.TranTutorVercel = {
    version: VERSION,
    build: BUILD,
    hasToken: () => Boolean(storedToken()),
    healthEndpoint
  };
})();
