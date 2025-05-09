let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
const [targetA, targetB] = input.shift().split(' ').map(Number);
const M = +input.shift();
const treesInput = input.map(v => v.split(' ').map(Number));

const visited = Array.from({length: N}, _ => Infinity);
const trees = Array.from({length: N}, _ => []);

treesInput.forEach(v => {
    const [start, end] = v;
    trees[start - 1].push(end - 1);
    trees[end - 1].push(start - 1);
});

const dfs = (now, time) => {
    if (visited[now] <= time) {
        return;
    }

    visited[now] = time;

    for (let i = 0; i < trees[now].length; i++) {
        const next = trees[now][i];
        if (visited[next] > time + 1) {
            dfs(next, time + 1);
        }
    }
}

dfs(targetA - 1, 0);
console.log(visited[targetB - 1] === Infinity ? -1 : visited[targetB - 1]);