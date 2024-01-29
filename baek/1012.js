let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
let N = parseInt(input.shift());


// const BFS = (nowX, nowY) => {
//     let LocQueue = [];
//     let dx = [1, -1, 0, 0];
//     let dy = [0, 0, 1, -1];
//     LocQueue.push([nowX, nowY]);
//     while (LocQueue.length) {
//         const [X, Y] = LocQueue.shift();
//         map[X][Y] = 0;
//         for (let i = 0; i < dx.length; i++) {
//             const nextX = X + dx[i];
//             const nextY = Y + dy[i];
//             if (nextY >= SIZE[1] || nextX >= SIZE[0] || nextX <0 || nextY < 0) continue;
//             if (map[nextX][nextY] === 1) {
//                 LocQueue.push([nextX, nextY]);
//             }
//         }
//     }
// };

function DFS(X, Y) {
    let dx = [1, -1, 0, 0];
    let dy = [0, 0, 1, -1];
    map[X][Y] = 0;
    for (let i = 0; i < dx.length; i++) {
        const nextX = X + dx[i];
        const nextY = Y + dy[i];
        if (nextY < SIZE[1] && nextX < SIZE[0] && nextX >= 0 && nextY >= 0){
            if (map[nextX][nextY] === 1) {
                DFS(nextX, nextY);
            }
        }
    }
}

for (let i = 0; i < N; i++) {
    let Answer = 0;
    var SIZE = input.shift().split(' ').map(Number);

    var map = new Array(SIZE[0]);
    for (let i = 0; i < map.length; i++) {
        map[i] = new Array(SIZE[1]).fill(0);

    }
    for (let i = 0; i < SIZE[2]; i++) {
        const [LocX, LocY] = input.shift().split(" ").map(Number);
        map[LocX][LocY] = 1;
    }
    for (let i = 0; i < SIZE[0]; i++) {
        for (let j = 0; j < SIZE[1]; j++) {
            if (map[i][j] === 1) {
                DFS(i, j);
                Answer++;
            }
        }
    }
    console.log(Answer);
}
