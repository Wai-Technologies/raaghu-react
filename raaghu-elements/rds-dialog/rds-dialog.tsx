
import type { ReactNode, MouseEvent } from 'react';
import { useId } from 'react';
import { Dialog as MuiDialog, type DialogProps, DialogTitle, DialogContent, DialogActions, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';
import RdsButton from '../rds-button/rds-button';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-dialog.scss';

const SIZE_MAP = {
  'extra-small': 'xs',
  'small': 'sm',
  'medium': 'md',
  'large': 'lg',
  'extra-large': 'xl',
} as const;

export interface RdsDialogProps extends Omit<DialogProps, 'component'> {
  /** Title text of the dialog. */
  title?: string;
  children?: ReactNode;
  /** Action content rendered in the dialog footer. */
  actions?: ReactNode;
  /** Shows the close button; superseded by `showCloseButton`. */
  showDissmiss?: boolean;
  /** Shows the close button. Takes precedence over `showDissmiss`. Defaults to `true`. */
  showCloseButton?: boolean;
  /**
   * MUI's `onClose(event, reason)`: `reason` is `'backdropClick'` or `'escapeKeyDown'` when MUI closes the dialog.
   * The built-in close button (and, in the `standard` variant, the Cancel/Okay buttons when no
   * `onSecondaryClick`/`onPrimaryClick` is given) call it with the click event only, without a `reason`.
   */
  onClose?: DialogProps['onClose'];
  /** `confirm` is the centred layout with primary/secondary buttons. */
  variant?: 'default' | 'confirm' | 'standard';
  /** Shows the primary button (`standard` variant only). */
  showPrimary?: boolean;
  /** Shows the secondary button (`standard` variant only). */
  showSecondary?: boolean;
  /** @deprecated Omit `title` instead. */
  showTitle?: boolean;
  /**
   * @deprecated Prefer `maxWidth` (`'xs' | 'sm' | 'md' | 'lg' | 'xl' | false`). A `maxWidth` prop takes precedence.
   *
   * Dialog width uses MUI’s 5-breakpoint scale (not the component `small`/`medium`/`large` size token):
   * `'extra-small'`→`xs`, `'small'`→`sm`, `'medium'`→`md`, `'large'`→`lg`, `'extra-large'`→`xl`.
   * Pass `false` to disable the max-width constraint so the paper grows with its content (same as `maxWidth={false}`).
   */
  size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | false;
  /** Label of the primary button (`standard` variant). Defaults to `'Okay'`. */
  primaryText?: string;
  /** Label of the secondary button (`standard` variant). Defaults to `'Cancel'`. */
  secondaryText?: string;
  /** Called when the primary button is clicked. Without it the button calls `onClose`. */
  onPrimaryClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Called when the secondary button is clicked. Without it the button calls `onClose`. */
  onSecondaryClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

type DialogSlotProps = NonNullable<DialogProps['slotProps']>;
type PaperSlotProps = NonNullable<DialogSlotProps['paper']>;
type PaperSlotPropsObject = Exclude<PaperSlotProps, (...args: never[]) => unknown>;

const toSxArray = <T,>(sx: T | readonly T[]): T[] => (Array.isArray(sx) ? [...sx] : [sx as T]);

/** Merges consumer paper props into ours: consumer wins, `className` is combined, `sx` is concatenated. */
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

const RdsDialog = ({
  title,
  children,
  actions,
  showDissmiss,
  showCloseButton: showCloseButtonProp,
  onClose,
  variant = 'default',
  showPrimary,
  showSecondary,
  showTitle: showTitleProp,
  size,
  primaryText = 'Okay',
  secondaryText = 'Cancel',
  onPrimaryClick,
  onSecondaryClick,
  slotProps,
  'aria-labelledby': ariaLabelledByProp,
  ...props
}: RdsDialogProps) => {
  if (showTitleProp !== undefined) warnDeprecatedProp('RdsDialog', 'showTitle', '`title={undefined}`');
  if (size !== undefined) warnDeprecatedProp('RdsDialog', 'size', '`maxWidth`');
  if (variant === 'standard') warnDeprecatedProp('RdsDialog', 'variant="standard"', '`variant="confirm"`');
  const showTitle = showTitleProp ?? true;
  const showClose = showCloseButtonProp ?? showDissmiss ?? true;
  const resolvedSize = size ?? 'medium';
  const titleId = useId();
  const labelledBy = ariaLabelledByProp ?? (showTitle && title ? titleId : undefined);
  const closeFromButton = (event: MouseEvent<HTMLButtonElement>) => {
    (onClose as ((event: MouseEvent<HTMLButtonElement>) => void) | undefined)?.(event);
  };

  const titleRow = (opts: { confirm: boolean }) =>
    ((title && showTitle) || showClose) && (
      <DialogTitle
        component="div"
        className={opts.confirm ? 'rds-dialog__title' : undefined}
        sx={
          opts.confirm
            ? undefined
            : {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                pr: showClose ? 1 : undefined,
              }
        }
      >
        {opts.confirm ? (
          <div className="rds-dialog__title-inner">
            <div style={{ flex: 1 }}>
              {showTitle && title ? <span id={titleId}>{title}</span> : null}
            </div>
            {showClose && (
              <IconButton aria-label="close" className="rds-dialog__close-button" onClick={closeFromButton} size="medium">
                <CloseIcon />
              </IconButton>
            )}
          </div>
        ) : (
          <>
            <Box
              sx={{
                flex: '1 1 auto',
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {showTitle && title ? <span id={titleId}>{title}</span> : null}
            </Box>
            {showClose && onClose && (
              <IconButton
                aria-label="close"
                onClick={closeFromButton}
                sx={{
                  flex: '0 0 auto',
                  color: 'var(--rds-neutral-500)',
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </>
        )}
      </DialogTitle>
    );

  if (variant === 'confirm' || variant === 'standard') {
    return (
      <MuiDialog
        onClose={onClose}
        maxWidth={resolvedSize ? SIZE_MAP[resolvedSize] : resolvedSize}
        aria-labelledby={labelledBy}
        {...props}
        slotProps={{
          ...slotProps,
          paper: mergePaperSlotProps({ className: 'rds-dialog rds-dialog__paper' }, slotProps?.paper),
        }}
      >
        {titleRow({ confirm: true })}
        <DialogContent className="rds-dialog__content" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', textAlign: 'center' }}>{children}</DialogContent>
        <DialogActions className="rds-dialog__actions">
          {showSecondary && (
            <RdsButton
              onClick={onSecondaryClick ?? closeFromButton}
              className="rds-dialog__button rds-dialog__button__dismiss"
              variant="outlined"
              textCase="uppercase"
            >
              {secondaryText}
            </RdsButton>
          )}
          {showPrimary && (
            <RdsButton
              onClick={onPrimaryClick ?? closeFromButton}
              className="rds-dialog__button rds-dialog__button__primary"
              variant="filled"
              textCase="uppercase"
            >
              {primaryText}
            </RdsButton>
          )}
        </DialogActions>
      </MuiDialog>
    );
  }

  return (
  <MuiDialog
    onClose={onClose}
    maxWidth={resolvedSize ? SIZE_MAP[resolvedSize] : resolvedSize}
    aria-labelledby={labelledBy}
    {...props}
    slotProps={slotProps}
  >
      {titleRow({ confirm: false })}
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
RdsDialog.displayName = 'RdsDialog';
export default RdsDialog;
