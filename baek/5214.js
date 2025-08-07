let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

let [N, K, M] = input.shift().split(' ').map(Number);

input = input.map(v => v.split(' ').map(Number));
const hypertubeIndex = Array.from({length: N + 1}, _ => []);

input.forEach((arr, index) => {
    arr.forEach((node) => {
        hypertubeIndex[node].push(index);
    });
});

const bfs = (n) => {
    const queue = [[n, 1]];
    let idx = 0;
    const hyperTubeVisited = Array(M).fill(false);
    const nodeVisited = Array(N + 1).fill(false);
    nodeVisited[n] = true;

    while (queue.length > idx) {
        const [now, cnt] = queue[idx++];
        if(now === N) return cnt;

        for (const hIndex of hypertubeIndex[now]) {
            if (!hyperTubeVisited[hIndex]) {
                hyperTubeVisited[hIndex] = true;

                for (const nextNode of input[hIndex]) {
                    if (!nodeVisited[nextNode]) {
                        nodeVisited[nextNode] = true;
                        queue.push([nextNode, cnt + 1]);
                    }
                }
            }
        }
    }
    return -1;
};

console.log(bfs(1));