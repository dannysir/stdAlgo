let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n").map(Number);
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let n = input.shift();
let Stack = [];
let answer = 0;
for (let i = 0; i < input.length; i++) {
    while (Stack.length) {
        if (Stack[Stack.length - 1] <= input[i]) {
            Stack.pop();
        }else break;
    }
    Stack.push(input[i]);
    answer += Stack.length - 1;
}

console.log(answer);
// let answer = 0;
//
// input.forEach((Value, Index) => {
//     let cnt = 0;
//     if (Index !== input.length - 1) {
//         for (let i = Index + 1; i < input.length; i++) {
//             if (Value > input[i]) {
//                 cnt++;
//             }else break;
//         }
//         answer += cnt;
//     }else {
//         answer += cnt;
//     }
//
// });
// console.log(answer);