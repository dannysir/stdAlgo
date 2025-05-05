let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
input = input[0].split(' ').map(v => +v);
input.sort((a, b) => a - b);

const accArr = Array(N + 1).fill(0);

for (let i = 1; i < N + 1; i++) {
    accArr[i] = accArr[i - 1] + input[i - 1];
}
let answer = null;
for (let i = 0; i < N; i++) {
    if (accArr[i] + 1 < input[i]) {
        answer = accArr[i] + 1;
        break;
    }
}
console.log(answer === null ? accArr[accArr.length - 1] + 1 : answer);