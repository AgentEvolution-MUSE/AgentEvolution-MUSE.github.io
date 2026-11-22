# Results assets

Updated locally against `Agent_Evolution__Metacognitive_Unison_Self_Evolution-2.pdf`
(133 pages, supplied November 22, 2026) and the supplied paper source directory
`Agent_Evolution__Metacognitive_Unison_Self_Evolution/figs/`.

The 20 SVGs listed in `src/data/result-assets.json` are exported from original PDFs
using PyMuPDF 1.26.5. Glyphs are converted to paths to preserve the paper typography.
Charts and cases retain the original artwork; table crops exclude surrounding prose
and captions, which are summarized in accessible page text.

| Page content | Original source |
| --- | --- |
| RQ1 overall comparison | Paper Table 3, PDF page 28 |
| RQ2 component comparisons | Paper Tables 4–5, PDF page 29 |
| RQ3 supervision and audits | Paper Tables 6–8, PDF page 31 |
| RQ3 coverage and matching | `figs/appendix/synthetic_{task_coverage,application_composition,capability_matching,task_pool_adaptation}.pdf` |
| RQ4 gating | Paper Table 9, PDF page 32; `figs/experiments/gating_{rollouts_per_round,best_observed_sr}.pdf` and `metacognitive_gating_case_study.pdf` |
| RQ5 trajectories | `figs/experiments/continuous_evolution_{oracle,synthetic}.pdf` |
| Self-supervision case | `figs/appendix/synthetic_task_case_study.pdf`, Figure 19 |
| Prefix-potential case | Paper Table 26, PDF page 91 |
| Experience and principle case | `figs/appendix/exp_principle_case_study.pdf`, Figure 20 |
| Tool case | `figs/appendix/tool_invocation_case_study.pdf`, Figure 21 |

To reproduce with PyMuPDF installed:

```sh
python3 scripts/export-result-assets.py --paper /path/to/paper.pdf --figures /path/to/paper-source/figs
```

Table coordinates are specific to this paper revision. Review crops if the PDF changes.
Older PNG tables and `evolution-trajectory.svg` are retained but are no longer used
by the Results section.
