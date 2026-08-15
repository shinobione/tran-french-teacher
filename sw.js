const CACHE='tran-french-teacher-v2.3.22-b34.14-v58debug1';
const V='1.17.0-b24';
const UX='1.17.5-b24.5';
const P25='1.18.0-b25';
const P252='1.18.2-b25.2';
const B26='1.19.0-b26';
const B261='1.19.1-b26.1';
const B262='1.19.2-b26.2';
const B263='1.19.3-b26.3';
const B264='1.19.4-b26.4';
const B265='1.19.5-b26.5';
const B266='1.19.6-b26.6';
const B267='1.19.7-b26.7';
const B268='1.19.8-b26.8';
const B269='1.19.9-b26.9';
const B27='1.20.0-b27';
const B28='1.21.0-b28';
const B29='1.22.0-b29';
const B291='1.22.1-b29.1';
const B292='1.22.2-b29.2';
const B30='2.0.0-b30';
const V2='2.0.0';
const LEGAL='2.0.0-postv2-legal';
const B31='2.1.0-b31';
const B32='2.2.0-b32';
const NAV='2.3.7-b34.7';
const AUDIO='2.3.1-b34.1';
const COHERENCE='2.3.21-v57art1';
const MOTION='2.3.21-v57art1';
const V4='2.3.21-v57art1';
const V5='2.3.21-v57art1';
const V5U='2.3.21-v57art1';
const V5I='2.3.21-v57art1';
const V5M='2.3.21-v57art1';
const V5F='2.3.21-v57art1';
const V5FR='2.3.21-v57art1';
const DEBUG='2.3.22-v58debug1';
const V59='2.3.23-v59ui1';
const CORE=[
  './','./index.html',
  `./styles.css?v=${V}`,`./brand.css?v=${V}`,`./learning-memory.css?v=${V}`,`./visual-pass.css?v=${V}`,`./lucie-avatar.css?v=${V}`,
  `./curriculum-stage2.css?v=${V}`,`./curriculum-stage3.css?v=${V}`,`./curriculum-stage4.css?v=${B32}`,`./daily-coach.css?v=${V}`,`./mastery-engine.css?v=${V}`,`./mastery-stage3.css?v=${V}`,
  `./scenario-engine.css?v=${V}`,`./real-life-ux.css?v=${V}`,`./error-intelligence.css?v=${V}`,`./listening-engine.css?v=${V}`,`./language-ratio.css?v=${V}`,`./ux-shell.css?v=${UX}`,`./interaction-ux.css?v=${UX}`,`./mobile-polish.css?v=${UX}`,`./progression-ux.css?v=${P25}`,`./session-ux.css?v=${P252}`,`./voice-replay.css?v=${B261}`,`./progress-details-dashboard.css?v=${B261}`,`./build26-3-ux.css?v=${B263}`,`./build26-4-ux.css?v=${B264}`,`./build26-5-ux.css?v=${B265}`,`./build26-6-ux.css?v=${B266}`,`./build26-7-ux.css?v=${B267}`,`./build26-8-ux.css?v=${B268}`,`./build26-9-ux.css?v=${B269}`,`./build27-app-shell.css?v=${B27}`,`./build29-iphone-a11y.css?v=${B29}`,`./speaking-loop-content.css?v=${B292}`,`./learner-intelligence.css?v=${B31}`,
  './appearance-themes.css?v=1.1.0-v57art1',
  `./premium-theme-polish-v2-base.css?v=${V5F}`,`./premium-depth-pass.css?v=${V5F}`,`./premium-depth-mobile-geometry.css?v=${V5F}`,`./premium-mockup-polish-v3.css?v=${V5F}`,
  `./premium-v4-home.css?v=${V5F}`,`./premium-v4-progress.css?v=${V5F}`,`./premium-v4-practice.css?v=${V5F}`,`./premium-v4-listening.css?v=${V5F}`,`./premium-v4-settings.css?v=${V5F}`,`./premium-v4-ownership-hotfix.css?v=${V5F}`,`./premium-v4-route-coherence.css?v=${COHERENCE}`,`./premium-v4-motion.css?v=${MOTION}`,`./premium-v4-contrast.css?v=${V4}`,`./premium-v5-coherence.css?v=${V5}`,`./premium-v5-listening-settings.css?v=${V5}`,`./premium-v5-utility.css?v=${V5U}`,`./premium-v5-islands.css?v=${V5I}`,`./premium-v5-mockup-convergence.css?v=${V5M}`,`./premium-v5-fidelity-reset.css?v=${V5F}`,`./premium-v5-fidelity-refine.css?v=${V5FR}`,`./premium-v5-fidelity-card-hotfix.css?v=${V5FR}`,`./premium-v5-fidelity-settings-hotfix.css?v=${V5FR}`,`./premium-v5-fluidity.css?v=${V59}`,`./premium-nav-geometry-hotfix.css?v=${V5F}`,`./premium-theme-polish.css?v=${V59}`,
  `./data-recovery-core.js?v=${B28}`,`./data-recovery.js?v=${B28}`,
  `./progress-safety.js?v=${V}`,`./app.js?v=${V}`,`./curriculum-stage2.js?v=${V}`,`./curriculum-stage3.js?v=${V}`,`./stage2-boot.js?v=${NAV}`,`./field-navigation-runtime.js?v=${NAV}`,`./field-audio-session.js?v=${AUDIO}`,`./theme-controller.js?v=${V5F}`,`./premium-v5-fidelity-reset.js?v=${V5F}`,`./premium-v5-fluidity.js?v=${V59}`,
  `./debug-fr.js?v=${DEBUG}`,`./voice-ios.js?v=${V}`,`./free-voice.js?v=${V}`,`./learning-memory.js?v=${V}`,`./error-intelligence.js?v=${V}`,
  `./language-ratio-core.js?v=${V}`,`./language-ratio.js?v=${V}`,`./daily-coach.js?v=${V}`,`./mastery-engine.js?v=${V}`,`./mastery-stage3.js?v=${V}`,
  `./scenario-data.js?v=${V}`,`./real-life-data.js?v=${V}`,`./real-life-data-2.js?v=${V}`,`./real-life-data-3.js?v=${B26}`,`./scenario-host.js?v=${V}`,`./scenario-engine.js?v=${V}`,`./real-life-ux.js?v=${V}`,`./real-life-coach.js?v=${B26}`,
  `./listening-data.js?v=${V}`,`./listening-engine.js?v=${V}`,`./ux-shell.js?v=${UX}`,`./interaction-ux.js?v=${UX}`,`./progression-ux.js?v=${B266}`,`./session-ux.js?v=${B265}`,`./session-ux-adapter.js?v=${P252}`,`./voice-replay.js?v=${B261}`,`./progress-details-dashboard.js?v=${B266}`,`./build26-3-ux.js?v=${B263}`,`./build26-4-ux.js?v=${B264}`,`./build26-5-ux.js?v=${B265}`,`./build26-6-ux.js?v=${B266}`,`./build26-7-ux.js?v=${B267}`,`./build26-8-ux.js?v=${B268}`,`./build26-9-ux.js?v=${B269}`,`./build27-app-shell.js?v=${B27}`,`./build27-smoke.js?v=${B27}`,`./data-recovery-smoke.js?v=${B28}`,`./build29-iphone-a11y.js?v=${B29}`,`./build29-smoke.js?v=${B29}`,`./speaking-loop-content.js?v=${B292}`,`./speaking-loop-smoke.js?v=${B292}`,`./speaking-loop-variety-smoke.js?v=${B292}`,`./runtime-contracts.js?v=${B30}`,`./runtime-bridge.js?v=${B30}`,`./build30-architecture-smoke.js?v=${B30}`,`./v2-release-smoke.js?v=${V2}`,'./release-v2.json',`./build-meta.js?v=${B29}`,`./settings-legal.js?v=${LEGAL}`,`./build31-loader.js?v=${B31}`,`./learner-intelligence.js?v=${B31}`,`./learner-intelligence-smoke.js?v=${B31}`,`./build32-loader.js?v=${B32}`,`./curriculum-stage4.js?v=${B32}`,`./build32-shell-extension.js?v=${B32}`,`./real-life-data-4.js?v=${B32}`,`./listening-data-2.js?v=${B32}`,`./learner-intelligence-v2.js?v=${B32}`,`./build32-smoke.js?v=${B32}`,`./manifest.webmanifest?v=${B29}`,
  `./assets/LOGO.png?v=${V}`,`./assets/Favicon.png?v=${V}`,'./assets/icon-192.webp','./assets/apple-touch-icon.png','./assets/HomeLogo.png?v=2.3.2-theme2',
  './assets/premium/themes/original/background-v2.png','./assets/premium/themes/aurora/background.webp','./assets/premium/themes/sunset/background.webp','./assets/premium/themes/nocturne/background.webp',
  './assets/premium/themes/original/lesson-eiffel-v2.png','./assets/premium/themes/aurora/lesson-eiffel-v2.png','./assets/premium/themes/sunset/lesson-eiffel-v2.png','./assets/premium/themes/nocturne/lesson-eiffel-v2.png'
];

self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    await cache.addAll(CORE);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith((async()=>{
    try{
      const response=await fetch(event.request);
      if(response.ok){
        const copy=response.clone();
        event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)));
      }
      return response;
    }catch{
      return (await caches.match(event.request)) || (await caches.match('./index.html'));
    }
  })());
});
