let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M, T] = input.shift().split(' ').map(Number);
const box = input.map(v => v.split(' ').map(Number));
const board = Array.from({length: M}, _ => Array(N).fill(0));

const fillBox = (lx, ly, rx, ry, visited) => {
    for (let i = lx; i < rx; i++) {
        for (let j = ly; j < ry; j++) {
            visited[i][j] = -1;
        }
    }
};

box.forEach(v => {
    const [lx, ly, rx, ry] = v;
    fillBox(lx, ly, rx, ry, board);
});

const DFS = (x, y, board) => {
    if (x < 0 || x >= board.length || y < 0 || y >= board[0].length) return 0;

    if (board[x][y] !== 0) return 0;

    board[x][y] = 1;

    return 1 +
        DFS(x + 1, y, board) +
        DFS(x - 1, y, board) +
        DFS(x, y + 1, board) +
        DFS(x, y - 1, board);
};

const main = () => {
    let cnt = 0;
    const arr = [];
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (board[i][j] === 0) {
                cnt++;
                arr.push(DFS(i, j, board));
            }
        }
    }
    arr.sort((a, b) => a - b);
    console.log(`${cnt}\n${arr.join(' ')}`);
};

main();