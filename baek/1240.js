let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const lines = input.splice(0, N - 1).map(v => v.split(' ').map(Number));
input = input.map(v => v.split(' ').map(Number));

const tree = Array.from({length: N + 1}, _ => []);

lines.forEach(([from, to, weight]) => {
    tree[from].push([to, weight]);
    tree[to].push([from, weight]);
});

const bfs = (from, to) => {
    const queue = [[from, 0]];
    const visited = Array(N + 1).fill(false);
    visited[from] = true;
    let idx = 0;

    while (queue.length > idx) {
        const [now, cnt] = queue[idx++];

        if (now === to) return cnt;

        for (const [next, cost] of tree[now]) {
            if (!visited[next]) {
                visited[next] = true;
                queue.push([next, cnt + cost]);
            }
        }
    }
};

const answer = [];

input.forEach(([from, to]) => {
    answer.push(bfs(from, to));
});

console.log(answer.join('\n'));