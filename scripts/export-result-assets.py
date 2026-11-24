"""Export figures and table crops from the MUSE_Arxiv.pdf revision audited on November 24, 2026.

Requires PyMuPDF. Table coordinates refer to the supplied 133-page PDF;
review and adjust them before using a different paper revision.
"""
import argparse
import json
from pathlib import Path

import fitz

FIGURES = [
    'experiments/continuous_evolution_oracle',
    'experiments/continuous_evolution_synthetic',
    'experiments/gating_rollouts_per_round',
    'experiments/gating_best_observed_sr',
    'experiments/metacognitive_gating_case_study',
    'appendix/synthetic_task_coverage',
    'appendix/synthetic_application_composition',
    'appendix/synthetic_capability_matching',
    'appendix/synthetic_task_pool_adaptation',
    'appendix/synthetic_task_case_study',
    'appendix/exp_principle_case_study',
    'appendix/tool_invocation_case_study',
]
# Name, one-based PDF page, top, bottom (PDF points). Common x bounds: 69–531.
TABLES = [
    ('table-3-overall-adaptivity', 28, 116, 266),
    ('table-4-symbolic-components', 29, 104, 239),
    ('table-5-joint-adaptation', 29, 291, 426),
    ('table-6-supervision', 31, 128, 319),
    ('table-7-task-quality', 31, 372, 446),
    ('table-8-reward-reliability', 31, 522, 608),
    ('table-9-gating', 33, 128, 216),
    ('table-30-prefix-potential', 89, 103, 442),
]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--paper', type=Path, required=True)
    parser.add_argument('--figures', type=Path, required=True)
    args = parser.parse_args()
    repo = Path(__file__).resolve().parents[1]
    output = repo / 'public/assets/images/results'
    output.mkdir(parents=True, exist_ok=True)
    manifest = {}

    def export(page, filename):
        # Outline glyphs to retain original fonts without external font loading.
        (output / filename).write_text(page.get_svg_image(text_as_path=True))
        manifest[filename] = [round(page.rect.width, 2), round(page.rect.height, 2)]

    for figure in FIGURES:
        with fitz.open(args.figures / f'{figure}.pdf') as document:
            export(document[0], Path(figure).name.replace('_', '-') + '.svg')

    with fitz.open(args.paper) as paper:
        # Figure 4 from the audited PDF, preserving its vector paths and glyphs.
        with fitz.open() as diagram:
            page = diagram.new_page(width=457, height=315)
            page.show_pdf_page(page.rect, paper, 16, clip=fitz.Rect(69, 60, 526, 375))
            (repo / 'public/assets/images/figures/architecture.svg').write_text(
                page.get_svg_image(text_as_path=True)
            )
        for name, page_number, top, bottom in TABLES:
            with fitz.open() as crop:
                page = crop.new_page(width=462, height=bottom - top)
                page.show_pdf_page(
                    page.rect, paper, page_number - 1,
                    clip=fitz.Rect(69, top, 531, bottom),
                )
                export(page, f'{name}.svg')

    (repo / 'src/data/result-assets.json').write_text(json.dumps(manifest, indent=2) + '\n')
    print(f'Exported {len(manifest)} vector assets')


if __name__ == '__main__':
    main()
