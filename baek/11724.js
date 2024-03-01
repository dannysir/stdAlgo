let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, L] = input.shift().split(' ').map(Number);
let Lines = input.map(v => v.split(' ').map(Number));
let trees = new Array(N + 1).fill().map(_ => []);
let visited = new Array(N + 1).fill(false);
const MakeTree = (LINES) => {
    for (const line of LINES) {
        trees[line[0]].push(line[1]);
        trees[line[1]].push(line[0]);
    }

};
const BFS = (StartNode) => {
    let Queue = [StartNode];
    let idx = 0;
    while (Queue.length > idx) {
        const NOW = Queue[idx];
        visited[NOW] = true;
        for (const Next of trees[NOW]) {
            if (!visited[Next]) {
                visited[Next] = true;
                Queue.push(Next);
            }
        }
        idx++;
    }
};
const solution = (n) => {
    let answer = 0;
    MakeTree(Lines);
    for (let i = 1; i < n + 1; i++) {
        if (!visited[i]) {
            BFS(i);
            answer++;
        }
    }
    console.log(answer);
};
solution(N);