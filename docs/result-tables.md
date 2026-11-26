# Native result tables

Six tables and the cell shading of all seven native result tables are read directly from manuscript LaTeX via `scripts/extract-result-tables.py`. `result-tables-provenance.json` records the source hash and table labels. Published numbers, rounding, and missing entries are retained; blank metrics are never converted to zero.

`ResultTable.astro` renders complete semantic HTML tables, then progressively enables optional supervision-group selection. All settings are visible by default. Rows retain publication order; there are no ranking controls. Symbolic comparisons show both backbones side by side as in the paper. Cell backgrounds reproduce the manuscript’s RGB colors and white-mix percentages. They remain fixed when filtering; blue encodes performance and orange encodes execution steps/cost. Bold emphasis follows the paper. Without JavaScript, all configurations and their labels remain available.

Metric definitions follow the manuscript: Evo-AUC uses normalized trapezoidal integration with final-value carry-forward for early termination; Avg. Steps is evaluated at the earliest best-SR agent instance, over all evaluated tasks. RQ4 retains the lower final success rate rather than presenting peak success and rollout reduction as a uniform gain.

Validation covers source/curve consistency, missing values, publication order, complete source columns, optional configuration filtering, keyboard controls, narrow viewports and the no-JavaScript fallback.

## Chart-first comparisons

The ASCEND local reference informed two complementary overviews, with all MUSE values still sourced from `result-tables.json`:

- RQ1: success versus execution-step scatter, highlighting MUSE, Vanilla GRPO and SkillMentor with muted blue, orange and green. Focus, hover and touch selection link the plot to its exact data row and baseline deltas. Keyboard arrows traverse methods; Escape or Show all clears selection. A mobile method picker brings its selected point into view.
- RQ3: paired-dot comparisons of oracle and oracle-plus-synthetic supervision across all four configurations. Peak/final toggles keep a shared 30–60% axis. Only prefix-potential-enabled rows enter these pairs; the no-prefix baseline remains in complete data. The chosen configuration synchronizes with the table; All settings restores every row. Both metric plots and all table rows remain available without JavaScript.

Complete tables remain expandable; paper-location labels and original-image links are not reintroduced.


## Completeness audit

All seven result tables retain their numerical cells and missing-value states. Configuration fields are explicit: component categories, executor updates and auxiliary updates in overall adaptivity; prefix potential in supervision; assessable/total counts in both audits; and the model label for gating. The symbolic table places 9B and 27B columns side by side. Supervision defaults to all nine rows in four labeled groups. The joint table retains both symbolic and model-weight switches.

Reference → baselines → MUSE is fixed in RQ1. Positive deltas retain plus signs; undefined audit rates display N/A. Hovering another method no longer fades table values, and shading is unchanged. Complete tables are the exhaustive evidence view; overview plots intentionally focus on selected relationships.
