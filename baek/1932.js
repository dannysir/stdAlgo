let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
let pyramid = input.map(v => v.split(' ').map(Number));


for (let i = 1; i < pyramid.length; i++) {
    for (let j = 0; j < pyramid[i].length; j++) {
        if (j === 0) {
            pyramid[i][j] = pyramid[i - 1][j] + pyramid[i][j];
        }else if (j === pyramid[i].length - 1) {
            pyramid[i][j] = pyramid[i - 1][j - 1] + pyramid[i][j];
        } else {
            pyramid[i][j] = pyramid[i][j] + Math.max(pyramid[i - 1][j - 1], pyramid[i - 1][j]);
        }
    }
}
console.log(Math.max(...pyramid[N - 1]));