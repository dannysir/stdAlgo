let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.splice(0, 2).map(Number);
const lines = input.splice(0, M).map(v => v.split(' ').map(Number));
const [from, to] = input.shift().split(' ').map(Number);

const trees = Array.from({length: N + 1}, _ => []);

lines.forEach(([from, to, cost]) => {
    trees[from].push([to, cost]);
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
    const visited = Array(N + 1).fill(false);
    const timeTable = Array.from({length: N + 1}, _ => [Infinity, []]);
    timeTable[start] = [0, [start]];
    const queue = new MinHeap();
    queue.Insert([start, 0]);

    while (queue.Length()) {
        const [now, time] = queue.Pop();

        if (visited[now]) continue;

        visited[now] = true;

        for (const [next, cost] of trees[now]) {
            const nextTime = time + cost;

            if (timeTable[next][0] > nextTime) {
                timeTable[next] = [nextTime, [...timeTable[now][1], next]];
                queue.Insert([next, nextTime]);
            }
        }
    }
    const answer = timeTable[to];

    console.log(`${answer[0]}\n${answer[1].length}\n${answer[1].join(' ')}`);
};

dijkstra(from);