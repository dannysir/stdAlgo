let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, M, K] = input.shift().split(' ').map(Number);

let board = input.map(v => v.split(''));

let WhiteBoard = Array.from({length: N + 1}, _ => Array(M + 1).fill(0));
let BlackBoard = Array.from({length: N + 1}, _ => Array(M + 1).fill(0));

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if ((i + j) % 2 === 0) {
            if (board[i][j] === 'W') {
                BlackBoard[i + 1][j + 1] = 1;
            } else {
                WhiteBoard[i + 1][j + 1] = 1;
            }
        } else {
            if (board[i][j] === 'B') {
                BlackBoard[i + 1][j + 1] = 1;
            } else {
                WhiteBoard[i + 1][j + 1] = 1;
            }
        }
    }
}
for (let i = 1; i < N+1; i++) {
    for (let j = 2; j < M+1; j++) {
        WhiteBoard[i][j] = WhiteBoard[i][j] + WhiteBoard[i][j - 1];
        BlackBoard[i][j] = BlackBoard[i][j] + BlackBoard[i][j - 1];
    }
}
for (let i = 2; i < N+1; i++) {
    for (let j = 1; j < M+1; j++) {
        WhiteBoard[i][j] = WhiteBoard[i - 1][j] + WhiteBoard[i][j];
        BlackBoard[i][j] = BlackBoard[i - 1][j] + BlackBoard[i][j];
    }
}
let min = Infinity;
for (let i = K; i < N + 1; i++) {
    for (let j = K; j < M + 1; j++) {
        min = Math.min(min, BlackBoard[i][j] - BlackBoard[i - K][j] - BlackBoard[i][j - K] + BlackBoard[i - K][j - K]);
        min = Math.min(min, WhiteBoard[i][j] - WhiteBoard[i - K][j] - WhiteBoard[i][j - K] + WhiteBoard[i - K][j - K]);
    }
}
console.log(min);
