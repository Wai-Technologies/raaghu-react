import { type ReactNode, type CSSProperties } from 'react';
import { Button as MuiButton, type ButtonProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import clsx from 'clsx';
import { Add, Delete, Save, Edit, Close, ArrowForward, ArrowBack, RadioButtonUnchecked, ChevronRight, ChevronLeft, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import RdsCompSpinner, { SpinnerLayout, SpinnerSize } from '../../raaghu-components/rds-comp-spinner/rds-comp-spinner';
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

export interface RdsButtonProps extends Omit<ButtonProps, 'variant' | 'style' | 'component'> {
  text?: string;
  isLoading?: boolean;
  shape?: 'pill' | 'rectangle';
  state?: 'default' | 'hover' | 'disabled' | 'selected';
  layout?: 'icon+text' | 'icon-only' | 'text-only';
  style?: 'filled' | 'outlined' | 'transparent';
  color?: ButtonProps['color'];
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  changeLeftIcon?: ReactNode;
  changeRightIcon?: ReactNode;
  textCase?: 'uppercase' | 'lowercase' | 'capitalize' | 'unset';
}

const RdsButton = ({
  text,
  children,
  isLoading = false,
  disabled,
  shape = 'rectangle',
  sx,
  style,
  color = 'primary',
  layout = 'icon+text',
  showLeftIcon = false,
  showRightIcon = false,
  changeLeftIcon = 'add',
  changeRightIcon = 'save',
  state = 'default',
  textCase = 'uppercase',
  ...props
}:RdsButtonProps) => {
  const theme = useTheme();
  let normalizedLayout = layout;
  if (typeof layout === 'string') {
    switch (layout.trim().toLowerCase()) {
      case 'icon + text':
        normalizedLayout = 'icon+text';
        break;
      case 'icon only':
        normalizedLayout = 'icon-only';
        break;
      case 'text only':
        normalizedLayout = 'text-only';
        break;
      default:
        normalizedLayout = layout;
    }
  }
  const getShapeStyles = () => {
    if (shape === 'pill') {
      return {
        borderRadius: 'var(--rds-border-radius-pill)',
      };
    }
    return {
      borderRadius: 'var(--rds-border-radius-sm)',
    };
  };

  const getTextCaseStyles = () => ({
    textTransform: (textCase === 'unset' ? 'none' : textCase) as CSSProperties['textTransform'],
  });

  const styleVariantClass =
    style === 'filled' ? 'rds-button__primary'
    : style === 'outlined' ? 'rds-button__secondary'
    : style === 'transparent' ? 'rds-button__text'
    : '';

  const stateClass =
    state === 'hover' ? 'rds-button__state-hover'
    : state === 'selected' ? 'rds-button__state-selected'
    : state === 'disabled' ? 'rds-button__state-disabled'
    : 'rds-button__state-default';

  const shapeClass = shape === 'pill' ? 'rds-button--shape-pill' : 'rds-button--shape-rectangle';

  const layoutClass =
    normalizedLayout === 'icon+text' ? 'rds-button--layout-icon-text'
    : normalizedLayout === 'icon-only' ? 'rds-button--layout-icon-only'
    : 'rds-button--layout-text-only';

  const hasIconClass = (normalizedLayout === 'icon+text' && (showLeftIcon || showRightIcon)) ? 'rds-button--has-icon' : '';

  const getStartIcon = () => {
    if (normalizedLayout === 'icon-only') {
      return undefined;
    }
    if (normalizedLayout === 'icon+text' && showLeftIcon) {
      return resolveIcon(changeLeftIcon);
    }
    return undefined;
  };

  const getEndIcon = () => {
    if (normalizedLayout === 'icon-only') {
      return undefined;
    }
    if (normalizedLayout === 'icon+text' && showRightIcon) {
      return resolveIcon(changeRightIcon);
    }
    return undefined;
  };

  const renderContent = () => {
    if (isLoading) {
      return <RdsCompSpinner
        colorVariant="light"
        labelText={text || "Loading"}
        layout={SpinnerLayout.SpinnerAndLabel}
        showLabel
        size={SpinnerSize.Small}
      />;
    }
    if (normalizedLayout === 'icon-only') {
      if (showLeftIcon) {
        return resolveIcon(changeLeftIcon);
      }
      if (showRightIcon) {
        return resolveIcon(changeRightIcon);
      }
      return null;
    }
    if (normalizedLayout === 'icon+text' || normalizedLayout === 'text-only') {
      return text || children;
    }
    return null;
  };

  const getFilledTextColor = (): string | undefined => {
    if (style !== 'filled' || !color || color === 'inherit') return undefined;
    const paletteColor = theme.palette[color as keyof typeof theme.palette];
    if (paletteColor && typeof paletteColor === 'object' && 'contrastText' in paletteColor) {
      return (paletteColor as { contrastText: string }).contrastText;
    }
    return undefined;
  };

  const getFilledBackgroundColor = (): string | undefined => {
    if (style !== 'filled' || !color || color === 'inherit') return undefined;
    const paletteColor = theme.palette[color as keyof typeof theme.palette];
    if (paletteColor && typeof paletteColor === 'object' && 'main' in paletteColor) {
      return (paletteColor as { main: string }).main;
    }
    return undefined;
  };

  const isButtonDisabled = disabled || state === 'disabled' || isLoading;
  const shapeStyles = getShapeStyles();
  const textCaseStyles = getTextCaseStyles();
  const filledBackgroundColor = getFilledBackgroundColor();
  const filledTextColor = getFilledTextColor();
  const contentElement = renderContent();

  const hasIcons = normalizedLayout === 'icon+text' && (showLeftIcon || showRightIcon);

  return (
    <MuiButton
      disabled={isButtonDisabled}
      variant={style === 'filled' ? 'contained' : style === 'transparent' ? 'text' : style}
      color={color}
      className={clsx('rds-button', layoutClass, hasIconClass, styleVariantClass, stateClass, shapeClass, isLoading && 'rds-button__loading')}
      sx={{
        ...shapeStyles,
        ...textCaseStyles,
        '& .MuiButton-startIcon': { margin: 0 },
        '& .MuiButton-endIcon': { margin: 0 },
        ...(hasIcons ? { padding: '6px' } : {}),
        ...sx,
      }}
      style={{
        ...shapeStyles as CSSProperties,
        ...textCaseStyles as CSSProperties,
        ...(style === 'filled' && filledBackgroundColor ? { backgroundColor: filledBackgroundColor } : {}),
        ...(style === 'filled' && filledTextColor ? { color: filledTextColor } : {}),
        ...(isLoading ? { opacity: 1 } : {}),
        ...(sx as any),
      }}
      startIcon={getStartIcon()}
      endIcon={getEndIcon()}
      {...props}
    >
      {contentElement}
    </MuiButton>
  );
};

RdsButton.displayName = 'RdsButton';
export default RdsButton;
