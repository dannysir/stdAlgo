let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
let iceMap = input.map(v => v.split(' ').map(Number));

const BFS = (nowX, nowY, visited) => {
    let Queue = [[nowX, nowY]];
    visited[nowX][nowY] = true;
    let idx = 0;
    let dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let nextMap = iceMap.map(v => [...v]);
    while (Queue.length > idx) {
        let [x, y] = Queue[idx];
        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

            if (iceMap[nx][ny] === 0 && nextMap[x][y] > 0) {
                nextMap[x][y]--;
            }

            if (iceMap[nx][ny] > 0 && !visited[nx][ny]) {
                Queue.push([nx, ny]);
                visited[nx][ny] = true;
            }
        }
        idx++;
    }
    return nextMap;
};

const solution = () => {
    let timer = 0;
    while (true) {
        let visited = Array.from({length: N}, _ => Array(M).fill(false));
        let cnt = 0;

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                if (!visited[i][j] && iceMap[i][j] > 0) {
                    cnt++;
                    iceMap = BFS(i, j, visited);
                }
            }
        }
        if (cnt >= 2) break;
        if (cnt === 0) {
            timer = 0;
            break;
        }
        timer++;
    }
    console.log(timer);
};
solution();