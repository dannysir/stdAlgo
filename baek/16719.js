let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const WORD = input[0];
const ALPHA_ARR = WORD.split('');

let answer = [];
let visited = Array.from({length: WORD.length}, _ => false);

const Find = (left, right) => {
    if (left === right) {
        return;
    }

    const MIN_VALUE = ALPHA_ARR.slice(left, right).sort()[0];
    const MIN_INDEX = ALPHA_ARR.slice(left, right).indexOf(MIN_VALUE) + left;
    visited[MIN_INDEX] = true;

    let result = "";
    for (let i = 0; i < visited.length; i++) {
        if (visited[i]) {
            result += ALPHA_ARR[i];
        }
    }
    answer.push(result);

    Find(MIN_INDEX + 1, right);
    Find(left, MIN_INDEX);
};

Find(0, WORD.length);
console.log(answer.join("\n"));