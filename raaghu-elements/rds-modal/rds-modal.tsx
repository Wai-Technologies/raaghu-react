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
 
export interface RdsModalProps extends Omit<DialogProps, 'title' | 'open' | 'component'> {
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
  const resolvedImageSrc = typeof imageSrc === 'string' && imageSrc.trim() ? imageSrc : undefined;
  const showImage = media === 'none' || media === 'icon'
    ? false
    : media === 'image' || media === 'both'
      ? true
      : Boolean(resolvedImageSrc);
  const hasImageHeader = Boolean(resolvedImageSrc && showImage);

  const closeButton = resolvedShowCloseButton ? (
    <IconButton
      aria-label="close"
      onClick={onClose}
      className="rds-modal__close-button"
    >
      <CloseIcon />
    </IconButton>
  ) : null;

  return (
    <MuiDialog
      open={resolvedIsOpen}
      onClose={onClose}
      {...props}
    >
      {(title || icon || resolvedImageSrc) && (
          <DialogTitle className={clsx(
            'rds-modal__title',
            resolvedShowCloseButton && 'rds-modal__title--with-close',
            hasImageHeader && 'rds-modal__title--with-image'
          )}>
          {hasImageHeader && closeButton && (
            <div className="rds-modal__title-bar">
              {closeButton}
            </div>
          )}
          <div className='rds-modal__content'>
            {(icon && resolvedShowIcon) || (resolvedImageSrc && showImage) ? (
              <div className="rds-modal__media">
                {icon && resolvedShowIcon && (
                  <span className="rds-modal__icon">{icon}</span>
                )}
                {resolvedImageSrc && showImage && (
                  <img src={resolvedImageSrc} alt="Modal" className="rds-modal__image" />
                )}
              </div>
            ) : null}
          </div>
          <Typography sx={{ textAlign: 'center', width: '100%' }} variant="h6" component="div">
            {title}
          </Typography>
          {!hasImageHeader && closeButton}
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