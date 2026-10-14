import { type MouseEventHandler, type ReactNode } from 'react';
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
 
/** Props for {@link RdsModal}. Remaining props are forwarded to MUI `Dialog`. */
export interface RdsModalProps extends Omit<DialogProps, 'title' | 'open' | 'component' | 'onClose'> {
  /** Heading text shown in the dialog title. */
  title?: string;
  /** Figma open state; takes precedence over `isOpen`. When neither is set the modal is open. */
  visibility?: 'open' | 'closed';
  /** Direct open state; when passed it takes precedence over `visibility` and `isOpen`. */
  open?: boolean;
  /** Legacy open flag, used when `visibility` is not set. */
  isOpen?: boolean;
  /** Called with MUI's `(event, reason)` on backdrop/escape close; the close button passes the click event. */
  onClose: DialogProps['onClose'];
  /** Footer content (e.g. buttons). */
  actions?: ReactNode;
  /** Figma close-button state; takes precedence over `showCloseButton`. */
  headerChrome?: 'closeable' | 'plain';
  /** Legacy flag to show the close button. @default true */
  showCloseButton?: boolean;
  /** Icon shown in the header. */
  icon?: ReactNode;
  /** Legacy flag to show `icon`. @default true */
  showIcon?: boolean;
  /** Figma media state controlling icon/image visibility. */
  media?: 'none' | 'icon' | 'image' | 'both';
  /** Header image URL. */
  imageSrc?: string;
  /** Alt text for `imageSrc` (an empty string marks it decorative). @default 'Modal' */
  imageAlt?: string;
  /** Figma body state; `'hidden'` hides `children`. */
  body?: 'visible' | 'hidden';
  /** Legacy flag to show `children`. @default true */
  showDescription?: boolean;
}
 
/** Dialog with optional icon/image header, close button and actions, built on MUI `Dialog`. */
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
  imageAlt,
  open,
  isOpen: legacyIsOpen,
  showCloseButton: legacyShowCloseButton,
  showIcon: legacyShowIcon,
  showDescription: legacyShowDescription,
  children,
  ...props
}: RdsModalProps) => {

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
      onClick={onClose as unknown as MouseEventHandler<HTMLButtonElement> | undefined}
      className="rds-modal__close-button"
    >
      <CloseIcon />
    </IconButton>
  ) : null;

  return (
    <MuiDialog
      open={open !== undefined ? open : resolvedIsOpen}
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
                  <img src={resolvedImageSrc} alt={imageAlt ?? 'Modal'} className="rds-modal__image" />
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