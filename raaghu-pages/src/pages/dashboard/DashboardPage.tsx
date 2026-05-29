import { useEffect, useMemo, useState } from 'react';
import RdsAlert from '@raaghu/elements/rds-alert/rds-alert';
import RdsBadge from '@raaghu/elements/rds-badge/rds-badge';
import RdsBreadcrumbs from '@raaghu/elements/rds-breadcrumbs/rds-breadcrumbs';
import RdsCard from '@raaghu/elements/rds-card/rds-card';
import RdsTable from '@raaghu/elements/rds-table/rds-table';
import RdsTypography from '@raaghu/elements/rds-typography/rds-typography';
import RdsCompBarChart from '@raaghu/components/rds-comp-chart-bar/rds-comp-chart-bar';
import RdsCompContribution from '@raaghu/components/rds-comp-contribution/rds-comp-contribution';
import RdsCompLayout from '@raaghu/layouts/rds-comp-layout/rds-comp-layout';
import RdsCompLayoutItem from '@raaghu/layouts/rds-comp-layout/rds-comp-layout-item';
import {
  dashboardService,
  type DashboardActivity,
  type DashboardMetrics,
  type DashboardRevenueChart,
} from '@/core/services/dashboard.service';
import '@raaghu/elements/rds-alert/rds-alert.scss';
import '@raaghu/elements/rds-badge/rds-badge.scss';
import '@raaghu/elements/rds-breadcrumbs/rds-breadcrumbs.scss';
import '@raaghu/elements/rds-card/rds-card.scss';
import '@raaghu/elements/rds-table/rds-table.scss';
import '@raaghu/elements/rds-typography/rds-typography.scss';
import '@raaghu/components/rds-comp-chart-bar/rds-comp-chart-bar.scss';
import '@raaghu/components/rds-comp-contribution/rds-comp-contribution.scss';
import '@raaghu/layouts/rds-comp-layout/rds-comp-layout.scss';
import '@/styles/pages.css';

const activityColumns = [
  { id: 'user', label: 'User', minWidth: 140 },
  { id: 'action', label: 'Activity', minWidth: 260 },
  { id: 'department', label: 'Department', minWidth: 120 },
  { id: 'time', label: 'When', minWidth: 100 },
];

export default function DashboardPage() {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [metrics, setMetrics] = useState<DashboardMetrics[]>([]);
  const [activity, setActivity] = useState<DashboardActivity[]>([]);
  const [revenueChart, setRevenueChart] = useState<DashboardRevenueChart | null>(null);
  const [contributionValues, setContributionValues] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      const [nextMetrics, nextActivity, nextRevenue, nextContribution] = await Promise.all([
        dashboardService.getMetrics(),
        dashboardService.getRecentActivity(),
        dashboardService.getRevenueChart(),
        dashboardService.getContributionValues(),
      ]);

      if (!cancelled) {
        setMetrics(nextMetrics);
        setActivity(nextActivity);
        setRevenueChart(nextRevenue);
        setContributionValues(nextContribution);
      }
    }

    loadDashboard();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <RdsCompLayout direction="column" spacing={3} fullWidth>
      <header className="page-header">
        <RdsBreadcrumbs
          items={[{ label: 'Enterprise' }, { label: 'Dashboard', active: true }]}
          showIcon
        />
        <RdsTypography variant="h4" className="page-header__title">
          Executive dashboard
        </RdsTypography>
        <RdsTypography variant="body2" className="page-header__subtitle">
          Real-time overview of operations, revenue, and team activity.
        </RdsTypography>
      </header>

      <RdsAlert type="info">
        Welcome to the Raaghu enterprise demo. Toggle light/dark mode from the top bar to validate theme tokens.
      </RdsAlert>

      <RdsCompLayout direction="row" spacing={2} fullWidth wrap>
        {metrics.map((metric) => (
          <RdsCompLayoutItem key={metric.label} flex="1 1 200px">
            <RdsCard className="page-panel">
              <RdsTypography variant="body2" className="page-header__subtitle">
                {metric.label}
              </RdsTypography>
              <RdsTypography variant="h4">{metric.value}</RdsTypography>
              <RdsBadge
                badgeContent={metric.delta}
                color={metric.trend === 'up' ? 'success' : 'warning'}
                layout="text"
              >
                <span />
              </RdsBadge>
            </RdsCard>
          </RdsCompLayoutItem>
        ))}
      </RdsCompLayout>

      <RdsCompLayout direction="row" spacing={3} fullWidth wrap>
        <RdsCompLayoutItem flex="1 1 360px">
          <RdsCard className="page-panel">
            <RdsTypography variant="h6" className="page-panel__title">
              Revenue vs target
            </RdsTypography>
            <div className="page-chart">
              {revenueChart && (
                <RdsCompBarChart
                  id="dashboard-revenue"
                  height={280}
                  labels={revenueChart.labels}
                  dataSets={revenueChart.dataSets}
                  options={revenueChart.options}
                />
              )}
            </div>
          </RdsCard>
        </RdsCompLayoutItem>

        <RdsCompLayoutItem flex="1 1 320px">
          <RdsCard className="page-panel">
            <RdsTypography variant="h6" className="page-panel__title">
              Team activity
            </RdsTypography>
            <RdsCompContribution values={contributionValues} until={today} />
          </RdsCard>
        </RdsCompLayoutItem>
      </RdsCompLayout>

      <RdsCard className="page-panel">
        <RdsTypography variant="h6" className="page-panel__title">
          Recent activity
        </RdsTypography>
        <RdsTable columns={activityColumns} rows={activity} stickyHeader />
      </RdsCard>
    </RdsCompLayout>
  );
}
