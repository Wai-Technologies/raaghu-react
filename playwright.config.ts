import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const storybookPort = Number(process.env.STORYBOOK_PORT ?? 6006);
const baseURL = process.env.STORYBOOK_URL ?? `http://127.0.0.1:${storybookPort}`;
const runCrossBrowser = process.env.PW_CROSS_BROWSER === 'true';

const projects = runCrossBrowser
  ? [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      },
      {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
      },
    ]
  : [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
    ];

export default defineConfig({
  testDir: '.',
  testMatch: ['tests/**/*.spec.ts', 'e2e/**/*.spec.ts'],
  timeout: 45_000,
  expect: {
    timeout: 8_000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
  },

  projects,

  /* Run your local dev server before starting the tests */
  webServer: process.env.STORYBOOK_URL
    ? undefined
    : {
        command: `npm run storybook -- --ci --port ${storybookPort} --no-open`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 240_000,
      },
});
