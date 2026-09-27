# CSS Tokens

## How CSS tokens work in this repo

**1. Single source of truth:** [tokens.css](../packages/ui/src/tokens.css) lives in the shared `@resumex/ui` package and defines CSS custom properties (`--rf-*`) for colors, spacing, and radius, plus two theme variants scoped by `[data-theme='dark']` / `[data-theme='light']` attribute selectors.

**2. Exposed as a subpath export** — [package.json](../packages/ui/package.json) maps `"./tokens.css": "./src/tokens.css"`, so any app can do:

```ts
import '@resumex/ui/tokens.css';
```

without reaching into `node_modules` internals.

**3. Imported once per app entry** — both [shell/bootstrap.tsx](../apps/shell/src/bootstrap.tsx) and [editor/bootstrap.tsx](../apps/editor/src/bootstrap.tsx) import it at startup. Rspack's `experiments.css: true` handles it as a native CSS module, and it gets bundled into a separate chunk (visible in the compiled output as `dist/180.css` / `dist/687.css`).

**4. Theme switching is attribute-driven** — `<html data-theme="dark">` in each `index.html` selects which variable block applies. Flipping that attribute to `"light"` (e.g. via a toggle that sets `document.documentElement.dataset.theme`) swaps the whole palette instantly since components only ever reference the semantic variables (`--rf-bg`, `--rf-text`, `--rf-accent`, etc.), never raw hex values.

**5. Components consume tokens via plain CSS classes** — e.g. [Button.tsx](../packages/ui/src/Button.tsx) just applies `className="rf-btn"`, and `.rf-btn` in tokens.css references `var(--rf-space-2)`, `var(--rf-radius-md)`, `var(--rf-accent-600)`. This is why the shared `Button` and `EditorApp`'s `.rf-card`/`.rf-input`/`.rf-muted` classes look consistent across the shell and the federated editor — both import the same tokens file independently, so even though they're separate Module Federation builds, they render with identical design values.

### Gotcha

Since **both** apps import `tokens.css` independently (not shared via the Module Federation `shared` config), each gets its own copy bundled — duplicated but harmless since custom properties are idempotent globally.

## Tailwind CSS integration

Tailwind (v4) is layered on top of the tokens above instead of replacing them, so utilities stay in sync with the existing theme toggle.

**1. Bridge file** — [tailwind.css](../packages/ui/src/tailwind.css) does `@import 'tailwindcss';` and maps Tailwind's `@theme` variables to the existing `--rf-*` custom properties (e.g. `--color-rf-bg: var(--rf-bg);`). This generates utilities like `bg-rf-bg`, `text-rf-text`, `p-rf-4`, `rounded-rf-md` that resolve through the same runtime variables `tokens.css` defines — so `[data-theme='light']` still swaps them correctly.

**2. Exposed as a subpath export**, same pattern as tokens.css: `"./tailwind.css": "./src/tailwind.css"` in [packages/ui/package.json](../packages/ui/package.json).

**3. Imported after `tokens.css`, at the entry that's actually bundled for each context:**

```ts
import '@resumex/ui/tokens.css';
import '@resumex/ui/tailwind.css';
```

- Shell: [shell/bootstrap.tsx](../apps/shell/src/bootstrap.tsx) — shell is the host, never federated, so its own entry is always loaded.
- Editor: **[editor/EditorApp.tsx](../apps/editor/src/EditorApp.tsx)**, not `bootstrap.tsx`. Module Federation only exposes `./EditorApp` ([rspack.config.mjs](../apps/editor/rspack.config.mjs)) — `bootstrap.tsx` is standalone-dev-preview-only and is never part of the federated module graph. CSS imported there never ships to the shell. Rspack then emits a `__federation_expose_EditorApp.css` chunk that the shell's federation runtime auto-injects when the remote loads.

**4. Build pipeline** — Rspack's native `type: 'css'` handling doesn't run PostCSS, so a `postcss-loader` step was added in front of it in both [shell/rspack.config.mjs](../apps/shell/rspack.config.mjs) and [editor/rspack.config.mjs](../apps/editor/rspack.config.mjs):

```js
{ test: /\.css$/, type: 'css', use: ['postcss-loader'] },
```

A single root [postcss.config.mjs](../postcss.config.mjs) registers the `@tailwindcss/postcss` plugin, and Tailwind v4's automatic content detection scans the whole workspace (respecting `.gitignore`) — no `content: []` globs to maintain. Note this also means each app's Tailwind output only contains utility classes literally present in files _that app's own build_ can see — a class used only in `apps/editor` won't appear in the shell's generated CSS.

**5. TypeScript needs ambient module declarations** for side-effect CSS imports (`import '@resumex/ui/tailwind.css';` has no types by default). Added to both apps as a new `types/css.d.ts` (same convention as [shell's remotes.d.ts](../apps/shell/src/types/remotes.d.ts)):

```ts
declare module '@resumex/ui/tokens.css';
declare module '@resumex/ui/tailwind.css';
```

**6. Dependencies** — `tailwindcss`, `@tailwindcss/postcss`, `postcss`, and `postcss-loader` were added as workspace-root devDependencies (`pnpm add -D -w <pkg>`), following the same single-version-policy convention already used for `turbo`, `eslint`, and `vitest`. They won't appear in `apps/shell/package.json` or `apps/editor/package.json` — that's expected.

**Why this still resolves:** pnpm blocks `pnpm add` at the workspace root unless you pass `-w` (`ERR_PNPM_ADDING_TO_ROOT` otherwise), which is a deliberate guardrail since root deps are implicitly available to every workspace package. Node's module resolution walks up from `apps/editor/` → `apps/` → the workspace root `node_modules`, so `postcss-loader` (required directly by each app's `rspack.config.mjs`) still resolves even without being listed in that app's own `package.json`.

|                     | Root install (`-w`)                          | Per-app install                                    |
| ------------------- | -------------------------------------------- | -------------------------------------------------- |
| Visibility          | Hidden unless you check root `package.json`  | Explicit in that app's `package.json`              |
| Version consistency | One version across the whole monorepo        | Each app could drift to different versions         |
| Robustness          | Relies on Node's hoisting/resolution walk-up | Self-contained, safer if hoisting behavior changes |

If an app's build tooling directly `require()`s a root-only devDependency (as `rspack.config.mjs` does with `postcss-loader`), the more explicit convention is to also declare it in that app's own `package.json`.
