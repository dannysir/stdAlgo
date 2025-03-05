let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const tc = Number(input.shift());

const check = (trees, n, visited) => {
    const queue = [n];
    visited[n] = 1;
    let idx = 0;
    while (idx < queue.length) {
        const now = queue[idx];
        const myTeam = visited[now];
        const otherTeam = myTeam === 1 ? -1 : 1;
        for (const next of trees[now]) {

            if (visited[next] === myTeam) {
                return false;
            }
            if (visited[next] === 0) {
                visited[next] = otherTeam;
                queue.push(next);
            }
        }
        idx++;
    }
    return true;
};

const solution = () => {
    let result = [];
    for (let i = 0; i < tc; i++) {
        const [v, e] = input.shift().split(' ').map(Number);
        const inputLines = input.splice(0, e).map(v => v.split(' ').map(Number));
        const trees = Array.from({length: v + 1}, _ => []);
        inputLines.forEach(v => {
            const [start, end] = v;
            trees[start].push(end);
            trees[end].push(start);
        });

        const visited = Array(v + 1).fill(0);
        let answer = true;
        for (let j = 1; j < v + 1; j++) {
            if (visited[j] === 0) {
                if (!check(trees, j, visited)) {
                    answer = false;
                    break;
                }
            }
        }
        result.push(answer ? 'YES' : 'NO');

    }
    console.log(result.join('\n'));
};

solution();