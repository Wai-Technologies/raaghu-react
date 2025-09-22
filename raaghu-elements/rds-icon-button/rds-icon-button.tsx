import React from 'react';
import { IconButton as MuiIconButton, type IconButtonProps } from '@mui/material';
import './rds-icon-button.scss';

export interface RdsIconButtonProps extends IconButtonProps {
  iconOutlined?: React.ReactNode;
  iconFilled?: React.ReactNode;
  variant?: 'outlined' | 'filled';
  tooltip?: string;
  // Deprecated: for backward compatibility
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}



type RdsIconButtonComponentProps = React.PropsWithChildren<RdsIconButtonProps>;

const RdsIconButton = ({
  iconOutlined,
  iconFilled,
  variant = 'filled',
  tooltip,
  icon, // deprecated
  children,
  size,
  onClick,
  ...props
}:RdsIconButtonComponentProps) => {

  // Helper to clone icon with fontSize prop
  const getSizedIcon = (iconNode: React.ReactNode) => {
    if (React.isValidElement(iconNode)) {
      let fontSize: 'small' | 'medium' | 'large' | undefined;
      if (size === 'small' || size === 'medium' || size === 'large') {
        fontSize = size;
      }
      // Only add fontSize if the element type is a MUI icon (has fontSize prop)
      // MUI icons have a 'muiName' static property
      const typeAny = iconNode.type as any;
      if (typeAny && typeof typeAny === 'function' && typeAny.muiName && fontSize) {
        return React.cloneElement(iconNode as any, { fontSize });
      }
    }
    return iconNode;
  };

  let buttonContent: React.ReactNode = null;
  if (variant === 'outlined' && iconOutlined) {
    buttonContent = getSizedIcon(iconOutlined);
  } else if (variant === 'filled' && iconFilled) {
    buttonContent = getSizedIcon(iconFilled);
  } else if (icon) {
    buttonContent = getSizedIcon(icon);
  } else if (children) {
    buttonContent = getSizedIcon(children as React.ReactNode);
  }

  // Compose a stable base class for targeting and include outlined + user classes
  const className = [
    'rds-icon-button',
    variant === 'outlined' ? 'rds-icon-button--outlined' : null,
    props.className || null,
  ].filter(Boolean).join(' ');

  return (
    <MuiIconButton
      title={tooltip}
      size={size}
      className={className}
      onClick={onClick}
      {...props}
    >
      {buttonContent}
    </MuiIconButton>
  );
};
RdsIconButton.displayName = 'RdsIconButton';
export default RdsIconButton;