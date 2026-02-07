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
  // Icon mapping: add more icons as needed
  const iconMap: Record<string, React.ElementType> = {
    InfoOutlined: InfoOutlinedIcon,
    Add: AddIcon,
    Notification: NotificationImportantIcon,
  };
  const normalizedIconName = iconName?.trim();
  const IconComponent = normalizedIconName && iconMap[normalizedIconName] ? iconMap[normalizedIconName] : InfoOutlinedIcon;
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Style-based color logic
  const getStyleColors = () => {
    switch (styleVariant) {
      case 'subtle':
        return {
          dividerColor: isDark ? 'grey.700' : 'grey.300',
          textColor: isDark ? 'grey.400' : 'grey.600',
          iconBorderColor: isDark ? 'grey.700' : 'grey.300',
          iconColor: isDark ? 'grey.400' : 'grey.700',
        };
      case 'strong':
        return {
          dividerColor: isDark ? 'grey.600' : 'grey.400',
          textColor: isDark ? 'grey.300' : 'grey.700',
          iconBorderColor: isDark ? 'grey.600' : 'grey.400',
          iconColor: isDark ? 'grey.300' : 'grey.800',
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

  // Size-based styling
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          borderWidth: '1px',
          marginY: 2,
        };
      case 'medium':
        return {
          borderWidth: '2px',
          marginY: 2,
        };
      case 'large':
        return {
          borderWidth: '3px',
          marginY: 2,
        };
      default:
        return {
          borderWidth: '2px',
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
          width: 28,
          height: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconComponent sx={{ fontSize: 21, color: iconColor }} />
      </Box>
    )}
  {dividerMessage && (
    <Typography variant="body2" sx={{ fontWeight: 500, color: textColor }}>
      {dividerMessage}
    </Typography>
  )}
  </Box>

  );

  if (layout === 'vertical') {
    // Render a left / vertical-divider / right layout so the component itself
    // presents the same visual as the `Vertical` story. This embeds the
    // surrounding context (Left / Right) into the component when
    // `layout === 'vertical'` per user's request (Option B).
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', height: 120 }}>
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
