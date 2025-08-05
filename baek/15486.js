let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
input = input.map(v => v.split(' ').map(Number));
const dp = Array(N + 1).fill(0); // N+1 크기 (0일부터 N일까지)

for (let i = 0; i < N; i++) {
    const [time, pay] = input[i];

    // i번째 상담을 하지 않는 경우: 다음 날로 현재까지의 최대값 전달
    dp[i + 1] = Math.max(dp[i + 1], dp[i]);

    // i번째 상담을 하는 경우: 상담이 끝나는 날에 수익 추가
    if (i + time <= N) { // 퇴사 전에 끝날 수 있는 경우만
        dp[i + time] = Math.max(dp[i + time], dp[i] + pay);
    }
}

console.log(dp[N]); // 최종 답