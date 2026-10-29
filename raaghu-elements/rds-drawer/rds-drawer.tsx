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
  /** Width for `left`/`right` anchors (defaults to 251). Applied as the height for `top`/`bottom` anchors. */
  width?: number | string;
  /** @deprecated Use `anchor` instead. */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * Renders a trigger button next to the drawer. Without `open` the trigger toggles the drawer's
   * internal state. With `open` (controlled) the trigger reflects `open` (label, `aria-expanded`)
   * and does not change it; wire `triggerButtonProps.onClick` to update `open`.
   */
  showTrigger?: boolean;
  /** Text of the trigger button. @default 'Open Drawer' */
  triggerText?: string;
  /** Text of the trigger button while the drawer is open; falls back to `triggerText`. */
  triggerTextWhenOpen?: string;
  /** Initial open state when the drawer is uncontrolled. @default false */
  defaultOpen?: boolean;
  /** @deprecated Use `slotProps.trigger` instead. */
  triggerButtonProps?: DrawerButtonProps;
  /** Shows a close button inside the drawer. @default false */
  showCloseButton?: boolean;
  /** Text of the built-in close button. @default 'Close Drawer' */
  closeButtonText?: string;
  /** @deprecated Use `slotProps.closeButton` instead. */
  closeButtonProps?: DrawerButtonProps;
  /** MUI Drawer slot props, plus `trigger` and `closeButton` for the built-in buttons. */
  slotProps?: DrawerProps['slotProps'] & { trigger?: DrawerButtonProps; closeButton?: DrawerButtonProps };
  /** Centers the trigger button inside its wrapper. @default false */
  centerTrigger?: boolean;
  /** Class name of the trigger wrapper; defaults to 'rds-drawer-trigger-wrapper' when `centerTrigger` is set. */
  triggerWrapperClassName?: string;
  /**
   * Embeds the drawer in document flow (relative paper, full height) for flex layouts
   * such as app-shell — avoids SCSS `!important` fights with MUI fixed positioning.
   */
  embedded?: boolean;
}

const RdsDrawer = ({
  children,
  width,
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
  embedded = false,
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

  const isSideAnchor = drawerAnchor === 'left' || drawerAnchor === 'right';
  const sizeSx = isSideAnchor ? { width: width ?? 251 } : width === undefined ? {} : { height: width };

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
              variant="filled"
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
          ...sizeSx,
          flexShrink: 0,
          ...(embedded && { position: 'relative', height: '100%' }),
          '& .MuiDrawer-paper': {
            ...sizeSx,
            boxSizing: 'border-box',
            ...(embedded && {
              position: 'relative',
              top: 'auto',
              left: 'auto',
              height: '100%',
              marginTop: 0,
              marginLeft: 0,
              boxShadow: 'none',
            }),
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
        variant="filled"
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
