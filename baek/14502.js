let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, M] = input.shift().split(' ').map(Number);
let MAP = input.map(v => v.split(' ').map(Number));
const Find = (map, target) => {
    let Queue = [];
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (map[i][j] === target) {
                Queue.push([i, j]);
            }
        }
    }
    return Queue;
};
const BFS = (map) => {
    let Queue = Find(map, 2);
    let idx = 0;
    let dx = [1, -1, 0, 0];
    let dy = [0, 0, 1, -1];
    while (Queue.length > idx) {
        const [x, y] = Queue[idx];
        for (let i = 0; i < dx.length; i++) {
            const NextX = x + dx[i];
            const NextY = y + dy[i];
            if (NextX >= 0 && NextY >= 0 && NextX < N && NextY < M) {
                if (map[NextX][NextY] === 0) {
                    map[NextX][NextY] = 2;
                    Queue.push([NextX, NextY]);
                }
            }
        }
        idx++;
    }
    return Find(map, 0).length;
};

let max = 0;
const DFS = (wall) => {
    if (wall === 3) {
        const newMap = MAP.map(v => [...v]);
        let answer = BFS(newMap);
        max = Math.max(answer, max);
        return;
    }
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (MAP[i][j] === 0) {
                MAP[i][j] = 1;
                DFS(wall + 1);
                MAP[i][j] = 0;
            }
        }
    }
};
DFS(0);
console.log(max);