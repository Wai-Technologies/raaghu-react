import { useState, useId, type ReactNode, type ComponentProps } from 'react';
import { Drawer as MuiDrawer, type DrawerProps } from '@mui/material';
import RdsButton from '../rds-button/rds-button';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-drawer.scss';

type DrawerCloseEvent = Parameters<NonNullable<DrawerProps['onClose']>>[0];
type DrawerCloseReason = Parameters<NonNullable<DrawerProps['onClose']>>[1];

type DrawerButtonProps = Partial<ComponentProps<typeof RdsButton>>;

export interface RdsDrawerProps extends Omit<DrawerProps, 'component' | 'slotProps'> {
  children: ReactNode;
  width?: number | string;
  /** @deprecated Use `anchor` instead. */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * Renders a trigger button next to the drawer. Without `open` the trigger toggles the drawer's
   * internal state. With `open` (controlled) the trigger reflects `open` (label, `aria-expanded`)
   * and does not change it; wire `triggerButtonProps.onClick` to update `open`.
   */
  showTrigger?: boolean;
  triggerText?: string;
  triggerTextWhenOpen?: string;
  defaultOpen?: boolean;
  /** @deprecated Use `slotProps.trigger` instead. */
  triggerButtonProps?: DrawerButtonProps;
  showCloseButton?: boolean;
  closeButtonText?: string;
  /** @deprecated Use `slotProps.closeButton` instead. */
  closeButtonProps?: DrawerButtonProps;
  /** MUI Drawer slot props, plus `trigger` and `closeButton` for the built-in buttons. */
  slotProps?: DrawerProps['slotProps'] & { trigger?: DrawerButtonProps; closeButton?: DrawerButtonProps };
  centerTrigger?: boolean;
  triggerWrapperClassName?: string;
}

const RdsDrawer = ({
  children,
  width = 251,
  position,
  anchor,
  sx,
  showTrigger = false,
  triggerText = 'Open Drawer',
  triggerTextWhenOpen,
  defaultOpen = false,
  triggerButtonProps,
  showCloseButton = false,
  closeButtonText = 'Close Drawer',
  closeButtonProps,
  slotProps,
  centerTrigger = false,
  triggerWrapperClassName,
  open,
  onClose,
  id,
  ...props
}: RdsDrawerProps) => {
  if (position !== undefined) warnDeprecatedProp('RdsDrawer', 'position', '`anchor`');

  if (triggerButtonProps !== undefined) warnDeprecatedProp('RdsDrawer', 'triggerButtonProps', '`slotProps.trigger`');
  if (closeButtonProps !== undefined) warnDeprecatedProp('RdsDrawer', 'closeButtonProps', '`slotProps.closeButton`');
  const { trigger: triggerSlot, closeButton: closeButtonSlot, ...drawerSlotProps } = slotProps ?? {};
  const drawerAnchor = anchor ?? position ?? 'left';
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const actualOpen = isControlled ? open : internalOpen;
  const generatedId = useId();

  const handleToggle = () => {
    if (!isControlled) setInternalOpen((prev) => !prev);
  };

  const handleClose = (event: DrawerCloseEvent = {}, reason: DrawerCloseReason | 'buttonClick' = 'escapeKeyDown') => {
    if (!isControlled) setInternalOpen(false);
    onClose?.(event, reason as DrawerCloseReason);
  };

  const drawerId = id ?? (showTrigger ? generatedId : undefined);

  const getButtonText = () => {
    if (triggerTextWhenOpen && actualOpen) {
      return triggerTextWhenOpen;
    }
    return triggerText;
  };

  const renderDrawerContent = () => {
    if (showCloseButton) {
      return (
        <div>
          {children}
          <div className='rds-drawer-close-button'>
            <RdsButton
              children={closeButtonText}
              onClick={() => handleClose({}, 'buttonClick')}
              color="primary"
              layout="text-only"
              shape="rectangle"
              size="medium"
              style="filled"
              textCase="unset"
              {...closeButtonProps}
              {...closeButtonSlot}
            />
          </div>
        </div>
      );
    }
    return children;
  };

  const drawerContent = renderDrawerContent();

  const drawerElement = (
    <MuiDrawer
      {...props}
      slotProps={slotProps && drawerSlotProps}
      id={drawerId}
      anchor={drawerAnchor}
      open={actualOpen}
      onClose={handleClose}
      sx={[
        {
          width: width,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: width,
            boxSizing: 'border-box',
          },
        },
        ...(sx === undefined ? [] : Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {drawerContent}
    </MuiDrawer>
  );

  if (showTrigger) {
    const triggerButton = (
      <RdsButton
        children={getButtonText()}
        onClick={handleToggle}
        aria-expanded={actualOpen}
        aria-controls={actualOpen ? drawerId : undefined}
        color="primary"
        layout="text-only"
        shape="rectangle"
        size="medium"
        style="filled"
        textCase="unset"
        {...triggerButtonProps}
        {...triggerSlot}
      />
    );

    if (centerTrigger) {
      const wrapperClass = triggerWrapperClassName || 'rds-drawer-trigger-wrapper';
      return (
        <>
          <div className={wrapperClass}>
            {triggerButton}
          </div>
          {drawerElement}
        </>
      );
    }

    return (
      <>
        {triggerButton}
        {drawerElement}
      </>
    );
  }

  return drawerElement;
};
RdsDrawer.displayName = 'RdsDrawer';
export default RdsDrawer;
