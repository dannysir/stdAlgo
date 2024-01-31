let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split(" ").map(Number);
// let input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");

let N = input.shift();
let max = 30;
let visited = new Array(max);
for (let i = 0; i < visited.length; i++) {
    visited[i] = new Array(max).fill(0);
}
let result = 0;
const DFS = (x, y, cnt, percent) => {
    if (visited[x][y] === 2) {
        result += percent;
        return;
    }
    if (cnt === N) {
        return;
    }
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, -1, 1];

    for (let i = 0; i < dx.length; i++) {
        const nextX = dx[i] + x;
        const nextY = dy[i] + y;
        if (input[i] !== 0) {
            const nextPercent = input[i] * 0.01;
            visited[nextX][nextY]++;
            DFS(nextX, nextY, cnt + 1, percent * nextPercent);
            visited[nextX][nextY]--;
        }
    }
};
visited[14][14] = 1;
DFS(14, 14, 0, 1);
console.log(result);