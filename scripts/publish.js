const fs = require('fs');
const cp = require("child_process");
const path = require('path');

const dist_dir = path.join(__dirname, '../dist');

const metaFiles = ['package.json', 'LICENSE', 'README.md'];

for (const file of metaFiles) {
    fs.copyFileSync(path.join(__dirname, '../', file), path.join(dist_dir, file));
}

