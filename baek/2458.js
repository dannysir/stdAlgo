let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, M] = input.shift().split(' ').map(Number);
input = input.map(v => v.split(' ').map(Number));
// let GoStraight = Array.from({length: N}, _ => []);
// let GoReverse = Array.from({length: N}, _ => []);
// let TreeCounter = Array.from({length: N}, _ => 0);
// input.forEach(v => {
//     const [Start, End] = v;
//     GoStraight[Start - 1].push(End);
//     GoReverse[End - 1].push(Start);
// });
// const DFS = (now, lines, visited) => {
//     TreeCounter[now] += 1;
//
//     for (let i = 0; i < lines[now].length; i++) {
//         const NEXT = lines[now][i] - 1;
//         if (!visited[NEXT]) {
//             visited[NEXT] = true;
//             DFS(NEXT, lines, visited);
//         }
//     }
// };
// const solution = (lines) => {
//     for (let i = 0; i < N; i++) {
//         let visited = Array.from({length: N}, _ => false);
//         visited[i] = true;
//         DFS(i, lines, visited);
//
//     }
// };
// solution(GoStraight);
// solution(GoReverse);
// console.log(TreeCounter.filter(v => v > N).length);


let table = Array.from({length: N}, _ => Array.from({length: N}, _ => false));
let record = Array.from({length: N}, _ => 0);

input.forEach(v => {
    const [Start, End] = v;
    table[Start - 1][End - 1] = true;
});
for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        for (let k = 0; k < N; k++) {
            if (table[j][i] && table[i][k]) {
                table[j][k] = true;
            }
        }
    }
}

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (table[i][j] || table[j][i]) {
            record[i] += 1;
        }
    }
}

console.log(record.filter(v => v >= N - 1).length);