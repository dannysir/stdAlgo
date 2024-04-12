let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, M] = input.shift().split(' ').map(Number);
let visited = new Array(N).fill(false);
let San = [];
let answer = [];
const Combination = (Index) => {
    if (Index === M) {
        answer.push(San.join(' '));
        return;
    }
    let Start = Index === 0 ? 1 : San[Index - 1];
    for (let i = Start; i < N + 1; i++) {
        if (!visited[i - 1]) {
            San[Index] = i;
            visited[i - 1] = true;
            Combination(Index + 1)
            visited[i - 1] = false;
        }
    }

};
Combination(0);
console.log(answer.join('\n'));