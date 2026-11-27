# Native experiment charts

Six published experiment charts are rendered as native SVG and HTML in `ExperimentChart.astro`. These replace the corresponding image elements, without changing the original assets. Quantitative plots do not require cropped raster icons. Controls use Lucide SVG icons.

## Source and precision

`extract-experiment-charts.py` reads the vector drawings in the six PDFs recorded in `experiment-charts-provenance.json`. Reproduce with:

```
PYTHONPATH=/tmp/muse-pdf-libs python3 scripts/extract-experiment-charts.py /path/to/MUSE_Arxiv
```

- Coverage and composition: invert bar geometry against labelled axes, then recover integer counts using the published sample sizes (90 oracle, 168 test, 36 synthetic). Each recovered count must be within 0.005 of an integer. Percentages are computed from these counts, displayed to one decimal.
- Pool: invert stacked bar heights; cross-check cumulative admissions 3, 9, 13, 17, 24, 28, 30, 36 and final active count 26.
- Gating: invert rollout bars to integer counts; verify totals 31,208 / 21,960 / 22,112. Recover observed SR from marker centers and verify their x coordinates equal cumulative round costs. Every SR is within 0.00002 of its two-decimal value. Metacognitive observations also agree with the independently extracted RQ5 series. The unchanged figure has Random peaks of 51.79 at rounds 4 and 7; the newer Table 9 reports 51.78. On 2026-11-27 the author explicitly selected the newer table as authoritative. The extractor applies that correction to both points after validating the original 51.79 geometry; the override is recorded in `paper-revision-corrections.json`.
- Matching: invert the endpoints of the 31 pairwise line segments. These are published plotted per-task means, not original execution logs. Store six-decimal approximations and display `≈` with three decimals. Aggregate means round to 0.978 and 0.334. Pair numbers indicate drawing order, not manuscript task identifiers. Original horizontal jitter is replaced with deterministic spacing solely for legibility. Pair lines, mean diamonds, quartiles, medians, and 1.5-IQR whiskers are retained. Box summaries are independently recovered from the source vector drawings.

## Interaction and semantics

- Native sliders support keyboard arrows, Home/End, touch, and pointer selection. Bars can be hovered or clicked.
- Both gating charts synchronize selected round, series visibility, and reset. The cost plot retains cumulative costs on its x axis. Lines show best-so-far SR; points and readouts show observed SR. The 30.35% reference and star identifying the first Metacognitive peak remain.
- Stacked pool segments retain their original vertical offsets when filtered, preserving their relation to cumulative admissions.
- Legends cannot hide the last series. Readouts and expandable data tables provide accessible text alternatives. With JavaScript disabled the charts and tables remain readable, while controls stay disabled.
- Entry animation respects reduced-motion preferences. No continuous autoplay.
