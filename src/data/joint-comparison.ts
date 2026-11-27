import results from './interactive-results.json';

export const jointMetrics = [
  { key: 'best', label: 'Best SR', unit: '%', max: 60, lower: false },
  { key: 'final', label: 'Final SR', unit: '%', max: 60, lower: false },
  { key: 'auc', label: 'Evo-AUC', unit: 'pp', max: 25, lower: false },
  { key: 'steps', label: 'Avg. Steps', unit: '', max: 25, lower: true },
] as const;
export type JointMetric = typeof jointMetrics[number];
export const jointChartRows = results.table.filter(row => row.id !== 'base');
export const baseRow = results.table.find(row => row.id === 'base')!;
export function jointBenefit(metric: JointMetric) {
  const joint = results.table.find(row => row.id === 'joint')!.metrics[metric.key];
  const parametric = results.table.find(row => row.id === 'parametric')!.metrics[metric.key];
  const difference = Math.abs(joint - parametric).toFixed(2);
  return metric.key === 'steps'
    ? `${difference} fewer steps · Joint vs. Parametric`
    : `+${difference}${metric.unit === '%' || metric.unit === 'pp' ? ' pp' : ''} ${metric.label} · Joint vs. Parametric`;
}
