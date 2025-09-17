let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
const M = +input.shift();

input = input.map(v => v.split(' ').map(Number));
const table = Array.from({length: N}, () => Array(N).fill(Infinity));

for (let i = 0; i < N; i++) {
    table[i][i] = 0;
}

input.forEach(([from, to, cost]) => {
    table[from - 1][to - 1] = Math.min(table[from - 1][to - 1], cost);
});

for (let mid = 0; mid < N; mid++) {
    for (let from = 0; from < N; from++) {
        for (let to = 0; to < N; to++) {
            if (table[from][mid] !== Infinity && table[mid][to] !== Infinity) {
                table[from][to] = Math.min(table[from][to], table[from][mid] + table[mid][to]);
            }
        }
    }
}

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (table[i][j] === Infinity) {
            table[i][j] = 0;
        }
    }
}

console.log(table.map(v=> v.join(' ')).join('\n'));