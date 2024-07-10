let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M, T] = input.shift().split(' ').map(Number);

let board = input.map(v => v.split(' ').map(Number));
const Rotate = (before) => {
    const LIMIT = Math.floor(Math.min(N, M) / 2);

    let nextBoard = Array.from({length: N}, _ => Array(M).fill(0));

    for (let i = 0; i < LIMIT; i++) {

        for (let j = M - 2 - i; j >= i; j--) {
            nextBoard[i][j] = before[i][j + 1];
        }
        for (let j = 1 + i; j < N - i; j++) {
            nextBoard[j][i] = before[j - 1][i];
        }
        for (let j = i + 1; j < M - i; j++) {
            nextBoard[N - 1 - i][j] = before[N - 1 - i][j - 1];
        }
        for (let j = N - 2 - i; j >= i; j--) {
            nextBoard[j][M - 1 - i] = before[j + 1][M - 1 - i];
        }

    }
    return nextBoard;
}

for (let i = 0; i < T; i++) {
    board = Rotate(board);
}
console.log(board.map(v => v.join(" ")).join("\n"));

// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// // let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
// const [N, M, R] = input.shift().split(' ').map(Number);
//
// input = input.map(v => v.split(' ').map(Number));
//
// const divideInput = (InputMap) => {
//     let top = 0;
//     let bottom = N - 1;
//     let left = 0;
//     let right = M - 1;
//     let answer = [];
//     while (true) {
//         if (top >= bottom || left >= right) break;
//
//         let topArr = InputMap[top].slice(left, right + 1);
//         let bottomArr = InputMap[bottom].slice(left, right + 1);
//         let leftArr = [];
//         let rightArr = [];
//
//         for (let i = top; i <= bottom; i++) {
//             leftArr.push(InputMap[i][left]);
//             rightArr.push(InputMap[i][right]);
//         }
//         answer.push([topArr, bottomArr, leftArr, rightArr]);
//         top++;
//         bottom--;
//         left++;
//         right--;
//         return answer;
//     }
// };
//
// const rotateInput = (divArr) => {
//     for (const [topArr, bottomArr, leftArr, rightArr] of divArr) {
//         topArr.shift();
//         leftArr.unshift(topArr[0]);
//
//         leftArr.pop();
//         bottomArr.unshift(leftArr[leftArr.length - 1]);
//
//         bottomArr.pop();
//         rightArr.push(bottomArr[bottomArr.length - 1]);
//
//         rightArr.shift();
//         topArr.push(rightArr[0]);
//     }
//
//     return divArr;
// };
//
// const combinationInput = (divArr) => {
//     let result = Array.from({length: N}, _ => []);
//     for (let i = 0; i < divArr.length; i++) {
//
//     }
// };
//
// console.log(input);