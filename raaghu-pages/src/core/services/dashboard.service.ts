import { API_ENDPOINTS } from '@/core/api/endpoints';
import { httpClient } from '@/core/api/http-client';
import {
  buildContributionValues,
  kpiMetrics,
  recentActivity,
  revenueChart,
} from '@/pages/dashboard/dashboard.data';

export interface DashboardMetrics {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
}

export interface DashboardActivity {
  id: string;
  user: string;
  action: string;
  department: string;
  time: string;
}

export interface DashboardRevenueChart {
  labels: string[];
  dataSets: Record<string, unknown>[];
  options: Record<string, unknown>;
}

/**
 * Dashboard data access layer.
 * Replace mock fallbacks with httpClient calls when the API is available.
 */
export const dashboardService = {
  async getMetrics(): Promise<DashboardMetrics[]> {
    try {
      return await httpClient<DashboardMetrics[]>(API_ENDPOINTS.dashboard.metrics);
    } catch {
      return kpiMetrics;
    }
  },

  async getRecentActivity(): Promise<DashboardActivity[]> {
    try {
      return await httpClient<DashboardActivity[]>(API_ENDPOINTS.dashboard.activity);
    } catch {
      return recentActivity;
    }
  },

  async getRevenueChart(): Promise<DashboardRevenueChart> {
    try {
      return await httpClient<DashboardRevenueChart>(API_ENDPOINTS.dashboard.revenue);
    } catch {
      return revenueChart;
    }
  },

  async getContributionValues(days = 90): Promise<Record<string, number>> {
    try {
      return await httpClient<Record<string, number>>(
        `${API_ENDPOINTS.dashboard.contribution}?days=${days}`,
      );
    } catch {
      return buildContributionValues(days);
    }
  },
};
