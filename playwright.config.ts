import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for QA-style testing of Raaghu design system
 * elements and components against their Storybook stories.
 *
 * Tests cover: responsiveness, accessibility (axe), keyboard navigation,
 * hover/focus states, disabled behaviour, theme variants, and visual regression.
 */
export default defineConfig({
  /* Look for *.spec.ts inside element / component folders */
  testDir: '.',
  testMatch: [
    'raaghu-elements/**/*.spec.ts',
    'raaghu-components/**/*.spec.ts',
  ],

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],

  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  expect: {
    toHaveScreenshot: {
      /* Allow up to 5 % pixel difference for anti-aliasing / font rendering */
      maxDiffPixelRatio: 0.05,
    },
  },

  projects: [
    /* ── Desktop ─────────────────────────────────────────────── */
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /* ── Mobile ──────────────────────────────────────────────── */
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  /* Auto-start Storybook if it isn't already running */
  webServer: {
    command: 'npx storybook dev -p 6006 --ci',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
