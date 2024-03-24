let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let [N, M] = input.shift().split(' ').map(Number);
input = input[0].split(' ').map(Number);

let answer = 0;
for (let i = 0; i < input.length; i++) {
    let left = 0;
    let right = 0;
    for (let j = 0; j < i; j++) {
        if (input[j] > left) left = input[j];
    }
    for (let j = i + 1; j < input.length; j++) {
        if (input[j] > right) right = input[j];
    }
    answer += Math.max(Math.min(left, right) - input[i], 0);
}
console.log(answer);
class Class {
    constructor() {

    }
}