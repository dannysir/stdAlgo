let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
input = input.map(v => v.split(' ').map(Number));
const [N] = input.shift();
const population = input.shift()

const lines = Array.from({length: N + 1}, _ => []);

input.forEach(([from, to]) => {
    lines[from].push(to);
    lines[to].push(from);
});

// dp[i][0] : i번 도시가 우수
// dp[i][1] : i번 도시가 우수 X
const dp = Array.from({length: N + 1}, _ => Array(2).fill(-1));

const dfs = (now, parent) => {
    if (dp[now][0] !== -1) {
        return;
    }
    dp[now][0] = population[now - 1];
    dp[now][1] = 0;

    for (const next of lines[now]) {
        if (next === parent) continue;

        dfs(next, now);

        dp[now][0] += dp[next][1];
        dp[now][1] += Math.max(...dp[next]);
    }
};

dfs(1, 0);

console.log(Math.max(...dp.flat(1)));

// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// // let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
// input = input.map(v => v.split(' ').map(Number));
// const [N] = input.shift();
// const population = input.shift()
//
// const lines = Array.from({length: N + 1}, _ => []);
//
// input.forEach(([from, to]) => {
//     lines[from].push(to);
//     lines[to].push(from);
// });
//
// // dp[i][0] : i번 도시가 우수
// // dp[i][1] : i번 도시가 우수 X
// const dp = Array.from({length: N + 1}, _ => Array(2).fill(-1));
//
// const dfs = (now, parent) => {
//     if (dp[now][0] !== -1) {
//         return;
//     }
//     dp[now][0] = population[now - 1]; // 현재 도시가 우수인 경우
//     dp[now][1] = 0; // 현재 도시가 우수가 아닌 경우
//     // 자식 노드들 처리
//     for (const child of lines[now]) {
//         if (child === parent) continue; // 부모로 돌아가는 것 방지
//
//         dfs(child, now);
//
//         // 현재 도시가 우수인 경우: 자식들은 모두 우수가 아니어야 함
//         dp[now][0] += dp[child][1];
//
//         // 현재 도시가 우수가 아닌 경우: 자식은 우수이거나 아니거나 중 최댓값
//         dp[now][1] += Math.max(dp[child][0], dp[child][1]);
//     }
//
// };
//
// dfs(1, 0);
// console.log(Math.max(...dp.flat(1)));