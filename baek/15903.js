let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let [N, M] = input.shift().split(' ').map(Number)
input = input.shift().split(' ').map(BigInt);
class MinHeap {
    constructor() {
        this.heap = [null];

    }

    Push(item) {
        let cur = this.heap.length;
        while (cur > 1) {
            let parent = Math.floor(cur / 2);
            if (item < this.heap[parent]) {
                this.heap[cur] = this.heap[parent];
                cur = parent;
            } else break;
        }
        this.heap[cur] = item;
    }

    remove() {
        const removeItem = this.heap[1];
        if (this.heap.length > 2) {
            this.heap[1] = this.heap[this.heap.length - 1];
            this.heap.pop();
            let cur = 1;
            let leftChild = cur * 2;
            let rightChild = cur * 2 + 1;
            while (this.heap[leftChild]) {
                let CompareChild = leftChild;
                if (this.heap[rightChild]) {
                    if (this.heap[leftChild] > this.heap[rightChild]) {
                        CompareChild = rightChild;
                    }
                }
                if (this.heap[CompareChild] < this.heap[cur]) {
                    [this.heap[CompareChild], this.heap[cur]] = [this.heap[cur], this.heap[CompareChild]];
                    cur = CompareChild;
                }else break;
                leftChild = cur * 2;
                rightChild = cur * 2 + 1;
            }

        }else if (this.heap.length === 2) {
            this.heap.pop();
        } else {
            return 0;
        }
        return removeItem;
    }

    getSum() {
        let result = 0n;
        for (let i = 1; i < this.heap.length; i++) {
            result += this.heap[i];
        }
        return result;
    }

    getHeap() {
        return this.heap;
    }

}
const solution = (n, m, INPUT) => {
    const minHeap = new MinHeap();
    for (let i = 0; i < INPUT.length; i++) {
        minHeap.Push(INPUT[i]);
    }
    const CardConcat = () => {
        let first = minHeap.remove();
        let second = minHeap.remove();
        let result = first + second;
        minHeap.Push(result);
        minHeap.Push(result);
    };
    for (let i = 0; i < m; i++) {
        CardConcat();
        console.log(minHeap.getHeap());
    }
    console.log(minHeap.getSum().toString());
};

solution(N, M, input);