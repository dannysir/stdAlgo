let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, S] = input.shift().split(' ').map(Number);
input = input.shift().split(' ').map(Number);
let InputNum = new Array(input.length + 1).fill(0);

let min = input.length + 3;
for (let i = 0; i < input.length; i++) {
    InputNum[i + 1] += InputNum[i] + input[i];
}
for (let i = InputNum.length - 1; i > 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
        if (InputNum[i] - InputNum[j] >= S) {
            if (i - j < min) min = i - j;
            break;
        }
    }
}
min = min === input.length + 3 ? 0 : min;
console.log(min);

