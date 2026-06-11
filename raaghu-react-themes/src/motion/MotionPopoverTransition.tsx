import React from 'react';

interface MotionPopoverTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  in?: boolean;
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  durationMs?: number;
  appear?: boolean;
  timeout?: number | { enter?: number; exit?: number; appear?: number };
}

const MotionPopoverTransition = React.forwardRef<HTMLDivElement, MotionPopoverTransitionProps>(
  ({ in: isIn, children, onEnter, onEntered, onExit, onExited, durationMs, appear, timeout, ...rest }, ref) => {
    React.useEffect(() => {
      if (isIn) { onEnter?.(); onEntered?.(); }
      else { onExit?.(); onExited?.(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isIn]);

    if (!isIn) return null;
    return <div ref={ref} style={{ transformOrigin: 'inherit' }} {...rest}>{children}</div>;
  }
);

MotionPopoverTransition.displayName = 'MotionPopoverTransition';
export default MotionPopoverTransition;
