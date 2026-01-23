let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const [A, B] = input.map(v => v.split(' ').map(Number).sort((a, b) => a - b));

const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;
  let answer = false;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      answer = true;
      break;
    }

    if (arr[mid] > target) {
      right = mid - 1;
      continue;
    }

    if (arr[mid] < target) {
      left = mid + 1;
      continue;
    }
  }

  return answer;
};

const solution = (A, B) => {
  const answer = [];

  for (const a of A) {
    const flag = binarySearch(B, a);
    if (flag) continue;

    answer.push(a);
  }

  console.log(`${answer.length}\n${answer.join(' ')}`);
};

solution(A, B);
