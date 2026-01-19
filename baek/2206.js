let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const boards = input.map(v => v.split('').map(Number));

const bfs = (board, N, M) => {
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const visited = Array.from({length: 2}, _ =>
    Array.from({length: N}, _ => Array(M).fill(Infinity))
  );
  const queue = [[0, 0, 0, 1]];
  visited[0][0][0] = 1;
  let idx = 0;
  while (queue.length > idx) {
    const [l, x, y, time] = queue[idx++];

    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

      if (nx === N - 1 && ny === M - 1) return time + 1;

      if (board[nx][ny] === 0) {
        if (visited[l][nx][ny] > time + 1) {
          visited[l][nx][ny] = time + 1;
          queue.push([l, nx, ny, time + 1]);
        }
      } else {
        if (l < 1 && visited[l + 1][nx][ny] > time + 1) {
          visited[l + 1][nx][ny] = time + 1;
          queue.push([l + 1, nx, ny, time + 1]);
        }
      }
    }
  }

  const answer = visited[0][N - 1][M - 1] === Infinity ? visited[1][N - 1][M - 1] : visited[0][N - 1][M - 1];
  return answer === Infinity ? -1 : answer;
};

const answer = bfs(boards, N, M);

console.log(answer);