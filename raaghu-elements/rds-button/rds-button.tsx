import { type ReactNode, type CSSProperties } from 'react';
import { useFormStatus } from 'react-dom';
import { Button as MuiButton, type ButtonProps } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import clsx from 'clsx';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Save from '@mui/icons-material/Save';
import Edit from '@mui/icons-material/Edit';
import Close from '@mui/icons-material/Close';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ArrowBack from '@mui/icons-material/ArrowBack';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-button.scss';

function getIconComponent(iconType?: string): ReactNode {
  switch (iconType) {
    case 'add': return <Add />;
    case 'delete': return <Delete />;
    case 'save': return <Save />;
    case 'edit': return <Edit />;
    case 'close': return <Close />;
    case 'arrow-forward': return <ArrowForward />;
    case 'chevron':
    case 'chevron_right': return <ChevronRight />;
    case 'chevron_left': return <ChevronLeft />;
    case 'chevron_up': return <KeyboardArrowUp />;
    case 'chevron_down': return <KeyboardArrowDown />;
    case 'arrow-back': return <ArrowBack />;
    case 'circle': return <RadioButtonUnchecked />;
    default: return null;
  }
}
const resolveIcon = (icon?: ReactNode | string): ReactNode => {
  if (typeof icon === 'string') {
    return getIconComponent(icon);
  }
  return icon;
};

const LAYOUT_ALIASES: Record<string, RdsButtonProps['layout']> = {
  'icon + text': 'icon+text',
  'icon only': 'icon-only',
  'text only': 'text-only',
};

const toSxArray = (sx: SxProps<Theme> | undefined) => (Array.isArray(sx) ? sx : sx ? [sx] : []);

type ButtonVariant = 'filled' | 'outlined' | 'transparent';

export interface RdsButtonProps extends Omit<ButtonProps, 'variant' | 'style'> {
  shape?: 'pill' | 'rectangle';
  /** Applies the selected visual treatment, for toggle-style buttons. */
  selected?: boolean;
  layout?: 'icon+text' | 'icon-only' | 'text-only';
  variant?: ButtonVariant;
  /** @deprecated Passing a variant string is deprecated; use `variant`. Pass CSSProperties for inline styles. */
  style?: ButtonVariant | CSSProperties;
  color?: ButtonProps['color'];
  textCase?: 'uppercase' | 'lowercase' | 'capitalize' | 'unset';
  /**
   * Shows the MUI loading indicator and disables the button.
   * When omitted, submit buttons also follow React DOM `useFormStatus().pending`.
   */
  loading?: boolean;
  /** Shows `changeLeftIcon` (adds the Raaghu icon padding; MUI `startIcon` does not). */
  showLeftIcon?: boolean;
  /** Shows `changeRightIcon` (adds the Raaghu icon padding; MUI `endIcon` does not). */
  showRightIcon?: boolean;
  /** Left icon: an element or a name (`add`, `delete`, `save`, `edit`, `close`, `arrow-forward`, `arrow-back`, `circle`, `chevron`…). Defaults to `add`. */
  changeLeftIcon?: ReactNode;
  /** Right icon: an element or an icon name. Defaults to `save`. */
  changeRightIcon?: ReactNode;
  /** @deprecated Use `children`. */
  text?: string;
  /** @deprecated Use `loading`. */
  isLoading?: boolean;
}

const RdsButton = ({
  text,
  children,
  loading,
  isLoading,
  disabled,
  shape = 'rectangle',
  sx,
  style,
  variant,
  color = 'primary',
  layout = 'icon+text',
  showLeftIcon,
  showRightIcon,
  changeLeftIcon,
  changeRightIcon,
  selected,
  textCase = 'uppercase',
  className,
  startIcon,
  endIcon,
  type,
  ...props
}: RdsButtonProps) => {
  if (text !== undefined) warnDeprecatedProp('RdsButton', 'text', '`children`');
  if (isLoading !== undefined) warnDeprecatedProp('RdsButton', 'isLoading', '`loading`');

  const { pending } = useFormStatus();
  const legacyVariant = typeof style === 'string' ? style : undefined;
  if (legacyVariant !== undefined) warnDeprecatedProp('RdsButton', 'style', '`variant`');
  const buttonVariant = variant ?? legacyVariant;
  // Explicit loading props win; otherwise submit buttons track the parent form's pending state.
  const isBusy = loading ?? isLoading ?? (type === 'submit' && pending);
  const normalizedLayout = LAYOUT_ALIASES[layout.trim().toLowerCase()] ?? layout;
  const isIconOnly = normalizedLayout === 'icon-only';
  const legacyStartIcon = showLeftIcon ? resolveIcon(changeLeftIcon ?? 'add') : undefined;
  const legacyEndIcon = showRightIcon ? resolveIcon(changeRightIcon ?? 'save') : undefined;

  const usesTokenColorStyling = !color || color === 'primary';

  const styleVariantClass =
    buttonVariant === 'filled' ? 'rds-button__primary'
    : buttonVariant === 'outlined' ? (usesTokenColorStyling ? 'rds-button__secondary' : '')
    : buttonVariant === 'transparent' ? (usesTokenColorStyling ? 'rds-button__text' : '')
    : '';

  const layoutClass =
    normalizedLayout === 'icon+text' ? 'rds-button--layout-icon-text'
    : isIconOnly ? 'rds-button--layout-icon-only'
    : 'rds-button--layout-text-only';

  const hasIcons = normalizedLayout === 'icon+text' && Boolean(showLeftIcon || showRightIcon);
  const resolvedStartIcon = startIcon !== undefined ? startIcon : hasIcons ? legacyStartIcon : undefined;
  const resolvedEndIcon = endIcon !== undefined ? endIcon : hasIcons ? legacyEndIcon : undefined;

  const renderContent = () => {
    if (isIconOnly) return legacyStartIcon ?? legacyEndIcon ?? null;
    return text || children;
  };

  const shapeStyles: CSSProperties = {
    borderRadius: shape === 'pill' ? 'var(--rds-border-radius-pill)' : 'var(--rds-border-radius-sm)',
  };
  const textCaseStyles: CSSProperties = {
    textTransform: textCase === 'unset' ? 'none' : textCase,
  };

  return (
    <MuiButton
      disabled={disabled || isBusy}
      loading={isBusy}
      type={type}
      variant={buttonVariant === 'filled' ? 'contained' : buttonVariant === 'transparent' ? 'text' : buttonVariant}
      color={color}
      className={clsx(
        'rds-button',
        layoutClass,
        hasIcons && 'rds-button--has-icon',
        styleVariantClass,
        selected && 'rds-button--selected',
        shape === 'pill' ? 'rds-button--shape-pill' : 'rds-button--shape-rectangle',
        isBusy && 'rds-button__loading',
        className,
      )}
      sx={[
        {
          '& .MuiButton-startIcon': { margin: 0 },
          '& .MuiButton-endIcon': { margin: 0 },
          ...(hasIcons ? { padding: '6px' } : {}),
        },
        ...toSxArray(sx),
      ]}
      style={{
        ...shapeStyles,
        ...textCaseStyles,
        ...(isBusy ? { opacity: 1 } : {}),
        ...(typeof style === 'object' ? style : undefined),
      }}
      startIcon={resolvedStartIcon}
      endIcon={resolvedEndIcon}
      aria-label={props['aria-label'] ?? (isIconOnly ? text : undefined)}
      aria-pressed={selected}
      {...props}
    >
      {renderContent()}
    </MuiButton>
  );
};

RdsButton.displayName = 'RdsButton';
export default RdsButton;
