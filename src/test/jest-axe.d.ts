
declare module 'jest-axe' {
  import type { AxeResults, RunOptions } from 'axe-core';

  function axe(element: Element | string, options?: RunOptions): Promise<AxeResults>;
  function configureAxe(options?: RunOptions): typeof axe;
  const toHaveNoViolations: { toHaveNoViolations: jest.CustomMatcher };
  export { axe, configureAxe, toHaveNoViolations };
}

declare module 'jest-axe/extend-expect' {}

declare namespace jest {
  interface Matchers<R> {
    toHaveNoViolations(): R;
  }
}
