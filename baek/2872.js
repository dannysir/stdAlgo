let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n").map(Number);
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = input.shift();

const solution = () => {
    let maxIdx = null;
    let max = N - 1;
    let cnt = 1;
    for (let i = 0; i < N; i++) {
        if (input[i] === N) {
            maxIdx = i;
            break;
        }
    }

    for (let i = maxIdx - 1; i >= 0; i--) {
        if (input[i] === max) {
            cnt++;
            max--;
        }
    }
    console.log(N - cnt);
};
solution();