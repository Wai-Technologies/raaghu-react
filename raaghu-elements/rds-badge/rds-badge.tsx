import { type ReactNode } from 'react';
import { Badge as MuiBadge, type BadgeProps } from '@mui/material';
import Notifications from '@mui/icons-material/Notifications';
import clsx from 'clsx';
import { resolveDeprecatedProp } from '../shared/utils/deprecation';
import { normalizePaletteColor } from '../shared/utils/palette-color';
import './rds-badge.scss';

type BadgePaletteColor = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'error' | 'warning' | 'light' | 'success';
type BadgeStyleVariant = 'primary' | 'outline' | 'transparent';

const PALETTE_COLORS: readonly string[] = ['primary', 'secondary', 'tertiary', 'danger', 'error', 'warning', 'light', 'success'];
const STYLE_VARIANTS: readonly string[] = ['primary', 'outline', 'transparent'];

export interface RdsBadgeProps extends Omit<BadgeProps, 'component' | 'variant' | 'color'> {
  /** MUI badge variant (`standard` | `dot`), or the visual style (`primary` | `outline` | `transparent`). Preferred over `styleType`. */
  variant?: BadgeProps['variant'] | BadgeStyleVariant;
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
  /** @deprecated Use `variant` (`primary` | `outline` | `transparent`). */
  styleType?: BadgeStyleVariant;
  /**
   * Palette used for standalone / BEM styling.
   * Prefer this over `colorVariant`. `danger` is normalized to `error`.
   */
  color?: BadgeProps['color'] | BadgePaletteColor;
  /** @deprecated Use `color`. */
  colorVariant?: BadgePaletteColor;
}

const RdsBadge = ({
  children,
  showZero = false,
  max = 99,
  badgeContent,
  size = 'medium',
  color: colorProp,
  shape = 'pill',
  layout = 'text',
  icon,
  startIcon,
  endIcon,
  variant,
  disabled,
  styleType,
  colorVariant,
  className,
  ...props
}: RdsBadgeProps) => {
  const isZeroContent = badgeContent === 0 || badgeContent === '0';
  const isHidden = isZeroContent && !showZero;
  const isStyleVariant = variant !== undefined && STYLE_VARIANTS.includes(variant);
  const resolvedStyleType =
    resolveDeprecatedProp(
      isStyleVariant ? (variant as BadgeStyleVariant) : undefined,
      styleType,
      'RdsBadge',
      'styleType',
      '`variant`',
    ) ?? 'primary';
  const muiVariant = (isStyleVariant ? undefined : variant) as BadgeProps['variant'];

  const paletteFromColor =
    colorProp !== undefined && typeof colorProp === 'string' && PALETTE_COLORS.includes(colorProp)
      ? (colorProp as BadgePaletteColor)
      : undefined;
  const bemColor = normalizePaletteColor(
    resolveDeprecatedProp(paletteFromColor, colorVariant, 'RdsBadge', 'colorVariant', '`color`') ?? 'primary',
  );

  const color = colorProp ?? 'primary';
  const muiColor =
    color === 'danger' || colorVariant === 'danger'
      ? 'error'
      : (color as BadgeProps['color']);

  const bemClass = clsx(
    'rds-badge',
    `rds-badge--${size}`,
    `rds-badge--${shape}`,
    `rds-badge--${resolvedStyleType}`,
    `rds-badge--${bemColor || 'primary'}`,
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
      color={muiColor}
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
