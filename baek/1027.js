let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
const building = input.shift().split(' ').map(Number);

let answer = 0;

for (let i = 0; i < N; i++) {
    let leftMax = Infinity;
    let leftCnt = 0;
    let rightMax = -Infinity;
    let rightCnt = 0;

    for (let j = i - 1; j >= 0; j--) {
        let slope = (building[i] - building[j]) / (i - j);
        if (slope < leftMax) {
            leftMax = slope;
            leftCnt++;
        }
    }

    for (let j = i + 1; j < N; j++) {
        let slope = (building[j] - building[i]) / (j - i);
        if (slope > rightMax) {
            rightMax = slope;
            rightCnt++;
        }
    }

    answer = Math.max(answer, leftCnt + rightCnt);
}

console.log(answer);