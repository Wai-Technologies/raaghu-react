import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import { Add, Delete, Save } from '@mui/icons-material';
import './rds-button.scss';
export interface RdsButtonProps extends Omit<ButtonProps, 'variant' | 'style'> {
  text?: string;
  isLoading?: boolean;
  iconPosition?: 'start' | 'end';
  shape?: 'pill' | 'rectangle';
  state?: 'default' | 'hover' | 'disabled' | 'selected';
  layout?: 'icon+text' | 'icon-only' | 'text-only';
  style?: 'filled' | 'outlined' | 'transparent';
  icon?: 'add' | 'delete' | 'save';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  inputSize?: 'small' | 'medium' | 'large';
}

const RdsButton: React.FC<RdsButtonProps> = ({
  text,
  children,
  isLoading = false,
  iconPosition = 'start',
  disabled,
  shape = 'rectangle',
  sx,
  style,
  layout = 'icon+text',
  startIcon,
  endIcon,
  state = 'default',
  icon,
  inputSize = 'small',
  ...props
}) => {
  // Normalize layout prop to support Storybook options
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
        borderRadius: '50px',
      };
    }
    return {
      borderRadius: '4px',
    };
  };

  const getIconComponent = () => {
    switch (icon) {
      case 'add':
        return <Add />;
      case 'delete':
        return <Delete />;
      case 'save':
        return <Save />;
      default:
        return null;
    }
  };

  const getStateStyles = () => {
    // Return empty object since we're using CSS classes for state styling
    return {};
  };

  const getStateClassName = () => {
    switch (state) {
      case 'hover':
        return 'rds-button--state-hover';
      case 'selected':
        return 'rds-button--state-selected';
      case 'disabled':
        return 'rds-button--state-disabled';
      case 'default':
      default:
        return 'rds-button--state-default';
    }
  };

  // Determine what to render based on layout
  const getStartIcon = () => {
    if (normalizedLayout === 'icon-only') {
      return undefined;
    }
    // If icon prop is set and position is start, always use it
    if (normalizedLayout === 'icon+text' && icon && iconPosition === 'start') {
      return getIconComponent();
    }
    // Otherwise, use explicit startIcon prop
    if (normalizedLayout === 'icon+text' && startIcon) {
      return startIcon;
    }
    return undefined;
  };

  const getEndIcon = () => {
    if (normalizedLayout === 'icon-only') {
      return undefined;
    }
    // If icon prop is set and position is end, always use it
    if (normalizedLayout === 'icon+text' && icon && iconPosition === 'end') {
      return getIconComponent();
    }
    // Otherwise, use explicit endIcon prop
    if (normalizedLayout === 'icon+text' && endIcon) {
      return endIcon;
    }
    return undefined;
  };

  const renderContent = () => {
    if (normalizedLayout === 'icon-only') {
      // For icon-only layout, prioritize icon prop, then fallback to explicit icon props
      if (icon) {
        return getIconComponent();
      }
      return startIcon || endIcon;
    }
    if (normalizedLayout === 'icon+text' || normalizedLayout === 'text-only') {
      return text || children;
    }
    return null;
  };

  // Determine if button should be disabled based on state or disabled prop
  const isButtonDisabled = disabled || isLoading || state === 'disabled';

  // Map inputSize to className
  const sizeClass =
    inputSize === 'large'
      ? 'rds-button__large'
      : inputSize === 'medium'
      ? 'rds-button__medium'
      : 'rds-button__small';

  return (
    <MuiButton
      disabled={isButtonDisabled}
      variant={style === 'filled' ? 'contained' : style === 'transparent' ? 'text' : style}
      className={`rds-button ${getStateClassName()} ${sizeClass}`.trim()}
      sx={{
        ...getShapeStyles(),
        ...getStateStyles(),
        ...sx,
      }}
      startIcon={getStartIcon()}
      endIcon={getEndIcon()}
      {...props}
    >
      {renderContent()}
    </MuiButton>
  );
};

export default RdsButton;
