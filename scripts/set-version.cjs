const fs = require('fs');
const path = require('path');

const targetVersion = process.argv[2];

if (!targetVersion) {
    console.error('Usage: node scripts/set-version.js <version>');
    process.exit(1);
}

const packages = [
    'package.json',
    'packages/core/package.json',
    'packages/browser/package.json',
    'packages/react/package.json',
    'packages/vue/package.json',
    'packages/svelte/package.json',
    'packages/next/package.json',
];

const docs = [
    'docs/v4/index.md',
    'docs/v4/platform/htmx.md'
];

console.log(`Setting version to ${targetVersion}...`);

// Update packages
packages.forEach(pkgPath => {
    const fullPath = path.resolve(__dirname, '..', pkgPath);
    if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const json = JSON.parse(content);
        json.version = targetVersion;
        fs.writeFileSync(fullPath, JSON.stringify(json, null, 2) + '\n'); // Maintain formatting
        console.log(`Updated ${pkgPath}`);
    } else {
        console.warn(`Skipped ${pkgPath} (not found)`);
    }
});

// Update docs
const indexMdPath = path.resolve(__dirname, '..', 'docs/v4/index.md');
if (fs.existsSync(indexMdPath)) {
    let content = fs.readFileSync(indexMdPath, 'utf8');
    // Update "## v4.x.x Technical Specifications"
    content = content.replace(/## v\d+\.\d+\.\d+ Technical Specifications/, `## v${targetVersion} Technical Specifications`);
    fs.writeFileSync(indexMdPath, content);
    console.log('Updated docs/v4/index.md');
}

const htmxMdPath = path.resolve(__dirname, '..', 'docs/v4/platform/htmx.md');
if (fs.existsSync(htmxMdPath)) {
    let content = fs.readFileSync(htmxMdPath, 'utf8');
    // Update CDN links
    const regex = /@ctrovalidate\/browser@\d+\.\d+\.\d+/g;
    content = content.replace(regex, `@ctrovalidate/browser@${targetVersion}`);
    fs.writeFileSync(htmxMdPath, content);
    console.log('Updated docs/v4/platform/htmx.md');
}

console.log('Done!');
