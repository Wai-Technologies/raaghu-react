import React, { useState, useCallback } from 'react';
import { Drawer as MuiDrawer, DrawerProps } from '@mui/material';
import RdsButton from '../rds-button/rds-button';
import './rds-drawer.scss';

export interface RdsDrawerProps extends DrawerProps {
  children: React.ReactNode;
  width?: number | string;
  position?: 'left' | 'right' | 'top' | 'bottom';
  showTrigger?: boolean;
  triggerText?: string;
  triggerTextWhenOpen?: string;
  defaultOpen?: boolean;
  triggerButtonProps?: Partial<React.ComponentProps<typeof RdsButton>>;
  showCloseButton?: boolean;
  closeButtonText?: string;
  closeButtonProps?: Partial<React.ComponentProps<typeof RdsButton>>;
  centerTrigger?: boolean;
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
  const isControlled = !showTrigger && props.open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const actualOpen = isControlled ? props.open : internalOpen;

  const handleToggle = useCallback(() => {
    if (!isControlled) setInternalOpen(!internalOpen);
  }, [isControlled, internalOpen]);

  const handleClose = useCallback((event?: any, reason?: any) => {
    if (!isControlled) setInternalOpen(false);
    if (props.onClose) {
      (props.onClose as any)(event, reason);
    }
  }, [isControlled, props]);

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
              text={closeButtonText}
              onClick={() => handleClose({}, 'buttonClick')}
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
        onClick={handleToggle}
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
