let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(' ').map(Number);

let lines = {};

for (let i = 1; i <= M; i++) {
    const [Start, End] = input[i].split(' ').map(Number);
    lines[Start] = lines[Start] ? [...lines[Start], End] : [End];
    lines[End] = lines[End] ? [...lines[End], Start] : [Start];
}

let visited = new Array(N).fill(false);
let answer = 0;

const DFS = (cur, cnt) => {
    visited[cur] = true;
    if (cnt === 5) {
        answer = 1;
        return;
    }
    if (lines[cur]) {
        for (const next of lines[cur]) {
            if (!visited[next]) {
                DFS(next, cnt + 1);
            }
        }
    }
    visited[cur] = false;
};

for (let i = 0; i < N; i++) {
    if (answer !== 0) break;
    DFS(i, 1);
}

console.log(answer);