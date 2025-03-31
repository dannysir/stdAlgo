let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split('\n');

const N = +input[0];
const numArr = input[1].split(' ').map(v => +v);
const X = +input[2];

numArr.sort((a, b) => a - b);

let left = 0;
let right = numArr.length - 1;
let cnt = 0;
while (left < right) {
    const sum = numArr[left] + numArr[right];

    if (sum === X) {
        cnt++;
        left++;
    }
    if (sum > X) {
        right--;
    }
    if (sum < X) {
        left++;
    }
}

console.log(cnt);