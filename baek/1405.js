let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split(" ").map(v => parseInt(v));
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const Num = input.shift();
input = input.map(v => v * 0.01);
let visited = new Array(30).fill(0);
for (let i = 0; i < visited.length; i++) {
    visited[i] = new Array(30).fill(0);
}
let result = 0;
const dx = [1, -1, 0, 0];
const dy = [0, 0, -1, 1];

const Dfs = (x, y, cnt, percent) => {
    if (visited[x][y] === 2) {
        result += percent;
        return;
    }
    if (cnt === Num) {
        return;
    }
    for (let i = 0; i < dx.length; i++) {
        let nextX = x + dx[i];
        let nextY = y + dy[i];
        if (input[i] !== 0) {
            visited[nextX][nextY] ++;
            Dfs(nextX, nextY, cnt + 1, percent * input[i]);
            visited[nextX][nextY] --;
        }
    }
};
visited[14][14] = 1;
Dfs(14, 14, 0, 1);
console.log(1 - result);
