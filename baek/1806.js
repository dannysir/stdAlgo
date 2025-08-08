let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
input = input.shift().split(' ').map(Number);

let left = 0;
let right = 0;
let sum = input[left];
let min = Infinity;

while (right >= left && left < N && right < N) {
    if (sum < M) {
        sum += input[++right];
    } else {
        min = Math.min(min, right - left + 1);
        sum -= input[left++];
    }
}
console.log(min === Infinity ? 0 : min);
// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split('\n');
// // let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split('\n');
//
// const [N, S] = input.shift().split(' ').map(v => +v);
// input = input[0].split(' ').map(v => +v);
//
// let left = 0;
// let right = 0;
// let sum = input[left];
// let answer = Infinity;
//
// while (left < N) {
//     if (sum >= S) {
//         // S 이상이면 길이 업데이트하고 left 증가
//         answer = Math.min(right - left + 1, answer);
//         sum -= input[left];
//         left++;
//     } else if (right < N - 1) {
//         // 합이 S보다 작고 right를 증가시킬 수 있으면
//         right++;
//         sum += input[right];
//     } else {
//         // 합이 S보다 작고 right를 더 이상 증가시킬 수 없으면
//         sum -= input[left];
//         left++;
//     }
// }
//
// console.log(answer === Infinity ? 0 : answer);