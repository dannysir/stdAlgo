let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split('\n');

const N = +input.shift();
input = input[0].split(' ').map(v => +v);
input.sort((a, b) => a - b);

let answer = null;
let minGap = Infinity;

let left = 0;
let right = input.length - 1;

while (left < right) {
    const gap = input[left] + input[right];

    if (Math.abs(gap) < Math.abs(minGap)) {
        minGap = gap;
        answer = [input[left], input[right]];
    }

    if (gap >= 0) {
        right--;
    } else {
        left++;
    }
}

console.log(answer.join(' '));