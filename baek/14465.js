let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// let [N, K, B] = input.shift().split(' ').map(Number);
// input = input.map(Number);
// let roads = new Array(N + 1).fill(0);
// roads[0] = 0;
//
// for (let i = 0; i < B; i++) {
//     roads[input[i]] = 1;
// }
// let max = 0;
// for (let i = 1; i <= K; i++) {
//     max += roads[i];
// }
// for (let i = 0; i <= N - K; i++) {
//     let tmp = max + roads[i + K] - roads[i];
//     max = Math.min(tmp, max);
// }
// console.log(max);

let [N, K, B] = input.shift().split(' ').map(Number);
input = input.map(Number);
let roads = new Array(N + 1).fill(1);
roads[0] = 0;

for (let i = 0; i < B; i++) {
    roads[input[i]] = 0;
}
let lights = roads.slice(1, K + 1).reduce((acc, cur) => {
    return acc + cur;
}, 0);
let max = Number.MIN_SAFE_INTEGER;
for (let j = K + 1; j <= N; j++) {
    if (roads[j]) lights++;
    if (roads[j - K]) lights--;
    max = Math.max(max, lights);
}
console.log(K - max);

