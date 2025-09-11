
import React from 'react';
import { Dialog as MuiDialog, type DialogProps, DialogTitle, DialogContent, DialogActions, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RdsButton from '../rds-button/rds-button';
import './rds-dialog.scss';


export interface RdsDialogProps extends DialogProps {
  title?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  ShowDissmiss?: boolean;
  onClose?: () => void;
  variant?: 'standard' | 'default';
  ShowPrimary?: boolean;
  ShowSecondary?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

const RdsDialog = ({
  title,
  children,
  actions,
  ShowDissmiss = true,
  onClose,
  variant = 'default',
  ShowPrimary,
  ShowSecondary,
  size = 'md',
  ...props
}:RdsDialogProps) => {
  if (variant === 'standard') {
    return (
      <MuiDialog onClose={onClose} maxWidth={size} {...props} PaperProps={{ className: 'rds-dialog rds-dialog__paper' }}>
        {(title || ShowDissmiss) && (
          <DialogTitle className="rds-dialog__title">
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
              <div style={{ flex: 1 }}>{title}</div>
              {ShowDissmiss && (
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
            <RdsButton
              onClick={() => { }}
              className="rds-dialog__button rds-dialog__button__primary"
              style="filled"
            >Okay</RdsButton>
          )}
        </DialogActions>
      </MuiDialog>
    );
  }

  return (
  <MuiDialog onClose={onClose} maxWidth={size} {...props}>
      {(title || ShowDissmiss) && (
        <DialogTitle sx={{ position: 'relative', paddingRight: ShowDissmiss ? '40px' : undefined }}>
          {title}
          {ShowDissmiss && onClose && (
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
RdsDialog.displayName = 'RdsDialog';
export default RdsDialog;

