
import React, { useState } from 'react';
import RdsButton from '../rds-button/rds-button';
import RdsMenu from '../rds-menu/rds-menu';
import RdsCheckbox from '../rds-checkbox/rds-checkbox';
import RdsRadio from '../rds-radio/rds-radio';
import RdsAvatar from '../rds-avatar/rds-avatar';
import RdsSearch from '../rds-search/rds-search';

export interface RdsButtonDropdownOption {
  id: string | number;
  label: string;
  avatarSrc?: string;
  checked?: boolean;
  disabled?: boolean;
}

export interface RdsButtonDropdownProps {
  buttonText?: string;
  options: RdsButtonDropdownOption[];
  multiSelect?: boolean;
  showSearch?: boolean;
  onChange?: (selected: string[] | string) => void;
  state?: 'default' | 'selected'; // allow custom state handling
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  showUserAvatar?: boolean;
  showRadio?: boolean;
  isShowLeftIcon?: boolean;
  isShowRightIcon?: boolean;
}

const RdsButtonDropdown = ({
  buttonText = 'Button',
  options,
  multiSelect = false,
  showSearch = false,
  state = 'default',
  rightIcon,
  leftIcon,
  showUserAvatar = true,
  showRadio = true,
  isShowLeftIcon = true,
  isShowRightIcon = true,
  onChange,
}:RdsButtonDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<(string | number)[]>(
    options.filter(o => o.checked).map(o => o.id)
  );

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleOptionChange = (id: string | number) => {
    if (multiSelect) {
      setSelected(prev => {
        const exists = prev.includes(id);
        const next = exists ? prev.filter(i => i !== id) : [...prev, id];
        onChange?.(next as string[]);
        return next;
      });
    } else {
      setSelected([id]);
      onChange?.(id.toString());
      setAnchorEl(null);
    }
  };

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  // Dropdown open state logic
  const isDropdownOpen = state === 'selected' ? Boolean(anchorEl) || anchorEl === null : Boolean(anchorEl);

  const handleDropdownButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isDropdownOpen) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  return (
    <>
      <RdsButton
        text={buttonText}
        onClick={handleDropdownButtonClick}
        showRightIcon={isShowRightIcon}
        showLeftIcon={isShowLeftIcon}
        changeRightIcon={rightIcon}
        changeLeftIcon={leftIcon}
        
        size='medium'
        color="primary"
        layout="icon+text"
        shape="rectangle"
        state="hover"
        style="outlined"
        textCase="uppercase"
      />
      <RdsMenu
        open={isDropdownOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        items={[]}
        PaperProps={{ style: { minWidth: 200 } }}
      >
        <div style={{ padding: 8, minWidth: 200 }}>
          {showSearch && (
            <div style={{ marginBottom: 8 }}>
              <RdsSearch
                value={search}
                onChange={setSearch}
                placeholder="Search"
                showClearButton
                showSearchIcon
                size='small'
              />
            </div>
          )}
          <div style={{ maxHeight: 240, overflowY: 'auto' }}>
            {filteredOptions.map(opt => (
              <div key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                {showUserAvatar && <RdsAvatar size="small" src={opt.avatarSrc} />}
                {multiSelect ? (
                  <RdsCheckbox
                    checked={selected.includes(opt.id)}
                    onChange={() => handleOptionChange(opt.id)}
                    isDisabled={opt.disabled}
                    labeltext= {opt.label}
                  />
                ) : showRadio && (
                  <RdsRadio
                    options={[{ value: opt.id.toString(), text: opt.label }]}
                    value={selected[0]?.toString()}
                    onChange={() => handleOptionChange(opt.id)}
                    state={opt.disabled ? 'disabled' : 'default'}
                    layout="icon with label"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </RdsMenu>
    </>
  );
};
RdsButtonDropdown.displayName = 'RdsButtonDropdown';
export default RdsButtonDropdown;