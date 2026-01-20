let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const T = +input.shift();
const tests = input.map(Number);

const solution = (n) => {
  const dp = Array.from({length: n + 1}, _ => 0);
  dp[n] = 1;

  for (let i = n; i > 1; i--) {
    const now = dp[i];

    dp[i - 1] += now;
    dp[i - 2] += now;
  }

  return Array.from({length: 2}, (_, index) => {
    if (dp[index]) {
      return dp[index];
    }else return 0;
  }).join(' ');
};

const answer = [];

for (let i = 0; i < T; i++) {
  const n = tests[i];
  answer.push(solution(n));
}

console.log(answer.join('\n'));
