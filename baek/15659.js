let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = input.shift();
let An = input.shift().split(' ').map(Number);
const CalArr = input.shift().split(' ').map(Number);
let EveryCombination = [];
const MakeCombination = (Arr, RESULT, INDEX) => {
    let [PLUS, MINUS, MULTI, DIVIDE] = Arr;
    if (INDEX === An.length - 1) {
        EveryCombination.push(RESULT);
        return;
    }
    const NextIndex = INDEX + 1;
    if (PLUS > 0) {
        MakeCombination([PLUS - 1,MINUS,MULTI,DIVIDE], RESULT + '+', NextIndex);
    }
    if (MINUS > 0) {
        MakeCombination([PLUS,MINUS - 1,MULTI,DIVIDE], RESULT + '-', NextIndex);
    }
    if (MULTI > 0) {
        MakeCombination([PLUS,MINUS,MULTI - 1,DIVIDE], RESULT + '*', NextIndex);
    }
    if (DIVIDE > 0) {
        MakeCombination([PLUS,MINUS,MULTI,DIVIDE - 1], RESULT + '/', NextIndex);
    }
}
MakeCombination(CalArr, '', 0);

const Calculate = (NumArr, OperatorArr) => {
    let NumberStack = [NumArr[0]];
    let OperatorStack = [];
    for (let i = 0; i < OperatorArr.length; i++) {
        if (OperatorArr[i] === '+') {
            OperatorStack.push(OperatorArr[i]);
            NumberStack.push(NumArr[i + 1]);
        }
        if (OperatorArr[i] === '-') {
            OperatorStack.push(OperatorArr[i]);
            NumberStack.push(NumArr[i + 1]);
        }
        if (OperatorArr[i] === '*') {
            let tmp = NumberStack.pop();
            tmp = tmp * NumArr[i + 1];
            NumberStack.push(tmp);
        }
        if (OperatorArr[i] === '/') {
            let tmp = NumberStack.pop();
            tmp = Math.floor(tmp / NumArr[i + 1]);
            NumberStack.push(tmp);
        }
    }
    let result = NumberStack[0];
    for (let i = 0; i < OperatorStack.length; i++) {
        if (OperatorStack[i] === '+') {
            result += NumberStack[i + 1];
        }
        if (OperatorStack[i] === '-') {
            result -= NumberStack[i + 1];
        }
    }
    return result;
};
const solution = (NumArr, Combination) => {
    let max = Calculate(NumArr, Combination[0]);
    let min = Number.MAX_VALUE;
    for (const ComItem of Combination) {
        const OutCome = Calculate(NumArr, ComItem);
        if (max < OutCome) max = OutCome;
        if (min > OutCome) min = OutCome;
    }
    console.log(`${max}\n${min}`);
};
solution(An, EveryCombination);
