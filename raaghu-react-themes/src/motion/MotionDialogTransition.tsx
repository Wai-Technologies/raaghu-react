import React from 'react';
import { useIsomorphicLayoutEffect } from '../utils/use-isomorphic-layout-effect';

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

const MotionDialogTransition = ({ ref, in: isIn, children, onEnter, onEntered, onExit, onExited, durationMs, appear, timeout, ...rest }: MotionDialogTransitionProps & { ref?: React.Ref<HTMLDivElement> }) => {
    const onEnterRef = React.useRef(onEnter);
    const onEnteredRef = React.useRef(onEntered);
    const onExitRef = React.useRef(onExit);
    const onExitedRef = React.useRef(onExited);
    useIsomorphicLayoutEffect(() => { onEnterRef.current = onEnter; onEnteredRef.current = onEntered; onExitRef.current = onExit; onExitedRef.current = onExited; });
    React.useEffect(() => {
      if (isIn) { onEnterRef.current?.(); onEnteredRef.current?.(); }
      else { onExitRef.current?.(); onExitedRef.current?.(); }
    }, [isIn]);

    if (!isIn) return null;
    return <div ref={ref} {...rest}>{children}</div>;
  };

MotionDialogTransition.displayName = 'MotionDialogTransition';
export default MotionDialogTransition;
