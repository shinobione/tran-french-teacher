# Hotfix v1.17.1 — Build 24.1 — Options Crash

## Incident

Opening **⚙️ Options / Réglages** could freeze or crash the whole application.

## Root cause

`src/core/build-meta.js` observes mutations under `#app` so it can keep the displayed Version / Build synchronized after screen renders.

On the Settings screen, the observer found the Version row and executed `value.textContent = ...` on every mutation, even when the text was already correct. Replacing `textContent` creates a new `childList` mutation, which called the observer again. This created an unbounded feedback loop specifically while the diagnostic card existed.

## Fix

The diagnostic patch is now idempotent:

```js
const next = `v${META.version} • Build ${META.build}`;
if (value.textContent !== next) value.textContent = next;
```

No DOM write occurs when the displayed value is already correct.

## Cache

The service-worker cache name is bumped to `tran-french-teacher-v1.17.1-b24.1-options-hotfix` while retaining the Build 24 resource query keys. This forces a clean refill without breaking offline compatibility with the current `index.html`.

## Regression protection

A dedicated GitHub Actions workflow now opens the real application inside Chrome, clicks the real Settings gear and verifies that:

- Settings renders in normal learner mode;
- Settings renders in DEBUG FR mode;
- the diagnostics card exists;
- the Version row exists;
- no fatal boot card appears;
- the browser returns instead of entering a mutation loop.

The workflow also preserves the exact hashes of the validated branding and iPhone voice files.

## Data safety

This hotfix does **not** modify:

- learner storage key `francais-avec-luc:learner:v1`;
- curriculum data;
- lesson progress;
- Learning Memory;
- `voice-ios.js`;
- `free-voice.js`;
- `assets/LOGO.png`;
- `assets/Favicon.png`.
