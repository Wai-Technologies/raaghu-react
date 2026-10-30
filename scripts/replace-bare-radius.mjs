/**
 * Replace bare border-radius px with --rds-border-radius-*.
 * Usage: node scripts/replace-bare-radius.mjs [file...]
 */
import { transformPropsInFile, runOnRoots } from './lib/scss-px-replace.mjs';

const PROP = /^(border-radius|border-top-left-radius|border-top-right-radius|border-bottom-left-radius|border-bottom-right-radius)$/i;

const MAP = new Map([
  ['0px', 'var(--rds-border-radius-none)'],
  ['1px', 'var(--rds-border-radius-xs)'],
  ['2px', 'var(--rds-border-radius-xs)'],
  ['3px', 'var(--rds-border-radius-micro)'],
  ['4px', 'var(--rds-border-radius-sm)'],
  ['6px', 'var(--rds-radius-md)'],
  ['8px', 'var(--rds-border-radius-md)'],
  ['12px', 'var(--rds-border-radius-lg)'],
  ['16px', 'var(--rds-border-radius-xl)'],
  ['24px', 'var(--rds-border-radius-3xl)'],
  ['999px', 'var(--rds-border-radius-full)'],
  ['9999px', 'var(--rds-border-radius-full)'],
]);

runOnRoots((source) => transformPropsInFile(source, PROP, MAP));
