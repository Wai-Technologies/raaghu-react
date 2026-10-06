import { useEffect, useLayoutEffect, useRef } from 'react';

interface TransitionCallbacks {
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
}

/**
 * Emits enter/exit once per open-state change.
 * Strict Mode re-runs effects on the same instance; the reported flag
 * survives that second pass so callbacks are not fired twice.
 */
export function useReportedTransition(isIn: boolean | undefined, callbacks: TransitionCallbacks): void {
  const callbacksRef = useRef(callbacks);
  useLayoutEffect(() => {
    callbacksRef.current = callbacks;
  });

  const reported = useRef<boolean | null>(null);

  useEffect(() => {
    const open = Boolean(isIn);
    if (reported.current === open) return;
    reported.current = open;
    const current = callbacksRef.current;
    if (open) {
      current.onEnter?.();
      current.onEntered?.();
    } else {
      current.onExit?.();
      current.onExited?.();
    }
  }, [isIn]);
}
