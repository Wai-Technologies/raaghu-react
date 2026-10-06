import React from 'react';
import { useReportedTransition } from './useReportedTransition';

interface MotionSnackbarTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  in?: boolean;
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  onDismiss?: () => void;
  durationMs?: number;
  appear?: boolean;
  timeout?: number | { enter?: number; exit?: number; appear?: number };
}

const MotionSnackbarTransition = React.forwardRef<HTMLDivElement, MotionSnackbarTransitionProps>(
  ({ in: isIn, children, onEnter, onEntered, onExit, onExited, onDismiss, durationMs, appear, timeout, ...rest }, ref) => {
    useReportedTransition(isIn, { onEnter, onEntered, onExit, onExited });

    if (!isIn) return null;
    return <div ref={ref} {...rest}>{children}</div>;
  }
);

MotionSnackbarTransition.displayName = 'MotionSnackbarTransition';
export default MotionSnackbarTransition;
