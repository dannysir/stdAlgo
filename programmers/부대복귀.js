let n = 3;
let roads = [[1, 2], [2, 3]];
let sources = [2, 3];
let destination = 1;

class MinHeap {
    constructor() {
        this.heap = [null];
    }

    insert(item) {
        let current = this.heap.length;
        while (current > 1) {
            const parent = Math.floor(current / 2);
            if (this.heap[parent].cost > item.cost) {
                this.heap[current] = this.heap[parent];
                current = parent;
            } else if (this.heap[parent].cost === item.cost) {
                if (this.heap[parent].node > item.node) {
                    this.heap[current] = this.heap[parent];
                    current = parent;
                } else break;
            } else break;
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
                let compareItem = leftChild;
                if (this.heap[rightChild] && this.heap[compareItem].cost > this.heap[rightChild].cost) {
                    compareItem = rightChild;
                } else if (this.heap[rightChild] && this.heap[compareItem].cost === this.heap[rightChild].cost) {
                    if (this.heap[compareItem].node > this.heap[rightChild].node) {
                        compareItem = rightChild;
                    }
                }
                if (this.heap[current].cost > this.heap[compareItem].cost) {
                    [this.heap[current], this.heap[compareItem]] = [this.heap[compareItem], this.heap[current]];
                    current = compareItem;
                } else if (this.heap[current].cost === this.heap[compareItem].cost) {
                    if (this.heap[current].node > this.heap[compareItem].node) {
                        [this.heap[current], this.heap[compareItem]] = [this.heap[compareItem], this.heap[current]];
                        current = compareItem;
                    } else break;
                } else break;

                leftChild = current * 2;
                rightChild = current * 2 + 1;
            }
        } else if (this.heap.length === 2) {
            this.heap.splice(1, 1);
        } else {
            return null;
        }
        return min;
    }

    getMin() {
        return this.heap[1];
    }

    getSize() {
        return this.heap.length - 1;
    }

    getHeap() {
        return this.heap;
    }
}

function solution(n, roads, sources, destination) {
    let answer = [];

    let list = Array.from({length: n + 1}, () => []);

    for (let i = 0; i < roads.length; i++) {
        const [start, end] = roads[i];
        list[start].push({node: end, cost: 1});
        list[end].push({node: start, cost: 1});
    }

    let shortest = Array.from({length: n + 1}, () => Infinity);
    console.log(list);
    const priorityQueue = new MinHeap();
    const visited = new Array(n + 1).fill(false);

    priorityQueue.insert({node: destination, cost: 0});
    shortest[destination] = 0;

    while (priorityQueue.getSize()) {
        const TopOfPrioriyQueue = priorityQueue.remove();
        const now = TopOfPrioriyQueue.node;

        if (!visited[now]) {
            visited[now] = true;

            for (const node of list[now]) {
                const pathNodeCost = node.cost;
                const fullCost = TopOfPrioriyQueue.cost + pathNodeCost;
                shortest[node.node] = Math.min(shortest[node.node], fullCost);
                priorityQueue.insert({node: node.node, cost: fullCost});
                console.log(priorityQueue.getHeap());
                console.log(shortest);
            }
        }
    }

    for (let i = 0; i < sources.length; i++) {
        if (shortest[sources[i]] === Infinity) {
            answer.push(-1);
        } else {
            answer.push(shortest[sources[i]]);
        }
    }

    return answer;
}

console.log(solution(n, roads, sources, destination));
// function solution(n, roads, sources, destination) {
//     const trees = new Array(n + 1).fill().map(_ => []);
//     for (let i = 0; i < roads.length; i++) {
//         trees[roads[i][0]].push(roads[i][1]);
//         trees[roads[i][1]].push(roads[i][0]);
//     }
//     let visited = new Array(n + 1).fill(Infinity);
//
//     const BFS = (goal) => {
//         visited[goal] = 0;
//         let queue = [goal];
//         while (queue.length) {
//             let now = queue.shift();
//             for (let i = 0; i < trees[now].length; i++) {
//                 if (visited[now] + 1 < visited[trees[now][i]]) {
//                     visited[trees[now][i]] = visited[now] + 1;
//                     queue.push(trees[now][i]);
//                 }
//             }
//         }
//     };
//     BFS(destination);
//     for (const army of sources) {
//         if (visited[army] === Infinity) {
//             answer.push(-1);
//         }else{
//             answer.push(visited[army]);
//         }
//
//     }
//     console.log(answer);
// }