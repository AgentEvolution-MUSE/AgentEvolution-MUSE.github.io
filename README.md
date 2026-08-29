# MUSE Project Page

Private development repository for the official project page of **MUSE: Metacognitive Unison Self-Evolution**.

The site is built with Astro as a static, single-page research publication. It is intentionally not deployed while the paper and code are still under development.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:4321/`.

## Verification

```bash
npm run check
npm run test
npm run build
```

## Structure

```text
src/
|-- components/   Page sections and navigation
|-- data/         Typed paper metadata and resource states
|-- layouts/      Document shell and SEO metadata
|-- pages/        Route composition
`-- styles/       Global editorial design system

public/assets/images/
|-- figures/      Approved paper and framework figures
|-- results/      Experimental plots and result visualizations
`-- branding/     Logos and institutional marks
tests/            Metadata and built-page contracts
```

## Assets

- `public/assets/images/figures/evolution-spectrum.png` is the paper's five-stage evolutionary spectrum.
- `public/assets/images/figures/architecture.png` is the MUSE system architecture.
- `public/assets/images/results/` is reserved for experimental plots and result visualizations.
- `public/assets/images/branding/` is reserved for logos and institutional marks.

Both files are copied from the paper repository without visual modification.

## Publication checklist

Before making the site public:

1. Replace all `Coming Soon` states with verified paper, code, documentation, and BibTeX resources.
2. Add final experimental results and only claims supported by the released paper.
3. Set Astro's production `site` URL.
4. Add and verify the GitHub Pages deployment workflow.
5. Change repository visibility only when the release is approved.
