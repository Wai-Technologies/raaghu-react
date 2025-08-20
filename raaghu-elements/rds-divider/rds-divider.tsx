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
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%', mx: 2 }}
      >
        <MuiDivider
          orientation="vertical"
          sx={{ alignSelf: 'stretch', minHeight: 60, borderColor: dividerLineColor }}
          {...props}
        />
        {/* Only show text/icon if provided in args */}
        {(!!dividerMessage || !!iconShow) && (
          <Box mt={1.5} display="flex" alignItems="center" flexDirection="column" gap={0.5}>
            {iconShow && dividerMessage && (
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '100%',
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
            {dividerMessage && (
              <Typography variant="body2" sx={{ color: textColor, fontWeight: 500, mt: 0.5 }}>
                {dividerMessage}
              </Typography>
            )}
          </Box>
        )}
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
