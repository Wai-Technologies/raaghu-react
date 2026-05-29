export const kpiMetrics = [
  { label: 'Active users', value: '1,284', delta: '+12%', trend: 'up' as const },
  { label: 'Revenue (MTD)', value: '$482K', delta: '+8.4%', trend: 'up' as const },
  { label: 'Open tasks', value: '42', delta: '-6', trend: 'down' as const },
  { label: 'SLA compliance', value: '94%', delta: '+2%', trend: 'up' as const },
];

export const recentActivity = [
  { id: '1', user: 'Sarah Chen', action: 'Approved purchase order #PO-2041', department: 'Finance', time: '12 min ago' },
  { id: '2', user: 'Marcus Webb', action: 'Deployed release v2.14 to staging', department: 'Engineering', time: '34 min ago' },
  { id: '3', user: 'Priya Nair', action: 'Onboarded 3 new enterprise accounts', department: 'Sales', time: '1 hr ago' },
  { id: '4', user: 'Alex Rivera', action: 'Resolved ticket INC-8832', department: 'Support', time: '2 hr ago' },
];

export const revenueChart = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  dataSets: [
    {
      label: 'Revenue',
      data: [320, 380, 410, 395, 450, 482],
      backgroundColor: 'var(--rds-primary-main)',
      borderColor: 'var(--rds-primary-main)',
      borderWidth: 1,
      borderRadius: 4,
    },
    {
      label: 'Target',
      data: [300, 340, 380, 400, 420, 460],
      backgroundColor: 'var(--rds-secondary-main)',
      borderColor: 'var(--rds-secondary-main)',
      borderWidth: 1,
      borderRadius: 4,
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' as const } },
  },
};

export function buildContributionValues(days = 90): Record<string, number> {
  const values: Record<string, number> = {};
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    values[d.toISOString().slice(0, 10)] = Math.floor(Math.random() * 4);
  }
  return values;
}
