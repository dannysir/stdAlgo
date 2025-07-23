let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
const board = input.map(v => v.split(' ').map(Number));
const visited = Array.from({length: N}, _ => Array(N).fill(false));

let landIndex = 1;

const bfs = (now, visited, n) => {
    const queue = [[...now]];
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let idx = 0;

    while (queue.length > idx) {
        const [x, y] = queue[idx];

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

            if (!visited[nx][ny] && board[nx][ny] === 1) {
                visited[nx][ny] = true;
                board[nx][ny] = n;
                queue.push([nx, ny]);
            }
        }
        idx++;
    }
};

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (!visited[i][j] && board[i][j] === 1) {
            visited[i][j] = true;
            board[i][j] = landIndex;
            bfs([i, j], visited, landIndex);
            landIndex++;
        }
    }
}

const shortestBfs = (now) => {
    const queue = [[...now, 0]];
    const visited = Array.from({length: N}, _ => Array(N).fill(false));
    visited[now[0]][now[1]] = true;
    const IM = board[now[0]][now[1]];
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let idx = 0;
    while (queue.length > idx) {
        const [x, y, cnt] = queue[idx];
        if (board[x][y] > 0 && board[x][y] !== IM) {
            return cnt;
        }

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;
            const nCnt = cnt + 1;

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

            if (!visited[nx][ny]) {
                visited[nx][ny] = true;
                queue.push([nx, ny, nCnt]);
            }
        }
        idx++;
    }

};

let min = Infinity;

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (board[i][j] !== 0) {
            min = Math.min(min, shortestBfs([i, j]) - 1);
        }
    }
}
console.log(min);