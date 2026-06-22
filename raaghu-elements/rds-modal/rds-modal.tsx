import { type ReactNode } from 'react';
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  type DialogProps,
  IconButton,
  Typography
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import clsx from 'clsx';
import './rds-modal.scss';
 
export interface RdsModalProps extends Omit<DialogProps, 'title' | 'open'> {
  title?: string;
  visibility?: 'open' | 'closed';
  onClose: () => void;
  actions?: ReactNode;
  headerChrome?: 'closeable' | 'plain';
  icon?: ReactNode;
  media?: 'none' | 'icon' | 'image' | 'both';
  imageSrc?: string;
  body?: 'visible' | 'hidden';
  [key: string]: unknown;
}
 
const RdsModal= ({
  title,
  visibility,
  onClose,
  actions,
  headerChrome,
  icon,
  media,
  body,
  imageSrc,
  children,
  ...props
}: RdsModalProps) => {
  const legacyIsOpen = typeof props['isOpen'] === 'boolean' ? (props['isOpen'] as boolean) : undefined;
  const legacyShowCloseButton = typeof props['showCloseButton'] === 'boolean' ? (props['showCloseButton'] as boolean) : undefined;
  const legacyShowIcon = typeof props['showIcon'] === 'boolean' ? (props['showIcon'] as boolean) : undefined;
  const legacyShowDescription = typeof props['showDescription'] === 'boolean' ? (props['showDescription'] as boolean) : undefined;

  const resolvedIsOpen = visibility === 'open' ? true : visibility === 'closed' ? false : (legacyIsOpen ?? true);
  const resolvedShowCloseButton = headerChrome === 'closeable' ? true : headerChrome === 'plain' ? false : (legacyShowCloseButton ?? true);
  const resolvedShowDescription = body === 'visible' ? true : body === 'hidden' ? false : (legacyShowDescription ?? true);
  const resolvedShowIcon = media === 'none'
    ? false
    : media === 'icon' || media === 'both'
      ? true
      : (legacyShowIcon ?? true);
  const showImage = media === 'none'
    ? false
    : media === 'image' || media === 'both'
      ? true
      : true;

  return (
    <MuiDialog
      open={resolvedIsOpen}
      onClose={onClose}
      {...props}
    >
      {(title || icon || imageSrc) && (
          <DialogTitle className={clsx('rds-modal__title', resolvedShowCloseButton && 'rds-modal__title--with-close')}>
          <div className='rds-modal__content'>
            {(icon && resolvedShowIcon) || (imageSrc && showImage) ? (
              <div className="rds-modal__media">
                {icon && resolvedShowIcon && (
                  <span className="rds-modal__icon">{icon}</span>
                )}
                {imageSrc && showImage && (
                  <img src={imageSrc} alt="Modal" className="rds-modal__image" />
                )}
              </div>
            ) : null}
          </div>
          <Typography sx={{ textAlign: 'center', width: '100%' }} variant="h6" component="div">
            {title}
          </Typography>
          {resolvedShowCloseButton && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 'var(--rds-spacing-sm, 8px)',
                top: 'var(--rds-spacing-sm, 8px)',
                color: 'var(--rds-neutral-500)',
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent sx={{ textAlign: 'center'}}>
        {resolvedShowDescription && children}
      </DialogContent>
      {actions && (
        <DialogActions sx={{ justifyContent: 'center' }}>
          {actions}
        </DialogActions>
      )}
    </MuiDialog>
  );
};
RdsModal.displayName = 'RdsModal';
export default RdsModal;