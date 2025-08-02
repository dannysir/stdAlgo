let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

input = input.map(v => v.split(' ').map(Number));

const [N, M] = input.shift();

input.sort((a, b) => a[2] - b[2]);

const parent = Array.from({length: N + 1}, (_, index) => index);
let answer = 0;
let cnt = 0;

const find = (a) => {
    if (parent[a] !== a) {
        parent[a] = find(parent[a]);
    }
    return parent[a];
};

const union = (a, b) => {
    const aParent = find(a);
    const bParent = find(b);

    if (aParent < bParent) {
        parent[bParent] = aParent;
    } else {
        parent[aParent] = bParent;
    }
};

for (const [from, to, cost] of input) {
    const fromParent = find(from);
    const toParent = find(to);

    if (fromParent !== toParent) {
        union(from, to);
        answer += cost;
        cnt++;
        if (cnt === N - 1) break;
    }
}

console.log(answer);