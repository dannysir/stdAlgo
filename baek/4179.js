let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const board = input.map(v => v.split(''));
const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const FIRE = 'F';
const WALL = '#';
const JIHUN = 'J';
const EMPTY = '.';

const jihunBoard = Array.from({length: N}, _ => Array(M).fill(Infinity));
const fireBoard = Array.from({length: N}, _ => Array(M).fill(Infinity));
let now = null;
const firePos = [];

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (board[i][j] === FIRE) {
            firePos.push([i, j, 0]);
        }
        if (board[i][j] === JIHUN) {
            now = [i, j];
        }
    }
}

const bfsForFire = (firePos, fireBoard) => {
    const queue = [...firePos];
    let idx = 0;


    queue.forEach(([x, y, cnt]) => fireBoard[x][y] = cnt);

    while (queue.length > idx) {
        const [x, y, cnt] = queue[idx];

        if (fireBoard[x][y] < cnt) continue;

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;
            const nCnt = cnt + 1;

            if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

            if (board[nx][ny] !== WALL && fireBoard[nx][ny] > nCnt) {
                fireBoard[nx][ny] = nCnt;
                queue.push([nx, ny, nCnt]);
            }
        }
        idx++;
    }
};

bfsForFire(firePos, fireBoard);

const bfs = (now, visited) => {
    const queue = [[...now, 0]];
    visited[now[0]][now[1]] = 0;
    let idx = 0;
    while (queue.length > idx) {
        const [x, y, cnt] = queue[idx];

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;
            const nCnt = cnt + 1;

            if (nx < 0 || nx >= N || ny < 0 || ny >= M) {
                return nCnt;
            }

            if (board[nx][ny] !== WALL && visited[nx][ny] > nCnt && fireBoard[nx][ny] > nCnt) {
                visited[nx][ny] = nCnt;
                queue.push([nx, ny, nCnt]);
            }
        }

        idx++;
    }

    return 'IMPOSSIBLE';
};

console.log(bfs(now, jihunBoard));