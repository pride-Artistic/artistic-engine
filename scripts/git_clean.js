const { spawnSync } = require('child_process');

spawnSync("git", ["switch", "develop"], { encoding : 'utf8' });
spawnSync("git", ["pull"], { encoding : 'utf8' });
spawnSync("git", ["fetch", "--prune", "--all"], { encoding : 'utf8' });
const child = spawnSync("git", ["branch", "-v"], { encoding : 'utf8' });
if(child.error) {
    console.log("ERROR: ",child.error);
}
const branches = child.stdout.split(/[\r\n]/).filter(s => s.includes(" [gone] "));
for (const branch of branches) {
    spawnSync("git", ["branch", "--delete", branch.trim().split(/\s+/)[0]], { encoding : 'utf8' });
}

console.log(spawnSync("git", ["branch", "-vv", "-a"], { encoding : 'utf8' }).stdout);
module.exports = 0;
