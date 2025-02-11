let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = Number(input.shift());
let boards = input.map(v => v.split(' ').map(Number));

const compressArr = (arr) => {
    return arr.map((row) => {
        const newArr = [];
        let merged = false;

        for (let i = 0; i < row.length; i++) {
            if (row[i] === 0) continue;

            if (newArr.length === 0) {
                newArr.push(row[i]);
                merged = false;
            } else {
                const last = newArr[newArr.length - 1];
                if (!merged && last === row[i]) {
                    newArr[newArr.length - 1] = last * 2;
                    merged = true;
                } else {
                    newArr.push(row[i]);
                    merged = false;
                }
            }
        }
        return newArr;
    });
};

const moveUp = (boards) => {
    const numArr = Array.from({length: N}, _ => []);

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (boards[i][j] !== 0) {
                numArr[j].push(boards[i][j]);
            }
        }
    }

    const afterArr = compressArr(numArr);

    let nextBoard = Array.from({length: N}, _ => Array(N).fill(0));
    afterArr.forEach((arr, y) => {
        arr.forEach((num, x) => {
            nextBoard[x][y] = num;
        })
    });
    return nextBoard;
};

const moveDown = (boards) => {
    const numArr = Array.from({length: N}, _ => []);

    for (let i = N - 1; i >= 0; i--) {
        for (let j = 0; j < N; j++) {
            if (boards[i][j] !== 0) {
                numArr[j].push(boards[i][j]);
            }
        }
    }

    const afterArr = compressArr(numArr);
    let nextBoard = Array.from({length: N}, _ => Array(N).fill(0));
    afterArr.forEach((arr, y) => {
        arr.forEach((num, x) => {
            nextBoard[N - 1 - x][y] = num;
        })
    });
    return nextBoard;
};

const moveLeft = (boards) => {
    const afterArr = compressArr(boards);
    let nextBoard = Array.from({length: N}, _ => Array(N).fill(0));
    afterArr.forEach((arr, x) => {
        arr.forEach((num, y) => {
            nextBoard[x][y] = num;
        })
    });
    return nextBoard;
};

const moveRight = (boards) => {
    // 각 행을 복사해서 reverse
    const afterArr = compressArr(boards.map(v => [...v].reverse()));
    let nextBoard = Array.from({length: N}, _ => Array(N).fill(0));
    afterArr.forEach((arr, x) => {
        arr.forEach((num, y) => {
            nextBoard[x][N - 1 - y] = num;
        })
    });
    return nextBoard;
};

// 0: 상, 1: 하, 2: 좌, 3: 우
const combination = (arr, result) => {
    if (arr.length === 5) {
        result.push(arr);
        return;
    }
    for (let i = 0; i < 4; i++) {
        combination([...arr, i], result);
    }
};

const solution = () => {
    const everyCombinations = [];
    combination([], everyCombinations);
    let max = 0;
    everyCombinations.forEach((actions) => {
        let tmpBoards = JSON.parse(JSON.stringify(boards));
        actions.forEach(action => {
            if (action === 0) {
                tmpBoards = moveUp(tmpBoards);
            }
            if (action === 1) {
                tmpBoards = moveDown(tmpBoards);
            }
            if (action === 2) {
                tmpBoards = moveLeft(tmpBoards);
            }
            if (action === 3) {
                tmpBoards = moveRight(tmpBoards);
            }
        });
        max = Math.max(...tmpBoards.flat(), max);
    });
    console.log(max);
};
solution();