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
    React.useEffect(() => {
      if (!isIn) onExited?.();
    }, [isIn, onExited]);

    return (
      <div ref={ref} style={{ overflow: 'hidden', display: isIn ? undefined : 'none' }}>
        {children}
      </div>
    );
  }
);

MotionCollapse.displayName = 'MotionCollapse';
export default MotionCollapse;
