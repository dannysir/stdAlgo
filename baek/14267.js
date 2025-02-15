let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
input = input.map(v => v.split(' ').map(Number));
const connections = input.shift();
const scores = input.slice(0,M);

// 연결된 자식 노드들
const tree = Array.from({length: N + 1}, _ => []);
let boss = null;
connections.forEach((value, index) => {
    if (value !== -1) {
        tree[value].push(index + 1);
    } else {
        boss = index + 1;
    }
});

const dp = Array(N + 1).fill(0);

scores.forEach(v => {
    const [now, value] = v;
    dp[now] += value;
});

const dfs = (now, value) => {
    dp[now] = value;

    for (const next of tree[now]) {
        dfs(next, value + dp[next]);
    }
};
dfs(boss, 0);


console.log(dp.slice(1,N + 1).join(' '));