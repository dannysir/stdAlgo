let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, M] = input[0].split(' ').map(v => Number(v));

const answer = [];

const Combination = (arr) =>{
    if (arr.length === M) {
        return answer.push(arr.join(' '));
    }

    for (let i = 1; i <= N; i++) {
        Combination([...arr, i]);
    }
}
Combination([]);
console.log(answer.join('\n'));