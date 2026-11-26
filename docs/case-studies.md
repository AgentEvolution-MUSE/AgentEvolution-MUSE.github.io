# Interactive case studies

`CaseStudies.astro` and `CaseFlowSteps.astro` reconstruct four complete case diagrams using native HTML, SVG connectors and Lucide icons. All actions and observations remain visible together; selecting a node highlights related evidence without replacing or hiding other steps. `case-studies.ts` preserves every recorded action/observation: 15 guided and 24 free steps, 15 prefix-potential steps, 9 experience-guided steps, and 7 tool-assisted steps.

Source material:
- `figs/appendix/synthetic_task_case_study.pdf`: guided/free execution order, app groups, rewards 1.00 / 0.20, 177 retrieved transactions, 58 qualifying transactions totaling $6,315, and the truncated 50-record free execution.
- `main.tex`, `tab:prefix_potential_case`: all 15 potential/reward pairs, initial potential 0.361, error/correction observations and deletion counts.
- `figs/appendix/exp_principle_case_study.pdf`: source experience, candidate principle, injected release-date/playback guidance, nine-step execution, and verification mean rewards 0.53125 / 0.84375. The manuscript narrative identifies the guidance-to-step mappings (5, 7–8).
- `figs/appendix/tool_invocation_case_study.pdf`: recurrence across 3 source tasks; tool signature and pagination behavior; verification means 0.750 / 0.833 and 26.25 / 22.00; seven-step playback record with 19 records and album duration 952 seconds.

Text is condensed for web reading, not augmented with unreported actions. Pairwise verification aggregates are distinguished from single execution examples. Candidate principle distillation is not presented as a principle proven to have been used in the illustrated execution. The example source email/phone identifiers are replaced by “specified recipient/sender”; this does not change the task logic.

The guided and free paths share aligned Venmo, SimpleNote and Gmail bands, retaining all 15 and 24 steps and their outcomes. Experience formation, candidate-principle distillation, retrieved guidance and all nine execution steps appear together; explicit connectors link release-date guidance to step 5 and playback guidance to steps 7–8. Tool construction and paired verification remain alongside all seven execution steps, with a connector to tool invocation at step 3. The candidate principle is a separate downstream branch, not a source of guidance for the illustrated execution.

The prefix-potential case displays all 15 actions, observations, potentials and rewards beneath its full trajectory. Chart points and table rows highlight each other. Notes expand in place and connectors redraw with the layout. Keyboard activation and Escape are supported. Narrow screens scroll the complete diagram horizontally instead of breaking its relationships into stacked fragments. Without JavaScript, every step and source block is still visible.

No paper-location labels or source citations are displayed in the case UI. Source images remain in the repository for provenance, but are no longer the primary case presentation.
