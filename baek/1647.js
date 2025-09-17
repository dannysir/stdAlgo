let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const roads = input.map(v => v.split(' ').map(Number));
const parent = Array.from({length: N + 1}, (_, index) => index);

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

roads.sort((a, b) => a[2] - b[2]);
let cnt = 0;
let answer = 0;
let max = 0;

for (const [from, to, cost] of roads) {
    if (cnt >= N - 1) break;

    const fromParent = find(from);
    const toParent = find(to);

    if (fromParent !== toParent) {
        union(from, to);
        answer += cost;
        cnt++;
        max = Math.max(max, cost);
    }
}

console.log(answer - max);