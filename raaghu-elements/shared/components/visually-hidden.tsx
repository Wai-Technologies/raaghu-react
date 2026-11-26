import type { HTMLAttributes, ReactNode } from 'react';
import './visually-hidden.scss';

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {
  /** Content exposed to assistive technology but hidden visually. */
  children: ReactNode;
}

/**
 * Hides content visually while keeping it available to screen readers.
 * Use for chart/map data tables and other WCAG 1.1.1 text alternatives.
 */
export function VisuallyHidden({ children, className, ...props }: VisuallyHiddenProps) {
  return (
    <span className={['rds-visually-hidden', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </span>
  );
}

export default VisuallyHidden;
