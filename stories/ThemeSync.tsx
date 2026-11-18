import { useEffect } from 'react';
import { reapplyStorybookTheme } from '../.storybook/storybook-theme-sync';

/**
 * Keeps docs pages (e.g. Introduction) in sync with the Storybook theme toolbar.
 *
 * Theme resolution (light / dark / system → OS preference) is owned by
 * `.storybook/storybook-theme-sync.ts`. This component only asks it to
 * re-apply the selected theme once the docs page has mounted, instead of
 * guessing from the iframe URL (which ignores 'system' and toolbar changes).
 */
export default function ThemeSync() {
  useEffect(() => {
    reapplyStorybookTheme();
  }, []);

  return null;
}
