// Global type declarations for jest-axe (no @types/jest-axe needed).
// This file has no top-level imports, making it a global script file that
// TypeScript automatically includes in all compilation units.

declare module 'jest-axe' {
  import type { AxeResults, RunOptions } from 'axe-core';

  function axe(element: Element | string, options?: RunOptions): Promise<AxeResults>;
  const toHaveNoViolations: { toHaveNoViolations: jest.CustomMatcher };
  export { axe, toHaveNoViolations };
}

declare module 'jest-axe/extend-expect' {}

declare namespace jest {
  interface Matchers<R> {
    toHaveNoViolations(): R;
  }
}
