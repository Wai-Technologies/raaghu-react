import { Fragment, useCallback, useEffect, useMemo, useState, type MouseEvent } from 'react';
import RdsCompAppShell, { AppShellDisplayType } from '@raaghu/layouts/rds-comp-app-shell/rds-comp-app-shell';
import RdsAppBar from '@raaghu/elements/rds-app-bar/rds-app-bar';
import RdsSidebar from '@raaghu/elements/rds-sidebar/rds-sidebar';
import { useRaaghuLogoSrc } from '@raaghu/elements/shared/hooks/useRaaghuLogoSrc';
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
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText as MenuItemText,
  useMediaQuery,
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
  SettingsBrightness as SystemThemeIcon,
  PeopleAlt as PeopleIcon,
  AttachMoney as MoneyIcon,
  WorkOutline as WorkIcon,
  ConfirmationNumber as TicketIcon,
  CheckCircleOutline as CheckIcon,
  ErrorOutline as ErrorIcon,
  ScheduleOutlined as ClockIcon,
  FlashOn as FlashIcon,
} from '@mui/icons-material';


/** Soft tint from a semantic token — preferred over hardcoded rgba(hex). */
const tint = (token: string, percent: number) =>
  `color-mix(in srgb, ${token} ${percent}%, transparent)`;

const COLOR = {
  primary: 'var(--rds-primary-main)',
  secondary: 'var(--rds-secondary-main)',
  success: 'var(--rds-success-main)',
  warning: 'var(--rds-warning-main)',
  error: 'var(--rds-error-main)',
  info: 'var(--rds-info-main)',
  white: 'var(--rds-color-white)',
} as const;

const KPI_CARDS = [
  {
    label: 'Total Users',
    value: '12,847',
    trend: '+12%',
    trendUp: true,
    subtitle: 'vs last month',
    accent: COLOR.primary,
    iconBg: tint(COLOR.primary, 12),
    icon: <PeopleIcon sx={{ fontSize: 22, color: COLOR.primary }} />,
    progress: 72,
  },
  {
    label: 'Revenue',
    value: '$48,293',
    trend: '+8%',
    trendUp: true,
    subtitle: 'vs last month',
    accent: COLOR.success,
    iconBg: tint(COLOR.success, 12),
    icon: <MoneyIcon sx={{ fontSize: 22, color: COLOR.success }} />,
    progress: 58,
  },
  {
    label: 'Active Projects',
    value: '156',
    trend: '+3',
    trendUp: true,
    subtitle: 'new this week',
    accent: COLOR.secondary,
    iconBg: tint(COLOR.secondary, 12),
    icon: <WorkIcon sx={{ fontSize: 22, color: COLOR.secondary }} />,
    progress: 81,
  },
  {
    label: 'Open Tickets',
    value: '24',
    trend: '-6',
    trendUp: false,
    subtitle: 'resolved today',
    accent: COLOR.warning,
    iconBg: tint(COLOR.warning, 12),
    icon: <TicketIcon sx={{ fontSize: 22, color: COLOR.warning }} />,
    progress: 35,
  },
];

const ACTIVITY = [
  { initials: 'AM', user: 'Alice Martin',  action: 'Closed ticket #1284 — Login timeout',               time: '5m ago',  tag: 'Ticket',  avatarColor: COLOR.primary },
  { initials: 'BC', user: 'Bob Chen',      action: 'Created new project "Q3 Launch"',                   time: '23m ago', tag: 'Project', avatarColor: COLOR.success },
  { initials: 'SK', user: 'Sarah Kim',     action: 'Updated user permissions for Marketing team',       time: '1h ago',  tag: 'Users',   avatarColor: COLOR.secondary },
  { initials: 'JP', user: 'James Patel',   action: 'Deployed release v2.4.1 to production',             time: '3h ago',  tag: 'Deploy',  avatarColor: COLOR.error },
  { initials: 'ED', user: 'Emily Davis',   action: 'Resolved ticket #1279 — Dashboard crash on mobile', time: '5h ago',  tag: 'Ticket',  avatarColor: COLOR.info },
];

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  Ticket:  { bg: tint(COLOR.primary, 10),   color: COLOR.primary },
  Project: { bg: tint(COLOR.success, 10),   color: COLOR.success },
  Users:   { bg: tint(COLOR.secondary, 10), color: COLOR.secondary },
  Deploy:  { bg: tint(COLOR.error, 10),     color: COLOR.error },
};

const QUICK_STATS = [
  { label: 'Uptime',          value: '99.9%', icon: <CheckIcon sx={{ fontSize: 18, color: COLOR.success }} />, color: COLOR.success, iconBg: tint(COLOR.success, 10) },
  { label: 'Avg. Response',   value: '142ms', icon: <FlashIcon sx={{ fontSize: 18, color: COLOR.primary }} />, color: COLOR.primary, iconBg: tint(COLOR.primary, 10) },
  { label: 'Critical Issues', value: '2',     icon: <ErrorIcon sx={{ fontSize: 18, color: COLOR.error }} />,   color: COLOR.error,   iconBg: tint(COLOR.error, 10) },
  { label: 'Pending Reviews', value: '18',    icon: <ClockIcon sx={{ fontSize: 18, color: COLOR.warning }} />, color: COLOR.warning, iconBg: tint(COLOR.warning, 10) },
];

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'users',     label: 'Users',     icon: <PersonIcon />    },
  { id: 'projects',  label: 'Projects',  icon: <ProjectsIcon />  },
  { id: 'settings',  label: 'Settings',  icon: <SettingsIcon />  },
  { id: 'help',      label: 'Help',      icon: <HelpIcon />      },
];


export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [themeMenuAnchor, setThemeMenuAnchor] = useState<HTMLElement | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const { mode, setMode, isDark } = useRaaghuTheme();

  useEffect(() => {
    if (!isMobile) {
      setMobileSidebarOpen(false);
    }
  }, [isMobile]);

  const handleThemeMenuOpen = useCallback((event: MouseEvent<HTMLElement>) => {
    setThemeMenuAnchor(event.currentTarget);
  }, []);

  const handleThemeMenuClose = useCallback(() => {
    setThemeMenuAnchor(null);
  }, []);

  const handleThemeModeSelect = useCallback((nextMode: 'light' | 'dark' | 'system') => {
    setMode(nextMode);
    setThemeMenuAnchor(null);
  }, [setMode]);

  const themeIcon = useMemo(() => (
    mode === 'system' ? <SystemThemeIcon sx={{ fontSize: 20 }} /> :
    isDark ? <SunIcon sx={{ fontSize: 20 }} /> :
    <MoonIcon sx={{ fontSize: 20 }} />
  ), [mode, isDark]);

  const logoSrc = useRaaghuLogoSrc();

  const topbar = useMemo(() => (
    <div className="rds-appshell-appbar rds-appshell-appbar--fixed">
      <RdsAppBar
        color="default"
        title=""
        showLogo
        logo={<img src={logoSrc} alt="Raaghu Design System" style={{ height: 28, objectFit: 'contain' }} />}
        showMenuButton={isMobile}
        showSearch
        searchPlaceholder="Search…"
        onSearchChange={() => {}}
        actions={
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <IconButton
                size="small"
                aria-label="notifications, 3 unread"
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
                onClick={handleThemeMenuOpen}
                aria-label="change theme"
                aria-controls={themeMenuAnchor ? 'dashboard-theme-menu' : undefined}
                aria-haspopup="menu"
                aria-expanded={themeMenuAnchor ? 'true' : undefined}
                sx={{
                  color: 'text.secondary',
                  bgcolor: 'action.hover',
                  borderRadius: 1.5,
                  '&:hover': { bgcolor: 'action.selected' },
                }}
              >
                {themeIcon}
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    background: `linear-gradient(135deg, ${COLOR.primary} 0%, ${COLOR.secondary} 100%)`,
                    color: COLOR.white,
                    fontSize: 13,
                    fontWeight: 700,
                    boxShadow: `0 2px 8px ${tint(COLOR.primary, 40)}`,
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
            <Menu
              id="dashboard-theme-menu"
              anchorEl={themeMenuAnchor}
              open={Boolean(themeMenuAnchor)}
              onClose={handleThemeMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem selected={mode === 'system'} onClick={() => handleThemeModeSelect('system')}>
                <ListItemIcon>
                  <SystemThemeIcon fontSize="small" />
                </ListItemIcon>
                <MenuItemText primary="System" secondary="Follow device theme" />
              </MenuItem>
              <MenuItem selected={mode === 'light'} onClick={() => handleThemeModeSelect('light')}>
                <ListItemIcon>
                  <SunIcon fontSize="small" />
                </ListItemIcon>
                <MenuItemText primary="Light" secondary="Always use light theme" />
              </MenuItem>
              <MenuItem selected={mode === 'dark'} onClick={() => handleThemeModeSelect('dark')}>
                <ListItemIcon>
                  <MoonIcon fontSize="small" />
                </ListItemIcon>
                <MenuItemText primary="Dark" secondary="Always use dark theme" />
              </MenuItem>
            </Menu>
          </>
        }
      />
    </div>
  ), [logoSrc, mode, themeMenuAnchor, isMobile, themeIcon, handleThemeMenuOpen, handleThemeMenuClose, handleThemeModeSelect]);

  const sidebar = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        sx={{
          height: 64,
          px: 2.5,
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          bgcolor: 'background.paper',
          borderBottom: '1px solid var(--rds-divider)',
        }}
      >
        <img src={logoSrc} alt="Raaghu Design System" style={{ height: 26, objectFit: 'contain' }} />
      </Box>
      <RdsSidebar
        user={{ avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" }}
        avatarCollapsedSrc={logoSrc}
        open
        showLogo={false}
        variant="permanent"
        layout="raaghu"
        items={NAV_ITEMS.map(item => ({
          icon: item.icon,
          label: item.label,
          selected: activeNav === item.id,
          onClick: () => {
            setActiveNav(item.id);
            if (isMobile) {
              setMobileSidebarOpen(false);
            }
          },
        }))}
      />
    </Box>
  );

  const content = (
    <Box sx={{ p: { xs: 2, md: 3 }, minHeight: '100vh', bgcolor: 'background.default' }}>
      <Toolbar />

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
          icon={<CheckIcon sx={{ fontSize: '14px !important', color: `${COLOR.success} !important` }} />}
          label="All systems operational"
          size="small"
          sx={{
            bgcolor: tint(COLOR.success, 10),
            color: COLOR.success,
            fontWeight: 600,
            fontSize: 12,
            border: `1px solid ${tint(COLOR.success, 20)}`,
            height: 28,
          }}
        />
      </Box>

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
              bgcolor: 'background.paper',
              border: '1px solid var(--rds-divider)',
              borderRadius: 'var(--rds-border-radius-md)',
              boxShadow: 'var(--rds-elevation-1)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              cursor: 'default',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 'var(--rds-elevation-2)',
              },
            }}
          >
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

            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, letterSpacing: '-0.5px', lineHeight: 1 }}>
              {kpi.value}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
              {kpi.trendUp
                ? <TrendingUp sx={{ fontSize: 15, color: COLOR.success }} />
                : <TrendingDown sx={{ fontSize: 15, color: COLOR.warning }} />}
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: kpi.trendUp ? COLOR.success : COLOR.warning,
                }}
              >
                {kpi.trend}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                &nbsp;{kpi.subtitle}
              </Typography>
            </Box>

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

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 320px' },
          gap: 2.5,
        }}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            border: '1px solid var(--rds-divider)',
            borderRadius: 'var(--rds-border-radius-md)',
            overflow: 'hidden',
            boxShadow: 'var(--rds-elevation-1)',
          }}
        >
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
                color: COLOR.primary,
                cursor: 'pointer',
                fontWeight: 600,
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                bgcolor: tint(COLOR.primary, 8),
                '&:hover': { bgcolor: tint(COLOR.primary, 14) },
                transition: 'background 0.15s',
              }}
            >
              View all
            </Typography>
          </Box>

          <List disablePadding>
            {ACTIVITY.map((item, i) => (
              <Fragment key={`${item.user}-${i}`}>
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
                        color: COLOR.white,
                        fontSize: 13,
                        fontWeight: 700,
                        boxShadow: `0 2px 6px ${tint(item.avatarColor, 33)}`,
                      }}
                    >
                      {item.initials}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.user}
                    secondary={item.action}
                    slotProps={{
                      primary: { variant: 'body2', sx: { fontWeight: 600, mb: 0.25 } },
                      secondary: { variant: 'caption', sx: { color: 'text.secondary', lineHeight: 1.4 } },
                    }}
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
              </Fragment>
            ))}
          </List>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              border: '1px solid var(--rds-divider)',
              borderRadius: 'var(--rds-border-radius-md)',
              overflow: 'hidden',
              boxShadow: 'var(--rds-elevation-1)',
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
                        bgcolor: stat.iconBg,
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

          <Box
            sx={{
              p: 2.5,
              borderRadius: 'var(--rds-border-radius-md)',
              background: `linear-gradient(135deg, ${COLOR.primary} 0%, ${COLOR.secondary} 100%)`,
              color: COLOR.white,
              boxShadow: `0 4px 20px ${tint(COLOR.primary, 35)}`,
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
                bgcolor: tint(COLOR.white, 25),
                mb: 1.5,
                '& .MuiLinearProgress-bar': { bgcolor: COLOR.white, borderRadius: 99 },
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
      header={topbar}
      sidebar={sidebar}
      sidebarOpen={isMobile ? mobileSidebarOpen : false}
      onSidebarOpenChange={(open) => {
        if (isMobile) {
          setMobileSidebarOpen(open);
        }
      }}
    >
      {content}
    </RdsCompAppShell>
  );
}
