import React from 'react';
import {
  Divider as MuiDivider,
  type DividerProps,
  Box,
  Typography,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import { mergeSx } from '../shared/utils/styling-props';


export interface RdsDividerProps extends DividerProps {
  dividerMessage?: string;
  textAlign?: 'left' | 'center' | 'right';
  layout?: 'horizontal' | 'vertical';
  iconShow?: boolean;
  iconName?: string;
  size?: 'small' | 'medium' | 'large';
  styleVariant?: 'subtle' | 'strong' | 'primary';
}

const RdsDivider= React.forwardRef<HTMLDivElement, RdsDividerProps>(function RdsDivider({
  dividerMessage,
  textAlign = 'center',
  layout = 'horizontal',
  iconShow = true,
  iconName = 'InfoOutlined',
  size = 'medium',
  styleVariant = 'subtle',
  className,
  sx,
  style,
  ...props
}, ref) {
  const iconMap: Record<string, React.ElementType> = {
    InfoOutlined: InfoOutlinedIcon,
    Add: AddIcon,
    Notification: NotificationImportantIcon,
  };
  const normalizedIconName = iconName?.trim();
  const IconComponent = normalizedIconName && iconMap[normalizedIconName] ? iconMap[normalizedIconName] : InfoOutlinedIcon;

  const getStyleColors = () => {
    switch (styleVariant) {
      case 'subtle':
        return {
          dividerColor: 'divider',
          textColor: 'text.secondary',
          iconBorderColor: 'divider',
          iconColor: 'text.secondary',
        };
      case 'strong':
        return {
          dividerColor: 'divider',
          textColor: 'text.primary',
          iconBorderColor: 'divider',
          iconColor: 'text.primary',
        };
      case 'primary':
        return {
          dividerColor: 'var(--rds-primary-main)',
          textColor: 'var(--rds-primary-main)',
          iconBorderColor: 'var(--rds-primary-main)',
          iconColor: 'var(--rds-primary-main)',
        };
      default:
        return {
          dividerColor: 'var(--rds-border-default)',
          textColor: 'var(--rds-text-secondary)',
          iconBorderColor: 'var(--rds-border-default)',
          iconColor: 'var(--rds-text-secondary)',
        };
    }
  };

  const styleColors = getStyleColors();
  const dividerLineColor = styleColors.dividerColor;
  const textColor = styleColors.textColor;
  const iconColor = styleColors.iconColor;

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          borderWidth: 'var(--rds-divider-border-width-sm, var(--rds-spacing-hairline))',
          marginY: 2,
        };
      case 'medium':
        return {
          borderWidth: 'var(--rds-divider-border-width-md, var(--rds-spacing-xxs))',
          marginY: 2,
        };
      case 'large':
        return {
          borderWidth: 'var(--rds-divider-border-width-lg, var(--rds-spacing-micro))',
          marginY: 2,
        };
      default:
        return {
          borderWidth: 'var(--rds-divider-border-width-md, var(--rds-spacing-xxs))',
          marginY: 2,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  let contentPaddingX = 0;
  if (dividerMessage) {
    contentPaddingX = 1;
  } else if (layout === 'horizontal') {
    contentPaddingX = 2;
  }

  const content = (dividerMessage || iconShow) && (
   <Box
    display="flex"
    alignItems="center"
    gap={{ xs: 0.3, sm: 0.3, md: 0.3, lg: 1.0 }}
    px={contentPaddingX}
  >
    {iconShow && (
      <Box
        sx={{
          width: 'var(--rds-divider-icon-box-size, var(--rds-spacing-28-px))',
          height: 'var(--rds-divider-icon-box-size, var(--rds-spacing-28-px))',
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
      <Box ref={ref} className={className} sx={mergeSx({ display: 'flex', alignItems: 'center', height: 'var(--rds-divider-vertical-container-height, 120px)' }, sx)} style={style}>
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
      ref={ref}
      className={className}
      sx={sx}
      style={style}
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
});
RdsDivider.displayName = 'RdsDivider';
export default RdsDivider;
