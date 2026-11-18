import { useState, type ReactNode, type MouseEvent } from 'react';
import clsx from 'clsx';
import './rds-button-dropdown.scss';
import RdsButton from '../rds-button/rds-button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
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
  ui?: {
    search?: 'visible' | 'hidden';
    avatar?: 'visible' | 'hidden';
    selection?: 'radio' | 'button';
    leftIcon?: 'visible' | 'hidden';
    rightIcon?: 'visible' | 'hidden';
  };
  onChange?: (selected: string[] | string) => void;
  /** Disables the dropdown button so the menu cannot be opened. */
  disabled?: boolean;
  /** Shows the dropdown button in its selected (pressed) style. */
  selected?: boolean;
  /** @deprecated Use `selected`. `'selected'` also opened the menu on mount. */
  state?: 'default' | 'selected';
  /** @deprecated Use `disabled` and `selected`. */
  buttonState?: 'default' | 'hover' | 'disabled' | 'selected';
  size?: 'small' | 'medium' | 'large';
  layout?: 'icon+text' | 'text-only' | 'icon-only';
  styleType?: 'primary' | 'secondary' | 'outline' | 'transparent';
  shape?: 'rectangle' | 'pill';
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  className?: string;
  [key: string]: unknown;
}

const SECONDARY_BUTTON_STYLE = {
  backgroundColor: 'var(--rds-button-dropdown-secondary-bg)',
  color: 'var(--rds-button-dropdown-selected-text)',
} as const;

const RdsButtonDropdown = ({
  buttonText = 'Button',
  options,
  multiSelect = false,
  ui,
  state = 'default',
  disabled = false,
  selected: selectedProp = false,
  rightIcon,
  leftIcon,
  size = 'medium',
  layout = 'icon+text',
  styleType = 'primary',
  shape = 'rectangle',
  buttonState = 'default',
  className,
  onChange,
  ...legacyProps
}:RdsButtonDropdownProps) => {
  const legacyShowSearch = typeof legacyProps['showSearch'] === 'boolean' ? (legacyProps['showSearch'] as boolean) : undefined;
  const legacyShowUserAvatar = typeof legacyProps['showUserAvatar'] === 'boolean' ? (legacyProps['showUserAvatar'] as boolean) : undefined;
  const legacyShowRadio = typeof legacyProps['showRadio'] === 'boolean' ? (legacyProps['showRadio'] as boolean) : undefined;
  const legacyShowLeftIcon = typeof legacyProps['isShowLeftIcon'] === 'boolean' ? (legacyProps['isShowLeftIcon'] as boolean) : undefined;
  const legacyShowRightIcon = typeof legacyProps['isShowRightIcon'] === 'boolean' ? (legacyProps['isShowRightIcon'] as boolean) : undefined;

  const showSearch = ui?.search ? ui.search === 'visible' : (legacyShowSearch ?? false);
  const showUserAvatar = ui?.avatar ? ui.avatar === 'visible' : (legacyShowUserAvatar ?? true);
  const showRadio = ui?.selection ? ui.selection === 'radio' : (legacyShowRadio ?? true);
  const isShowLeftIcon = ui?.leftIcon ? ui.leftIcon === 'visible' : (legacyShowLeftIcon ?? true);
  const isShowRightIcon = ui?.rightIcon ? ui.rightIcon === 'visible' : (legacyShowRightIcon ?? true);

  const isDisabled = disabled || buttonState === 'disabled';
  const isSelected = selectedProp || buttonState === 'selected';

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // Legacy: state="selected" opened the menu on mount.
  const [forcedOpen, setForcedOpen] = useState(state === 'selected' && !isDisabled);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<(string | number)[]>(() => {
    const initialSelected: (string | number)[] = [];
    for (const option of options) {
      if (option.checked) {
        initialSelected.push(option.id);
      }
    }
    return initialSelected;
  });

  const handleClose = () => {
    setAnchorEl(null);
    setForcedOpen(false);
  };

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
      handleClose();
    }
  };

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const isDropdownOpen = !isDisabled && (Boolean(anchorEl) || forcedOpen);

  const handleDropdownButtonClick = (event: MouseEvent<HTMLElement>) => {
    if (isDisabled) return;
    if (isDropdownOpen) {
      handleClose();
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
        changeRightIcon={isDropdownOpen ? <KeyboardArrowUpIcon /> : rightIcon}
        changeLeftIcon={leftIcon}
        size={size}
        layout={layout}
        shape={shape}
        color="primary"
        disabled={isDisabled}
        selected={isSelected}
        state={buttonState === 'hover' ? 'hover' : undefined}
        variant={
          styleType === 'transparent' ? 'transparent' :
          styleType === 'primary' || styleType === 'secondary' ? 'filled' : 'outlined'
        }
        // RdsButton paints filled buttons with an inline primary colour, which beat the
        // secondary class; pass the secondary colour the same way (not when disabled).
        style={styleType === 'secondary' && !isDisabled ? SECONDARY_BUTTON_STYLE : undefined}
          className={clsx(
            className,
            styleType === 'secondary' && 'rds-button-dropdown--secondary',
            styleType === 'outline' && 'rds-button-dropdown__button',
            styleType === 'outline' && 'rds-button-dropdown--outline',
          )}
          textCase="uppercase"
      />
      <RdsMenu
        open={isDropdownOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        items={[]}
        slotProps={{ paper: { style: { minWidth: 176 }, className: 'rds-button-dropdown__menu' } }}
      >
        <div style={{ padding: 6, minWidth: 176 }}>
          {showSearch && (
            <div style={{ marginBottom: 6 }}>
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
          <div style={{ maxHeight: 220, overflowY: 'auto' }}>
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
                  <button
                    type="button"
                    aria-pressed={selected.includes(opt.id)}
                    className={clsx(
                      'rds-button-dropdown__option',
                      selected.includes(opt.id) && 'rds-button-dropdown__option--selected',
                      opt.disabled && 'rds-button-dropdown__option--disabled',
                    )}
                    onClick={() => !opt.disabled && handleOptionChange(opt.id)}
                    disabled={opt.disabled}
                  >
                    {opt.label}
                  </button>
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