
import React, { type ReactNode, type MouseEvent } from 'react';
import clsx from 'clsx';
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
  primaryText?: string;
  secondaryText?: string;
  onPrimaryClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onSecondaryClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

type PaperSlotProps = NonNullable<NonNullable<DialogProps['slotProps']>['paper']>;
type PaperSlotPropsObject = Exclude<PaperSlotProps, (...args: never[]) => unknown>;

const toSxArray = <T,>(sx: T | readonly T[]): T[] => (Array.isArray(sx) ? [...sx] : [sx as T]);

const mergePaperProps = (base: PaperSlotPropsObject, consumer: PaperSlotPropsObject | undefined): PaperSlotPropsObject => {
  if (!consumer) return base;
  return {
    ...base,
    ...consumer,
    className: clsx(base.className, consumer.className),
    ...(base.sx !== undefined && consumer.sx !== undefined
      ? { sx: [...toSxArray(base.sx), ...toSxArray(consumer.sx)] }
      : {}),
  } as PaperSlotPropsObject;
};

const mergePaperSlotProps = (base: PaperSlotPropsObject, consumer: PaperSlotProps | undefined): PaperSlotProps =>
  typeof consumer === 'function'
    ? (ownerState) => mergePaperProps(base, consumer(ownerState) as PaperSlotPropsObject)
    : mergePaperProps(base, consumer);

const RdsDialog = React.forwardRef<HTMLDivElement, RdsDialogProps>(function RdsDialog({
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
  primaryText = 'Okay',
  secondaryText = 'Cancel',
  onPrimaryClick,
  onSecondaryClick,
  slotProps,
  ...props
}, ref) {
  if (variant === 'standard') {
    const paperClassName = clsx(
      'rds-dialog',
      'rds-dialog__paper',
      'rds-dialog--icon',
      size === 'extra-small' && 'rds-dialog--extra-small',
    );

    return (
      <MuiDialog
        ref={ref}
        onClose={onClose}
        maxWidth={size ? SIZE_MAP[size] : size}
        {...props}
        slotProps={{ ...slotProps, paper: mergePaperSlotProps({ className: paperClassName }, slotProps?.paper) }}
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
                  sx={{ position: 'static', flexShrink: 0, marginRight: 'calc(var(--rds-spacing-xs) * -1)' }}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </div>
          </DialogTitle>
        )}
        <DialogContent className="rds-dialog__content" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', textAlign: 'center' }}>{children}</DialogContent>
        <DialogActions className="rds-dialog__actions rds-dialog__actions--stacked" disableSpacing>
          {ShowSecondary && (
            <RdsButton
              onClick={onSecondaryClick ?? (() => onClose?.())}
              className="rds-dialog__button rds-dialog__button__dismiss"
              style="outlined"
              color="primary"
              layout="text-only"
              textCase="uppercase"
              text={secondaryText}
            />
          )}
          {ShowPrimary && (
            <RdsButton
              onClick={onPrimaryClick ?? (() => onClose?.())}
              className="rds-dialog__button rds-dialog__button__primary"
              style="filled"
              color="primary"
              layout="text-only"
              textCase="uppercase"
              text={primaryText}
            />
          )}
        </DialogActions>
      </MuiDialog>
    );
  }

  return (
  <MuiDialog
    ref={ref}
    onClose={onClose}
    maxWidth={size ? SIZE_MAP[size] : size}
    {...props}
    slotProps={{ ...slotProps, paper: mergePaperSlotProps({ className: 'rds-dialog rds-dialog__paper' }, slotProps?.paper) }}
  >
      {((title && showTitle) || ShowDissmiss) && (
        <DialogTitle
          className="rds-dialog__title"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--rds-spacing-xs)',
          }}
        >
          <Box
            component="span"
            sx={{
              display: 'block',
              flex: 1,
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {showTitle ? title : null}
          </Box>
          {ShowDissmiss && onClose && (
            <IconButton
              aria-label="close"
              className="rds-dialog__close-button"
              onClick={onClose}
              size="medium"
              sx={{ position: 'static', flexShrink: 0, marginRight: 'calc(var(--rds-spacing-xs) * -1)' }}
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
        <DialogActions className="rds-dialog__actions">
          {actions}
        </DialogActions>
      )}
    </MuiDialog>
  );
});
RdsDialog.displayName = 'RdsDialog';
export default RdsDialog;

