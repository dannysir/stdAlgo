let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().split('\n');
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
// class PRIORITY_QUEUE {
//     constructor() {
//         this.queue = [];
//     }
//
//     insert(element) {
//         if (this.queue.length) {
//             for (let i = 0; i < this.queue.length; i++) {
//                 if (this.queue[i] > element) {
//                     this.queue.splice(i, 0, element);
//                     return;
//                 }
//             }
//         }
//         this.queue.push(element);
//     }
//
//     getQue() {
//         return this.queue;
//     }
//     delete() {
//         this.queue.shift();
//     }
//
//     getSize(){
//         return this.queue.length;
//     }
//
//     getTop(){
//         return this.queue[0];
//     }
// }
//
// function CHECK_BOUNDERY(INPUT) {
//     //let Priority_Queue = [INPUT[0][1]];
//     let Priority_Queue = new PRIORITY_QUEUE();
//     Priority_Queue.insert(INPUT[0][1]);
//     let max = 1;
//     // for (let i = 1; i < INPUT.length; i++) {
//     //     if (INPUT[i][0] < Priority_Queue[0]) {
//     //         Priority_Queue.push(INPUT[i][1]);
//     //     }else{
//     //         Priority_Queue.shift();
//     //         Priority_Queue.push(INPUT[i][1]);
//     //     }
//     //     Priority_Queue.sort((a, b) => a - b);
//     // }
//     for (let i = 1; i < INPUT.length; i++) {
//         if (INPUT[i][0] < Priority_Queue.getTop()) {
//             Priority_Queue.insert(INPUT[i][1]);
//             max++;
//         }else{
//             Priority_Queue.delete();
//             Priority_Queue.insert(INPUT[i][1]);
//         }
//     }
//
//     console.log(Math.max(Priority_Queue.getSize(), max));
// }
//
// CHECK_BOUNDERY(input);

let N = input.shift();
input = input.map(v => v.split(' ').map(Number)).sort((a, b) => {
    if (a[1] === b[1]) {
        return a[2] - b[2];
    }
    return a[1] - b[1];
});

class MinHeap {
    constructor() {
        this.heap = [null];
    }

    insert(item){
        let current = this.heap.length;
        while (current > 1) {
            const parent = Math.floor(current / 2);
            if (this.heap[parent] > item) {
                this.heap[current] = this.heap[parent];
                current = parent;
            }else break;
        }
        this.heap[current] = item;
    }

    remove() {
        let min = this.heap[1];
        if (this.heap.length > 2) {
            this.heap[1] = this.heap[this.heap.length - 1];
            this.heap.splice(this.heap.length - 1);

            let current = 1;
            let leftChild = current * 2;
            let rightChild = current * 2 + 1;
            while (this.heap[leftChild]) {
                let CompareItem = leftChild;
                if (this.heap[rightChild] && this.heap[CompareItem] > this.heap[rightChild]) {
                    CompareItem = rightChild;
                }
                if (this.heap[current] > this.heap[CompareItem]) {
                    [this.heap[current], this.heap[CompareItem]] = [this.heap[CompareItem], this.heap[current]];
                    current = CompareItem;
                }else break;

                leftChild = current * 2;
                rightChild = current * 2 + 1;
            }
        }else if (this.heap.length === 2) {
            this.heap.splice(1, 1);
        } else {
            return null;
        }
        return min;
    }

    getMin() {
        return this.heap[1];
    }

    getHeap(){
        return this.heap;
    }

    getSize(){
        return this.heap.length - 1;
    }
}

function CHECK_BOUNDERY(INPUT) {
    let Priority_Queue = new MinHeap();
    Priority_Queue.insert(INPUT[0][2]);

    if (INPUT.length === 1) return 1;

    for (let i = 1; i < INPUT.length; i++) {
        if (INPUT[i][1] < Priority_Queue.getMin()) {
            Priority_Queue.insert(INPUT[i][2]);
        }else{
            Priority_Queue.remove();
            Priority_Queue.insert(INPUT[i][2]);
        }

    }
    return Priority_Queue.getSize();
}

console.log(CHECK_BOUNDERY(input));
