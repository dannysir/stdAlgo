let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const boards = input.map(v => v.split('').map(Number));
const findBlank = () => {
    const blank = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (boards[i][j] === 0) {
                blank.push([i, j]);
            }
        }
    }
    return blank;
};

const findNumber = (x, y) => {
    const numArr = Array(10).fill(false);
    numArr[0] = true;

    // 가로 세로 확인
    for (let i = 0; i < 9; i++) {
        numArr[boards[i][y]] = true;
        numArr[boards[x][i]] = true;
    }

    // 3x3 박스 확인
    const startRow = Math.floor(x / 3) * 3;
    const startCol = Math.floor(y / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            numArr[boards[i][j]] = true;
        }
    }

    const answer = [];
    numArr.forEach((value, index) => {
        if (!value) {
            answer.push(index);
        }
    });
    return answer;
};
const dfs = (arr, index) => {
    if (arr.length === index) {
        return true;
    }
    const [x, y] = arr[index];
    const possible = findNumber(x, y);
    for (const possibleNumber of possible) {
        boards[x][y] = possibleNumber;
        if (dfs(arr, index + 1)) {
            return true;
        }
        boards[x][y] = 0;
    }

    return false;
}
const solution = () => {
    const blank = findBlank();
    dfs(blank, 0);
    console.log(boards.map(v => v.join('')).join('\n'));
};
solution();