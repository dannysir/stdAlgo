let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const n = input.shift();
input = input.map(Number);
const stack = [];
let answer = 0;

for (let i = 0; i < input.length; i++) {
    while (stack.length) {
        if (stack[stack.length - 1] < input[i]) {
            stack.pop();
        }else break;
    }

    stack.push(input[i]);
    answer += stack.length - 1;
}

console.log(answer);