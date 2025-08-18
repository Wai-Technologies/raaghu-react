import React from 'react';
import { 
  Dialog as MuiDialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  DialogProps,
  IconButton,
  Typography
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import './rds-modal.scss';

export interface RdsModalProps extends Omit<DialogProps, 'title' | 'open'> {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  actions?: React.ReactNode;
  showCloseButton?: boolean;
  icon?: React.ReactNode;
  imageSrc?: string;
}

const RdsModal: React.FC<RdsModalProps> = ({
  title,
  isOpen,
  onClose,
  actions,
  showCloseButton = true,
  icon,
  imageSrc,
  children,
  ...props
}) => {
  return (
    <MuiDialog
      open={isOpen}
      onClose={onClose}
      {...props}
    >
      {(title || icon || imageSrc) && (
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {icon && (
            <span className="rds-modal__icon mt-1">{icon}</span>
          )}
          {imageSrc && (
            <img src={imageSrc} alt="Modal" className="rds-modal__image" />
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {showCloseButton && (
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
RdsModal.displayName = 'RdsModal';
export default RdsModal;
