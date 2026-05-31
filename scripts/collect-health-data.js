const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function hasFile(dir, pattern) {
  try { return fs.readdirSync(dir).some(f => f.includes(pattern)); }
  catch { return false; }
}

function fileContains(filePath, str) {
  try { return fs.readFileSync(filePath, 'utf8').includes(str); }
  catch { return false; }
}

const elements = fs.readdirSync(path.join(root, 'raaghu-elements'))
  .filter(d => d.startsWith('rds-') && fs.statSync(path.join(root, 'raaghu-elements', d)).isDirectory())
  .map(d => {
    const dir = path.join(root, 'raaghu-elements', d);
    const storyFile = path.join(dir, `${d}.stories.tsx`);
    const testFile  = path.join(dir, `${d}.test.tsx`);
    const badge = fileContains(storyFile, "'stable'") ? 'stable'
                : fileContains(storyFile, "'beta'")   ? 'beta' : 'none';
    return {
      name: d.replace('rds-', '').split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
      raw: d, type: 'element',
      hasStory: hasFile(dir, '.stories.tsx'),
      hasTest:  hasFile(dir, '.test.tsx'),
      hasAxe:   fileContains(testFile, 'jest-axe'),
      hasPlay:  fileContains(storyFile, 'play:'),
      badge,
      exported: fileContains(path.join(root, 'raaghu-elements/index.ts'), `'./${d.replace('rds-','')}/`),
    };
  });

const indexContent = fs.readFileSync(path.join(root, 'raaghu-components/index.ts'), 'utf8');

const components = fs.readdirSync(path.join(root, 'raaghu-components'))
  .filter(d => d.startsWith('rds-comp-') && fs.statSync(path.join(root, 'raaghu-components', d)).isDirectory())
  .map(d => {
    const dir = path.join(root, 'raaghu-components', d);
    const storyFile = path.join(dir, `${d}.stories.tsx`);
    const testFile  = path.join(dir, `${d}.test.tsx`);
    const badge = fileContains(storyFile, "'stable'") ? 'stable'
                : fileContains(storyFile, "'beta'")   ? 'beta' : 'none';
    const exportLine = indexContent.split('\n').find(l => l.includes(`/${d}/`));
    const isInternal = exportLine ? exportLine.trim().startsWith('//') : true;
    return {
      name: d.replace('rds-comp-', '').split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
      raw: d, type: 'component',
      hasStory: hasFile(dir, '.stories.tsx'),
      hasTest:  hasFile(dir, '.test.tsx'),
      hasAxe:   fileContains(testFile, 'jest-axe'),
      hasPlay:  fileContains(storyFile, 'play:'),
      badge,
      exported: !isInternal,
      internal: isInternal,
    };
  });

const all = [...elements, ...components];
const stats = {
  total: all.length,
  elements: elements.length,
  components: components.length,
  stable:    all.filter(c => c.badge === 'stable').length,
  beta:      all.filter(c => c.badge === 'beta').length,
  withStory: all.filter(c => c.hasStory).length,
  withTest:  all.filter(c => c.hasTest).length,
  withAxe:   all.filter(c => c.hasAxe).length,
  withPlay:  all.filter(c => c.hasPlay).length,
  internal:  components.filter(c => c.internal).length,
  exported:  all.filter(c => c.exported).length,
};

const output = { stats, elements, components, generatedAt: new Date().toISOString() };
const outPath = path.join(root, 'scripts', 'health-data.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log('Health data written to scripts/health-data.json');
console.log(JSON.stringify(stats, null, 2));
