let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, K] = input.shift().split(' ').map(Number);
const jam = input.splice(0, N).map(v => v.split(' ').map(Number));
let bags = input.map(Number);
jam.sort((a, b) => a[0] - b[0]);
bags.sort((a, b) => a - b);

class MaxHeap {
    constructor() {
        this.heap = [null];
    }

    add(item) {
        let current = this.heap.length;
        while (current > 1) {
            const parent = Math.floor(current / 2);
            if (this.heap[parent][1] < item[1]) {
                this.heap[current] = this.heap[parent];
                current = parent;
            } else break;
        }
        this.heap[current] = item;
    }

    pop() {
        if (this.heap.length > 2) {
            const popItem = this.heap[1];
            this.heap[1] = this.heap.pop();

            let current = 1;
            let left = current * 2;
            let right = current * 2 + 1;

            while (this.heap[left]) {
                let compare = left;
                if (this.heap[right] && this.heap[left][1] < this.heap[right][1]) {
                    compare = right;
                }

                if (this.heap[compare][1] > this.heap[current][1]) {
                    [this.heap[compare], this.heap[current]] = [this.heap[current], this.heap[compare]];
                    current = compare;
                    left = current * 2;
                    right = current * 2 + 1;
                } else break;
            }
            return popItem;
        } else if (this.heap.length === 2) {
            return this.heap.pop();
        } else {
            return null;
        }
    }

    getLength() {
        return this.heap.length - 1;
    }

    test() {
        console.log(this.heap);
    }
}

const maxHeap = new MaxHeap();
let answer = 0;

let j = 0;
for (let i = 0; i < K; i++) {큐
    const maxBagSize = bags[i];
    while (j < N && jam[j][0] <= maxBagSize) {
        maxHeap.add(jam[j]);
        j++;
    }

    if (maxHeap.getLength() > 0) {
        answer += maxHeap.pop()[1];
    }
}
console.log(answer);