let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim();
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const Combination = (Arr) => {
    let result = new Set();
    for (let i = 0; i < Arr.length; i++) {
        for (let j = i + 1; j < Arr.length + 1; j++) {
            result.add(Arr.slice(i, j));
        }
    }
    console.log(result.size);
};
Combination(input);