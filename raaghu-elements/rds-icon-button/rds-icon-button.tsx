import { isValidElement, cloneElement, type ReactNode, type MouseEvent, type ElementType } from 'react';
import { IconButton as MuiIconButton, type IconButtonProps } from '@mui/material';
import clsx from 'clsx';
import './rds-icon-button.scss';

export interface RdsIconButtonProps extends Omit<IconButtonProps, 'component'> {
  iconOutlined?: ReactNode;
  iconFilled?: ReactNode;
  variant?: 'outlined' | 'filled';
  tooltip?: string;
  icon?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}



type RdsIconButtonComponentProps = { children?: ReactNode } & RdsIconButtonProps;

const RdsIconButton = ({
  iconOutlined,
  iconFilled,
  variant = 'filled',
  tooltip,
  icon,
  children,
  size,
  onClick,
  ...props
}:RdsIconButtonComponentProps) => {

  const getSizedIcon = (iconNode: ReactNode) => {
    if (isValidElement(iconNode)) {
      let fontSize: 'small' | 'medium' | 'large' | undefined;
      if (size === 'small' || size === 'medium' || size === 'large') {
        fontSize = size;
      }
      const iconType = iconNode.type as ElementType & { muiName?: string };
      if (typeof iconType === 'function' && iconType.muiName && fontSize) {
        return cloneElement(iconNode as React.ReactElement<{ fontSize?: typeof fontSize }>, { fontSize });
      }
    }
    return iconNode;
  };

  let buttonContent: ReactNode = null;
  if (variant === 'outlined' && iconOutlined) {
    buttonContent = getSizedIcon(iconOutlined);
  } else if (variant === 'filled' && iconFilled) {
    buttonContent = getSizedIcon(iconFilled);
  } else if (icon) {
    buttonContent = getSizedIcon(icon);
  } else if (children) {
    buttonContent = getSizedIcon(children as ReactNode);
  }

  const className = clsx(
    'rds-icon-button',
    variant === 'outlined' && 'rds-icon-button--outlined',
    props.className,
  );

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