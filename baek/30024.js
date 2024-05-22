let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [X, Y] = input.shift().split(' ').map(Number);
let MAP = input.splice(0, X).map(v => v.split(' ').map(Number));
let K = parseInt(input[0]);

let visited = Array.from({length: X}, _ => Array.from({length: Y}, _ => false));
class MaxHeap {
    constructor() {
        this.heap = [null];
    }

    Push(item) {
        let current = this.heap.length;
        while (current > 1) {
            const Parent = Math.floor(current / 2);
            if (this.heap[Parent][0] < item[0]) {
                this.heap[current] = this.heap[Parent];
                current = Parent;
            }else break;
        }
        this.heap[current] = item;
    }

    Pop() {
        if (this.heap.length > 2) {
            const PopItem = this.heap[1];
            this.heap[1] = this.heap.pop();

            let Cur = 1;
            let LeftChild = Cur * 2;
            let RightChild = Cur * 2 + 1;

            while (this.heap[LeftChild]) {
                let Compare = LeftChild;
                if (this.heap[RightChild] && this.heap[LeftChild][0] < this.heap[RightChild][0]) {
                    Compare = RightChild;
                }

                if (this.heap[Compare][0] > this.heap[Cur][0]) {
                    [this.heap[Cur], this.heap[Compare]] = [this.heap[Compare], this.heap[Cur]];
                    Cur = Compare;
                    LeftChild = Cur * 2;
                    RightChild = Cur * 2 + 1;
                }else break;
            }
            return PopItem;
        }else if (this.heap.length === 2) {
            return this.heap.pop();
        } else {
            return null;
        }
    }

    Test() {
        console.log(this.heap);
    }
}

let answer = [];
const PQ = new MaxHeap();

for (let i = 0; i < X; i++) {
    for (let j = 0; j < Y; j++) {
        if (i === 0 || j === 0 || i === X - 1 || j === Y - 1) {
            PQ.Push([MAP[i][j], i, j]);
            visited[i][j] = true;
        }
    }
}
while (K > 0) {
    let [num, nowX, nowY] = PQ.Pop();
    let dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    for (const dirElement of dir) {
        const NextX = nowX + dirElement[0];
        const NextY = nowY + dirElement[1];
        if (NextX < 0 || NextX >= X || NextY < 0 || NextY >= Y) continue;

        if (!visited[NextX][NextY]) {
            visited[NextX][NextY] = true;
            PQ.Push([MAP[NextX][NextY], NextX, NextY]);
        }
    }
    answer.push(`${nowX + 1} ${nowY + 1}`);
    K--;
}
console.log(answer.join('\n'));
// 시간 초과.
// let newMAP = Array.from({length: X + 2}, _ => Array.from({length: Y + 2}, _ => 0));
//
// let K = parseInt(input[0]);
// MAP.forEach((Row, X) => {
//     Row.forEach((Corn, Y) => {
//         newMAP[X + 1][Y + 1] = Corn;
//     });
// });
//
// const BFS = (start) => {
//     let Queue = [start];
//     let visited = Array.from({length: X + 2}, _ => Array.from({length: Y + 2}, _ => false));
//
//     const dx = [1, -1, 0, 0];
//     const dy = [0, 0, 1, -1];
//     let max = [1, 1];
//     while (Queue.length) {
//         const [nowX, nowY] = Queue.shift();
//         visited[nowX][nowY] = true;
//         if (nowX < 0 || nowX >= X + 2 || nowY < 0 || nowY >= Y+ 2) continue;
//
//         for (let i = 0; i < dx.length; i++) {
//             const NextX = nowX + dx[i];
//             const NextY = nowY + dy[i];
//
//             if (NextX < 0 || NextX >= X + 2 || NextY < 0 || NextY >= Y+ 2) continue;
//
//             if (!visited[NextX][NextY]) {
//                 if (newMAP[NextX][NextY] !== 0) {
//                     visited[NextX][NextY] = true;
//                     max = newMAP[NextX][NextY] > newMAP[max[0]][max[1]] ? [NextX, NextY] : max;
//                 } else {
//                     Queue.push([NextX, NextY]);
//                 }
//             }
//         }
//     }
//     return max;
// };
//
// let answer = [];
// while (K > 0) {
//     let [maxX, maxY] = BFS([0, 0]);
//     answer.push(`${maxX} ${maxY}`);
//     newMAP[maxX][maxY] = 0;
//     K--;
// }
// console.log(answer.join('\n'));