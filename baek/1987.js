let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const boards = input.map(v => v.split(''));

const dirs = [[1, 0], [-1, 0], [0, -1], [0, 1]];
const visitedSet = new Set();
let answer = -1;
const dfs = (x, y) => {
    const nowString = boards[x][y];
    if (!visitedSet.has(nowString)) {
        visitedSet.add(nowString);
        answer = Math.max(answer, visitedSet.size);
    }

    for (const [dx, dy] of dirs) {
        const [nx, ny] = [x + dx, y + dy];

        if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

        const nextString = boards[nx][ny];

        if (!visitedSet.has(nextString)) {
            visitedSet.add(nextString);
            answer = Math.max(answer, visitedSet.size);
            dfs(nx, ny);
            visitedSet.delete(nextString);
        }
    }
};

dfs(0, 0);

console.log(answer);