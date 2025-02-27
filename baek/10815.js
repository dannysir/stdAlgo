let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = Number(input.shift());
const myArr = input.shift().split(' ').map(Number);
const M = Number(input.shift());
const findArr = input.shift().split(' ').map(Number);

myArr.sort((a, b) => a - b);

const answer = Array(M).fill(0);

const find = (target) => {
    let left = 0;
    let right = myArr.length - 1;
    if (target === myArr[left] || target === myArr[right]) return true;
    let flag = false;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (myArr[mid] === target) {
            flag = true;
            break;
        }
        if (myArr[mid] > target) {
            right = mid - 1;
            continue;
        } else {
            left = mid + 1;
            continue;
        }
    }
    return flag;
};

findArr.forEach((value, index) => {
    if (find(value)) {
        answer[index] = 1;
    }
});

console.log(answer.join(' '));