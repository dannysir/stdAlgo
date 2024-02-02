let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());

let answer = input.shift().split(' ').map(Number).sort((a, b) => a - b);
let M = parseInt(input.shift());
input = input.shift().split(' ').map(Number);
let arr = '';
function isThere(item) {
    let start = 0;
    let end = answer.length - 1;

    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        if (item > answer[mid]) {
            start = mid + 1;
        } else if (item < answer[mid]) {
            end = mid - 1;
        } else {
            // 아이템이 중간에 발견됨
            return 1;
        }
    }

    return 0;
}
for (let i = 0; i < input.length; i++) {
    arr += `${isThere(input[i])}\n`;
}
console.log(arr);
