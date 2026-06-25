import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const files = [
  'raaghu-elements/rds-dialog/rds-dialog.stories.tsx',
  'raaghu-elements/rds-menu/rds-menu.stories.tsx',
  'raaghu-elements/rds-pagination/rds-pagination.stories.tsx',
  'raaghu-elements/rds-header/rds-header.stories.tsx',
  'raaghu-elements/rds-search/rds-search.stories.tsx',
  'raaghu-elements/rds-popover/rds-popover.stories.tsx',
  'raaghu-elements/rds-table/rds-table.stories.tsx',
  'raaghu-elements/rds-radio/rds-radio.stories.tsx',
  'raaghu-elements/rds-list/rds-list.stories.tsx',
];

function countExports(content) {
  return (content.match(/^export const/gm) || []).length;
}

for (const rel of files) {
  const cur = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const head = execSync(`git show HEAD:${rel}`, { cwd: ROOT, encoding: 'utf8' });
  const before = countExports(head);
  const after = countExports(cur);
  console.log(`${rel}: ${before === after ? 'ok' : 'MISMATCH'} (${before} -> ${after})`);
}
