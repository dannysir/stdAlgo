let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const MAP = input.map(v => v.split(""));

let visited = Array.from({length: N}, _ => Array(M).fill(false));

let dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
let answer = [0, 0];
const BFS = (x, y) => {
    let queue = [[x, y]];
    visited[x][y] = true;
    let wolf = 0;
    let sheep = 0;
    while (queue.length) {
        const [X, Y] = queue.shift();
        if (MAP[X][Y] === "o") {
            sheep++;
        }else if (MAP[X][Y] === "v") {
            wolf++;
        }
        for (const [dx, dy] of dirs) {
            const nx = X + dx;
            const ny = Y + dy;
            if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
            if (!visited[nx][ny] && MAP[nx][ny] !== "#") {
                queue.push([nx, ny]);
                visited[nx][ny] = true;
            }
        }
    }
    if (sheep > wolf) {
        wolf = 0;
    } else {
        sheep = 0;
    }
    return [sheep, wolf];
}

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (MAP[i][j] !== "#") {
            if (!visited[i][j]) {
                let result = BFS(i, j);
                answer[0] += result[0];
                answer[1] += result[1];
            }
        }
    }
}
console.log(answer.join(" "));