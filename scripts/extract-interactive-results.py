"""Reproduce the interactive result data from the manuscript's LaTeX and vector PDFs.
Usage: PYTHONPATH=/tmp/muse-pdf-libs python3 scripts/extract-interactive-results.py /path/to/MUSE_Arxiv
PDF curves are inverse-mapped using their seven labelled grid lines, not raster digitization.
"""
import hashlib
import json
import re
import sys
from pathlib import Path
import fitz

source = Path(sys.argv[1])
repo = Path(__file__).resolve().parents[1]
tex = (source / 'main.tex').read_text()
block = tex.split(r'\label{tab:unison_contribution}')[1].split(r'\end{table*}')[0]
settings = [
    ('base', 'Base Model', False, False),
    ('symbolic', 'MUSE (Symbolic)', True, False),
    ('grpo', 'Vanilla GRPO', False, True),
    ('parametric', 'MUSE (Parametric)', False, True),
    ('joint', 'MUSE (Joint)', True, True),
]
rows = []
for key, name, symbolic, parametric in settings:
    row = block.split(name, 1)[1].split(r'\\', 1)[0]
    cells = row.split('&')[3:]
    values = []
    for cell in cells:
        cell = re.sub(r'\\cellcolor\{[^}]+\}', '', cell)
        value = re.search(r'[+-]?\d+\.\d+', cell)
        values.append(float(value[0]) if value else None)
    assert len(values) == 5
    rows.append(dict(id=key, name=name, symbolic=symbolic, parametric=parametric,
                     metrics=dict(zip(['best', 'gain', 'final', 'auc', 'steps'], values))))

curve_names = {'oracle': ['symbolic', 'grpo', 'parametric', 'joint'], 'synthetic': ['parametric', 'joint', 'muse']}
curves = {}
provenance = []
for mode, keys in curve_names.items():
    path = source / f'figs/experiments/continuous_evolution_{mode}.pdf'
    page = fitz.open(path)[0]
    drawings = page.get_drawings()
    # Long, light-gray horizontal lines are the grid at 25,30,...55 percent.
    grid = []
    for d in drawings:
        if len(d['items']) != 1 or d['items'][0][0] != 'l' or not d['color']:
            continue
        _, a, b = d['items'][0]
        if abs(a.y - b.y) < .001 and b.x - a.x > 400 and min(d['color']) > .85:
            grid.append(a.y)
    grid.sort(reverse=True)
    assert len(grid) == 7
    scale = (grid[0] - grid[-1]) / 30
    for index, y in enumerate(grid):
        assert abs((grid[0] - y) / scale - 5 * index) < .0001
    lines = [d for d in drawings if len(d['items']) == 7 and all(i[0] == 'l' for i in d['items'])]
    assert len(lines) == len(keys)
    series = []
    residuals = []
    for key, line in zip(keys, lines):
        points = [line['items'][0][1]] + [i[2] for i in line['items']]
        assert all(points[i+1].x > points[i].x for i in range(7))
        values = [25 + (grid[0] - p.y) / scale for p in points]
        residuals += [abs(v - round(v, 2)) for v in values]
        series.append(dict(id=key, values=[round(v, 2) for v in values]))
    assert max(residuals) < .0001, 'Do not present an uncertain coordinate extraction as an exact two-decimal value.'
    curves[mode] = series
    provenance.append(dict(file=str(path.relative_to(source)), sha256=hashlib.sha256(path.read_bytes()).hexdigest(),
                           method='Inverse affine mapping of vector polyline vertices using labelled 25–55% axis grid; rounded to manuscript precision (2 decimals).',
                           maxRoundingResidual=max(residuals)))
# Cross-check every oracle curve against Table 5's peak and final values.
for curve in curves['oracle']:
    row = next(row for row in rows if row['id'] == curve['id'])
    assert max(curve['values']) == row['metrics']['best']
    assert curve['values'][-1] == row['metrics']['final']
assert max(curves['synthetic'][0]['values']) == 54.76
assert curves['synthetic'][0]['values'][-1] == 42.26
assert max(curves['synthetic'][2]['values']) == 54.76
assert curves['synthetic'][2]['values'][-1] == 46.42
result = dict(reference=30.35, table=rows, curves=curves)
(repo / 'src/data/interactive-results.json').write_text(json.dumps(result, indent=2) + '\n')
provenance.insert(0, dict(file='main.tex', sha256=hashlib.sha256((source/'main.tex').read_bytes()).hexdigest(), label='tab:unison_contribution', method='Table 5 row values extracted from LaTeX; no recomputation of reported metrics.'))
(repo / 'docs/interactive-results-provenance.json').write_text(json.dumps(provenance, indent=2)+'\n')
print(json.dumps(result, indent=2))
