let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let [N, M] = input.shift().split(' ').map(Number);

// 백트래킹
// function solution() {
//     let cnt = 1;
//     while (parseInt(N) < parseInt(M)) {
//         let Msplit = M.split('');
//         let LastValue = parseInt(Msplit[Msplit.length - 1]);
//         if (LastValue === 1) {
//             Msplit.pop();
//             M = Msplit.join('');
//             cnt++
//         }else if (LastValue % 2 === 1) {
//             return -1;
//         } else {
//             M = String(parseInt(M) / 2);
//             cnt++;
//         }
//     }
//     return N === M ? cnt : -1;
// }
//
// console.log(solution());

//DFS풀이
let answer = -1;
const DFS = (VALUE, COUNT) => {
    if (VALUE === M) {
        answer = COUNT + 1;
    } else{
        if (VALUE * 2 <= M) {
            DFS(VALUE * 2, COUNT + 1);
        }
        if (VALUE * 10 + 1 <= M) {
            DFS(VALUE * 10 + 1, COUNT + 1);
        }
    }

};
DFS(N, 0);
console.log(answer);
