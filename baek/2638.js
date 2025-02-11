let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, M] = input.shift().split(' ').map(Number);
const boards = input.map(v => v.split(' ').map(Number));
const BFS = (startX, startY) => {
    const visited = Array.from({length: N}, _ => Array(M).fill(false));
    visited[startX][startY] = true;
    const queue = [[startX, startY]];
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    let idx = 0;
    while (idx < queue.length) {
        const [x, y] = queue[idx];
        for (const dir of dirs) {
            const nx = x + dir[0];
            const ny = y + dir[1];
            if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
            if (boards[nx][ny] === 0) {
                if (!visited[nx][ny]) {
                    visited[nx][ny] = true;
                    queue.push([nx, ny]);
                }
            } else {
                boards[nx][ny]++;
            }
        }
        idx++;
    }
};

const updateBoards = () => {
    let flag = false;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (boards[i][j] >= 3) {
                boards[i][j] = 0;
            }else if (boards[i][j] === 2) {
                flag = true;
                boards[i][j] = 1;
            }else if (boards[i][j] === 1) {
                flag = true;
            }
        }
    }
    return flag;
};

const solution = () => {
    let flag = true;
    let cnt = 0;
    while (flag) {
        BFS(0, 0);
        flag = updateBoards();
        cnt++;
    }
    console.log(cnt);
};
solution();