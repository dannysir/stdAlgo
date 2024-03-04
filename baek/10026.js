let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
const MAP = input.map(v => v.split(''));
let visited = new Array(N);
for (let i = 0; i < visited.length; i++) {
    visited[i] = new Array(N).fill(false);
}
let visitedForYou = new Array(N);
for (let i = 0; i < visited.length; i++) {
    visitedForYou[i] = new Array(N).fill(false);
}
let answer = [0, 0];
let dx = [1, -1, 0, 0];
let dy = [0, 0, 1, -1];
const DFS = (x, y, target) => {
    visited[x][y] = true;
    for (let i = 0; i < dx.length; i++) {
        const NextX = x + dx[i];
        const NextY = y + dy[i];
        if (NextX < 0 || NextX >= N || NextY < 0 || NextY >= N) continue;
        if (!visited[NextX][NextY]) {
            if (MAP[NextX][NextY] === target) {
                DFS(NextX, NextY, target);
            }
        }
    }
};
const DfsForYou = (x, y, target) => {
    visitedForYou[x][y] = true;
    let RorG = 'B';
    if (target !== 'B') {
        RorG = target === 'R' ? 'G' : 'R';
    }
    for (let i = 0; i < dx.length; i++) {
        const NextX = x + dx[i];
        const NextY = y + dy[i];
        if (NextX < 0 || NextX >= N || NextY < 0 || NextY >= N) continue;
        if (!visitedForYou[NextX][NextY]) {
            if (MAP[NextX][NextY] === target || MAP[NextX][NextY] === RorG) {
                DfsForYou(NextX, NextY, target);
            }
        }
    }

};
const NormalSolution = () => {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (!visited[i][j]) {
                DFS(i, j, MAP[i][j]);
                answer[0]++;
            }
            if (!visitedForYou[i][j]) {
                DfsForYou(i, j, MAP[i][j]);
                answer[1]++;
            }
        }
    }
};
NormalSolution();
console.log(answer.join(' '));