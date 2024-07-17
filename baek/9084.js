let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const TEST_CASE = parseInt(input.shift());
let idx = 0;
let answer = [];
for (let i = 0; i < TEST_CASE; i++) {

    const C = parseInt(input[idx++]);
    const COINS = input[idx++].split(' ').map(Number);
    const GOAL = parseInt(input[idx++]);


    let dp = Array.from({length: GOAL + 1}, _ => 0);
    dp[0] = 1;

    for (let i = 0; i < COINS.length; i++) {
        for (let j = 0; j < dp.length; j++) {
            if (COINS[i] <= j) {
                dp[j] += dp[j - COINS[i]];
            }
        }
    }
    answer.push(dp[GOAL]);
}

console.log(answer.join("\n"));