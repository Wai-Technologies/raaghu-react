#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Starting dependency cleanup and modernization...\n');

// Function to run commands safely
function runCommand(command, cwd = process.cwd()) {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { 
      cwd, 
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'development' }
    });
    return true;
  } catch (error) {
    console.error(`❌ Failed to run: ${command}`);
    console.error(error.message);
    return false;
  }
}

// Function to update package.json overrides to resolve deprecation warnings
function addPackageOverrides() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Add overrides to force modern versions of problematic packages
  packageJson.overrides = {
    ...packageJson.overrides,
    "glob": "^11.0.0",
    "rimraf": "^6.0.1",
    "@humanwhocodes/object-schema": "$@eslint/object-schema",
    "@humanwhocodes/config-array": "$@eslint/config-array",
    "sourcemap-codec": "$@jridgewell/sourcemap-codec",
    "svgo": "^3.3.2",
    "workbox-google-analytics": "^7.3.0",
    "workbox-cacheable-response": "^7.3.0",
    "workbox-background-sync": "^7.3.0",
    "lodash.isequal": false,
    "lodash.get": false,
    "inflight": false,
    "domexception": false,
    "w3c-hr-time": false,
    "node-domexception": false,
    "abab": false,
    "q": false,
    "stable": false
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Added package overrides to resolve deprecated dependencies\n');
}

// Main execution
async function main() {
  try {
    // Add package overrides first
    addPackageOverrides();

    // Clean npm cache
    console.log('🧹 Cleaning npm cache...');
    runCommand('npm cache clean --force');

    // Remove node_modules and package-lock.json for clean reinstall
    console.log('🗑️  Removing node_modules and package-lock.json...');
    if (fs.existsSync('node_modules')) {
      runCommand('rmdir /s /q node_modules', process.cwd());
    }
    if (fs.existsSync('package-lock.json')) {
      fs.unlinkSync('package-lock.json');
    }

    // Clean workspaces
    const workspaces = ['raaghu-elements', 'raaghu-components', 'raaghu-layouts', 'raaghu-pages', 'raaghu-react-themes'];
    for (const workspace of workspaces) {
      const workspacePath = path.join(process.cwd(), workspace);
      if (fs.existsSync(workspacePath)) {
        console.log(`🧹 Cleaning ${workspace}...`);
        const nodeModules = path.join(workspacePath, 'node_modules');
        const packageLock = path.join(workspacePath, 'package-lock.json');
        
        if (fs.existsSync(nodeModules)) {
          runCommand(`rmdir /s /q node_modules`, workspacePath);
        }
        if (fs.existsSync(packageLock)) {
          fs.unlinkSync(packageLock);
        }
      }
    }

    // Reinstall dependencies
    console.log('📦 Installing dependencies...');
    if (runCommand('npm install')) {
      console.log('✅ Dependencies installed successfully!\n');
      
      // Run audit to check for vulnerabilities
      console.log('🔍 Running security audit...');
      runCommand('npm audit --audit-level moderate');
      
      console.log('\n✅ Dependency modernization completed!');
      console.log('\n📋 Summary of changes:');
      console.log('- ✅ Updated ESLint to v9 with new flat config');
      console.log('- ✅ Replaced rollup-plugin-terser with @rollup/plugin-terser');
      console.log('- ✅ Removed react-beautiful-dnd (see MIGRATION-DND.md)');
      console.log('- ✅ Added package overrides to force modern versions');
      console.log('- ✅ Updated TypeScript ESLint plugins');
      console.log('- ✅ Added modern alternatives for deprecated packages');
      console.log('\n⚠️  Please review MIGRATION-DND.md for react-beautiful-dnd migration');
    } else {
      console.error('❌ Failed to install dependencies');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error during dependency modernization:', error);
    process.exit(1);
  }
}

main();
