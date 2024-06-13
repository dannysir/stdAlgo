let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const N = input.shift();
let inputArr = input[0].split(' ').map(Number).reverse();
let stack = [];


for (let i = 1; i <= parseInt(N); i++) {
    while (true) {
        if (inputArr.length === 0 && stack.length === 0) {
            break;
        }
        if (stack[stack.length - 1] === i) {
            stack.pop();
            break;
        } else if (inputArr[inputArr.length - 1] === i) {
            inputArr.pop();
            break;
        } else if (inputArr.length) {
            stack.push(inputArr.pop());
        } else {
            break;
        }
    }
}
let answer = stack.length === 0 && inputArr.length === 0 ? "Nice" : "Sad";
console.log(answer);