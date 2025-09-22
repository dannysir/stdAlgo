let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, D] = input.shift().split(' ').map(Number);
input = input.map(v => v.split(' ').map(Number));

const dp = Array(D + 1).fill(Infinity);
const roads = {};
input.forEach(([from, to, cost]) => {
    if (roads[from]) {
        roads[from].push([to, cost]);
    }else roads[from] = [[to, cost]];
});

dp[0] = 0;

for (let i = 0; i < dp.length; i++) {
    if (i !== 0) {
        dp[i] = Math.min(dp[i], dp[i - 1] + 1);
    }
    if (roads[i]) {
        for (const [to, cost] of roads[i]) {
            dp[to] = Math.min(dp[to], dp[i] + cost);
        }
    }
}
console.log(dp[D]);