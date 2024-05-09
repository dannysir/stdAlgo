let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

let N = input.shift().split('').map(Number);

const solution = () => {
    let dp = new Array(N.length + 1).fill(0);
    if (N[0] === 0) return 0;
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i < dp.length; i++) {
        if (N[i - 1] !== 0) {
            dp[i] = (dp[i - 1] + dp[i]) % 1000000;
        }

        dp[i] = N[i - 2] * 10 + N[i - 1] > 26 || N[i - 2] === 0 ? dp[i] % 1000000 : (dp[i] + dp[i - 2]) % 1000000;
    }
    return dp[dp.length - 1];
};

console.log(solution() % 1000000);