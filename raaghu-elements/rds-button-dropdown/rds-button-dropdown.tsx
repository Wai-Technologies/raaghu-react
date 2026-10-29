import { useId, useState, type HTMLAttributes, type ReactNode, type MouseEvent, type Ref } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import clsx from 'clsx';
import './rds-button-dropdown.scss';
import RdsButton from '../rds-button/rds-button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RdsMenu from '../rds-menu/rds-menu';
import RdsCheckbox from '../rds-checkbox/rds-checkbox';
import RdsRadio from '../rds-radio/rds-radio';
import RdsAvatar from '../rds-avatar/rds-avatar';
import RdsSearch from '../rds-search/rds-search';
import { invokeValueFirstOnChange, resolveDeprecatedProp, warnDeprecatedProp } from '../shared/utils/deprecation';

export interface RdsButtonDropdownOption {
  id: string | number;
  label: string;
  avatarSrc?: string;
  checked?: boolean;
  disabled?: boolean;
}

export type RdsButtonDropdownCloseReason = 'backdropClick' | 'escapeKeyDown' | 'toggleInput' | 'selectOption';

/** Shape treatment aligned with `RdsButton.variant`. */
export type RdsButtonDropdownVariant = 'filled' | 'outlined' | 'transparent';
/** @deprecated Use `variant` (`filled` | `outlined` | `transparent`) with `color`. */
export type RdsButtonDropdownLegacyVariant = 'primary' | 'secondary' | 'outline' | 'transparent';
export type RdsButtonDropdownColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

const LEGACY_STYLE_VARIANTS = new Set<string>(['primary', 'secondary', 'outline']);

function resolveTriggerAppearance(
  rawVariant: string | undefined,
  colorProp: RdsButtonDropdownColor | undefined,
  component: string,
): {
  buttonVariant: RdsButtonDropdownVariant;
  color: RdsButtonDropdownColor;
  isSecondary: boolean;
  isOutline: boolean;
} {
  const resolved = rawVariant ?? 'filled';
  if (LEGACY_STYLE_VARIANTS.has(resolved)) {
    const replacement =
      resolved === 'outline'
        ? '`variant: "outlined"` (and optional `color`)'
        : `\`variant: "filled"\` with \`color: "${resolved}"\``;
    warnDeprecatedProp(component, `variant="${resolved}"`, replacement);
  }

  if (resolved === 'primary') {
    return { buttonVariant: 'filled', color: colorProp ?? 'primary', isSecondary: false, isOutline: false };
  }
  if (resolved === 'secondary') {
    return { buttonVariant: 'filled', color: colorProp ?? 'secondary', isSecondary: true, isOutline: false };
  }
  if (resolved === 'outline') {
    return { buttonVariant: 'outlined', color: colorProp ?? 'primary', isSecondary: false, isOutline: true };
  }
  if (resolved === 'transparent') {
    return { buttonVariant: 'transparent', color: colorProp ?? 'primary', isSecondary: false, isOutline: false };
  }
  if (resolved === 'outlined') {
    return { buttonVariant: 'outlined', color: colorProp ?? 'primary', isSecondary: false, isOutline: true };
  }
  const color = colorProp ?? 'primary';
  return {
    buttonVariant: 'filled',
    color,
    isSecondary: color === 'secondary',
    isOutline: false,
  };
}

export interface RdsButtonDropdownProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'children' | 'onClick' | 'onChange' | 'style' | 'defaultValue' | 'value' | 'color'> {
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
  
  onChange?: (selected: string[] | string, event: object) => void;
  size?: 'small' | 'medium' | 'large';
  layout?: 'icon+text' | 'text-only' | 'icon-only';
  /**
   * Shape treatment aligned with `RdsButton` (`filled` | `outlined` | `transparent`).
   * Legacy values `primary` | `secondary` | `outline` are deprecated — use `variant` + `color`.
   */
  variant?: RdsButtonDropdownVariant | RdsButtonDropdownLegacyVariant;
  /** Semantic color aligned with `RdsButton.color`. */
  color?: RdsButtonDropdownColor;
  /** @deprecated Use `variant` (`filled` | `outlined` | `transparent`) with `color`. */
  styleType?: RdsButtonDropdownLegacyVariant;
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
  /** Shows the start icon. `ui.leftIcon` takes precedence. Defaults to true when `startIcon`/`leftIcon` is set. */
  showLeftIcon?: boolean;
  /** @deprecated Use `showLeftIcon`. */
  isShowLeftIcon?: boolean;
  /** Shows the end icon. `ui.rightIcon` takes precedence. Defaults to `true`. */
  showRightIcon?: boolean;
  /** @deprecated Use `showRightIcon`. */
  isShowRightIcon?: boolean;
  /** Class name added to the trigger button. */
  className?: string;
  /** Styles applied to the trigger button. */
  sx?: SxProps<Theme>;
  /** Ref to the trigger button. */
  ref?: Ref<HTMLButtonElement>;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
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
  onClick,
  ui,
  searchable,
  showAvatar,
  optionVariant,
  variant,
  color: colorProp,
  endIcon,
  startIcon,
  rightIcon,
  leftIcon,
  size = 'medium',
  layout = 'icon+text',
  styleType: styleTypeProp,
  shape = 'rectangle',
  onChange,
  showSearch: showSearchProp,
  showUserAvatar: showUserAvatarProp,
  showRadio: showRadioProp,
  showLeftIcon: showLeftIconProp,
  showRightIcon: showRightIconProp,
  isShowLeftIcon: isShowLeftIconProp,
  isShowRightIcon: isShowRightIconProp,
  className,
  sx,
  ref,
  id,
  ...rest
}: RdsButtonDropdownProps) => {
  if (buttonText !== undefined) warnDeprecatedProp('RdsButtonDropdown', 'buttonText', '`children`');
  if (multiSelect !== undefined) warnDeprecatedProp('RdsButtonDropdown', 'multiSelect', '`multiple`');
  if (rightIcon !== undefined) warnDeprecatedProp('RdsButtonDropdown', 'rightIcon', '`endIcon`');
  if (leftIcon !== undefined) warnDeprecatedProp('RdsButtonDropdown', 'leftIcon', '`startIcon`');

  if (ui !== undefined) warnDeprecatedProp('RdsButtonDropdown', 'ui', '`searchable`, `showAvatar` and `optionVariant`');
  const rawVariant = resolveDeprecatedProp(
    variant,
    styleTypeProp,
    'RdsButtonDropdown',
    'styleType',
    '`variant` (`filled` | `outlined` | `transparent`) with `color`',
  );
  const { buttonVariant, color, isSecondary, isOutline } = resolveTriggerAppearance(
    rawVariant,
    colorProp,
    'RdsButtonDropdown',
  );
  const label = children ?? buttonText ?? 'Button';
  const isMultiple = multiple ?? multiSelect ?? false;
  const resolvedRightIcon = endIcon !== undefined ? endIcon : rightIcon;
  const resolvedLeftIcon = startIcon !== undefined ? startIcon : leftIcon;
  const showSearch = searchable ?? (ui?.search ? ui.search === 'visible' : flag(showSearchProp, false));
  const showUserAvatar = showAvatar ?? (ui?.avatar ? ui.avatar === 'visible' : flag(showUserAvatarProp, true));
  const showRadio = optionVariant ? optionVariant === 'radio' : ui?.selection ? ui.selection === 'radio' : flag(showRadioProp, true);
  const resolvedShowLeftIcon = resolveDeprecatedProp(
    showLeftIconProp,
    isShowLeftIconProp,
    'RdsButtonDropdown',
    'isShowLeftIcon',
    '`showLeftIcon`',
  );
  const resolvedShowRightIcon = resolveDeprecatedProp(
    showRightIconProp,
    isShowRightIconProp,
    'RdsButtonDropdown',
    'isShowRightIcon',
    '`showRightIcon`',
  );
  const isShowLeftIcon = ui?.leftIcon ? ui.leftIcon === 'visible' : flag(resolvedShowLeftIcon, resolvedLeftIcon != null);
  const isShowRightIcon = ui?.rightIcon ? ui.rightIcon === 'visible' : flag(resolvedShowRightIcon, true);

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
      invokeValueFirstOnChange(onChange, next as string[], event);
    } else {
      if (!isValueControlled) setSelectedState([id]);
      invokeValueFirstOnChange(onChange, id.toString(), event);
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
          {...rest}
        id={id}
          ref={ref}
          sx={sx}
          text={typeof label === 'string' ? label : undefined}
          onClick={(event) => {
            onClick?.(event);
            handleDropdownButtonClick(event);
          }}
        showRightIcon={isShowRightIcon}
        showLeftIcon={isShowLeftIcon}
        changeRightIcon={isDropdownOpen ? <KeyboardArrowUpIcon /> : (resolvedRightIcon ?? <KeyboardArrowDownIcon />)}
        changeLeftIcon={resolvedLeftIcon}
        size={size}
        layout={layout}
        shape={shape}
        color={color}
        disabled={disabled}
        selected={isButtonSelected}
        variant={buttonVariant}
        className={clsx(
          isSecondary && 'rds-button-dropdown--secondary',
          isOutline && 'rds-button-dropdown__button',
          isOutline && 'rds-button-dropdown--outline',
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
                    onChange={(event) => handleOptionChange(opt.id, event)}
                    isDisabled={opt.disabled}
                    labelText= {opt.label}
                  />
                ) : showRadio ? (
                  <RdsRadio
                    options={[{ value: opt.id.toString(), label: opt.label, disabled: opt.disabled }]}
                    value={selected[0]?.toString()}
                    onChange={(event) => handleOptionChange(opt.id, event)}
                    layout="icon with label"
                    className={isOutline ? 'rds-button-dropdown__button rds-button-dropdown--outline' : ''}
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
