
import React from 'react';
import { Dialog as MuiDialog, DialogProps, DialogTitle, DialogContent, DialogActions, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './rds-dialog.scss';


export interface RdsDialogProps extends DialogProps {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  showCloseButton?: boolean;
  onClose?: () => void;
  variant?: 'standard' | 'default';
  ShowPrimary?: boolean;
  ShowSecondary?: boolean;
}


const RdsDialog: React.FC<RdsDialogProps> = ({
  title,
  children,
  actions,
  showCloseButton = true,
  onClose,
  variant = 'default',
  ShowPrimary,
  ShowSecondary,
  ...props
}) => {
  if (variant === 'standard') {
    return (
      <MuiDialog onClose={onClose} {...props} PaperProps={{ className: 'rds-dialog rds-dialog__paper' }}>
        {(title || showCloseButton) && (
          <DialogTitle className="rds-dialog__title">
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
              <div style={{ flex: 1 }}>{title}</div>
              {showCloseButton && (
                <IconButton aria-label="close" className="rds-dialog__close-button" onClick={onClose} size="medium">
                  <CloseIcon />
                </IconButton>
              )}
            </div>
          </DialogTitle>
        )}
        <DialogContent className="rds-dialog__content" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', textAlign: 'center' }}>{children}</DialogContent>
        <DialogActions className="rds-dialog__actions">
          {ShowSecondary && (
            <Button onClick={onClose} className="rds-dialog__button rds-dialog__button__dismiss" variant="text">Cancel</Button>
          )}
          {ShowPrimary && (
            <Button
              onClick={() => { }}
              className="rds-dialog__button rds-dialog__button__primary"
              variant="contained"
            >Okay</Button>
          )}
        </DialogActions>
      </MuiDialog>
    );
  }

  return (
    <MuiDialog onClose={onClose} {...props}>
      {(title || showCloseButton) && (
        <DialogTitle sx={{ position: 'relative', paddingRight: showCloseButton ? '40px' : undefined }}>
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

