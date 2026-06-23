import React from 'react';

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
    return <div ref={ref} style={{ transformOrigin: 'top center' }} {...rest}>{children}</div>;
  }
);

MotionMenuTransition.displayName = 'MotionMenuTransition';
export default MotionMenuTransition;
