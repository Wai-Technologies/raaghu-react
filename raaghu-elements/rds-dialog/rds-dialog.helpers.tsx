import React from 'react';
import {
  Dialog as MuiDialog,
  type DialogProps,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RdsButton from '../rds-button/rds-button';

export type RdsDialogSize = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | false;

export function getDialogMaxWidth(size: RdsDialogSize): DialogProps['maxWidth'] {
  if (size === 'extra-small') return 'xs';
  if (size === 'small') return 'sm';
  if (size === 'medium') return 'md';
  if (size === 'large') return 'lg';
  if (size === 'extra-large') return 'xl';
  return size;
}

export interface StandardRdsDialogProps extends DialogProps {
  title?: string;
  showTitle: boolean;
  ShowDissmiss: boolean;
  ShowPrimary?: boolean;
  ShowSecondary?: boolean;
  onClose?: () => void;
  size: RdsDialogSize;
  children?: React.ReactNode;
}

export function StandardRdsDialog({
  title,
  children,
  ShowDissmiss,
  onClose,
  ShowPrimary,
  ShowSecondary,
  showTitle,
  size,
  ...props
}: StandardRdsDialogProps) {
  return (
    <MuiDialog
      onClose={onClose}
      maxWidth={getDialogMaxWidth(size)}
      {...props}
      PaperProps={{ className: 'rds-dialog rds-dialog__paper' }}
    >
      {((title && showTitle) || ShowDissmiss) && (
        <DialogTitle className="rds-dialog__title">
          <div className="rds-dialog__title-inner">
            <div style={{ flex: 1 }}>{showTitle ? title : null}</div>
            {ShowDissmiss && (
              <IconButton
                aria-label="close"
                className="rds-dialog__close-button"
                onClick={onClose}
                size="medium"
              >
                <CloseIcon />
              </IconButton>
            )}
          </div>
        </DialogTitle>
      )}
      <DialogContent
        className="rds-dialog__content"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {children}
      </DialogContent>
      <DialogActions className="rds-dialog__actions">
        {ShowSecondary && (
          <RdsButton onClick={onClose} className="rds-dialog__button rds-dialog__button__dismiss">
            Cancel
          </RdsButton>
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

export interface DefaultRdsDialogProps extends DialogProps {
  title?: string;
  showTitle: boolean;
  ShowDissmiss: boolean;
  onClose?: () => void;
  size: RdsDialogSize;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function DefaultRdsDialog({
  title,
  children,
  actions,
  ShowDissmiss,
  onClose,
  showTitle,
  size,
  ...props
}: DefaultRdsDialogProps) {
  return (
    <MuiDialog onClose={onClose} maxWidth={getDialogMaxWidth(size)} {...props}>
      {((title && showTitle) || ShowDissmiss) && (
        <DialogTitle
          sx={{
            position: 'relative',
            paddingRight: ShowDissmiss ? 'var(--rds-dialog-title-padding-right, 40px)' : undefined,
          }}
        >
          {showTitle ? title : null}
          {ShowDissmiss && onClose && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'var(--rds-neutral-500)',
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </MuiDialog>
  );
}
