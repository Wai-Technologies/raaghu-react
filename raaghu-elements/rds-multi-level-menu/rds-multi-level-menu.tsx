import React, { useState } from 'react';
import Box from '@mui/material/Box';
import RdsButton from '../rds-button/rds-button';
import { joinClassNames, type RdsStylingProps } from '../shared/utils/styling-props';
import { MultiLevelMenuPanel } from './rds-multi-level-menu.helpers';
import './rds-multi-level-menu.scss';

export type MenuOption = {
  label: string;
  shortcut?: string;
  children?: MenuOption[];
};

export interface RdsMultiLevelMenuProps extends RdsStylingProps {
  options: MenuOption[];
  type?: 'expandable' | 'selectable';
  size?: 'default' | 'large';
  onSelect?: (option: MenuOption) => void;
  /** Shows the first option in its selected style. */
  selected?: boolean;
  /**
   * @deprecated Use `selected` instead.
   * `'hover'` only forces the hover look and is kept for backward compatibility.
   */
  state?: 'default' | 'hover' | 'selected';
}

export const RdsMultiLevelMenu = React.forwardRef<HTMLDivElement, RdsMultiLevelMenuProps>(function RdsMultiLevelMenu({
  options,
  type = 'expandable',
  size = 'default',
  state: stateProp = 'default',
  selected = false,
  onSelect,
  className,
  sx,
  style,
}, ref) {
  const state = selected ? 'selected' : stateProp;
  const [anchorEls, setAnchorEls] = useState<(null | HTMLElement)[]>([null]);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);

  React.useEffect(() => {
    setAnchorEls([null]);
    setOpenIndexes([]);
  }, [size]);

  const setSubmenuAnchor = (parentLevel: number, anchor: HTMLElement | null, idx: number) => {
    setAnchorEls([...anchorEls.slice(0, parentLevel + 1), anchor]);
    setOpenIndexes([...openIndexes.slice(0, parentLevel), idx]);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEls([event.currentTarget as HTMLElement]);
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
    onSelect?.(option);
    handleMenuClose(level);
  };

  const renderMenu = (opts: MenuOption[], level = 0): React.ReactNode => (
    <MultiLevelMenuPanel
      options={opts}
      level={level}
      anchorEl={anchorEls[level]}
      openIndexes={openIndexes}
      type={type}
      size={size}
      state={state}
      selectedIndex={selectedIndex}
      onClose={handleMenuClose}
      onExpand={setSubmenuAnchor}
      onSelect={handleSelect}
      renderMenu={renderMenu}
    />
  );

  return (
    <Box ref={ref} className={joinClassNames(`rds-multi-level-menu type-${type}`, className)} sx={sx} style={style}>
      <RdsButton style="filled" onClick={handleMenuOpen} size={size === 'large' ? 'large' : 'medium'}>
        Multi Level Menu
      </RdsButton>
      {renderMenu(options, 0)}
    </Box>
  );
});

RdsMultiLevelMenu.displayName = 'RdsMultiLevelMenu';
export default RdsMultiLevelMenu;
