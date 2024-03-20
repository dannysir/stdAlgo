let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const Numbers = input.shift().split(' ').map(Number);
input = input.map(v => v.split(' ').map(Number));
let AccNum = new Array(N + 1).fill(0);
let answer = [];

for (let i = 1; i < AccNum.length; i++) {
    AccNum[i] += AccNum[i - 1] + Numbers[i - 1];
}
const solution = (INPUT) => {
    for (const inputElement of INPUT) {
        const [Start, End] = inputElement;
        answer.push(AccNum[End] - AccNum[Start - 1]);
    }
    console.log(answer.join('\n'));
};
solution(input);