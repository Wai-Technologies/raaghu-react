import React from 'react';
import { useReportedTransition } from './useReportedTransition';

interface MotionMenuTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  in?: boolean;
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  durationMs?: number;
  appear?: boolean;
  timeout?: number | { enter?: number; exit?: number; appear?: number };
}

const MotionMenuTransition = React.forwardRef<HTMLDivElement, MotionMenuTransitionProps>(
  ({ in: isIn, children, onEnter, onEntered, onExit, onExited, durationMs, appear, timeout, ...rest }, ref) => {
    useReportedTransition(isIn, { onEnter, onEntered, onExit, onExited });

    if (!isIn) return null;
    return <div ref={ref} style={{ transformOrigin: 'top center' }} {...rest}>{children}</div>;
  }
);

MotionMenuTransition.displayName = 'MotionMenuTransition';
export default MotionMenuTransition;
