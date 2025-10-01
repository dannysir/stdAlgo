function solution(n, tops) {
    var answer = 0;
    const mod = 10_007;
    const dp = Array.from({length : n + 1}, _ => 0);
    dp[0] = 1;
    dp[1] = tops[0] === 1 ? 4 : 3;
    for (let i = 2; i < dp.length; i++) {
        const nowCase = tops[i - 1] === 1 ? 4 : 3;
        dp[i] = (dp[i - 1] * nowCase % mod - dp[i - 2] % mod + mod) % mod;
    }
    console.log(dp);
    return dp[n];
}