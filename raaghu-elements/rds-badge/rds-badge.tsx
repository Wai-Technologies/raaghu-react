import React from 'react';
import { Badge as MuiBadge, type BadgeProps } from '@mui/material';
import Notifications from '@mui/icons-material/Notifications';
import { resolveDeprecatedProp, warnDeprecatedProp } from '../shared/utils/deprecation';
import { normalizePaletteColor } from '../shared/utils/palette-color';
import './rds-badge.scss';

type BadgePaletteColor = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'error' | 'warning' | 'light' | 'success';
const PALETTE_COLORS: readonly string[] = ['primary', 'secondary', 'tertiary', 'danger', 'error', 'warning', 'light', 'success'];
const MUI_BADGE_COLORS: readonly string[] = ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'];

export interface RdsBadgeProps extends Omit<BadgeProps, 'showZero' | 'color'> {
  children?: React.ReactNode;
  showZero?: boolean;
  max?: number;
  size?: 'small' | 'medium' | 'large';
  shape?: 'rectangle' | 'pill';
  layout?: 'text' | 'icon' | 'icon-text' | 'text-icon';
  styleType?: 'primary' | 'outline' | 'transparent';
  state?: 'default' | 'disabled';
  /**
   * Palette used for standalone / BEM styling, or MUI badge color.
   * Prefer this over `colorVariant`. `'danger'` is deprecated; use `'error'`.
   */
  color?: BadgeProps['color'] | BadgePaletteColor;
  /** @deprecated Use `color`. `'danger'` is deprecated; use `'error'`. */
  colorVariant?: BadgePaletteColor;
}


const RdsBadge= ({
  children,
  showZero = false,
  max = 99,
  badgeContent,
  size = 'medium',
  color: colorProp,
  shape = 'pill',
  layout = 'text',
  styleType = 'primary',
  state = 'default',
  colorVariant,
  ...props
}:RdsBadgeProps) => {
  if (colorProp === 'danger' || colorVariant === 'danger') {
    warnDeprecatedProp('RdsBadge', 'color="danger"', '`color: "error"`');
  }
  const paletteFromColor =
    colorProp !== undefined && typeof colorProp === 'string' && PALETTE_COLORS.includes(colorProp)
      ? (colorProp as BadgePaletteColor)
      : undefined;
  const resolvedColorVariant = normalizePaletteColor(
    resolveDeprecatedProp(paletteFromColor, colorVariant, 'RdsBadge', 'colorVariant', '`color`') ?? 'primary',
  );
  // Derive the MUI color from the same resolved value used for styling, so `color`
  // and the deprecated `colorVariant` render identically. RDS-only palettes
  // (tertiary, light) are not MUI colors; their look comes from the BEM classes.
  const muiCandidate = paletteFromColor || colorProp === undefined ? resolvedColorVariant : colorProp;
  const muiColor: BadgeProps['color'] = MUI_BADGE_COLORS.includes(muiCandidate as string)
    ? (muiCandidate as BadgeProps['color'])
    : 'default';
  const content = badgeContent;
  
  const bemClass = `rds-badge rds-badge--${size} rds-badge--${shape} rds-badge--${styleType} rds-badge--color-${resolvedColorVariant || 'primary'}${state === 'disabled' ? ' rds-badge--disabled' : ''}`;
  
  const isZeroContent = content === 0 || content === '0';
  
  
  let badgeInner: React.ReactNode;
  switch (layout) {
    case 'icon':
      badgeInner = <Notifications fontSize="small" sx={{ marginRight: 0 }} />;
      break;
    case 'icon-text':
      badgeInner = <><Notifications fontSize="small" sx={{ marginRight: 'var(--rds-spacing-compact)' }} />{content?.toString()}</>;
      break;
    case 'text-icon':
      badgeInner = <>{content?.toString()}<Notifications fontSize="small" sx={{ marginLeft: 'var(--rds-spacing-compact)' }} /></>;
      break;
    case 'text':
    default:
      badgeInner = content?.toString();
      break;
  }
  
  if (!children) {
    if (isZeroContent && !showZero) {
      return null;
    }
    return (
      <span className={bemClass}>
        <span className="rds-badge__badge">{badgeInner}</span>
      </span>
    );
  }
  const shouldRenderBadge = !(isZeroContent && !showZero);
  
  if (!shouldRenderBadge) {
    return <>{children}</>;
  }
  
  return (
    <MuiBadge
      badgeContent={content}
      showZero={showZero}
      max={max}
      color={muiColor}
      {...props}
      className={bemClass}
    >
      {children}
    </MuiBadge>
  );
};

RdsBadge.displayName = 'RdsBadge';
export default RdsBadge;
