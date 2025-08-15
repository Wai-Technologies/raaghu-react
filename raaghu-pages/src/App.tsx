
import './App.css';
// If RdsBreadcrumbs is a default export:
import RdsSidebar from '../../raaghu-elements/rds-sidebar/rds-sidebar';
import React from 'react';
import { Home as HomeIcon } from '@mui/icons-material'; // Example: using Material UI Home icon
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';


function App() {
  return (
    <>
      {/* <div className="mb-2 logo-row">
        <a href="https://raaghu.io" target="_blank" rel="noopener noreferrer">
          <img src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/Raaghu%20Logo%20SD.svg" className="logo" alt="Raaghu Logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React Logo" />
        </a>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite Logo" />
        </a>
      </div> */}
      <h1 className="mb-4 font-extrabold">Raaghu with React + Vite</h1>
      <div>
        <p>
          Start creating pages by using Application Shells, Layouts, Component, Elements, Charts and more.
        </p>
      </div>
      <p className="read-the-docs">
<RdsSidebar
    items={[
        {
            icon: <HomeIcon />,
            label: "Home",
            onClick: () => {},
        },
        {
            active: true,
            icon: <DashboardIcon />,
            label: "Dashboard",
            onClick: () => {},
        },
        {
            icon: <AccountCircleIcon />,
            label: "Profile",
            onClick: () => {},
        },
        {
            icon: <SettingsIcon />,
            label: "Settings",
            onClick: () => {},
        },
        {
            icon: <HelpIcon />,
            label: "Help",
            onClick: () => {},
        },
    ]}
    isOpen={true}
    layout="list"
    typeOf="fixed"
/>
      </p>
    </>
  )
}

export default App;
