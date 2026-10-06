import React from 'react';

interface MotionCollapseProps {
  in?: boolean;
  children?: React.ReactNode;
  onExited?: () => void;
  durationMs?: number;
  appear?: boolean;
  timeout?: number | { appear?: number; enter?: number; exit?: number };
}

const MotionCollapse = React.forwardRef<HTMLDivElement, MotionCollapseProps>(
  ({ in: isIn, children, onExited }, ref) => {
    const onExitedRef = React.useRef(onExited);
    const wasOpenRef = React.useRef(Boolean(isIn));
    React.useLayoutEffect(() => {
      onExitedRef.current = onExited;
    });
    React.useEffect(() => {
      const open = Boolean(isIn);
      if (wasOpenRef.current && !open) {
        onExitedRef.current?.();
      }
      wasOpenRef.current = open;
    }, [isIn]);

    return (
      <div ref={ref} style={{ overflow: 'hidden', display: isIn ? undefined : 'none' }}>
        {children}
      </div>
    );
  }
);

MotionCollapse.displayName = 'MotionCollapse';
export { MotionCollapse };
