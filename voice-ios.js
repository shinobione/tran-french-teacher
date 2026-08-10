(() => {
  'use strict';

  const VERSION = '1.0.3';
  const BUILD = 4;
  const VOICE_KEY = 'tran-french-teacher:luc-voice:v1';
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const RATE_KEY = 'tran-french-teacher:luc-rate:v1';
  const PITCH_KEY = 'tran-french-teacher:luc-pitch:v1';
  const params = new URLSearchParams(location.search);
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1' || params.get('debug') === 'fr';
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) return;

  const synth = window.speechSynthesis;
  const nativeSpeak = synth.speak.bind(synth);
  const maleHints = ['thomas','daniel','louis','henri','nicolas','jacques','mathieu','paul','alexandre','alain'];

  function frenchVoices() {
    return synth.getVoices().filter(v => /^fr(?:-|$)/i.test(v.lang || ''));
  }

  function autoVoice() {
    const voices = frenchVoices();
    if (!voices.length) return null;
    return [...voices].sort((a,b) => score(b) - score(a))[0] || null;
  }

  function score(v) {
    const lang = (v.lang || '').toLowerCase();
    const name = (v.name || '').toLowerCase();
    let s = 0;
    if (lang === 'fr-fr') s += 100;
    else if (lang.startsWith('fr-')) s += 70;
    else if (lang === 'fr') s += 60;
    if (v.localService) s += 18;
    if (maleHints.some(h => name.includes(h))) s += 25;
    if (/enhanced|premium|amélior|amelior/i.test(name)) s += 12;
    return s;
  }

  function selectedVoice() {
    const stored = localStorage.getItem(VOICE_KEY);
    const voices = frenchVoices();
    if (stored && stored !== 'auto') {
      const exact = voices.find(v => v.voiceURI === stored || v.name === stored);
      if (exact) return exact;
    }
    return autoVoice();
  }

  function currentRate() {
    const n = Number(localStorage.getItem(RATE_KEY));
    return Number.isFinite(n) && n >= .65 && n <= 1.2 ? n : .88;
  }

  function currentPitch() {
    const n = Number(localStorage.getItem(PITCH_KEY));
    return Number.isFinite(n) && n >= .7 && n <= 1.3 ? n : .96;
  }

  synth.speak = utterance => {
    try {
      if (utterance && /^fr(?:-|$)/i.test(utterance.lang || 'fr-FR')) {
        const voice = selectedVoice();
        if (voice) utterance.voice = voice;
        utterance.lang = voice?.lang || 'fr-FR';
        utterance.rate = currentRate();
        utterance.pitch = currentPitch();
      }
    } catch {}
    return nativeSpeak(utterance);
  };

  function preview() {
    synth.cancel();
    const u = new SpeechSynthesisUtterance("Bonjour Trân. Je m'appelle Luc. On va apprendre le français ensemble.");
    u.lang = 'fr-FR';
    synth.speak(u);
  }

  function patchDisplayedVersion() {
    document.querySelectorAll('.diagnostics strong').forEach(el => {
      if (/^v\d+\.\d+\.\d+\s*•\s*Build\s*\d+$/.test(el.textContent.trim())) {
        el.textContent = `v${VERSION} • Build ${BUILD}`;
      }
    });
  }

  function injectStyles() {
    if (document.getElementById('luc-voice-style')) return;
    const style = document.createElement('style');
    style.id = 'luc-voice-style';
    style.textContent = `
      .luc-voice-card{border-color:rgba(88,166,255,.3)!important}
      .luc-voice-card select,.luc-voice-card input[type=range]{width:100%}
      .luc-voice-card select{min-height:46px;margin:10px 0 12px;padding:0 12px;border-radius:12px;border:1px solid #354961;background:#0d1929;color:#eef4fb}
      .luc-voice-card .voice-meta{display:grid;gap:6px;margin:10px 0 14px;font-size:.82rem;color:#91a4bc}
      .luc-voice-card .voice-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px}
      .luc-voice-card button{min-height:46px;border:1px solid #3a5270;border-radius:12px;background:#14253a;color:#e9f1f9;font-weight:700;cursor:pointer}
      .luc-voice-card label{display:grid;gap:6px;margin:12px 0;color:#a8b8cb;font-size:.8rem}
      .luc-voice-card output{color:#f4efe6;font-weight:700}
    `;
    document.head.appendChild(style);
  }

  function voiceLabel(v) {
    const local = v.localService ? 'local' : 'réseau';
    return `${v.name} — ${v.lang} — ${local}`;
  }

  function injectVoiceCard() {
    if (!isDebug()) return;
    const main = document.querySelector('.content');
    if (!main || document.getElementById('luc-voice-card')) return;
    const diagnosticHeading = [...main.querySelectorAll('h2')].find(h => ['Chẩn đoán','Diagnostic'].includes(h.textContent.trim()));
    if (!diagnosticHeading) return;

    const voices = frenchVoices();
    const stored = localStorage.getItem(VOICE_KEY) || 'auto';
    const chosen = selectedVoice();
    const card = document.createElement('section');
    card.id = 'luc-voice-card';
    card.className = 'card luc-voice-card';
    card.innerHTML = `
      <span class="pill">AUDIO DEBUG</span>
      <h2>🎙️ Voix de Luc — ${isIOS ? 'iPhone / iOS' : 'navigateur actuel'}</h2>
      <p>Choisis et teste les voix françaises réellement disponibles sur cet appareil. Le choix reste local à ce navigateur.</p>
      <div class="voice-meta">
        <span>Plateforme détectée : <strong>${isIOS ? 'iOS / iPhone' : navigator.platform || 'autre'}</strong></span>
        <span>Voix françaises détectées : <strong>${voices.length}</strong></span>
        <span>Voix automatique actuelle : <strong>${chosen ? chosen.name : 'voix système par défaut'}</strong></span>
      </div>
      <select id="luc-voice-select" aria-label="Voix française de Luc">
        <option value="auto">Auto — meilleure voix française disponible</option>
        ${voices.map(v => `<option value="${escapeHtml(v.voiceURI || v.name)}" ${stored === (v.voiceURI || v.name) ? 'selected' : ''}>${escapeHtml(voiceLabel(v))}</option>`).join('')}
      </select>
      <label>Vitesse : <output id="luc-rate-out">${currentRate().toFixed(2)}</output><input id="luc-rate" type="range" min="0.70" max="1.05" step="0.02" value="${currentRate()}"></label>
      <label>Hauteur : <output id="luc-pitch-out">${currentPitch().toFixed(2)}</output><input id="luc-pitch" type="range" min="0.85" max="1.08" step="0.01" value="${currentPitch()}"></label>
      <div class="voice-actions"><button type="button" id="luc-voice-test">▶ Tester Luc</button><button type="button" id="luc-voice-auto">↺ Auto</button></div>
    `;

    const debugCard = document.getElementById('debug-fr-card');
    if (debugCard) debugCard.after(card);
    else diagnosticHeading.closest('.card').before(card);

    const select = card.querySelector('#luc-voice-select');
    select.value = stored;
    select.addEventListener('change', () => {
      localStorage.setItem(VOICE_KEY, select.value);
      preview();
      setTimeout(refresh, 80);
    });

    const rate = card.querySelector('#luc-rate');
    const rateOut = card.querySelector('#luc-rate-out');
    rate.addEventListener('input', () => {
      localStorage.setItem(RATE_KEY, rate.value);
      rateOut.value = Number(rate.value).toFixed(2);
    });

    const pitch = card.querySelector('#luc-pitch');
    const pitchOut = card.querySelector('#luc-pitch-out');
    pitch.addEventListener('input', () => {
      localStorage.setItem(PITCH_KEY, pitch.value);
      pitchOut.value = Number(pitch.value).toFixed(2);
    });

    card.querySelector('#luc-voice-test').addEventListener('click', preview);
    card.querySelector('#luc-voice-auto').addEventListener('click', () => {
      localStorage.setItem(VOICE_KEY, 'auto');
      localStorage.removeItem(RATE_KEY);
      localStorage.removeItem(PITCH_KEY);
      card.remove();
      injectVoiceCard();
      preview();
    });
  }

  function escapeHtml(value='') {
    return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function refresh() {
    injectStyles();
    patchDisplayedVersion();
    injectVoiceCard();
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
    observer.observe(document.documentElement, {subtree:true,childList:true,characterData:true});
    if ('onvoiceschanged' in synth) synth.addEventListener('voiceschanged', () => {
      document.getElementById('luc-voice-card')?.remove();
      refresh();
    });
    synth.getVoices();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();

  window.LucVoice = {
    list: frenchVoices,
    current: selectedVoice,
    preview,
    isIOS,
    version: VERSION,
    build: BUILD
  };
})();