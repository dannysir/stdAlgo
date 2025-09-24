let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M, X] = input.shift().split(' ').map(Number);
input = input.map(v => v.split(' ').map(Number));

const roads = {};
const table = Array.from({length: N + 1}, (_, x) =>
    Array.from({length: N + 1}, (_, y) => {
        if (x === y) return 0;
        return Infinity;
    })
);


input.forEach(([from, to, cost]) => {
    if (roads[from]) {
        roads[from].push([to, cost]);
    } else {
        roads[from] = [[to, cost]];
    }
    table[from][to] = cost;
});

for (let middle = 0; middle < N + 1; middle++) {
    for (let from = 0; from < N + 1; from++) {
        for (let to = 0; to < N + 1; to++) {
            if (table[from][to] > table[from][middle] + table[middle][to]) {
                table[from][to] = table[from][middle] + table[middle][to];
            }
        }
    }
}

const eachCosts = Array(N + 1).fill(0);

for (let i = 1; i < N + 1; i++) {
    eachCosts[i] = table[i][X] + table[X][i];
}

console.log(Math.max(...eachCosts));