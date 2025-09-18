let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [H, W, N, M] = input.shift().split(' ').map(Number);

console.log(Math.ceil(H / (N + 1)) * Math.ceil(W / (M + 1)));