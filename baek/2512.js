let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = Number(input[0]);
const plans = input[1].split(' ').map(Number);
const M = Number(input[2]);

plans.sort((a, b) => a - b);

let min = 0;
let max = plans[plans.length - 1];
let answer = 0;

const checkPossible = (arr, budget, limit) => {
    const tmp = arr.reduce((acc, cur) => {
        if (cur <= limit) {
            return acc + cur;
        }else return acc + limit;
    }, 0);
    return tmp <= budget;
}

while (min <= max) {
    const mid = Math.floor((max + min) / 2);
    if (checkPossible(plans, M, mid)) {
        answer = mid;
        min = mid + 1;
    } else {
        max = mid - 1;
    }
}
console.log(answer);