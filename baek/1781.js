let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = input.shift();

input = input.map(v => v.split(' ').map(Number)).sort((a, b) => a[0] - b[0]);
let answer = 0;

class MINHEAP {
    constructor() {
        this.heap = [null];
    }

    Insert(item) {
        let cur = this.heap.length;
        while (cur > 1) {
            const parent = Math.floor(cur / 2);
            if (this.heap[parent] > item) {
                this.heap[cur] = this.heap[parent];
                cur = parent
            }else break;
        }
        this.heap[cur] = item;
    }

    Pop(){
        const PopItem = this.heap[1];
        if (this.heap.length > 2) {
            this.heap[1] = this.heap.pop();
            let Current = 1;
            let LeftChild = Current * 2;
            let RightChild = Current * 2 + 1;
            while (this.heap[LeftChild]) {
                let ComparedChild = LeftChild;
                if (this.heap[RightChild] && this.heap[LeftChild] > this.heap[RightChild]) {
                    ComparedChild = RightChild;
                }

                if (this.heap[Current] > this.heap[ComparedChild]) {
                    [this.heap[Current], this.heap[ComparedChild]] = [this.heap[ComparedChild], this.heap[Current]];
                }else break;
                Current = ComparedChild;
                LeftChild = Current * 2;
                RightChild = Current * 2 + 1;
            }
        }else if (this.heap.length === 2) {
            this.heap.pop();
            return PopItem;
        } else {
            return null;
        }
        return PopItem;
    }

    GetLength() {
        return this.heap.length - 1;
    }

    GetTop() {
        return this.heap[1];
    }

    GetSum() {
        let sum = 0;
        for (let i = 1; i < this.heap.length; i++) {
            sum += this.heap[i];
        }
        return sum;
    }
}

const solution = (INPUT) => {
    const MinHeap = new MINHEAP();
    for (const inputElement of INPUT) {
        let [DeadLine, CupNoodle] = inputElement;

        if (DeadLine === MinHeap.GetLength()) {
            if (MinHeap.GetTop() < CupNoodle) {
                MinHeap.Pop();
                MinHeap.Insert(CupNoodle);
            }
        } else {
            MinHeap.Insert(CupNoodle);
        }
    }
    console.log(MinHeap.GetSum());
};
solution(input);