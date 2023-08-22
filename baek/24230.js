let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
let n = parseInt(input.shift());
let color = input.shift().split(" ").map(Number);

let arr = new Array(n + 1).fill().map(_ => []);

for (let i = 0; i < input.length; i++) {
    let [a, b] = input[i].split(" ").map(a => parseInt(a));
    arr[a].push(b);
    arr[b].push(a);
}

function DFS(node, prev) {
    let cnt = 0;
    for (const next of arr[node]) {
        if (next === prev) continue;
        cnt += DFS(next, node) + (color[node - 1] !== color[next - 1] ? 1 : 0);
    }
    return cnt;
}

let answer = DFS(1, 0);
if (color[0] !== 0) {
    answer++;
}

console.log(answer);