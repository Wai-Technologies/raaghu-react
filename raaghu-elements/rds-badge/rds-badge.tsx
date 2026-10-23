import { type ReactNode } from 'react';
import { Badge as MuiBadge, type BadgeProps } from '@mui/material';
import Notifications from '@mui/icons-material/Notifications';
import clsx from 'clsx';
import './rds-badge.scss';

export interface RdsBadgeProps extends Omit<BadgeProps, 'component' | 'variant'> {
  /** MUI badge variant (`standard` | `dot`), or the visual style (`primary` | `outline` | `transparent`). Preferred over `styleType`. */
  variant?: BadgeProps['variant'] | 'primary' | 'outline' | 'transparent';
  /** Disables the badge. */
  disabled?: boolean;
  /** Icon before the content (standalone badge). Overrides the `layout`-derived icon; `null` hides it. */
  startIcon?: ReactNode;
  /** Icon after the content (standalone badge). Overrides the `layout`-derived icon; `null` hides it. */
  endIcon?: ReactNode;
  children?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  shape?: 'rectangle' | 'pill';
  /** Placement of `icon` next to the content. Applies to the standalone badge (no `children`). */
  layout?: 'text' | 'icon' | 'icon-text' | 'text-icon';
  /** Icon used by the `icon`, `icon-text` and `text-icon` layouts. Defaults to a bell. */
  icon?: ReactNode;
  styleType?: 'primary' | 'outline' | 'transparent';
  colorVariant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'light' | 'success';
}

const RdsBadge = ({
  children,
  showZero = false,
  max = 99,
  badgeContent,
  size = 'medium',
  color = 'primary',
  shape = 'pill',
  layout = 'text',
  icon,
  startIcon,
  endIcon,
  variant,
  disabled,
  styleType = 'primary',
  colorVariant = 'primary',
  className,
  ...props
}: RdsBadgeProps) => {
  const isZeroContent = badgeContent === 0 || badgeContent === '0';
  const isHidden = isZeroContent && !showZero;
  const isStyleVariant = variant === 'primary' || variant === 'outline' || variant === 'transparent';
  const resolvedStyleType = isStyleVariant ? variant : styleType;
  const muiVariant = isStyleVariant ? undefined : variant;

  const bemClass = clsx(
    'rds-badge',
    `rds-badge--${size}`,
    `rds-badge--${shape}`,
    `rds-badge--${resolvedStyleType}`,
    `rds-badge--${colorVariant || 'primary'}`,
    disabled && 'rds-badge--disabled',
    className,
  );

  if (!children) {
    if (isHidden) return null;
    const text = badgeContent?.toString();
    const renderIcon = (margin: { marginLeft?: number | string; marginRight?: number | string }) =>
      icon ?? <Notifications fontSize="small" sx={margin} />;
    const layoutStart =
      layout === 'icon' ? renderIcon({ marginRight: 0 })
      : layout === 'icon-text' ? renderIcon({ marginRight: '6px' })
      : null;
    const layoutEnd = layout === 'text-icon' ? renderIcon({ marginLeft: '6px' }) : null;
    const badgeInner = (
      <>
        {startIcon !== undefined ? startIcon : layoutStart}
        {layout === 'icon' ? null : text}
        {endIcon !== undefined ? endIcon : layoutEnd}
      </>
    );

    return (
      <span className={bemClass}>
        <span className="rds-badge__badge">{badgeInner}</span>
      </span>
    );
  }

  if (isHidden) {
    return <>{children}</>;
  }

  return (
    <MuiBadge
      badgeContent={badgeContent}
      showZero={showZero}
      max={max}
      color={color}
      variant={muiVariant}
      {...props}
      className={bemClass}
    >
      {children}
    </MuiBadge>
  );
};

RdsBadge.displayName = 'RdsBadge';
export default RdsBadge;
