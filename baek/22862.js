let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, K] = input.shift().split(' ').map(Number);
const arr = input.shift().split(' ').map(Number);

let left = 0;
let right = 0;
let cnt = arr[left] % 2;
let max = right - left + 1 - cnt;


while (left <= right && right < arr.length - 1) {
  right++;
  cnt += arr[right] % 2;

  while (cnt > K) {
    cnt -= arr[left++] % 2
  }

  max = Math.max(max, right - left + 1 - cnt);
}

console.log(max);