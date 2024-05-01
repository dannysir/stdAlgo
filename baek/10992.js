let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const N = parseInt(input.shift());
const STAR = '*';
const SPACE = ' ';
let answer = [];
for (let i = 0; i < N; i++) {
    if (i === 0) {
        answer.push(SPACE.repeat(N - 1) + STAR);
    } else if (i === N - 1) {
        answer.push(STAR.repeat(2 * (N - 1) + 1));
    } else {
        answer.push(SPACE.repeat(N - (i + 1)) + STAR + SPACE.repeat(2 * (i - 1) + 1) + STAR);
    }
}
console.log(answer.join('\n'));

