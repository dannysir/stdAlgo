const fares = [[2, 6, 6], [6, 3, 7], [4, 6, 7], [6, 5, 11], [2, 5, 12], [5, 3, 20], [2, 4, 8], [4, 3, 9]];
const [n, s, a, b] = [6, 4, 5, 6];

const Lines = {};

for (const [Start, End, Cost] of fares) {
    if (Lines[Start] === undefined) {
        Lines[Start] = [[End, Cost]];
    } else {
        Lines[Start].push([End, Cost]);
    }

    if (Lines[End] === undefined) {
        Lines[End] = [[Start, Cost]];
    } else {
        Lines[End].push([Start, Cost]);

    }
}
console.log(Lines);
class MinHeap {
    constructor() {
        this.heap = [null];
    }

    Insert(item) {
        let Current = this.heap.length;
        while (Current > 1) {
            const Parent = Math.floor(Current / 2);
            if (this.heap[Parent][1] > item[1]) {
                this.heap[Current] = this.heap[Parent];
                Current = Parent;
            } else break;
        }
        this.heap[Current] = item;
    }

    Pop() {
        if (this.heap.length > 2) {
            const PopItem = this.heap[1];
            this.heap[1] = this.heap.pop();
            let Current = 1;
            let Left = Current * 2;
            let Right = Current * 2 + 1;
            while (this.heap[Left]) {
                let Compare = Left;
                if (this.heap[Right] && this.heap[Left][1] > this.heap[Right][1]) {
                    Compare = Right;
                }

                if (this.heap[Compare][1] < this.heap[Current][1]) {
                    [this.heap[Compare], this.heap[Current]] = [this.heap[Current], this.heap[Compare]];
                    Current = Compare;
                    Left = Current * 2;
                    Right = Current * 2 + 1;
                } else break;
            }
            return PopItem;
        } else if (this.heap.length === 2) {
            return this.heap.pop();
        } else {
            return null;
        }
    }

    GetLength() {
        return this.heap.length - 1;
    }

}

const Dijkstra = (now) => {
    let Weight = new Array(n).fill(Number.MAX_SAFE_INTEGER);
    const Queue = new MinHeap();
    console.log(Lines[now], now);
    Lines[now].forEach(v => {
        Queue.Insert(v);
    });
    Weight[now - 1] = 0;
    while (Queue.GetLength()) {
        const [End, Cost] = Queue.Pop();
        if (Weight[End - 1] > Cost) {
            Weight[End - 1] = Cost;
            for (const [Next, NextCost] of Lines[End]) {
                Queue.Insert([Next, NextCost + Cost]);
            }
        }
    }
    return Weight;
};


const EachDistance = () => {
    const FromCo = Dijkstra(s);
    let min = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < FromCo.length; i++) {
        if (Lines[i + 1]) {
            let total = 0;
            let distance = Dijkstra(i + 1);
            total += FromCo[i] + distance[a - 1] + distance[b - 1];
            min = min > total ? total : min;
        }
    }
    console.log(min);
};
EachDistance();