function solution(m, n, puddles) {
    var answer = 0;
    const T = 1_000_000_007;
    const dp = Array.from({length : n + 1}, _ => Array(m + 1).fill(0));
    dp[1][1] = 1;
    puddles.forEach(([y, x]) => {
        dp[x][y] = -1;
    });


    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < m + 1; j++){
            if (dp[i][j] !== -1){
                dp[i][j] = (dp[i - 1][j] + dp[i][j] + dp[i][j - 1]) % T;
            }else {
                dp[i][j] = 0;
            }
        }
    }

    return dp[n][m] % T;
}