import { isValidElement, cloneElement, type ReactNode, type ReactElement, type ElementType } from 'react';
import { IconButton as MuiIconButton, type IconButtonProps } from '@mui/material';
import clsx from 'clsx';
import './rds-icon-button.scss';

/** Props for {@link RdsIconButton}. Extends MUI `IconButton` props. */
export interface RdsIconButtonProps extends Omit<IconButtonProps, 'component'> {
  iconOutlined?: ReactNode;
  iconFilled?: ReactNode;
  variant?: 'outlined' | 'filled';
  tooltip?: string;
  icon?: ReactNode;
}

/** Icon-only button with filled/outlined icon variants. A string `tooltip` is used as `title` and as the default `aria-label`. */
const RdsIconButton = ({
  iconOutlined,
  iconFilled,
  variant = 'filled',
  tooltip,
  icon,
  children,
  size,
  className: classNameProp,
  ...props
}: RdsIconButtonProps) => {

  const getSizedIcon = (iconNode: ReactNode) => {
    if (isValidElement(iconNode)) {
      let fontSize: 'small' | 'medium' | 'large' | undefined;
      if (size === 'small' || size === 'medium' || size === 'large') {
        fontSize = size;
      }
      const iconType = iconNode.type as ElementType & { muiName?: string };
      if (typeof iconType === 'function' && iconType.muiName && fontSize) {
        return cloneElement(iconNode as ReactElement<{ fontSize?: typeof fontSize }>, { fontSize });
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
    classNameProp,
  );

  return (
    <MuiIconButton
      title={tooltip}
      aria-label={typeof tooltip === 'string' ? tooltip : undefined}
      size={size}
      {...props}
      className={className}
    >
      {buttonContent}
    </MuiIconButton>
  );
};
RdsIconButton.displayName = 'RdsIconButton';
export default RdsIconButton;