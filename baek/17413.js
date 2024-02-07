let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let isOpen = false;

let answer = '';
let reverseArr = [];
for (let i = 0; i < input.length; i++) {
    if (input[i] === '<') {
        isOpen = true;
        if (reverseArr.length) {
            answer += reverseArr.reverse().join('');
            reverseArr = [];
        }
    }
    if (input[i] === '>') {
        isOpen = false;
        answer += `${input[i]}`;
        continue;
    }
    if (isOpen) {
        answer += `${input[i]}`;
    } else {
        if (input[i] === ' ') {
            answer += `${reverseArr.reverse().join('')}`;
            answer += `${input[i]}`;
            reverseArr = [];

        } else {
            reverseArr.push(input[i]);
        }
    }

}
if (reverseArr.length) {
    answer += reverseArr.reverse().join('');
}
console.log(answer);