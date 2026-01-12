
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
  showTitle?: boolean;
  /**
   * Size passed directly to MUI Dialog maxWidth prop. Supported values align with MUI plus false to disable constraint.
   */
  size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | false;
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
  showTitle = true,
  size = 'medium',
  ...props
}:RdsDialogProps) => {
  // Map DS size to MUI's maxWidth prop values
  if (variant === 'standard') {
    return (
      <MuiDialog
        onClose={onClose}
        maxWidth={
          size === 'extra-small' ? 'xs' :
          size === 'small' ? 'sm' :
          size === 'medium' ? 'md' :
          size === 'large' ? 'lg' :
          size === 'extra-large' ? 'xl' :
          size
        }
        {...props}
        PaperProps={{ className: 'rds-dialog rds-dialog__paper' }}
      >
        {((title && showTitle) || ShowDissmiss) && (
          <DialogTitle className="rds-dialog__title">
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
              {ShowDissmiss && (
                <IconButton aria-label="close" className="rds-dialog__close-button" onClick={onClose} size="medium" sx={{ flexShrink: 0, marginRight: '8px' }}>
                  <CloseIcon />
                </IconButton>
              )}
              <div style={{ flex: 1, paddingLeft: ShowDissmiss ? '8px' : '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{showTitle ? title : null}</div>
            </div>
          </DialogTitle>
        )}
        <DialogContent className="rds-dialog__content" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', textAlign: 'center' }}>{children}</DialogContent>
        <DialogActions className="rds-dialog__actions">
          {ShowSecondary && (
            <RdsButton
              onClick={onClose}
              className="rds-dialog__button rds-dialog__button__dismiss"
              
            >Cancel</RdsButton>
          )}
          {ShowPrimary && (
            <RdsButton
              onClick={onClose}
              className="rds-dialog__button rds-dialog__button__primary-link"
              style="filled"
              text="Okay"
            />
          )}
        </DialogActions>
      </MuiDialog>
    );
  }

  return (
  <MuiDialog
    onClose={onClose}
    maxWidth={
      size === 'extra-small' ? 'xs' :
      size === 'small' ? 'sm' :
      size === 'medium' ? 'md' :
      size === 'large' ? 'lg' :
      size === 'extra-large' ? 'xl' :
      size
    }
    {...props}
  >
      {((title && showTitle) || ShowDissmiss) && (
        <DialogTitle sx={{ position: 'relative', paddingRight: ShowDissmiss ? '40px' : undefined }}>
          {showTitle ? title : null}
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

