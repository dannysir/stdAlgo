let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
input = input.filter(v => v !== '-1 -1').map(v => v.split(' ').map(Number));
const trees = Array.from({length: N + 1}, _ => []);
input.forEach(([from, to]) => {
  trees[from].push(to);
  trees[to].push(from);
});

const dfs = (now, cnt, visited) => {
  if (visited[now] < cnt) return;

  for (const next of trees[now]) {
    if (visited[next] > cnt + 1) {
      visited[next] = cnt + 1;
      dfs(next, cnt + 1, visited);
    }
  }
};

const solution = (N, input) => {
  const answer = Array(N + 1).fill(-1);
  for (let i = 1; i <= N; i++) {
    const visited = Array(N + 1).fill(Infinity);
    dfs(i, 0, visited);

    visited.forEach((value, index) => {
      if (index === i) return;
      answer[index] = Math.max(answer[index], value);
    });
  }
  const min = Math.min(...answer);
  const winner = [];
  answer.forEach((value, index) => {
    if (value === min) {
      winner.push(index);
    }
  });

  winner.sort((a, b) => a - b);

  console.log(`${min} ${winner.length}\n${winner.join(' ')}`);
};

solution(N, trees)

// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// // let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
// input = input.map(v => v.split(' ').map(Number));
//
// const N = +input.shift();
// const lines = [];
// let inputIdx = 0;
// while (true) {
//     const arr = input[inputIdx++];
//     if (arr[0] === -1 && arr[1] === -1) break;
//
//     lines.push(arr);
// }
//
// const trees = Array.from({length: N + 1}, _ => []);
//
// lines.forEach(([start, end]) => {
//     trees[start].push(end);
//     trees[end].push(start);
// });
//
// const bfs = (now) => {
//     const visited = Array(N + 1).fill(-1);
//     visited[now] = 0;
//     const queue = [[now, 0]];
//
//     for (const [nowNode, cnt] of queue) {
//         if (visited[nowNode] !== -1 && visited[nowNode] < cnt) continue;
//
//         for (const nextNode of trees[nowNode]) {
//             if (visited[nextNode] === -1) {
//                 visited[nextNode] = cnt + 1;
//                 queue.push([nextNode, cnt + 1]);
//             }
//         }
//     }
//     let answer = -1;
//
//     for (let i = 1; i < visited.length; i++) {
//         if (visited[i] === -1) {
//             break;
//         } else {
//             answer = Math.max(answer, visited[i]);
//         }
//     }
//     return answer;
// };
// let answer = [];
// let min = Infinity;
// for (let i = 1; i <= N; i++) {
//     const result = bfs(i);
//     if (result !== -1) {
//         answer.push([result, i]);
//         min = Math.min(min, result);
//     }
// }
// answer = answer.filter(v => v[0] === min).map(v => v[1])
//
// console.log(`${min} ${answer.length}\n${answer.join(' ')}`);