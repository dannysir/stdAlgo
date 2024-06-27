// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split('\n');
//
// // let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// let N = parseInt(input.shift());
//
// const solution = () => {
//     let answer = 0;
//     let remain = 0;
//     let bags = [0, 0];
//     bags[1] = Math.floor(N / 5);
//     remain = N - (bags[1] * 5);
//     while (remain !== 0) {
//         if (remain % 3 === 0) {
//             bags[0] = remain / 3;
//             break;
//         } else {
//             if (bags[1]) {
//                 bags[1]--;
//                 remain += 5;
//             }else return -1;
//         }
//     }
//     return bags[0] + bags[1];
// };
// console.log(solution());

let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const N = parseInt(input.shift());
let bags = [0, 0];
let remains = 0;
let answer = 0;
bags[0] = Math.floor(N / 5);
remains = N % 5;

while (remains > 0) {
    if (remains % 3 === 0) {
        bags[1] = Math.floor(remains / 3);
        remains = 0;
    } else {
        if (bags[0]) {
            bags[0]--;
            remains += 5;
        } else {
            answer = -1;
            break;
        }
    }
}
answer = answer === -1 ? -1 : bags.reduce((acc, cur) => acc + cur, 0);
console.log(answer);