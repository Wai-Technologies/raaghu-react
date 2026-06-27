
import { type ReactNode } from 'react';
import { Dialog as MuiDialog, type DialogProps, DialogTitle, DialogContent, DialogActions, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RdsButton from '../rds-button/rds-button';
import './rds-dialog.scss';

const SIZE_MAP = {
  'extra-small': 'xs',
  'small': 'sm',
  'medium': 'md',
  'large': 'lg',
  'extra-large': 'xl',
} as const;

export interface RdsDialogProps extends Omit<DialogProps, 'component'> {
  title?: string;
  children?: ReactNode;
  actions?: ReactNode;
  ShowDissmiss?: boolean;
  onClose?: () => void;
  variant?: 'standard' | 'default';
  ShowPrimary?: boolean;
  ShowSecondary?: boolean;
  showTitle?: boolean;
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
  if (variant === 'standard') {
    return (
      <MuiDialog
        onClose={onClose}
        maxWidth={size ? SIZE_MAP[size] : size}
        {...props}
        slotProps={{ paper: { className: 'rds-dialog rds-dialog__paper' } }}
      >
        {((title && showTitle) || ShowDissmiss) && (
          <DialogTitle
            className="rds-dialog__title"
            sx={{
              paddingRight: ShowDissmiss ? 'var(--rds-dialog-title-padding-right, 48px)' : undefined,
            }}
          >
            <div className="rds-dialog__title-inner">
              <div style={{ flex: 1 }}>{showTitle ? title : null}</div>
              {ShowDissmiss && (
                <IconButton aria-label="close" className="rds-dialog__close-button" onClick={onClose} size="medium" >
                  <CloseIcon />
                </IconButton>
              )}
            </div>
          </DialogTitle>
        )}
        <DialogContent className="rds-dialog__content" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', textAlign: 'center' }}>{children}</DialogContent>
        <DialogActions className="rds-dialog__actions">
          {ShowSecondary && (
            <RdsButton
              onClick={onClose}
              className="rds-dialog__button rds-dialog__button__dismiss"
              style="outlined"
            >Cancel</RdsButton>
          )}
          {ShowPrimary && (
            <RdsButton
              onClick={onClose}
              className="rds-dialog__button rds-dialog__button__primary"
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
    maxWidth={size ? SIZE_MAP[size] : size}
    {...props}
    slotProps={{ paper: { className: 'rds-dialog rds-dialog__paper' } }}
  >
      {((title && showTitle) || ShowDissmiss) && (
        <DialogTitle
          className="rds-dialog__title"
          sx={{
            position: 'relative',
            paddingRight: ShowDissmiss ? 'var(--rds-dialog-title-padding-right, 48px)' : undefined,
          }}
        >
          {showTitle ? (
            <Box
              component="span"
              sx={{
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </Box>
          ) : null}
          {ShowDissmiss && onClose && (
            <IconButton
              aria-label="close"
              className="rds-dialog__close-button"
              onClick={onClose}
              size="medium"
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

