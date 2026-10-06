import React from 'react';
import { useReportedTransition } from './useReportedTransition';

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
    useReportedTransition(isIn, { onEnter, onEntered, onExit, onExited });

    if (!isIn) return null;
    return <div ref={ref} style={{ height: '100%' }} {...rest}>{children}</div>;
  }
);

MotionDrawerTransition.displayName = 'MotionDrawerTransition';
export default MotionDrawerTransition;
