let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, M] = input.shift().split(' ').map(Number);
const NumArr = input[0].split(' ').map(Number);

let left = 0;
let right = 0;
let sum = 0;

const solution = () => {
    let cnt = 0;
    while (right <= N) {
        if (sum === M) {
            cnt++;
        }
        if (sum >= M) {
            sum -= NumArr[left++];
        } else {
            sum += NumArr[right++];
        }
    }
    console.log(cnt);
};
solution();

// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
// const [N, M] = input.shift().split(' ').map(Number);
// const NumArr = input[0].split(' ').map(Number);
//
// let left = 0;
// let right = 0;
//
// const Sum = (L, R) => {
//     let result = 0;
//     for (let i = L; i <= R; i++) {
//         result += NumArr[i];
//     }
//     return result;
// };
// const solution = () => {
//     let cnt = 0;
//     while (right < NumArr.length) {
//         const SumResult = Sum(left, right);
//         if (SumResult === M) {
//             cnt++;
//             right++;
//         }else if (SumResult > M) {
//             left++;
//         } else {
//             right++;
//         }
//     }
//     console.log(cnt);
// };
// solution();