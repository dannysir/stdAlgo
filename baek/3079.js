let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, M] = input.shift().split(' ').map(Number);
const TIMES = input.map(Number);

TIMES.sort((a, b) => a - b);
let min = 1;
let max = TIMES[TIMES.length - 1] * M;
let answer = max;
while (min <= max) {
    let cnt = 0;
    let mid = Math.floor((max + min) / 2);
    TIMES.forEach(time => {
        cnt += Math.floor(mid / time);
    });
    if (mid === max) {
        console.log(min, max, mid);
        console.log(String(max).length);
        break;
    }
    if (cnt >= M) {
        answer = Math.min(answer, mid);
        max = mid;
    } else {
        min = mid + 1;
    }

}
console.log(answer);

// TIMES.sort((a, b) => a - b);
// let min = BigInt(1);
// let max = BigInt(TIMES[TIMES.length - 1] * M);
// let answer = max;
// while (min <= max) {
//     let cnt = BigInt(0);
//     let mid = BigInt((max + min) / BigInt(2));
//     TIMES.forEach(time => {
//         cnt += BigInt(mid / BigInt(time));
//     });
//     if (cnt >= M) {
//         answer = answer < mid ? answer : mid;
//         max = mid - BigInt(1);
//     } else {
//         min = mid + BigInt(1);
//     }
//
// }
// console.log(String(answer));