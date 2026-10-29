import React from 'react';

interface MotionCollapseProps {
  in?: boolean;
  children?: React.ReactNode;
  onExited?: () => void;
  durationMs?: number;
  appear?: boolean;
  timeout?: number | { appear?: number; enter?: number; exit?: number };
}

const MotionCollapse = ({ ref, in: isIn, children, onExited }: MotionCollapseProps & { ref?: React.Ref<HTMLDivElement> }) => {
    const prevIsInRef = React.useRef(Boolean(isIn));
    React.useEffect(() => {
      if (prevIsInRef.current && !isIn) {
        onExited?.();
      }
      prevIsInRef.current = Boolean(isIn);
    }, [isIn, onExited]);

    return (
      <div ref={ref} style={{ overflow: 'hidden', display: isIn ? undefined : 'none' }}>
        {children}
      </div>
    );
  };

MotionCollapse.displayName = 'MotionCollapse';
export { MotionCollapse };
