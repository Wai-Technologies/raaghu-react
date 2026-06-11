import React from 'react';

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
    React.useEffect(() => {
      if (isIn) { onEnter?.(); onEntered?.(); }
      else { onExit?.(); onExited?.(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isIn]);

    if (!isIn) return null;
    return <div ref={ref} {...rest}>{children}</div>;
  }
);

MotionSnackbarTransition.displayName = 'MotionSnackbarTransition';
export default MotionSnackbarTransition;
