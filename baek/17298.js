let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
input = input.shift().split(' ').map(Number);

let stack = [];
let answer = [];

for (let i = N - 1; i >= 0 ; i--) {
    while (stack.length) {
        if (stack[stack.length - 1] <= input[i]) {
            stack.pop();
        }else break;
    }
    stack.push(input[i])
    if (stack.length === 1) {
        answer.push(-1);
    } else {
        answer.push(stack[stack.length - 2]);
    }
}
console.log(answer.reverse().join(' '));