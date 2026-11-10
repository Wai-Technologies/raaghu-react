import { readFileSync } from 'fs';
import { join } from 'path';
import { extendedBreakpointTokens } from './design-tokens';

const scssBreakpoints = (): Record<string, string> => {
  const source = readFileSync(join(__dirname, '_breakpoints.scss'), 'utf8');
  const map = source.match(/\$rds-breakpoints:\s*\(([\s\S]*?)\);/)?.[1] ?? '';
  return Object.fromEntries([...map.matchAll(/([\w-]+):\s*([\d.]+px)/g)].map(([, key, value]) => [key, value]));
};

describe('breakpoint token parity', () => {
  it('keeps _breakpoints.scss and extendedBreakpointTokens identical', () => {
    const scss = scssBreakpoints();
    expect(Object.keys(scss).length).toBeGreaterThan(0);
    expect(scss).toEqual({ ...extendedBreakpointTokens });
  });
});
