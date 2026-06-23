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
    const onEnterRef = React.useRef(onEnter);
    const onEnteredRef = React.useRef(onEntered);
    const onExitRef = React.useRef(onExit);
    const onExitedRef = React.useRef(onExited);
    React.useLayoutEffect(() => { onEnterRef.current = onEnter; onEnteredRef.current = onEntered; onExitRef.current = onExit; onExitedRef.current = onExited; });
    React.useEffect(() => {
      if (isIn) { onEnterRef.current?.(); onEnteredRef.current?.(); }
      else { onExitRef.current?.(); onExitedRef.current?.(); }
    }, [isIn]);

    if (!isIn) return null;
    return <div ref={ref} style={{ height: '100%' }} {...rest}>{children}</div>;
  }
);

MotionDrawerTransition.displayName = 'MotionDrawerTransition';
export default MotionDrawerTransition;
