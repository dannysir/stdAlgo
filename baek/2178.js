let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let [N, M] = input.shift().split(' ');
let map = input.map(v => v.split(''));
let visited = new Array(parseInt(N));
let answer = 0;

for (let i = 0; i < N; i++) {
    visited[i] = new Array(parseInt(M)).fill(0);
}

function isValid(x, y) {
    return x >= 0 && x < N && y >= 0 && y < M;
}

function BFS(startX, startY) {
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];
    let queue = [[startX, startY]];
    visited[startX][startY] = 1;
    while (queue.length > 0) {
        let [x, y] = queue.shift();


        if (x === N - 1 && y === M - 1) {
            return visited[x][y];
        }

        for (let i = 0; i < dx.length; i++) {
            let nextX = x + dx[i];
            let nextY = y + dy[i];

            if (isValid(nextX, nextY) && map[nextX][nextY] === '1' && !visited[nextX][nextY]) {
                visited[nextX][nextY] = visited[x][y] + 1;
                queue.push([nextX, nextY]);
            }
        }
    }

    return -1; // 출구점에 도달하지 못한 경우
}

console.log(BFS(0, 0));