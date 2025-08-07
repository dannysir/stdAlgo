let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();

const boards = input.map(v => v.split(' ').map(Number));

const lines = Array.from({length: N}, _ => []);

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (boards[i][j] === 1) {
            lines[i].push(j);
        }
    }
}

const bfs = (n) => {
    const visited = Array(N).fill(0);

    const queue = [n];
    let idx = 0;

    while (queue.length > idx) {
        const now = queue[idx++];

        for (const next of lines[now]) {
            if (visited[next] === 0) {
                visited[next] = 1;
                queue.push(next);
            }
        }
    }
    return visited;
};

const solution = () => {
    const answer = [];
    for (let i = 0; i < N; i++) {
        answer.push(bfs(i));
    }
    console.log(answer.map(v => v.join(' ')).join('\n'));
};
solution();