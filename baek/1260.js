let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
let n = input.shift().split(" ").map(Number);
let trees = new Array(n[0]).fill( ).map(_ => []);
for (let i = 0; i < input.length; i++) {
    let node = input[i].split(" ");
    trees[node[0] - 1].push(parseInt(node[1]));
    trees[node[1] - 1].push(parseInt(node[0]));
}
trees.forEach(v => v.sort((a, b) => a - b));
let dfsVisited = new Array(n[0]).fill(false);
dfsVisited[0] = true;
let answerDfs = [];
function DFS(now) {
    if (!dfsVisited[now]) {
        answerDfs.push(now);
        dfsVisited[now] = true;
    }
    for (let i = 0; i < trees[now-1].length; i++) {
        let next = trees[now-1][i];
        if (dfsVisited[next]) continue;
        DFS(next);
    }
}

DFS(n[2]);
let answerBfs = [];
let bfsVisited = new Array(n[0]).fill(false);
function BFS(start) {
    const next = [start];
    let a;
    while (next.length !== 0) {
        a = next.shift();
        if (bfsVisited[a]) continue;
        bfsVisited[a] = true;
        answerBfs.push(a);
        for (let i = 0; i < trees[a-1].length; i++) {
            if (!bfsVisited[trees[a-1][i]]){
                next.push(trees[a-1][i]);
            }
        }
    }
}

BFS(n[2]);
console.log(answerDfs.join(" "));
console.log(answerBfs.join(" "));
