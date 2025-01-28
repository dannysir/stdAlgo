let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, M] = input[0].split(' ').map(Number);
const defaultScore = input[1].split(' ').map(Number);
const increaseArr = input[2].split(' ').map(Number);

class MaxHeap {
    constructor() {
        this.heap = [null];
    }

    insert(item) {
        let current = this.heap.length;
        while (current > 1) {
            const parent = Math.floor(current / 2);
            if (this.heap[parent][1] < item[1]) {
                this.heap[current] = this.heap[parent];
                current = parent;
            }else break;
        }
        this.heap[current] = item;
    }

    pop() {
        if (this.heap.length > 2) {
            let popItem = this.heap[1];
            this.heap[1] = this.heap.pop();
            let current = 1;
            let leftChild = current * 2;
            let rightChild = current * 2 + 1;

            while (this.heap[leftChild]) {
                let compare = leftChild;
                if (this.heap[rightChild] && this.heap[leftChild][1] < this.heap[rightChild][1]) {
                    compare = rightChild;
                }

                if (this.heap[current][1] < this.heap[compare][1]) {
                    [this.heap[current], this.heap[compare]] = [this.heap[compare], this.heap[current]];
                    current = compare;
                    leftChild = current * 2;
                    rightChild = current * 2 + 1;
                }else break;
            }
            return popItem;
        }else if (this.heap.length === 2) {
            return this.heap.pop();
        } else {
            return null;
        }
    }

    getMax() {
        return this.heap[1];
    }

    getLength() {
        return this.heap.length - 1;
    }

    test() {
        console.log(this.heap);
    }
}

const test = () => {
    let time = N * 24;
    const pq = new MaxHeap();
    increaseArr.map((value, index) => {
        pq.insert([index, value]);
    });
    while (pq.getLength() > 0 && time > 0) {
        const [targetIndex, increaseValue] = pq.pop();
        let targetScore = defaultScore[targetIndex];

        if (targetScore < 100) {
            const studyHours = Math.floor((100 - targetScore) / increaseValue);
            if (time >= studyHours) {
                targetScore += studyHours * increaseValue;
                if (targetScore < 100) {
                    pq.insert([targetIndex, 100 - targetScore]);
                }
                time -= studyHours;
            } else {
                targetScore += time * increaseValue;
                time = 0;
            }

            defaultScore[targetIndex] = targetScore;
        }
    }
    console.log(defaultScore
        .reduce((acc, cur) => acc + cur, 0)
    );
};

test();