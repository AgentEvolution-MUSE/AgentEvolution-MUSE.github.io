# Interactive result sources

The native comparison table replaces Table 5's static SVG. The two interactive trajectory charts replace Figure 11(a–b). Architecture and the other result figures are unchanged by this conversion.

- Table values: `MUSE_Arxiv/main.tex`, `tab:unison_contribution`; all five metrics and both configuration flags are preserved. Base-model EvoGain remains missing, not zero.
- Round values: `figs/experiments/continuous_evolution_oracle.pdf` and `continuous_evolution_synthetic.pdf`. These are **published vector-figure coordinates, not raw experiment logs**. The seven labelled grid lines calibrate the affine transformation to success rate. All 56 recovered values lie within 0.0001 percentage points of a two-decimal value.
- Every oracle-series peak and final value is checked against Table 5. Synthetic peaks/final values and MUSE's first peak round are cross-checked against the manuscript.
- `interactive-results-provenance.json` records source SHA-256 hashes and rounding residuals. `src/data/interactive-results.json` is the shared display dataset; reported aggregate metrics are not recomputed from rounded trajectories.

Reproduce with PyMuPDF installed:

```sh
python3 scripts/extract-interactive-results.py /path/to/MUSE_Arxiv
```

Review source changes before regenerating: the extractor deliberately fails on unexpected curve counts, grid geometry, numerical precision, or mismatched peak/final checks.

## Interaction

RQ2 switches between a metric-selectable bar chart and the complete table. The base-model reference is fixed, while the summary compares Joint with Parametric. Evo-AUC values and differences use percentage points (pp).

The charts share a round slider and consistent method colors. Plot hover/click selects a round in both panels. Legends toggle each panel's series independently and retain at least one visible method. Reset restores all curves and round 8. The expandable numeric table retains all 56 values irrespective of visibility filters. All primary data remains server-rendered if JavaScript is unavailable.
