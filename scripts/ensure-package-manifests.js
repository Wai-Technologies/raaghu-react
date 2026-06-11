const fs = require('node:fs');
const path = require('node:path');

const rootDir = process.cwd();

function ensureMuiIconsMaterialPackageJson() {
  const pkgDir = path.join(rootDir, 'node_modules', '@mui', 'icons-material');
  const pkgJsonPath = path.join(pkgDir, 'package.json');

  if (!fs.existsSync(pkgDir) || fs.existsSync(pkgJsonPath)) {
    return;
  }

  const pkgJson = {
    name: '@mui/icons-material',
    version: '7.3.11',
    description: 'Material Design icons distributed as Material UI React components.',
    license: 'MIT',
    sideEffects: false,
    type: 'commonjs',
    main: './index.js',
    types: './index.d.ts',
    module: './esm/index.js',
    exports: {
      './package.json': './package.json',
      '.': {
        require: {
          default: './index.js',
          types: './index.d.ts'
        },
        default: {
          default: './esm/index.js',
          types: './esm/index.d.ts'
        }
      },
      './*': {
        require: {
          default: './*.js',
          types: './*.d.ts'
        },
        default: {
          default: './esm/*.js',
          types: './esm/*.d.ts'
        }
      }
    },
    peerDependencies: {
      '@mui/material': '^7.3.11',
      react: '^17.0.0 || ^18.0.0 || ^19.0.0'
    },
    peerDependenciesMeta: {
      '@types/react': {
        optional: true
      }
    }
  };

  fs.writeFileSync(pkgJsonPath, `${JSON.stringify(pkgJson, null, 2)}\n`, 'utf8');
  console.log('Repaired missing package manifest at node_modules/@mui/icons-material/package.json');
}

ensureMuiIconsMaterialPackageJson();
