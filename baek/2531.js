let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, d, k, c] = input.shift().split(' ').map(Number);
input = input.map(Number);

let slidingWindowObj = [];

let left = 0;
let right = left;

for (let i = 0; i < k; i++) {
    slidingWindowObj.push(input[i]);
    right = i;
}

let max = new Set(slidingWindowObj).size;

while (true) {
    if (left > 0 && left % N === 0) {
        break;
    }

    let tmp = new Set(slidingWindowObj);
    tmp.add(c);
    if (max < tmp.size) {
        max = Math.max(max, tmp.size)
    }

    left++;
    slidingWindowObj.shift();
    slidingWindowObj.push(input[++right % N]);
}
slidingWindowObj.push(c);
max = Math.max(max, new Set(slidingWindowObj).size);
console.log(max);