let fs = require("fs");
let input = fs.readFileSync('/dev/stdin').toString().trim().split("\n").map(Number);
let N = input.shift();

class MinHeap {
    constructor() {
        this.heap = [null];
    }

    insert(element) {
        let current = this.heap.length;

        while (current > 1) {
            const parent = Math.floor(current / 2);
            if (this.heap[parent] > element) {
                this.heap[current] = this.heap[parent];
                current = parent;
            }else break;
        }
        this.heap[current] = element;
    }

    remove() {
        let top = this.heap[1];
        if (this.heap.length > 2) {
            this.heap[1] = this.heap.pop();
            let current = 1;
            let leftChild = current * 2;
            let rightChild = current * 2 + 1;
            while (this.heap[leftChild]) {
                let CompareChild = leftChild;
                if (this.heap[rightChild] && this.heap[leftChild] > this.heap[rightChild]) {
                    CompareChild = rightChild;
                }
                if (this.heap[CompareChild] < this.heap[current]) {
                    const temp = this.heap[current];
                    this.heap[current] = this.heap[CompareChild];
                    this.heap[CompareChild] = temp;
                    current = CompareChild;
                }else break;
                leftChild = current * 2;
                rightChild = current * 2 + 1;
            }
        }else if (this.heap.length === 2) {
            this.heap.pop();
        }else{
            return 0;
        }
        return top;
    }

    getSize() {
        return this.heap.length - 1;
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

