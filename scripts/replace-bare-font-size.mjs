/**
 * Replace bare font-size px with --rds-font-size-*.
 * Usage: node scripts/replace-bare-font-size.mjs [file...]
 */
import { transformPropsInFile, runOnRoots } from './lib/scss-px-replace.mjs';

const PROP = /^font-size$/i;

const MAP = new Map([
  ['9px', 'var(--rds-font-size-xs)'],
  ['10px', 'var(--rds-font-size-xs)'],
  ['11px', 'var(--rds-font-size-xs)'],
  ['12px', 'var(--rds-font-size-xs)'],
  ['13px', 'var(--rds-font-size-sm)'],
  ['14px', 'var(--rds-font-size-sm)'],
  ['15px', 'var(--rds-font-size-md)'],
  ['16px', 'var(--rds-font-size-md)'],
  ['18px', 'var(--rds-font-size-lg)'],
  ['20px', 'var(--rds-font-size-xl)'],
  ['22px', 'var(--rds-font-size-xl)'],
  ['24px', 'var(--rds-font-size-2xl)'],
  ['30px', 'var(--rds-font-size-3xl)'],
  ['32px', 'var(--rds-font-size-3xl)'],
  ['36px', 'var(--rds-font-size-4xl)'],
  ['48px', 'var(--rds-font-size-5xl)'],
]);

runOnRoots((source) => transformPropsInFile(source, PROP, MAP));
