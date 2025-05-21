let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
const matrix = input.map(v => v.split(' ').map(Number));

// dp[i][j] i번 행렬부터 j번 행렬까지 곱의 최솟값
const dp = Array.from({length: N}, _ => Array(N).fill(Infinity));

// 자기 자신은 곱셈 연산이 필요 없으므로 0
for (let i = 0; i < N; i++) {
    dp[i][i] = 0;
}

// 길이
for (let len = 1; len < N; len++) {
    // 시작점
    for (let i = 0; i + len < N; i++) {
        const j = i + len; // 끝 지점

        // 모든 가능한 분할 지점 k에 대해
        for (let k = i; k < j; k++) {
            // i~k까지의 비용 + (k+1)~j까지의 비용 + 두 행렬 곱셈 비용
            const cost = dp[i][k] + dp[k+1][j] + matrix[i][0] * matrix[k][1] * matrix[j][1];

            // 최소값 갱신
            dp[i][j] = Math.min(dp[i][j], cost);
        }
    }
}

console.log(dp[0][N-1]);