let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");

// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

class MinHeap {
    constructor() {
        this.heap = [null];
    }

    insert(item) {
        let cur = this.heap.length;
        while (cur >= 2) {
            const parent = Math.floor(cur / 2);
            if (this.heap[parent] > item) {
                this.heap[cur] = this.heap[parent];
                cur = parent;
            } else break;
        }
        this.heap[cur] = item;
    }

    min() {
        if (this.heap.length > 2) {
            const popElement = this.heap[1];
            this.heap[1] = this.heap.pop();
            let cur = 1;
            let left = cur * 2;
            let right = cur * 2 + 1;
            while (this.heap[left]) {
                let compare = left;
                if (this.heap[left] > this.heap[right]) {
                    compare = right;
                }
                if (this.heap[compare] < this.heap[cur]) {
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

    getLength(){
        return this.heap.length - 1;
    }

    test(){
        console.log(this.heap);
    }
}

const [N, M] = input.shift().split(' ').map(Number);
input = input.map(v => v.split(' ').map(Number));
const cntArr = Array(N).fill(0);
const visited = Array(N).fill(false);
const trees = {};

for (let i = 0; i < N; i++) {
    trees[i] = [];
}

input.forEach(([start, end]) => {
    if (trees[start - 1]) {
        trees[start - 1].push(end - 1);
    } else trees[start - 1] = [end - 1];

    cntArr[end - 1]++;
});

const TopologicalSort = () => {
    const queue = new MinHeap();
    const answer = [];
    cntArr.forEach((value, index) => {
        if (value === 0) {
            queue.insert(index);
            visited[value - 1] = true;
        }
    })

    while (queue.getLength() > 0) {
        const now = queue.min();
        for (const next of trees[now]) {
            if (!visited[next]) {
                cntArr[next]--;
                if (cntArr[next] === 0) {
                    queue.insert(next);
                    visited[next] = true;
                }
            }
        }
        answer.push(now + 1);
    }
    console.log(answer.join(' '));
};

TopologicalSort();
