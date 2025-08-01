let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
input = input.map(v => v.split(' ').map(Number));

const trees = Array.from({length: N + 1}, _ => Array(2).fill(-1));

input.forEach(([now, left, right]) => {
    [trees[now][0], trees[now][1]] = [left, right];
});

const visited = Array(N + 1).fill(false);
let cnt = 0;

const dfs = (now) => {
    if (trees[now][0] !== -1) {
        cnt++;
        dfs(trees[now][0]);
        cnt++;
    }

    if (trees[now][1]  !== -1) {
        cnt++;
        dfs(trees[now][1]);
        cnt++;
    }
};

const findRight = (now) => {
    if (trees[now][1] !== -1) {
        cnt--;
        findRight(trees[now][1]);
    }
};

dfs(1);
findRight(1);
console.log(cnt);