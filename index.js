let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = input.shift();
let An = input.shift().split(' ').map(Number);
const CalArr = input.shift().split(' ').map(Number);
let MaxStack = [];
let MinStack = [];
console.log(CalArr);
const MakeCombination = (Arr, RESULT, INDEX) => {
    let [PLUS, MINUS, MULTI, DIVID] = Arr;
    if (INDEX === An.length - 1) {
        MaxStack.push(RESULT);
        return;
    }
    const NextIndex = INDEX + 1;
    if (PLUS > 0) {
        MakeCombination([PLUS - 1,MINUS,MULTI,DIVID], RESULT + '+', NextIndex);
    }
    if (MINUS > 0) {
        MakeCombination([PLUS,MINUS - 1,MULTI,DIVID], RESULT + '-', NextIndex);
    }
    if (MULTI > 0) {
        MakeCombination([PLUS,MINUS,MULTI - 1,DIVID], RESULT + '*', NextIndex);
    }
    if (DIVID > 0) {
        MakeCombination([PLUS,MINUS,MULTI,DIVID - 1], RESULT + '/', NextIndex);
    }
}
MakeCombination(CalArr, '', 0);
console.log(MaxStack);
console.log(An);
// const MakeMaxStack = (ARR) => {
//
//     for (let i = 0; i < ARR[1]; i++) {
//         MaxStack.push('-');
//     }
//     for (let i = 0; i < ARR[3]; i++) {
//         MaxStack.push('/');
//     }
//     for (let i = 0; i < ARR[0]; i++) {
//         MaxStack.push('+');
//     }
//     for (let i = 0; i < ARR[2]; i++) {
//         MaxStack.push('*');
//     }
// }
//
// const MakeMinStack = (ARR) => {
//     for (let i = 0; i < ARR[0]; i++) {
//         MinStack.push('+');
//     }
//     for (let i = 0; i < ARR[3]; i++) {
//         MinStack.push('/');
//     }
//     for (let i = 0; i < ARR[1]; i++) {
//         MinStack.push('-');
//     }
//     for (let i = 0; i < ARR[2]; i++) {
//         MinStack.push('*');
//     }
// }

// const MathAnswer = (NumArr, OperatorArr) => {
//     let result = 0;
//     let tmp = NumArr[NumArr.length - 1];
//     for (let i = OperatorArr.length - 1; i >= 0 ; i--) {
//         if (OperatorArr[i] === '*') {
//             tmp = tmp * NumArr[i];
//         }
//         if (OperatorArr[i] === '+') {
//             result += tmp;
//             tmp = NumArr[i];
//         }
//         if (OperatorArr[i] === '/') {
//             tmp = Math.floor(NumArr[i] / tmp);
//         }
//         if (OperatorArr[i] === '-') {
//             result -= tmp;
//             tmp = NumArr[i];
//         }
//     }
//     result += tmp;
//     console.log(result);
// };
// MathAnswer(An, MaxStack);
// MathAnswer(An, MinStack);
