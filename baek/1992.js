let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const N = Number(input.shift());

const boards = input.map(v => v.split('').map(Number));

const checkSame = (x, y, size) => {
    let flag = true;
    for (let i = x; i < x + size; i++) {
        if (!flag) break;
        for (let j = y; j < y + size; j++) {
            if (boards[x][y] !== boards[i][j]) {
                flag = false;
                break;
            }
        }
    }
    return flag;
}

const divide = (x, y, size) => {
    // 영역이 모두 같은지 먼저 체크
    if (checkSame(x, y, size)) {
        return String(boards[x][y]);
    }

    // 다르다면 4등분
    const nextSize = size / 2;
    let result = '(';

    // 왼쪽 위
    result += divide(x, y, nextSize);
    // 오른쪽 위
    result += divide(x, y + nextSize, nextSize);
    // 왼쪽 아래
    result += divide(x + nextSize, y, nextSize);
    // 오른쪽 아래
    result += divide(x + nextSize, y + nextSize, nextSize);

    return result + ')';
};

const answer = divide(0, 0, N);
console.log(answer);