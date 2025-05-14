let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
const eraseNode = +input.pop();
input = input[0].split(' ').map(Number);

const trees = {};
for (let i = 0; i < N; i++) {
    trees[i] = [];
}
const root = input.indexOf(-1);
for (let i = 0; i < N; i++) {
    if (input[i] === -1) continue;
    trees[input[i]].push(i);
}
const solution = (node) => {
    let answer = 0;
    const visited = Array(N).fill(false);
    const dfs = (now) => {
        if (!visited[now]) {
            visited[now] = true;
            if (trees[now].length === 0) {
                answer++;
            }
        }else return;

        for (const next of trees[now]) {
            if (!visited[next]) {
                dfs(next);
            }
        }
    }
    dfs(node);
    return answer;
};

if (eraseNode === root) {
    console.log(0);
} else {
    const answer = solution(root) - solution(eraseNode);
    console.log(trees[input[eraseNode]].length === 1 ? answer + 1 : answer);
}

// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split('\n');
//
// // let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// let N = parseInt(input.shift());
// let connections = input[0].split(' ').map(Number);
// let DeleteNode = parseInt(input[1]);
//
// let lists = Array.from({length: N}, (_) => []);
// let root = 0;
// let isParent = Array.from({length: N}, (_) => false);
// for (let i = 0; i < connections.length; i++) {
//     const Parent = connections[i];
//     if (Parent === -1) {
//         root = i;
//     } else {
//         isParent[Parent] = true;
//         lists[Parent].push(i);
//     }
// }
//
// const DFS = (NOW) => {
//     if (!lists[NOW].length) {
//         isParent[NOW] = true;
//         return;
//     }
//     for (const Child of lists[NOW]) {
//         DFS(Child);
//         isParent[Child] = true;
//     }
// };
// const solution = () => {
//     if (DeleteNode !== root) {
//         if (lists[connections[DeleteNode]].length === 1) {
//             isParent[connections[DeleteNode]] = false;
//         }
//         DFS(DeleteNode);
//         console.log(isParent.filter(v => v === false).length);
//     }else {
//         console.log(0);
//     }
//
// };
// solution();