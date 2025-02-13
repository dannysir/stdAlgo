let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = Number(input.shift());
input = input.map(v => v.split(' ').map(Number));

const trees = Array.from({length: N + 1}, _ => []);
const visited = Array(N + 1).fill(false);
input.forEach(v => {
    const [start, end, weight] = v;
    trees[start].push([end, weight]);
    trees[end].push([start, weight]);
});

let max = 0;
let current = 0;
const dfs = (now, weight) => {
    if (max < weight) {
        current = now;
        max = weight;
    }

    for (let i = 0; i < trees[now].length; i++) {
        const [next, nextWeight] = trees[now][i];
        if (!visited[next]) {
            visited[next] = true;
            dfs(next, weight + nextWeight);
            visited[next] = false;
        }
    }

};
visited[1] = true;
dfs(1, 0);
visited.fill(false);
visited[current] = true;
dfs(current, 0);
console.log(max);
