let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);

const board = input.map(v => v.split(' ').map(Number));

const find = (target, board) => {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (board[i][j] === target) {
                return [i, j];
            }
        }
    }
};

const bfs = (now, board) => {
    const queue = [[...now, 0]];
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const visited = Array.from({length: N}, _ => Array(M).fill(-1));
    visited[now[0]][now[1]] = 0;
    let idx = 0;

    while (queue.length > idx) {
        const [x, y, cnt] = queue[idx++];

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

            if (board[nx][ny] === 0) {
                visited[nx][ny] = 0;
                continue;
            }

            if (visited[nx][ny] === -1 || visited[nx][ny] > cnt + 1) {
                visited[nx][ny] = cnt + 1;
                queue.push([nx, ny, cnt + 1]);
            }
        }
    }

    for (let i = 0; i < N; i++) {
        let line = '';
        for (let j = 0; j < M; j++) {
            if (board[i][j] === 0) {
                line += '0 ';
            } else {
                line += `${visited[i][j]} `;
            }
        }
        console.log(line.trim());
    }
};

const solution = (board) => {
    const [x, y] = find(2, board);
    bfs([x, y], board);
};

solution(board);