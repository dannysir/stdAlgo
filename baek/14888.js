let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
let NumArr = input.shift().split(' ').map(Number);
let Operators = input.shift().split(' ').map(Number);

let max = -Number.MAX_SAFE_INTEGER;
let min = Number.MAX_SAFE_INTEGER;
const Calculate = (operator) => {
    let result = NumArr[0];
    for (let i = 0; i < operator.length; i++) {
        const Order = operator[i];
        if (Order === 0) {
            result += NumArr[i + 1];
        }else if (Order === 1) {
            result -= NumArr[i + 1];
        }else if (Order === 2) {
            result = NumArr[i + 1] * result;
        }else if (Order === 3) {
            if (result >= 0) {
                result = Math.floor(result / NumArr[i + 1]);
            } else {
                result = -Math.floor(Math.abs(result) / NumArr[i + 1]);
            }
        }
    }
    return result;
};
const Combination = (rest, operator) => {
    if (rest.length === N - 1) {
        let result = Calculate(rest);
        max = max < result ? result : max;
        min = min > result ? result : min;
        return;
    }
    for (let i = 0; i < operator.length; i++) {
        if (operator[i] > 0) {
            rest.push(i);
            operator[i]--;
            Combination(rest, operator);
            operator[i]++;
            rest.pop();
        }
    }
};

Combination([], Operators);
console.log(`${max}\n${min}`);
