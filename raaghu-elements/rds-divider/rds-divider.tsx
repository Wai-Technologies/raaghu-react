import React from 'react';
import {
  Divider as MuiDivider,
  DividerProps,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export interface RdsDividerProps extends DividerProps {
  text?: string;
  position?: 'left' | 'center' | 'right';
  orientation?: 'horizontal' | 'vertical';
   showIcon?: boolean;
}

const RdsDivider: React.FC<RdsDividerProps> = ({
  text,
  position = 'center',
  orientation = 'horizontal',
   showIcon = true,
  ...props
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const dividerLineColor = isDark ? 'grey.700' : 'grey.300';
  const textColor = isDark ? 'grey.400' : 'grey.600';
  const iconBorderColor = isDark ? 'grey.700' : 'grey.300';
  const iconColor = isDark ? 'grey.400' : 'grey.700';

  const content = text && (
   <Box
  display="flex"
  alignItems="center"
  gap={1.5}
  px={2}
>
  {showIcon && ( // ✅ Conditionally render the icon
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
      <InfoOutlinedIcon sx={{ fontSize: 18, color: iconColor }} />
    </Box>
  )}

  <Typography variant="body2" sx={{ fontWeight: 500, color: textColor }}>
    {text}
  </Typography>
</Box>

  );

  if (orientation === 'vertical') {
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
        {(!!text || !!showIcon) && (
          <Box mt={1.5} display="flex" alignItems="center" flexDirection="column" gap={0.5}>
            {showIcon && text && (
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
                <InfoOutlinedIcon sx={{ fontSize: 18, color: iconColor }} />
              </Box>
            )}
            {text && (
              <Typography variant="body2" sx={{ color: textColor, fontWeight: 500, mt: 0.5 }}>
                {text}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems="center" width="100%" my={2}>
     
      {position === 'center' && (
        <MuiDivider sx={{ flex: 1, borderColor: dividerLineColor }} {...props} />
      )}
      {position === 'right' && (
        <MuiDivider sx={{ flex: 1, borderColor: dividerLineColor }} {...props} />
      )}
      {content}
      
      {position === 'center' && (
        <MuiDivider sx={{ flex: 1, borderColor: dividerLineColor }} {...props} />
      )}
      {position === 'left' && (
        <MuiDivider sx={{ flex: 1, borderColor: dividerLineColor }} {...props} />
      )}
    </Box>
  );
};
RdsDivider.displayName = 'RdsDivider';
export default RdsDivider;
