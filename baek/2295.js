let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
input = input.map(Number);
input.sort((a, b) => a - b);
const sumSet = new Set();

for (let i = 0; i < N; i++) {
    for (let j = i; j < N; j++) {
        sumSet.add(input[i] + input[j]);
    }
}

const sumArr = [...sumSet];
sumArr.sort((a, b) => a - b);
const solution = () => {
    for (let i = N - 1; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            const K = input[i];
            const Z = input[j];
            const target = K - Z;
            let left = 0;
            let right = sumArr.length - 1;

            while (left <= right) {
                const mid = Math.floor((left + right) / 2);

                if (sumArr[mid] === target) {
                    console.log(K);
                    return;
                } else if (sumArr[mid] > target) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }
        }
    }
};
solution();