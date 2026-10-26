import { useEffect, useLayoutEffect } from 'react';

/**
 * `useLayoutEffect` in the browser; `useEffect` during SSR so React does not
 * warn about layout effects when there is no DOM.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
