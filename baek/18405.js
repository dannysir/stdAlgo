let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split('\n');

const [N, K] = input.shift().split(' ').map(Number);
const boards = input.splice(0, N).map(v => v.split(' ').map(Number));
const [S, X, Y] = input[0].split(' ').map(Number);

const bfs = (queue) => {
    let idx = 0;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    while (queue.length > idx) {
        const [x, y, time, num] = queue[idx];
        if (time >= S) break;

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

            if (boards[nx][ny] === 0) {
                boards[nx][ny] = num;
                queue.push([nx, ny, time + 1, num]);
            }
        }
        idx++;
    }
};

const solution = () => {
    const queue = [];
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const num = boards[i][j];
            if (num !== 0) {
                queue.push([i, j, 0, num]);
            }
        }
    }
    queue.sort((a, b) => a[3] - b[3]);

    bfs(queue);

    console.log(boards[X - 1][Y - 1]);
};

solution();