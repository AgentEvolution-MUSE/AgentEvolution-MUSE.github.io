export const seriesStyle: Record<string, { name: string; color: string; dash?: string }> = {
  symbolic: { name: 'MUSE (Symbolic)', color: '#3c9471', dash: '7 3 2 3' },
  grpo: { name: 'Vanilla GRPO', color: '#b37838', dash: '6 4' },
  parametric: { name: 'MUSE (Parametric)', color: '#4987bd' },
  joint: { name: 'MUSE (Joint)', color: '#8971ad', dash: '7 4' },
  muse: { name: 'MUSE', color: '#244c75' },
};

// Keep exact values beside the selected points, separating labels when curves meet.
export function curvePointLabels(curves: { id: string; values: number[] }[], round: number) {
  const pointX = 48 + (round - 1) * 62;
  const left = round >= 7;
  const labels = curves.map(curve => {
    const value = curve.values[round - 1];
    const pointY = 245 - (value - 25) * 6.2;
    return { id: curve.id, value, pointX, pointY, x: pointX + (left ? -13 : 13), y: pointY, anchor: left ? 'end' : 'start' };
  }).sort((a, b) => a.pointY - b.pointY);
  labels.forEach((label, i) => { label.y = Math.max(38, label.y, i ? labels[i - 1].y + 18 : 38); });
  for (let i = labels.length - 1; i >= 0; i--) {
    labels[i].y = Math.min(labels[i].y, i === labels.length - 1 ? 239 : labels[i + 1].y - 18);
  }
  return labels;
}
