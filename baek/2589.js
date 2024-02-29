let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, M] = input.shift().split(' ').map(Number);
const MAP = input.map(v => v.split(''));
let dx = [1, -1, 0, 0];
let dy = [0, 0, 1, -1];
const BFS = (X, Y) => {
    let CountMap = new Array(N);
    let max = 0;
    for (let i = 0; i < N; i++) {
        CountMap[i] = new Array(M).fill(0);
    }
    let Queue = [[X, Y]];
    CountMap[X][Y] = 1;
    let idx = 0;

    while (Queue.length > idx) {
        const [x, y] = Queue[idx];
        for (let i = 0; i < dx.length; i++) {
            const NextX = x + dx[i];
            const NextY = y + dy[i];
            if (NextX >= 0 && NextX < N && NextY >= 0 && NextY < M) {
                if (MAP[NextX][NextY] === 'L' && CountMap[NextX][NextY] === 0) {
                    CountMap[NextX][NextY] = CountMap[x][y] + 1;
                    Queue.push([NextX, NextY]);
                    if (max < CountMap[NextX][NextY]) max = CountMap[NextX][NextY];
                }
            }
        }
        idx++
    }
    return max - 1;
};
const solution = () => {
    let max = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (MAP[i][j] === 'L') {
                let tmp = BFS(i, j);
                if (max < tmp) max = tmp;
            }
        }
    }
    console.log(max);
};
solution();