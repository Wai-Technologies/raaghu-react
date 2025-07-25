import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import { Add, Delete, Save } from '@mui/icons-material';
import './rds-button.scss';
export interface RdsButtonProps extends Omit<ButtonProps, 'variant' | 'style'> {
  label?: string;
  isLoading?: boolean;
  iconPosition?: 'start' | 'end';
  shape?: 'pill' | 'rectangle';
  state?: 'default' | 'hover' | 'disabled' | 'selected';
  layout?: 'icon+text' | 'icon-only' | 'text-only';
  style?: 'filled' | 'outlined' | 'transparent';
  icon?: 'add' | 'delete' | 'save';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const RdsButton: React.FC<RdsButtonProps> = ({
  label,
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
  ...props
}) => {
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
    // For icon-only layout, don't use startIcon to avoid left positioning
    if (layout === 'icon-only') {
      return undefined;
    }
    // Don't show start icon if endIcon is explicitly provided
    if (endIcon) {
      return undefined;
    }
    // Priority: explicit startIcon prop, then icon prop with 'start' position
    if (layout === 'icon+text' && startIcon) {
      return startIcon;
    }
    if (layout === 'icon+text' && icon && iconPosition === 'start') {
      return getIconComponent();
    }
    return undefined;
  };

  const getEndIcon = () => {
    // For icon-only layout, don't use endIcon to avoid positioning issues
    if (layout === 'icon-only') {
      return undefined;
    }
    // Priority: explicit endIcon prop, then icon prop with 'end' position
    if (layout === 'icon+text' && endIcon) {
      return endIcon;
    }
    if (layout === 'icon+text' && icon && iconPosition === 'end') {
      return getIconComponent();
    }
    return undefined;
  };

  const renderContent = () => {
    if (layout === 'icon-only') {
      // For icon-only layout, prioritize icon prop, then fallback to explicit icon props
      if (icon) {
        return getIconComponent();
      }
      return startIcon || endIcon;
    }
    if (layout === 'icon+text' || layout === 'text-only') {
      return label || children;
    }
    return null;
  };

  // Determine if button should be disabled based on state or disabled prop
  const isButtonDisabled = disabled || isLoading || state === 'disabled';

  return (
    <MuiButton
      disabled={isButtonDisabled}
      variant={style === 'filled' ? 'contained' : style === 'transparent' ? 'text' : style}
      className={`rds-button ${getStateClassName()}`}
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
