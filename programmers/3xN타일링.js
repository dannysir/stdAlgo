function solution(n) {
    var answer = 0;
    const MOD = 1_000_000_007;
    const dp = Array(n + 1).fill(1);
    dp[2] = 3;
    dp[4] = dp[4 - 2] * 3 + dp[4 - 4] * 2;
    for (let i = 4; i < dp.length; i++) {
        if (i % 2 === 0) {
            dp[i] = (dp[i - 2] * 3) % MOD;
            for (let j = 4; j <= i; j += 2) {
                dp[i] = (dp[i] + dp[i - j] * 2) % MOD;
            }
        }

    }
    return dp[n];
}