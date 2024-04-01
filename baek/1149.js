let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
let house = input.map(v => v.split(' ').map(Number));

let dp = Array.from({length: 3}, (_) => Array.from({length: N}, (_) => 0));

for (let i = 1; i < N; i++) {
    house[i][0] = house[i][0] + Math.min(house[i - 1][1], house[i - 1][2]);
    house[i][1] = house[i][1] + Math.min(house[i - 1][0], house[i - 1][2]);
    house[i][2] = house[i][2] + Math.min(house[i - 1][0], house[i - 1][1]);
}
console.log(Math.min(...house[N - 1]));
