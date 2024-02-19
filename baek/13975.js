let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const TEST = input.shift();
let answer = '';
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

}

while (input.length) {
    let [N, Arr] = input.splice(0, 2);
    Arr = Arr.split(' ').map(Number);
    let Acc = 0;
    const MinHeap = new MINHEAP();
    for (const ELEMENT of Arr) {
        MinHeap.Insert(ELEMENT);
    }
    while (MinHeap.GetLength() > 1) {
        let temp = 0;
        temp += MinHeap.Pop();
        temp += MinHeap.Pop();
        MinHeap.Insert(temp);
        Acc += temp;
    }
    answer += `${Acc}\n`;
}
console.log(answer);