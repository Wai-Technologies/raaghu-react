import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import { Box } from '@mui/material';

export type MenuOption = {
  label: string;
  shortcut?: string;
  children?: MenuOption[];
};

export const menuItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: 'var(--rds-mlm-min-width, 220px)',
};

export const menuPaperStyle = {
  minWidth: 'var(--rds-mlm-min-width, 220px)',
};

export function isMobileViewport(): boolean {
  return typeof window !== 'undefined' && globalThis.innerWidth <= 568;
}

export interface MenuOptionItemProps {
  option: MenuOption;
  idx: number;
  level: number;
  type: 'expandable' | 'selectable';
  size: 'default' | 'large';
  state: 'default' | 'hover' | 'selected';
  isSelected: boolean;
  isExpanded: boolean;
  onExpand: (anchor: HTMLElement, idx: number) => void;
  onSelect: (option: MenuOption, idx: number) => void;
  renderSubmenu?: () => React.ReactNode;
}

export function MenuOptionItem({
  option,
  idx,
  level,
  type,
  size,
  state,
  isSelected,
  isExpanded,
  onExpand,
  onSelect,
  renderSubmenu,
}: MenuOptionItemProps) {
  const hasChildren = !!option.children && option.children.length > 0;
  const isExpandable = type === 'expandable' && hasChildren;
  const isForcedHover = state === 'hover' && idx === 0;
  const isForcedSelected = state === 'selected' && idx === 0;
  const selected = type === 'selectable' && (isSelected || (isForcedSelected && type === 'selectable'));
  const isMobile = isMobileViewport();

  return (
    <Box key={option.label + idx} sx={{ position: 'relative' }}>
      <MenuItem
        onClick={
          isExpandable
            ? (e) => {
                e.stopPropagation();
                onExpand(e.currentTarget as HTMLElement, idx);
              }
            : () => onSelect(option, idx)
        }
        selected={selected}
        sx={{ ...menuItemStyle }}
        className={`${size === 'large' ? 'large' : ''} ${isForcedHover ? 'force-hover' : ''} ${isForcedSelected && type !== 'selectable' ? 'force-selected' : ''} ${isExpandable && isExpanded ? 'expanded-open' : ''}`}
        disableRipple={isExpandable}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Box className="rds-mlm-leading">
            {type === 'selectable' && selected ? <CheckIcon fontSize="small" /> : null}
          </Box>
          <ListItemText primary={option.label} primaryTypographyProps={{ fontWeight: 400 }} />
          {!isExpandable && option.shortcut && (
            <Box className="rds-mlm-shortcut">{option.shortcut}</Box>
          )}
          {isExpandable && (
            <Box
              sx={{
                ml: 'auto',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                zIndex: 'calc(var(--rds-z-index-base) + 2)',
              }}
              className="rds-mlm-arrow"
              onClick={(e) => {
                e.stopPropagation();
                onExpand(e.currentTarget as HTMLElement, idx);
              }}
            >
              {isMobile ? <KeyboardArrowDownIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
            </Box>
          )}
        </Box>
      </MenuItem>
      {isExpandable && isExpanded && renderSubmenu?.()}
    </Box>
  );
}

export interface MultiLevelMenuPanelProps {
  options: MenuOption[];
  level: number;
  anchorEl: HTMLElement | null;
  openIndexes: number[];
  type: 'expandable' | 'selectable';
  size: 'default' | 'large';
  state: 'default' | 'hover' | 'selected';
  selectedIndex: number[];
  onClose: (level: number) => void;
  onExpand: (level: number, anchor: HTMLElement, idx: number) => void;
  onSelect: (option: MenuOption, level: number, index: number) => void;
  renderMenu: (opts: MenuOption[], level: number) => React.ReactNode;
}

export function MultiLevelMenuPanel({
  options,
  level,
  anchorEl,
  openIndexes,
  type,
  size,
  state,
  selectedIndex,
  onClose,
  onExpand,
  onSelect,
  renderMenu,
}: MultiLevelMenuPanelProps) {
  const open = Boolean(anchorEl);
  const isMobile = isMobileViewport();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={() => onClose(level)}
      anchorOrigin={
        level > 0 && isMobile
          ? { vertical: 'bottom', horizontal: 'left' }
          : { vertical: 'top', horizontal: 'right' }
      }
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      MenuListProps={{ autoFocusItem: open, disablePadding: true }}
      PaperProps={{
        sx:
          level === 0
            ? { ...menuPaperStyle, mt: { xs: 'var(--rds-mlm-root-offset, 43px)', sm: 0 } }
            : menuPaperStyle,
        className: `rds-mlm-paper ${level === 0 ? 'rds-mlm-root' : ''} type-${type} size-${size}`,
      }}
      disableAutoFocusItem
    >
      {options.map((option, idx) => {
        let isSelected = selectedIndex[level] === idx;
        if (state === 'selected' && idx === 0 && type === 'selectable') {
          isSelected = true;
        }
        return (
          <MenuOptionItem
            key={option.label + idx}
            option={option}
            idx={idx}
            level={level}
            type={type}
            size={size}
            state={state}
            isSelected={isSelected}
            isExpanded={openIndexes[level] === idx}
            onExpand={(anchor, index) => onExpand(level, anchor, index)}
            onSelect={(opt, index) => onSelect(opt, level, index)}
            renderSubmenu={() => renderMenu(option.children!, level + 1)}
          />
        );
      })}
    </Menu>
  );
}
