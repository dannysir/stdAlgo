let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
let map = input.map(v => v.split(' ').map(Number));
// 각각의 위치의 [가로, 세로, 대각] 갯수로 저장.
let Pipes = new Array(N).fill(0).map(v => new Array(N).fill(0).map(v => new Array(3).fill(0)));
for (let i = 1; i < N; i++) {
    if (map[0][i] === 1) break;
    Pipes[0][i][0] = 1;
}
const solution = () => {
    for (let i = 1; i < N; i++) {
        for (let j = 1; j < N; j++) {
            if (map[i][j] === 1) continue;
            Pipes[i][j][0] = Pipes[i][j - 1][0] + Pipes[i][j - 1][2];
            Pipes[i][j][1] = Pipes[i - 1][j][1] + Pipes[i - 1][j][2];
            if (map[i][j - 1] === 1 || map[i - 1][j] === 1) continue;
            Pipes[i][j][2] = Pipes[i - 1][j - 1][0] + Pipes[i - 1][j - 1][1] + Pipes[i - 1][j - 1][2];
        }
    }
};
solution();
console.log(Pipes[N - 1][N - 1].reduce((acc, cur) => acc + cur, 0));

// let answer = 0;
// const DFS = (StartX, StartY, EndX, EndY) => {
//     if (EndX === N - 1 && EndY === N - 1) {
//         answer++;
//         return;
//     }
//     if (StartX === EndX && StartY < EndY) {
//         if (EndY + 1 < N && map[EndX][EndY + 1] !== 1) {
//             DFS(EndX, EndY, EndX, EndY + 1);
//         }
//         if (EndY + 1 < N && EndX + 1 < N && map[EndX][EndY + 1] !== 1 && map[EndX + 1][EndY + 1] !== 1 && map[EndX + 1][EndY] !== 1) {
//             DFS(EndX, EndY, EndX + 1, EndY + 1);
//         }
//     }else if (StartX < EndX && StartY === EndY) {
//         if (EndX + 1 < N && map[EndX + 1][EndY] !== 1) {
//             DFS(EndX, EndY, EndX + 1, EndY);
//         }
//         if (EndY + 1 < N && EndX + 1 < N && map[EndX][EndY + 1] !== 1 && map[EndX + 1][EndY + 1] !== 1 && map[EndX + 1][EndY] !== 1) {
//             DFS(EndX, EndY, EndX + 1, EndY + 1);
//         }
//     } else {
//         if (EndX + 1 < N && map[EndX + 1][EndY] !== 1) {
//             DFS(EndX, EndY, EndX + 1, EndY);
//         }
//         if (EndY + 1 < N && map[EndX][EndY + 1] !== 1) {
//             DFS(EndX, EndY, EndX, EndY + 1);
//         }
//         if (EndY + 1 < N && EndX + 1 < N && map[EndX][EndY + 1] !== 1 && map[EndX + 1][EndY + 1] !== 1 && map[EndX + 1][EndY] !== 1) {
//             DFS(EndX, EndY, EndX + 1, EndY + 1);
//         }
//     }
// };
//
// DFS(0, 0, 0, 1);
// console.log(answer);