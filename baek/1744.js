let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
input = input.map(Number);
input.sort((a, b) => a - b);
let plus = input.filter(v => v > 0);
let zero = input.filter(v => v === 0);
let minus = input.filter(v => v < 0);
let answer = 0;

while (plus.length) {
    let tmp = 0;
    if (plus.length > 1) {
        const First = plus.pop();
        const Second = plus.pop();
        if (First * Second > First + Second) {
            tmp = First * Second;
        } else {
            plus.push(Second);
            tmp = First;
        }
    } else {
        tmp = plus.pop();
    }
    answer += tmp;
}
while (minus.length) {
    let tmp = 0;
    if (minus.length > 1) {
        const First = minus.shift();
        const Second = minus.shift();
        tmp += First * Second;
    } else {
        if (zero.length) {
            zero.pop();
            minus.pop();
        } else {
            tmp += minus.pop();
        }
    }
    answer += tmp;
}
console.log(answer);