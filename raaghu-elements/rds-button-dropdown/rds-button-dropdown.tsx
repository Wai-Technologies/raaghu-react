
import React, { useState } from 'react';
import './rds-button-dropdown.scss';
import RdsButton from '../rds-button/rds-button';
import RdsMenu from '../rds-menu/rds-menu';
import RdsCheckbox from '../rds-checkbox/rds-checkbox';
import RdsRadio from '../rds-radio/rds-radio';
import RdsAvatar from '../rds-avatar/rds-avatar';
import RdsSearch from '../rds-search/rds-search';
import './rds-button-dropdown.scss';

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
  buttonState?: 'default' | 'hover' | 'disabled' | 'selected';
  size?: 'small' | 'medium' | 'large';
  layout?: 'icon+text' | 'text-only' | 'icon-only';
  styleType?: 'primary' | 'secondary' | 'outline' | 'transparent';
  shape?: 'rectangle' | 'pill';
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  showUserAvatar?: boolean;
  showRadio?: boolean;
  isShowLeftIcon?: boolean;
  isShowRightIcon?: boolean;
  buttonStyle?: 'filled' | 'outlined' | 'transparent';
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
  size = 'medium',
  layout = 'icon+text',
  styleType = 'primary',
  shape = 'rectangle',
  buttonState = 'default',
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
        size={size}
        layout={layout}
        shape={shape}
        color="primary"
        state={buttonState}
          style={
            styleType === 'transparent' ? 'transparent' :
            styleType === 'primary' ? 'filled' :
            styleType === 'secondary' ? 'filled' : 'outlined'
          }
          className={
            styleType === 'secondary'
              ? 'rds-button-dropdown--secondary'
              : styleType === 'outline'
                ? 'rds-button-dropdown__button rds-button-dropdown--outline'
                : ''
          }
          textCase="uppercase"
      />
      <RdsMenu
        open={isDropdownOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        items={[]}
        PaperProps={{ 
          style: { minWidth: 200 },
          className: 'rds-button-dropdown__menu'
        }}
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
              <div key={opt.id} className="rds-button-dropdown__option">
                {showUserAvatar && <RdsAvatar size="small" src={opt.avatarSrc} />}
                {multiSelect ? (
                  <RdsCheckbox
                    checked={selected.includes(opt.id)}
                    onChange={() => handleOptionChange(opt.id)}
                    isDisabled={opt.disabled}
                    labeltext= {opt.label}
                  />
                ) : showRadio ? (
                  <RdsRadio
                    options={[{ value: opt.id.toString(), text: opt.label }]}
                    value={selected[0]?.toString()}
                    onChange={() => handleOptionChange(opt.id)}
                    state={opt.disabled ? 'disabled' : 'default'}
                    layout="icon with label"
                    className={styleType === 'outline' ? 'rds-button-dropdown__button rds-button-dropdown--outline' : ''}
                  />
                ) : (
                  // Fallback: Plain text option when neither checkbox nor radio is enabled
                  <div
                    role="option"
                    aria-selected={selected.includes(opt.id)}
                    className={`rds-button-dropdown__option ${selected.includes(opt.id) ? 'rds-button-dropdown__option--selected' : ''} ${opt.disabled ? 'rds-button-dropdown__option--disabled' : ''}`}
                    onClick={() => !opt.disabled && handleOptionChange(opt.id)}
                  >
                    {opt.label}
                  </div>
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