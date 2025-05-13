 let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
input = input.map(v => v.split(' ').map(Number));

const trees = {};

input.forEach((arr) => {
    const node = arr.shift();
    arr.pop();
    let idx = 0;
    while (arr.length > idx) {
        const [end, depth] = [arr[idx], arr[idx + 1]];

        if (trees[node - 1]) {
            trees[node - 1].push([end - 1, depth]);
        } else {
            trees[node - 1] = [[end - 1, depth]];
        }

        idx += 2;
    }
});
let max = {node: 0, depth: -1};

const dfs = (now, depth, visited) => {
    visited[now] = true;
    if (depth > max.depth) {
        max.node = now;
        max.depth = depth;
    }

    for (const [next, cost] of trees[now]) {
        if (!visited[next]) {
            dfs(next, cost + depth, visited);
        }
    }
}

const visited = Array(N).fill(false);
dfs(0, 0, visited);
visited.fill(false);
dfs(max.node, 0, visited);

console.log(max.depth);