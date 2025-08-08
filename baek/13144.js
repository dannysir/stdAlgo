let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
input = input.shift().split(' ').map(Number);

const arrSet = new Set();

let answer = 0;
let right = 0;
for (let left = 0; left < N; left++) {
    while (!arrSet.has(input[right]) && right < N) {
        arrSet.add(input[right]);
        right++;
    }
    answer += right - left;
    arrSet.delete(input[left]);
}
console.log(answer);