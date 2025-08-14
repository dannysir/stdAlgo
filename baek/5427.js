let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();

const bfsForFire = (now, visited, board) => {
    const queue = [];
    now.forEach(([x, y]) => {
        visited[x][y] = 0;
        queue.push([x, y, 0]);
    })
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let idx = 0;
    while (queue.length > idx) {
        const [x, y, cnt] = queue[idx++];

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= visited.length || ny < 0 || ny >= visited[0].length) continue;

            if (visited[nx][ny] > cnt + 1 && board[nx][ny] !== '#') {
                visited[nx][ny] = cnt + 1;
                queue.push([nx, ny, cnt + 1]);
            }

        }
    }
};

const bfsForSangn = (now, fireVisited, board) => {
    const queue = [[...now, 0]];
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const visited = Array.from({length: board.length}, _ => Array(board[0].length).fill(Infinity));
    visited[now[0]][now[1]] = 0;
    let idx = 0;
    let answer = -1;
    while (queue.length > idx) {
        const [x, y, cnt] = queue[idx++];

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= board.length || ny < 0 || ny >= board[0].length) {
                return cnt + 1;
            }

            if (visited[nx][ny] > cnt + 1 && board[nx][ny] === '.' && fireVisited[nx][ny] > cnt + 1) {
                visited[nx][ny] = cnt + 1;
                queue.push([nx, ny, cnt + 1]);
            }
        }
    }
    return answer;
};

const findTarget = (target, board) => {
    const result = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === target) {
                result.push([i, j]);
            }
        }
    }
    return result;
};

const solution = (w, h, board) => {
    const now = findTarget('@', board)[0];
    const fires = findTarget('*', board);
    const fireVisited = Array.from({length: h}, _ => Array(w).fill(Infinity));
    bfsForFire(fires, fireVisited, board);
    const result = bfsForSangn(now, fireVisited, board);

    return result === -1 ? 'IMPOSSIBLE' : result;
};


const answer = [];
for (let i = 0; i < N; i++) {
    const [W, H] = input.shift().split(' ').map(Number);
    const board = input.splice(0, H).map(v => v.split(''));
    answer.push(solution(W, H, board));
}

console.log(answer.join('\n'));