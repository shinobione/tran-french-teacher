# French Trân’quille V6.1 — installed-iPhone field acceptance

**Status: OPEN / NOT TESTED ON DEVICE** · 2026-10-11 · Design candidate [#258](https://github.com/shinobione/tran-french-teacher/pull/258), joint safety/design rehearsal branch `integration/266-v61-home-practice-recovery-evidence`.

## Preconditions and data safety

- This is a **manual physical-device** checklist, not proof of a passed field test. The GitHub Draft PR URL is not a deployed preview. **Do not replace or clear Trân's installed PWA, localStorage, iOS website data or homescreen app** just to test a Draft build.
- Test a candidate only after its exact-head CI has passed all relevant safety, PWA and visual gates, and a deliberately separate safe test deployment/environment has been agreed. Otherwise use preserved screenshots and Chrome captures.
- Before any installed-device interaction involving migration or restore, export a **validated backup v3** from the existing production app, keep a second copy off-device and verify that the backup describes **all seven stores**. Do not run a destructive reset/restore on the only copy of real learner data.
- Record iPhone model, iOS version, Safari or installed-PWA mode, browser scaling, whether web access is present, and screen recordings/screenshots if shareable. No credentials or personal data in GitHub artifacts.

## Human design comparison

- [ ] Compare **approved Stitch Home** reference versus actual Home on the same theme/width; review goat-in-café composition, lesson hero, mascot, greeting, visual hierarchy and primary CTA.
- [ ] Compare **approved Stitch Practice** reference versus actual Practice: four real activities, existing illustrations, all bilingual captions and one native action owner per card.
- [ ] Test Original, Aurora, Sunset and Jade palettes with **no theme-specific misplaced artwork or unreadable contrast**.
- [ ] Check 320px, 375px, 390px and 430px equivalent widths and ordinary plus increased iOS text settings. Chrome's 125% root-font simulation is **not** Dynamic Type certification.
- [ ] Scroll to the **real** “Bắt đầu” lesson action and Home quick Conversation at compact height. Both must be visible, >=44px, tappable and not covered by the fixed bottom navigation.
- [ ] Scroll Practice bottom to Review/Real Life; the lower CTAs must be visible above the tab bar. Gated Listening/Real Life modules must remain unavailable until genuinely unlocked.

## Real learner flows and persistence

- [ ] Installed PWA Home → start actual lesson → back Home, with correct **current lesson** and denominator **52** (not a fabricated progress level).
- [ ] Practice → Conversation/Voice, Listening, Review, Real Life (test only routes currently unlocked by actual learner state). Back navigation always returns to one coherent app facade.
- [ ] Voice microphone and audio replay behavior on iPhone, including denied-permission case; **no invented pronunciation grade** on recognition errors.
- [ ] Close/reopen PWA online then offline; verify current Home and Practice render, theme, progression and available lesson/review offline. Reconnection preserves state.
- [ ] Verify existing learner progress and seven durable stores remain intact after normal navigation, app kill/reopen and reconnection; compare validated backup metadata. **Do not perform an actual destructive restore on the user's only production data**.
- [ ] Screen reader/accessibility touch targets, text scaling, contrast and reduced-motion preferences checked for regressions.

## Release decision

- [ ] Screenshot/reference review accepted by human owner.
- [ ] Physical installed-iPhone functional/offline verdict explicitly recorded (date/device/test mode).
- [ ] The **same-head integrated GitHub CI** proves V6.1, Recovery v3, Evidence Shadow, Build28, Voice and PWA, with remaining historical CI debt individually resolved or formally adjudicated without weakening required safety contracts.
- [ ] `main` branch protection with always-present required integrity/PWA check(s) configured and confirmed.
- [ ] Merge, Pages deployment, installed-PWA smoke and rollback remain **separate deliberate gates**.

**No release signoff or physical-iPhone PASS recorded.** Next: complete joint CI proof, obtain approved Stitch reference renders for side-by-side review, and schedule the first **non-destructive** iPhone test after safe deployment planning.


## Isolated-preview data firewall — before any real iPhone trial

**Status: planned, NOT deployed or approved.** The Draft PR #266 is source evidence, **not a URL that an iPhone can install as the candidate PWA**. Do not use the production `https://shinobione.github.io/tran-french-teacher/` as a preview, and do not repoint its Pages workflow.

- Provision an explicitly approved **separate HTTPS origin** for the candidate (not merely another path under the same GitHub Pages origin). The PWA currently declares an absolute `/tran-french-teacher/` manifest `id`, `start_url` and `scope`; verify these and the service-worker registration/scope are intentionally isolated for preview in an independently reviewed build. Otherwise a supposedly temporary preview may open the production installation or share storage/service-worker ownership.
- Seed synthetic test data **only**; never import Trân's real backup or login into the preview, and do not clear Safari storage for the public PWA. Keep the production homescreen app untouched while testing a separately identifiable preview app.
- Check offline cache identity, scope and asset loading on preview before installation; any adjustment to manifest/SW for preview is its **own reviewed test-only configuration**, not a modification silently promoted into the certified #266 source.
- Physical-device PASS must capture actual iPhone/iOS version, preview URL/origin, installation method, normal/increased iOS text, screenshots and the checklist items above. Keep voice permission testing and synthetic backup continuity isolated from production.
- Do not publish or switch any preview endpoint automatically. The owner must explicitly approve the hosting/origin and final release separately. `main` required-check branch protection needs admin review; current GitHub integration cannot read this protection endpoint (403).
