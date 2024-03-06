let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
let connections = input.map(v => v.split(' ').map(Number));

let lists = Array.from({length: N + 1}, (_) => []);
for (const connection of connections) {
    const [StartNode, EndNode] = connection;
    lists[StartNode].push(EndNode);
    lists[EndNode].push(StartNode);
}
let visited = Array.from({length: N + 1}, (v, Index) => 0);

visited[1] = 1;
const DFS = (NOW) => {
    for (const Child of lists[NOW]) {
        if (visited[Child] === 0) {
            visited[Child] = NOW;
            DFS(Child);
        }
    }
};
DFS(1);
console.log(visited.slice(2,visited.length).join('\n'));