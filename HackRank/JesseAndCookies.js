let fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [n, k] = input.shift().split(' ').map(v => +v);
const arr = input.shift().split(' ').map(v => +v);

class MinHeap{
    constructor(){
        this.heap = [null];
    }

    Insert(item){
        let cur = this.heap.length;
        while(cur >= 2) {
            const parent = Math.floor(cur / 2);
            if (this.heap[parent] > item) {
                this.heap[cur] = this.heap[parent];
                cur = parent;
            }else break;
        }
        this.heap[cur] = item;
    }

    Pop(){
        if (this.heap.length > 2) {
            const popItem = this.heap[1];
            this.heap[1] = this.heap.pop();
            let cur = 1;
            let left = cur * 2;
            let right = cur * 2 + 1;

            while(this.heap[left]) {
                let compare = left;

                if (this.heap[right] && this.heap[left] > this.heap[right]) {
                    compare = right;
                }

                if (this.heap[compare] < this.heap[cur]) {
                    [this.heap[compare], this.heap[cur]] = [this.heap[cur], this.heap[compare]];
                    cur = compare;
                    left = cur * 2;
                    right = cur * 2 + 1;
                }else break;
            }

            return popItem;
        }else if (this.heap.length === 2){
            return this.heap.pop();
        }else return null;
    }

    Length(){
        return this.heap.length - 1;
    }

    Min(){
        if (this.Length()) {
            return this.heap[1];
        }else return null;
    }

    Test(){
        console.log(this.heap);
    }
}

function cookies(k, A) {
    // Write your code here
    const pq = new MinHeap();
    A.forEach(v => pq.Insert(v));
    let cnt = 0;
    while (pq.Length() > 1 && pq.Min() < k) {
        const a = pq.Pop();
        const b = pq.Pop();
        const c = a + b * 2;
        pq.Insert(c);

        cnt++;
    }

    const minValue = pq.Min();
    if (minValue !== null && minValue >= k) {
        return cnt;
    } else {
        return -1;
    }
}

console.log(cookies(k, arr));