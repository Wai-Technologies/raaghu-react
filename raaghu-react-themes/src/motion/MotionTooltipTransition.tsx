import React from 'react';

interface MotionTooltipTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  in?: boolean;
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  durationMs?: number;
  appear?: boolean;
  timeout?: number | { enter?: number; exit?: number; appear?: number };
}

const MotionTooltipTransition = ({ ref, in: isIn, children, onEnter, onEntered, onExit, onExited, durationMs, appear, timeout, ...rest }: MotionTooltipTransitionProps & { ref?: React.Ref<HTMLDivElement> }) => {
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
    return <div ref={ref} style={{ transformOrigin: 'inherit' }} {...rest}>{children}</div>;
  };

MotionTooltipTransition.displayName = 'MotionTooltipTransition';
export default MotionTooltipTransition;
