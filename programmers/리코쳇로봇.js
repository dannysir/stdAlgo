function solution(board) {
    var answer = 0;
    const boards = board.map(v => v.split(''));
    const Goal = [];
    const Init = [];
    const visited = Array.from({length : boards.length}, _ => Array(boards[0].length).fill(false));
    for (let i = 0; i < boards.length; i++) {
        for (let j = 0; j < boards[0].length; j++) {
            if (boards[i][j] === 'G') {
                Goal[0] = i;
                Goal[1] = j;
            }
            if (boards[i][j] === 'R') {
                Init[0] = i;
                Init[1] = j;
                visited[i][j] = true;
            }
        }
    }

    const isBlocked = (x, y) => {
        if (x < 0 || x >= boards.length || y < 0 || y >= boards[0].length) return true;
        if (boards[x][y] === 'D') return true;
        return false;
    }

    const findNextPosition = (x, y, dir) => {
        const [dx, dy] = dir;
        let nx = x + dx;
        let ny = y + dy;
        while (!isBlocked(nx, ny)) {
            x = nx;
            y = ny;
            nx = x + dx;
            ny = y + dy;
        }


        return [x, y];
    }

    const bfs = () => {
        const queue = [];
        // x, y, cnt
        queue.push([...Init, 0]);

        const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        let idx = 0;
        while (queue.length > idx) {
            const [x, y, cnt] = queue[idx];

            for (const dir of dirs) {
                const [nx, ny] = findNextPosition(x, y, dir);
                if (visited[nx][ny]) continue;

                if (boards[nx][ny] === 'G') {
                    return cnt + 1;
                }
                visited[nx][ny] = true;
                queue.push([nx, ny, cnt + 1]);
            }

            idx++;
        }
        return -1
    }

    return bfs();
}