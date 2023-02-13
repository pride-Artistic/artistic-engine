const fs = require('fs');
const path = require('path');

fs.rmSync(path.join(__dirname, '../dist'), { recursive: true, force: true });

console.log('build files cleaned.\n');

module.exports = 0;
