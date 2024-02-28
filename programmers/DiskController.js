let jobs = [[1, 4], [7, 9], [1000, 3]];
class MINHEAP {
    constructor() {
        this.heap = [null];
    }

    INSERT(item) {
        let Current = this.heap.length;

        while (Current > 1) {
            const Parent = Math.floor(Current / 2);
            if (this.heap[Parent][1] > item[1]) {
                this.heap[Current] = this.heap[Parent];
                Current = Parent;
            } else if (this.heap[Parent][1] === item[1]) {
                if (this.heap[Parent][0] > item[0]) {
                    this.heap[Current] = this.heap[Parent];
                    Current = Parent;
                } else break;
            } else break;
        }

        this.heap[Current] = item;
    }

    POP() {
        const PopElement = this.heap[1];
        if (this.heap.length > 2) {
            this.heap[1] = this.heap.pop();
            let Current = 1;
            let LeftChild = Current * 2;
            let RightChild = Current * 2 + 1;
            while (this.heap[LeftChild]) {
                let Compare = LeftChild;
                if (this.heap[RightChild]) {
                    if (this.heap[LeftChild][1] > this.heap[RightChild][1]) {
                        Compare = RightChild;
                    } else if (this.heap[LeftChild][1] === this.heap[RightChild][1]) {
                        if (this.heap[LeftChild][0] > this.heap[RightChild][0]) {
                            Compare = RightChild;
                        }
                    }
                }
                if (this.heap[Current][1] > this.heap[Compare][1]) {
                    [this.heap[Current], this.heap[Compare]] = [this.heap[Compare], this.heap[Current]];
                    Current = Compare;
                } else if (this.heap[Current][1] === this.heap[Compare][1]) {
                    if (this.heap[Current][0] > this.heap[Compare][0]) {
                        [this.heap[Current], this.heap[Compare]] = [this.heap[Compare], this.heap[Current]];
                        Current = Compare;
                    } else break;
                } else break;
                LeftChild = Current * 2;
                RightChild = Current * 2 + 1;
            }
        } else if (this.heap.length === 2) {
            this.heap.pop();
        } else {
            return null;
        }
        return PopElement;
    }

    GetLength() {
        return this.heap.length - 1;
    }

}

const solution = () => {
    let time = 0;
    let answer = [];
    const MinHeap = new MINHEAP();
    jobs.sort((a, b) => {
        if (a[0] === b[0]) {
            return b[1] - a[1];
        } else {
            return b[0] - a[0];
        }
    });

    while (jobs.length) {
        MinHeap.INSERT(jobs.pop());
        while (MinHeap.GetLength() > 0) {
            const Min = MinHeap.POP();
            if (Min[0] > time) {
                time = Min[0];
            }
            time += Min[1];
            while (jobs.length) {
                if (jobs[jobs.length - 1][0] <= time) {
                    MinHeap.INSERT(jobs.pop());

                }else break;
            }
            answer.push(time - Min[0]);
        }
    }
    console.log(answer);
    return Math.floor(answer.reduce((a, b) => a + b) / answer.length);
}
console.log(solution());