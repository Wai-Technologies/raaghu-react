import React from "react"
import  RdsSidebar  from "./rds-sidebar"
import figma from "@figma/code-connect"
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import { RAAGHU_LOGO_LIGHT_URL } from '../shared/constants/raaghu-logo';
figma.connect(
  RdsSidebar,
  "https://www.figma.com/design/vziFLZAgMFi8wA5SlikLh5/Raaghu---Design-System?node-id=810-12671",
  {
    props: {
      layout: figma.enum("📱 Layout", {
        "Raaghu": "raaghu",
        "Lists": "list",
        "Toolbar": "toolbar"
      }),
      typeOf: figma.enum("⚠️ Type", {
        "Collapsed": "collapse",
        "Expanded": "expanded",
        "Fixed": "fixed"
      }),
      platform:figma.enum("💻 Platform", {
        "ABP List": "abp-list",
        "ANZ List": "anz-list"
      }),
    },
    example: (props) => <RdsSidebar items={[
      {
        icon: <HomeIcon />,
        label: 'Home',
        onClick: () => {}
      },
      {
        active: true,
        icon: <DashboardIcon />,
        label: 'Dashboard',
        onClick: () => {}
      },
      {
        icon: <AccountCircleIcon />,
        label: 'Profile',
        onClick: () => {}
      },
      {
        icon: <SettingsIcon />,
        label: 'Settings',
        onClick: () => {}
      },
      {
        icon: <HelpIcon />,
        label: 'Help',
        onClick: () => {}
      }
    ]} showLogo isOpen={true} {...props} 
    avatarSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    avatarCollapsedSrc={RAAGHU_LOGO_LIGHT_URL}
    />,
  },
)
