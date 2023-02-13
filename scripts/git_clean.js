const child_process = require('child_process');

child_process.spawnSync("git", ["switch", "develop"], { encoding : 'utf8' });
child_process.spawnSync("git", ["fetch", "--prune", "--all"], { encoding : 'utf8' });
const child = child_process.spawnSync("git", ["branch", "-v"], { encoding : 'utf8' });
if(child.error) {
    console.log("ERROR: ",child.error);
}
const branches = child.stdout.split(/[\r\n]/).filter(s => s.includes(" [gone] "));
for (const branch of branches) {
    child_process.spawnSync("git", ["branch", "--delete", branch.trim().split(/\s+/)[0]], { encoding : 'utf8' });
}

