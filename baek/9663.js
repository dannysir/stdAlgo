let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
let nQueen = new Array(N).fill(-1);
let answer = 0;
const Check = (now) => {
    for (let i = 0; i < now; i++) {
        if (nQueen[now] === nQueen[i] || Math.abs(nQueen[now] - nQueen[i]) === now - i) {
            return false;
        }
    }
    return true;
};
const DFS = (Index) => {
    if (Index === nQueen.length) {
        answer += 1;
        return;
    }
    for (let i = 1; i < N + 1; i++) {
        nQueen[Index] = i;
        if (Check(Index)) {
            DFS(Index + 1);
        }
    }

};

DFS(0);
console.log(answer);