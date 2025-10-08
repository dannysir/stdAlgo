const bfs = (N, M, now, visited, board) => {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const queue = [now];
    visited[now[0]][now[1]] = true;
    let idx = 0;
    let cnt = +board[now[0]][now[1]];
    while (queue.length > idx) {
        const [x, y] = queue[idx++];

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= N || ny < 0 || ny >= M || board[nx][ny] === 'X') continue;

            if (!visited[nx][ny]) {
                visited[nx][ny] = true;
                console.log(board[nx][ny]);
                cnt += +board[nx][ny];
                queue.push([nx, ny]);
            }
        }
    }
    return cnt;
}

function solution(maps) {
    var answer = [];
    const N = maps.length;
    const M = maps[0].length;
    const visited = Array.from({ length : N }, _ => Array(N).fill(false));

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (maps[i][j] !== 'X' && !visited[i][j]) {
                answer.push(bfs(N, M, [i, j], visited, maps));
            }
        }
    }

    answer.sort((a, b) => a - b);

    return answer.length === 0 ? [-1] : answer;
}