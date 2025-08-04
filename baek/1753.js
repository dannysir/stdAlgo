let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

input = input.map(v => v.split(' ').map(Number));
const [V, E] = input.shift();
const [L] = input.shift();

const trees = Array.from({length: V + 1}, _ => []);

input.forEach(([from, to, cost]) => {
    trees[from].push([to, cost]);
    // trees[to].push([from, cost]);
});

class MinHeap {
    constructor() {
        this.heap = [null];
    }

    Insert(arr) {
        let cur = this.heap.length;
        while (cur > 1) {
            const parent = Math.floor(cur / 2);
            if (this.heap[parent][1] > arr[1]) {
                this.heap[cur] = this.heap[parent];
                cur = parent;
            }else break;
        }
        this.heap[cur] = arr;
    }

    Pop() {
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
                }else break;
            }


            return popElement;

        }else if (this.heap.length === 2) {
            return this.heap.pop();
        } else {
            return null;
        }

    }

    Length() {
        return this.heap.length - 1;
    }

    test() {
        console.log(this.heap);
    }
}

const dijkstra = (start) => {
    const timeTable = Array(V + 1).fill(Infinity);
    // 최적화를 위한 배열 추가
    const visited = Array(V + 1).fill(false);
    timeTable[start] = 0;
    const queue = new MinHeap();
    queue.Insert([start, 0]);

    while (queue.Length() !== 0) {
        const [now, time] = queue.Pop();

        // 최적화를 위한 코드 추가
        if (visited[now]) continue;

        visited[now] = true;

        for (const [next, cost] of trees[now]) {
            const nextTime = time + cost;

            if (timeTable[next] > nextTime) {
                timeTable[next] = nextTime;
                queue.Insert([next, nextTime]);
            }
        }
    }

    console.log(timeTable.slice(1, timeTable.length).map(v => v === Infinity ? 'INF' : v).join('\n'));
};

dijkstra(L);