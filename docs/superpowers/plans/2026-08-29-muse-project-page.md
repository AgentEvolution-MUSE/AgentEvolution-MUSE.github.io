# MUSE Project Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete private-development version of the English MUSE research project page as a responsive, accessible Astro static site.

**Architecture:** A single Astro page composes focused section components through a shared layout and one typed metadata source. Native Astro, CSS, and small progressive-enhancement scripts provide the UI; no client framework or heavy component library is introduced.

**Tech Stack:** Astro 7, TypeScript, native CSS, native JavaScript, Node test runner, locally bundled Fontsource variable fonts.

**Spec:** `docs/specs/2026-08-29-muse-project-page-design.md`

## Global Constraints

- All public page content is English.
- Keep the repository private and do not add GitHub Pages deployment yet.
- Use no React, Tailwind, CMS, analytics, server-side rendering, or video section.
- Do not publish fabricated result values, temporary paper URLs, temporary code URLs, or draft BibTeX.
- Paper, Code, Documentation, BibTeX, and Results remain explicitly marked as coming soon.
- Use Source Serif 4 for display typography and Inter for body/interface typography, bundled at build time.
- Use full-width editorial bands, stable grids, and spectrum-derived accents; avoid decorative card nesting.
- Respect keyboard navigation and `prefers-reduced-motion`.
- Preserve the original figure files and copy them without lossy editing.

## File Map

**Create**

- `src/data/site.ts` - typed project metadata, navigation, authors, affiliations, resources, mechanisms, and lifecycle stages
- `src/layouts/BaseLayout.astro` - document shell, SEO metadata, fonts, skip link, and global style import
- `src/styles/global.css` - design tokens, typography, layout primitives, focus states, responsive rules, and reduced motion
- `src/components/SiteHeader.astro` - sticky desktop navigation and accessible mobile menu
- `src/components/Hero.astro` - brand, paper metadata, authors, affiliations, resource controls, and hero figure
- `src/components/Abstract.astro` - concise project abstract
- `src/components/EvolutionSpectrum.astro` - spectrum interpretation and figure caption
- `src/components/StageComparison.astro` - Stage-3 limitation to MUSE mechanism comparison
- `src/components/CoreMechanisms.astro` - three mechanism summaries
- `src/components/Architecture.astro` - architecture figure and two-level explanation
- `src/components/EvolutionLifecycle.astro` - responsive five-stage lifecycle track
- `src/components/ResultsPlaceholder.astro` - truthful unpublished-results state
- `src/components/Resources.astro` - data-driven resource list and statuses
- `src/components/Citation.astro` - pending citation state and future copy-button contract
- `src/components/SiteFooter.astro` - organization and project footer
- `tests/site-data.test.mjs` - metadata and resource-state contracts
- `tests/built-page.test.mjs` - production HTML structure, metadata, and accessibility contracts

**Modify**

- `src/pages/index.astro` - replace the starter page with section composition
- `package.json` - add Fontsource dependencies and build/test/check scripts
- `README.md` - replace Astro starter text with private local-development instructions

**Copy**

- `E:/NUS_Project/MEAL/docs/imgs/evolution_spectrum.png` -> `public/images/evolution-spectrum.png`
- `E:/NUS_Project/MEAL/docs/imgs/overview.png` -> `public/images/architecture.png`

---

### Task 1: Establish typed content data and asset foundations

**Files:**
- Create: `src/data/site.ts`
- Create: `tests/site-data.test.mjs`
- Create: `public/images/evolution-spectrum.png`
- Create: `public/images/architecture.png`
- Modify: `package.json`

**Interfaces:**
- Produces: `site`, `navigation`, `authors`, `affiliations`, `resources`, `stageComparisons`, `mechanisms`, and `lifecycleStages` exports from `src/data/site.ts`.
- Resource shape: `{ label: string; status: 'coming-soon' | 'available'; href?: string }`.
- Author shape: `{ name: string; affiliationIds: number[]; corresponding?: boolean; href?: string }`.

- [ ] **Step 1: Add a failing metadata contract test**

Create `tests/site-data.test.mjs` using Node's built-in test runner:

```js
import assert from 'node:assert/strict';
import test from 'node:test';

import {
  affiliations,
  authors,
  lifecycleStages,
  mechanisms,
  resources,
  site,
  stageComparisons,
} from '../src/data/site.ts';

test('publishes the finalized paper metadata', () => {
  assert.equal(site.name, 'MUSE');
  assert.equal(site.paperTitle, 'Metacognitive Unison Self-Evolution');
  assert.equal(authors.length, 12);
  assert.equal(affiliations.length, 4);
  assert.deepEqual(
    authors.filter((author) => author.corresponding).map((author) => author.name),
    ['Zhuosheng Zhang', 'Gongshen Liu', 'Shengqiong Wu'],
  );
});

test('keeps unpublished resources non-navigable', () => {
  assert.ok(resources.length >= 4);
  for (const resource of resources) {
    assert.equal(resource.status, 'coming-soon');
    assert.equal(resource.href, undefined);
  }
});

test('defines the complete method narrative', () => {
  assert.equal(stageComparisons.length, 3);
  assert.equal(mechanisms.length, 3);
  assert.deepEqual(lifecycleStages, [
    'Monitor',
    'Diagnose',
    'Generate',
    'Coordinate',
    'Evaluate',
  ]);
});
```

- [ ] **Step 2: Run the test and verify the missing module failure**

Run:

```bash
node --test tests/site-data.test.mjs
```

Expected: FAIL because `src/data/site.ts` does not exist.

- [ ] **Step 3: Implement the typed site data**

Create `src/data/site.ts` with explicit exported types and the finalized title, 12 authors, four affiliations, corresponding-author flags, three limitation/mechanism pairs, three mechanism summaries, five lifecycle stages, navigation anchors, and coming-soon resource records. Use exact wording from the approved design and latest paper; omit author profile URLs when no verified URL is available.

- [ ] **Step 4: Add local fonts and test scripts**

Install:

```bash
npm install @fontsource-variable/inter @fontsource-variable/source-serif-4
```

Update `package.json` scripts to include:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "check": "astro check",
    "test": "npm run build && node --test tests/*.test.mjs",
    "preview": "astro preview",
    "astro": "astro"
  }
}
```

Install Astro checking support when prompted by `astro check`, or explicitly run:

```bash
npm install --save-dev @astrojs/check typescript
```

- [ ] **Step 5: Copy the two approved figures**

Copy the source images byte-for-byte into `public/images/` and verify their hashes match the originals with `Get-FileHash` on Windows.

- [ ] **Step 6: Run the metadata tests**

Run:

```bash
node --test tests/site-data.test.mjs
```

Expected: 3 tests PASS.

- [ ] **Step 7: Commit the data and asset foundation**

```bash
git add package.json package-lock.json src/data/site.ts tests/site-data.test.mjs public/images
git commit -m "feat: add MUSE site data and visual assets"
```

---

### Task 2: Build the global layout, visual system, and navigation

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/styles/global.css`
- Create: `src/components/SiteHeader.astro`
- Modify: `src/pages/index.astro`
- Create: `tests/built-page.test.mjs`

**Interfaces:**
- Consumes: `site` and `navigation` from `src/data/site.ts`.
- Produces: the page shell with `#main-content`, sticky header, desktop anchors, mobile menu button, and canonical metadata.

- [ ] **Step 1: Add failing production-page shell tests**

Create `tests/built-page.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

test('builds the MUSE document metadata', () => {
  assert.match(html, /<title>MUSE \| Metacognitive Unison Self-Evolution<\/title>/);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  assert.match(html, /<meta property="og:title" content="Metacognitive Unison Self-Evolution"/);
});

test('provides basic navigation landmarks', () => {
  assert.match(html, /href="#main-content"/);
  assert.match(html, /<header[^>]*data-site-header/);
  assert.match(html, /<main[^>]*id="main-content"/);
  assert.match(html, /aria-label="Primary navigation"/);
});
```

- [ ] **Step 2: Build and verify the shell tests fail**

Run:

```bash
npm run build
node --test tests/built-page.test.mjs
```

Expected: FAIL because the starter page lacks MUSE metadata and landmarks.

- [ ] **Step 3: Implement `BaseLayout.astro`**

Import both Fontsource variable font CSS files and `global.css`. Add the HTML language, viewport, title, description, Open Graph metadata, theme color, favicon links, skip link, and `<slot />`. Do not set a public `site` URL while deployment is intentionally disabled.

- [ ] **Step 4: Implement the editorial CSS foundation**

Define CSS custom properties for paper, ink, muted text, rules, five spectrum accents, content width, narrow text width, header height, and focus ring. Add reset rules, zero letter spacing, heading/body typography, full-width section bands, `.container`, `.prose`, `.eyebrow`, `.section-heading`, accessible focus styles, and reduced-motion behavior.

- [ ] **Step 5: Implement `SiteHeader.astro`**

Render the MUSE brand anchor, navigation from `navigation`, and a symbol-only mobile menu button with an accessible label and tooltip. Use a small inline script to toggle `aria-expanded`, close after selecting an anchor, and close on Escape. Keep all links functional without JavaScript.

- [ ] **Step 6: Compose the temporary shell in `index.astro`**

Render `BaseLayout`, `SiteHeader`, and an empty `<main id="main-content">` ready for subsequent sections.

- [ ] **Step 7: Run checks**

Run:

```bash
npm run check
npm run build
node --test tests/built-page.test.mjs
```

Expected: all commands PASS.

- [ ] **Step 8: Commit the shell**

```bash
git add src/layouts src/styles src/components/SiteHeader.astro src/pages/index.astro tests/built-page.test.mjs package.json package-lock.json
git commit -m "feat: add MUSE page shell and navigation"
```

---

### Task 3: Implement the hero, abstract, and evolution-spectrum narrative

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/Abstract.astro`
- Create: `src/components/EvolutionSpectrum.astro`
- Create: `src/components/StageComparison.astro`
- Modify: `src/pages/index.astro`
- Modify: `tests/built-page.test.mjs`

**Interfaces:**
- Consumes: `site`, `authors`, `affiliations`, `resources`, and `stageComparisons`.
- Produces section anchors: `#overview` and `#spectrum`.

- [ ] **Step 1: Add failing content-contract tests**

Append tests that assert the built page contains `MUSE`, the formal paper title, all four affiliation names, `Abstract`, `Why Evolution 3.0 Falls Short`, `evolution-spectrum.png`, and exactly three `data-stage-comparison` rows.

- [ ] **Step 2: Build and verify the new tests fail**

Run `npm run test` and expect the new section assertions to fail.

- [ ] **Step 3: Implement `Hero.astro`**

Render the brand, formal title, linked-or-plain authors, superscript affiliation IDs, corresponding-author marker, affiliation legend, concise positioning statement, and coming-soon resource controls. Use non-link buttons or status elements for unavailable resources so no empty navigation occurs. Integrate the spectrum image into the hero band with responsive desktop overlay and mobile stacking.

- [ ] **Step 4: Implement the concise abstract**

Write 120-160 words derived from the paper: deployed agents remain fixed, existing evolution is uneven across three dimensions, MUSE is a Stage-4 prototype, and its three mechanisms are Metacognitive Evolutionary Gating, Interaction-Grounded Self-Supervision, and Holistic Unison Evolution. Avoid unsupported performance claims.

- [ ] **Step 5: Implement the spectrum interpretation and comparison**

`EvolutionSpectrum.astro` introduces the five-stage spectrum and emphasizes the Stage-3 to Stage-4 transition. `StageComparison.astro` renders three labeled rows with the paper-aligned limitation and MUSE response text, using responsive semantic markup rather than a wide HTML table that breaks on mobile.

- [ ] **Step 6: Compose the sections and run verification**

Run:

```bash
npm run check
npm run test
```

Expected: all tests PASS.

- [ ] **Step 7: Commit the opening narrative**

```bash
git add src/components/Hero.astro src/components/Abstract.astro src/components/EvolutionSpectrum.astro src/components/StageComparison.astro src/pages/index.astro tests/built-page.test.mjs
git commit -m "feat: add MUSE hero and evolution spectrum narrative"
```

---

### Task 4: Implement the method, architecture, and evolution lifecycle

**Files:**
- Create: `src/components/CoreMechanisms.astro`
- Create: `src/components/Architecture.astro`
- Create: `src/components/EvolutionLifecycle.astro`
- Modify: `src/pages/index.astro`
- Modify: `tests/built-page.test.mjs`

**Interfaces:**
- Consumes: `mechanisms` and `lifecycleStages`.
- Produces section anchors: `#method` and `#architecture`.

- [ ] **Step 1: Add failing method-structure tests**

Append assertions for all three mechanism titles, `architecture.png`, both architecture-level headings, five lifecycle labels, exactly three `data-mechanism` items, and five `data-lifecycle-stage` items.

- [ ] **Step 2: Run `npm run test` and verify failure**

Expected: FAIL because method components are not yet rendered.

- [ ] **Step 3: Implement `CoreMechanisms.astro`**

Render the three mechanisms as equal, stable grid tracks with distinct thin accent rules. Keep descriptions concise and avoid cards inside a containing card.

- [ ] **Step 4: Implement `Architecture.astro`**

Render the full-resolution architecture figure with explicit dimensions, responsive containment, click-to-open behavior, alt text, and a figure caption. Below it, render unframed explanations of Inner-Component Refinement and Inter-Component Synchronization.

- [ ] **Step 5: Implement `EvolutionLifecycle.astro`**

Render Monitor, Diagnose, Generate, Coordinate, and Evaluate as an ordered list. Use CSS pseudo-elements for the connecting track; switch to a vertical track below the mobile breakpoint. Do not require JavaScript for comprehension.

- [ ] **Step 6: Compose and verify**

Run:

```bash
npm run check
npm run test
```

Expected: all tests PASS.

- [ ] **Step 7: Commit the method sections**

```bash
git add src/components/CoreMechanisms.astro src/components/Architecture.astro src/components/EvolutionLifecycle.astro src/pages/index.astro tests/built-page.test.mjs
git commit -m "feat: add MUSE method and architecture sections"
```

---

### Task 5: Complete results, resources, citation, footer, and README

**Files:**
- Create: `src/components/ResultsPlaceholder.astro`
- Create: `src/components/Resources.astro`
- Create: `src/components/Citation.astro`
- Create: `src/components/SiteFooter.astro`
- Modify: `src/pages/index.astro`
- Modify: `tests/built-page.test.mjs`
- Modify: `README.md`

**Interfaces:**
- Consumes: `resources` and `site`.
- Produces section anchors: `#results` and `#resources`, plus the page footer.

- [ ] **Step 1: Add failing publication-state tests**

Append tests asserting `Results Coming Soon`, all resource labels, no `href=""`, no current code-development URL, a disabled or status-marked citation control, and a `<footer>` landmark.

- [ ] **Step 2: Run `npm run test` and verify failure**

Expected: FAIL because closing sections are absent.

- [ ] **Step 3: Implement the results and resource states**

Render a restrained results band explaining that quantitative results will be released with the paper. Render resources from data; available resources become anchors while coming-soon resources remain non-navigable status controls with consistent labels.

- [ ] **Step 4: Implement citation and footer**

Keep the future copy-button structure but do not place draft BibTeX in the page. Render the organization name, project name, and a neutral publication-pending copyright line.

- [ ] **Step 5: Replace the starter README**

Document local commands (`npm install`, `npm run dev`, `npm run check`, `npm run test`, `npm run build`), source layout, asset provenance, private-development status, and the deferred publication checklist. Do not include public deployment instructions as if already active.

- [ ] **Step 6: Run checks**

Run:

```bash
npm run check
npm run test
```

Expected: all tests PASS.

- [ ] **Step 7: Commit the complete content surface**

```bash
git add src/components/ResultsPlaceholder.astro src/components/Resources.astro src/components/Citation.astro src/components/SiteFooter.astro src/pages/index.astro tests/built-page.test.mjs README.md
git commit -m "feat: complete MUSE project page content"
```

---

### Task 6: Perform responsive, visual, and accessibility verification

**Files:**
- Modify as needed: `src/styles/global.css`
- Modify as needed: affected `src/components/*.astro`
- Modify as needed: `tests/built-page.test.mjs`

**Interfaces:**
- Consumes: the complete page.
- Produces: a release-ready private-development build with documented visual verification.

- [ ] **Step 1: Run the full automated verification**

```bash
npm run check
npm run test
git diff --check
```

Expected: all commands PASS and no whitespace errors.

- [ ] **Step 2: Start the local server**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Astro serves the site at `http://127.0.0.1:4321/`.

- [ ] **Step 3: Capture and inspect desktop and mobile screenshots**

Inspect at minimum:

- 1440 x 1000 desktop
- 1024 x 768 laptop/tablet landscape
- 390 x 844 mobile

Verify that the hero reveals the next section, author text wraps cleanly, figures are nonblank and uncropped, comparison rows remain readable, lifecycle labels do not overlap, and no horizontal page overflow exists.

- [ ] **Step 4: Verify interactions and accessibility manually**

Check keyboard focus order, skip link, mobile menu Escape behavior, anchor navigation, enlarged figures, Coming Soon controls, focus visibility, and reduced-motion behavior. Confirm no console errors.

- [ ] **Step 5: Fix only observed defects and repeat verification**

For each observed issue, make the smallest scoped CSS or markup correction, rerun `npm run check` and `npm run test`, and recapture the affected viewport.

- [ ] **Step 6: Commit final polish**

```bash
git add src tests README.md
git commit -m "fix: polish responsive MUSE project page"
```

## Completion Criteria

- The full approved information architecture is present.
- All public text is English and paper-aligned.
- Unpublished materials are truthfully marked coming soon.
- Both approved figures render sharply.
- Automated checks pass.
- Desktop, laptop, and mobile screenshots are visually clean.
- The repository remains private and contains no deployment workflow.
