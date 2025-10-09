class MinHeap {
    constructor() {
        this.heap = [null];
    }

    insert(num) {
        let cur = this.heap.length;
        while (cur >= 2) {
            const parent = Math.floor(cur / 2);
            if (this.heap[parent][1] > num[1]) {
                this.heap[cur] = this.heap[parent];
                cur = parent;
            } else break;
        }
        this.heap[cur] = num;
    }

    get() {
        if (this.heap.length > 2) {
            const popElement = this.heap[1];
            this.heap[1] = this.heap.pop();
            let cur = 1;
            let left = cur * 2;
            let right = cur * 2 + 1;
            while (this.heap[left]) {
                let compare = left;
                if (this.heap[right] && this.heap[left][1] > this.heap[right][1]) {
                    compare = right;
                }

                if (this.heap[compare][1] < this.heap[cur][1]) {
                    [this.heap[compare], this.heap[cur]] = [this.heap[cur], this.heap[compare]];
                    cur = compare;
                    left = cur * 2;
                    right = cur * 2 + 1;
                } else break;
            }
            return popElement;
        } else if (this.heap.length === 2) {
            return this.heap.pop();
        } else {
            return null;
        }
    }

    length() {
        return this.heap.length - 1;
    }

    min() {
        return this.heap.length > 1 ? this.heap[1] : null;
    }

    test() {
        console.log(this.heap);
    }
}

const calcTimePossible = (time1, time2) => {
    let [hour1, min1] = time1;
    const time1ToMin = hour1 * 60 + min1;
    let [hour2, min2] = time2;
    const time2ToMin = hour2 * 60 + min2;

    return time1ToMin + 10 <= time2ToMin;
}

function solution(book_time) {
    var answer = 0;
    const minHeap = new MinHeap();
    book_time.sort((a, b) => {
        if (a[0] < b[0]) {
            return -1;
        } return 1
    });

    book_time.forEach(v => {
        if (minHeap.length() > 0) {
            const min = minHeap.min()[1].split(':').map(Number);
            const targetStartTime = v[0].split(':').map(Number);
            if (calcTimePossible(min, targetStartTime)) {
                minHeap.get();
            }

        }
        minHeap.insert(v);
        answer = Math.max(answer, minHeap.length());
    });

    return answer;
}