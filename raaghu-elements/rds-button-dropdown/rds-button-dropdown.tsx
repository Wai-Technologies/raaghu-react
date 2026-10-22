import { useId, useState, type AriaAttributes, type ReactNode, type MouseEvent } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import clsx from 'clsx';
import './rds-button-dropdown.scss';
import RdsButton from '../rds-button/rds-button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RdsMenu from '../rds-menu/rds-menu';
import RdsCheckbox from '../rds-checkbox/rds-checkbox';
import RdsRadio from '../rds-radio/rds-radio';
import RdsAvatar from '../rds-avatar/rds-avatar';
import RdsSearch from '../rds-search/rds-search';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

export interface RdsButtonDropdownOption {
  id: string | number;
  label: string;
  avatarSrc?: string;
  checked?: boolean;
  disabled?: boolean;
}

export type RdsButtonDropdownCloseReason = 'backdropClick' | 'escapeKeyDown' | 'toggleInput' | 'selectOption';

export interface RdsButtonDropdownProps extends AriaAttributes {
  /** Trigger label. Defaults to `'Button'`. */
  children?: ReactNode;
  options: RdsButtonDropdownOption[];
  /** Multi-select (checkbox) mode. Defaults to `false`. */
  multiple?: boolean;
  /** Selected option ids (controlled). */
  value?: Array<string | number>;
  /** Initially selected option ids (uncontrolled). Defaults to the options with `checked: true`. */
  defaultValue?: Array<string | number>;
  /** Opens the menu (controlled). When not set, the trigger toggles it. */
  open?: boolean;
  /** Disables the trigger button. */
  disabled?: boolean;
  /** Applies the selected treatment to the trigger button. */
  selected?: boolean;
  /** Called when the trigger asks to open the menu. */
  onOpen?: (event: MouseEvent<HTMLElement>) => void;
  /** Called when the menu asks to close (trigger click, backdrop click, Escape, or a single-select choice). */
  onClose?: (event: object, reason: RdsButtonDropdownCloseReason) => void;
  /** @deprecated Use `searchable`, `showAvatar` and `optionVariant` instead. */
  ui?: {
    search?: 'visible' | 'hidden';
    avatar?: 'visible' | 'hidden';
    selection?: 'radio' | 'button';
    leftIcon?: 'visible' | 'hidden';
    rightIcon?: 'visible' | 'hidden';
  };
  /** Shows the search field in the menu. Preferred over `ui.search`. */
  searchable?: boolean;
  /** Shows an avatar next to each option. Preferred over `ui.avatar`. */
  showAvatar?: boolean;
  /** Single-select options as `'radio'` or plain `'button'`s. Preferred over `ui.selection`. */
  optionVariant?: 'radio' | 'button';
  onChange?: (selected: string[] | string) => void;
  size?: 'small' | 'medium' | 'large';
  layout?: 'icon+text' | 'text-only' | 'icon-only';
  /** Visual style. Preferred over `styleType`. */
  variant?: 'primary' | 'secondary' | 'outline' | 'transparent';
  styleType?: 'primary' | 'secondary' | 'outline' | 'transparent';
  shape?: 'rectangle' | 'pill';
  /** Icon after the label. */
  endIcon?: ReactNode;
  /** Icon before the label. */
  startIcon?: ReactNode;
  /** Shows the search field in the menu. `ui.search` takes precedence. Defaults to `false`. */
  showSearch?: boolean;
  /** Shows an avatar next to each option. `ui.avatar` takes precedence. Defaults to `true`. */
  showUserAvatar?: boolean;
  /** Single-select options as radios (`true`) or plain buttons (`false`). `ui.selection` takes precedence. Defaults to `true`. */
  showRadio?: boolean;
  /** Shows the start icon. `ui.leftIcon` takes precedence. Defaults to `true`. */
  isShowLeftIcon?: boolean;
  /** Shows the end icon. `ui.rightIcon` takes precedence. Defaults to `true`. */
  isShowRightIcon?: boolean;
  /** Class name added to the trigger button. */
  className?: string;
  /** Styles applied to the trigger button. */
  sx?: SxProps<Theme>;
  /** Id of the trigger button. */
  id?: string;
  /** @deprecated Use `children` instead. */
  buttonText?: string;
  /** @deprecated Use `multiple` instead. */
  multiSelect?: boolean;
  /** @deprecated Use `endIcon` instead. */
  rightIcon?: ReactNode;
  /** @deprecated Use `startIcon` instead. */
  leftIcon?: ReactNode;
  [key: `data-${string}`]: string | number | boolean | undefined;
}

const isForwardedAttribute = (key: string) => key.startsWith('aria-') || key.startsWith('data-');
const flag = (value: unknown, fallback: boolean) => (typeof value === 'boolean' ? value : fallback);

const RdsButtonDropdown = ({
  children,
  buttonText,
  options,
  multiple,
  multiSelect,
  value,
  defaultValue,
  open,
  disabled = false,
  selected: isButtonSelected,
  onOpen,
  onClose,
  ui,
  searchable,
  showAvatar,
  optionVariant,
  variant,
  endIcon,
  startIcon,
  rightIcon,
  leftIcon,
  size = 'medium',
  layout = 'icon+text',
  styleType: styleTypeProp = 'primary',
  shape = 'rectangle',
  onChange,
  showSearch: showSearchProp,
  showUserAvatar: showUserAvatarProp,
  showRadio: showRadioProp,
  isShowLeftIcon: isShowLeftIconProp,
  isShowRightIcon: isShowRightIconProp,
  className,
  sx,
  id,
  ...rest
}: RdsButtonDropdownProps) => {
  if (buttonText !== undefined) warnDeprecatedProp('RdsButtonDropdown', 'buttonText', '`children`');
  if (multiSelect !== undefined) warnDeprecatedProp('RdsButtonDropdown', 'multiSelect', '`multiple`');
  if (rightIcon !== undefined) warnDeprecatedProp('RdsButtonDropdown', 'rightIcon', '`endIcon`');
  if (leftIcon !== undefined) warnDeprecatedProp('RdsButtonDropdown', 'leftIcon', '`startIcon`');

  if (ui !== undefined) warnDeprecatedProp('RdsButtonDropdown', 'ui', '`searchable`, `showAvatar` and `optionVariant`');
  const styleType = variant ?? styleTypeProp;
  const label = children ?? buttonText ?? 'Button';
  const isMultiple = multiple ?? multiSelect ?? false;
  const resolvedRightIcon = endIcon !== undefined ? endIcon : rightIcon;
  const resolvedLeftIcon = startIcon !== undefined ? startIcon : leftIcon;
  const forwardedAttributes = Object.fromEntries(
    Object.entries(rest).filter(([key]) => isForwardedAttribute(key)),
  );

  const showSearch = searchable ?? (ui?.search ? ui.search === 'visible' : flag(showSearchProp, false));
  const showUserAvatar = showAvatar ?? (ui?.avatar ? ui.avatar === 'visible' : flag(showUserAvatarProp, true));
  const showRadio = optionVariant ? optionVariant === 'radio' : ui?.selection ? ui.selection === 'radio' : flag(showRadioProp, true);
  const isShowLeftIcon = ui?.leftIcon ? ui.leftIcon === 'visible' : flag(isShowLeftIconProp, true);
  const isShowRightIcon = ui?.rightIcon ? ui.rightIcon === 'visible' : flag(isShowRightIconProp, true);

  const menuId = useId();
  const isOpenControlled = open !== undefined;
  const isValueControlled = value !== undefined;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState<(string | number)[]>(() => {
    if (defaultValue !== undefined) return defaultValue;
    const initialSelected: (string | number)[] = [];
    for (const option of options) {
      if (option.checked) {
        initialSelected.push(option.id);
      }
    }
    return initialSelected;
  });
  const selected = isValueControlled ? value : selectedState;

  const isDropdownOpen = isOpenControlled ? open : Boolean(anchorEl);

  const requestClose = (event: object, reason: RdsButtonDropdownCloseReason) => {
    if (!isOpenControlled) setAnchorEl(null);
    onClose?.(event, reason);
  };

  const handleOptionChange = (id: string | number, event: object = {}) => {
    if (isMultiple) {
      const next = selected.includes(id) ? selected.filter(i => i !== id) : [...selected, id];
      if (!isValueControlled) setSelectedState(next);
      onChange?.(next as string[]);
    } else {
      if (!isValueControlled) setSelectedState([id]);
      onChange?.(id.toString());
      requestClose(event, 'selectOption');
    }
  };

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleDropdownButtonClick = (event: MouseEvent<HTMLElement>) => {
    if (isDropdownOpen) {
      requestClose(event, 'toggleInput');
    } else {
      setAnchorEl(event.currentTarget);
      onOpen?.(event);
    }
  };

  return (
    <>
      <RdsButton
        {...forwardedAttributes}
        id={id}
        sx={sx}
        text={typeof label === 'string' ? label : undefined}
        onClick={handleDropdownButtonClick}
        showRightIcon={isShowRightIcon}
        showLeftIcon={isShowLeftIcon}
        changeRightIcon={isDropdownOpen ? <KeyboardArrowUpIcon /> : resolvedRightIcon}
        changeLeftIcon={resolvedLeftIcon}
        size={size}
        layout={layout}
        shape={shape}
        color="primary"
        disabled={disabled}
        selected={isButtonSelected}
        style={
          styleType === 'transparent' ? 'transparent' :
          styleType === 'primary' ? 'filled' :
          styleType === 'secondary' ? 'filled' : 'outlined'
        }
        className={clsx(
          styleType === 'secondary' && 'rds-button-dropdown--secondary',
          styleType === 'outline' && 'rds-button-dropdown__button',
          styleType === 'outline' && 'rds-button-dropdown--outline',
          className,
        )}
        aria-haspopup="menu"
        aria-expanded={isDropdownOpen}
        aria-controls={isDropdownOpen ? menuId : undefined}
      >
        {typeof label === 'string' ? undefined : label}
      </RdsButton>
      <RdsMenu
        id={menuId}
        open={isDropdownOpen}
        anchorEl={anchorEl}
        onClose={requestClose}
        items={[]}
        slotProps={{ paper: { style: { minWidth: 176 }, className: 'rds-button-dropdown__menu', elevation: 0 } }}
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
                {isMultiple ? (
                  <RdsCheckbox
                    checked={selected.includes(opt.id)}
                    onChange={() => handleOptionChange(opt.id)}
                    isDisabled={opt.disabled}
                    labeltext= {opt.label}
                  />
                ) : showRadio ? (
                  <RdsRadio
                    options={[{ value: opt.id.toString(), label: opt.label }]}
                    value={selected[0]?.toString()}
                    onChange={(event) => handleOptionChange(opt.id, event)}
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
                    onClick={(event) => !opt.disabled && handleOptionChange(opt.id, event)}
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
