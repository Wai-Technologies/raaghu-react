import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import RdsAppBar from '@raaghu/elements/rds-app-bar/rds-app-bar';
import RdsButton from '@raaghu/elements/rds-button/rds-button';
import RdsBadge from '@raaghu/elements/rds-badge/rds-badge';
import RdsSidebar from '@raaghu/elements/rds-sidebar/rds-sidebar';
import { ProfileMenu } from '@raaghu/elements/shared/components/ProfileMenu';
import RdsCompAppShell, { AppShellDisplayType } from '@raaghu/layouts/rds-comp-app-shell/rds-comp-app-shell';
import { useRaaghuTheme } from '@raaghu/themes/src/provider/RaaghuThemeProvider';
import { Notifications as BellIcon } from '@mui/icons-material';
import { env } from '@/core/env';
import { mainNavigation } from '@/routes/navigation';
import '@raaghu/elements/rds-app-bar/rds-app-bar.scss';
import '@raaghu/elements/rds-button/rds-button.scss';
import '@raaghu/elements/rds-badge/rds-badge.scss';
import '@raaghu/elements/rds-sidebar/rds-sidebar.scss';
import '@raaghu/layouts/rds-comp-app-shell/rds-comp-app-shell.scss';
import '@/styles/layout.css';

function ShellTopBar() {
  const { toggleMode, isDark } = useRaaghuTheme();

  return (
    <div className="rds-appshell-appbar rds-appshell-appbar--fixed">
      <RdsAppBar
        color="default"
        logo={<img alt="Raaghu" className="app-logo" src={env.logoUrl} />}
        showLogo
        showMenuButton
        showSearch={false}
        title={env.appName}
        rightActions={
          <>
            <RdsButton
              style="outlined"
              size="small"
              onClick={toggleMode}
              text={isDark ? 'Light mode' : 'Dark mode'}
            />
            <RdsBadge badgeContent={3} color="error">
              <BellIcon />
            </RdsBadge>
            <ProfileMenu email={env.user.email} name={env.user.name} />
          </>
        }
      />
    </div>
  );
}

export default function Shell() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const sidebarItems = mainNavigation.map((item) => ({
    icon: item.icon,
    label: item.label,
    active: item.path === '/' ? pathname === '/' : pathname.startsWith(item.path),
    onClick: () => navigate(item.path),
  }));

  return (
    <RdsCompAppShell
      displayType={AppShellDisplayType.Default}
      topbar={<ShellTopBar />}
      sidebar={
        <RdsSidebar
          avatarCollapsedSrc={env.logoUrl}
          avatarSrc={env.user.avatarUrl}
          isOpen
          items={sidebarItems}
          variant="permanent"
          layout="raaghu"
          showLogo={false}
        />
      }
    >
      <main className="app-main">
        <Outlet />
      </main>
    </RdsCompAppShell>
  );
}
