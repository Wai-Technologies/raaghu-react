import { expect, type ConsoleMessage, type Page } from '@playwright/test';

const IGNORED_CONSOLE_PATTERNS = [
  /favicon\.ico/i,
  /download the react devtools/i,
  /source map/i,
];

export interface RuntimeErrorCollector {
  readonly consoleErrors: string[];
  readonly pageErrors: string[];
  assertNoErrors: (context: string) => void;
  dispose: () => void;
}

export function trackRuntimeErrors(page: Page): RuntimeErrorCollector {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  const onConsole = (message: ConsoleMessage): void => {
    if (message.type() !== 'error') {
      return;
    }

    const text = message.text();
    const shouldIgnore = IGNORED_CONSOLE_PATTERNS.some((pattern) => pattern.test(text));
    if (!shouldIgnore) {
      consoleErrors.push(text);
    }
  };

  const onPageError = (error: Error): void => {
    pageErrors.push(error.message);
  };

  page.on('console', onConsole);
  page.on('pageerror', onPageError);

  return {
    consoleErrors,
    pageErrors,
    assertNoErrors: (context: string): void => {
      const allErrors = [
        ...consoleErrors.map((error) => `[console] ${error}`),
        ...pageErrors.map((error) => `[pageerror] ${error}`),
      ];

      expect(allErrors, `${context}\n${allErrors.join('\n')}`).toEqual([]);
    },
    dispose: (): void => {
      page.off('console', onConsole);
      page.off('pageerror', onPageError);
    },
  };
}
