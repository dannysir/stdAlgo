let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
input = input.map(v => v.split(' ').map(Number));

const lines = [];
const parent = Array.from({length: N}, (_, index) => index);
let answer = 0;

for (let i = 0; i < N; i++) {
    for (let j = 0; j < i; j++) {
        lines.push([i, j, input[i][j]]);
    }
}

lines.sort((a, b) => a[2] - b[2]);

const find = (a) => {
    if (parent[a] !== a) {
        parent[a] = find(parent[a]);
    }
    return parent[a];
};

const union = (a, b) => {
    const aParent = find(a);
    const bParent = find(b);

    if (aParent !== bParent) {
        if (aParent < bParent) {
            parent[bParent] = aParent;
        } else {
            parent[aParent] = bParent
        }
    }
};

for (const [from, to, cost] of lines) {
    if (find(from) !== find(to)) {
        union(from, to);
        answer += cost;
    }
}

console.log(answer);