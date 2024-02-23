let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = input.shift();
let An = input.shift().split(' ').map(Number);
const CalArr = input.shift().split(' ').map(Number);
let MaxStack = [];
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

const MathAnswer = (NumArr, OperatorArr) => {
    let NumResult = [NumArr[0]];
    let OperStack = [];
    for (let i = 0; i < OperatorArr.length; i++) {
        if (OperatorArr[i] === '+') {
            OperStack.push(OperatorArr[i]);
            NumResult.push(NumArr[i + 1]);
        }
        if (OperatorArr[i] === '-') {
            OperStack.push(OperatorArr[i]);
            NumResult.push(NumArr[i + 1]);
        }
        if (OperatorArr[i] === '*') {
            let tmp = NumResult.pop();
            tmp = tmp * NumArr[i + 1];
            NumResult.push(tmp);
        }
        if (OperatorArr[i] === '/') {
            let tmp = NumResult.pop();
            tmp = Math.floor(tmp / NumArr[i + 1]);
            NumResult.push(tmp);
        }
    }
    let result = NumResult[0];
    for (let i = 0; i < OperStack.length; i++) {
        if (OperStack[i] === '+') {
            result += NumResult[i + 1];
        }
        if (OperStack[i] === '-') {
            result -= NumResult[i + 1];
        }
    }
    return result;
};
const solution = (NumArr, Combination) => {
    let max = MathAnswer(NumArr, Combination[0]);
    let min = Number.MAX_VALUE;
    for (const ComItem of Combination) {
        const OutCome = MathAnswer(NumArr, ComItem);
        if (max < OutCome) max = OutCome;
        if (min > OutCome) min = OutCome;
    }
    console.log(`${max}\n${min}`);
};
solution(An, MaxStack);
