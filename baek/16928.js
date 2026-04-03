let fs = require('fs');
let input = fs.readFileSync('./input.text').toString().trim().split('\n');
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

input = input.map(v => v.split(' ').map(Number));

const [N, M] = input.shift();

const lines = new Map();

input.forEach(([from, to]) => {
  lines.set(from, to);
});

const bfs = (lines) => {
  const visited = Array(101).fill(Infinity);
  visited[1] = 0;
  const queue = [[1, 0]];
  const dices = [1, 2, 3, 4, 5, 6];

  let idx = 0;

  while (queue.length > idx) {
    const [now, time] = queue[idx++];

    for (const dice of dices) {
      let next = now + dice;

      if (next > 100) continue;

      if (lines.has(next)) {
        if (visited[next] > time + 1) visited[next] = time + 1;
        next = lines.get(next);
      }

      if (visited[next] > time + 1) {
        visited[next] = time + 1;
        queue.push([next, time + 1]);
      }
    }
  }

  console.log(visited[100]);
};

bfs(lines);