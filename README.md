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

public/images/    Approved paper figures
tests/            Metadata and built-page contracts
```

## Assets

- `public/images/evolution-spectrum.png` is the paper's five-stage evolutionary spectrum.
- `public/images/architecture.png` is the MUSE system architecture.

Both files are copied from the paper repository without visual modification.

## Publication checklist

Before making the site public:

1. Replace all `Coming Soon` states with verified paper, code, documentation, and BibTeX resources.
2. Add final experimental results and only claims supported by the released paper.
3. Set Astro's production `site` URL.
4. Add and verify the GitHub Pages deployment workflow.
5. Change repository visibility only when the release is approved.
