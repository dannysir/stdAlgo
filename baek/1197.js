let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

input = input.map(v => v.split(' ').map(Number));

const [N, M] = input.shift();

class MinHeap {
    constructor() {
        this.heap = [null];
    }

    Insert(arr) {
        let cur = this.heap.length;
        while (cur > 1) {
            const parent = Math.floor(cur / 2);
            if (this.heap[parent][1] > arr[1]) {
                this.heap[cur] = this.heap[parent];
                cur = parent;
            }else break;
        }
        this.heap[cur] = arr;
    }

    Pop() {
        if (this.heap.length > 2) {
            const popElement = this.heap[1];
            this.heap[1] = this.heap.pop();
            let cur = 1;
            let left = cur * 2;
            let right = cur * 2 + 1;

            while (this.heap[left]) {
                let compare = left;
                if (this.heap[right] && this.heap[left][1] > this.heap[right][1]) {
                    compare = right;
                }

                if (this.heap[compare][1] < this.heap[cur][1]) {
                    [this.heap[compare], this.heap[cur]] = [this.heap[cur], this.heap[compare]];
                    cur = compare;
                    left = cur * 2;
                    right = cur * 2 + 1;
                }else break;
            }
            return popElement;
        }else if (this.heap.length === 2) {
            return this.heap.pop();
        } else {
            return null;
        }
    }

    Length() {
        return this.heap.length - 1;
    }

    test() {
        console.log(this.heap);
    }
}

const solution = () => {
    let answer = 0;
    const trees = Array.from({length: N + 1}, _ => []);

    input.forEach(([from, to, cost]) => {
        trees[from].push([to, cost]);
        trees[to].push([from, cost]);
    });

    const visited = Array(N + 1).fill(false);
    const queue = new MinHeap();
    queue.Insert([1, 0]);
    while (queue.Length() > 0) {
        const [now, cost] = queue.Pop();

        if (visited[now]) continue;

        visited[now] = true;
        answer += cost;

        for (const [next, nextCost] of trees[now]) {
            if (!visited[next]) {
                queue.Insert([next, nextCost]);
            }
        }
    }
    console.log(answer);
};

solution();
// const parent = Array.from({length: N + 1}, (_, index) => index);
// let answer = 0;
// let cnt = 0;
//
// const find = (a) => {
//     if (parent[a] !== a) {
//         parent[a] = find(parent[a]);
//     }
//     return parent[a];
// };
//
// const union = (a, b) => {
//     const aParent = find(a);
//     const bParent = find(b);
//
//     if (aParent < bParent) {
//         parent[bParent] = aParent;
//     } else {
//         parent[aParent] = bParent;
//     }
// };
//
// for (const [from, to, cost] of input) {
//     const fromParent = find(from);
//     const toParent = find(to);
//
//     if (fromParent !== toParent) {
//         union(from, to);
//         answer += cost;
//         cnt++;
//         if (cnt === N - 1) break;
//     }
// }
//
// console.log(answer);