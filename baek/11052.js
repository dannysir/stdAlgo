let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
let CardPrice = input.shift().split(' ').map(Number);
let dp = new Array(N + 1).fill(0).map((value, index) => {
    if (CardPrice[index - 1]) {
        return CardPrice[index - 1];
    } else {
        return 0;
    }
});
for (let i = 2; i < dp.length; i++) {
    let max = 0;
    for (let j = i; j >= Math.ceil(i / 2); j--) {
        max = max < dp[j] + dp[i - j] ? dp[j] + dp[i - j] : max;
    }
    dp[i] = max;
}
console.log(dp[N]);
