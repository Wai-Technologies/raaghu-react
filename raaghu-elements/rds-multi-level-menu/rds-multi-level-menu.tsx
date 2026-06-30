import React, { useState } from 'react';
import RdsButton from '../rds-button/rds-button';
import { MultiLevelMenuPanel } from './rds-multi-level-menu.helpers';
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

export const RdsMultiLevelMenu = ({
  options,
  type = 'expandable',
  size = 'default',
  state = 'default',
  onSelect,
}: RdsMultiLevelMenuProps) => {
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
    <div className={`rds-multi-level-menu type-${type}`}>
      <RdsButton style="filled" onClick={handleMenuOpen} size={size === 'large' ? 'large' : 'medium'}>
        Multi Level Menu
      </RdsButton>
      {renderMenu(options, 0)}
    </div>
  );
};

RdsMultiLevelMenu.displayName = 'RdsMultiLevelMenu';
export default RdsMultiLevelMenu;
