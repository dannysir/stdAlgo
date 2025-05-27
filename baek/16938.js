let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, L, R, X] = input.shift().split(' ').map(Number);
const difficult = input.shift().split(' ').map(Number);

const visited = Array(N).fill(false);
const counter = new Set();

const check = (sum, gap) => {
    return L <= sum && sum <= R && X <= gap
}

const combination = (arr, index) => {
    if (arr.length >= 2) {
        arr.sort((a, b) => difficult[a] - difficult[b]);
        const sum = arr.reduce((acc, cur) => acc + difficult[cur], 0);
        const gap = difficult[arr[arr.length - 1]] - difficult[arr[0]];
        if (check(sum, gap)) {
            counter.add(arr.join(','));
        }
    }

    for (let i = index; i < N; i++) {
        if (!visited[i]) {
            visited[i] = true;
            combination([...arr, i], i + 1);
            visited[i] = false;
        }
    }
}
combination([], 0);

console.log(counter.size);