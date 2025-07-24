let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

let board = input.map(v => v.split(''));
const N = 12;
const M = 6;
const EMPTY = '.';

const bfs = (now) => {
    const queue = [[...now]];
    const visited = Array.from({length: 12}, _ => Array(M).fill(false));
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const target = board[now[0]][now[1]];
    visited[now[0]][now[1]] = true;
    let cnt = 1;
    let idx = 0;
    while (queue.length > idx) {
        const [x, y] = queue[idx];
        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

            if (!visited[nx][ny] && board[nx][ny] === target) {
                visited[nx][ny] = true;
                cnt++;
                queue.push([nx, ny]);
            }
        }
        idx++;
    }

    if (cnt >= 4) {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                if (visited[i][j]) {
                    board[i][j] = EMPTY;
                }
            }
        }
    }
    return cnt >= 4;
};

const gravity = (board) => {
    const resultBoard = Array.from({length: N}, _ => Array(M).fill(EMPTY));
    for (let y = 0; y < M; y++) {
        const element = [];
        for (let x = N - 1; x >= 0; x--) {
            if (board[x][y] !== EMPTY) {
                element.push(board[x][y]);
            }
        }
        element.forEach((value, index) => resultBoard[N - 1 - index][y] = value);
    }

    return resultBoard;
};

const solution = () => {
    let cnt = 0;

    while (true) {
        let flag = false;

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                if (board[i][j] !== EMPTY) {
                    const result = bfs([i, j]);
                    if (result) flag = result;
                }
            }
        }
        if (!flag) break;
        cnt++;
        board = gravity(board);
    }

    console.log(cnt);
};

solution();