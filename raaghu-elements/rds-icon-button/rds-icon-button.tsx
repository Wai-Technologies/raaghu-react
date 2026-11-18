import React from 'react';
import { IconButton as MuiIconButton, type IconButtonProps } from '@mui/material';
import './rds-icon-button.scss';

export interface RdsIconButtonProps extends IconButtonProps {
  /** Icon shown when `variant` is `'outlined'`. */
  iconOutlined?: React.ReactNode;
  /** Icon shown when `variant` is `'filled'`. */
  iconFilled?: React.ReactNode;
  /** `'outlined'` draws a border around the button and uses `iconOutlined`; `'filled'` uses `iconFilled`. */
  variant?: 'outlined' | 'filled';
  tooltip?: string;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}



type RdsIconButtonComponentProps = React.PropsWithChildren<RdsIconButtonProps>;

const RdsIconButton = ({
  iconOutlined,
  iconFilled,
  variant = 'filled',
  tooltip,
  icon,
  children,
  size,
  onClick,
  className: classNameProp,
  ...props
}:RdsIconButtonComponentProps) => {

  const getSizedIcon = (iconNode: React.ReactNode) => {
    if (React.isValidElement(iconNode)) {
      let fontSize: 'small' | 'medium' | 'large' | undefined;
      if (size === 'small' || size === 'medium' || size === 'large') {
        fontSize = size;
      }
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
  } else if (iconFilled || iconOutlined) {
    buttonContent = getSizedIcon(iconFilled ?? iconOutlined);
  } else if (icon) {
    buttonContent = getSizedIcon(icon);
  } else if (children) {
    buttonContent = getSizedIcon(children as React.ReactNode);
  }

  const className = [
    'rds-icon-button',
    variant === 'outlined' ? 'rds-icon-button--outlined' : 'rds-icon-button--filled',
    classNameProp || null,
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