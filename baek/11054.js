let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
input = input.shift().split(' ').map(Number);
let UpDp = new Array(N).fill(1);
let DownDP = new Array(N).fill(1);
let answer = 0;

for (let i = 1; i < UpDp.length - 1; i++) {
    for (let j = 0; j < i; j++) {
        if (input[i] > input[j]) {
            UpDp[i] = Math.max(UpDp[i], UpDp[j] + 1);
        }
    }
}
for (let i = DownDP.length - 2; i >= 0; i--) {
    for (let j = DownDP.length - 1; j > i; j--) {
        if (input[i] > input[j]) {
            DownDP[i] = Math.max(DownDP[i], DownDP[j] + 1);
        }
    }
}
UpDp.forEach((value, index) => {
    answer = value + DownDP[index] > answer ? value + DownDP[index] : answer;
});
console.log(answer - 1);