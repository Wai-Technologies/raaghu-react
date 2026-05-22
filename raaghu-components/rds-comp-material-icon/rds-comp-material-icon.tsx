import React from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import * as MuiIcons from '@mui/icons-material';
import './rds-comp-material-icon.scss';

export type MaterialIconStyle = 'filled' | 'outlined' | 'rounded' | 'twoTone' | 'sharp';
export type MaterialIconSize = 'small' | 'medium' | 'large' | 'extraSmall' | 'extraLarge';
export type MaterialIconColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'disabled';

export interface RdsCompMaterialIconProps extends Omit<SvgIconProps, 'component' | 'viewBox'> {
  /**
   * The name of the Material Icon to display
   * Example: 'Home', 'Settings', 'Search', 'Add', etc.
   * Refer to: https://mui.com/material-ui/material-icons/
   */
  iconName: string;

  /**
   * The style/variant of the icon
   * @default 'filled'
   */
  style?: MaterialIconStyle;

  /**
   * The size of the icon
   * @default 'medium'
   */
  size?: MaterialIconSize;

  /**
   * The color of the icon
   * @default 'inherit'
   */
  color?: MaterialIconColor;

  /**
   * If true, the icon will be disabled (reduced opacity)
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom CSS class to apply to the icon container
   */
  className?: string;

  /**
   * Custom rotation angle in degrees (0, 90, 180, 270)
   */
  rotate?: number;

  /**
   * If true, the icon will be flipped horizontally
   */
  flipHorizontal?: boolean;

  /**
   * If true, the icon will be flipped vertically
   */
  flipVertical?: boolean;

  /**
   * Callback when icon is clicked
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;

  /**
   * If true, the icon will be clickable (shows cursor pointer on hover)
   */
  clickable?: boolean;
}

/**
 * RdsCompMaterialIcon Component
 *
 * A wrapper component for MUI Material Icons with support for multiple styles, sizes, and theme-aware colors.
 * Supports Filled, Outlined, Rounded, Two Tone, and Sharp icon styles.
 *
 * @example
 * <RdsCompMaterialIcon iconName="Home" />
 * <RdsCompMaterialIcon iconName="Settings" style="outlined" size="large" color="primary" />
 * <RdsCompMaterialIcon iconName="Search" style="rounded" disabled />
 */
const RdsCompMaterialIcon: React.FC<RdsCompMaterialIconProps> = ({
  iconName,
  style = 'filled',
  size = 'medium',
  color = 'inherit',
  disabled = false,
  className = '',
  rotate = 0,
  flipHorizontal = false,
  flipVertical = false,
  onClick,
  clickable = false,
  ...props
}) => {
  // Calculate size mapping early
  const sizeMap: Record<MaterialIconSize, number> = {
    extraSmall: 16,
    small: 20,
    medium: 24,
    large: 32,
    extraLarge: 40,
  };

  // Map icon name and style to the correct MUI icon component
  const getIconComponent = (): React.ComponentType<SvgIconProps> | null => {
    const iconNameFormatted = iconName.trim();
    
    if (!iconNameFormatted) {
      console.warn('RdsCompMaterialIcon: iconName prop is required');
      return null;
    }

    // Build the full icon name with style suffix
    let fullIconName = iconNameFormatted;
    
    // Only add suffix for non-filled styles
    if (style !== 'filled') {
      const styleSuffixes: Record<MaterialIconStyle, string> = {
        filled: '',
        outlined: 'Outlined',
        rounded: 'Rounded',
        twoTone: 'TwoTone',
        sharp: 'Sharp',
      };
      fullIconName = iconNameFormatted + styleSuffixes[style];
    }

    // Access the icon from MUI icons
    const icon = (MuiIcons as any)[fullIconName];
    
    if (!icon) {
      console.warn(
        `RdsCompMaterialIcon: Icon "${fullIconName}" not found in @mui/icons-material. ` +
        `Please check the icon name and style. Refer to: https://mui.com/material-ui/material-icons/`
      );
      return null;
    }

    return icon;
  };

  const IconComponent = getIconComponent();

  if (!IconComponent) {
    // Render a placeholder when icon is not found
    const classes = [
      'rds-material-icon',
      'rds-material-icon--not-found',
      `rds-material-icon--${size}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <span
        className={classes}
        data-testid={`rds-material-icon-${iconName}-${style}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: sizeMap[size],
            height: sizeMap[size],
            fontSize: sizeMap[size],
          }}
          {...props}
        >
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2" />
          <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
    );
  }

  const iconSize = sizeMap[size];

  // Build transform style for rotations and flips
  const transforms = [];
  if (rotate !== 0) {
    transforms.push(`rotate(${rotate}deg)`);
  }
  if (flipHorizontal) {
    transforms.push('scaleX(-1)');
  }
  if (flipVertical) {
    transforms.push('scaleY(-1)');
  }

  const transformStyle = transforms.length > 0 ? transforms.join(' ') : undefined;

  // Combine classes
  const classes = [
    'rds-material-icon',
    `rds-material-icon--${size}`,
    `rds-material-icon--${style}`,
    `rds-material-icon--${color}`,
    disabled && 'rds-material-icon--disabled',
    clickable && 'rds-material-icon--clickable',
    className,
  ].filter(Boolean).join(' ');

  return (
    <span
      className={classes}
      data-testid={`rds-material-icon-${iconName}-${style}`}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={!disabled ? onClick : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: clickable && !disabled ? 'pointer' : 'default',
      }}
    >
      <IconComponent
        sx={{
          fontSize: iconSize,
          transform: transformStyle,
          transition: 'all 0.2s ease',
        }}
        {...props}
      />
    </span>
  );
};

RdsCompMaterialIcon.displayName = 'RdsCompMaterialIcon';

export default RdsCompMaterialIcon;
