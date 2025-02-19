let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = input.shift().split('').map(Number);
const numCounter = Array(10).fill(0);

let cnt = 1;

for (const num of N) {
    numCounter[num]++;
}

let sixNine = numCounter[6] + numCounter[9];

numCounter[6] = Math.ceil(sixNine / 2);
numCounter[9] = Math.ceil(sixNine / 2);

console.log(Math.max(...numCounter));