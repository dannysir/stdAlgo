let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
let Combinations = [];
const Combination = (Arr, Index, Target) => {
    if (Arr.length === Target) {
        Combinations.push(parseInt(Arr.sort((a,b) => b-a).join('')));
        return;
    }
    for (let i = Index; i < 10; i++) {
        Combination([...Arr, i], i + 1, Target);
    }
};

const solution = () => {
    for (let i = 1; i <= 10; i++) {
        Combination([], 0, i);
    }
    Combinations.sort((a, b) => a - b);

    if (N > 1022) {
        console.log(-1);
    } else {
        console.log(Combinations[N]);
    }
};

solution();