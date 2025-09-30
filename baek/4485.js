let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const bfs = (N, board) => {
    const visited = Array.from({length: N}, _ => Array(N).fill(Infinity));
    const queue = [[0, 0, board[0][0]]];
    visited[0][0] = board[0][0];
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let idx = 0;
    while (queue.length > idx) {
        const [x, y, cnt] = queue[idx++];
        if (visited[x][y] < cnt) continue;
        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

            const nCnt = cnt + board[nx][ny];

            if (visited[nx][ny] > nCnt) {
                visited[nx][ny] = nCnt;
                queue.push([nx, ny, nCnt]);
            }
        }
    }
    return visited[N - 1][N - 1];
};

const solution = () => {
    let cnt = 0;
    const answer = [];
    while (true) {
        const N = +input.shift();
        if (N === 0) break;
        const board = input.splice(0, N).map(v => v.split(' ').map(Number));
        cnt++;
        answer.push(`Problem ${cnt}: ${bfs(N, board)}`);
    }
    console.log(answer.join('\n'));
};

solution();