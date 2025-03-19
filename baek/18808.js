let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split('\n');

const [N, M, K] = input.shift().split(' ').map(Number);
const blocks = [];
const boards = Array.from({length: N}, _ => Array(M).fill(0));

for (let i = 0; i < K; i++) {
    const [height, width] = input.shift().split(' ').map(Number);
    const block = input.splice(0, height).map(v => v.split(' ').map(Number));
    blocks.push(block);
}

// console.log(blocks);

const checkPossible = (x, y, block) => {
    const n = block.length;
    const m = block[0].length;
    if (x + n - 1 >= N || y + m - 1 >= M) return false;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (block[i][j] === 1 && boards[x + i][y + j] !== 0) return false;
        }
    }

    return true;
};

const fillBlock = (block) => {
    const n = block.length;
    const m = block[0].length;

    let flag = false;
    let pX = -1;
    let pY = -1;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            flag = checkPossible(i, j, block);
            if (flag) {
                pX = i;
                pY = j;
                break;
            }
        }
        if (flag) break;
    }

    if (flag) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (block[i][j] === 1) {
                    boards[pX + i][pY + j] = block[i][j];
                }
            }
        }
        return true;
    } else {
        return false;
    }
};

const turnBlock = (block) => {
    const n = block.length;
    const m = block[0].length;

    const newBlock = Array.from({length: m}, _ => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            newBlock[j][n - i - 1] = block[i][j];
        }
    }
    return newBlock;
};

const solution = () => {
    for (let i = 0; i < K; i++) {
        let block = blocks[i];
        let result = fillBlock(block);
        //회전
        for (let j = 0; j < 3; j++) {
            if (result) break;
            if (!result) {
                block = turnBlock(block);
                result = fillBlock(block);
            }
        }

    }

    console.log(boards.flat().reduce((acc, cur) => acc + cur, 0));
};

solution();
