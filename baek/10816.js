let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const InputArr = input[1].split(' ').map(Number);
const AnswerArr = input[3].split(' ').map(Number);
const San = new Map();
let answer = [];
InputArr.forEach(v => {
    if (San.has(v)) {
        San.set(v, San.get(v) + 1);
    } else {
        San.set(v, 1);
    }
});

AnswerArr.forEach(v => {
    if (San.has(v)) {
        answer.push(San.get(v));
    } else {
        answer.push(0);
    }
});
console.log(answer.join(' '));