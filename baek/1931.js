let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = input.shift();
input = input.map(v => v.split(' ').map(Number)).sort((a, b) => {
    if (a[1] === b[1]) {
        return a[0] - b[0];
    } else {
        return a[1] - b[1];
    }
});
const solution = (TIMES) => {
    let max = 0;
    let stack = [];
    for (const time of TIMES) {
        if (stack.length) {
            if (stack[stack.length - 1] <= time[0]) {
                stack.push(time[1]);
            }
        } else {
            stack.push(time[1]);
        }
    }
    console.log(stack.length);
};

solution(input);