let fs = require('fs');
let input = fs.readFileSync('./input.text').toString().trim().split('\n');
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const lines = input.map(v => v.split(' ').map(Number));

const trees = {};
lines.forEach(([from, to, cost]) => {
  if (trees[from - 1]) {
    trees[from - 1].push([to - 1, cost]);
  } else {
    trees[from - 1] = [[to - 1, cost]];
  }
});

const dp = Array.from({ length: N }, () => Array(1 << N).fill(Infinity));
const parent = Array.from({ length: N }, () => Array(1 << N).fill(-1)); // ⭐ 추가

const bfs = (start) => {
  const queue = [[start, (1 << start), 0]];
  const fullVisited = (1 << N) - 1;
  let idx = 0;

  dp[start][1 << start] = 0;

  let minCost = Infinity;
  let endNode = -1;

  while (queue.length > idx) {
    const [now, v, m] = queue[idx++];

    if (dp[now][v] < m) continue;
    if (!trees[now]) continue;

    for (const [next, cost] of trees[now]) {
      if (v & (1 << next)) continue;

      const nV = v | (1 << next);
      const nM = Math.max(m, cost);

      if (dp[next][nV] <= nM) continue;

      dp[next][nV] = nM;
      parent[next][nV] = now;
      queue.push([next, nV, nM]);

      if (nV === fullVisited) {
        if (!trees[next]) continue;

        const goHome = trees[next].find(v => v[0] === start);
        if (!goHome) continue;

        const total = Math.max(nM, goHome[1]);

        if (minCost > total) {
          minCost = total;
          endNode = next;
        }
      }
    }
  }

  if (minCost === Infinity) {
    console.log(-1);
    return;
  }

  const path = [];
  let cur = endNode;
  let visited = fullVisited;

  while (cur !== -1) {
    path.push(cur);
    const prev = parent[cur][visited];
    visited ^= (1 << cur);
    cur = prev;
  }

  path.reverse();
  path.push(start); // 사이클 완성
  path.pop();
  console.log(minCost);
  console.log(path.map(v => v + 1).join(' ')); // ⭐ 1-index
};

bfs(0);