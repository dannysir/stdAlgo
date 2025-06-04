let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const boards = input.map(v => v.split(' ').map(Number));
const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const find = (board, target) => {
    const queue = [];
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (board[i][j] === target) {
                queue.push([i, j]);
            }
        }
    }
    return queue;
};
const bfs = (board) => {
    const queue = find(board, 2);
    let idx = 0;
    while (queue.length > idx) {
        const [x, y] = queue[idx++];

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

            if (board[nx][ny] === 0) {
                board[nx][ny] = 2;
                queue.push([nx, ny]);
            }
        }
    }

    return find(board, 0).length;
};

let answer = 0;

const combination = (cnt) => {
    if (cnt === 3) {
        const copyBoard = boards.map(v => [...v]);
        const size = bfs(copyBoard);
        answer = Math.max(answer, size);
        return;
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (boards[i][j] === 0) {
                boards[i][j] = 1;
                combination(cnt + 1);
                boards[i][j] = 0;
            }
        }
    }
}
combination(0);

console.log(answer);