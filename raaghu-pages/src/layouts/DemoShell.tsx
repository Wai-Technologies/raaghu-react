import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Dashboard, Extension, ViewModule, Home } from '@mui/icons-material';
import RdsCompAppShell, { AppShellDisplayType } from '@raaghu/layouts/rds-comp-app-shell/rds-comp-app-shell';
import RdsSidebar from '@raaghu/elements/rds-sidebar/rds-sidebar';
import DemoTopBar from '../components/DemoTopBar';
import '@raaghu/layouts/rds-comp-app-shell/rds-comp-app-shell.scss';
import '@raaghu/elements/rds-sidebar/rds-sidebar.scss';
import '@raaghu/elements/rds-app-bar/rds-app-bar.scss';

const LOGO_URL =
  'https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png';

export default function DemoShell() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  const sidebarItems = [
    {
      icon: <Home />,
      label: 'Home',
      active: path === '/',
      onClick: () => navigate('/'),
    },
    {
      icon: <Dashboard />,
      label: 'Dashboard',
      active: path === '/',
      onClick: () => navigate('/'),
    },
    {
      icon: <Extension />,
      label: 'Elements',
      active: path.startsWith('/elements'),
      onClick: () => navigate('/elements'),
    },
    {
      icon: <ViewModule />,
      label: 'Components',
      active: path.startsWith('/components'),
      onClick: () => navigate('/components'),
    },
  ];

  const handleMobileSidebarToggle = () => {
    setMobileSidebarOpen((open) => !open);
  };

  const handleBackdropClick = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <>
      {mobileSidebarOpen && (
        <div className="mobile-sidebar-backdrop" onClick={handleBackdropClick} role="presentation" />
      )}
      <RdsCompAppShell
        displayType={AppShellDisplayType.Default}
        mobileSidebarOpen={mobileSidebarOpen}
        onMobileSidebarToggle={handleMobileSidebarToggle}
        topbar={<DemoTopBar onMenuClick={handleMobileSidebarToggle} />}
        sidebar={
          <RdsSidebar
            avatarCollapsedSrc={LOGO_URL}
            avatarSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            isOpen
            items={sidebarItems}
            variant="permanent"
            layout="raaghu"
            showLogo={false}
          />
        }
      >
        <div className="rds-demo-page-content">
          <Outlet />
        </div>
      </RdsCompAppShell>
    </>
  );
}
