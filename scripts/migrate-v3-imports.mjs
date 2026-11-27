#!/usr/bin/env node
/**
 * Rewrites `@waiin/raaghu-react` root imports of components that moved to subpath entries in 3.0.
 *
 *   node node_modules/@waiin/raaghu-react/scripts/migrate-v3-imports.mjs src [--dry]
 *
 * Handles `import { … } from '@waiin/raaghu-react'` and `import type { … }` statements, including
 * `X as Y` aliases. Other syntax (namespace imports, re-exports) is reported for manual review.
 */
import fs from 'node:fs';
import path from 'node:path';

const MOVED = {
  charts: [
    'RdsCompAreaChart', 'RdsCompLineChart', 'RdsCompPieChart', 'RdsCompDoughnutChart', 'RdsCompGaugeChart',
    'RdsCompBarChart', 'RdsCompBooleanChart', 'RdsCompMixedChart', 'RdsCompPolarAreaChart', 'RdsCompRadarChart',
    'RdsCompScatterChart', 'RdsCompStackedChart', 'RdsCompBubbleChart',
    'RdsCompAreaChartProps', 'RdsCompLineProps', 'RdsCompPieProps', 'RdsCompDoughnutProps', 'RdsCompGaugeProps',
    'RdsCompBarChartProps', 'RdsCompBooleanChartProps', 'RdsCompMixedChartProps', 'RdsCompPolarAreaChartProps',
    'RdsCompRadarProps', 'RdsCompScatterChartProps', 'RdsCompStackedProps', 'RdsCompBubbleChartProps',
  ],
  date: [
    'RdsCompDatepicker', 'RdsCompContribution', 'DatePickerStyleType', 'DatePickerLayout',
    'RdsCompDatepickerProps', 'RdsCompContributionProps',
  ],
  editor: ['RdsCompTextEditor', 'RdsCompTextEditorProps'],
  kanban: [
    'RdsCompKanbanBoard', 'RdsCompKanbanBoardProps', 'KanbanBoardInfo', 'KanbanSubCard', 'KanbanAction',
    'KanbanColumn', 'KanbanCard', 'KanbanAssignee', 'KanbanOption',
  ],
  timeline: ['RdsTimeline', 'RdsTimelineProps', 'RdsTimelineItem'],
  video: ['RdsCompVideoPlayer', 'RdsVideoPlayerProps'],
  map: ['RdsCompMap', 'RdsCompMapProps'],
};
const SUBPATH_OF = new Map(Object.entries(MOVED).flatMap(([sub, names]) => names.map((n) => [n, sub])));
const PKG = '@waiin/raaghu-react';
const IMPORT_RE = /import\s+(type\s+)?\{([^}]*)\}\s*from\s*(['"])@waiin\/raaghu-react\3\s*;?/g;
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.mts', '.cts']);

const [target = 'src', ...flags] = process.argv.slice(2);
const dry = flags.includes('--dry');

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXTENSIONS.has(path.extname(entry.name))) yield full;
  }
}

const rewrite = (source) =>
  source.replace(IMPORT_RE, (statement, typeOnly, specifiers, quote) => {
    const groups = new Map();
    for (const raw of specifiers.split(',').map((s) => s.trim()).filter(Boolean)) {
      const name = raw.replace(/^type\s+/, '').split(/\s+as\s+/)[0].trim();
      const sub = SUBPATH_OF.get(name) ?? '';
      groups.set(sub, [...(groups.get(sub) ?? []), raw]);
    }
    if (groups.size === 1 && groups.has('')) return statement;
    const keyword = typeOnly ? 'import type' : 'import';
    return [...groups.entries()]
      .map(([sub, list]) => `${keyword} { ${list.join(', ')} } from ${quote}${sub ? `${PKG}/${sub}` : PKG}${quote};`)
      .join('\n');
  });

let changed = 0;
const manual = [];
const files = fs.statSync(target).isDirectory() ? [...walk(target)] : [target];
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const next = rewrite(source);
  if (/import\s+\*\s+as\s+\w+\s+from\s+['"]@waiin\/raaghu-react['"]|export\s+\*\s+from\s+['"]@waiin\/raaghu-react['"]/.test(source)) manual.push(file);
  if (next !== source) {
    changed += 1;
    if (!dry) fs.writeFileSync(file, next);
    console.log(`${dry ? 'would update' : 'updated'}: ${file}`);
  }
}
console.log(`${changed} file(s) ${dry ? 'need changes' : 'updated'}.`);
if (manual.length) console.log(`Review manually (namespace import or re-export):\n  ${manual.join('\n  ')}`);
