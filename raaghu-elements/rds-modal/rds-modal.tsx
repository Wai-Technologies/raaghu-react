import React from 'react';
import { 
  Dialog as MuiDialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  DialogProps,
  IconButton,
  Typography
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

export interface RdsModalProps extends Omit<DialogProps, 'title' | 'open'> {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  actions?: React.ReactNode;
  showCloseButton?: boolean;
}

const RdsModal: React.FC<RdsModalProps> = ({
  title,
  isOpen,
  onClose,
  actions,
  showCloseButton = true,
  children,
  ...props
}) => {
  return (
    <MuiDialog
      open={isOpen}
      onClose={onClose}
      {...props}
    >
      {title && (
        <DialogTitle>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {showCloseButton && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions>
          {actions}
        </DialogActions>
      )}
    </MuiDialog>
  );
};

export default RdsModal;
