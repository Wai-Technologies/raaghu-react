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
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-modal.scss';
 
/** Props for {@link RdsModal}. Remaining props are forwarded to MUI `Dialog`. */
export interface RdsModalProps extends Omit<DialogProps, 'title' | 'open' | 'component' | 'onClose'> {
  /** Heading text shown in the dialog title. */
  title?: string;
  /** @deprecated Use `open` instead. Takes precedence over `isOpen`. When nothing is set the modal is closed. */
  visibility?: 'open' | 'closed';
  /** Direct open state; when passed it takes precedence over `visibility` and `isOpen`. Defaults to closed. */
  open?: boolean;
  /** Legacy open flag, used when `visibility` is not set. */
  isOpen?: boolean;
  /** Called with MUI's `(event, reason)` on backdrop/escape close; the close button passes the click event. */
  onClose: DialogProps['onClose'];
  /** Footer content (e.g. buttons). */
  actions?: ReactNode;
  /** Hides the close button; takes precedence over `headerChrome` and `showCloseButton`. */
  hideCloseButton?: boolean;
  /** @deprecated Use `hideCloseButton` instead. */
  headerChrome?: 'closeable' | 'plain';
  /** Legacy flag to show the close button. @default true */
  showCloseButton?: boolean;
  /** Icon shown in the header. */
  icon?: ReactNode;
  /** Legacy flag to show `icon`. @default true */
  showIcon?: boolean;
  /** @deprecated Control icon/image with `icon`, `showIcon` and `imageSrc` instead. */
  media?: 'none' | 'icon' | 'image' | 'both';
  /** Header image URL. */
  imageSrc?: string;
  /** Alt text for `imageSrc` (an empty string marks it decorative). @default 'Modal' */
  imageAlt?: string;
  /** @deprecated Use `showDescription` instead. */
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
  hideCloseButton,
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

  if (visibility !== undefined) warnDeprecatedProp('RdsModal', 'visibility', '`open`');
  if (headerChrome !== undefined) warnDeprecatedProp('RdsModal', 'headerChrome', '`hideCloseButton`');
  if (media !== undefined) warnDeprecatedProp('RdsModal', 'media', '`icon`, `showIcon` and `imageSrc`');
  if (body !== undefined) warnDeprecatedProp('RdsModal', 'body', '`showDescription`');
  const resolvedIsOpen = visibility === 'open' ? true : visibility === 'closed' ? false : (legacyIsOpen ?? false);
  const resolvedShowCloseButton = hideCloseButton !== undefined ? !hideCloseButton : headerChrome ? headerChrome === 'closeable' : (legacyShowCloseButton ?? true);
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