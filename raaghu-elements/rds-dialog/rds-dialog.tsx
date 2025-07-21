import React from 'react';
import { Dialog as MuiDialog, DialogProps, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface RdsDialogProps extends DialogProps {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  showCloseButton?: boolean;
  onClose?: () => void;
}

const RdsDialog: React.FC<RdsDialogProps> = ({
  title,
  children,
  actions,
  showCloseButton = true,
  onClose,
  ...props
}) => {
  return (
    <MuiDialog onClose={onClose} {...props}>
      {title && (
        <DialogTitle>
          {title}
          {showCloseButton && onClose && (
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

export default RdsDialog;
