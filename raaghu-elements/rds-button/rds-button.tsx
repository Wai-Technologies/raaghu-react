import React from 'react';
import { Button as MuiButton, type ButtonProps } from '@mui/material';
import { Add, Delete, Save, Edit, Close, ArrowForward, ArrowBack, RadioButtonUnchecked, ChevronRight, ChevronLeft, KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import RdsCompSpinner, { SpinnerLayout, SpinnerSize } from '../../raaghu-components/rds-comp-spinner/rds-comp-spinner';
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
}:RdsButtonProps) => {
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
      case 'chevron':
      case 'chevron_right':
        return <ChevronRight />;
      case 'chevron_left':
        return <ChevronLeft />;
      case 'chevron_up':
        return <KeyboardArrowUp />;
      case 'chevron_down':
        return <KeyboardArrowDown />;
      case 'arrow-back':
        return <ArrowBack />;
      case 'circle':
        return <RadioButtonUnchecked />;
      default:
        return null;
    }
  };

  const resolveIcon = (icon?: React.ReactNode | string): React.ReactNode => {
    if (typeof icon === 'string') {
      return getIconComponent(icon);
    }
    return icon;
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

  const isButtonDisabled = disabled || state === 'disabled';

  const styleVariantClass = style === 'filled'
    ? 'rds-button__primary'
    : style === 'outlined'
      ? 'rds-button__secondary'
      : style === 'transparent'
        ? 'rds-button__text'
        : '';

  return (
    <MuiButton
      disabled={isButtonDisabled}
      variant={style === 'filled' ? 'contained' : style === 'transparent' ? 'text' : style}
      color={color as any}
      className={`rds-button ${styleVariantClass} ${getStateClassName()}`.replace(/\s+/g, ' ').trim()}
      sx={{
        ...getShapeStyles(),
        ...getTextCaseStyles(),
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
