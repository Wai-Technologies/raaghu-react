import React from 'react';
import {
  Divider as MuiDivider,
  type DividerProps,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';


export interface RdsDividerProps extends DividerProps {
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
  const iconMap: Record<string, React.ElementType> = {
    InfoOutlined: InfoOutlinedIcon,
    Add: AddIcon,
    Notification: NotificationImportantIcon,
  };
  const normalizedIconName = iconName?.trim();
  const IconComponent = normalizedIconName && iconMap[normalizedIconName] ? iconMap[normalizedIconName] : InfoOutlinedIcon;
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

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
          dividerColor: theme.palette.primary.main,
          textColor: theme.palette.primary.main,
          iconBorderColor: theme.palette.primary.main,
          iconColor: theme.palette.primary.main,
        };
      default:
        return {
          dividerColor: isDark ? 'grey.700' : 'grey.300',
          textColor: isDark ? 'grey.400' : 'grey.600',
          iconBorderColor: isDark ? 'grey.700' : 'grey.300',
          iconColor: isDark ? 'grey.400' : 'grey.700',
        };
    }
  };

  const styleColors = getStyleColors();
  const dividerLineColor = styleColors.dividerColor;
  const textColor = styleColors.textColor;
  const iconBorderColor = styleColors.iconBorderColor;
  const iconColor = styleColors.iconColor;

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          borderWidth: 'var(--rds-divider-border-width-sm, 1px)',
          marginY: 2,
        };
      case 'medium':
        return {
          borderWidth: 'var(--rds-divider-border-width-md, 2px)',
          marginY: 2,
        };
      case 'large':
        return {
          borderWidth: 'var(--rds-divider-border-width-lg, 3px)',
          marginY: 2,
        };
      default:
        return {
          borderWidth: 'var(--rds-divider-border-width-md, 2px)',
          marginY: 2,
        };
    }
  };

  const sizeStyles = getSizeStyles();

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
