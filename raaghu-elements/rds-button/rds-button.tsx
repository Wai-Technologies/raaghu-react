import { type ReactNode, type CSSProperties } from 'react';
import { Button as MuiButton, type ButtonProps } from '@mui/material';
import { useTheme, type SxProps, type Theme } from '@mui/material/styles';
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
import RdsCompSpinner, { SpinnerLayout, SpinnerSize } from '../../raaghu-components/rds-comp-spinner/rds-comp-spinner';
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

const SX_ONLY_KEY = /^([mp][trblxy]?|bgcolor|[&:@.].*)$/;
const SPACING_KEY = /^((margin|padding)(Top|Right|Bottom|Left|Inline|Block)?|(row|column)?Gap|gap)$/;
const SIZING_KEY = /^(min|max)?(Width|Height)$|^(width|height)$/;
const toInlineStyle = (sx: SxProps<Theme> | undefined, theme: Theme): CSSProperties => {
  if (!sx || typeof sx !== 'object' || Array.isArray(sx)) return {};
  const style: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(sx)) {
    if (SX_ONLY_KEY.test(key) || (typeof value !== 'string' && typeof value !== 'number')) continue;
    if (typeof value === 'number' && SPACING_KEY.test(key)) style[key] = theme.spacing(value);
    else if (typeof value === 'number' && key === 'borderRadius') style[key] = `${value * Number(theme.shape.borderRadius)}px`;
    else if (typeof value === 'number' && SIZING_KEY.test(key) && value > 0 && value <= 1) style[key] = `${value * 100}%`;
    else style[key] = value;
  }
  return style as CSSProperties;
};

const toSxArray = (sx: SxProps<Theme> | undefined) => (Array.isArray(sx) ? sx : sx ? [sx] : []);

export interface RdsButtonProps extends Omit<ButtonProps, 'variant' | 'style' | 'component'> {
  shape?: 'pill' | 'rectangle';
  /** Applies the selected visual treatment, for toggle-style buttons. */
  selected?: boolean;
  layout?: 'icon+text' | 'icon-only' | 'text-only';
  style?: 'filled' | 'outlined' | 'transparent';
  color?: ButtonProps['color'];
  textCase?: 'uppercase' | 'lowercase' | 'capitalize' | 'unset';
  /** Shows the Raaghu loading spinner and disables the button. */
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
  ...props
}: RdsButtonProps) => {
  if (text !== undefined) warnDeprecatedProp('RdsButton', 'text', '`children`');
  if (isLoading !== undefined) warnDeprecatedProp('RdsButton', 'isLoading', '`loading`');

  const theme = useTheme();
  const isBusy = loading ?? isLoading ?? false;
  const normalizedLayout = LAYOUT_ALIASES[layout.trim().toLowerCase()] ?? layout;
  const isIconOnly = normalizedLayout === 'icon-only';
  const legacyStartIcon = showLeftIcon ? resolveIcon(changeLeftIcon ?? 'add') : undefined;
  const legacyEndIcon = showRightIcon ? resolveIcon(changeRightIcon ?? 'save') : undefined;

  const usesTokenColorStyling = !color || color === 'primary';

  const styleVariantClass =
    style === 'filled' ? 'rds-button__primary'
    : style === 'outlined' ? (usesTokenColorStyling ? 'rds-button__secondary' : '')
    : style === 'transparent' ? (usesTokenColorStyling ? 'rds-button__text' : '')
    : '';

  const layoutClass =
    normalizedLayout === 'icon+text' ? 'rds-button--layout-icon-text'
    : isIconOnly ? 'rds-button--layout-icon-only'
    : 'rds-button--layout-text-only';

  const hasIcons = normalizedLayout === 'icon+text' && Boolean(showLeftIcon || showRightIcon);
  const resolvedStartIcon = startIcon !== undefined ? startIcon : hasIcons ? legacyStartIcon : undefined;
  const resolvedEndIcon = endIcon !== undefined ? endIcon : hasIcons ? legacyEndIcon : undefined;

  const renderContent = () => {
    if (isBusy) {
      return <RdsCompSpinner
        color="light"
        label={text || (typeof children === 'string' ? children : '') || "Loading"}
        layout={SpinnerLayout.SpinnerAndLabel}
        showLabel
        size={SpinnerSize.Small}
      />;
    }
    if (isIconOnly) return legacyStartIcon ?? legacyEndIcon ?? null;
    return text || children;
  };

  const getPaletteValue = (key: 'main' | 'contrastText'): string | undefined => {
    if (style !== 'filled' || !color || color === 'inherit') return undefined;
    const paletteColor = theme.palette[color as keyof typeof theme.palette];
    if (paletteColor && typeof paletteColor === 'object' && key in paletteColor) {
      return (paletteColor as Record<typeof key, string>)[key];
    }
    return undefined;
  };

  const shapeStyles: CSSProperties = {
    borderRadius: shape === 'pill' ? 'var(--rds-border-radius-pill)' : 'var(--rds-border-radius-sm)',
  };
  const textCaseStyles: CSSProperties = {
    textTransform: textCase === 'unset' ? 'none' : textCase,
  };
  const filledBackgroundColor = getPaletteValue('main');
  const filledTextColor = getPaletteValue('contrastText');

  return (
    <MuiButton
      disabled={disabled || isBusy}
      variant={style === 'filled' ? 'contained' : style === 'transparent' ? 'text' : style}
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
        ...(style === 'filled' && filledBackgroundColor ? { backgroundColor: filledBackgroundColor } : {}),
        ...(style === 'filled' && filledTextColor ? { color: filledTextColor } : {}),
        ...(isBusy ? { opacity: 1 } : {}),
        ...toInlineStyle(sx, theme),
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
