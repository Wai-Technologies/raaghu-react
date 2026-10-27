import type { ElementType, ReactNode } from 'react';
import {
  Divider as MuiDivider,
  type DividerProps,
  Box,
  Typography,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

const ICON_MAP = {
  InfoOutlined: InfoOutlinedIcon,
  Add: AddIcon,
  Notification: NotificationImportantIcon,
};

export type RdsDividerIconName = keyof typeof ICON_MAP;

type StyleColors = { dividerColor: string; textColor: string; iconBorderColor: string; iconColor: string };

type DividerColor = 'subtle' | 'strong' | 'primary';

const STYLE_COLORS: Record<DividerColor, StyleColors> = {
  subtle: { dividerColor: 'divider', textColor: 'text.secondary', iconBorderColor: 'divider', iconColor: 'text.secondary' },
  strong: { dividerColor: 'divider', textColor: 'text.primary', iconBorderColor: 'divider', iconColor: 'text.primary' },
  primary: { dividerColor: 'var(--rds-primary-main)', textColor: 'var(--rds-primary-main)', iconBorderColor: 'var(--rds-primary-main)', iconColor: 'var(--rds-primary-main)' },
};

const DEFAULT_STYLE_COLORS: StyleColors = { dividerColor: 'var(--rds-border-default)', textColor: 'var(--rds-text-secondary)', iconBorderColor: 'var(--rds-border-default)', iconColor: 'var(--rds-text-secondary)' };

const SIZE_STYLES: Record<string, { borderWidth: string; marginY: number }> = {
  small: { borderWidth: 'var(--rds-divider-border-width-sm, 1px)', marginY: 2 },
  medium: { borderWidth: 'var(--rds-divider-border-width-md, 2px)', marginY: 2 },
  large: { borderWidth: 'var(--rds-divider-border-width-lg, 3px)', marginY: 2 },
};
const DEFAULT_SIZE_STYLES = SIZE_STYLES.medium;

export interface RdsDividerProps extends Omit<DividerProps, 'component'> {
  /** Text shown next to the line. Takes precedence over the deprecated `dividerMessage`. */
  children?: ReactNode;
  /** @deprecated Use `children` instead. */
  dividerMessage?: string;
  /** Figma layout. Defaults to `'horizontal'`. */
  layout?: 'horizontal' | 'vertical';
  /** @deprecated Use `icon={null}` to hide the icon instead. */
  iconShow?: boolean;
  /** Icon node or icon name. No icon is shown unless this (or `iconName`) is provided. Use `null` or `false` to hide the icon. */
  icon?: RdsDividerIconName | ReactNode;
  /** @deprecated Use `icon` instead. */
  iconName?: RdsDividerIconName;
  /** Line thickness. Defaults to `'medium'`. */
  size?: 'small' | 'medium' | 'large';
  /** Colour style. Defaults to `'subtle'`. */
  color?: DividerColor | (string & {});
  /** @deprecated Use `color` instead. */
  styleVariant?: DividerColor;
}

const RdsDivider = ({
  children,
  dividerMessage,
  textAlign = 'center',
  layout = 'horizontal',
  iconShow,
  icon,
  iconName,
  size = 'medium',
  styleVariant,
  color,
  id,
  ref,
  className,
  ...props
}: RdsDividerProps) => {
  if (dividerMessage !== undefined) warnDeprecatedProp('RdsDivider', 'dividerMessage', '`children`');
  if (iconShow !== undefined) warnDeprecatedProp('RdsDivider', 'iconShow', '`icon={null}`');
  if (styleVariant !== undefined) warnDeprecatedProp('RdsDivider', 'styleVariant', '`color`');
  if (iconName !== undefined) warnDeprecatedProp('RdsDivider', 'iconName', '`icon`');

  const message: ReactNode = children ?? dividerMessage;

  const hasMessage = message !== undefined && message !== null && message !== false && message !== '';

  const iconKey = typeof icon === 'string' ? icon : typeof iconName === 'string' ? iconName.trim() : undefined;
  const IconComponent: ElementType = ICON_MAP[iconKey as RdsDividerIconName] ?? InfoOutlinedIcon;
  const customIcon = icon !== undefined && typeof icon !== 'string' ? icon : undefined;

  const hasExplicitIcon = (icon !== undefined && icon !== null && icon !== false) || (iconName !== undefined && iconName !== null);
  const showIcon = icon !== null && icon !== false && (iconShow ?? hasExplicitIcon);

  const isStyleColor = color !== undefined && Object.prototype.hasOwnProperty.call(STYLE_COLORS, color);
  const styleColors = STYLE_COLORS[isStyleColor ? (color as DividerColor) : (styleVariant ?? 'subtle')] ?? DEFAULT_STYLE_COLORS;
  const lineProps = { ...props, color: isStyleColor ? undefined : color };

  const dividerLineColor = styleColors.dividerColor;
  const textColor = styleColors.textColor;
  const iconColor = styleColors.iconColor;

  const sizeStyles = SIZE_STYLES[size] ?? DEFAULT_SIZE_STYLES;

  const content = (hasMessage || showIcon) && (
    <Box
      display="flex"
      alignItems="center"
      gap={{ xs: 0.3, sm: 0.3, md: 0.3, lg: 1.0 }}
      px={hasMessage ? 1 : layout === 'horizontal' ? 2 : 0}
    >
      {showIcon && (
        <Box
          sx={{
            width: 'var(--rds-divider-icon-box-size, 28px)',
            height: 'var(--rds-divider-icon-box-size, 28px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: iconColor,
          }}
        >
          {customIcon ?? <IconComponent sx={{ fontSize: 'var(--rds-divider-icon-size, 21px)', color: iconColor }} />}
        </Box>
      )}

      {hasMessage && (
        <Typography
          variant="body2"
          sx={{ fontWeight: 'fontWeightMedium', color: textColor }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  if (layout === 'vertical') {
    return (
      <Box
        className={clsx('rds-divider', className)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 'var(--rds-divider-vertical-container-height, 120px)',
        }}
      >
        <MuiDivider
          orientation="vertical"
          sx={{
            mx: 2,
            height: '80%',
            borderColor: dividerLineColor,
            borderWidth: sizeStyles.borderWidth,
          }}
          {...lineProps}
          id={id}
          ref={ref}
        />
      </Box>
    );
  }

  const lineSx = {
    flex: 1,
    borderColor: dividerLineColor,
    borderWidth: sizeStyles.borderWidth,
  };

  const hasLeadingLine = textAlign === 'center' || textAlign === 'right';
  const hasTrailingLine = textAlign === 'center' || textAlign === 'left';

  const firstLineProps = { id, ref };

  return (
    <Box
      className={clsx('rds-divider', className)}
      display="flex"
      alignItems="center"
      width="100%"
      my={sizeStyles.marginY}
    >
      {hasLeadingLine && (
        <MuiDivider sx={lineSx} {...lineProps} {...firstLineProps} />
      )}

      {content}

      {hasTrailingLine && (
        <MuiDivider sx={lineSx} {...lineProps} {...(hasLeadingLine ? undefined : firstLineProps)} />
      )}
    </Box>
  );
};

RdsDivider.displayName = 'RdsDivider';

export default RdsDivider;
