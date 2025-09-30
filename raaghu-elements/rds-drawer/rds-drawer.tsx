import React, { useState, useCallback } from 'react';
import { Drawer as MuiDrawer, DrawerProps } from '@mui/material';
import RdsButton from '../rds-button/rds-button';
import './rds-drawer.scss';

export interface RdsDrawerProps extends DrawerProps {
  children: React.ReactNode;
  width?: number | string;
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** When true, component renders an internal trigger button to open the drawer (uncontrolled usage). */
  showTrigger?: boolean;
  /** Text for the trigger button. */
  triggerText?: string;
  /** Text for the trigger button when drawer is open (for toggle behavior). */
  triggerTextWhenOpen?: string;
  /** Initial open state when using internal (uncontrolled) mode. */
  defaultOpen?: boolean;
  /** Additional props forwarded to the trigger RdsButton (except text & onClick which are managed). */
  triggerButtonProps?: Partial<React.ComponentProps<typeof RdsButton>>;
  /** When true, renders a close button inside the drawer content. */
  showCloseButton?: boolean;
  /** Text for the close button inside the drawer. */
  closeButtonText?: string;
  /** Additional props forwarded to the close RdsButton. */
  closeButtonProps?: Partial<React.ComponentProps<typeof RdsButton>>;
  /** When true, wraps the trigger button in a centered container (useful for stories). */
  centerTrigger?: boolean;
  /** CSS class name for the trigger wrapper container. */
  triggerWrapperClassName?: string;
}

const RdsDrawer: React.FC<RdsDrawerProps> = ({
  children,
  width = 251,
  position = 'left',
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
  centerTrigger = false,
  triggerWrapperClassName,
  ...props
}) => {
  const drawerAnchor = anchor || position;
  // If showTrigger is enabled, treat drawer as uncontrolled regardless of an 'open' prop to avoid anchor drift when switching stories
  const isControlled = !showTrigger && props.open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const actualOpen = isControlled ? props.open : internalOpen;

  const handleToggle = useCallback(() => {
    if (!isControlled) setInternalOpen(!internalOpen);
    // If controlled, consumer should update 'open' prop externally
  }, [isControlled, internalOpen]);

  const handleClose = useCallback((...args: any[]) => {
    if (!isControlled) setInternalOpen(false);
    if (props.onClose) {
      // MUI onClose signature: (event: React.SyntheticEvent, reason: string) => void
      // Forward original arguments if present
      // @ts-ignore
      props.onClose(...(args as any));
    }
  }, [isControlled, props]);

  // Determine button text based on state and props
  const getButtonText = () => {
    if (triggerTextWhenOpen && actualOpen) {
      return triggerTextWhenOpen;
    }
    return triggerText;
  };

  // Render drawer content with optional close button
  const renderDrawerContent = () => {
    if (showCloseButton) {
      return (
        <div>
          {children}
          <div className='rds-drawer-close-button'>
            <RdsButton
              text={closeButtonText}
              onClick={handleClose}
              color="primary"
              layout="text-only"
              shape="rectangle"
              size="medium"
              state="default"
              style="filled"
              textCase="unset"
              {...closeButtonProps}
            />
          </div>
        </div>
      );
    }
    return children;
  };
  
  const drawerElement = (
    <MuiDrawer
      anchor={drawerAnchor}
      open={actualOpen}
      onClose={handleClose}
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
        },
        ...sx,
      }}
      {...props}
    >
      {renderDrawerContent()}
    </MuiDrawer>
  );

  if (showTrigger) {
    const triggerButton = (
      <RdsButton
        text={getButtonText()}
        onClick={triggerTextWhenOpen ? handleToggle : handleToggle}
        color="primary"
        layout="text-only"
        shape="rectangle"
        size="medium"
        state="default"
        style="filled"
        textCase="unset"
        {...triggerButtonProps}
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
