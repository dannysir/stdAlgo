let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, M] = input.shift().split(' ').map(Number);
let visited = new Array(100002).fill(false);

const BFS = (now) => {
    let cnt = 0;
    let Queue = [[now, cnt]];
    visited[now] = true;
    let idx = 0;
    while (Queue.length > idx) {
        const [Position, Count] = Queue[idx];
        if (Position === M) return Count;
        for (let i = 0; i < 3; i++) {
            let nextPos;
            if (i === 0) nextPos = Position + 1;
            if (i === 1) nextPos = Position - 1;
            if (i === 2) nextPos = Position * 2;
            if (nextPos >= 0 && nextPos <= 100000) {
                if (!visited[nextPos]) {
                    Queue.push([nextPos, Count + 1]);
                    visited[nextPos] = true;
                }
            }
        }
        idx++
    }
};
let answer = BFS(N);
console.log(answer);