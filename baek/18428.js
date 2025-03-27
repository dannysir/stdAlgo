let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split('\n');

const N = Number(input.shift());
const boards = input.map(v => v.split(' '));
const comArr = [];
const teacherPos = [];
const emptyPos = [];
boards.forEach((row, x) => {
    row.forEach((value, y) => {
        if (value === 'X') {
            emptyPos.push([x, y]);
        }
        if (value === 'T') {
            teacherPos.push([x, y]);
        }
    });
})
const combination = (arr, index) => {
    if (arr.length >= 3) {
        comArr.push(arr);
        return;
    }

    for (let i = index; i < emptyPos.length; i++) {
        combination([...arr, emptyPos[i]], i + 1);
    }
};

combination([], 0);

const check = (x, y, boards) => {
    let flag = true;
    for (let i = x - 1; i >= 0; i--) {
        if (boards[i][y] === 'O') break;
        if (boards[i][y] === 'S') {
            flag = false;
            break;
        }
    }

    for (let i = x + 1; i < N; i++) {
        if (boards[i][y] === 'O') break;
        if (boards[i][y] === 'S') {
            flag = false;
            break;
        }
    }
    for (let i = y - 1; i >= 0; i--) {
        if (boards[x][i] === 'O') break;
        if (boards[x][i] === 'S') {
            flag = false;
            break;
        }
    }
    for (let i = y + 1; i < N; i++) {
        if (boards[x][i] === 'O') break;
        if (boards[x][i] === 'S') {
            flag = false;
            break;
        }
    }
    return flag;
};

const solution = (objArr, boards) => {
    // 현재 boards 상태 복사
    const boardsCopy = boards.map(row => [...row]);
킹
    // 장애물 설치
    objArr.forEach(position => {
        const [x, y] = position;
        boardsCopy[x][y] = 'O';
    });

    // 모든 선생님 위치에서 학생이 보이는지 확인
    for (const [x, y] of teacherPos) {
        if (!check(x, y, boardsCopy)) {
            return false;
        }
    }

    return true;
};
let answer = 'NO';
for (const arr of comArr) {
    const result = solution(arr, boards);
    if (result) {
        answer = 'YES';
        break;
    }
}

console.log(answer);