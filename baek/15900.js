let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = input.shift() * 1;
const trees = Array.from({length: N + 1}, _ => new Array());
const visited = Array(N + 1).fill(false);
input = input.map(v => v.split(' ').map(Number));

input.forEach(v => {
    const [start, end] = v;
    trees[start].push(end);
    trees[end].push(start);
});

let answer = 0;
const dfs = (now, depth) => {
    if (now !== 1 && trees[now].length === 1) {
        if (depth % 2 === 1) {
            answer += 1;
        }
        return;
    }

    visited[now] = true;

    for (const next of trees[now]) {
        if (!visited[next]) {
            dfs(next, depth + 1);
        }
    }
};

dfs(1, 0);

console.log(answer % 2 === 1 ? 'Yes' : 'No');