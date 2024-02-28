let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, M] = input.shift().split(' ').map(Number);
let Map = input.map(v => v.split(' ').map(Number));

const FindRotten = (MAP) => {
    let Queue = [];
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (Map[i][j] === 1) {
                Queue.push([i, j]);
            }
        }
    }
    return Queue;
};

const BFS = () => {
    let Que = FindRotten(Map);
    let dx = [1, -1, 0, 0];
    let dy = [0, 0, 1, -1];
    let cnt = 0;
    let idx = 0;
    while (Que.length !== idx) {
        let [X, Y] = Que[idx];
        cnt++;
        for (let i = 0; i < dx.length; i++) {
            let nextX = X + dx[i];
            let nextY = Y + dy[i];
            if (nextY >= 0 && nextY < N && nextX >= 0 && nextX < M) {
                if (Map[nextX][nextY] === 0) {
                    Map[nextX][nextY] = Map[X][Y] + 1;
                    Que.push([nextX, nextY]);
                }
            }
        }
        idx++;
    }
}
BFS();

const Check = (MAP) => {
    let max = 0;
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (MAP[i][j] === 0) return -1;
            if (max < MAP[i][j]) max = MAP[i][j];
        }
    }
    return max - 1;
};
console.log(Check(Map));