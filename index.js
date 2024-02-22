let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = input.shift();
let An = input.shift().split(' ').map(Number);
const CalArr = input.shift().split(' ').map(Number);
let MaxStack = [];
let MinStack = [];
const MakeMaxStack = (ARR) => {

    for (let i = 0; i < ARR[1]; i++) {
        MaxStack.push('-');
    }
    for (let i = 0; i < ARR[3]; i++) {
        MaxStack.push('/');
    }
    for (let i = 0; i < ARR[0]; i++) {
        MaxStack.push('+');
    }
    for (let i = 0; i < ARR[2]; i++) {
        MaxStack.push('*');
    }
}

const MakeMinStack = (ARR) => {
    for (let i = 0; i < ARR[0]; i++) {
        MinStack.push('+');
    }
    for (let i = 0; i < ARR[3]; i++) {
        MinStack.push('/');
    }
    for (let i = 0; i < ARR[1]; i++) {
        MinStack.push('-');
    }
    for (let i = 0; i < ARR[2]; i++) {
        MinStack.push('*');
    }
}

MakeMaxStack(CalArr);
MakeMinStack(CalArr);
console.log(An);
console.log(MaxStack);
console.log(MinStack);

const MathAnswer = (NumArr, OperatorArr) => {
    let result = 0;
    let tmp = NumArr[NumArr.length - 1];
    for (let i = OperatorArr.length - 1; i >= 0 ; i--) {
        if (OperatorArr[i] === '*') {
            tmp = tmp * NumArr[i];
        }
        if (OperatorArr[i] === '+') {
            result += tmp;
            tmp = NumArr[i];
        }
        if (OperatorArr[i] === '/') {
            tmp = Math.floor(NumArr[i] / tmp);
        }
        if (OperatorArr[i] === '-') {
            result -= tmp;
            tmp = NumArr[i];
        }
    }
    result += tmp;
    console.log(result);
};
MathAnswer(An, MaxStack);
MathAnswer(An, MinStack);
