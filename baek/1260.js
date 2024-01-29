let fs = require("fs");
let input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
let [N, Bridge, Start] = input.shift().split(" ").map(Number);
let trees = new Array(N).fill(0).map(_ => []);
trees.forEach(v => v.sort((a, b) => a - b));
for (let i = 0; i < Bridge; i++) {
    let node = input[i].split(" ").map(Number);
    trees[node[0] - 1].push(node[1]);
    trees[node[1] - 1].push(node[0]);
}
trees.forEach(v => v.sort((a, b) => a - b));

let BFSVisited = new Array(N).fill(false);
let BfsAnswer = [];
const BFS = (now) => {
    let queue = [now];

    while (queue.length) {
        let Position = queue.shift();
        if (BFSVisited[Position - 1]) continue;
        BFSVisited[Position - 1] = true;
        BfsAnswer.push(Position);
        for (let i = 0; i < trees[Position - 1].length; i++) {
            if (!BFSVisited[trees[Position - 1][i] - 1]) {
                queue.push(trees[Position - 1][i]);
            }
        }
    }
};
BFS(Start);

let DFSVisited = new Array(N).fill(false);
let DfsAnswer = [];
const DFS = (now) => {
    if (!DFSVisited[now - 1]) {
        DFSVisited[now - 1] = true;
        DfsAnswer.push(now);
    }
    for (let i = 0; i < trees[now - 1].length; i++) {
        if (DFSVisited[trees[now - 1][i] - 1]) continue;
        DFS(trees[now - 1][i]);

    }
};

DFS(Start);
console.log(`${DfsAnswer.join(" ")}\n${BfsAnswer.join(" ")}`);