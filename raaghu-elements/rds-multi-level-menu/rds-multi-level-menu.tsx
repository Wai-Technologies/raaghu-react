
import React, { useState } from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckIcon from '@mui/icons-material/Check';
import RdsButton from '../rds-button/rds-button';
import { Box } from '@mui/material';
import './rds-multi-level-menu.scss';

export type MenuOption = {
  label: string;
  shortcut?: string;
  children?: MenuOption[];
};

export interface RdsMultiLevelMenuProps {
  options: MenuOption[];
  type?: 'expandable' | 'selectable';
  size?: 'default' | 'large';
  onSelect?: (option: MenuOption) => void;
  state?: 'default' | 'hover' | 'selected';
}


const menuItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: 220,
};

const menuPaperStyle = {
  minWidth: 220,
};


export const RdsMultiLevelMenu = ({
  options,
  type = 'expandable',
  size = 'default',
  state = 'default',
  onSelect,
}:RdsMultiLevelMenuProps) => {
  // Store anchor elements for each menu level
  const [anchorEls, setAnchorEls] = useState<(null | HTMLElement)[]>([null]);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);

    // Reset open dropdowns when size changes to force reposition
    React.useEffect(() => {
      setAnchorEls([null]);
      setOpenIndexes([]);
    }, [size]);

  // Set anchor for a submenu: provide parent level and option index
  const setSubmenuAnchor = (parentLevel: number, anchor: HTMLElement | null, idx: number) => {
    // Store submenu anchor at the next level index
    const newAnchors = [...anchorEls.slice(0, parentLevel + 1), anchor];
    setAnchorEls(newAnchors);
    // Ensure only the current path is active, clear deeper levels
    const newOpenIndexes = [...openIndexes.slice(0, parentLevel), idx];
    setOpenIndexes(newOpenIndexes);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, level: number, index: number) => {
    // Root menu open
    const newAnchors = [...anchorEls];
    newAnchors[0] = event.currentTarget as HTMLElement;
    setAnchorEls(newAnchors.slice(0, 1));
    setOpenIndexes([]);
  };

  const handleMenuClose = (level: number) => {
    setAnchorEls(anchorEls.slice(0, level));
    setOpenIndexes(openIndexes.slice(0, level));
  };

  const handleSelect = (option: MenuOption, level: number, index: number) => {
    if (type === 'selectable') {
      setSelectedIndex([...selectedIndex.slice(0, level), index]);
    }
    if (onSelect) onSelect(option);
    handleMenuClose(level);
  };

  // Recursive menu rendering with nested submenus as separate Menu components
  const renderMenu = (opts: MenuOption[], level = 0) => {
    const anchorEl = anchorEls[level];
    const open = Boolean(anchorEl);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 568;
    // For demo: force state on the first menu item only
    return (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleMenuClose(level)}
        anchorOrigin={level > 0 && isMobile ? { vertical: 'bottom', horizontal: 'left' } : { vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        MenuListProps={{ autoFocusItem: open, disablePadding: true }}
        PaperProps={{
          sx: level === 0
            ? { ...menuPaperStyle, mt: { xs: '43px', sm: 0 } }
            : menuPaperStyle,
          className: `rds-mlm-paper ${level === 0 ? 'rds-mlm-root' : ''} type-${type} size-${size}`
        }}
        disableAutoFocusItem
      >
        {opts.map((option, idx) => {
          const hasChildren = !!option.children && option.children.length > 0;
          const isExpandable = type === 'expandable' && hasChildren;
          let isSelected = selectedIndex[level] === idx;
          // Forced state logic for Storybook/Docs demo (Figma-like controls)
          const isForcedHover = state === 'hover' && idx === 0;
          const isForcedSelected = state === 'selected' && idx === 0;
          if (isForcedSelected && type === 'selectable') {
            isSelected = true;
          }
          // Callback ref for the arrow icon wrapper
          const arrowRefCb = (node: HTMLDivElement | null) => {
            // No-op, but could be used for focus if needed
          };
          return (
            <Box key={option.label + idx} sx={{ position: 'relative' }}>
              <MenuItem
                onClick={
                  isExpandable
                    ? (e) => {
                        e.stopPropagation();
                        setSubmenuAnchor(level, e.currentTarget as HTMLElement, idx);
                      }
                    : () => handleSelect(option, level, idx)
                }
                // Click-only open; no hover open
                selected={type === 'selectable' && isSelected}
                sx={{
                  ...menuItemStyle,
                }}
                className={`${size === 'large' ? 'large' : ''} ${isForcedHover ? 'force-hover' : ''} ${isForcedSelected && type !== 'selectable' ? 'force-selected' : ''} ${isExpandable && openIndexes[level] === idx ? 'expanded-open' : ''}`}
                disableRipple={isExpandable}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  {/* Leading selection check for selectable mode to match Figma */}
                  <Box className={'rds-mlm-leading'}>
                    {type === 'selectable' && isSelected ? <CheckIcon fontSize="small" /> : null}
                  </Box>
                  <ListItemText primary={option.label} primaryTypographyProps={{ fontWeight: 400 }} />
                  {/* Show shortcut text only when not expandable */}
                  {!isExpandable && option.shortcut && (
                    <Box className={'rds-mlm-shortcut'}>{option.shortcut}</Box>
                  )}
                  {isExpandable && (
                    <Box
                      ref={arrowRefCb}
                      sx={{ ml: 'auto', cursor: 'pointer', display: 'flex', alignItems: 'center', zIndex: 2 }}
                      className={'rds-mlm-arrow'}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Use the arrow's parent (Box) as anchor
                        setSubmenuAnchor(level, e.currentTarget as HTMLElement, idx);
                      }}
                    >
                      <ChevronRightIcon fontSize="small" />
                    </Box>
                  )}
                </Box>
              </MenuItem>
              {/* Nested submenu, positioned to the right of parent */}
              {isExpandable && openIndexes[level] === idx && renderMenu(option.children!, level + 1)}
            </Box>
          );
        })}
      </Menu>
    );
  };

  // Top-level button to open menu
  return (
    <div className={`rds-multi-level-menu type-${type}`}>
      <RdsButton
        style="filled"
        onClick={(e) => handleMenuOpen(e, 0, -1)}
        size={size === 'large' ? 'large' : 'medium'}
      >
        Multi Level Menu
      </RdsButton>
      {renderMenu(options, 0)}
    </div>
  );
};

RdsMultiLevelMenu.displayName = 'RdsMultiLevelMenu';
export default RdsMultiLevelMenu;
