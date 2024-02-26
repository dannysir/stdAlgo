let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 1번째 풀이
let N = input.shift();
let answer = [];
const PickPerson = (INPUT) => {
    let TotalPerson = parseInt(INPUT.shift());
    const PersonArr = INPUT.splice(0, TotalPerson).map(v => v.split(' ').map(Number));
    PersonArr.sort((a, b) => a[0] - b[0]);
    let stack = [];
    for (const personArrElement of PersonArr) {
        if (stack.length) {
            if (stack[stack.length - 1] > personArrElement[1]) {
                stack.push(personArrElement[1]);
            }
        } else {
            stack.push(personArrElement[1]);
            stack.sort();
        }
    }
    answer.push(stack.length);
};

const solution = () => {
    for (let i = 0; i < parseInt(N); i++) {
        PickPerson(input);
    }
};
solution();
console.log(answer.join('\n'));

// class MinHeap {
//     constructor() {
//         this.heap = [null];
//     }
//
//     INSERT(item) {
//         let cur = this.heap.length;
//         while (cur > 1) {
//             const PARENT = Math.floor(cur / 2);
//             if (this.heap[PARENT] > item) {
//                 this.heap[cur] = this.heap[PARENT];
//                 cur = PARENT;
//             }else break;
//         }
//         this.heap[cur] = item;
//     }
//
//     GetMin() {
//         return this.heap[1];
//     }
//
//     GetLength() {
//         return this.heap.length - 1;
//     }
// }
//
// let N = parseInt(input.shift());
// let answer = [];
// const PickPerson = (INPUT) => {
//     let TotalPerson = parseInt(INPUT.shift());
//     const PersonArr = INPUT.splice(0, TotalPerson).map(v => v.split(' ').map(Number));
//     PersonArr.sort((a, b) => a[0] - b[0]);
//     const PQ = new MinHeap();
//     for (const personArrElement of PersonArr) {
//         if (PQ.GetLength()) {
//             if (PQ.GetMin() > personArrElement[1]) {
//                 PQ.INSERT(personArrElement[1]);
//             }
//         } else {
//             PQ.INSERT(personArrElement[1]);
//         }
//     }
//     answer.push(PQ.GetLength());
// };
// const solution = () => {
//     for (let i = 0; i < N; i++) {
//         PickPerson(input);
//     }
// };
//
//
// solution();
// console.log(answer.join('\n'));