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
}

const RdsDivider= ({
  dividerMessage,
  textAlign = 'center',
  layout = 'horizontal',
  iconShow = true,
  iconName = 'InfoOutlined',
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

  const dividerLineColor = isDark ? 'grey.700' : 'grey.300';
  const textColor = isDark ? 'grey.400' : 'grey.600';
  const iconBorderColor = isDark ? 'grey.700' : 'grey.300';
  const iconColor = isDark ? 'grey.400' : 'grey.700';

  const content = dividerMessage && (
   <Box
    display="flex"
    alignItems="center"
    gap={1.5}
    px={2}
  >
    {iconShow && (
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: '1px solid',
          borderColor: iconBorderColor,
          backgroundColor: 'background.paper',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconComponent sx={{ fontSize: 18, color: iconColor }} />
      </Box>
    )}
    <Typography variant="body2" sx={{ fontWeight: 500, color: textColor }}>
      {dividerMessage}
    </Typography>
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
          sx={{ mx: 2, height: '80%', borderColor: dividerLineColor }}
          {...props}
        />
        <Typography variant="body2" sx={{ ml: 1 }}>Right</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems="center" width="100%" my={2}>
      {textAlign === 'center' && (
        <MuiDivider sx={{ flex: 1, borderColor: dividerLineColor }} {...props} />
      )}
      {textAlign === 'right' && (
        <MuiDivider sx={{ flex: 1, borderColor: dividerLineColor }} {...props} />
      )}
      {content}
      {textAlign === 'center' && (
        <MuiDivider sx={{ flex: 1, borderColor: dividerLineColor }} {...props} />
      )}
      {textAlign === 'left' && (
        <MuiDivider sx={{ flex: 1, borderColor: dividerLineColor }} {...props} />
      )}
    </Box>
  );
};
RdsDivider.displayName = 'RdsDivider';
export default RdsDivider;
