const n = 5;
const money = [1, 2, 5];

function solution(n, money) {
    var answer = 0;
    const dp = Array(n + 1).fill(0);
    const mod = 1_000_000_007;
    dp[0] = 1;
    for (const coin of money) {
        for (let i = 1; i <= n; i++) {
            if (i >= coin) {
                dp[i] = (dp[i] + dp[i - coin]) % mod;
            }
        }
    }
    return dp[n] % mod;
}

console.log(solution(n, money));