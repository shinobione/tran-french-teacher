# Build 39.5 — LI3 Practice Advisory — Closeout

Status: **CLOSED / CERTIFIED**

Accepted merge:

```text
3d3a6259b7b86ef7f7511832368c6d1eb549be44
```

PR: **#217 — Build 39.5 · LI3 advisory-only Practice recommendation**

Final candidate head:

```text
c171b0e65194289257a5e30763965f9f6ef6c03a
```

## Certified learner-facing contract

When the learner explicitly opens Practice:

```text
39.4 runtime snapshot decide()
→ phrase-retrieval → Réviser
→ listening        → Écouter
→ scenario         → Dans la vraie vie
→ abstain/unsupported → no advisory
```

The recommendation uses the existing `Gợi ý lúc này / Conseillé maintenant` presentation. Build27 remains the owner of the four Practice actions and all historical routes/click behavior.

No automatic route/action is executed. There is deliberately no `Parler` fallback when LI3 abstains.

## Final-head proof

Dedicated run:

```text
32182481929 — SUCCESS
```

The real-browser tribunal passed:

```text
VI desktop
FR desktop
VI iPhone-size
FR iPhone-size
```

and proved:

- retrieval evidence → only Review advised;
- listening evidence → only Listening advised;
- scenario evidence → only Real Life advised;
- recognition-only evidence → no advisory;
- empty evidence → no advisory;
- opening Practice does not auto-route;
- manual Review still reaches the historical route;
- seven durable stores remain byte-identical while advice renders;
- historical learner continuity remains `7 completed / l8=4 / 40 known`;
- Practice targets retain their touch geometry and no horizontal overflow appears.

Final exact-head matrix: **exactly the five inherited standing failures, no other failure, no queued, no in-progress**.

## Initial harness failure classification

Initial dedicated run `32182214772` failed only because the tribunal created the real-app iframe with the HTML `hidden` attribute and then required 44px button geometry. `hidden` makes the iframe `display:none`, so layout rectangles are necessarily 0×0.

The LI3 Listening recommendation markers were already correct. Only the test harness was changed to keep the iframe layoutable off-screen. No product logic, mapping, route, storage or evidence semantics changed for this classification.

## Safety

- Build27 App Shell byte-identical;
- no Daily Coach rewrite;
- no direct 39.5 storage access;
- no new durable store/schema/migration;
- no Evidence product read-path cutover;
- no concept/Foundation/Transfer evidence invention;
- no recognition-only recommendation;
- public metadata remains `v2.5.0 · Build 38`.
