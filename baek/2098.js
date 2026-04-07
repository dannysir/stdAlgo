let fs = require('fs');
let input = fs.readFileSync('./input.text').toString().trim().split('\n');
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
const table = input.map(v => v.split(' ').map(Number));

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  insert(e) {
    let cur = this.heap.length;
    while (cur > 1) {
      const parent = Math.floor(cur / 2);

      if (this.heap[parent][1] > e[1]) {
        this.heap[cur] = this.heap[parent];
        cur = parent;
      } else break;
    }

    this.heap[cur] = e;
  }

  pop() {
    if (this.heap.length > 2) {
      const result = this.heap[1];
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

      return result;
    } else if (this.heap.length === 2) {
      return this.heap.pop();
    } else {
      return null;
    }
  }

  print() {
    console.log(this.heap);
  }

  getLength() {
    return this.heap.length - 1;
  }
}

// const test = () => {
//   const heap = new MinHeap();
//   const element = [10, 1, 100, 1, 1, 10, 1000, 10000];
//
//   element.forEach(v => {
//     heap.insert(v);
//     // heap.print();
//   });
//
//   console.log(element.join(' -> '));
//
//   element.forEach(v => {
//     console.log(heap.pop());
//     // heap.print();
//   });
//
//   heap.print();
// };
//
// test();


const bfs = (N, table, now) => {
  let answer = Infinity;
  const queue = new MinHeap();
  const costs = Array.from({length: N}, _ => Array(1 << N).fill(Infinity));
  const fullVisit = (1 << N )- 1;
  const nowVisit = 1 << now;
  queue.insert([now, 0, nowVisit]); // now, cost, cnt

  while (queue.getLength() > 0) {
    const [n, cost, visited] = queue.pop();

    if (costs[n][visited] < cost) continue;

    for (let next = 0; next < N; next++) {
      if (table[n][next] === 0) continue;
      if (visited & (1 << next)) continue;

      const nVisited = visited | (1 << next);
      const nCost = cost + table[n][next]

      if (nVisited === fullVisit) {
        if (table[next][now] === 0) continue;
        answer = Math.min(answer, nCost + table[next][now]);
        continue;
      }

      if (costs[next][nVisited] > nCost) {
        costs[next][nVisited] = nCost;
        queue.insert([next, nCost, nVisited]);
      }
    }
  }

  return answer;
};

const solution = (n, table) => {
  console.log(bfs(n, table, 0));
};

solution(N, table);