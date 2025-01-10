let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const N = Number(input.shift());
input = input.shift().split(' ').map(Number);

const stack = [];
const answer = [];

for (let i = 0; i < N; i++) {
    if (stack.length !== 0) {
        while (stack.length > 0) {
            if (input[stack[stack.length - 1]] <= input[i]) {
                stack.pop();
            } else break;
        }
    }

    stack.push(i);
    if (stack.length === 1) {
        answer.push(0);
    } else {
        answer.push(stack[stack.length - 2] + 1);
    }
}
console.log(answer.join(' '));
// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// // let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// let N = input.shift();
// input = input.shift().split(' ').map(Number);
//
// let MonotonicStack = [];
// let answer = [];
//
// for (let i = 0; i < input.length; i++) {
//     if (MonotonicStack.length !== 0) {
//         while (MonotonicStack.length) {
//             if (input[MonotonicStack[MonotonicStack.length - 1]] <= input[i]) {
//                 MonotonicStack.pop();
//             }else {
//                 break;
//             }
//         }
//     }
//     MonotonicStack.push(i);
//     if (MonotonicStack.length === 1) {
//         answer.push(0);
//     } else {
//         answer.push(MonotonicStack[MonotonicStack.length - 2] + 1);
//     }
// }
// console.log(answer.join(' '));