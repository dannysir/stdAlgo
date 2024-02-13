let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("-");
input = input.map(v => v.split('+').map(Number).reduce((acc, cur) => acc + cur));

let PlusNumber = input.shift();
let answer = input.reduce((acc, cur) => {
    return acc - cur
}, PlusNumber);
console.log(answer);