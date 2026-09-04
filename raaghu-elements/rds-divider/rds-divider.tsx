import { type ElementType } from 'react';
import {
  Divider as MuiDivider,
  type DividerProps,
  Box,
  Typography,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

const ICON_MAP: Record<string, ElementType> = {
  InfoOutlined: InfoOutlinedIcon,
  Add: AddIcon,
  Notification: NotificationImportantIcon,
};

type StyleColors = { dividerColor: string; textColor: string; iconBorderColor: string; iconColor: string };
const STYLE_COLORS: Record<string, StyleColors> = {
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
const DEFAULT_SIZE_STYLES = { borderWidth: 'var(--rds-divider-border-width-md, 2px)', marginY: 2 };


export interface RdsDividerProps extends Omit<DividerProps, 'component'> {
  dividerMessage?: string;
  textAlign?: 'left' | 'center' | 'right';
  layout?: 'horizontal' | 'vertical';
  iconShow?: boolean;
  iconName?: string;
  size?: 'small' | 'medium' | 'large';
  styleVariant?: 'subtle' | 'strong' | 'primary';
}

const RdsDivider= ({
  dividerMessage,
  textAlign = 'center',
  layout = 'horizontal',
  iconShow = true,
  iconName = 'InfoOutlined',
  size = 'medium',
  styleVariant = 'subtle',
  ...props
}:RdsDividerProps) => {
  const normalizedIconName = iconName?.trim();
  const IconComponent: ElementType = (normalizedIconName && ICON_MAP[normalizedIconName]) || InfoOutlinedIcon;

  const styleColors = STYLE_COLORS[styleVariant] ?? DEFAULT_STYLE_COLORS;
  const dividerLineColor = styleColors.dividerColor;
  const textColor = styleColors.textColor;
  const iconBorderColor = styleColors.iconBorderColor;
  const iconColor = styleColors.iconColor;

  const sizeStyles = SIZE_STYLES[size] ?? DEFAULT_SIZE_STYLES;

  const content = (dividerMessage || iconShow) && (
   <Box
    display="flex"
    alignItems="center"
    gap={{ xs: 0.3, sm: 0.3, md: 0.3, lg: 1.0 }}
    px={dividerMessage ? 1 : (layout === 'horizontal' ? 2 : 0)}
  >
    {iconShow && (
      <Box
        sx={{
          width: 'var(--rds-divider-icon-box-size, 28px)',
          height: 'var(--rds-divider-icon-box-size, 28px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconComponent sx={{ fontSize: 'var(--rds-divider-icon-size, 21px)', color: iconColor }} />
      </Box>
    )}
  {dividerMessage && (
    <Typography variant="body2" sx={{ fontWeight: 'fontWeightMedium', color: textColor }}>
      {dividerMessage}
    </Typography>
  )}
  </Box>

  );

  if (layout === 'vertical') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', height: 'var(--rds-divider-vertical-container-height, 120px)' }}>
        <Typography variant="body2" sx={{ mr: 1 }}>Left</Typography>
        <MuiDivider
          orientation="vertical"
          sx={{ 
            mx: 2, 
            height: '80%', 
            borderColor: dividerLineColor,
            borderWidth: sizeStyles.borderWidth,
          }}
          {...props}
        />
        <Typography variant="body2" sx={{ ml: 1 }}>Right</Typography>
      </Box>
    );
  }

  return (
    <Box 
      display="flex" 
      alignItems="center" 
      width="100%" 
      my={sizeStyles.marginY}
    >
      {textAlign === 'center' && (
        <MuiDivider sx={{ 
          flex: 1, 
          borderColor: dividerLineColor,
          borderWidth: sizeStyles.borderWidth,
        }} {...props} />
      )}
      {textAlign === 'right' && (
        <MuiDivider sx={{ 
          flex: 1, 
          borderColor: dividerLineColor,
          borderWidth: sizeStyles.borderWidth,
        }} {...props} />
      )}
      {content}
      {textAlign === 'center' && (
        <MuiDivider sx={{ 
          flex: 1, 
          borderColor: dividerLineColor,
          borderWidth: sizeStyles.borderWidth,
        }} {...props} />
      )}
      {textAlign === 'left' && (
        <MuiDivider sx={{ 
          flex: 1, 
          borderColor: dividerLineColor,
          borderWidth: sizeStyles.borderWidth,
        }} {...props} />
      )}
    </Box>
  );
};
RdsDivider.displayName = 'RdsDivider';
export default RdsDivider;
