let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
let map = input.map(v => v.split(' ').map(Number));
let answer = 0;
const DFS = (StartX, StartY, EndX, EndY) => {
    if (EndX === N - 1 && EndY === N - 1) {
        answer++;
        return;
    }
    if (StartX === EndX && StartY < EndY) {
        if (EndY + 1 < N && map[EndX][EndY + 1] !== 1) {
            DFS(EndX, EndY, EndX, EndY + 1);
        }
        if (EndY + 1 < N && EndX + 1 < N && map[EndX][EndY + 1] !== 1 && map[EndX + 1][EndY + 1] !== 1 && map[EndX + 1][EndY] !== 1) {
            DFS(EndX, EndY, EndX + 1, EndY + 1);
        }
    }else if (StartX < EndX && StartY === EndY) {
        if (EndX + 1 < N && map[EndX + 1][EndY] !== 1) {
            DFS(EndX, EndY, EndX + 1, EndY);
        }
        if (EndY + 1 < N && EndX + 1 < N && map[EndX][EndY + 1] !== 1 && map[EndX + 1][EndY + 1] !== 1 && map[EndX + 1][EndY] !== 1) {
            DFS(EndX, EndY, EndX + 1, EndY + 1);
        }
    } else {
        if (EndX + 1 < N && map[EndX + 1][EndY] !== 1) {
            DFS(EndX, EndY, EndX + 1, EndY);
        }
        if (EndY + 1 < N && map[EndX][EndY + 1] !== 1) {
            DFS(EndX, EndY, EndX, EndY + 1);
        }
        if (EndY + 1 < N && EndX + 1 < N && map[EndX][EndY + 1] !== 1 && map[EndX + 1][EndY + 1] !== 1 && map[EndX + 1][EndY] !== 1) {
            DFS(EndX, EndY, EndX + 1, EndY + 1);
        }
    }
};

DFS(0, 0, 0, 1);
console.log(answer);