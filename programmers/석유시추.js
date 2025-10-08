const bfs = (n, m, now, board, visited) => {
    const queue = [now];
    const range = new Set();
    range.add(now[1]);
    visited[now[0]][now[1]] = true;
    const dirs = [[1,0], [-1,0],[0,1],[0,-1]];
    let idx = 0;
    let size = 1;
    while (queue.length > idx) {
        const [x, y] = queue[idx++];

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= n || ny < 0 || ny >= m || board[nx][ny] === 0) continue;

            if (!visited[nx][ny] && board[nx][ny] === 1) {
                visited[nx][ny] = true;
                size++;
                queue.push([nx, ny]);
                range.add(ny);
            }
        }
    }
    return [size, [...range]];
}

function solution(land) {
    const N = land.length;
    const M = land[0].length;
    const rowTable = Array(land[0].length).fill(0);
    const visited = Array.from({length : N}, _ => Array(M).fill(false));

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (land[i][j] === 1 && !visited[i][j]) {
                const [size, range] = bfs(N, M, [i, j], land, visited);
                range.forEach(col => {
                    rowTable[col] += size;
                })
            }
        }
    }
    return Math.max(...rowTable);
}