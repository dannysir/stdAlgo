let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, M] = input.shift().split(' ').map(Number);
const MAP = input.map(v => v.split(' ').map(Number));
let visited = Array.from({length: N}, _ => Array.from({length: M}, _ => false));
let maxValue = 0;
MAP.forEach(v => {
    maxValue = Math.max(maxValue, ...v);
});
let max = 0;
const DFS = (now, cnt, value) => {
    if (value + (4 - cnt) * maxValue < max) return;
    if (cnt === 4) {
        max = Math.max(max, value);
        return;
    }

    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (const dir of dirs) {
        const NextX = now[0] + dir[0];
        const NextY = now[1] + dir[1];
        if (NextX < 0 || NextX >= N || NextY < 0 || NextY >= M) continue;

        if (!visited[NextX][NextY]) {
            if (cnt === 2) {
                visited[NextX][NextY] = true;
                DFS(now, cnt + 1, value + MAP[NextX][NextY]);
                visited[NextX][NextY] = false;
            }
            visited[NextX][NextY] = true;
            DFS([NextX, NextY], cnt + 1, value + MAP[NextX][NextY]);
            visited[NextX][NextY] = false;

        }
    }
};

const solution = () => {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            visited[i][j] = true;
            DFS([i, j], 1, MAP[i][j]);
            visited[i][j] = false;
        }
    }
};
solution();
console.log(max);
