let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

input = input.map(v => v.split(' ').map(Number));

const boards = [];

for (let i = 0; i < 5; i++) {
    boards.push(input.splice(0, 5));
}

const combination = (n, arr, max, result, flag, visited) => {
    if (arr.length === n) {
        result.push(arr);
        return;
    }

    if (!flag) {
        for (let i = 0; i < max; i++) {
            if (!visited[i]) {
                visited[i] = true;
                combination(n, [...arr, i], max, result, flag, visited);
                visited[i] = false;
            }
        }
    } else {
        for (let i = 0; i < max; i++) {
            combination(n, [...arr, i], max, result, flag, visited);
        }
    }
};

const layersCombination = [];
const layersCombinationVisited = Array(5).fill(false);
combination(5, [], 5, layersCombination, false, layersCombinationVisited);

const turnCombination = [];
combination(5, [], 4, turnCombination, true);

const bfs = (now, board) => {
    const queue = [[...now, 0]];
    const dirs = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
    const visited = Array.from({length: 5}, _ => {
        return Array.from({length: 5}, _ => {
            return Array(5).fill(false);
        })
    })
    visited[0][0][0] = true;
    let idx = 0;
    while (queue.length > idx) {
        const [x, y, z, cnt] = queue[idx];

        if (x === 4 && y === 4 && z === 4) {
            return cnt;
        }

        for (const [dx, dy, dz] of dirs) {
            const nx = x + dx;
            const ny = y + dy;
            const nz = z + dz;
            const nCnt = cnt + 1;

            if (nx < 0 || nx >= 5 || ny < 0 || ny >= 5 || nz < 0 || nz >= 5) continue;

            if (!visited[nx][ny][nz] && board[nx][ny][nz] === 1) {
                visited[nx][ny][nz] = true;
                queue.push([nx, ny, nz, nCnt]);
            }
        }
        idx++;
    }

    return -1;
};

const rotate90Degree = (board) => {
    const nextBoard = Array.from({length: 5}, _ => Array(5).fill(0));

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            nextBoard[j][4 - i] = board[i][j];
        }
    }

    return nextBoard;
};

const rotate180Degree = (board) => {
    const nextBoard = Array.from({length: 5}, _ => Array(5).fill(0));

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            nextBoard[4 - i][4 - j] = board[i][j];
        }
    }

    return nextBoard;
};

const rotate270Degree = (board) => {
    const nextBoard = Array.from({length: 5}, _ => Array(5).fill(0));

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            nextBoard[4 - j][i] = board[i][j];
        }
    }

    return nextBoard;
};

// 0:그대로, 1:90도, 2:180도, 3:270도
const rotate = (board, n) => {
    let nextBoard = board;
    switch (n) {
        case 1:
            nextBoard = rotate90Degree(board);
            break;
        case 2:
            nextBoard = rotate180Degree(board);
            break;
        case 3:
            nextBoard = rotate270Degree(board);
            break;
        default :
            break;
    }
    return nextBoard;
};


const solution = () => {
    let min = -1;
    layersCombination.forEach((layers) => {
        turnCombination.forEach((turnArr) => {
            const newBoard = [];
            layers.forEach((layer, index) => {
                newBoard.push(rotate(boards[layer], turnArr[index]));
            });
            if (newBoard[0][0][0] === 1) {
                const result = bfs([0, 0, 0], newBoard);
                if (result !== -1) {
                    if (min === -1) {
                        min = result;
                    } else {
                        min = Math.min(min, result);
                    }
                }
            }
        });
    });
    console.log(min);
};
solution();