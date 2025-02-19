let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = Number(input.shift());
input = input.map(v => v.split(' ').map(Number));

const solution = () => {
    input.sort((a, b) => a[0] - b[0]);
    const total = input.reduce((acc, cur) => acc + cur[1], 0);

    let sum = 0;
    let answer = input[input.length - 1][0];
    for (let i = 0; i < N; i++) {
        sum += input[i][1];
        if (sum >= Math.ceil(total / 2)) {
            answer = input[i][0];
            break;
        }
    }
    return answer;
};

console.log(solution());