import React from 'react';
import { Button as MuiButton, type ButtonProps } from '@mui/material';
import { Add, Delete, Save, Edit, Close, ArrowForward, ArrowBack } from '@mui/icons-material';
import RdsCompSpinner, { SpinnerLayout, SpinnerSize } from '../../raaghu-components/rds-comp-spinner/rds-comp-spinner';
import './rds-button.scss';
export interface RdsButtonProps extends Omit<ButtonProps, 'variant' | 'style'> {
  text?: string;
  isLoading?: boolean;
  shape?: 'pill' | 'rectangle';
  state?: 'default' | 'hover' | 'disabled' | 'selected';
  layout?: 'icon+text' | 'icon-only' | 'text-only';
  style?: 'filled' | 'outlined' | 'transparent';
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  changeLeftIcon?: 'add' | 'delete' | 'save' | 'edit' | 'close' | 'arrow-forward' | 'arrow-back';
  changeRightIcon?: 'add' | 'delete' | 'save' | 'edit' | 'close' | 'arrow-forward' | 'arrow-back';
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
  layout = 'icon+text',
  showLeftIcon = false,
  showRightIcon = false,
  changeLeftIcon = 'add',
  changeRightIcon = 'save',
  state = 'default',
  textCase = 'uppercase',
  ...props
}:RdsButtonProps) => {
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

  const getTextCaseStyles = () => {
    return {
      textTransform: textCase === 'unset' ? 'none' as const : textCase as any,
    };
  };

  const getIconComponent = (iconType?: string) => {
    switch (iconType) {
      case 'add':
        return <Add />;
      case 'delete':
        return <Delete />;
      case 'save':
        return <Save />;
      case 'edit':
        return <Edit />;
      case 'close':
        return <Close />;
      case 'arrow-forward':
        return <ArrowForward />;
      case 'arrow-back':
        return <ArrowBack />;
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
    // Handle showLeftIcon control with changeLeftIcon
    if (normalizedLayout === 'icon+text' && showLeftIcon) {
      return getIconComponent(changeLeftIcon);
    }
  // icon prop removed
    return undefined;
  };

  const getEndIcon = () => {
    if (normalizedLayout === 'icon-only') {
      return undefined;
    }
    // Handle showRightIcon control with changeRightIcon
    if (normalizedLayout === 'icon+text' && showRightIcon) {
      return getIconComponent(changeRightIcon);
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
      // For icon-only layout, prioritize showLeftIcon/showRightIcon with controls, then icon prop
      if (showLeftIcon) {
        return getIconComponent(changeLeftIcon);
      }
      if (showRightIcon) {
        return getIconComponent(changeRightIcon);
      }
  // icon prop removed
      return null;
    }
    if (normalizedLayout === 'icon+text' || normalizedLayout === 'text-only') {
      return text || children;
    }
    return null;
  };

  // Determine if button should be disabled based on state or disabled prop
  const isButtonDisabled = disabled || state === 'disabled';

  // inputSize logic removed

  return (
    <MuiButton
      disabled={isButtonDisabled}
      variant={style === 'filled' ? 'contained' : style === 'transparent' ? 'text' : style}
      className={`rds-button ${getStateClassName()}`.trim()}
      sx={{
        ...getShapeStyles(),
        ...getTextCaseStyles(),
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

RdsButton.displayName = 'RdsButton';
export default RdsButton;
