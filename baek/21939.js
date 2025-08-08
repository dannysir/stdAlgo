let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
const problems = input.splice(0, N).map(v => v.split(' ').map(Number));
const M = +input.shift();
const orders = input.splice(0, M).map(v => v.split(' ').map((value, index) => {
    if (index === 0) {
        return value;
    }else return +value;
}));

class PriorityQueue {
    constructor(compareFnc) {
        this.compareFnc = compareFnc;
        this.heap = [null];
    }

    add(arr) {
        let cur = this.heap.length;
        while (cur > 1) {
            const parent = Math.floor(cur / 2);
            if (this.compareFnc(this.heap[parent], arr)) {
                this.heap[cur] = this.heap[parent];
                cur = parent;
            }else break;
        }
        this.heap[cur] = arr;
    }

    pop() {
        if (this.heap.length > 2) {
            const popElement = this.heap[1];
            this.heap[1] = this.heap.pop();
            let cur = 1;
            let left = cur * 2;
            let right = cur * 2 + 1;
            while (this.heap[left]) {
                let compare = left;
                if (this.heap[right] && this.compareFnc(this.heap[left], this.heap[right])) {
                    compare = right;
                }
                if (this.compareFnc(this.heap[cur], this.heap[compare])) {
                    [this.heap[cur], this.heap[compare]] = [this.heap[compare], this.heap[cur]];
                    cur = compare;
                    left = cur * 2;
                    right = cur * 2 + 1;
                }else break;
            }
            return popElement;
        }else if (this.heap.length === 2) {
            const popElement = this.heap.pop();
            return popElement;
        } else {
            return null;
        }
    }

    get() {
        if (this.heap.length > 1) {
            return this.heap[1];
        }else return null;
    }

    test() {
        console.log(this.heap);
    }
}

const solution = () => {
    const minHeap = new PriorityQueue((a, b) => {
        if (a[1] === b[1]) {
            return a[0] > b[0];
        }else return a[1] > b[1];
    });
    const maxHeap = new PriorityQueue((a, b) => {
        if (a[1] === b[1]) {
            return a[0] < b[0];
        }else return a[1] < b[1];
    });

    const problemSet = new Map();

    problems.forEach((arr) => {
        minHeap.add(arr);
        maxHeap.add(arr);
        problemSet.set(arr[0], arr[1]);
    });
    const answer = [];
    orders.forEach((arr) => {
        switch (arr[0]) {
            case 'add':
                minHeap.add([arr[1], arr[2]]);
                maxHeap.add([arr[1], arr[2]]);
                problemSet.set(arr[1], arr[2]);
                break;
            case 'recommend':
                if (arr[1] === 1) {
                    let item = maxHeap.get();
                    while (!problemSet.has(item[0]) || (problemSet.has(item[0]) && problemSet.get(item[0]) !== item[1])) {
                        maxHeap.pop();
                        item = maxHeap.get();
                    }
                    answer.push(item[0]);
                } else {
                    let item = minHeap.get();
                    while (!problemSet.has(item[0]) || (problemSet.has(item[0]) && problemSet.get(item[0]) !== item[1])) {
                        minHeap.pop();
                        item = minHeap.get();
                    }
                    answer.push(item[0]);
                }
                break;
            case 'solved':
                problemSet.delete(arr[1]);
                break;
            default:
                break;

        }
    });

    console.log(answer.join('\n'));
};

solution();