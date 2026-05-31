#!/usr/bin/env node
// @ts-check
/**
 * Raaghu Design System — Health Check
 * Run: npm run health:check
 *
 * Scans every element and component and prints a terminal report
 * showing coverage, missing files, and items needing attention.
 */

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// ─── Helpers ────────────────────────────────────────────────────────────────

function hasFile(dir, pattern) {
  try { return fs.readdirSync(dir).some(f => f.includes(pattern)); }
  catch { return false; }
}

function fileContains(filePath, str) {
  try { return fs.readFileSync(filePath, 'utf8').includes(str); }
  catch { return false; }
}

function pct(n, d) {
  return d === 0 ? '–' : `${Math.round((n / d) * 100)}%`;
}

function bar(n, d, width = 20) {
  const filled = d === 0 ? 0 : Math.round((n / d) * width);
  const color = n === d ? chalk.green : n / d >= 0.9 ? chalk.yellow : chalk.red;
  return color('█'.repeat(filled)) + chalk.gray('░'.repeat(width - filled));
}

function tick(val) {
  return val ? chalk.green('✔') : chalk.red('✘');
}

function badge(b) {
  if (b === 'stable')      return chalk.bgGreen.white(' stable ');
  if (b === 'beta')        return chalk.bgYellow.black(' beta   ');
  if (b === 'experimental') return chalk.bgRed.white(' exp    ');
  return chalk.bgGray.white(' none   ');
}

// ─── Collect data ────────────────────────────────────────────────────────────

function collect(baseDir, prefix) {
  return fs.readdirSync(path.join(root, baseDir))
    .filter(d => d.startsWith(prefix) &&
      fs.statSync(path.join(root, baseDir, d)).isDirectory())
    .map(d => {
      const dir       = path.join(root, baseDir, d);
      const storyFile = path.join(dir, `${d}.stories.tsx`);
      const testFile  = path.join(dir, `${d}.test.tsx`);
      const tsxFile   = path.join(dir, `${d}.tsx`);
      const scssFile  = path.join(dir, `${d}.scss`);

      const badgeVal = fileContains(storyFile, "'stable'")      ? 'stable'
                     : fileContains(storyFile, "'beta'")         ? 'beta'
                     : fileContains(storyFile, "'experimental'") ? 'experimental'
                     : 'none';

      return {
        id:       d,
        name:     d.replace(/^rds-(comp-)?/, '').split('-')
                   .map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
        hasTs:    fs.existsSync(tsxFile),
        hasScss:  fs.existsSync(scssFile),
        hasStory: hasFile(dir, '.stories.tsx'),
        hasTest:  hasFile(dir, '.test.tsx'),
        hasAxe:   fileContains(testFile, 'jest-axe'),
        hasPlay:  fileContains(storyFile, 'play:'),
        badge:    badgeVal,
      };
    });
}

const elements   = collect('raaghu-elements',   'rds-');
const components = collect('raaghu-components', 'rds-comp-');
const all        = [...elements, ...components];

// Index file exported check
const elIndex   = fs.readFileSync(path.join(root, 'raaghu-elements/index.ts'),   'utf8');
const compIndex = fs.readFileSync(path.join(root, 'raaghu-components/index.ts'), 'utf8');

elements.forEach(e => {
  e.exported = elIndex.split('\n').some(l => l.includes(`/${e.id}/`) && !l.trim().startsWith('//'));
});
components.forEach(c => {
  const line = compIndex.split('\n').find(l => l.includes(`/${c.id}/`));
  c.exported = !!line && !line.trim().startsWith('//');
  c.internal = !!line && line.trim().startsWith('//');
});

// ─── Issues list ─────────────────────────────────────────────────────────────

const issues = [];
for (const item of all) {
  if (!item.hasStory) issues.push({ sev: 'error',   item, msg: 'Missing story file' });
  if (!item.hasTest)  issues.push({ sev: 'error',   item, msg: 'Missing test file' });
  if (!item.hasAxe)   issues.push({ sev: 'warning', item, msg: 'No jest-axe test' });
  if (!item.hasPlay)  issues.push({ sev: 'warning', item, msg: 'No play function in story' });
  if (item.badge === 'none') issues.push({ sev: 'info', item, msg: 'No maturity badge (stable/beta)' });
}

// ─── Stats ───────────────────────────────────────────────────────────────────

const stats = {
  total:     all.length,
  elements:  elements.length,
  components:components.length,
  stable:    all.filter(c => c.badge === 'stable').length,
  beta:      all.filter(c => c.badge === 'beta').length,
  withStory: all.filter(c => c.hasStory).length,
  withTest:  all.filter(c => c.hasTest).length,
  withAxe:   all.filter(c => c.hasAxe).length,
  withPlay:  all.filter(c => c.hasPlay).length,
  exported:  [...elements.filter(e => e.exported), ...components.filter(c => c.exported)].length,
  internal:  components.filter(c => c.internal).length,
  errors:    issues.filter(i => i.sev === 'error').length,
  warnings:  issues.filter(i => i.sev === 'warning').length,
};

// ─── Output ──────────────────────────────────────────────────────────────────

const W = 68;
const line  = chalk.gray('─'.repeat(W));
const dline = chalk.gray('═'.repeat(W));

console.log('\n' + dline);
console.log(chalk.bold.cyan('  RAAGHU DESIGN SYSTEM — HEALTH CHECK') +
  chalk.gray('  ' + new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })));
console.log(dline);

// Summary row
console.log(
  `\n  ${chalk.bold(stats.total)} components total  ` +
  `${chalk.bold(stats.elements)} elements · ` +
  `${chalk.bold(stats.components)} components · ` +
  `${chalk.bold(stats.internal)} internal\n`
);

// Maturity
console.log(`  ${chalk.green('●')} Stable       ${chalk.bold(stats.stable).padStart(3)}  ${bar(stats.stable, stats.total)}  ${pct(stats.stable, stats.total)}`);
console.log(`  ${chalk.yellow('●')} Beta         ${chalk.bold(stats.beta).padStart(3)}  ${bar(stats.beta, stats.total)}  ${pct(stats.beta, stats.total)}`);
console.log();

// Coverage
console.log(chalk.bold('  COVERAGE'));
console.log(line);
console.log(`  Stories       ${String(stats.withStory).padStart(3)}/${stats.total}  ${bar(stats.withStory, stats.total)}  ${pct(stats.withStory, stats.total)}`);
console.log(`  Unit Tests    ${String(stats.withTest).padStart(3)}/${stats.total}  ${bar(stats.withTest, stats.total)}  ${pct(stats.withTest, stats.total)}`);
console.log(`  Axe A11y      ${String(stats.withAxe).padStart(3)}/${stats.total}  ${bar(stats.withAxe, stats.total)}  ${pct(stats.withAxe, stats.total)}`);
console.log(`  Play Funcs    ${String(stats.withPlay).padStart(3)}/${stats.total}  ${bar(stats.withPlay, stats.total)}  ${pct(stats.withPlay, stats.total)}`);
console.log();

// Component table
console.log(chalk.bold('  ELEMENTS'));
console.log(line);
console.log(`  ${'Name'.padEnd(28)} ${'Badge'.padEnd(10)} Story Test  Axe  Play`);
console.log(line);
for (const e of elements) {
  console.log(
    `  ${e.name.padEnd(28)} ${badge(e.badge)}  ${tick(e.hasStory)}     ${tick(e.hasTest)}    ${tick(e.hasAxe)}    ${tick(e.hasPlay)}`
  );
}
console.log();

console.log(chalk.bold('  COMPONENTS'));
console.log(line);
console.log(`  ${'Name'.padEnd(28)} ${'Badge'.padEnd(10)} Story Test  Axe  Play API`);
console.log(line);
for (const c of components) {
  const api = c.internal
    ? chalk.gray(' internal')
    : c.exported ? chalk.green(' public  ') : chalk.red(' missing ');
  console.log(
    `  ${c.name.padEnd(28)} ${badge(c.badge)}  ${tick(c.hasStory)}     ${tick(c.hasTest)}    ${tick(c.hasAxe)}    ${tick(c.hasPlay)} ${api}`
  );
}
console.log();

// Issues
if (issues.length === 0) {
  console.log(chalk.green.bold('  ✔ No issues found — design system is healthy!'));
} else {
  const errors   = issues.filter(i => i.sev === 'error');
  const warnings = issues.filter(i => i.sev === 'warning');
  const infos    = issues.filter(i => i.sev === 'info');

  console.log(chalk.bold('  ISSUES'));
  console.log(line);

  if (errors.length) {
    console.log(chalk.red.bold(`\n  ✘ Errors (${errors.length}):`));
    for (const { item, msg } of errors) {
      console.log(`    ${chalk.red('✘')} ${item.name.padEnd(30)} ${chalk.red(msg)}`);
    }
  }
  if (warnings.length) {
    console.log(chalk.yellow.bold(`\n  ⚠ Warnings (${warnings.length}):`));
    for (const { item, msg } of warnings) {
      console.log(`    ${chalk.yellow('⚠')} ${item.name.padEnd(30)} ${chalk.yellow(msg)}`);
    }
  }
  if (infos.length) {
    console.log(chalk.blue.bold(`\n  ℹ Info (${infos.length}):`));
    for (const { item, msg } of infos) {
      console.log(`    ${chalk.blue('ℹ')} ${item.name.padEnd(30)} ${chalk.blue(msg)}`);
    }
  }
}

console.log('\n' + dline);

// Exit with error code if there are errors
if (stats.errors > 0) {
  console.log(chalk.red(`\n  ${stats.errors} error(s) found. Fix before shipping.\n`));
  process.exit(1);
} else if (stats.warnings > 0) {
  console.log(chalk.yellow(`\n  ${stats.warnings} warning(s). Review before shipping.\n`));
} else {
  console.log(chalk.green(`\n  All checks passed.\n`));
}
