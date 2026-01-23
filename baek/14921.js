let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
input = input.shift().split(' ').map(Number);

const isCloser = (prev, now) => {
  return Math.abs(prev) > Math.abs(now);
};

const solution = (input, target) => {
  let left = 0;
  let right = input.length - 1;
  let answer = Infinity;
  while (left < right) {
    const sum = input[left] + input[right];

    if (isCloser(answer, sum)) {
      answer = sum;
    }

    if (sum === target) {
      return sum;
    }

    if (sum > target) {
      right--;
      continue;
    }

    if (sum < target) {
      left++;
      continue;
    }
  }

  return answer;
};

console.log(solution(input, 0));