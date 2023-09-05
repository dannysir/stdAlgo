let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let n = input.shift();
const str = input.shift().split(' ').map(v => parseInt(v));

let pointerStart = 0;
let pointerEnd = str.length - 1;
let min = Math.abs(str[pointerStart] + str[pointerEnd]);
let answer = `${str[pointerStart]} ${str[pointerEnd]}`;

while (pointerStart < pointerEnd) {
    let sum = str[pointerStart] + str[pointerEnd];
    if (Math.abs(sum) <= min) {
        min = Math.abs(sum);
        answer = `${str[pointerStart]} ${str[pointerEnd]}`;
    }
    if (sum < 0) {
        pointerStart++;
    } else {
        pointerEnd--;
    }
}

console.log(answer);