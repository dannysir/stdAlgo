let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split('\n');

const [N, S] = input.shift().split(' ').map(v => +v);
input = input[0].split(' ').map(v => +v);

let left = 0;
let right = 0;
let sum = input[left];
let answer = Infinity;

while (left <= right) {
    if (sum === S) {
        answer = Math.min(right - left + 1, answer);
        right++;
        break;
    }else if (sum > S) {
        sum -= input[left]
        left++;
    }else if (sum < S) {
        right++;
        sum += input[right];
    }
}
console.log(answer === Infinity ? 0 : answer);