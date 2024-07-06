// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// // let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
//
// const DFS = (INPUT) => {
//     let reCalc = 1;
//     if (reCalc === INPUT) {
//         DFS()
//     }
// };
//

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let N = -1;
let candyMap = [];
let cnt;
const FindLongest = (CM) => {
    let max = 0;
    for (let i = 0; i < N; i++) {
        let rowMax = 1;
        let colMax = 1;
        for (let j = 0; j < N - 1; j++) {
            if (CM[i][j] === CM[i][j + 1]) {
                rowMax++;
            } else {
                max = Math.max(max, rowMax);
                rowMax = 1;
            }
        }

        for (let j = 0; j < N - 1; j++) {
            if (CM[j][i] === CM[j + 1][i]) {
                colMax++;
            } else {
                max = Math.max(max, colMax);
                colMax = 1;
            }
        }

        max = Math.max(colMax, rowMax, max);
    }

    return max;
};

const solution = (CM) => {
    let answer = -Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N - 1; j++) {
            if (CM[i][j] !== CM[i][j + 1]) {
                [CM[i][j], CM[i][j + 1]] = [CM[i][j + 1], CM[i][j]];
                answer = Math.max(answer, FindLongest(CM));
                [CM[i][j + 1], CM[i][j]] = [CM[i][j], CM[i][j + 1]];
            }

            if (CM[j][i] !== CM[j + 1][i]) {
                [CM[j][i], CM[j + 1][i]] = [CM[j+ 1][i], CM[j][i]];
                answer = Math.max(answer, FindLongest(CM));
                [CM[j][i], CM[j + 1][i]] = [CM[j + 1][i], CM[j][i]];
            }
        }
    }
    return answer;
};
rl.on("line", function (line) {
    if (N === -1) {
        N = parseInt(line);
        cnt = N;
        return;
    }
    candyMap.push(line.split(''));
    cnt--;
    if (cnt === 0) {
        rl.close();
    }
}).on("close", function () {
    console.log(solution(candyMap));
    process.exit();
});