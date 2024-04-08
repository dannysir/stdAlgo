let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = parseInt(input.shift());

const BFS = (NOW) => {

    let visited = new Array(N + 1).fill(N);
    visited[NOW] = 1;
    let Queue = [NOW];

    let idx = 0;
    while (Queue.length > idx) {
        let now = Queue[idx];
        if (now % 3 === 0) {
            if (visited[now / 3] > visited[now] + 1) {
                visited[now / 3] = visited[now] + 1;
                Queue.push(now / 3);
            }
        }
        if (now % 2 === 0) {
            if (visited[now / 2] > visited[now] + 1) {
                visited[now / 2] = visited[now] + 1;
                Queue.push(now / 2);
            }
        }
        if (visited[now - 1] > visited[now] + 1) {
            visited[now - 1] = visited[now] + 1;
            Queue.push(now - 1);
        }
        idx++;
    }
    return visited[1] - 1;
};
console.log(BFS(N));