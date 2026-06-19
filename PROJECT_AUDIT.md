# Project Audit — fix-mi-yard

Date: 2026-06-19

This document summarizes issues found when scanning the repository, prioritizes fixes (functional and low-risk first), and provides concrete recommendations and code examples you can apply. I inspected: `eslint.config.mts`, `package.json`, `tsconfig*.json`, `src/styles.css`, `src/theme-light-dark.css`, component templates (header/footer/navigation), `homepage` pages, and several usages of `MenuItem` and `NgOptimizedImage`.

Checklist (what I did)
- [x] Collected and read ESLint, TypeScript, Tailwind, and theme files.
- [x] Examined component code using `MenuItem`, `ngSrc`, and images.
- [x] Compiled a prioritized list of problems with fixes and snippets.

High-level findings (prioritized)
1. ESLint/Type errors and `parserOptions.project` parsing error — high priority (can block linting/editor integration).
2. Tailwind usage and `light-dark()`/`theme()` functions in CSS file not processed by Tailwind — medium priority (visual regressions).
3. Theme/dark-mode management and separation of dark-mode variables — medium priority.
4. Image assets / `ngSrc` and logo not showing — medium priority.
5. Minor UI/UX and code-style suggestions: responsive layout, performance (lazy-loading and OnPush), MenuItem typing, and maintainability — low to medium priority.

Detailed issues and fixes

1) ESLint / @typescript-eslint / rule typing errors and "parserOptions.project" parsing error
- Symptoms seen in repo:
  - `eslint.config.mts` uses `parser: tsEslint.parser` and `parserOptions.project` referencing multiple tsconfig files.
  - Errors reported: "rules not assignable to type Partial<RulesConfig>" and "Parsing error: \"parserOptions.project\" has been provided for @typescript-eslint/parser."

- Root causes & notes:
  - `parserOptions.project` enables type-aware rules and requires the parser to be able to locate the referenced tsconfig(s). If ESLint/your editor can't find them (wrong working dir/tsconfig path or too many projects), you'll see the parsing error.
  - The type mismatch for rules appears when mixing rule shapes (some configs export numeric rule levels, others export full RuleConfig arrays) and the TypeScript types exposed from the packages don't line up with the Linter type used in `eslint.config.mts`.

- Recommended fixes (safe, low-risk):
  A) Fix the "parserOptions.project" parse error
  - Move the type-aware parserOptions into an override that only applies to TS source files, and ensure `tsconfigRootDir` points to the config file directory. Example (inside `eslint.config.mts` overrides block for TS files):

```js
languageOptions: {
  parser: tsEslint.parser,
  parserOptions: {
    project: ['./tsconfig.app.json'],
    tsconfigRootDir: new URL('.', import.meta.url).pathname || process.cwd(),
  }
}
```

  - Editor tip: VS Code ESLint extension runs in a workspace folder; make sure your editor's workspace root matches `tsconfigRootDir` or use absolute paths for `project`.
  - If the editor still throws parse errors for unrelated files (like templates or test fixtures), narrow `project` to only the app tsconfig or use `overrides` with `files: ['src/**/*.ts']` so ESLint won't try to perform type-aware parsing on non-project files.

  B) Silence or fix the "rules not assignable" type errors
  - Fast option: cast the spreaded configs to `as any` when merging, e.g. `... (tsEslint.configs.strictTypeChecked as any)` so TypeScript doesn't complain about strict mismatched types. This is low-risk and keeps the current rule set.
  - Better option: import `Linter` from `eslint` and type your extracted rules as `Linter.RulesRecord`. Ensure the plugin config objects you're spreading are the right shape.
  - Example safe change in `eslint.config.mts` (replace the existing spreads):

```ts
rules: {
  ...(tsEslint.configs.strictTypeChecked as unknown as Record<string, any>),
  ...(tsEslint.configs.stylisticTypeChecked as unknown as Record<string, any>),
  ...(angularEslint.configs.recommended as unknown as Record<string, any>).rules,
  // custom rules...
}
```

  - If you want stricter typing, centralize the merges in a helper function that returns `Linter.RulesRecord` and coerce there.

2) Tailwind CSS usage and unknown `light-dark()` / `theme()` functions in `src/theme-light-dark.css`
- Symptoms:
  - `src/theme-light-dark.css` contains declarations like `--info-icon-color: light-dark(theme('colors.blue.500'), theme('colors.blue.300'));` and `--global-background-color: light-dark(var(--p-surface-0), var(--p-surface-900));`
  - Error: `Unknown function 'light-dark'` when building or editing CSS.

- Root cause:
  - `light-dark()` and `theme()` are Tailwind directives/functions that only work when the CSS file is processed by Tailwind's PostCSS plugin. If your `theme-light-dark.css` is imported as a plain file that doesn't go through Tailwind, the raw CSS parser will treat `light-dark(...)` as an unknown function.

- Fixes:
  - Move the variable definitions into a file that Tailwind processes (for example, add them inside `src/styles.css` or create `src/tailwind-theme.css` and import it from `styles.css` before or after `@import 'tailwindcss'` depending on ordering).
  - Ensure PostCSS / Tailwind is configured to process that file. In Angular, verify `postcss.config.cjs` or the Angular build pipeline runs Tailwind on your global stylesheet.
  - Alternative (framework-agnostic): compute color values using CSS variables and set them in `:root`/`.dark` without `light-dark()` or `theme()` — i.e., use static color tokens or map Tailwind colors into CSS variables via a build step.

- Example solution: `src/styles.css` (processed by Tailwind) — move theme variables here inside an `@layer base { :root { ... } }` block and use `light-dark()` there.

3) `@screen xl2` vs `@screen 2xl` and dynamic font-size technique
- TL;DR: Tailwind's default breakpoint is `2xl`, not `xl2`. So `@screen 2xl` is correct. `@screen xl2` is incorrect.
- For dynamic font sizes using Tailwind, prefer to use responsive utility classes (text-xs, text-base, md:text-lg, lg:text-xl) or define a custom `fontSize` scale in `tailwind.config.*` then use `text-[size]` classes. Using `@apply` and `@screen` inside `@layer base` is acceptable for setting base html font-size, but moving these to a file processed by Tailwind is required (see item 2).

4) Tailwind config file format for Tailwind v4
- Tailwind v4 supports both ESM and CJS config formats. If your build complains about `tailwind.config.js`, prefer `tailwind.config.cjs` for CJS environments or `tailwind.config.mjs` / `.ts` for ESM depending on your toolchain. Ensure Node resolves the config format your toolchain expects. If your Angular build expects CJS, prefer `tailwind.config.cjs` with `module.exports = {}`.

5) Dark mode structure and placing dark-mode colors in a separate file
- Recommended approach:
  - Use CSS variables for color tokens and set them in `:root` (light) and `.dark` (dark) selectors.
  - Create two small files: `src/theme-light.css` and `src/theme-dark.css` that each set the variables. Import both in `styles.css` and toggle `document.documentElement.classList.toggle('dark')` at runtime, or use `[data-theme='dark']` on the root element.
  - Example runtime toggle:

```ts
// small helper
export function setDarkMode(enabled: boolean) {
  document.documentElement.classList.toggle('dark', enabled);
}
```

  - This is more robust than relying on `light-dark()` and keeps CSS parsing simple.

6) `MenuItem` augmentation — adding `data` or `key` fields
- `primeng/api` exports a `MenuItem` interface. You have two clean options:
  A) Create a local extended type:

```ts
import { MenuItem } from 'primeng/api';
export interface AppMenuItem extends MenuItem {
  key?: string;
  data?: any;
}
```

  Then type your component signals as `Signal<AppMenuItem[]>` and use the extra fields safely.

  B) Cast specific objects at assignment time: `myItem as MenuItem & { key?: string }` — quick but less explicit.

7) Images / `ngSrc` and logo not displaying
- Where the files live: repo has a `public/` folder with `images/mock/friendly-logo.png`. Angular historically uses `src/assets` or the Angular build `assets` entry in `angular.json`. Newer Angular versions can use `public/` but you must confirm `angular.json` has `projects.fix-mi-yard.architect.build.options.assets` include the `public` directory (see `projects.fix-mi-yard.architect.build.options.assets`), so the path `/images/mock/friendly-logo.png` served from root is correct _if_ the image exists under `public/images/mock/friendly-logo.png`. Use the browser network tab to confirm the file is requested and returns 200; a 404 indicates wrong path or missing asset.

- Fixes and checks:
  - Confirm the file exists: `public/images/mock/friendly-logo.png` (it does in this repo). Good.
  - Use absolute path `/images/mock/friendly-logo.png` when referencing from HTML (you're already doing that). When using `NgOptimizedImage` with `ngSrc`, ensure `NgOptimizedImage` is imported in the component (in standalone components import it). Example in `Footer` component: `imports: [NgOptimizedImage]` — your `Footer` includes it, so that part is correct.
  - If image doesn't show, verify width/height and styles (e.g., `display:none`, z-index) and check that `ngSrc` binding is valid. For static strings prefer `src` attribute (or `ngSrc` with static string is okay): `<img ngSrc="/images/mock/friendly-logo.png" alt="Company Logo" width="40" height="40" />`.
  - If using `fill` with `ngSrc` (a special attribute for the optimized image that uses absolute positioning), ensure the parent container has `position: relative` and a defined width/height.

8) Performance, accessibility, and maintainability recommendations (quick wins)
- Use OnPush change detection where appropriate (standalone components or `changeDetection: ChangeDetectionStrategy.OnPush` for components that accept inputs and benefit from fewer checks).
- Use `trackBy` in `*ngFor` / `@for` templates to avoid unnecessary re-renders of lists (your templates already use `track` in the motoko-style templates for some lists — ensure keys are stable).
- Lazy-load large third-party libraries where possible (e.g., PrimeNG modules for non-critical routes or components), and only import needed components (your code uses standalone-style imports which is good).
- Add `loading="lazy"` or use `NgOptimizedImage` which already does this for images.
- Accessibility: ensure images have `alt` text (you already do), ensure inputs have labels or `aria-label` (search input includes aria-label), and test with aXe or Lighthouse.

9) Code readability and structure
- Use typed signals for the `MenuItem` pattern (see recommendation #6). Prefer small helper functions to build the menu data rather than inline computed blocks for readability when they grow.
- Keep CSS that requires Tailwind processing inside files processed by Tailwind. Move `theme-light-dark.css` contents into `styles.css` or a Tailwind-processed file.
- Prefer smaller CSS files per component and import them (Angular's component-scoped styles are fine); ensure you avoid `::ng-deep` unless necessary.

10) Suggested small PRs (low risk)
- PR #1: Fix `eslint.config.mts` types (small cast to any) and narrow `parserOptions.project` to `tsconfig.app.json` or `src/**/*.ts` override.
- PR #2: Move Tailwind color variables into `src/styles.css` and remove `light-dark()` calls from unprocessed CSS files. Add `src/theme-dark.css` and `src/theme-light.css` and a small runtime toggle.
- PR #3: Create `types/app-menu-item.ts` with `AppMenuItem` interface and update navigation and footer to use it.
- PR #4: Add `trackBy` functions to list templates and consider `OnPush` where appropriate.

Quality gates (quick checklist before merging):
- [ ] Run `npm run lint` and fix remaining relevant lint errors.
- [ ] Run `ng build` (`--configuration development`) to ensure Tailwind/PostCSS runs and CSS functions are processed.
- [ ] Run unit tests (`npm test`) and ensure snapshots are valid.
- [ ] Manual smoke test: open the app, verify header/footer/logo, background images, and dark-mode toggle work.

Requirements coverage
- ESLint/TS parser error: Done (diagnosed + recommended fixes)
- Tailwind `light-dark` processing: Done (diagnosed + move-to-Tailwind fix recommended)
- MenuItem augmentation: Done (types and examples provided)

If you'd like, I can:
- Apply the low-risk edits (1-2) automatically: update `eslint.config.mts` to cast plugin configs to any and narrow parserOptions.project; move theme variables into `styles.css` and create `src/theme-dark.css`/`src/theme-light.css` with plain CSS variables; or
- Create the `AppMenuItem` type and update the `navigation-menu` and `footer` components to use it.

Tell me which of the above you'd like me to implement now (I recommend starting with the ESLint and theme fixes).
