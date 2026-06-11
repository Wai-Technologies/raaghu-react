import React from 'react';

interface MotionDialogTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  in?: boolean;
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  durationMs?: number;
  appear?: boolean;
  timeout?: number | { enter?: number; exit?: number; appear?: number };
}

const MotionDialogTransition = React.forwardRef<HTMLDivElement, MotionDialogTransitionProps>(
  ({ in: isIn, children, onEnter, onEntered, onExit, onExited, durationMs, appear, timeout, ...rest }, ref) => {
    React.useEffect(() => {
      if (isIn) { onEnter?.(); onEntered?.(); }
      else { onExit?.(); onExited?.(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isIn]);

    if (!isIn) return null;
    return <div ref={ref} {...rest}>{children}</div>;
  }
);

MotionDialogTransition.displayName = 'MotionDialogTransition';
export default MotionDialogTransition;
