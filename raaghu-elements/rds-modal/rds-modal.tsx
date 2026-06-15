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
  isOpen: boolean;
  onClose: () => void;
  actions?: ReactNode;
  showCloseButton?: boolean;
  icon?: ReactNode;
  showIcon?: boolean;
  imageSrc?: string;
  showDescription?: boolean;
}
 
const RdsModal= ({
  title,
  isOpen,
  onClose,
  actions,
  showCloseButton = true,
  icon,
  showIcon = true,
  showDescription = true,
  imageSrc,
  children,
  ...props
}:RdsModalProps) => {
  return (
    <MuiDialog
      open={isOpen}
      onClose={onClose}
      {...props}
    >
      {(title || icon || imageSrc) && (
          <DialogTitle className={clsx('rds-modal__title', showCloseButton && 'rds-modal__title--with-close')}>
          <div className='rds-modal__content'>
          {icon && showIcon && (
            <span className="rds-modal__icon mt-1">{icon}</span>
          )}
          {imageSrc && (
            <img src={imageSrc} alt="Modal" className="rds-modal__image" />
          )}
          </div>
          <Typography sx={{ textAlign: 'center', flexGrow: 1 }} variant="h6" component="div">
            {title}
          </Typography>
          {showCloseButton && (
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
        {showDescription && children}
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