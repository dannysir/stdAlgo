// 플로이드 워셜

let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
input = input.map(v => v.split(' ').map(Number));

const boards = Array.from({length: N}, _ => Array(N).fill(false));

input.forEach(([heavy, light]) => {
    boards[light - 1][heavy - 1] = true;
});

for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (boards[i][k] && boards[k][j]) {
                boards[i][j] = true;
            }
        }
    }
}

let answer = 0;

for (let i = 0; i < N; i++) {
    let heavier = 0;
    let lighter = 0;

    for (let j = 0; j < N; j++) {
        if (boards[i][j]) heavier++;
        if (boards[j][i]) lighter++;
    }

    if (Math.max(heavier, lighter) > Math.floor(N / 2)) {
        answer++;
    }
}

console.log(answer);

// BFS

// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// // let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
//
// const [N, M] = input.shift().split(' ').map(Number);
// input = input.map(v => v.split(' ').map(Number));
// const lightToHeavy = Array.from({length: N + 1}, _ => []);
// const heavyToLight = Array.from({length: N + 1}, _ => []);
//
// input.forEach(([heavy, light]) => {
//     lightToHeavy[light].push(heavy);
//     heavyToLight[heavy].push(light);
// });
//
// const bfs = (n, mode) => {
//     const visited = Array(N + 1).fill(false);
//     visited[n] = 0;
//     const queue = [[n, 0]];
//     const tree = mode === 0 ? lightToHeavy : heavyToLight;
//     let idx = 0;
//     while (queue.length > idx) {
//         const [now, cnt] = queue[idx++];
//
//         for (const next of tree[now]) {
//             if (!visited[next]) {
//                 visited[next] = true;
//
//                 queue.push([next, cnt + 1])
//             }
//         }
//     }
//     return visited.filter(v => v === true).length;
// };
//
// const answer = Array(N + 1).fill(false);
// for (let i = 1; i <= N; i++) {
//     const result = Math.max(bfs(i, 0), bfs(i, 1));
//     if (result > Math.floor(N / 2)) answer[i] = true;
// }
// console.log(answer.filter(v => v === true).length);