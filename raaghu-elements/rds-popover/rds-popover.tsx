import React from 'react';
import { 
  Popover as MuiPopover, 
  PopoverProps, 
  Box,
  Typography,
  IconButton 
} from '@mui/material';
import { Close } from '@mui/icons-material';

export interface RdsPopoverProps extends Omit<PopoverProps, 'open' | 'children'> {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: Element | null;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  width?: number | string;
  maxWidth?: number | string;
}

const RdsPopover: React.FC<RdsPopoverProps> = ({
  isOpen,
  onClose,
  anchorEl,
  title,
  children,
  showCloseButton = false,
  width,
  maxWidth = 400,
  ...props
}) => {
  return (
    <MuiPopover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      {...props}
    >
      <Box 
        sx={{ 
          p: 2, 
          width: width,
          maxWidth: maxWidth,
        }}
      >
        {(title || showCloseButton) && (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: title ? 1 : 0,
            }}
          >
            {title && (
              <Typography variant="h6" component="div">
                {title}
              </Typography>
            )}
            {showCloseButton && (
              <IconButton
                aria-label="close"
                onClick={onClose}
                size="small"
                sx={{ color: 'grey.500' }}
              >
                <Close fontSize="small" />
              </IconButton>
            )}
          </Box>
        )}
        {children}
      </Box>
    </MuiPopover>
  );
};

export default RdsPopover;
