let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = Number(input.shift());
const connections = input.map(v => v.split(' ').map(Number));
const trees = Array.from({length: N + 1}, _ => []);

connections.forEach(v => {
    const [start, end] = v;
    trees[start].push(end);
    trees[end].push(start);
});

const visited = Array(N + 1).fill(-1);

const DFS = (now) => {
    for (const next of trees[now]) {
        if (visited[next] === -1) {
            visited[next] = now;
            DFS(next);
        }
    }
};
DFS(1);
visited.splice(0, 2);
console.log(visited.join('\n'));
// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split('\n');
//
// // let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// let N = parseInt(input.shift());
// let connections = input.map(v => v.split(' ').map(Number));
//
// let lists = Array.from({length: N + 1}, (_) => []);
// for (const connection of connections) {
//     const [StartNode, EndNode] = connection;
//     lists[StartNode].push(EndNode);
//     lists[EndNode].push(StartNode);
// }
// let visited = Array.from({length: N + 1}, (v, Index) => 0);
//
// visited[1] = 1;
// const DFS = (NOW) => {
//     for (const Child of lists[NOW]) {
//         if (visited[Child] === 0) {
//             visited[Child] = NOW;
//             DFS(Child);
//         }
//     }
// };
// DFS(1);
// console.log(visited.slice(2,visited.length).join('\n'));