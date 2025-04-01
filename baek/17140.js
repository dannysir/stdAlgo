let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split('\n');

const [R, C, K] = input.shift().split(' ').map(Number);
let boards = input.map(v => v.split(' ').map(Number));

const sortEach = (arr) => {
    const countMap = new Map();

    arr.forEach(v => {
        if (v !== 0) {
            if (countMap.has(v)) {
                countMap.set(v, countMap.get(v) + 1);
            } else {
                countMap.set(v, 1);
            }
        }
    });

    const sortedResult = [...countMap].sort((a, b) => {
        if (a[1] !== b[1]) {
            return a[1] - b[1];
        } else {
            return a[0] - b[0];
        }
    });

    return sortedResult.flat();
};

const rCalculate = (boards) => {
    let max = 0;
    const nextBoards = [];

    boards.forEach(v => {
        const nextRow = sortEach(v);
        max = Math.max(nextRow.length, max);
        nextBoards.push(nextRow);
    });

    return nextBoards.map((value) => {
        const tmp = Array(max).fill(0);
        value.forEach((v, i) => {
            tmp[i] = v;
        });
        return tmp;
    });
};

const cCalculate = (boards) => {
    let max = 0;
    const tmpArr = [];

    for (let i = 0; i < boards[0].length; i++) {
        const column = Array(boards.length).fill(0);
        for (let j = 0; j < boards.length; j++) {
            column[j] = boards[j][i];
        }
        const tmp = sortEach(column);
        max = Math.max(max, tmp.length);
        tmpArr.push(tmp);
    }

    const nextBoards = Array.from({length: max}, _ => Array(boards[0].length).fill(0));

    for (let y = 0; y < tmpArr.length; y++) {
        for (let x = 0; x < tmpArr[y].length; x++) {
            nextBoards[x][y] = tmpArr[y][x];
        }
    }

    return nextBoards;
};

const solution = () => {
    let timer = 0;
    let answer = -1;
    while (timer <= 100) {
        const r = boards.length;
        const c = boards[0].length;

        if (r >= R && c >= C && boards[R - 1][C - 1] === K) {
            answer = timer;
            break;
        }
        timer++;

        if (r >= c) {
            boards = rCalculate(boards);
        } else {
            boards = cCalculate(boards);
        }
    }
    console.log(answer);
};

solution();