let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input.splice(0, 2).map(Number);
const ROADS = input.splice(0, N).map(v => v.split(' ').map(Number));
const PLAN = input.pop().split(' ').map(Number);

let parent = new Array(N);
for (let i = 0; i < parent.length; i++) {
    parent[i] = i;
}
const FindParent = (item) => {
    if (parent[item] === item) return item;
    parent[item] = FindParent(parent[item]);
    return parent[item];
};

const Union = (A, B) => {
    const aParent = FindParent(A);
    const bParent = FindParent(B);
    if (aParent < bParent) {
        parent[bParent] = aParent;
    } else {
        parent[aParent] = bParent;
    }
};

const solution = (n, road, plan) => {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (road[i][j] === 1) {
                Union(i, j);
            }
        }
    }
    for (let i = 1; i < plan.length; i++) {
        if (FindParent(plan[i] - 1) !== FindParent(plan[i - 1] - 1)) {
            return 'NO';
        }
    }
    return 'YES';
};
console.log(solution(N, ROADS, PLAN));