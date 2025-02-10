let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [M, N, H] = input.shift().split(' ').map(Number);

// [H][N][M] 층-새로-가로
const board = [];

for (let i = 0; i < H; i++) {
    board.push(input.splice(0, N).map(v => v.split(' ').map(Number)));
}

const BFS = (queue) => {
    let n = 0;
    while (queue.length > n) {
        const [z, x, y] = queue[n];
        const dirs = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];

        for (const dir of dirs) {
            const nz = z + dir[0];
            const nx = x + dir[1];
            const ny = y + dir[2];

            if (nz < 0 || nz >= H || nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

            if (board[nz][nx][ny] === 0) {
                board[nz][nx][ny] = board[z][x][y] + 1;
                queue.push([nz, nx, ny]);
            }
        }
        n++;
    }
};

const solution = () => {
    let answer = null;
    const queue = [];
    for (let i = 0; i < H; i++) {
        for (let j = 0; j < N; j++) {
            for (let k = 0; k < M; k++) {
                if (board[i][j][k] === 1) {
                    queue.push([i, j, k]);
                }
            }
        }
    }

    BFS(queue);

    for (let i = 0; i < H; i++) {
        for (let j = 0; j < N; j++) {
            for (let k = 0; k < M; k++) {
                if (board[i][j][k] === 0) {
                    return -1;
                } else {
                    answer = Math.max(answer, board[i][j][k]);
                }
            }
        }
    }
    return answer - 1;
};
console.log(solution())