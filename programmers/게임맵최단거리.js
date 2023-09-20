let maps = [[1, 0, 1, 1, 1], [1, 0, 1, 0, 1], [1, 0, 1, 1, 1], [1, 1, 1, 0, 1], [0, 0, 0, 0, 1]];
let [N, M] = [maps.length, maps[0].length];
let visited = new Array(N);
for (let i = 0; i < N; i++) {
    visited[i] = new Array(M).fill(false);
}
visited[0][0] = true;

function BFS(nowX, nowY) {
    let queue = [[nowX, nowY]];
    let dx = [1, -1, 0, 0];
    let dy = [0, 0, 1, -1];
    while (queue.length) {
        let [x, y] = queue.shift();
        for (let i = 0; i < dx.length; i++) {
            let nextX = x + dx[i];
            let nextY = y + dy[i];
            if (nextX >= 0 && nextX < N && nextY >= 0 && nextY < M) {
                if (maps[nextX][nextY] !== 0 && visited[nextX][nextY] === false) {
                    queue.push([nextX, nextY]);
                    visited[nextX][nextY] = true;
                    maps[nextX][nextY] = maps[x][y] + 1;
                }
            }else continue;

        }
    }
}

BFS(0, 0);

console.log(visited);
console.log(maps);