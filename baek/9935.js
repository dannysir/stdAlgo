let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let InputString = input.shift().split('');
let Answer = input.shift();
let Stack = [];

const solution = (INPUT, ANSWER) => {
    for (let i = 0; i < INPUT.length; i++) {
        Stack.push(INPUT[i]);
        if (Stack[Stack.length - 1] === ANSWER[ANSWER.length - 1]) {
            if (Stack.slice(-ANSWER.length).join('') === ANSWER) {
                Stack.splice(-ANSWER.length);
            }
        }
    }
    return Stack.length ? Stack.join('') : 'FRULA';
};
console.log(solution(InputString,Answer));