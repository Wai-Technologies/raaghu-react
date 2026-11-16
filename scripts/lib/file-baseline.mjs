import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const REPO_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

const toRel = (file) => path.relative(REPO_ROOT, path.resolve(REPO_ROOT, file)).split(path.sep).join('/');

function readBaseline(baselineFile) {
  const counts = new Map();
  if (!fs.existsSync(baselineFile)) return counts;
  for (const line of fs.readFileSync(baselineFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^(\d+)\t(.+)$/);
    if (m) counts.set(m[2], Number(m[1]));
  }
  return counts;
}

export function checkFileBaseline({ label, baselineFile, counts, script, fix }) {
  const current = new Map();
  for (const [file, count] of counts) {
    const key = toRel(file);
    if (count > 0) current.set(key, (current.get(key) ?? 0) + count);
  }
  const total = [...current.values()].reduce((a, b) => a + b, 0);
  const rel = path.relative(REPO_ROOT, baselineFile).split(path.sep).join('/');

  if (process.argv.includes('--set-baseline')) {
    const lines = [...current].sort(([a], [b]) => a.localeCompare(b)).map(([f, c]) => `${c}\t${f}`);
    fs.writeFileSync(baselineFile, lines.length ? `${lines.join('\n')}\n` : '', 'utf8');
    console.log(`  Wrote per-file baseline (${total} in ${current.size} files) -> ${rel}`);
    process.exit(0);
  }

  const baseline = readBaseline(baselineFile);
  const baselineTotal = [...baseline.values()].reduce((a, b) => a + b, 0);
  const files = new Set([...current.keys(), ...baseline.keys()]);
  const increased = [];
  const decreased = [];
  for (const f of [...files].sort()) {
    const now = current.get(f) ?? 0;
    const was = baseline.get(f) ?? 0;
    if (now > was) increased.push(`  ${f}: ${was} -> ${now}`);
    else if (now < was) decreased.push(`  ${f}: ${was} -> ${now}`);
  }

  console.log(`${label} scan complete`);
  console.log(`  Current  : ${total}`);
  console.log(`  Baseline : ${baselineTotal}`);

  if (increased.length) {
    console.error(`\nFAIL: ${label} increased in ${increased.length} file(s):`);
    increased.forEach((l) => console.error(l));
    if (fix) console.error(`\nFix: ${fix}`);
    process.exit(1);
  }
  if (decreased.length) {
    console.error(`\nFAIL: ${label} went down in ${decreased.length} file(s). Lock in the progress:`);
    decreased.forEach((l) => console.error(l));
    console.error(`\nRun: node ${script} --set-baseline`);
    process.exit(1);
  }
  console.log(`\nPASS: ${label} matches the per-file baseline (${total})`);
  process.exit(0);
}
