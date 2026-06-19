# App Folder Audit — src/app

Date: 2026-06-19

This file contains focused, actionable recommendations for the `src/app` folder: homepage (hero/background), `how-it-works`, `services`, and general component-level improvements (performance, change detection, images, accessibility, and maintainability). For each area I provide the problem, why it matters, and concrete fixes + examples you can apply.

Checklist (what I'll cover)
- [x] Homepage hero/background performance & UX improvements
- [x] `how-it-works` page: content structure, images, and accessibility
- [x] `services` page: search, results performance, and UX
- [x] Component-level recommendations: OnPush, trackBy, signals, lazy imports
- [x] Image and asset optimizations (NgOptimizedImage, preload, formats)
- [x] Prioritized small PR list and quality gates

1) Homepage hero / background — make it load and feel faster

Problem
- Current hero uses a CSS background-image (`background-image: url('/images/mock/carpenter.jpg')`) in component-scoped SCSS. Background images are not optimized by `ngSrc` / `NgOptimizedImage`, harder to preload, and the browser will load the full-resolution image immediately.

Why it matters
- Large hero images increase initial load time, cause layout shift if sizes not reserved, and are not optimized by Angular's image strategies.

Recommendations (priority: high -> low)
A) Replace CSS background-image with an <img> using `NgOptimizedImage` and `fill` inside a positioned parent. This enables responsive optimization, formats, and priority preloading.
- Benefits: automatic srcset generation, modern formats, priority attribute, lazy or eager loading, and built-in optimization.

Example (component template change)

<div class="relative w-full h-[70vh]">
  <img ngSrc="/images/mock/carpenter.jpg" alt="Hero" fill class="object-cover" priority />
  <div class="absolute inset-0 bg-black/30"></div> <!-- overlay -->
  <div class="relative z-10 flex justify-center items-center h-full">
    <!-- search card centered -->
    <p-card class="w-[70vw] md:w-[40vw]">
      <app-search-criteria [(value)]="selection"></app-search-criteria>
    </p-card>
  </div>
</div>

Notes:
- `priority` ensures the browser fetches it early (use for first-view hero image only).
- `fill` requires the parent to be `position: relative` and to have a defined height (e.g., `h-[70vh]`).
- This approach avoids CSS background-image drawbacks and plays well with Angular image optimizations.

B) Add a low-quality image placeholder (LQIP) or blurred tiny image as background while the full image loads.
- Serve a small blurred base64 or low-res WebP inline through CSS or the `src` attribute as a first image, then swap to the optimized one.
- Simpler: use CSS gradient overlay and `background-color` or `background-image` with `image-set()` for different densities.

C) Preload the hero image (if you keep it as background):
- In `index.html` add: `<link rel="preload" as="image" href="/images/mock/carpenter.jpg">` — move the response sooner in the network waterfall.
- If you switch to `NgOptimizedImage`, the `priority` attribute handles preload behavior.

D) Use appropriately sized images (responsive):
- Generate several widths (e.g., 480, 768, 1024, 1600) and let `NgOptimizedImage` or the `picture` element serve the right size. Avoid serving a 3–4MB image to mobile devices.

2) `how-it-works` page improvements

Problem
- Current markup repeats a lot of heavy images and uses `fill` for images without clearly reserving the image container size (you do use `min-h-96`, which is good). The page renders multiple large images; on mobile this hurts performance.

Recommendations
A) Use `NgOptimizedImage` (already imported) with `priority` only for the first visible image; lazy-load the rest.
- Example: `ngSrc` with `[priority]="index === 0"` or compute priority in template.

B) Convert small decorative icons to inline SVG or icon fonts instead of images to reduce requests and make them themeable.

C) Use a two-column layout on desktop and stack on mobile (you already use Tailwind `lg:flex-row`). Keep images smaller on mobile via responsive classes (e.g., `lg:min-w-1/2` but `w-full` on mobile).

D) Avoid repeating the same large image for many sections; consider re-using a smaller thumbnail for list items and linking to a detailed view with the full image.

E) Accessibility: ensure each `img` has an appropriate `alt`, and headings follow a logical hierarchy (H1 on the page, then H2/H3 for sections).

3) `services` page improvements (search + results)

Problem
- The search card sits on a hero image; `app-services-result` likely renders many result items. If the search triggers heavy computations or full reloads on every keystroke, it's a performance issue.

Recommendations
A) Debounce search input (client-side) and only run queries after the user stops typing (e.g., 300ms). If using `ngModel`, use RxJS or a small debounce utility.

B) Use server-side pagination or incremental loading for results (infinite scroll or 'Load more'). Avoid rendering hundreds of items at once; use virtual scroll if necessary.

C) Use skeleton loaders: show lightweight placeholders while results fetch.

D) Only import heavy UI libraries in the route module or lazy-load the results component — don't create large bundles for initial load.

E) If `app-services-result` makes HTTP calls on init, ensure the component unsubscribes and uses `async` pipe where possible.

4) Component-level best practices

A) Use `ChangeDetectionStrategy.OnPush` for components that rely on inputs or Signals — this reduces change detection cost. For Angular signals, OnPush is still useful.

Example:

@Component({
  // ...existing code...
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent { ... }

B) Use `trackBy` for lists (ngFor) to avoid re-creating DOM nodes unnecessarily. Example:

public trackById(index: number, item: any) { return item?.id ?? index; }

Template: `*ngFor="let item of items; trackBy: trackById"`

Your templates appear to already use `track` in the motoko-style repeats—ensure the key is stable and unique.

C) Avoid heavy synchronous logic inside `computed()` or getters — do only minimal work; memoize or move logic to initialization where appropriate.

D) Prefer standalone components and import only the PrimeNG components you need (you already do this style in many components).

E) Use `NgOptimizedImage` everywhere for images; make sure you pass width/height when possible and `priority` only for hero/above-the-fold images.

5) Image & asset optimization checklist

- Convert hero and major images to WebP/AVIF where possible and provide fallbacks.
- Compress images and ensure correct dimensions for typical breakpoints.
- Use `NgOptimizedImage` with `ngSrc`, `fill`, `priority`, and let Angular generate responsive sources.
- Preload critical images (hero) using `<link rel="preload" as="image" href="...">` or the `priority` attribute.
- Use `loading="lazy"` or lazy `NgOptimizedImage` for non-critical images.
- For p-carousel, limit `numVisible` and reduce image resolution for carousel items. Consider lazy-loading carousel images and pausing autoplay on mobile.

6) Accessibility quick checks

- Ensure all interactive elements have keyboard focus styles and logical tab order.
- Form inputs have associated labels or `aria-label` (your search input has aria-label — good).
- Ensure color contrast for text overlays on images (overlay with a dark or light gradient helps readability).

7) Design suggestions for a better homepage

- Center the search card vertically in the hero and use a soft gradient overlay for text contrast.
- Use a slightly smaller hero height on mobile (e.g., `h-[50vh]` on sm screens) to reduce the critical image area.
- Consider showing popular categories or quick actions below the search card to help users act faster.
- Reduce the number of large scrollable carousels — prioritize content and keep the fold clean.

8) Prioritized tasks (small PRs)
- PR A (high impact, small effort): Replace CSS background hero with `NgOptimizedImage` `fill` + overlay + centered search card. Add `priority` attribute.
- PR B: Debounce search input and add skeleton loaders to `app-services-result`.
- PR C: Add `ChangeDetectionStrategy.OnPush` to stateless components and a `trackBy` helper for lists.
- PR D: Optimize carousel images and lazy-load their images.
- PR E: Move theme-related Tailwind CSS into Tailwind-processed file (see main audit); ensure dark variables are in `:root`/`.dark` files.

9) Quality gates & testing
- Run Lighthouse (desktop and mobile) and measure TTFB, Largest Contentful Paint (LCP), and First Input Delay (FID). Hero image optimization should reduce LCP.
- Run `ng build` and smoke test hero, carousel, services search, and how-it-works content.
- Run accessibility checks (axe or Lighthouse) to ensure contrasts and semantics are OK.

If you'd like, I can implement PR A now (replace homepage hero background with `NgOptimizedImage` `fill` structure, add `priority`, and update SCSS) — this is a single, high-value change. If you prefer a different PR, tell me which one and I will apply it and run the build/lint checks afterwards.
