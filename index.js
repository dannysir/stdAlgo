let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M, Q] = input.shift().split(' ').map(Number);
const Picture = input.splice(0, N).map(v => v.split(' ').map(Number));
input = input.map(v => v.split(' ').map(Number));

let Board = Array.from({length: N + 1}, _ => Array(M + 1).fill(0));

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        Board[i + 1][j + 1] = Picture[i][j] + Board[i][j + 1] + Board[i + 1][j] - Board[i][j];
    }

}
console.log(Picture);
console.log(Board);