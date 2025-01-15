let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, K] = input.shift().split(' ').map(Number);
input = input.map(Number);
input.sort((a, b) => b - a);

let left = 0;
let right = input[0];
let answer = 0;

while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let cnt = 0;
    input.forEach(v => {
        cnt += Math.floor(v / mid);
    });

    if (cnt >= K) {
        answer = mid;
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}

console.log(answer);