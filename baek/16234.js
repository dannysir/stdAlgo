let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, L, R] = input.shift().split(' ').map(Number);
let MAP = input.map(v => v.split(' ').map(Number));

const BFS = (X, Y, visited, flag) => {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    visited[X][Y] = true;
    let Queue = [[X, Y]];
    let teams = [[X, Y]];
    let sum = MAP[X][Y];

    while (Queue.length) {
        const [nowX, nowY] = Queue.shift();
        for (const [dx, dy] of dirs) {
            const nextX = nowX + dx;
            const nextY = nowY + dy;

            if (nextX < 0 || nextX >= N || nextY < 0 || nextY >= N) continue;

            if (!visited[nextX][nextY]) {
                const GAP = Math.abs(MAP[nextX][nextY] - MAP[nowX][nowY]);
                if (GAP >= L && GAP <= R) {
                    visited[nextX][nextY] = true;
                    Queue.push([nextX, nextY]);
                    teams.push([nextX, nextY]);
                    sum += MAP[nextX][nextY];
                    flag = true;
                    // console.log(sum);
                }
            }
        }
    }

    for (const [teamX, teamY] of teams) {
        MAP[teamX][teamY] = Math.floor(sum / teams.length);
    }
    return flag;
};

const solution = () => {
    let answer = 0;
    while (true) {
        let flag = false;
        let visited = Array.from({length: N}, _ => Array(N).fill(false));

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (!visited[i][j]) {
                    flag = BFS(i, j, visited, flag);
                }
            }
        }

        if (!flag) break;
        answer++;
    }
    console.log(answer);
};
solution();