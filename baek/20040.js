let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");

// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
input = input.map(v => v.split(' ').map(Number));

const parent = Array.from({length: N}, (_, index) => index);

const find = (now) => {
    if (parent[now] === now) return now;
    return find(parent[now]);
};

const union = (a, b) => {
    const aParent = find(a);
    const bParent = find(b);
    if (aParent < bParent) {
        parent[bParent] = aParent;
    }else {
        parent[aParent] = bParent;
    }
};

const solution = () => {
    for (let i = 0; i < M; i++) {
        const [start, end] = input[i];
        if (find(start) === find(end)) {
            console.log(i + 1);
            return;
        } else {
            union(start, end);
            continue;
        }
    }
    console.log(0);
    return;
};

solution();