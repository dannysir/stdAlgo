let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = Number(input.shift());
input = input.map(v => v.split(' ').map(Number));
const trees = Array.from({length: N + 1}, _ => []);
const visited = Array(N + 1).fill(false);

input.forEach(v => {
    const [start, end] = v;
    trees[start].push(end);
    trees[end].push(start);
});

const dp = Array.from({length: N + 1}, _ => [0, 1]);

const dfs = (now) => {
    visited[now] = true;

    for (const next of trees[now]) {
        if (!visited[next]) {
            dfs(next);
            dp[now][0] += dp[next][1];
            dp[now][1] += Math.min(dp[next][0], dp[next][1]);
        }
    }
};

dfs(1);
console.log(Math.min(dp[1][0], dp[1][1]));