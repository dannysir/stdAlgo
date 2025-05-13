let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const boards = input.map(v => v.split(' ').map(Number));

const dp = Array.from({length: N}, _ => Array(M).fill(-1));
const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
let answer = 0;

dp[N - 1][M - 1] = 1;

const dfs = (x, y) => {
    if (x === N - 1 && y === M - 1) {
        return dp[x][y];
    }

    if (dp[x][y] !== -1) {
        return dp[x][y];
    }

    let cnt = 0;

    for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

        if (boards[nx][ny] < boards[x][y]) {
            cnt += dfs(nx, ny);
        }
    }
    dp[x][y] = cnt;
    return cnt;
};

console.log(dfs(0, 0));