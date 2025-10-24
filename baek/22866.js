let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
const building = input.shift().split(' ').map(Number);
const result = Array.from({length: N}, () => [0, -1]); // [개수, 가장 가까운 위치]

const stack = [];

// 왼쪽에서 보이는 건물 찾기
for (let i = 0; i < N; i++) {
  while (stack.length && building[stack[stack.length - 1]] <= building[i]) {
    stack.pop();
  }

  result[i][0] += stack.length;
  if (stack.length) {
    result[i][1] = stack[stack.length - 1]; // 가장 가까운 건물 (왼쪽 끝)
  }

  stack.push(i);
}

stack.length = 0;

// 오른쪽에서 보이는 건물 찾기
for (let i = N - 1; i >= 0; i--) {
  while (stack.length && building[stack[stack.length - 1]] <= building[i]) {
    stack.pop();
  }

  result[i][0] += stack.length;
  if (stack.length) {
    const rightNearest = stack[stack.length - 1];
    // 더 가까운 건물로 업데이트
    if (result[i][1] === -1 || rightNearest - i < i - result[i][1]) {
      result[i][1] = rightNearest;
    } else if (rightNearest - i === i - result[i][1]) {
      result[i][1] = Math.min(result[i][1], rightNearest);
    }
  }

  stack.push(i);
}

console.log(result.map(([count, pos]) =>
  count === 0 ? '0' : `${count} ${pos + 1}`
).join('\n'));