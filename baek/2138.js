let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = Number(input.shift());
const inputArray = input.shift().split('').map(Number);
const goal = input.shift().split('').map(Number);

let answer = Number.MAX_SAFE_INTEGER;
const Combination = (changed, prevNeedChange, index, cnt) => {
    if (index === inputArray.length - 1) {
        if (!changed) {
            if (prevNeedChange && inputArray[index] !== goal[index]) {
                answer = Math.min(answer, cnt + 1);
            }
            if (!prevNeedChange && inputArray[index] === goal[index]) {
                answer = Math.min(answer, cnt);
            }
        } else {
            if (prevNeedChange && inputArray[index] === goal[index]) {
                answer = Math.min(answer, cnt + 1);
            }
            if (!prevNeedChange && inputArray[index] !== goal[index]) {
                answer = Math.min(answer, cnt);
            }
        }
        return;
    }

    if (!changed) {
        if (inputArray[index] === goal[index]) {
            if (prevNeedChange) {
                Combination(true, true, index + 1, cnt + 1);
            } else {
                Combination(false, false, index + 1, cnt);
            }
        } else {
            if (prevNeedChange) {
                Combination(true, false, index + 1, cnt + 1);
            } else {
                Combination(false, true, index + 1, cnt);
            }
        }
    } else {
        if (inputArray[index] !== goal[index]) {
            if (prevNeedChange) {
                Combination(true, true, index + 1, cnt + 1);
            } else {
                Combination(false, false, index + 1, cnt);
            }
        } else {
            if (prevNeedChange) {
                Combination(true, false, index + 1, cnt + 1);
            } else {
                Combination(false, true, index + 1, cnt);
            }
        }
    }
};
Combination(false, false, 0, 0);
Combination(false, true, 0, 0);

console.log(answer === Number.MAX_SAFE_INTEGER ? -1 : answer);