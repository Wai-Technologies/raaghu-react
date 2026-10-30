import { isValidElement, cloneElement, type ReactNode, type ReactElement, type ElementType } from 'react';
import { IconButton as MuiIconButton, type IconButtonProps } from '@mui/material';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-icon-button.scss';

/** Props for {@link RdsIconButton}. Extends MUI `IconButton` props. */
export interface RdsIconButtonProps extends Omit<IconButtonProps, 'component'> {
  /** Icon shown when `variant` is 'outlined'. */
  iconOutlined?: ReactNode;
  /** Icon shown for the non-outlined variants. */
  iconFilled?: ReactNode;
  /** Visual variant. `'standard'` renders the same as `'filled'`, which is deprecated. */
  variant?: 'outlined' | 'filled' | 'standard';
  /** Tooltip text shown on hover. */
  tooltip?: string;
  /** Fallback icon used when the variant-specific icon is not provided. */
  icon?: ReactNode;
}

/** Icon-only button with filled/outlined icon variants. A string `tooltip` is used as `title` and as the default `aria-label`. */
const RdsIconButton = ({
  iconOutlined,
  iconFilled,
  variant,
  tooltip,
  icon,
  children,
  size,
  className: classNameProp,
  ...props
}: RdsIconButtonProps) => {
  if (variant === 'filled') warnDeprecatedProp('RdsIconButton', "variant='filled'", "variant='standard'");
  const isOutlined = variant === 'outlined';

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
  if (isOutlined && iconOutlined) {
    buttonContent = getSizedIcon(iconOutlined);
  } else if (!isOutlined && iconFilled) {
    buttonContent = getSizedIcon(iconFilled);
  } else if (icon) {
    buttonContent = getSizedIcon(icon);
  } else if (children) {
    buttonContent = getSizedIcon(children as ReactNode);
  }

  const className = clsx(
    'rds-icon-button',
    isOutlined && 'rds-icon-button--outlined',
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