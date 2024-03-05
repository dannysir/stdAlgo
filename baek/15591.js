let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let [N, M] = input.shift().split(' ').map(Number);
let lines = input.splice(0, N - 1).map(v => v.split(' ').map(Number));
input = input.map(v => v.split(' ').map(Number));

let distance = new Array(N + 1).fill().map(_ => []);

for (const line of lines) {
    const [start, goal, cost] = line;
    distance[start].push([goal, cost]);
    distance[goal].push([start, cost]);
}

const BFS = (limit, start) => {
    let visited = new Array(N + 1).fill(false);
    visited[start] = true;
    let cnt = 0;
    let Queue = [start];
    let idx = 0;
    while (Queue.length > idx) {
        let now = Queue[idx];
        for (let i = 0; i < distance[now].length; i++) {
            let [nextNode, nextCost] = distance[now][i];
            if (!visited[nextNode]) {
                if (nextCost >= limit) {
                    visited[nextNode] = true;
                    Queue.push(nextNode);
                    cnt++;
                }
            }
        }
        idx++;
    }
    return cnt;
};

const solution = (INPUT) => {
    let answer = [];
    for (const inputElement of INPUT) {
        const [LIMIT, NODE] = inputElement;
        answer.push(BFS(LIMIT, NODE));
    }
    console.log(answer.join('\n'));
};
solution(input);