# V6.1 — isolated iPhone preview: build, safety, deployment handoff

**Status:** implementation candidate / no public preview deployed, 2026-10-11.

## Purpose

Provide a downloadable, root-scoped **independent-origin** build of the actual French Trân’quille V6.1 Home + Practice candidate (Draft PR #270) for a future physical iPhone Safari / Home Screen test. This is **not a product release**, changes no source runtime code and includes no user backup.

Production is **https://shinobione.github.io/tran-french-teacher/**. Merely publishing a test at another path on `shinobione.github.io` **is unsafe**: the browser origin is still `https://shinobione.github.io`; website data and some service-worker ownership may collide. The test must use a **completely different HTTPS origin** and be hosted at that origin's root.

## Exact source/build

- Builder: `tools/build-isolated-preview.cjs` copies only the app's top-level runtime files, `assets/`, `src/` and `tests/` into a new folder, without modifying source files.
- It rewrites only the **COPIED** `index.html` (test app name, early expected-origin guard), `manifest.webmanifest` (`id/start_url/scope = /`, `Trân TEST`) and `sw.js` (cache name `ft-isolated-preview-<commit>`, deletion prefix `ft-isolated-preview-`). These changes never touch accepted product source or the normal PWA cache contract.
- All existing 52 lessons / 313 items, original three-tab routes, four Practice actions, audio/Voice, 3D art and Recovery v3 code remain byte-identical in the bundle.
- The preview **starts with empty test-browser storage**. Any progress added on the test origin is artificial. No export from Trân's real PWA is included or authorized for import.
- The output includes `preview-build.json` and `preview-provenance.json` recording pinned source SHA, origin, SW cache identity and hashes.
- The builder **rejects** `https://shinobione.github.io`, all `*.github.io` origins, local hosts as declared remote endpoints, path-based endpoints, non-HTTPS, credentials, and in-place/in-source build outputs.
- The copied `index.html` refuses any non-matching remote origin and permits `localhost`/`127.0.0.1` over HTTP **for local automated smoke testing only**.

## CI and artifacts

Workflow `.github/workflows/v61-isolated-preview-package.yml` builds the bundle for the deliberately nonexistent HTTPS origin `https://ft-v61-preview.invalid`.

It performs these gates before uploading any file:

1. `node --check` both builder and validator.
2. Build into an isolated temporary folder.
3. Static assertions: production host forbidden, origin-root manifest, unchanged real learning/Voice/Recovery sources, SW cache namespace, all SW CORE precache URLs actually present as files inside bundle, no unexpected SW mutations, origin-guard presence and no imported learner records.
4. Execute the **original Service Worker install/activate/offline fetch** handlers with a deterministic Node VM: all 192 precache entries, isolated cache namespace, deletion of stale preview caches and offline fallback. This is a **simulated lifecycle**, not proof of actual installed iPhone/browser SW activation.
5. Real headless Chrome visit on `127.0.0.1`: actual 52-lesson startup, three native tabs, four 3D Practice buttons, true disabled states, isolated preview manifest and the served SW source. Live browser/offline activation remains a physical-device gate.
6. Upload a **7-day GitHub Actions artifact only** named `ft-v61-isolated-iphone-preview-NOT-DEPLOYED`.

No GitHub Pages deployment, domain, provider, account integration, hosting permissions or production website update is attempted. **This is not yet a usable public iPhone URL.**

## After hosting-origin approval (separate action)

The owner selects and authorizes a **new origin** such as a dedicated Cloudflare Pages/Netlify/Vercel site, not a subpath of the existing GitHub Pages hostname. Such a service must permit publishing the contents of the preview folder at `/` with HTTPS.

From the repository commit approved for testing:

```bash
node tools/build-isolated-preview.cjs \
  --origin https://YOUR-APPROVED-UNIQUE-PREVIEW-ORIGIN.example \
  --out /tmp/ft-preview-for-approved-origin
node tests/smoke/isolated-preview-smoke.cjs \
  --out /tmp/ft-preview-for-approved-origin
```

The `.invalid` CI artifact **must NOT be deployed to a different origin unchanged**. Rebuild with that exact approved origin; the early guard intentionally blocks mismatches. Host the *folder contents* at HTTPS origin root, not under a subdirectory. Do not paste any login credentials into the repository or GitHub public PR.

Before requesting installation on an iPhone, inspect the remote `/preview-build.json`, installed `/manifest.webmanifest`, `/sw.js`, the test app name, 52 lessons and empty test storage; verify that **no request, redirect or PWA scope points back to the production origin**. Perform a live online→airplane-mode→reopen/offline test on the preview, separately from production.

**Do not import real learner backup into test app.** For any future real production install migration, first export/verify a separate seven-store v3 backup according to `docs/V61_IPHONE_FIELD_ACCEPTANCE.md`.

## Release gates still open

Human Stitch #4 Home/Practice design approval, independent HTTPS host selection, actual installed-iPhone Safari/Voice/offline test on a distinct test installation, min required-check branch protections, future V6.1 production SW/CSS cache successor bump and explicit owner merge/release approval.

The existing public v2.5.0 Build38 app and user data must not be cleared or replaced.
