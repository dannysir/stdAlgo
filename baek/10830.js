let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, B] = input.shift().split(' ').map(Number);
const matrix = input.map(v => v.split(' ').map(Number));
const multiMatrix = (A, B) => {
    const newResult = Array.from({length: N}, _ => Array(N).fill(0));

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const targetRow = A[i];

            for (let k = 0; k < targetRow.length; k++) {
                newResult[i][j] = (targetRow[k] * B[k][j] + newResult[i][j]) % 1000;
            }
        }
    }
    return newResult;
};

const dfs = (n) => {
    if (n === 1) {
        return matrix.map(v => [...v]);
    }

    if (n % 2 === 0) {
        const half = dfs(n / 2);
        return multiMatrix(half, half);
    } else {
        const half = dfs(Math.floor(n / 2));
        const result = multiMatrix(half, half);
        return multiMatrix(matrix, result);
    }
};

console.log(dfs(B).map(v => v.map(v => v % 1000).join(' ')).join('\n'));