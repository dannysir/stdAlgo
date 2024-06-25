let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const N = parseInt(input.shift());
const distance = input[0].split(' ').map(BigInt);
const costs = input[1].split(' ').map(BigInt);

let minPrice = costs[0];
let answer = BigInt(0);
for (let i = 0; i < costs.length - 1; i++) {
    minPrice = minPrice > costs[i] ? costs[i] : minPrice;

    answer += minPrice * distance[i];
}
console.log(String(answer));