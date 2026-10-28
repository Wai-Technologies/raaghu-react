import { useEffect, useState, type MouseEvent, type KeyboardEvent, type HTMLAttributes, type ReactNode, type Ref } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { SxProps, Theme } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import RdsButton from '../rds-button/rds-button';
import { Box } from '@mui/material';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-multi-level-menu.scss';

export type MenuOption = {
  label: string;
  shortcut?: string;
  children?: MenuOption[];
};

/** Props for {@link RdsMultiLevelMenu}. Extra props are forwarded to the root element. */
export interface RdsMultiLevelMenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'children'> {
  className?: string;
  /** Menu items; an item with `children` opens a nested submenu. */
  items?: MenuOption[];
  /** @deprecated Use `items` instead. */
  options?: MenuOption[];
  /** `expandable` opens submenus; `selectable` keeps a checked item. */
  variant?: 'expandable' | 'selectable';
  /** Figma alias of `variant`. */
  type?: 'expandable' | 'selectable';
  /** Size of the trigger button and menu items. Standard 3-value scale; defaults to `'medium'`. */
  size?: 'small' | 'medium' | 'large';
  /** Selects the first item when using the selectable variant. */
  selected?: boolean;
  /** Called with the chosen option. */
  onSelect?: (option: MenuOption) => void;
  /** Trigger button label. Defaults to "Multi Level Menu". */
  children?: ReactNode;
  /** MUI system styles for the root element. */
  sx?: SxProps<Theme>;
  /** Ref to the root element. */
  ref?: Ref<HTMLDivElement>;
}

const menuItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: 'var(--rds-mlm-min-width)',
};

const menuPaperStyle = {
  minWidth: 'var(--rds-mlm-min-width)',
};

export const RdsMultiLevelMenu = ({
  items,
  options,
  variant,
  type: typeProp,
  size = 'medium',
  selected = false,
  onSelect,
  children,
  className,
  sx,
  ref,
  ...rest
}: RdsMultiLevelMenuProps) => {
  if (options !== undefined) warnDeprecatedProp('RdsMultiLevelMenu', 'options', '`items`');
  const type = variant ?? typeProp ?? 'expandable';
  const isMobile = useMediaQuery('(max-width:568px)', { noSsr: true });
  const [anchorEls, setAnchorEls] = useState<(null | HTMLElement)[]>([null]);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number[]>(() => (selected ? [0] : []));
  const [prevSize, setPrevSize] = useState(size);

  useEffect(() => {
    setSelectedIndex((current) => {
      const next = selected ? [0] : [];
      return current.length === next.length && current.every((index, position) => index === next[position])
        ? current
        : next;
    });
  }, [selected]);

  if (size !== prevSize) {
    setPrevSize(size);
    setAnchorEls([null]);
    setOpenIndexes([]);
  }

  const setSubmenuAnchor = (parentLevel: number, anchor: HTMLElement | null, idx: number) => {
    const newAnchors = [...anchorEls.slice(0, parentLevel + 1), anchor];
    setAnchorEls(newAnchors);
    const newOpenIndexes = [...openIndexes.slice(0, parentLevel), idx];
    setOpenIndexes(newOpenIndexes);
  };

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
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

  const renderMenu = (opts: MenuOption[], level = 0) => {
    const anchorEl = anchorEls[level];
    const open = Boolean(anchorEl);
    const closeAndFocusParent = () => {
      const parent = anchorEl?.closest('li') ?? anchorEl;
      handleMenuClose(level);
      parent?.focus();
    };
    return (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleMenuClose(level)}
        anchorOrigin={level > 0 && isMobile ? { vertical: 'bottom', horizontal: 'left' } : { vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        {...(level > 0 ? { onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
          if (e.key === 'ArrowLeft' || e.key === 'Escape') {
            e.stopPropagation();
            closeAndFocusParent();
          }
        } } : {})}
        slotProps={{
          list: { autoFocusItem: open, disablePadding: true },
          paper: {
            sx: level === 0
              ? { ...menuPaperStyle, mt: { xs: 'var(--rds-mlm-root-offset)', sm: 0 } }
              : menuPaperStyle,
            className: clsx('rds-mlm-paper', level === 0 && 'rds-mlm-root', `type-${type}`, `size-${size}`)
          }
        }}
        disableAutoFocusItem
      >
        {opts.map((option, idx) => {
          const hasChildren = !!option.children && option.children.length > 0;
          const isExpandable = type === 'expandable' && hasChildren;
          const isSelected = type === 'selectable' && selectedIndex[level] === idx;
          const subMenuElement = isExpandable && openIndexes[level] === idx
            ? renderMenu(option.children!, level + 1)
            : null;
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
                onKeyDown={isExpandable ? (e) => {
                  if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    setSubmenuAnchor(level, e.currentTarget as HTMLElement, idx);
                  }
                } : undefined}
                selected={isSelected}
                sx={{
                  ...menuItemStyle,
                }}
                className={clsx(
                  size !== 'medium' && size,
                  isExpandable && openIndexes[level] === idx && 'expanded-open',
                )}
                disableRipple={isExpandable}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <Box className={'rds-mlm-leading'}>
                    {type === 'selectable' && isSelected ? <CheckIcon fontSize="small" /> : null}
                  </Box>
                  <ListItemText primary={option.label} slotProps={{ primary: { fontWeight: 400 } }} />
                  {!isExpandable && option.shortcut && (
                    <Box className={'rds-mlm-shortcut'}>{option.shortcut}</Box>
                  )}
                  {isExpandable && (
                    <Box
                      sx={{ ml: 'auto', cursor: 'pointer', display: 'flex', alignItems: 'center', zIndex: 'calc(var(--rds-z-index-base) + 2)' }}
                      className={'rds-mlm-arrow'}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSubmenuAnchor(level, e.currentTarget as HTMLElement, idx);
                      }}
                    >
                      {isMobile ? (
                        <KeyboardArrowDownIcon fontSize="small" />
                      ) : (
                        <ChevronRightIcon fontSize="small" />
                      )}
                    </Box>
                  )}
                </Box>
              </MenuItem>
              {subMenuElement}
            </Box>
          );
        })}
      </Menu>
    );
  };

  const rootMenuElement = renderMenu(items ?? options ?? [], 0);

  return (
    <Box
      {...rest}
      ref={ref}
      className={clsx('rds-multi-level-menu', `type-${type}`, className)}
      sx={Array.isArray(sx) ? sx : [sx]}
    >
      <RdsButton
        variant="filled"
        onClick={(e) => handleMenuOpen(e)}
        size={size}
      >
        {children ?? 'Multi Level Menu'}
      </RdsButton>
      {rootMenuElement}
    </Box>
  );
};

RdsMultiLevelMenu.displayName = 'RdsMultiLevelMenu';
export default RdsMultiLevelMenu;
