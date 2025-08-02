const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
let versionIncrement = 'patch'; // Default to patch

if (args.length > 0) {
    if (args.includes('--major')) {
        versionIncrement = 'major';
    } else if (args.includes('--minor')) {
        versionIncrement = 'minor';
    } else if (args.includes('--patch')) {
        versionIncrement = 'patch';
    } else {
        const versionIndex = args.indexOf('--version');
        if (versionIndex !== -1 && args[versionIndex + 1]) {
            versionIncrement = args[versionIndex + 1];
        }
    }
}

try {
    console.log(`Bumping version with: ${versionIncrement}`);
    execSync(`npm version ${versionIncrement} --no-git-tag-version`);

    console.log('Publishing to VS Code Marketplace...');
    execSync('vsce publish', { stdio: 'inherit' });

    const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'));
    console.log(`Successfully published version ${packageJson.version}!`);

} catch (error) {
    console.error('Failed to publish extension:', error.message);
    process.exit(1);
}
