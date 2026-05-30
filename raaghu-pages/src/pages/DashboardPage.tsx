import React, { useState } from 'react';
import RdsCompAppShell, { AppShellDisplayType } from '@raaghu/layouts/rds-comp-app-shell/rds-comp-app-shell';
import '@raaghu/layouts/rds-comp-app-shell/rds-comp-app-shell.scss';
import RdsAppBar from '@raaghu/elements/rds-app-bar/rds-app-bar';
import RdsSidebar from '@raaghu/elements/rds-sidebar/rds-sidebar';
import { useRaaghuTheme } from '@raaghu/themes/src/provider/RaaghuThemeProvider';
import {
  Box,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Folder as ProjectsIcon,
  TrendingUp,
  TrendingDown,
  Notifications as BellIcon,
  WbSunny as SunIcon,
  NightsStay as MoonIcon,
} from '@mui/icons-material';

// ─── Static data ────────────────────────────────────────────────────────────

const KPI_CARDS = [
  {
    label: 'Total Users',
    value: '12,847',
    trend: '+12%',
    trendUp: true,
    subtitle: 'vs last month',
    accent: 'var(--rds-primary-main)',
  },
  {
    label: 'Revenue',
    value: '$48,293',
    trend: '+8%',
    trendUp: true,
    subtitle: 'vs last month',
    accent: 'var(--rds-success-main)',
  },
  {
    label: 'Active Projects',
    value: '156',
    trend: '+3',
    trendUp: true,
    subtitle: 'new this week',
    accent: 'var(--rds-secondary-main)',
  },
  {
    label: 'Open Tickets',
    value: '24',
    trend: '-6',
    trendUp: false,
    subtitle: 'resolved today',
    accent: 'var(--rds-warning-main)',
  },
];

const ACTIVITY = [
  { initials: 'AM', user: 'Alice Martin',  action: 'Closed ticket #1284 — Login timeout',              time: '5m ago',  tag: 'Ticket'  },
  { initials: 'BC', user: 'Bob Chen',      action: 'Created new project "Q3 Launch"',                  time: '23m ago', tag: 'Project' },
  { initials: 'SK', user: 'Sarah Kim',     action: 'Updated user permissions for Marketing team',      time: '1h ago',  tag: 'Users'   },
  { initials: 'JP', user: 'James Patel',   action: 'Deployed release v2.4.1 to production',            time: '3h ago',  tag: 'Deploy'  },
  { initials: 'ED', user: 'Emily Davis',   action: 'Resolved ticket #1279 — Dashboard crash on mobile', time: '5h ago', tag: 'Ticket'  },
];

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'users',     label: 'Users',     icon: <PersonIcon />    },
  { id: 'projects',  label: 'Projects',  icon: <ProjectsIcon />  },
  { id: 'settings',  label: 'Settings',  icon: <SettingsIcon />  },
  { id: 'help',      label: 'Help',      icon: <HelpIcon />      },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const { toggleMode, isDark } = useRaaghuTheme();

  const logoSrc = isDark
    ? 'https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-darkmode.png'
    : 'https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png';

  // ── Topbar ──────────────────────────────────────────────────────────────
  const topbar = (
    <div className="rds-appshell-appbar rds-appshell-appbar--fixed">
      <RdsAppBar
        color="default"
        title=""
        showLogo
        logo={<img src={logoSrc} alt="Raaghu Design System" style={{ height: 28, objectFit: 'contain' }} />}
        showMenuButton
        showSearch
        searchPlaceholder="Search…"
        onSearchChange={() => {}}
        actions={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <BellIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={toggleMode}
              aria-label="toggle theme"
              sx={{ color: 'text.secondary' }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </IconButton>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'var(--rds-primary-main)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              JD
            </Avatar>
          </Box>
        }
      />
    </div>
  );

  // ── Sidebar ─────────────────────────────────────────────────────────────
  // Default layout intentionally hides the sidebar logo (logo lives in AppBar).
  // We add a matching 64px header manually so the sidebar aligns with the AppBar.
  const sidebar = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        sx={{
          height: 64,
          px: 2.5,
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          bgcolor: 'var(--rds-background-paper)',
          borderBottom: '1px solid var(--rds-divider)',
        }}
      >
        <img src={logoSrc} alt="Raaghu Design System" style={{ height: 26, objectFit: 'contain' }} />
      </Box>
      <RdsSidebar
        avatarSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        avatarCollapsedSrc={logoSrc}
        isOpen
        showLogo={false}
        variant="permanent"
        layout="raaghu"
        items={NAV_ITEMS.map(item => ({
          icon: item.icon,
          label: item.label,
          active: activeNav === item.id,
          onClick: () => setActiveNav(item.id),
        }))}
      />
    </Box>
  );

  // ── Main content ─────────────────────────────────────────────────────────
  const content = (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Pushes content below the fixed AppBar */}
      <Toolbar />

      {/* Page header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Overview
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Welcome back, John. Here's what's happening today.
        </Typography>
      </Box>

      {/* KPI cards — 4 cols desktop, 2 cols tablet, 1 col mobile */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 2,
          mb: 4,
        }}
      >
        {KPI_CARDS.map(kpi => (
          <Box
            key={kpi.label}
            sx={{
              p: 3,
              bgcolor: 'var(--rds-background-paper)',
              border: '1px solid var(--rds-divider)',
              borderLeft: `4px solid ${kpi.accent}`,
              borderRadius: 'var(--rds-border-radius-md)',
              boxShadow: 'var(--rds-elevation-1)',
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              {kpi.label}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {kpi.value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {kpi.trendUp
                ? <TrendingUp sx={{ fontSize: 16, color: 'var(--rds-success-main)' }} />
                : <TrendingDown sx={{ fontSize: 16, color: 'var(--rds-warning-main)' }} />}
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: kpi.trendUp ? 'var(--rds-success-main)' : 'var(--rds-warning-main)',
                }}
              >
                {kpi.trend}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                &nbsp;{kpi.subtitle}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Recent activity */}
      <Box
        sx={{
          bgcolor: 'var(--rds-background-paper)',
          border: '1px solid var(--rds-divider)',
          borderRadius: 'var(--rds-border-radius-md)',
          overflow: 'hidden',
        }}
      >
        {/* Section header */}
        <Box
          sx={{
            px: 3,
            py: 2,
            borderBottom: '1px solid var(--rds-divider)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Recent Activity
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'var(--rds-primary-main)', cursor: 'pointer', fontWeight: 500 }}
          >
            View all
          </Typography>
        </Box>

        {/* Activity list */}
        <List disablePadding>
          {ACTIVITY.map((item, i) => (
            <React.Fragment key={`${item.user}-${i}`}>
              <ListItem sx={{ px: 3, py: 1.5 }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: 'var(--rds-primary-50)',
                      color: 'var(--rds-primary-main)',
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {item.initials}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.user}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {item.action}
                    </Typography>
                  }
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5, ml: 2 }}>
                  <Chip
                    label={item.tag}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: 11,
                      bgcolor: 'var(--rds-primary-50)',
                      color: 'var(--rds-primary-main)',
                      border: 'none',
                    }}
                  />
                  <Typography variant="caption" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
                    {item.time}
                  </Typography>
                </Box>
              </ListItem>
              {i < ACTIVITY.length - 1 && (
                <Divider sx={{ borderColor: 'var(--rds-divider)' }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>

    </Box>
  );

  return (
    <RdsCompAppShell
      displayType={AppShellDisplayType.Default}
      topbar={topbar}
      sidebar={sidebar}
    >
      {content}
    </RdsCompAppShell>
  );
}
