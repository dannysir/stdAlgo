let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const boards = input.slice(0, N).map(v => v.split('').map(Number));
const K = Number(input[N]);

let max = 0;
// 0의 갯수 찾기
for (let i = 0; i < N; i++) {
    const column = boards[i];
    let countZero = column.filter(v => v === 0).length;
    if (countZero > K) continue;
    if (countZero % 2 !== K % 2) continue;

    let countSameColumn = 0;
    // 동일한 행 찾기.
    for (let j = 0; j < N; j++) {
        const target = column.join(',');
        if (target === boards[j].join(',')) {
            countSameColumn++;
        }
    }
    max = Math.max(max, countSameColumn);
}
console.log(max);