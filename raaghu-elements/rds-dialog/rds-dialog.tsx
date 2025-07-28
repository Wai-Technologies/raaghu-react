
import React from 'react';
import { Dialog as MuiDialog, DialogProps, DialogTitle, DialogContent, DialogActions, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export interface RdsDialogProps extends DialogProps {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  showCloseButton?: boolean;
  onClose?: () => void;
  variant?: 'standard' | 'default';
   ShowPrimary?: boolean;
  ShowSecondary?: boolean;
}


const RdsDialog: React.FC<RdsDialogProps> = ({
  title,
  children,
  actions,
  showCloseButton = true,
  onClose,
  variant = 'default',
   ShowPrimary,
  ShowSecondary,
  ...props
}) => {
  if (variant === 'standard') {
    return (
      <MuiDialog onClose={onClose} {...props}>
        {(title || showCloseButton) && (
          <DialogTitle
            className="rds-dialog__title"
            sx={{
              padding: '15px 8px 8px 20px',
              fontSize: '16px',
              fontWeight: 500,
              color: '#202020',
              lineHeight: '20px',
              margin: 0,
              minHeight: 'auto',
              boxSizing: 'border-box',
              height: '50px',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
              <div style={{ flex: 1 }}>{title}</div>
              {showCloseButton && (
                <IconButton
                  aria-label="close"
                  className="rds-dialog__close-button"
                  onClick={onClose}
                  size="medium"
                  sx={{
                    color: '#7D7D7D',
                    padding: '8px',
                    marginLeft: '16px',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      color: '#202020',
                    },
                  }}
                >
                  <CloseIcon sx={{ fontSize: '24px' }} />
                </IconButton>
              )}
            </div>
          </DialogTitle>
        )}
        <DialogContent
          className="rds-dialog__content"
          sx={{
            padding: '16px',
            paddingTop: '10px',
            minHeight: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fafafa',
            border: '1px solid #7D7D7D',
            margin: '0px 20px 0px 20px',
            borderRadius: '4px',
            fontSize: '14px',
            color: '#7D7D7D',
            textAlign: 'center',
            fontWeight: 400,
            lineHeight: '18px',
          }}
        >
          {children}
        </DialogContent>
       
          <DialogActions
            className="rds-dialog__actions"
            sx={{
              padding: '12px 20px 16px 20px',
              gap: '8px',
              justifyContent: 'flex-end',
              borderTop: 'none',
              margin: 0,
            }}
          >
            {ShowSecondary && (
          <Button 
            onClick={onClose} 
            className="rds-dialog__button rds-dialog__button--dismiss" 
            variant="text" 
            sx={{
              fontSize: '14px',
              fontWeight: 400,
              textTransform: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              color: '#3C98FF',
              minWidth: '60px',
              height: '32px',
              '&:hover': {
                backgroundColor: 'rgba(60, 152, 255, 0.04)'
              }
            }}
          >
            Cancel
          </Button>
        )}
        {ShowPrimary && (
          <Button
            onClick={() => {}}
            className="rds-dialog__button rds-dialog__button--primary"
            variant="contained"
            sx={{
              fontSize: '14px',
              fontWeight: 400,
              textTransform: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              backgroundColor: '#3C98FF',
              color: '#ffffff',
              minWidth: '60px',
              height: '32px',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#2B7EE6',
                boxShadow: 'none'
              },
              '&:active': {
                backgroundColor: '#1E6BCE',
                boxShadow: 'none'
              }
            }}
          >
            Okay
          </Button>
        )}
          </DialogActions>
        
      </MuiDialog>
    );
  }
 
  return (
    <MuiDialog onClose={onClose} {...props}>
      {(title || showCloseButton) && (
        <DialogTitle sx={{ position: 'relative', paddingRight: showCloseButton ? '40px' : undefined }}>
          {title}
          {showCloseButton && onClose && (
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

export default RdsDialog;
