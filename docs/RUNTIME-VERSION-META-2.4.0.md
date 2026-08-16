# Runtime version metadata — maintenance closeout

## Problem

The learner Settings screen still displayed **v2.3.0 · Build 34** after Build 36 had closed.

That value was not a stale PWA cache. The F01–F04 Foundations pilot intentionally rewrote the shared historical `FrenchTranquilleBuildMeta` object to its pedagogical baseline (`2.3.0 / 34`), and the Settings diagnostics renderer reused that same mutable object.

This conflated three different concepts:

- historical architecture/build metadata;
- pedagogical baseline metadata;
- current application runtime metadata.

## Canonical ownership after this maintenance patch

```text
Application runtime       = v2.4.0 · Build 36
Pedagogical baseline      = v2.3.0 · Build 34
Historical Build32 audit  = v2.2.0 · Build 32
```

Normal runtime installs `FrenchTranquilleRuntimeMeta` and `FrenchTranquillePedagogyBaseline`, then locks the shared legacy meta object's `version` and `build` properties to the runtime values through accessor setters that intentionally ignore later phase-local rewrites.

Historical audit query modes are left untouched.

## Safety

No learner store, Recovery contract, pedagogy engine, voice owner, `app.js`, `index.html`, `sw.js`, curriculum data or Foundations content is changed.

The browser tribunal proves that:

1. runtime meta is `2.4.0 / 36`;
2. pedagogy baseline remains `2.3.0 / 34`;
3. forcing a Foundations refresh cannot reclaim runtime version ownership;
4. opening Settings renders exactly `v2.4.0 • Build 36`.
