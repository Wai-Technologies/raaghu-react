import React from 'react';
import { Button as MuiButton, type ButtonProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  normalizeLayout,
  getShapeStyles,
  getTextCaseStyles,
  getStateClassName,
  getShapeClassName,
  getStartIcon,
  getEndIcon,
  renderButtonContent,
  getMuiVariant,
  getStyleVariantClass,
  getFilledTextColor,
  getFilledBackgroundColor,
} from './rds-button.helpers';
import './rds-button.scss';

export interface RdsButtonProps extends Omit<ButtonProps, 'variant' | 'style'> {
  text?: string;
  isLoading?: boolean;
  shape?: 'pill' | 'rectangle';
  state?: 'default' | 'hover' | 'disabled' | 'selected';
  layout?: 'icon+text' | 'icon-only' | 'text-only';
  style?: 'filled' | 'outlined' | 'transparent';
  color?: ButtonProps['color'];
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  changeLeftIcon?: React.ReactNode;
  changeRightIcon?: React.ReactNode;
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
}: RdsButtonProps) => {
  const theme = useTheme();
  const normalizedLayout = typeof layout === 'string' ? normalizeLayout(layout) : layout;
  const shapeStyles = getShapeStyles(shape);
  const textCaseStyles = getTextCaseStyles(textCase);
  const isButtonDisabled = disabled || state === 'disabled' || isLoading;
  const filledBackgroundColor = getFilledBackgroundColor(style, color, theme);
  const filledTextColor = getFilledTextColor(style, color, theme);

  return (
    <MuiButton
      disabled={isButtonDisabled}
      variant={getMuiVariant(style)}
      color={color as ButtonProps['color']}
      className={`rds-button ${getStyleVariantClass(style)} ${getStateClassName(state)} ${getShapeClassName(shape)} ${isLoading ? 'rds-button__loading' : ''}`
        .replace(/\s+/g, ' ')
        .trim()}
      sx={{
        ...shapeStyles,
        ...textCaseStyles,
        ...sx,
      }}
      style={{
        ...(shapeStyles as React.CSSProperties),
        ...(textCaseStyles as React.CSSProperties),
        ...(isLoading && style === 'filled' && filledBackgroundColor
          ? { backgroundColor: filledBackgroundColor }
          : {}),
        ...(filledTextColor ? { color: filledTextColor } : {}),
        ...(isLoading ? { opacity: 1 } : {}),
        ...(sx as React.CSSProperties),
      }}
      startIcon={getStartIcon(normalizedLayout, showLeftIcon, changeLeftIcon)}
      endIcon={getEndIcon(normalizedLayout, showRightIcon, changeRightIcon)}
      {...props}
    >
      {renderButtonContent(
        isLoading,
        normalizedLayout,
        showLeftIcon,
        showRightIcon,
        changeLeftIcon,
        changeRightIcon,
        text,
        children
      )}
    </MuiButton>
  );
};

RdsButton.displayName = 'RdsButton';
export default RdsButton;
