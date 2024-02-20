let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = input.shift();
let StackUp = [];
let StackDown = [];
input = input.map(v => v.split(' ').map(Number));
input.sort((a, b) => a[0] - b[0]);

for (let i = 0; i < input.length; i++) {
    if (StackUp.length) {
        if (StackUp[StackUp.length - 1][1] < input[i][1]) {
            StackUp.push(input[i]);
        }
    } else {
        StackUp.push(input[i]);
    }

    while (StackDown.length) {
        if (StackDown[StackDown.length - 1][1] < input[i][1]) {
            StackDown.pop();
        }else break;
    }
    StackDown.push(input[i]);
}
let answer = 0;
for (let i = 0; i < StackUp.length - 1; i++) {
    answer += (StackUp[i + 1][0] - StackUp[i][0]) * StackUp[i][1];
}
for (let i = 0; i < StackDown.length - 1; i++) {
    answer += (StackDown[i + 1][0] - StackDown[i][0]) * StackDown[i + 1][1];
}
console.log(answer + StackDown[0][1]);