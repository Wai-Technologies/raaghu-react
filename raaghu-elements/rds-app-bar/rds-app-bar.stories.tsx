import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfileMenu } from './ProfileMenu';
import RdsAppBar from './rds-app-bar';
import { Button, IconButton, Avatar, Badge, Box, Divider, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { Menu as MenuIcon, Home, Search, Notifications, AccountCircle, Brightness5, Brightness2, Brightness4, Logout, Security, Close } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import RdsButton from '../rds-button/rds-button';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import './rds-app-bar.scss';
import { TextField } from '@mui/material';

//  Reusable Icon Components
const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 8.92615C17.0011 8.75532 16.9667 8.58612 16.8989 8.42932C16.8311 8.27252 16.7314 8.13155 16.6061 8.01538L9 1L1.39387 8.01538C1.26861 8.13155 1.1689 8.27252 1.1011 8.42932C1.03329 8.58612 0.998872 8.75532 1.00003 8.92615V15.7692C1.00003 16.0957 1.1297 16.4087 1.36051 16.6395C1.59132 16.8703 1.90437 17 2.23079 17H15.7692C16.0956 17 16.4087 16.8703 16.6395 16.6395C16.8703 16.4087 17 16.0957 17 15.7692V8.92615Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CompassIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.00098 17C13.4193 17 17.001 13.4183 17.001 9C17.001 4.58172 13.4193 1 9.00098 1C4.5827 1 1.00098 4.58172 1.00098 9C1.00098 13.4183 4.5827 17 9.00098 17Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.61636 13.3077L12.0779 5.92308L4.69328 8.38462L7.77021 10.2308L9.61636 13.3077Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VideoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.00098 5.30769H17.001M5.30867 5.30769L7.15482 1M10.8471 5.30769L12.6933 1M2.23175 1H15.7702C16.4499 1 17.001 1.55103 17.001 2.23077V15.7692C17.001 16.449 16.4499 17 15.7702 17H2.23175C1.55201 17 1.00098 16.449 1.00098 15.7692V2.23077C1.00098 1.55103 1.55201 1 2.23175 1ZM7.14252 13.3815V8.66769C7.14596 8.59525 7.16712 8.52476 7.20416 8.46241C7.2412 8.40006 7.29298 8.34776 7.35495 8.31009C7.41692 8.27242 7.4872 8.25054 7.5596 8.24637C7.632 8.24219 7.70432 8.25585 7.77021 8.28615L11.8564 10.6369C11.9225 10.6777 11.9772 10.7347 12.0151 10.8026C12.053 10.8705 12.0729 10.9469 12.0729 11.0246C12.0729 11.1023 12.053 11.1788 12.0151 11.2466C11.9772 11.3145 11.9225 11.3715 11.8564 11.4123L7.77021 13.7754C7.70318 13.8029 7.63054 13.8141 7.55833 13.8079C7.48613 13.8018 7.41643 13.7785 7.35505 13.7399C7.29366 13.7014 7.24235 13.6488 7.20539 13.5865C7.16842 13.5241 7.14687 13.4539 7.14252 13.3815Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.00601 17L2.21608 9.63024C-1.4741 5.20839 3.95046 -3.28158 9.00601 3.58704C14.0615 -3.28158 19.4615 5.23786 15.7959 9.63024L9.00601 17Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.15482 15.5718C7.26121 15.9808 7.50018 16.3429 7.83427 16.6013C8.16837 16.8598 8.57871 17 9.00098 17C9.42325 17 9.83359 16.8598 10.1677 16.6013C10.5018 16.3429 10.7407 15.9808 10.8471 15.5718M9.00098 1C10.4013 1 11.7443 1.55673 12.7345 2.54773C13.7247 3.53872 14.281 4.8828 14.281 6.28427C14.281 12.1598 16.4225 13.3177 17.001 13.3177H1.00098C1.59175 13.3177 3.72098 12.1475 3.72098 6.28427C3.72098 4.8828 4.27726 3.53872 5.26745 2.54773C6.25764 1.55673 7.60063 1 9.00098 1Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CameraIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.3467 3.77039L15.3667 6.68558M1.38725 8.04638C3.5076 6.05199 4.77532 4.79199 8.2178 1.6568C8.53773 1.3624 8.7937 1.1216 8.92007 1C9.03604 1.108 9.19922 1.2584 9.39997 1.4376C9.49915 1.5272 9.57353 1.59279 9.59192 1.60879C10.1742 2.12559 11.7515 3.53759 12.6513 4.35439C14.1366 5.70559 15.166 6.67438 16.5529 7.94158C16.6788 8.05644 16.7794 8.19629 16.8482 8.35222C16.9171 8.50814 16.9527 8.67672 16.9528 8.84718L17 15.6696C17.0011 15.8307 16.9705 15.9905 16.9099 16.1399C16.8494 16.2892 16.76 16.4251 16.6468 16.5399C16.5337 16.6547 16.3991 16.7461 16.2507 16.8088C16.1023 16.8715 15.9429 16.9044 15.7818 16.9056L6.76691 16.968C6.76691 16.9376 6.77652 16.9072 6.77572 16.8768L6.73171 10.5416C6.73466 10.3468 6.69869 10.1534 6.6259 9.97275C6.5531 9.79208 6.44495 9.62779 6.3078 9.4895C6.17065 9.35121 6.00727 9.24172 5.82723 9.16745C5.6472 9.09319 5.45413 9.05565 5.25938 9.05704C5.06464 9.05843 4.87216 9.0987 4.69319 9.17552C4.51423 9.25234 4.35241 9.36414 4.21724 9.50437C4.08207 9.64459 3.97627 9.81042 3.90605 9.99211C3.83584 10.1738 3.8026 10.3677 3.80832 10.5624L3.85233 16.8976C3.85233 16.9288 3.86032 16.9584 3.86192 16.9888L2.28706 17C2.12593 17.0011 1.96615 16.9705 1.81684 16.9099C1.66754 16.8493 1.53163 16.7599 1.41688 16.6468C1.30213 16.5336 1.21079 16.399 1.14806 16.2505C1.08534 16.1021 1.05246 15.9427 1.05131 15.7816L1.00012 8.95918C0.997736 8.78879 1.03085 8.61978 1.09737 8.4629C1.16388 8.30602 1.26233 8.16472 1.38644 8.04798L1.38725 8.04638ZM10.2478 11.6264L13.3015 11.6052L13.3227 14.6595L10.269 14.6807L10.2478 11.6264Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

//  Icons for sub-header tabs
const ActivitiesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.501 5.23077H18.901C19.3253 5.23077 19.7323 5.36044 20.0323 5.59125C20.3324 5.82207 20.501 6.13512 20.501 6.46154V18.7692C20.501 19.0957 20.3324 19.4087 20.0323 19.6395C19.7323 19.8703 19.3253 20 18.901 20H6.10098C5.67663 20 5.26966 19.8703 4.96961 19.6395C4.66955 19.4087 4.50098 19.0957 4.50098 18.7692V6.46154C4.50098 6.13512 4.66955 5.82207 4.96961 5.59125C5.26966 5.36044 5.67663 5.23077 6.10098 5.23077H8.50098M16.501 5.23077C16.501 4.55103 15.7846 4 14.901 4H10.101C9.21732 4 8.50098 4.55103 8.50098 5.23077M16.501 5.23077L16.501 5.84615C16.501 6.52589 15.7846 7.07692 14.901 7.07692H10.101C9.21732 7.07692 8.50098 6.52589 8.50098 5.84615L8.50098 5.23077M8.50098 10.1538H16.501M8.50098 13.2308H16.501M8.50098 16.3077H16.501" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DirectoryIcon = () => (
  <svg width="18" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.19625 4.08642V1.61728C4.19625 1.45357 4.26106 1.29656 4.37642 1.1808C4.49178 1.06503 4.64824 1 4.81139 1H15.2687C15.4319 1 15.5883 1.06503 15.7037 1.1808C15.8191 1.29656 15.8839 1.45357 15.8839 1.61728V6.55555M9.11735 4.08642H12.8082M1.00984 15.8889L0.505424 7.24691C0.494935 7.15985 0.503051 7.07155 0.529232 6.98788C0.555413 6.90422 0.599058 6.82711 0.65726 6.7617C0.715462 6.69628 0.786884 6.64406 0.866771 6.60852C0.946658 6.57297 1.03318 6.55492 1.12056 6.55555H6.79213C6.93002 6.55641 7.06379 6.60282 7.17276 6.68762C7.28173 6.77242 7.35982 6.89088 7.39497 7.02469L7.88708 9.02468H15.8839C15.969 9.02441 16.0532 9.04186 16.1312 9.07592C16.2092 9.10998 16.2794 9.15992 16.3372 9.22258C16.395 9.28523 16.4392 9.35924 16.4671 9.43993C16.4949 9.52062 16.5058 9.60623 16.499 9.69135L16.0192 15.8642C15.9944 16.1742 15.8539 16.4634 15.6258 16.674C15.3977 16.8846 15.0989 17.001 14.7889 17H2.24011C1.93406 17.0015 1.63843 16.8885 1.41094 16.6831C1.18345 16.4776 1.04044 16.1945 1.00984 15.8889Z" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const ProjectsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.73175 9.61538H0.500977V17H5.73175M5.73175 17V5.92308H11.2702M5.73175 17L11.2702 17M11.2702 17L16.501 17V1H11.2702V17Z" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path d="M1.73175 3.46154C1.40533 3.46154 1.09227 3.59121 0.861461 3.82202C0.630647 4.05284 0.500977 4.36589 0.500977 4.69231V15.7692C0.500977 16.0957 0.630647 16.4087 0.861461 16.6395C1.09227 16.8703 1.40533 17 1.73175 17H15.2702C15.5966 17 15.9097 16.8703 16.1405 16.6395C16.3713 16.4087 16.501 16.0957 16.501 15.7692V4.69231C16.501 4.36589 16.3713 4.05284 16.1405 3.82202C15.9097 3.59121 15.5966 3.46154 15.2702 3.46154H12.8087M4.19328 1V5.92308M12.8087 1V5.92308M4.19328 3.46154H10.3471M4.80867 9.61539C4.80867 9.95525 4.53315 10.2308 4.19328 10.2308C3.85342 10.2308 3.5779 9.95525 3.5779 9.61539C3.5779 9.27552 3.85342 9 4.19328 9C4.53315 9 4.80867 9.27552 4.80867 9.61539ZM9.11636 9.61539C9.11636 9.95525 8.84084 10.2308 8.50098 10.2308C8.16111 10.2308 7.88559 9.95525 7.88559 9.61539C7.88559 9.27552 8.16111 9 8.50098 9C8.84084 9 9.11636 9.27552 9.11636 9.61539ZM13.4241 9.61539C13.4241 9.95525 13.1485 10.2308 12.8087 10.2308C12.4688 10.2308 12.1933 9.95525 12.1933 9.61539C12.1933 9.27552 12.4688 9 12.8087 9C13.1485 9 13.4241 9.27552 13.4241 9.61539ZM4.80867 13.3077C4.80867 13.6476 4.53315 13.9231 4.19328 13.9231C3.85342 13.9231 3.5779 13.6476 3.5779 13.3077C3.5779 12.9678 3.85342 12.6923 4.19328 12.6923C4.53315 12.6923 4.80867 12.9678 4.80867 13.3077Z" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

//  Reusable Actions Component
const LogoSearchTabsLeftActions = () => (
  <div className="rds-logo-search-tabs__left-actions">
    <HomeIcon />
    <CompassIcon />
    <VideoIcon />
    <HeartIcon />
    <BellIcon />
  </div>
);

// Dashboard menu shown next to logo: shows 'Dashboard' text and a sun icon button to open theme choices
const DashboardMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ fontWeight: 500 }}>Dashboard</div>
      <IconButton size="small" color="inherit" onClick={handleOpen} aria-label="theme">
        {/* small sun-like icon similar to provided attachment */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M12 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M12 21v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M4.2 4.2l1.4 1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M18.4 18.4l1.4 1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M1 12h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M21 12h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M4.2 19.8l1.4-1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M18.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
        <MenuItem onClick={() => {}}>
          <Brightness5 fontSize="small" style={{ marginRight: 8 }} />
          Light
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <Brightness2 fontSize="small" style={{ marginRight: 8 }} />
          Dark
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <Brightness4 fontSize="small" style={{ marginRight: 8 }} />
          Semi Dark
        </MenuItem>
      </Menu>
    </div>
  );
};

// Theme icon + menu (icon-only variant so we can place it on the right)
const ThemeMenuIcon = ({ showDropdown = true, onClick }: { showDropdown?: boolean; onClick?: (e: React.MouseEvent<HTMLElement>) => void }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  return (
    <>
      <IconButton
        size="small"
        color="inherit"
        onClick={(e) => {
          // If an external onClick handler is provided, call it and don't open the menu
          if (onClick) {
            onClick(e);
            return;
          }
          handleOpen(e);
        }}
        aria-label="theme"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M12 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M12 21v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M4.2 4.2l1.4 1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M18.4 18.4l1.4 1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M1 12h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M21 12h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M4.2 19.8l1.4-1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M18.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        {showDropdown ? (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 6 }} xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : null}
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
        <MenuItem onClick={() => {}}>
          <Brightness5 fontSize="small" style={{ marginRight: 8 }} />
          Light
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <Brightness2 fontSize="small" style={{ marginRight: 8 }} />
          Dark
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <Brightness4 fontSize="small" style={{ marginRight: 8 }} />
          Semi Dark
        </MenuItem>
      </Menu>
    </>
  );
};

// Language selector menu (matches screenshot list)
const LanguageMenu = () => {
  const languages = [
    'العربية',
    'English (UK)',
    'English',
    'Čeština',
    'Magyar',
    'Français',
    'Finnish',
    'Italiano',
    'Português',
    'Hindi',
    'Русский',
    '繁體中文',
    'Türkçe',
    '简体中文',
    'Slovak',
    'Deutsch',
    'Español',
    'test',
  ];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selected, setSelected] = React.useState('English (UK)');
  const open = Boolean(anchorEl);
  // Make the menu take almost the full viewport height (leave some offset for appbar/padding).
  // Use a CSS calc so it responds to viewport changes: subtract 120px as a safe offset.
  const menuHeightCss = 'calc(100vh - 120px)';
  const shortCode = React.useMemo(() => {
    // derive a short code (e.g., English -> EN, '繁體中文' -> 繁體)
    if (!selected) return 'EN';
    if (selected.includes('English')) return 'EN';
    if (selected.includes('Türkçe')) return 'TR';
    if (selected.includes('Français')) return 'FR';
    if (selected.includes('Español')) return 'ES';
    if (selected === 'العربية') return 'AR';
    // fallback to first two letters uppercase
    return selected.slice(0, 2).toUpperCase();
  }, [selected]);
  return (
    <>
      <Button color="inherit" onClick={e => setAnchorEl(e.currentTarget)} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontWeight: 600 }}>{shortCode}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        PaperProps={{
          className: 'rds-language-menu-paper',
        }}
        MenuListProps={{ className: 'rds-language-menu-list' }}
      >
        {languages.map(l => (
          <MenuItem key={l} onClick={() => setSelected(l)} style={{ width: '100%' }}>
            {l}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

// Small chat / notification style bubble icon used between theme and language
const ChatBubbleIconSmall = () => (
  <IconButton size="small" color="inherit" aria-label="chat">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8.5" cy="11.5" r="0.8" fill="currentColor" />
      <circle cx="12" cy="11.5" r="0.8" fill="currentColor" />
      <circle cx="15.5" cy="11.5" r="0.8" fill="currentColor" />
    </svg>
  </IconButton>
);

// Admin profile panel: large dropdown with avatar, name, email, actions and logout
const AdminProfileMenu = ({ name = 'Admin User', email = 'admin@example.com', onLogout }: { name?: string; email?: string; onLogout?: () => void }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const avatarTextColor = theme?.palette?.mode === 'dark' ? theme.palette.common.white : undefined;
  return (
    <>
      <Button className="rds-admin-profile__button" color="inherit" onClick={() => setOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, textTransform: 'none' }}>
        <Avatar sx={{ width: 32, height: 32, color: avatarTextColor }}>AU</Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>Hi, {name.toLowerCase()}</Typography>
          <Typography sx={{ fontSize: 11, color: 'inherit' }}>{email}</Typography>
        </Box>
        <svg className="rds-admin-profile__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 6 }} xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: 320 } }}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={() => setOpen(false)} aria-label="close">
              <Close />
            </IconButton>
          </Box>

          <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 80, height: 80, color: avatarTextColor }}>AU</Avatar>
            <Typography sx={{ fontWeight: 700, textTransform: 'lowercase' }}>{name}</Typography>
            <Typography sx={{ fontSize: 12, color: 'inherit' }}>{email}</Typography>
          </Box>

          <Divider />

          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => {}}>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Linked Accounts" secondary="Manage linked accounts" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => {}}>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Authority Delegation" secondary="Manage authority accounts" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => {}}>
                  <ListItemIcon>
                    <Security />
                  </ListItemIcon>
                  <ListItemText primary="My Account" secondary="Manage your account settings" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => {}}>
                  <ListItemIcon>
                    <Notifications />
                  </ListItemIcon>
                  <ListItemText primary="Security Logs" secondary="See recent login attempts" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => {}}>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Personal Data" secondary="Change your account settings" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>

          <Box sx={{ p: 3 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setOpen(false);
                if (onLogout) onLogout();
              }}
              startIcon={<Logout />}
            >
              LOGOUT
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
const meta: Meta<typeof RdsAppBar> = {
  title: 'Elements/AppBar',
  component: RdsAppBar,
  parameters: {
    layout: 'padded',
    // hide these autogenerated controls from the Controls panel
    controls: {
    exclude: ['component', 'onMenuClick', 'actions', 'onSearchChange', 'leftActions', 'rightActions', 'centerContent', 'tabs', 'tabValue', 'onTabChange', 'subHeader', 'logo'],
  },
  },
  tags: ['autodocs'],
  argTypes: ({
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the AppBar',
      defaultValue: 'medium',
    },
    title: {
      control: 'text',
      description: 'Title displayed in the AppBar (used if centerContent is not provided)',
      defaultValue: 'App Title',
    },
    showMenuButton: {
      control: 'boolean',
      description: 'Whether to show the hamburger menu button',
    },
    showLogo: {
      control: 'boolean',
      description: 'Toggle to show or hide logo',
      defaultValue: true,
    },
    showSearch: {
      control: 'boolean',
      description: 'Show or hide the search bar',
      defaultValue: true,
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'transparent'],
      description: 'Color variant of the header',
    },
    variantStyle: {
      name: 'style',
      control: 'select',
      options: [
        'default',
        'withSearch',
        'headerDefault',
        'logoSearchActions',
        'LogoSearchTabs',
        'LogoTabsActions',
        'LogoSearchTabsActions',
        'LogoSearchTabsActionsSubHeader',
        'Minimal',
        'Transparent',
        'withLogo',
        'HeaderWithSearch',
        'withTabs',
        'withSubHeader',
        'WithNotificationBadge',
        'WithLogoAndTabs',
        'WithUserProfile',
        'withActions',
        'WithLoginButton',
        'WithMenuButton',
        'DashboardWithLang',
      ],
    }
  } as any),
};

export default meta;
type Story = StoryObj<typeof meta>;

// Dynamic template that renders different stories based on variantStyle ("style" control)
const DynamicTemplate = (args: any) => {
  const [tabValue, setTabValue] = React.useState(args.tabValue ?? 0);
  const [searchValue, setSearchValue] = React.useState(args.searchValue ?? '');
  const [selectedSubTab, setSelectedSubTab] = React.useState(0);

  const buildSubHeader = () => (
    <div className="rds-header__sub-header-layout">
      <div className="rds-header__sub-tabs">
        <Button
          variant="text"
          color={selectedSubTab === 0 ? 'primary' : 'inherit'}
          startIcon={<Home />}
          onClick={() => setSelectedSubTab(0)}
        >
          Dashboard
        </Button>
        <Button
          variant="text"
          color={selectedSubTab === 1 ? 'primary' : 'inherit'}
          startIcon={<ActivitiesIcon />}
          onClick={() => setSelectedSubTab(1)}
        >
          Activities
        </Button>
        <Button
          variant="text"
          color={selectedSubTab === 2 ? 'primary' : 'inherit'}
          startIcon={<DirectoryIcon />}
          onClick={() => setSelectedSubTab(2)}
        >
          Directory
        </Button>
        <Button
          variant="text"
          color={selectedSubTab === 3 ? 'primary' : 'inherit'}
          startIcon={<ProjectsIcon />}
          onClick={() => setSelectedSubTab(3)}
        >
          Projects
        </Button>
        <Button
          variant="text"
          color={selectedSubTab === 4 ? 'primary' : 'inherit'}
          startIcon={<CalendarIcon />}
          onClick={() => setSelectedSubTab(4)}
        >
          Calendar
        </Button>
      </div>
    </div>
  );

  const logoImg = (
    <img
      src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
      alt="Logo"
      className="rds-story-logo"
    />
  );

  const variantStyle = (args.variantStyle || 'default') as string;
  const normalized = variantStyle.toLowerCase();

  // Common default baseline
  const normalizedShowLogo = typeof args.showLogo === 'boolean' ? args.showLogo : true;
  let config: any = {
    ...args,
    showLogo: normalizedShowLogo,
    tabValue,
    onTabChange: (v: number) => setTabValue(v),
    searchValue,
    onSearchChange: (v: string) => setSearchValue(v),
  };

  switch (normalized) {
    case 'default':
      config = {
        ...config,
        title: 'App Title',
        leftActions: (
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
        ),
        rightActions: <Button color="inherit">Login</Button>,
      };
      break;
    case 'withsearch':
      config = {
        ...config,
        title: 'My App',
        leftActions: (
          <IconButton edge="start" color="inherit">
            <Home />
          </IconButton>
        ),
        searchValue,
        searchPlaceholder: args.searchPlaceholder || 'Search…',
        rightActions: undefined,
      };
      break;
    case 'headerdefault':
  config = { ...config, title: 'My Application', showLogo: config.showLogo, logo: logoImg };
      break;
    case 'logosearchactions':
      config = {
        ...config,
        logo: logoImg,
        showLogo: config.showLogo,
        title: '',
        searchPlaceholder: 'Search…',
        actions: (
          <>
            <IconButton color="inherit"><Notifications /></IconButton>
            <IconButton color="inherit"><AccountCircle /></IconButton>
          </>
        ),
      };
      break;
    case 'logosearchtabs':
      config = {
        ...config,
        logo: logoImg,
        showLogo: config.showLogo,
        title: ' ',
        leftActions: <LogoSearchTabsLeftActions />,
        rightActions: <ProfileMenu name="John Doe" shortName="JD" email="john.doe@example.com" />,
        // Only show the left action icons in the overflow drawer for this
        // variant (so users get the icon menu shown in the screenshot).
        // Do not include the full ProfileMenu here to avoid showing the
        // avatar + name/designation inside the drawer.
        overflowContent: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 8 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'flex-start' }}>
              <LogoSearchTabsLeftActions />
            </div>
          </div>
        ),
      };
      break;
    case 'logotabsactions':
      config = {
        ...config,
        logo: logoImg,
        showLogo: config.showLogo,
        title: '',
        actions: (
          <div className="rds-story-nav-actions">
            <span className="rds-story-nav-action"><HomeIcon /></span>
            <span className="rds-story-nav-action"><CompassIcon /></span>
            <span className="rds-story-nav-action"><VideoIcon /></span>
            <span className="rds-story-nav-action"><HeartIcon /></span>
            <span className="rds-story-nav-action"><BellIcon /></span>
            <ProfileMenu name="John Doe" shortName="JD" email="john.doe@example.com" />
          </div>
        ),
        // Put the same actions into overflow for small screens
        overflowContent: (
          // Only include the left action icons in the overflow Drawer —
          // keep the ProfileMenu in the app bar so the avatar + name
          // are available inline and clicking it shows the profile.
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 8 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <HomeIcon />
              <CompassIcon />
              <VideoIcon />
              <HeartIcon />
              <BellIcon />
            </div>
          </div>
        ),
      };
      break;
    case 'logosearchtabsactions':
      config = {
        ...config,
        logo: logoImg,
        showLogo: config.showLogo,
        title: '',
        actions: (
          <div className="rds-story-nav-actions">
            <span className="rds-story-nav-action"><CameraIcon /></span>
            <span className="rds-story-nav-action"><CompassIcon /></span>
            <span className="rds-story-nav-action"><VideoIcon /></span>
            <span className="rds-story-nav-action"><HeartIcon /></span>
            <span className="rds-story-nav-action"><BellIcon /></span>
          </div>
        ),
        // Provide the same icons to the overflow drawer so they remain
        // accessible on small screens (320 / 420). This enables the
        // three-dot overflow button to appear and reveal the icons.
        overflowContent: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 8 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <HomeIcon />
              <CompassIcon />
              <VideoIcon />
              <HeartIcon />
              <BellIcon />
            </div>
          </div>
        ),
      };
      break;
    case 'logosearchtabsactionssubheader':
      config = {
        ...config,
        logo: logoImg,
        showLogo: config.showLogo,
        title: '',
        subHeader: buildSubHeader(),
      };
      break;
    case 'minimal':
      config = { ...config, logo: logoImg, showLogo: config.showLogo, title: '' };
      break;
    case 'transparent':
      config = { ...config, logo: logoImg, showLogo: config.showLogo, color: 'transparent', __wrapTransparent: true };
      break;
    case 'withlogo':
      config = {
        ...config,
        title: '',
        logo: logoImg,
        showLogo: config.showLogo,
        actions: (
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
        ),
      };
      break;
    case 'headerwithsearch':
      config = {
        ...config,
        title: '',
        logo: logoImg,
        showLogo: config.showLogo,
        searchPlaceholder: 'Search…',
        actions: (
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        ),
      };
      break;
    case 'withtabs':
      config = {
        ...config,
        title: '',
        logo: logoImg,
        showLogo: config.showLogo,
        tabs: ['HOME', 'NEWS', 'MARKETPLACE', 'JOBS'],
        // Provide overflowContent so on small screens the tabs are
        // accessible via the three-dot button. Drawer will show them
        // stacked in a column.
        overflowContent: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 12 }}>
            <Button variant="text">HOME</Button>
            <Button variant="text">NEWS</Button>
            <Button variant="text">MARKETPLACE</Button>
            <Button variant="text">JOBS</Button>
          </div>
        ),
      };
      break;
    case 'withsubheader':
      config = {
        ...config,
        logo: logoImg,
        showLogo: config.showLogo,
        subHeader: buildSubHeader(),
        actions: (
          <>
            <IconButton color="inherit"><Notifications /></IconButton>
            <IconButton color="inherit"><AccountCircle /></IconButton>
          </>
        ),
      };
      break;
    case 'withnotificationbadge':
      config = {
        ...config,
        showLogo: config.showLogo,
        logo: logoImg,
        rightActions: (
          <div className="rds-appbar-tabs-container">
            <div className="rds-appbar-separator" />
            <div className="rds-appbar-tabs">
              <Button variant="text" color="inherit" className="rds-appbar-tab-btn">Home</Button>
              <div className="rds-appbar-separator" />
              <Button variant="text" color="inherit" className="rds-appbar-tab-btn">News</Button>
              <div className="rds-appbar-separator" />
              <Button variant="text" color="inherit" className="rds-appbar-tab-btn">Marketplace</Button>
              <div className="rds-appbar-separator" />
              <Button variant="text" color="inherit" className="rds-appbar-tab-btn">Jobs</Button>
            </div>
          </div>
        ),
        // Provide the same items to the overflow drawer so they remain accessible
        // on very small screens (320 / 420). The component will show the overflow
        // button automatically when `overflowContent` is present and the CSS
        // makes that button visible at <=420px.
        overflowContent: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button variant="text" color="inherit">Home</Button>
              <Button variant="text" color="inherit">News</Button>
              <Button variant="text" color="inherit">Marketplace</Button>
              <Button variant="text" color="inherit">Jobs</Button>
            </div>
          </div>
        ),
      };
      break;
    case 'withlogoandtabs':
      config = {
        ...config,
        logo: logoImg,
        showLogo: config.showLogo,
        title: '',
        tabs: ['Dashboard', 'Projects', 'Calendar'],
      };
      break;
    case 'withuserprofile':
      config = {
        ...config,
        title: 'User Dashboard',
        showLogo: config.showLogo,
        showMenuButton: true,
        rightActions: <ProfileMenu name="John Doe" shortName="JD" email="john.doe@example.com" />,
      };
      break;
    case 'withactions':
      config = {
        ...config,
        showLogo: config.showLogo,
        showMenuButton: true,
        tabs: ['Community', 'Jobs', 'Resources'],
        logo: logoImg,
        leftActions: (
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
        ),
        rightActions: (
          <>
            <RdsButton color="primary" layout="text-only" shape="rectangle" size="medium" state="default" style="filled" text="Find Jobs" textCase="uppercase" />
            <RdsButton color="primary" layout="text-only" shape="rectangle" size="medium" state="default" style="transparent" text="Login" textCase="uppercase" />
            <RdsButton color="primary" layout="text-only" shape="rectangle" size="medium" state="default" style="transparent" text="Employers" textCase="uppercase" />
          </>
        ),
        showSearch: false,
        searchValue: undefined,
        onSearchChange: undefined,
        // Provide overflowContent so the tabs and right-side actions are
        // accessible via the three-dot overflow button on small screens (320 / 420px).
        overflowContent: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button variant="text">Community</Button>
              <Button variant="text">Jobs</Button>
              <Button variant="text">Resources</Button>
            </div>
            <div style={{ height: 1, background: 'transparent' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button variant="contained" color="primary">Find Jobs</Button>
              <Button variant="text">Login</Button>
              <Button variant="text">Employers</Button>
            </div>
          </div>
        ),
      };
      break;
    case 'withloginbutton':
      config = {
        ...config,
        title: 'Public Site',
        showLogo: config.showLogo,
        actions: <Button color="inherit">Login</Button>,
      };
      break;
    case 'withmenubutton':
      config = {
        ...config,
        logo: (
          <span className="rds-appbar-logo-group">
            {/* Complex e-Signature SVG */}
            <svg width="35" height="35" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_20819_18212)">
                <rect x="1" width="43.44" height="44" rx="21.72" fill="#2E43FF" />
                <path fillRule="evenodd" clipRule="evenodd" d="M13.6392 27.5H16.1263C16.7438 27.5 17.3126 27.2888 17.7679 26.9346C18.0696 26.7003 18.3204 26.4022 18.5032 26.0612C18.5173 26.0359 18.5302 26.0095 18.5432 25.9831L20.879 21.4148L20.9039 21.3653L22.5951 18.0576C22.5995 18.0466 22.6049 18.0356 22.6114 18.0246L22.6643 17.9212C22.9217 17.4471 23.3132 17.0577 23.7879 16.8091C24.1599 16.6111 24.5827 16.5 25.0315 16.5H22.5454C21.9279 16.5 21.3591 16.7101 20.9039 17.0654C20.6022 17.2997 20.3502 17.5978 20.1685 17.9388L17.7927 22.5863L17.7679 22.6347L16.016 26.0612C15.7587 26.5441 15.3629 26.939 14.8827 27.1909C14.5108 27.3889 14.0869 27.5 13.6392 27.5Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M22.5549 27.5H25.0421C25.6595 27.5 26.2283 27.2888 26.6836 26.9346C26.9853 26.7003 27.2362 26.4022 27.4189 26.0612C27.433 26.0359 27.446 26.0095 27.4589 25.9831L29.7947 21.4148L29.8196 21.3653L31.5109 18.0576C31.5152 18.0466 31.5206 18.0356 31.5271 18.0246L31.5801 17.9212C31.8374 17.4471 32.2289 17.0577 32.7036 16.8091C33.0756 16.6111 33.4984 16.5 33.9472 16.5H31.4611C30.8437 16.5 30.2749 16.7101 29.8196 17.0654C29.5179 17.2997 29.2659 17.5978 29.0843 17.9388L26.7085 22.5863L26.6836 22.6347L24.9318 26.0612C24.6744 26.5441 24.2786 26.939 23.7985 27.1909C23.4265 27.3889 23.0026 27.5 22.5549 27.5Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M31.3055 27.5H33.7952C34.4133 27.5 34.9826 27.2903 35.4384 26.9386C35.7404 26.706 35.9915 26.4101 36.1744 26.0715C36.1885 26.0464 38.2778 21.8797 38.2778 21.8797C38.2821 21.8688 38.3471 21.7443 38.3471 21.7443C38.6047 21.2736 38.9965 20.887 39.4717 20.6402C39.8441 20.4436 40.2673 20.3333 40.7166 20.3333H38.228C37.6099 20.3333 37.0405 20.5419 36.5848 20.8947C36.2828 21.1273 36.0306 21.4232 35.8487 21.7618L33.6848 26.0715C33.4271 26.5509 33.031 26.943 32.5503 27.1931C32.178 27.3897 31.7537 27.5 31.3055 27.5Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M16.1158 27.5H13.6286C13.0111 27.5 12.4423 27.2888 11.9871 26.9346C11.6854 26.7003 11.4345 26.4022 11.2517 26.0612C11.2377 26.0359 11.2247 26.0095 11.2117 25.9831L8.87594 21.4148L8.85107 21.3653L7.1598 18.0576C7.15547 18.0466 7.15006 18.0356 7.14358 18.0246L7.09059 17.9212C6.83322 17.4471 6.44176 17.0577 5.96704 16.8091C5.59504 16.6111 5.17222 16.5 4.72345 16.5H7.20954C7.82701 16.5 8.39581 16.7101 8.85107 17.0654C9.15278 17.2997 9.40474 17.5978 9.58641 17.9388L11.9622 22.5863L11.9871 22.6347L13.7389 26.0612C13.9963 26.5441 14.3921 26.939 14.8722 27.1909C15.2442 27.3889 15.6681 27.5 16.1158 27.5Z" fill="#FF6600" />
                <path fillRule="evenodd" clipRule="evenodd" d="M25.0315 27.5H22.5443C21.9269 27.5 21.3581 27.2888 20.9028 26.9346C20.6011 26.7003 20.3502 26.4022 20.1675 26.0612C20.1534 26.0359 20.1404 26.0095 20.1275 25.9831L17.7917 21.4148L17.7668 21.3653L16.0755 18.0576C16.0712 18.0466 16.0658 18.0356 16.0593 18.0246L16.0063 17.9212C15.749 17.4471 15.3575 17.0577 14.8828 16.8091C14.5108 16.6111 14.088 16.5 13.6392 16.5H16.1253C16.7427 16.5 17.3115 16.7101 17.7668 17.0654C18.0685 17.2997 18.3205 17.5978 18.5021 17.9388L20.8779 22.5863L20.9028 22.6347L22.6546 26.0612C22.912 26.5441 23.3078 26.939 23.7879 27.1909C24.1599 27.3889 24.5838 27.5 25.0315 27.5Z" fill="#FF6600" />
                <path fillRule="evenodd" clipRule="evenodd" d="M33.9472 27.5H31.4601C30.8426 27.5 30.2738 27.2888 29.8185 26.9346C29.5168 26.7003 29.2659 26.4022 29.0832 26.0612C29.0691 26.0359 29.0562 26.0095 29.0432 25.9831L26.7074 21.4148L26.6825 21.3653L24.9913 18.0576C24.9869 18.0466 24.9815 18.0356 24.975 18.0246L24.9221 17.9212C24.6647 17.4471 24.2732 17.0577 23.7985 16.8091C23.4265 16.6111 23.0037 16.5 22.5549 16.5H25.041C25.6585 16.5 26.2273 16.7101 26.6825 17.0654C26.9842 17.2997 27.2362 17.5978 27.4179 17.9388L29.7937 22.5863L29.8185 22.6347L31.5704 26.0612C31.8277 26.5441 32.2235 26.939 32.7037 27.1909C33.0756 27.3889 33.4995 27.5 33.9472 27.5Z" fill="#FF6600" />
                <path fillRule="evenodd" clipRule="evenodd" d="M39.3132 19C38.6293 19 38.0749 18.4403 38.0749 17.75C38.0749 17.0597 38.6293 16.5 39.3132 16.5C39.9971 16.5 40.5515 17.0597 40.5515 17.75C40.5515 18.4403 39.9971 19 39.3132 19Z" fill="#FF6600" />
              </g>
              <defs>
                <clipPath id="clip0_20819_18212">
                  <rect x="1" width="43.44" height="44" rx="21.72" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="rds-appbar-logo-label">e-Signature</span>
          </span>
        ),
  showLogo: config.showLogo,
  tabs: ['Home', 'Agreement'],
        rightActions: (
          <div className="rds-appbar-actions-group">
            <span className="rds-appbar-badge">28 Days Left</span>
            <Button variant="contained" color="primary" sx={{ minWidth: 100, fontWeight: 500, fontSize: 14, boxShadow: 'none', textTransform: 'none' }}>
              View Plans
            </Button>
            <IconButton color="default" sx={{ ml: 1 }} className="rds-withmenubutton-settings">
              <svg width="22" height="22" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.4487 2.80164C11.8193 3.21276 12.338 3.46002 12.8908 3.48904C13.4436 3.51806 13.9854 3.32651 14.397 2.95646C14.4514 2.90767 14.503 2.85604 14.5518 2.80164L15.561 1.69417C15.8499 1.37229 16.2315 1.14792 16.6533 1.05203C17.0751 0.956144 17.5162 0.993401 17.9158 1.15874C18.3155 1.32407 18.6541 1.60936 18.8848 1.97517C19.1155 2.34098 19.2271 2.76934 19.2042 3.20122L19.1238 4.69026C19.1097 4.96417 19.1498 5.23818 19.2417 5.49659C19.3336 5.755 19.4756 5.99272 19.6595 6.19622C19.8434 6.39971 20.0656 6.56503 20.3134 6.68258C20.5612 6.80013 20.8298 6.86766 21.1037 6.88134C21.1729 6.885 21.2422 6.885 21.3113 6.88134L22.8029 6.81052C23.2338 6.78879 23.6608 6.90084 24.0254 7.13137C24.39 7.3619 24.6744 7.69964 24.8394 8.09816C25.0045 8.49668 25.0423 8.93649 24.9475 9.35731C24.8527 9.77813 24.6301 10.1593 24.3101 10.4486L23.1977 11.4517C22.7863 11.8235 22.5395 12.3435 22.5114 12.8972C22.4832 13.4509 22.6761 13.9931 23.0477 14.4047C23.095 14.4573 23.145 14.5074 23.1977 14.5547L24.3101 15.5578C24.6305 15.847 24.8536 16.2283 24.9487 16.6494C25.0437 17.0704 25.0061 17.5105 24.8409 17.9093C24.6758 18.3081 24.3912 18.646 24.0263 18.8766C23.6614 19.1072 23.234 19.2191 22.8029 19.1971L21.3089 19.1215C20.7557 19.0934 20.214 19.286 19.8027 19.657C19.3915 20.028 19.1442 20.547 19.1154 21.1002C19.1117 21.1717 19.1117 21.2434 19.1154 21.315L19.191 22.8088C19.2102 23.2375 19.097 23.6617 18.8666 24.0237C18.6363 24.3858 18.3 24.6682 17.9036 24.8324C17.5072 24.9967 17.0698 25.0348 16.6508 24.9418C16.2319 24.8487 15.8518 24.6289 15.5622 24.3123L14.5578 23.2012C14.1864 22.7897 13.6667 22.5427 13.1132 22.5143C12.5596 22.486 12.0174 22.6787 11.6059 23.05C11.5531 23.098 11.5027 23.1484 11.4547 23.2012L10.4467 24.3123C10.1576 24.6319 9.77663 24.8544 9.35611 24.949C8.9356 25.0437 8.4961 25.0059 8.09787 24.841C7.69964 24.6761 7.36218 24.392 7.13175 24.0278C6.90132 23.6635 6.7892 23.2369 6.81077 22.8064L6.88756 21.3125C6.91498 20.7593 6.72153 20.2179 6.34979 19.8072C5.97805 19.3966 5.45843 19.1503 4.90518 19.1227C4.83523 19.1191 4.76516 19.1191 4.6952 19.1227L3.20123 19.1983C2.77028 19.2214 2.34272 19.1105 1.97734 18.8809C1.61196 18.6512 1.32665 18.3141 1.16066 17.9157C0.994683 17.5173 0.956185 17.0774 1.0504 16.6563C1.14461 16.2351 1.36692 15.8535 1.68683 15.5638L2.798 14.5607C3.20935 14.1889 3.45622 13.669 3.48435 13.1153C3.51247 12.5615 3.31955 12.0193 2.948 11.6077C2.90075 11.555 2.85068 11.505 2.798 11.4577L1.68683 10.4486C1.36753 10.1593 1.14549 9.77843 1.05113 9.35804C0.956775 8.93766 0.99471 8.49834 1.15975 8.10036C1.32479 7.70237 1.60888 7.36515 1.97305 7.13488C2.33723 6.90462 2.76368 6.79258 3.19402 6.81411L4.68678 6.89093C5.23987 6.92036 5.782 6.72893 6.19401 6.3588C6.60602 5.98867 6.85422 5.4701 6.88397 4.91707C6.88397 4.84188 6.88397 4.76625 6.88397 4.69026L6.81194 3.19521C6.79165 2.76541 6.90452 2.33978 7.13512 1.97649C7.36572 1.6132 7.70281 1.32992 8.1004 1.16533C8.49799 1.00074 8.9367 0.962871 9.35663 1.05686C9.77655 1.15086 10.1572 1.37213 10.4467 1.6905L11.4499 2.80164H11.4487Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.45034 13.0068C7.45034 14.1044 7.77583 15.1773 8.38566 16.09C8.99549 17.0026 9.86229 17.7139 10.8764 18.1339C11.8905 18.5539 13.0064 18.6638 14.083 18.4497C15.1595 18.2356 16.1484 17.707 16.9246 16.9309C17.7008 16.1548 18.2294 15.1659 18.4435 14.0894C18.6577 13.0129 18.5478 11.8971 18.1277 10.8831C17.7076 9.86903 16.9963 9.00226 16.0836 8.39246C15.1709 7.78267 14.0979 7.45724 13.0002 7.45724C11.5283 7.45724 10.1167 8.0419 9.07588 9.08264C8.03507 10.1234 7.45034 11.535 7.45034 13.0068Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </IconButton>
            <ProfileMenu name="Jane Doe" shortName="JD" email="jane.doe@example.com" />
          </div>
        ),
        // Mobile overflow: keep logo + search + settings + avatar visible; move the
        // rest of the actions and tabs into the overflow drawer for small screens.
        // Include the `tabs` (Home, Agreement) here so they are accessible at 320/420px.
        overflowContent: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontWeight: 700 }}>Navigation</span>
              <Button variant="text">Home</Button>
              <Button variant="text">Agreement</Button>
            </div>
            <div style={{ height: 1, background: 'transparent' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontWeight: 700 }}>Account</span>
              <Button variant="contained" color="primary">View Plans</Button>
              <Button variant="text">28 Days Left</Button>
            </div>
            <div style={{ height: 1, background: 'transparent' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button variant="text">Settings</Button>
              <Button variant="text">Help</Button>
            </div>
          </div>
        ),
      };
      break;
    case 'dashboardwithlang':
  config = {
    ...config,
    logo: logoImg,
    showLogo: config.showLogo,
  title: <span style={{ fontWeight: 500, fontSize: 16 }}>Dashboard</span>,
        // Right actions: theme button, small icon, language, profile (no search, no dropdown chevron)
        rightActions: (
          <div className="rds-appbar-tabs-container" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Place theme trigger after search area visually by putting it here */}
              {/* Remove external onClick handler so the internal Menu can open on click */}
              <ThemeMenuIcon showDropdown={false} />
              {/* hide search for this dashboard variant */}
              { /* search intentionally omitted */ }
              <div className="rds-appbar-separator" />
              <ChatBubbleIconSmall />
              <div className="rds-appbar-separator" />
              <LanguageMenu />
              <div className="rds-appbar-separator" />
              <AdminProfileMenu name="Admin User" email="admin@example.com" onLogout={() => { console.log('Logout clicked'); }} />
            </div>
          </div>
        ),
      };
      break;
    default:
      // Fallback to default config
      config = {
        ...config,
        title: 'App Title',
        leftActions: (
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
        ),
        rightActions: <Button color="inherit">Login</Button>,
      };
  }

  // Remove internal helper flag before spreading (keep variantStyle so AppBar can add a variant class)
  const { __wrapTransparent, ...finalConfig } = config;
  if (config.__wrapTransparent) {
    return (
      <div className="rds-story-min-height-container">
        <RdsAppBar {...finalConfig} />
      </div>
    );
  }

  return <RdsAppBar {...finalConfig} />;
};

export const Default: Story = {
  args: ({
    size: 'medium',
    variantStyle: 'default',
  } as unknown) as any,
  render: DynamicTemplate,
};
Default.parameters = { controls: { include: ['color', 'style', 'size', 'showMenuButton', 'userName', 'userShortName', 'userEmail'] } };

// Individual stories for direct access
export const WithSearch: Story = {
  args: {
    size: 'medium',
    variantStyle: 'withSearch',
    color: 'default',
  } as any,
  render: DynamicTemplate,
};
WithSearch.parameters = { controls: { include: ['color', 'style', 'size', 'showMenuButton', 'title', 'userName', 'userShortName', 'userEmail'] } };

/*  Merged Header Stories */
export const HeaderDefault: Story = {
  args: { variantStyle: 'headerDefault', color: 'default' } as any,
  render: DynamicTemplate,
};
HeaderDefault.parameters = { controls: { include: ['color', 'style', 'size', 'showMenuButton', 'title', 'showLogo', 'userName', 'userShortName', 'userEmail'] } };

export const LogoSearchActions: Story = {
  args: { variantStyle: 'logoSearchActions', color: 'default' } as any,
  render: DynamicTemplate,
};
LogoSearchActions.parameters = { controls: { include: ['showLogo', 'title', 'searchPlaceholder', 'color', 'size', 'showMenuButton', 'showSearch', 'style', 'userName', 'userShortName', 'userEmail'] } };

export const LogoSearchTabs: Story = {
  args: { variantStyle: 'LogoSearchTabs', color: 'default' } as any,
  render: DynamicTemplate,
};
LogoSearchTabs.parameters = { controls: { include: ['showLogo', 'title', 'searchPlaceholder', 'color', 'size', 'showMenuButton', 'showSearch', 'style'] } };

export const LogoTabsActions: Story = {
  args: { variantStyle: 'LogoTabsActions', color: 'default' } as any,
  render: DynamicTemplate,
};
LogoTabsActions.parameters = { controls: { include: ['showLogo', 'title', 'color', 'size', 'showMenuButton', 'style', 'userName', 'userShortName', 'userEmail'] } };

export const LogoSearchTabsActions: Story = {
  args: { variantStyle: 'LogoSearchTabsActions', color: 'default' } as any,
  render: DynamicTemplate,
};
LogoSearchTabsActions.parameters = { controls: { include: ['showLogo', 'title', 'color', 'size', 'showMenuButton', 'style', 'userName', 'userShortName', 'userEmail'] } };

export const LogoSearchTabsActionsSubHeader: Story = {
  args: { variantStyle: 'LogoSearchTabsActionsSubHeader', color: 'default' } as any,
  render: DynamicTemplate,
};
LogoSearchTabsActionsSubHeader.parameters = { controls: { include: ['showLogo', 'title', 'searchPlaceholder', 'color', 'size', 'showMenuButton', 'showSearch', 'style', 'userName', 'userShortName', 'userEmail'] } };

export const Minimal: Story = { args: { variantStyle: 'Minimal', color: 'default' } as any, render: DynamicTemplate };
Minimal.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'userName', 'userShortName', 'userEmail', 'style'] } };

export const Transparent: Story = {
  args: { variantStyle: 'Transparent', color: 'transparent' } as any,
  parameters: { backgrounds: { default: 'transparent' } },
  render: DynamicTemplate,
};
Transparent.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'userName', 'userShortName', 'userEmail', 'style'] } };

export const WithLogo: Story = { args: { variantStyle: 'withLogo', color: 'default' } as any, render: DynamicTemplate };
WithLogo.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'userName', 'userShortName', 'userEmail', 'style'] } };

export const HeaderWithSearch: Story = { args: { variantStyle: 'HeaderWithSearch', color: 'default' } as any, render: DynamicTemplate };
HeaderWithSearch.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'searchPlaceholder', 'showSearch', 'showMenuButton', 'userName', 'userShortName', 'userEmail', 'style'] } };

export const WithTabs: Story = { args: { variantStyle: 'withTabs', color: 'default' } as any, render: DynamicTemplate };
WithTabs.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'userName', 'userShortName', 'userEmail', 'style'] } };

export const WithSubHeader: Story = { args: { variantStyle: 'withSubHeader', color: 'default' } as any, render: DynamicTemplate };
WithSubHeader.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'userName', 'userShortName', 'userEmail', 'style'] } };

export const WithNotificationBadge: Story = { args: { variantStyle: 'WithNotificationBadge', color: 'default' } as any, render: DynamicTemplate };
WithNotificationBadge.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'userName', 'userShortName', 'userEmail', 'style'] } };

export const WithLogoAndTabs: Story = { args: { variantStyle: 'WithLogoAndTabs', color: 'default' } as any, render: DynamicTemplate };
WithLogoAndTabs.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'userName', 'userShortName', 'userEmail', 'style'] } };

export const WithUserProfile: Story = { args: { variantStyle: 'WithUserProfile', color: 'default' } as any, render: DynamicTemplate };
WithUserProfile.parameters = { controls: { include: ['title', 'size', 'color', 'showMenuButton', 'style'] } };

export const WithActions: Story = { args: { variantStyle: 'withActions', color: 'default' } as any, render: DynamicTemplate };
WithActions.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'userName', 'userShortName', 'userEmail', 'showMenuButton', 'style'] } };

export const WithLoginButton: Story = { args: { variantStyle: 'WithLoginButton', color: 'default' } as any, render: DynamicTemplate };
WithLoginButton.parameters = { controls: { include: ['title', 'size', 'color', 'userName', 'userShortName', 'userEmail', 'showMenuButton', 'style'] } };

export const WithMenuButton: Story = { args: { variantStyle: 'WithMenuButton', color: 'default' } as any, render: DynamicTemplate };
WithMenuButton.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'style'] } };

export const DashboardWithLang: Story = { args: { variantStyle: 'dashboardWithLang', color: 'default', showSearch: false } as any, render: DynamicTemplate };
DashboardWithLang.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'style'] } };
