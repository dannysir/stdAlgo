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

// const readline = require("readline");
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });
//
// let input = [];
// let stack = [];
// let isLaser = false;
// const solution = (Arr) => {
//     let cnt = 0;
//     for (const bracket of Arr) {
//         if (bracket === "(") {
//             isLaser = true;
//             stack.push(bracket);
//         } else {
//             if (isLaser) {
//                 stack.pop();
//                 cnt += stack.length;
//                 isLaser = false;
//             } else {
//                 stack.pop();
//                 cnt += 1;
//             }
//         }
//     }
//     console.log(cnt);
// };
// rl.on("line", function (line) {
//     input = line.split('');
//     rl.close();
// }).on("close", function () {
//     solution(input);
//     process.exit;
// });