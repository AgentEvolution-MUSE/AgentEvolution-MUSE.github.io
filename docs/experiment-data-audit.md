# Experiment data audit — 2026-11-27

## Reference and outcome

The audit now uses the November 27 compiled paper, `MUSE_Arxiv-3.pdf` (133 pages), SHA-256 `251d29ca73ea6d6e98c5c84eb5eddfa4a1b469cb024ba533f5cd0f10e0848cf9`.

A follow-up comparison against the previously audited `MUSE_Arxiv-2.pdf` (SHA-256 `f3bb7cfaaa281a9e3fce686840412aad1b1049e394d7f6f956eeec02e9542937`) found identical extracted text across all 133 pages. The main experiment pages 27–35 and appendix evidence pages 88–93 render pixel-identically at 108 dpi. The table coordinates and experimental figure geometry are unchanged. Direct extraction from version 3 again passes all 169 metric-cell/bold checks and the 31 prefix-case numerical checks. No additional website data corrections are needed.

The Figure 9 / Table 9 Random discrepancy also persists in version 3; the author-approved 51.78 resolution below remains in effect.

The available `MUSE_Arxiv/main.tex` is an earlier source revision, SHA-256 `04fc6f929a44fe4edd967708505e21e5b2b1eea66f5971605f40d0e819ee13fd`. Re-extraction initially reproduced every website dataset and table heatmap exactly, but the compiled paper contains later numerical corrections. Reproducibility against that earlier source alone is therefore insufficient.

After the corrections below, all **169 metric cells** in the seven website result tables (162 numeric values and seven missing entries) match Tables 3–9 in the newer PDF. The bold emphasis also matches. The 31 numerical entries in the prefix case, including the initial potential, match Table 35. Browser checks verified the rendered table cells and all round-slider readouts against the audited data.

## Corrections made

| Location | Before | After | Evidence |
|---|---|---|---|
| Table 4, 27B Experience + principles, Best SR | 72.61 | 72.62 | PDF p. 29 |
| Same row, EvoGain | 10.70 | 10.71 | PDF p. 29; tied-best bold emphasis restored |
| Table 9, Random, Best SR | 51.79 | 51.78 | PDF p. 33; author confirmation on 2026-11-27 |
| Random curve, rounds 4 and 7 | 51.79 | 51.78 | Same author-confirmed resolution; both original figure peaks corrected |
| RQ2 Evo-AUC | Unit omitted | pp in chart, table and difference | Evaluation Metrics appendix |
| RQ3 setup | Broad “no metacognitive gating” | Limited to performance comparisons; audits/distributions use full MUSE with gating | Sections 6.4 and D.1 |
| Capability matching | Box summaries omitted | Quartiles, median and 1.5-IQR whiskers restored | Figure 18(c) |
| Gating performance | First-peak marker omitted | First Metacognitive peak star restored | Figure 9(b) |

The newer PDF still embeds the original Random curve with 51.79 peaks. Its plot geometry on p. 33 is identical to the previous PDF, while Table 9 and the narrative change to 51.78. The author explicitly confirmed **51.78** as authoritative. This is an intentional correction to the plotted points, not an unmodified extraction. `paper-revision-corrections.json` records both the original and replacement values. All other observed round values and rollout costs are retained.

## Coverage

| Website evidence | Paper reference | Checks |
|---|---|---|
| RQ1 scatter and complete table | Table 3, p. 28 | Seven methods; four metrics; component categories and executor/auxiliary flags; signs, order and units |
| RQ2 joint bars and table | Table 5, p. 29 | Five settings; five metrics; both refinement flags; all four metric switches; base reference and Joint–Parametric differences |
| RQ2 symbolic table | Table 4, p. 29 | Five settings × two backbones × four metrics; source shading and tied maxima |
| RQ3 paired comparisons and table | Table 6, p. 31 | All nine rows/four groups; chart pairs use prefix-enabled rows; both Best/Final SR; the no-prefix reference remains in the table |
| Task quality and reward audits | Tables 7–8, p. 31 | All rates; 39/40 and 36/36 assessable counts; 31/31 per execution condition; undefined guided FPR retained as N/A |
| Coverage and composition | Figure 18(a–b), p. 88 | 18 application counts and nine composition counts; correct denominators 90/168/36; one-decimal percentages derived from counts |
| Capability matching | Figure 18(c), p. 88 | 31 pairs/62 plotted means; aggregate means; independently recovered box geometry; two guided and six free executions per task |
| Task-pool adaptation | Figure 18(d), p. 88 | Eight active/retired pairs; cumulative admissions 3, 9, 13, 17, 24, 28, 30, 36; final active count 26 |
| Gating table and two plots | Table 9/Figure 9, p. 33 | 24 round costs, 24 observed SR values, 24 cumulative costs; totals 31,208/21,960/22,112; reductions 29.63%/29.15%; peak/final distinctions |
| Gating diagnostic figure | Figure 10, p. 34 | Original vector diagram retained; same figure geometry in both paper revisions |
| RQ5 trajectories and value table | Figure 11, p. 34 | All 56 round values; four oracle and three synthetic series; peaks/finals cross-checked against tables; evaluated candidates distinguished from deployment selection |
| Prefix-potential case | Table 35, p. 89 | 15 potential/reward pairs plus initial 0.361; error/correction steps; 10 text and 12 voice messages |
| Guided/free case | Figure 19, p. 90 | All 15/24 actions; rewards 1.00/0.20; 177 retrieved, 58 qualifying, $6,315; incomplete 50-record note and unsent email |
| Experience case | Figure 20, p. 92 | Nine actions; verification 0.53125 → 0.84375; 14 songs, five matches, song 4, score 1.00; candidate principle distinguished from injected experiences |
| Tool case | Figure 21, p. 93 | Seven actions; three source tasks; 19 records; album 5/952 seconds; mean rewards 0.750/0.833 and steps 26.25/22.00 |

The overview charts intentionally show selected relationships; their full data views retain the remaining table columns. MUSE's 16.91 Avg. Steps in RQ1 and Joint's 15.20 in RQ2 belong to different experimental settings and must not be substituted for one another. The 25% oracle setting is nominal (22 of 90 tasks), as in the paper.

## Precision and verification limits

- This verifies fidelity to the paper, not independent reproduction of the underlying experiments. Raw execution logs were not used.
- Round SR values are recovered from vector coordinates, with residuals under 0.00002 percentage points at two-decimal precision. The author-approved Random correction is recorded separately.
- Capability-matching values are recovered plotted means, not original task-level logs. The UI retains `≈` and displays three decimals; stored six-decimal coordinates are approximations. Box summaries are also vector-derived and checked against quartiles of the recovered pairs.
- Integer counts are recovered by inverse axis mapping with an integer residual below 0.005. Coverage is nonexclusive across applications and therefore does not sum to 100%.
- Reported Evo-AUC values remain those of the paper. Trapezoidal recomputation from displayed, rounded trajectories agrees within rounding tolerance; it does not justify replacing the reported aggregates.
- Case text is condensed; anonymized recipient/sender identifiers do not alter task logic. The reveal animation's timing is presentation timing, not measured execution duration.

## Reproduction

With PyMuPDF available:

```sh
python3 scripts/extract-result-tables.py /path/to/MUSE_Arxiv/main.tex
python3 scripts/extract-interactive-results.py /path/to/MUSE_Arxiv
python3 scripts/extract-experiment-charts.py /path/to/MUSE_Arxiv
python3 scripts/audit-compiled-paper.py /path/to/MUSE_Arxiv-3.pdf
npm run check
npm test
```

The independent compiled-PDF audit reads text at the published table coordinates, verifies all 169 cells and bold flags, and checks the prefix case. Its PDF fingerprint guard requires an explicit review before auditing a different revision. Extraction scripts apply the reviewed corrections after checking the original values. Validation passed: Astro check (zero errors/warnings), production build and all 32 automated tests. Additional browser verification exercised all seven RQ1 selections, all 16 RQ3 comparison values, every RQ5 round, every native-chart slider position, the RQ2 metric switches, rendered table cells and single-line mobile Evo-AUC units.
