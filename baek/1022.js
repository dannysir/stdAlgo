let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [r1, c1, r2, c2] = input[0].split(' ').map(Number);

const max = Math.max(...[r1, r2, c1, c2].map(v => Math.abs(v)));

const boards = Array.from({length: r2 - r1 + 1}, _ => Array(c2 - c1 + 1).fill(0));

const dirs = [[0, 1], [-1, 0], [0, -1], [1, 0]];

const fillBoard = () => {
    let nowDir = 0;
    let x = 0;  // 절대 좌표
    let y = 0;
    let stepSize = 1;
    let stepCount = 0;
    let sameDirectionCount = 0;

    // 첫 번째 숫자가 범위 안에 있는지 확인
    if (x >= r1 && x <= r2 && y >= c1 && y <= c2) {
        boards[x - r1][y - c1] = 1;
    }

    let num = 2;
    // 최대 범위를 벗어날 때까지 계속
    while (Math.abs(x) <= max * 2 && Math.abs(y) <= max * 2) {
        // 다음 위치 계산
        x += dirs[nowDir][0];
        y += dirs[nowDir][1];
        stepCount++;

        // 현재 위치가 범위 안에 있으면 저장
        if (x >= r1 && x <= r2 && y >= c1 && y <= c2) {
            boards[x - r1][y - c1] = num;
        }

        // 방향 전환 로직
        if (stepCount === stepSize) {
            nowDir = (nowDir + 1) % 4;
            stepCount = 0;
            sameDirectionCount++;

            if (sameDirectionCount === 2) {
                stepSize++;
                sameDirectionCount = 0;
            }
        }

        num++;
    }

    // 숫자 길이 계산
    return Math.max(...boards.flat().filter(Boolean));
};

const maxLen = fillBoard();
console.log(
    boards.map(row =>
        row.map(num =>
            String(num).padStart(String(maxLen).length, ' ')
        ).join(' ')
    ).join('\n')
);

// fillBoard();
// let maxLen = null;
// const result = boards.filter((_, x) => {
//     return x >= r1 + max && x <= r2 + max;
// }).map(v => {
//     return v.filter((value, y) => {
//         if (y >= c1 + max && y <= c2 + max) {
//             maxLen = Math.max(maxLen, value);
//             return true;
//         }
//     })
// });
// console.log(result.map(v => v.map((eachNum) => {
//     return String(eachNum).padStart(String(maxLen).length, ' ');
// }).join(' ')).join('\n'));