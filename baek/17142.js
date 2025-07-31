let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const boards = input.map(v => v.split(' ').map(Number));

const virusCanGo = [];
const virusCombination = [];

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (boards[i][j] === 2) {
            virusCanGo.push([i, j]);
        }
    }
}

const combination = (arr, now) => {
    if (arr.length === M) {
        virusCombination.push(arr);
        return;
    }

    for (let i = now; i < virusCanGo.length; i++) {
        combination([...arr, i], i + 1);
    }
};

const bfs = (virus) => {
    const visited = Array.from({length: N}, _ => Array(N).fill(-1));
    const queue = [];
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    virus.forEach(v => {
        const [x, y] = virusCanGo[v];
        queue.push([x, y, 0]);
        visited[x][y] = 0;
    });
    let idx = 0;
    let answer = 0;

    while (queue.length > idx) {
        const [x, y, cnt] = queue[idx++];
        // if (visited[x][y] < cnt) continue;

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;
            const nCnt = cnt + 1;

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;

            if (visited[nx][ny] === -1) {
                if (boards[nx][ny] === 0) {
                    visited[nx][ny] = nCnt;
                    queue.push([nx, ny, nCnt]);
                }
                if (boards[nx][ny] === 2) {
                    visited[nx][ny] = 0;
                    queue.push([nx, ny, nCnt]);
                }
            }

        }
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (boards[i][j] === 0 && visited[i][j] === -1) return -1;

            answer = Math.max(answer, visited[i][j]);
        }
    }


    return answer;
};

const solution = () => {
    let min = Infinity;

    combination([], 0);

    virusCombination.forEach(arr => {
        const result = bfs(arr);
        if (result !== -1) {
            min = Math.min(min, bfs(arr));
        }
    });

    console.log(min === Infinity ? -1 : min);
};

solution();