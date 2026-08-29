# MUSE Project Page Design

## Objective

Build the official English-language project page for MUSE (Metacognitive Unison Self-Evolution) as a static Astro site hosted at `https://agentevolution-muse.github.io/` after publication. During development, the repository remains private and deployment stays disabled.

The page should read as a polished research publication rather than a product landing page. It must explain why Stage-3 agent evolution is insufficient, how MUSE advances toward Stage 4, and how the framework operates, while keeping unpublished paper, code, citation, and result resources explicitly marked as coming soon.

## Audience

- Researchers working on language-model agents and agent evolution
- Readers of the MUSE paper
- Engineers evaluating or extending the future open-source system

## Content Language

All public page content is English. Source comments and internal identifiers remain concise and technical.

## Information Architecture

The site is a single-page experience with sticky anchor navigation:

1. Hero
2. Abstract
3. Evolution Spectrum
4. Why Evolution 3.0 Falls Short
5. Three Core MUSE Mechanisms
6. System Architecture
7. Evolution in Action
8. Experimental Results
9. Resources and Citation
10. Footer

The navigation exposes `MUSE`, `Spectrum`, `Method`, `Architecture`, `Results`, and `Resources`. Mobile navigation collapses into an accessible menu.

## Hero

The first viewport establishes the project identity and academic metadata:

- Brand: `MUSE`
- Paper title: `Metacognitive Unison Self-Evolution`
- Authors in the paper's finalized order
- Affiliations: Shanghai Jiao Tong University, National University of Singapore, University of Oxford, and Shenzhen University
- A concise Stage-4 prototype positioning statement
- Visible `Paper`, `Code`, and `BibTeX` controls marked `Coming Soon`

The Evolution Spectrum figure is integrated as the hero's full-width visual rather than placed inside a decorative card. Its existing whitespace supports the overlaid title on desktop. On narrow screens, the title and figure remain within the same hero band but stack to preserve legibility and prevent cropping.

## Research Narrative

### Abstract

Present a concise 120-160 word project abstract derived from the paper. It should communicate the fixed-after-deployment problem, the five-stage spectrum, and MUSE's three mechanisms without reproducing the full paper abstract.

### Evolution Spectrum

Explain the five-stage spectrum through evolutionary autonomy, supervision autonomy, and optimization scope. The page emphasizes the transition from Evolution 3.0 to Evolution 4.0 rather than exhaustively restating every cell in the figure.

### Stage-3 Limitations

Use a restrained three-row comparison between each limitation and its MUSE response:

- Evolutionary Autonomy -> Metacognitive Evolutionary Gating
- Supervision Autonomy -> Interaction-Grounded Self-Supervision
- Optimization Scope -> Holistic Unison Evolution

The wording follows the latest paper. The comparison remains scannable on desktop and becomes stacked labeled rows on mobile.

### Core Mechanisms

Present the three mechanisms in a full-width three-column layout with thin spectrum-colored rules, not nested cards. Each mechanism receives one compact explanatory paragraph.

### Architecture

Display the architecture figure at the largest practical width and provide a consistent figure caption. Explain only the two organizing levels needed to interpret it:

- Inner-Component Refinement
- Inter-Component Synchronization

### Evolution in Action

Replace README-style text arrows with a responsive lifecycle track:

`Monitor -> Diagnose -> Generate -> Coordinate -> Evaluate`

The track is horizontal on desktop and vertical on mobile. Motion is subtle and disabled when reduced motion is requested.

### Results

Create the final visual section structure but show `Results Coming Soon`. Do not include invented metrics, temporary tables, or draft claims. The component can later be replaced without changing surrounding sections.

### Resources and Citation

Keep Paper, Code, Documentation, and BibTeX resources data-driven. Unavailable resources use an explicit `coming-soon` state and never navigate to temporary URLs. The future citation block includes a copy interaction; while unavailable it displays a concise publication-pending message.

## Visual Direction

Use a research-editorial visual system with spectrum-derived accents:

- White and very light cool-gray full-width bands
- Near-black body text
- Blue, green, yellow, orange, and coral accents derived from the five evolution stages
- Orange reserved for Evolution 4.0, MUSE, and primary emphasis
- Source Serif 4 for display typography
- Inter for body text and interface labels

Fonts are bundled at build time rather than fetched from a third-party font server at runtime.

The content width is approximately 1180 pixels. Cards are avoided except where an actual bounded object requires one. Repeated sections use unframed layouts, thin rules, stable grid tracks, and responsive constraints. Letter spacing remains zero.

## Interaction Design

- Sticky anchor navigation with active-section feedback
- Accessible mobile menu
- Smooth scrolling, disabled under `prefers-reduced-motion`
- Clickable full-resolution figures
- Future one-click BibTeX copy
- Keyboard-visible focus styles
- No disabled control should navigate or silently fail

Only small, progressive-enhancement scripts are used. React, Tailwind, and heavy UI libraries are out of scope.

## Component Architecture

```text
src/
|-- components/
|   |-- SiteHeader.astro
|   |-- Hero.astro
|   |-- Abstract.astro
|   |-- EvolutionSpectrum.astro
|   |-- StageComparison.astro
|   |-- CoreMechanisms.astro
|   |-- Architecture.astro
|   |-- EvolutionLifecycle.astro
|   |-- ResultsPlaceholder.astro
|   |-- Resources.astro
|   |-- Citation.astro
|   `-- SiteFooter.astro
|-- data/
|   `-- site.ts
|-- layouts/
|   `-- BaseLayout.astro
|-- pages/
|   `-- index.astro
`-- styles/
    `-- global.css

public/
`-- images/
    |-- evolution-spectrum.png
    `-- architecture.png
```

`site.ts` owns the project metadata, author and affiliation mappings, navigation, resource states, and future URLs. `BaseLayout.astro` owns SEO metadata, Open Graph metadata, favicons, and the document shell. `index.astro` only composes the page sections.

## Assets

Use the finalized existing figures:

- `E:/NUS_Project/MEAL/docs/imgs/evolution_spectrum.png`
- `E:/NUS_Project/MEAL/docs/imgs/overview.png`

Copy them into the website repository using stable public filenames. Preserve the source files and do not apply lossy edits.

## Deployment

Development remains local while the repository is private. GitHub Pages configuration and the deployment workflow are intentionally deferred. Before publication:

1. Change the repository visibility to public.
2. Configure Astro's `site` as `https://agentevolution-muse.github.io/` with no `base` path.
3. Add the official Astro GitHub Pages workflow.
4. Select GitHub Actions as the Pages source.
5. Verify the public production URL.

## Verification

The implementation is complete only after:

- `npm run build` succeeds
- All anchors and resource states behave correctly
- Coming Soon controls do not navigate
- Desktop and mobile screenshots show no overlap, clipping, or blank figures
- Both figures remain readable and retain their intended aspect ratios
- Keyboard navigation and focus indicators work
- Reduced-motion behavior is respected
- Metadata, title, description, and social preview values are present
- The final page is checked at desktop, laptop, and mobile viewport widths

## Explicit Non-Goals

- No video section in the first release
- No multilingual site
- No CMS
- No server-side rendering
- No analytics before publication
- No fabricated experimental results
- No public deployment while the repository remains private
