let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const trees = input.shift().split(' ').map(Number);
trees.sort((a, b) => a - b);

let left = 0;
let right = trees[trees.length - 1];
let answer = 0;
[].reduce((acc, cur, ) => {})
const san = [1,2,3].map((v, index) => {})
while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let sum = 0;

    for (let tree of trees) {
        if (tree > mid) {
            sum += tree - mid;
        }
    }

    if (sum >= M) {
        answer = mid;
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}
console.log(answer);