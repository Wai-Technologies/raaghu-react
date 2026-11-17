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
  LinearProgress,
  Badge,
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
  PeopleAlt as PeopleIcon,
  AttachMoney as MoneyIcon,
  WorkOutline as WorkIcon,
  ConfirmationNumber as TicketIcon,
  CheckCircleOutline as CheckIcon,
  ErrorOutline as ErrorIcon,
  ScheduleOutlined as ClockIcon,
  FlashOn as FlashIcon,
} from '@mui/icons-material';

// ─── Static data ────────────────────────────────────────────────────────────
// Page-local status colors. Same hexes as before. Not bound to syntax tokens
// (--rds-syntax-tag/property/selector/value): those share these light-mode
// hexes but resolve to different colors in dark mode.

const DASHBOARD_COLORS = {
  indigo: '#4F46E5',
  green: '#059669',
  violet: '#7C3AED',
  amber: '#D97706',
  red: '#DC2626',
  cyan: '#0891B2',
  onGradient: '#fff',
} as const;

const DASHBOARD_TINT = {
  indigo12: 'rgba(79,70,229,0.12)',
  indigo10: 'rgba(79,70,229,0.1)',
  indigo08: 'rgba(79,70,229,0.08)',
  indigo14: 'rgba(79,70,229,0.14)',
  indigo40: 'rgba(79,70,229,0.4)',
  indigo35: 'rgba(79,70,229,0.35)',
  green12: 'rgba(5,150,105,0.12)',
  green10: 'rgba(5,150,105,0.1)',
  green20: 'rgba(5,150,105,0.2)',
  violet12: 'rgba(124,58,237,0.12)',
  violet10: 'rgba(124,58,237,0.1)',
  amber12: 'rgba(217,119,6,0.12)',
  red10: 'rgba(220,38,38,0.1)',
  white25: 'rgba(255,255,255,0.25)',
} as const;

const DASHBOARD_GRADIENT = `linear-gradient(135deg, ${DASHBOARD_COLORS.indigo} 0%, ${DASHBOARD_COLORS.violet} 100%)`;

const KPI_CARDS = [
  {
    label: 'Total Users',
    value: '12,847',
    trend: '+12%',
    trendUp: true,
    subtitle: 'vs last month',
    accent: DASHBOARD_COLORS.indigo,
    iconBg: DASHBOARD_TINT.indigo12,
    icon: <PeopleIcon sx={{ fontSize: 22, color: DASHBOARD_COLORS.indigo }} />,
    progress: 72,
  },
  {
    label: 'Revenue',
    value: '$48,293',
    trend: '+8%',
    trendUp: true,
    subtitle: 'vs last month',
    accent: DASHBOARD_COLORS.green,
    iconBg: DASHBOARD_TINT.green12,
    icon: <MoneyIcon sx={{ fontSize: 22, color: DASHBOARD_COLORS.green }} />,
    progress: 58,
  },
  {
    label: 'Active Projects',
    value: '156',
    trend: '+3',
    trendUp: true,
    subtitle: 'new this week',
    accent: DASHBOARD_COLORS.violet,
    iconBg: DASHBOARD_TINT.violet12,
    icon: <WorkIcon sx={{ fontSize: 22, color: DASHBOARD_COLORS.violet }} />,
    progress: 81,
  },
  {
    label: 'Open Tickets',
    value: '24',
    trend: '-6',
    trendUp: false,
    subtitle: 'resolved today',
    accent: DASHBOARD_COLORS.amber,
    iconBg: DASHBOARD_TINT.amber12,
    icon: <TicketIcon sx={{ fontSize: 22, color: DASHBOARD_COLORS.amber }} />,
    progress: 35,
  },
];

const ACTIVITY = [
  { initials: 'AM', user: 'Alice Martin',  action: 'Closed ticket #1284 — Login timeout',               time: '5m ago',  tag: 'Ticket',  avatarColor: DASHBOARD_COLORS.indigo },
  { initials: 'BC', user: 'Bob Chen',      action: 'Created new project "Q3 Launch"',                   time: '23m ago', tag: 'Project', avatarColor: DASHBOARD_COLORS.green },
  { initials: 'SK', user: 'Sarah Kim',     action: 'Updated user permissions for Marketing team',       time: '1h ago',  tag: 'Users',   avatarColor: DASHBOARD_COLORS.violet },
  { initials: 'JP', user: 'James Patel',   action: 'Deployed release v2.4.1 to production',             time: '3h ago',  tag: 'Deploy',  avatarColor: DASHBOARD_COLORS.red },
  { initials: 'ED', user: 'Emily Davis',   action: 'Resolved ticket #1279 — Dashboard crash on mobile', time: '5h ago',  tag: 'Ticket',  avatarColor: DASHBOARD_COLORS.cyan },
];

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  Ticket:  { bg: DASHBOARD_TINT.indigo10, color: DASHBOARD_COLORS.indigo },
  Project: { bg: DASHBOARD_TINT.green10,  color: DASHBOARD_COLORS.green },
  Users:   { bg: DASHBOARD_TINT.violet10, color: DASHBOARD_COLORS.violet },
  Deploy:  { bg: DASHBOARD_TINT.red10,    color: DASHBOARD_COLORS.red },
};

const QUICK_STATS = [
  { label: 'Uptime',         value: '99.9%',  icon: <CheckIcon sx={{ fontSize: 18, color: DASHBOARD_COLORS.green }} />, color: DASHBOARD_COLORS.green },
  { label: 'Avg. Response',  value: '142ms',  icon: <FlashIcon sx={{ fontSize: 18, color: DASHBOARD_COLORS.indigo }} />, color: DASHBOARD_COLORS.indigo },
  { label: 'Critical Issues',value: '2',      icon: <ErrorIcon sx={{ fontSize: 18, color: DASHBOARD_COLORS.red }} />, color: DASHBOARD_COLORS.red },
  { label: 'Pending Reviews',value: '18',     icon: <ClockIcon sx={{ fontSize: 18, color: DASHBOARD_COLORS.amber }} />, color: DASHBOARD_COLORS.amber },
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
    ? 'https://raaghustorageaccount.blob.core.windows.net/raaghu-designsystem/raaghu-design-system-darkmode3.png'
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton
              size="small"
              sx={{
                color: 'text.secondary',
                bgcolor: 'action.hover',
                borderRadius: 1.5,
                '&:hover': { bgcolor: 'action.selected' },
              }}
            >
              <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, minWidth: 16, height: 16 } }}>
                <BellIcon sx={{ fontSize: 20 }} />
              </Badge>
            </IconButton>
            <IconButton
              size="small"
              onClick={toggleMode}
              aria-label="toggle theme"
              sx={{
                color: 'text.secondary',
                bgcolor: 'action.hover',
                borderRadius: 1.5,
                '&:hover': { bgcolor: 'action.selected' },
              }}
            >
              {isDark ? <SunIcon sx={{ fontSize: 20 }} /> : <MoonIcon sx={{ fontSize: 20 }} />}
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  background: DASHBOARD_GRADIENT,
                  fontSize: 13,
                  fontWeight: 700,
                  boxShadow: `0 2px 8px ${DASHBOARD_TINT.indigo40}`,
                }}
              >
                JD
              </Avatar>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: 13 }}>John Doe</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 11 }}>Admin</Typography>
              </Box>
            </Box>
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
    <Box sx={{ p: { xs: 2, md: 3 }, minHeight: '100vh', bgcolor: 'var(--rds-background-default)' }}>
      {/* Spacer so content clears the fixed AppBar */}
      <Toolbar />

      {/* Page header */}
      <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.3px' }}>
            Overview
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Welcome back, <strong>John</strong>. Here's what's happening today.
          </Typography>
        </Box>
        <Chip
          icon={<CheckIcon sx={{ fontSize: '14px !important', color: `${DASHBOARD_COLORS.green} !important` }} />}
          label="All systems operational"
          size="small"
          sx={{
            bgcolor: DASHBOARD_TINT.green10,
            color: DASHBOARD_COLORS.green,
            fontWeight: 600,
            fontSize: 12,
            border: `1px solid ${DASHBOARD_TINT.green20}`,
            height: 28,
          }}
        />
      </Box>

      {/* KPI cards — 4 cols desktop, 2 cols tablet, 1 col mobile */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 2.5,
          mb: 3,
        }}
      >
        {KPI_CARDS.map(kpi => (
          <Box
            key={kpi.label}
            sx={{
              p: 2.5,
              bgcolor: 'var(--rds-background-paper)',
              border: '1px solid var(--rds-divider)',
              borderRadius: 'var(--rds-border-radius-md)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              cursor: 'default',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              },
            }}
          >
            {/* Icon + label row */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {kpi.label}
              </Typography>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: 2,
                  bgcolor: kpi.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {kpi.icon}
              </Box>
            </Box>

            {/* Value */}
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, letterSpacing: '-0.5px', lineHeight: 1 }}>
              {kpi.value}
            </Typography>

            {/* Trend */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
              {kpi.trendUp
                ? <TrendingUp sx={{ fontSize: 15, color: DASHBOARD_COLORS.green }} />
                : <TrendingDown sx={{ fontSize: 15, color: DASHBOARD_COLORS.amber }} />}
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: kpi.trendUp ? DASHBOARD_COLORS.green : DASHBOARD_COLORS.amber,
                }}
              >
                {kpi.trend}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                &nbsp;{kpi.subtitle}
              </Typography>
            </Box>

            {/* Progress bar */}
            <LinearProgress
              variant="determinate"
              value={kpi.progress}
              sx={{
                height: 4,
                borderRadius: 99,
                bgcolor: kpi.iconBg,
                '& .MuiLinearProgress-bar': {
                  bgcolor: kpi.accent,
                  borderRadius: 99,
                },
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Two-column row: Activity + Quick Stats */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 320px' },
          gap: 2.5,
        }}
      >
        {/* Recent activity */}
        <Box
          sx={{
            bgcolor: 'var(--rds-background-paper)',
            border: '1px solid var(--rds-divider)',
            borderRadius: 'var(--rds-border-radius-md)',
            overflow: 'hidden',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
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
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Recent Activity
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Last 24 hours
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: DASHBOARD_COLORS.indigo,
                cursor: 'pointer',
                fontWeight: 600,
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                bgcolor: DASHBOARD_TINT.indigo08,
                '&:hover': { bgcolor: DASHBOARD_TINT.indigo14 },
                transition: 'background 0.15s',
              }}
            >
              View all
            </Typography>
          </Box>

          {/* Activity list */}
          <List disablePadding>
            {ACTIVITY.map((item, i) => (
              <React.Fragment key={`${item.user}-${i}`}>
                <ListItem
                  sx={{
                    px: 3,
                    py: 1.75,
                    '&:hover': { bgcolor: 'action.hover' },
                    transition: 'background 0.15s',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: 38,
                        height: 38,
                        bgcolor: item.avatarColor,
                        fontSize: 13,
                        fontWeight: 700,
                        boxShadow: `0 2px 6px ${item.avatarColor}55`,
                      }}
                    >
                      {item.initials}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.25 }}>
                        {item.user}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.4 }}>
                        {item.action}
                      </Typography>
                    }
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.75, ml: 2, flexShrink: 0 }}>
                    <Chip
                      label={item.tag}
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: 11,
                        fontWeight: 600,
                        bgcolor: TAG_COLORS[item.tag]?.bg ?? 'action.hover',
                        color: TAG_COLORS[item.tag]?.color ?? 'text.primary',
                        border: 'none',
                        letterSpacing: '0.2px',
                      }}
                    />
                    <Typography variant="caption" sx={{ color: 'text.disabled', whiteSpace: 'nowrap', fontSize: 11 }}>
                      {item.time}
                    </Typography>
                  </Box>
                </ListItem>
                {i < ACTIVITY.length - 1 && (
                  <Divider sx={{ borderColor: 'var(--rds-divider)', mx: 3 }} />
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* Quick Stats sidebar panel */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* System health */}
          <Box
            sx={{
              bgcolor: 'var(--rds-background-paper)',
              border: '1px solid var(--rds-divider)',
              borderRadius: 'var(--rds-border-radius-md)',
              overflow: 'hidden',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <Box sx={{ px: 2.5, py: 2, borderBottom: '1px solid var(--rds-divider)' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                System Health
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Real-time metrics
              </Typography>
            </Box>
            <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {QUICK_STATS.map((stat) => (
                <Box key={stat.label} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: 1.5,
                        bgcolor: `${stat.color}18`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: stat.color }}>
                    {stat.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Goal card */}
          <Box
            sx={{
              p: 2.5,
              borderRadius: 'var(--rds-border-radius-md)',
              background: DASHBOARD_GRADIENT,
              color: DASHBOARD_COLORS.onGradient,
              boxShadow: `0 4px 20px ${DASHBOARD_TINT.indigo35}`,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5, opacity: 0.9, fontSize: 13 }}>
              Monthly Goal
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.5px' }}>
              78%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={78}
              sx={{
                height: 6,
                borderRadius: 99,
                bgcolor: DASHBOARD_TINT.white25,
                mb: 1.5,
                '& .MuiLinearProgress-bar': { bgcolor: DASHBOARD_COLORS.onGradient, borderRadius: 99 },
              }}
            />
            <Typography variant="caption" sx={{ opacity: 0.75, fontSize: 12 }}>
              $37,668 of $48,300 target
            </Typography>
          </Box>
        </Box>
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
