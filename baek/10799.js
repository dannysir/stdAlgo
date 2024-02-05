let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let stack = [];
let isLaser = false;
let answer = 0;
for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
        stack.push('(');
        isLaser = true;
    } else {
        if (isLaser) {
            stack.pop();
            answer += stack.length;
            isLaser = false;
        } else {
            stack.pop();
            answer += 1;
        }
    }
}
console.log(answer);