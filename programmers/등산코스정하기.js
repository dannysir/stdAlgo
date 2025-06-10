const n = 6
const paths = [[1, 2, 3], [2, 3, 5], [2, 4, 2], [2, 5, 4], [3, 4, 4], [4, 5, 3], [4, 6, 1], [5, 6, 1]];
const gates = [1, 3];
const summits = [5];

class MinHeap {
    constructor() {
        this.heap = [null];
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
                if (this.heap[right] &&this.heap[left][1] > this.heap[right][1]) {
                    compare = right;
                }
                if (this.heap[compare][1] < this.heap[cur][1]) {
                    [this.heap[cur], this.heap[compare]] = [this.heap[compare], this.heap[cur]];
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

    getLength() {
        return this.heap.length - 1;
    }
}

function solution(n, paths, gates, summits) {
    const connections = Array.from({length: n + 1}, _ => []);
    paths.forEach(([start, end, cost]) => {
        connections[start].push([end, cost]);
        connections[end].push([start, cost]);
    });

    const dijk = () => {
        const heap = new MinHeap();
        const costTable = Array(n + 1).fill(Infinity);
        const isSummit = Array(n + 1).fill(false);
        summits.forEach(v => isSummit[v] = true);
        gates.forEach(v => {
            costTable[v] = 0;
            heap.Insert([v, 0]);
        });

        while (heap.getLength() > 0) {
            const [now, cost] = heap.Pop();
            if (costTable[now] < cost) continue;
            if (isSummit[now]) continue;

            for (const [next, nextCost] of connections[now]) {
                if (costTable[next] > Math.max(costTable[now], nextCost)) {
                    costTable[next] = Math.max(costTable[now], nextCost);
                    heap.Insert([next, costTable[next]]);
                }
            }
        }
        return costTable;
    };

    const costTable = dijk();

    // 산봉우리 중에서 가장 intensity가 낮은 것 찾기
    let minIntensity = Infinity;
    let bestSummit = -1;

    for (const summit of summits) {
        if (costTable[summit] < minIntensity) {
            minIntensity = costTable[summit];
            bestSummit = summit;
        } else if (costTable[summit] === minIntensity && summit < bestSummit) {
            bestSummit = summit; // 같은 intensity면 더 작은 번호 선택
        }
    }

    return [bestSummit, minIntensity];
}

solution(n, paths, gates, summits);