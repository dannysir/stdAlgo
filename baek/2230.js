let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
input = input.map(Number);
input.sort((a, b) => a - b);

let left = 0;
let right = left;
const answer = [];

while (right < input.length && left <= right) {
    const gap = input[right] - input[left];

    if (gap < M) {
        right++;
        continue;
    }else if (gap >= M) {
        left++;
        answer.push(gap);
        continue;
    }
}

console.log(Math.min(...answer));
