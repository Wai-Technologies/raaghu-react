import React from 'react';

interface MotionDrawerTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  in?: boolean;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  durationMs?: number;
  appear?: boolean;
  timeout?: number | { enter?: number; exit?: number; appear?: number };
}

const MotionDrawerTransition = React.forwardRef<HTMLDivElement, MotionDrawerTransitionProps>(
  ({ in: isIn, children, anchor = 'left', onEnter, onEntered, onExit, onExited, durationMs, appear, timeout, ...rest }, ref) => {
    React.useEffect(() => {
      if (isIn) { onEnter?.(); onEntered?.(); }
      else { onExit?.(); onExited?.(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isIn]);

    if (!isIn) return null;
    return <div ref={ref} style={{ height: '100%' }} {...rest}>{children}</div>;
  }
);

MotionDrawerTransition.displayName = 'MotionDrawerTransition';
export default MotionDrawerTransition;
