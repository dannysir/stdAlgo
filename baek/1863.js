let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
input = input.map(v => v.split(' ').map(Number));
input.sort((a, b) => a[0] - b[0]);
input.push([input[input.length - 1][0] + 1, 0]);
const stack = [];
let answer = 0;

for (const [x, height] of input) {
    while (stack.length) {
        if (stack[stack.length - 1] > height) {
            stack.pop();
            answer++;
        } else if (stack[stack.length - 1] === height) {
            stack.pop();
        } else break;
    }
    stack.push(height);
}

console.log(answer);