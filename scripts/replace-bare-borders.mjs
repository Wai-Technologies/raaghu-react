/**
 * Replace bare border/outline px widths with --rds-border-width-*.
 * Usage: node scripts/replace-bare-borders.mjs [file...]
 */
import { transformPropsInFile, runOnRoots } from './lib/scss-px-replace.mjs';

const PROP = /^(border|outline)(-width|-top|-right|-bottom|-left|-block|-inline)?(-width)?$/i;

const MAP = new Map([
  ['0px', 'var(--rds-border-width-none)'],
  ['0.5px', 'var(--rds-border-width-hairline)'],
  ['1px', 'var(--rds-border-width-thin)'],
  ['1.5px', 'var(--rds-border-width-emphasis)'],
  ['2px', 'var(--rds-border-width-medium)'],
  ['2.5px', 'var(--rds-border-width-bold)'],
  ['3px', 'var(--rds-border-width-thick)'],
  ['4px', 'var(--rds-border-width-heavy)'],
]);

runOnRoots((source) => transformPropsInFile(source, PROP, MAP));
