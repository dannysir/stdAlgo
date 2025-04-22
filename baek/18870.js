let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
input = input[0].split(' ').map(Number);
const copyArr = [...new Set(input)];
const countMap = new Map();

copyArr.sort((a, b) => a - b);

for (let i = 0; i < N; i++) {
    if (countMap.has(copyArr[i])) continue;

    countMap.set(copyArr[i], i);
}

const answer = Array.from({length: N}, (_, index) => {
    const num = input[index];
    return countMap.get(num);
})

console.log(answer.join(' '));