# French Trân’quille — Navigation Field Gate post-Build 32

Status: **PLANNED / DOCS-ONLY / P1 FIELD ISSUE**  
Captured while Trân is actively using the live PWA.  
Current live baseline remains **v2.2.0 • Build 32** on `main`; no runtime change is authorized by this document.

---

# 1. Field report

A real-use video recorded on 2026-08-13 shows a reproducible navigation defect when leaving **Listening / Luyện nghe** and returning to **Aujourd’hui / Hôm nay** through the persistent bottom navigation.

Observed sequence:

```text
Listening visible
→ tap Aujourd’hui in bottom bar
→ main content disappears completely
→ bottom navigation remains visible and responsive-looking
→ blank application body persists for several seconds
→ Home finally renders
```

The same behavior appears twice in the same ~20 s recording.

Measured visual intervals from the recording:

```text
first blank interval   ≈ 8.77 s → 12.43 s   (~3.66 s)
second blank interval  ≈ 14.63 s → 18.33 s  (~3.70 s)
```

The issue is therefore not classified as cosmetic animation polish. A learner sees an apparently empty application for roughly four seconds after a primary navigation action.

---

# 2. Severity and product interpretation

Priority: **P1 Navigation Reliability**.

Why P1:

- it affects a primary tab-bar route;
- the app gives no loading/progress indication;
- content disappears while the navigation chrome remains, which looks like a crash or broken route;
- the behavior is reproducible in one short field recording;
- it occurs in a normal learner flow, not DEBUG FR;
- it can make Trân tap again, change route again, or assume the app is frozen.

This does **not** currently justify touching the live runtime while Trân is actively using it, because the destination eventually renders and no data loss is observed in the recording.

If the blank state becomes permanent, causes data loss, or blocks progression, it is promoted to an emergency runtime hotfix.

---

# 3. Freeze rule while Trân is using the app

Until Jerry explicitly opens a runtime maintenance window:

- [x] document the defect;
- [ ] do not modify `app.js`;
- [ ] do not modify shell/navigation runtime;
- [ ] do not bump service-worker cache;
- [ ] do not redeploy GitHub Pages for this issue alone;
- [ ] do not ask Trân to clear site data;
- [ ] do not reset or migrate learner state;
- [ ] do not touch voice sanctuaries.

The live app remains untouched.

---

# 4. Investigation plan for the next authorized runtime window

The first runtime maintenance window after the field report must investigate this defect **before adding navigation complexity**.

## 4.1 — Reproduce on exact current `main`

Reproduce at minimum:

```text
Aujourd’hui → Listening → Aujourd’hui
Aujourd’hui → Réviser → Aujourd’hui
Aujourd’hui → Parler → Aujourd’hui
Pratiquer → Listening → Aujourd’hui
Progrès → Aujourd’hui
```

Run each route repeatedly rather than once.

Test desktop Chrome and an iPhone-sized viewport. Real iPhone Safari/PWA confirmation remains desirable because the field report comes from normal app use.

## 4.2 — Measure route latency

Instrument route changes in test/debug only to distinguish:

- pointer/click receipt;
- router state change;
- old page teardown;
- destination shell creation;
- destination content ready;
- animation start/end;
- MutationObserver activity during transition.

The goal is to identify whether the ~3.7 s gap comes from:

- an intentional transition duration;
- an observer loop/recomposition;
- delayed destination rendering;
- waiting on an unrelated engine;
- route state becoming valid before content exists;
- multiple route handlers fighting each other;
- a stale compatibility layer;
- service-worker/runtime hybridity;
- another cause demonstrated by measurement.

No cause should be assumed from the video alone.

## 4.3 — Audit navigation ownership

Verify that the persistent bottom bar has one authoritative route action and one authoritative active-tab state.

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
user action
→ immediate visual acknowledgement
→ deterministic route state
→ destination content remains visible or appears promptly
→ no unexplained empty body
→ one active tab
```

A route transition must never intentionally show a completely empty application body for multiple seconds.

If destination preparation genuinely requires measurable time, preserve useful shell/content or show a small explicit transition/loading state rather than an unexplained blank page.

---

# 6. Acceptance criteria

The issue is not closed merely because the destination eventually appears.

Required browser contract:

- [ ] `Listening → Aujourd’hui` repeated at least 10 times with no blank-body interval > 500 ms;
- [ ] target route state changes exactly once per user action;
- [ ] exactly one bottom tab is active after navigation;
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
blank application body      0 ms preferred; never multi-second
```

The exact performance threshold may be adjusted from measured real-device behavior, but a ~3.7 s unexplained blank state is explicitly unacceptable.

---

# 7. CI regression test to add with the future fix

Create a real-browser navigation smoke that performs the actual learner flow, not DOM existence checks only.

Minimum sequence:

```text
Home
→ open Listening
→ verify real Listening content
→ tap bottom Aujourd’hui
→ verify Home content becomes visible within bounded timeout
→ repeat
→ open another Practice surface
→ return Home
→ verify one active tab and no empty-body frame/state
```

The test should record timestamps/datasets useful for diagnosing future latency regressions.

A simple assertion that `.b27-home-page` eventually exists after several seconds is insufficient.

---

# 8. Relationship with the Foundations roadmap

This field issue does **not** cancel the post-Build32 Foundations roadmap.

Canonical planning becomes:

```text
NOW, while Trân uses the app
→ docs only
→ runtime frozen

Next authorized maintenance window
→ P1 Navigation Reliability investigation/fix if reproducible

Then / in parallel where read-only
→ Build 33 — Foundations Audit & Pedagogy Specification
→ Build 34 — Foundations Pilot
→ Build 35 — Memory Evidence v2 / Migration Readiness
→ ...
```

Build 33 audit work that is purely analytical/read-only may proceed independently, but no Foundations runtime pilot should be allowed to add new routing complexity while this primary-navigation blank-state defect remains unexplained.

---

# 9. Do not “fix” by destroying state

Forbidden troubleshooting shortcuts for this field issue:

- clearing Trân’s localStorage;
- deleting/reinstalling the PWA as the first response;
- resetting progression;
- renaming learner keys;
- replacing the whole App Shell without comparative proof;
- disabling engines at random;
- hiding the blank state with a long arbitrary animation without fixing route readiness.

The problem must be explained and fixed at its actual ownership boundary.

---

# 10. Current field conclusion

Evidence available now supports this precise statement:

> Returning from Listening to Aujourd’hui can leave the application body visibly empty for roughly 3.7 seconds while the persistent bottom navigation remains visible; this happened twice in one short real-use recording.

The video alone does **not** prove the root cause.

Action now: **document and freeze**.

Action later, when Trân is no longer actively using the app: **reproduce, instrument, identify ownership/root cause, fix once, add bounded real-browser regression coverage, then certify exact SHA + Pages.**
