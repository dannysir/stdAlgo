let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const boards = input.map(v => v.split(''));
const waterBoard = Array.from({length: N}, _ => Array(M).fill(Infinity));
const answerBoard = Array.from({length: N}, _ => Array(M).fill(Infinity));
const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

const find = (board, target) => {
    const queue = [];

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (board[i][j] === target) {
                queue.push([i, j, 0]);
            }
        }
    }

    return queue;
}

const bfs = (board, start) => {
    const queue = find(boards, start);
    queue.forEach(([x, y, time]) => {
        board[x][y] = time;
    });
    let idx = 0;
    while (queue.length > idx) {
        const [x, y, time] = queue[idx++];
        if (board[x][y] < time) continue;
        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

            if (boards[nx][ny] === '.' && board[nx][ny] > time + 1) {
                board[nx][ny] = time + 1;
                queue.push([nx, ny, time + 1]);
            }
        }
    }
}

bfs(waterBoard, '*');

// DFS를 BFS로 변경!
const hogBFS = () => {
    const [sx, sy] = find(boards, 'S')[0];
    const queue = [[sx, sy, 0]];
    answerBoard[sx][sy] = 0;

    let idx = 0;
    while (queue.length > idx) {
        const [x, y, cnt] = queue[idx++];

        if (answerBoard[x][y] < cnt) continue;

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
            if (boards[nx][ny] === 'X') continue; // 돌은 통과 불가

            // 물이 찰 시간보다 먼저 도착할 수 있고, 더 빠른 경로인 경우
            if (waterBoard[nx][ny] > cnt + 1 && answerBoard[nx][ny] > cnt + 1) {
                answerBoard[nx][ny] = cnt + 1;
                queue.push([nx, ny, cnt + 1]);
            }
        }
    }
};

hogBFS(); // DFS 대신 BFS 호출

const [ax, ay] = find(boards, 'D')[0];
console.log(answerBoard[ax][ay] === Infinity ? 'KAKTUS' : answerBoard[ax][ay]);