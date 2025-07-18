let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
let boards = input.map(v => v.split(' ').map(Number));

const checkStandard = (visited) => {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (visited[i][j] && boards[i][j] > 0) {
                return [i, j];
            }
        }
    }
    return null;
};

const bfs = (now) => {
    const visited = Array.from({length: N}, _ => Array(N).fill(false));
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const queue = [now];
    const color = boards[now[0]][now[1]];
    visited[now[0]][now[1]] = true;
    let idx = 0;
    let size = 1;
    let rainbow = 0;
    while (queue.length > idx) {
        const [x, y] = queue[idx];

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
            if (!visited[nx][ny] && (boards[nx][ny] === color || boards[nx][ny] === 0)) {
                visited[nx][ny] = true;
                size++;
                if (boards[nx][ny] === 0) rainbow++;
                queue.push([nx, ny]);
            }
        }
        idx++;
    }

    return [size, rainbow, visited, ...checkStandard(visited)];
};

const deleteBlock = (block) => {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (block[i][j]) {
                boards[i][j] = -2;
            }
        }
    }
};

const gravity = () => {
    for (let i = N - 1; i >= 0; i--) {
        for (let j = 0; j < N; j++) {
            if (boards[i][j] >= 0) {
                let nx = i + 1;

                while (nx < N) {
                    if (boards[nx][j] !== -2) {
                        break;
                    }
                    nx++;
                }

                if (nx - 1 !== i) {
                    boards[nx - 1][j] = boards[i][j];
                    boards[i][j] = -2;
                }
            }
        }
    }
};

const rotateBoard = () => {
    const newBoard = Array.from({length: N}, _ => Array(N).fill(0));

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            newBoard[N - j - 1][i] = boards[i][j];
        }
    }

    boards = newBoard;
};

const solution = () => {
    let score = 0;
    while (true) {
        let size = 0;
        let x = 0;
        let y = 0;
        let rainbow = 0;
        let block = null;
        let visited = Array.from({length: N}, _ => Array(N).fill(false));

        // 최대 블록 찾기
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (!visited[i][j] && boards[i][j] > 0) {
                    const [rSize, rRainbow, rVisited, rX, rY] = bfs([i, j]);
                    if (rSize > size) {
                        [size, rainbow, block, x, y] = [rSize, rRainbow, rVisited, rX, rY];
                    } else if (rSize === size) {
                        if (rRainbow > rainbow) {
                            [size, rainbow, block, x, y] = [rSize, rRainbow, rVisited, rX, rY];
                        }else if (rRainbow === rainbow) {
                            if (rX > x) {
                                [size, rainbow, block, x, y] = [rSize, rRainbow, rVisited, rX, rY];
                            } else if (rX === x) {
                                if (rY > y) {
                                    [size, rainbow, block, x, y] = [rSize, rRainbow, rVisited, rX, rY];
                                }
                            }
                        }
                    }

                    visited = visited.map((arr, x) => arr.map(
                        (value, y) => {
                            return visited[x][y] || rVisited[x][y];
                        }
                    ));
                }
            }
        }

        // 종료 조건
        if (size < 2) {
            break;
        }
        //점수 추가
        score += size ** 2;
        // 삭제
        deleteBlock(block);
        // 중력
        gravity();
        // 회전
        rotateBoard();
        // 중력
        gravity();
    }
    console.log(score);
};

solution();