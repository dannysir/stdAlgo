let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = parseInt(input.shift());
let AlphaOBJ = {};

for (let i = 0; i < N; i++) {
    let word = input[i];
    for (let j = word.length - 1; j >= 0; j--) {
        AlphaOBJ[word[j]] = AlphaOBJ[word[j]] ? AlphaOBJ[word[j]] + 10 ** (word.length - j - 1) : 10 ** (word.length - j - 1);
    }
}

AlphaOBJ = Object.entries(AlphaOBJ).sort((a, b) => b[1] - a[1]);
let AssignNum = 9;
let answer =0;
for (const alphaOBJElement of AlphaOBJ) {
    const [Target, Value] = alphaOBJElement;
    answer += Value * AssignNum;
    AssignNum--;
}
let b = {a:100,b:10,c:1,d:10, F: 1}
console.log(answer);
// class MinHeap {
//     constructor() {
//         this.heap = [null];
//     }
//
//     Insert(item) {
//         let cur = this.heap.length;
//         while (cur > 1) {
//             const Parent = Math.floor(cur / 2);
//             if (this.heap[Parent][1] < item[1]) {
//                 this.heap[cur] = this.heap[Parent];
//                 cur = Parent;
//             }else break;
//         }
//         this.heap[cur] = item;
//     }
//
//     Pop() {
//         if (this.heap.length > 2) {
//             const PopItem = this.heap[1];
//             this.heap[1] = this.heap.pop();
//             let cur = 1;
//             let Left = cur * 2;
//             let Right = cur * 2 + 1;
//             while (this.heap[Left]) {
//                 let Compare = Left;
//                 if (this.heap[Right] && this.heap[Right][1] > this.heap[Left][1]) {
//                     Compare = Right;
//                 }
//                 if (this.heap[Compare][1] > this.heap[cur][1]) {
//                     [this.heap[Compare], this.heap[cur]] = [this.heap[cur], this.heap[Compare]];
//                     cur = Compare;
//                     Left = cur * 2;
//                     Right = cur * 2 + 1;
//                 }else break;
//             }
//             return PopItem;
//         }else if (this.heap.length === 2) {
//             return this.heap.pop();
//         } else {
//             return null;
//         }
//     }
//
//     GetLength() {
//         return this.heap.length - 1;
//     }
//
//     Test() {
//         console.log(this.heap);
//     }
// }
// const solution = () => {
//     const PQ = new MinHeap();
//     for (const alphaOBJKey in AlphaOBJ) {
//         PQ.Insert([alphaOBJKey, AlphaOBJ[alphaOBJKey]]);
//     }
//     let num = 9;
//     while (PQ.GetLength() !== 0) {
//         const [Target, Value] = PQ.Pop();
//         AlphaOBJ[Target] = num;
//         num--;
//     }
//     let answer = 0;
//     for (let i = 0; i < N; i++) {
//         let NumString = '';
//         for (let j = 0; j < input[i].length; j++) {
//             NumString += `${AlphaOBJ[input[i][j]]}`;
//         }
//         answer += parseInt(NumString);
//     }
//     console.log(answer);
// };
// solution();
