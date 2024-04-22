let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, M] = input.shift().split(' ').map(Number);
const Names = input.map(Number);

let dp = new Array(N).fill(Infinity);
dp[N - 1] = 0;

const DFS = (idx) => {
    if (dp[idx] < Infinity) {
        return dp[idx];
    }

    let remain = M - Names[idx];

    for (let i = idx + 1; i <= N; i++) {
        if (remain < 0) break;
        if (i === N) {
            dp[idx] = 0;
            break;
        }
        dp[idx] = Math.min(dp[idx], remain * remain + DFS(i));
        remain -= Names[i] + 1;
    }
    return dp[idx];
};

console.log(DFS(0));