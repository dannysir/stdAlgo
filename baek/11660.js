let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input.shift().split(' ').map(Number);
let map = input.splice(0, N).map(v => v.split(' ').map(Number));
let orders = input.splice(0,M).map(v => v.split(' ').map(Number));

let AccMap = Array.from(Array(N + 1), () => new Array(N + 1).fill(0));

for (let i = 1; i < N + 1; i++) {
    for (let j = 1; j < N + 1; j++) {
        AccMap[i][j] = AccMap[i][j - 1] + map[i - 1][j - 1] + AccMap[i - 1][j] - AccMap[i - 1][j - 1];
    }
}

const solution = () => {
    let answer = [];
    for (const order of orders) {
        const [StartX, StartY, EndX, EndY] = order;
        answer.push(AccMap[EndX][EndY] - AccMap[EndX][StartY - 1] - AccMap[StartX - 1][EndY] + AccMap[StartX - 1][StartY - 1]);
    }
    console.log(answer.join('\n'));
};
solution();