let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n").map(Number);
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let N = input.shift();
class MinHeap {
    constructor() {
        this.heap = [null];
    }

    insert(element) {
        let current = this.heap.length;
        while (current > 1) {
            const parent = Math.floor(current / 2);
            if (Math.abs(this.heap[parent]) > Math.abs(element)) {
                this.heap[current] = this.heap[parent];
                current = parent;
            } else if (Math.abs(this.heap[parent]) === Math.abs(element)) {
                if (this.heap[parent] > element) {
                    this.heap[current] = this.heap[parent];
                    current = parent;
                }else break;
            }else break;
        }
        this.heap[current] = element;
    }

    remove() {
        let min = this.heap[1];
        if (this.heap.length > 2) {
            let current = 1;
            let leftChild = current * 2;
            let rightChild = current * 2 + 1;
            this.heap[1] = this.heap[this.heap.length - 1];
            this.heap.splice(this.heap.length - 1);

            while (this.heap[leftChild]) {
                let CompareChild = leftChild;
                const LEFT = this.heap[leftChild];
                const RIGHT = this.heap[rightChild];
                if (RIGHT) {
                    if (Math.abs(LEFT) > Math.abs(RIGHT)) {
                        CompareChild = rightChild;
                    }
                    if (Math.abs(LEFT) === Math.abs(RIGHT)) {
                        if (LEFT > RIGHT) {
                            CompareChild = rightChild;
                        }
                    }
                }
                const COMPARE = this.heap[CompareChild];
                const CURRENT = this.heap[current];
                if (Math.abs(COMPARE) < Math.abs(CURRENT)) {
                    [this.heap[CompareChild], this.heap[current]] = [this.heap[current], this.heap[CompareChild]];
                    current = CompareChild;
                }else if (Math.abs(COMPARE) === Math.abs(CURRENT)) {
                    if (COMPARE < CURRENT) {
                        [this.heap[CompareChild], this.heap[current]] = [this.heap[current], this.heap[CompareChild]];
                        current = CompareChild;
                    }else break;
                }else break;
                leftChild = current * 2;
                rightChild = current * 2 + 1;
            }
        }else if (this.heap.length === 2) {
            this.heap.splice(1, 1);
        } else {
            return 0;
        }
        return min;
    }
}
let answer = '';
const PQ = new MinHeap();
for (const Order of input) {
    if (Order === 0) {
        answer += `${PQ.remove()}\n`;
    } else {
        PQ.insert(Order);
    }
}
console.log(answer);