let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, K] = input.shift().split(' ').map(Number);
const TallArr = input[0].split(' ').map(Number);
let GapArr = Array.from({length: N}, _ => 0);

for (let i = 0; i < N - 1; i++) {
    GapArr[i] = TallArr[i + 1] - TallArr[i];
}

GapArr.sort((a, b) => b - a);
GapArr.splice(0, K - 1);

console.log(GapArr.reduce((acc, cur) => {
    return acc + cur;
}, 0));