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
  /** Shows the close button in the header. @default true */
  showCloseButton?: boolean;
  /** @deprecated Use `showCloseButton` instead. */
  headerChrome?: 'closeable' | 'plain';
  icon?: ReactNode;
  /** Which media to show above the title: the `icon`, the `imageSrc` image, both or none. */
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
  showCloseButton,
  headerChrome,
  icon,
  media,
  body,
  imageSrc,
  children,
  ...restProps
}: RdsModalProps) => {
  const { isOpen: legacyIsOpenProp, showIcon: legacyShowIconProp, showDescription: legacyShowDescriptionProp, ...props } = restProps;
  const legacyIsOpen = typeof legacyIsOpenProp === 'boolean' ? legacyIsOpenProp : undefined;
  const legacyShowIcon = typeof legacyShowIconProp === 'boolean' ? legacyShowIconProp : undefined;
  const legacyShowDescription = typeof legacyShowDescriptionProp === 'boolean' ? legacyShowDescriptionProp : undefined;

  const resolvedIsOpen = visibility === 'open' ? true : visibility === 'closed' ? false : (legacyIsOpen ?? false);
  const resolvedShowCloseButton = showCloseButton ?? (headerChrome === 'plain' ? false : true);
  const resolvedShowDescription = body === 'visible' ? true : body === 'hidden' ? false : (legacyShowDescription ?? true);
  const resolvedShowIcon = media === undefined
    ? (legacyShowIcon ?? true)
    : media === 'icon' || media === 'both';
  const showImage = media === undefined || media === 'image' || media === 'both';

  const hasImageHeader = Boolean(imageSrc && showImage);

  return (
    <MuiDialog
      open={resolvedIsOpen}
      onClose={onClose}
      className="rds-modal"
      {...props}
    >
      {(title || icon || imageSrc) && (
          <DialogTitle className={clsx(
            'rds-modal__title',
            resolvedShowCloseButton && 'rds-modal__title--with-close',
            hasImageHeader && 'rds-modal__title--with-image',
          )}>
          {resolvedShowCloseButton && !hasImageHeader && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              className="rds-modal__close rds-modal__close--absolute"
            >
              <CloseIcon />
            </IconButton>
          )}
          {resolvedShowCloseButton && hasImageHeader && (
            <div className="rds-modal__close-row">
              <IconButton
                aria-label="close"
                onClick={onClose}
                className="rds-modal__close"
              >
                <CloseIcon />
              </IconButton>
            </div>
          )}
          {((icon && resolvedShowIcon) || (imageSrc && showImage)) && (
            <div className="rds-modal__content">
              <div className="rds-modal__media">
                {icon && resolvedShowIcon && (
                  <span className="rds-modal__icon">{icon}</span>
                )}
                {imageSrc && showImage && (
                  <img src={imageSrc} alt="Modal" className="rds-modal__image" />
                )}
              </div>
            </div>
          )}
          <Typography sx={{ textAlign: 'center', width: '100%' }} variant="h6" component="div">
            {title}
          </Typography>
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