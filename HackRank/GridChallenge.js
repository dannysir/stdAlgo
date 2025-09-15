let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
const TC = +input.shift();

const checkRow = (n, m, boards) => {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m - 1; j++) {
            const now = boards[i][j];
            const next = boards[i][j + 1];
            if (now.charCodeAt(0) >  next.charCodeAt(0)) {
                return false;
            }
        }
    }

    return true;
}

const checkColumn = (n, m, boards) => {
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n - 1; j++) {
            const now = boards[j][i];
            const next = boards[j + 1][i];
            if (now.charCodeAt(0) >  next.charCodeAt(0)) {
                return false;
            }
        }
    }
    return true;
}

function gridChallenge(grid) {
    // Write your code here
    grid = grid.map(v => v.split(''));
    const n = grid.length;
    const m = grid[0].length;
    return checkRow(n, m, grid) || checkColumn(n, m, grid) ? 'YES' : 'NO';
}

for (let i = 0; i < TC; i++) {
    const n = +input.shift();
    const boards = input.splice(0, n);
    console.log(gridChallenge(boards));
}