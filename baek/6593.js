let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const START = 'S';
const GOAL = 'E';
const WALL = '#';

const find = (boards, target) => {
  for (let i = 0; i < boards.length; i++) {
    for (let j = 0; j < boards[0].length; j++) {
      for (let k = 0; k < boards[0][0].length; k++) {
        if (boards[i][j][k] === target) return [i, j, k];
      }
    }
  }
};

const bfs = (boards, L, N, M) => {
  const dirs = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
  const visited = Array.from({length: L}, _ =>
    Array.from({length: N}, _ =>
      Array(M).fill(Infinity)
    )
  );

  const [l, n, m] = find(boards, START);
  const [gl, gx, gy] = find(boards, GOAL);
  visited[l][n][m] = 0;
  const queue = [[l, n, m, 0]];

  let idx = 0;

  while (queue.length > idx) {
    const [l, x, y, time] = queue[idx++];
    for (const [dl, dx, dy] of dirs) {
      const nl = l + dl;
      const nx = x + dx;
      const ny = y + dy;

      if (nl < 0 || nl >= L || nx < 0 || nx >= N || ny < 0 || ny >= M || boards[nl][nx][ny] === WALL) continue;

      if (nl === gl && nx === gx && ny === gy) return time + 1

      if (visited[nl][nx][ny] > time + 1) {
        visited[nl][nx][ny] = time + 1;
        queue.push([nl, nx, ny, time + 1]);
      }
    }
  }

  return visited[gl][gx][gy];
};

const formatAnswer = (answer) => {
  if (answer !== Infinity) {
    return `Escaped in ${answer} minute(s).`;
  }
  return 'Trapped!';
};

const solution = () => {
  const answer = [];
  while (true) {
    const [L, N, M] = input.shift().split(' ').map(Number);
    if (L === 0 && N === 0 && M === 0) break;
    const boards = [];
    for (let i = 0; i < L; i++) {
      const floor = input.splice(0, N);
      boards.push(floor.map(v => v.split('')));
      input.shift();
    }
    const time = bfs(boards, L, N, M);

    answer.push(formatAnswer(time));
  }
  console.log(answer.join('\n'));
};

solution();