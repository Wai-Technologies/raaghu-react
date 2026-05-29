/**
 * Central registry of API paths (relative to VITE_API_BASE_URL).
 * Add new resource groups here as the app grows.
 */
export const API_ENDPOINTS = {
  dashboard: {
    metrics: '/dashboard/metrics',
    activity: '/dashboard/activity',
    revenue: '/dashboard/revenue',
    contribution: '/dashboard/contribution',
  },
  auth: {
    session: '/auth/session',
    logout: '/auth/logout',
  },
  users: {
    list: '/users',
    byId: (id: string) => `/users/${id}`,
  },
} as const;
