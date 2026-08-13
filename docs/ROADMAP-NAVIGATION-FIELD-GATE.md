# French Trân’quille — Navigation Field Gate post-Build 32

Status: **PLANNED / DOCS-ONLY / P1 FIELD ISSUE**  
Captured while Trân is actively using the live PWA.  
Current live baseline remains **v2.2.0 • Build 32** on `main`; no runtime change is authorized by this document.

---

# 1. Field report

A real-use video recorded on 2026-08-13 shows a reproducible navigation defect when leaving **Listening / Luyện nghe** and returning to **Aujourd’hui / Hôm nay** through the persistent bottom navigation.

## Corrected observed sequence

The original review of the video incorrectly interpreted the later reappearance of Home as an automatic recovery. Jerry clarified that **Home does not return by itself**.

The real sequence is:

```text
Listening visible
→ tap Aujourd’hui in bottom bar
→ main content disappears completely
→ bottom navigation remains visible
→ blank application body remains indefinitely
→ no automatic recovery occurs
→ Jerry taps Aujourd’hui / Home a second time
→ Home renders after that second explicit user action
```

Therefore the visible intervals previously measured in the recording are **not route latency measurements**. They are simply the amount of time Jerry happened to wait before manually tapping Home again.

The same failure/recovery pattern appears twice in the same short recording.

This is not an animation-performance issue and not a slow route that eventually completes. It is a **persistent navigation stall / incomplete route transition** that requires a second user action to recover.

---

# 2. Severity and product interpretation

Priority: **P1 Navigation Reliability — persistent route stall**.

Why P1:

- it affects a primary tab-bar route;
- one legitimate tap can leave the learner in a contentless application state indefinitely;
- there is no loading/progress indication because the app is not merely waiting to complete a known transition;
- the bottom navigation chrome remains visible while the main application body is empty;
- the route does not self-heal;
- recovery currently requires the learner to discover that tapping Home again restores the page;
- the behavior is reproducible in a short real-use recording;
- it occurs in a normal learner flow, not DEBUG FR;
- from the learner's perspective this is indistinguishable from a partially frozen or broken application.

No data loss is demonstrated by the recording, and the bottom navigation remains available for a manual retry. For that reason the issue remains P1 rather than being declared a data-loss emergency from evidence we do not have.

However, **the defect is already persistent**. It must not be described later as a temporary blank state, slow render, or cosmetic transition issue.

---

# 3. Freeze rule while Trân is using the app

Until Jerry explicitly opens a runtime maintenance window:

- [x] document the defect accurately;
- [ ] do not modify `app.js`;
- [ ] do not modify shell/navigation runtime;
- [ ] do not bump service-worker cache;
- [ ] do not redeploy GitHub Pages for this issue alone;
- [ ] do not ask Trân to clear site data;
- [ ] do not reset or migrate learner state;
- [ ] do not touch voice sanctuaries.

The live app remains untouched while Trân is actively using it.

---

# 4. Investigation plan for the next authorized runtime window

This defect becomes the **first runtime reliability task** at the next authorized maintenance window, before adding any new navigation/runtime complexity.

## 4.1 — Reproduce on exact current `main`

Reproduce at minimum:

```text
Aujourd’hui → Listening → Aujourd’hui
Aujourd’hui → Réviser → Aujourd’hui
Aujourd’hui → Parler → Aujourd’hui
Pratiquer → Listening → Aujourd’hui
Progrès → Aujourd’hui
```

For every route, test both:

```text
single tap on destination
second tap on same destination
```

The key reproduction contract is now:

> **Does the first tap leave the body blank indefinitely, and does the second tap complete/render the destination?**

Run each route repeatedly rather than once.

Test desktop Chrome and an iPhone-sized viewport. Real iPhone Safari/PWA confirmation remains desirable because the field report comes from normal app use.

## 4.2 — Instrument the two-tap failure

Instrument route changes in test/debug only to distinguish the state after **first tap** versus **second tap**:

- pointer/click receipt;
- active-tab mutation;
- router state before/after;
- old page teardown;
- destination route selection;
- destination shell creation;
- destination content render/ready;
- hidden/display/aria state of source and destination pages;
- animation start/end;
- pending timers / microtasks if relevant;
- MutationObserver activity during transition;
- whether the second tap repeats the same code path or hits a different state branch.

The goal is to identify why the first action reaches a **stable blank state** while the second action recovers.

Candidate classes to investigate, without assuming any one is the cause:

- first tap updates active route but fails to render destination;
- first tap tears down the source before destination ownership is ready;
- route guard or equality shortcut incorrectly suppresses destination rendering;
- first tap leaves route/DOM state half-transitioned and second tap completes it;
- competing handlers process the same navigation gesture in the wrong order;
- MutationObserver recomposition removes/hides the freshly rendered destination;
- stale compatibility routing requires an unintended second transition;
- focus/animation state suppresses the first render;
- service-worker/runtime hybridity;
- another cause demonstrated by measurement.

No cause should be inferred solely from the video.

## 4.3 — Audit navigation ownership

Verify that the persistent bottom bar has:

- one authoritative route action;
- one authoritative active-tab state;
- one owner responsible for making the destination visible;
- deterministic idempotency when the currently requested route is tapped again.

Check especially the layers introduced historically by:

- Build 27 App Shell;
- compatibility routing over historical DOM;
- Progress Focus Flow leftovers;
- Session UX;
- Listening renderer;
- post-Build27 shell extensions;
- MutationObservers that may recompose nodes after route changes.

Do not solve the issue by adding another competing click handler unless the ownership model explicitly requires it.

---

# 5. Desired navigation contract

A primary tab navigation action must satisfy:

```text
ONE user action
→ immediate visual acknowledgement
→ deterministic route state
→ destination content visible/ready
→ no unexplained empty body
→ one active tab
→ no second tap required
```

A route transition must never settle into a persistent state where:

```text
bottom navigation = visible
main application body = empty
route recovery = requires learner to tap same destination again
```

Re-tapping the active/destination tab may be supported as an idempotent refresh or no-op, but it must **never be required to finish the first navigation request**.

If destination preparation genuinely requires measurable time, preserve useful shell/content or show a small explicit bounded loading state. A loading state must not be used to disguise a routing state machine that never completes.

---

# 6. Acceptance criteria

The issue is not closed because “tapping Home twice works”.

Required browser contract:

- [ ] `Listening → Aujourd’hui` succeeds on the **first tap**;
- [ ] repeat `Listening → Aujourd’hui` at least 10 times with **zero second-tap recoveries required**;
- [ ] after the first tap, Home reaches a valid rendered state within a bounded timeout;
- [ ] no stable/persistent blank-body state can be observed after a single navigation action;
- [ ] target route state changes exactly once per user action unless instrumentation proves a deliberate internal transition;
- [ ] exactly one bottom tab is active after navigation;
- [ ] re-tapping the already active Home tab is idempotent and does not repair an otherwise incomplete prior transition;
- [ ] destination Home content becomes ready deterministically;
- [ ] no horizontal overflow at 390×844;
- [ ] no duplicate route/pages produced over time;
- [ ] no unbounded MutationObserver churn;
- [ ] no learner-store writes caused solely by navigation;
- [ ] old learner remains `7 completed / l8=4 / 40 known` in compatibility smoke;
- [ ] current 52/313 curriculum remains intact;
- [ ] Listening 0.88 / 0.65 remains intact;
- [ ] Scenario 44 / 132 remains intact;
- [ ] sanctuary hashes remain exact unless a separately authorized build changes them;
- [ ] `prefers-reduced-motion` follows the same functional route contract;
- [ ] real public Pages smoke confirms the route after exact-SHA deployment if/when a fix is eventually merged.

Target UX budget:

```text
click feedback              immediate
route state                 < 100 ms target
useful destination content  < 500 ms target on local static runtime
persistent blank body       forbidden
second tap to finish route   forbidden
```

The exact performance threshold may be adjusted from measured real-device behavior. The critical requirement is functional: **the first navigation action must complete the route by itself**.

---

# 7. CI regression test to add with the future fix

Create a real-browser navigation smoke that performs the actual learner flow, not DOM existence checks only.

Minimum sequence:

```text
Home
→ open Listening
→ verify real Listening content
→ tap bottom Aujourd’hui ONCE
→ verify Home content becomes visible within bounded timeout
→ verify no second tap was sent
→ repeat x10
→ open another Practice surface
→ return Home with one tap
→ verify one active tab and no empty-body state
```

The harness should fail specifically if it observes this pattern:

```text
first Home tap
→ route/body not ready within bounded timeout
→ second Home tap would be necessary
```

The test should record timestamps and route/DOM state useful for diagnosing future regressions.

A test that automatically retries the click until Home appears would **hide this exact bug** and is therefore forbidden for the navigation acceptance path.

A simple assertion that `.b27-home-page` eventually exists is also insufficient; existence is not equivalent to visible, usable route completion.

---

# 8. Relationship with the Foundations roadmap

This field issue does **not** cancel the post-Build32 Foundations roadmap.

Canonical planning becomes:

```text
NOW, while Trân uses the app
→ docs only
→ runtime frozen

Next authorized maintenance window
→ P1 Navigation Reliability persistent-stall investigation/fix
→ certify first-tap navigation contract

Then / in parallel where read-only
→ Build 33 — Foundations Audit & Pedagogy Specification
→ Build 34 — Foundations Pilot
→ Build 35 — Memory Evidence v2 / Migration Readiness
→ ...
```

Build 33 audit work that is purely analytical/read-only may proceed independently, but no Foundations runtime pilot should add new routing complexity while this first-tap navigation defect remains unexplained.

---

# 9. Do not “fix” by destroying state

Forbidden troubleshooting shortcuts for this field issue:

- clearing Trân’s localStorage;
- deleting/reinstalling the PWA as the first response;
- resetting progression;
- renaming learner keys;
- replacing the whole App Shell without comparative proof;
- disabling engines at random;
- inserting an automatic second click/retry as a fake fix;
- making a test click twice to turn the defect green;
- hiding the blank state with a loading animation while the first route never actually completes.

The problem must be explained and fixed at its actual ownership boundary.

---

# 10. Corrected field conclusion

Evidence plus Jerry’s clarification supports this precise statement:

> Returning from Listening to Aujourd’hui can leave the application body visibly empty **indefinitely** while the persistent bottom navigation remains visible. Home does **not** return automatically. In the supplied recording, Jerry manually taps Home/Aujourd’hui a second time, and that second action restores/renders Home. The failure/recovery pattern occurs twice.

Therefore:

- this is **not** a ~3.7 s render delay;
- the previously measured ~3.7 s intervals are only the time Jerry waited before manually retrying;
- the defect is a **persistent first-tap navigation stall**;
- the second tap is a recovery action, not part of normal expected navigation.

The video and clarification still do **not** prove the technical root cause.

Action now: **document and freeze**.

Action later, when Trân is no longer actively using the app: **reproduce the one-tap/two-tap behavior, instrument first vs second action, identify ownership/root cause, fix once, add a no-retry bounded real-browser regression test, then certify exact SHA + Pages.**
