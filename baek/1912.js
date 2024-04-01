let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
let Numbers = input.shift().split(' ').map(Number);

for (let i = 1; i < Numbers.length; i++) {
    Numbers[i] = Math.max(Numbers[i], Numbers[i - 1] + Numbers[i]);
}
console.log(Math.max(...Numbers));