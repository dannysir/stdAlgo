let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
const StudentPrefer = input.map(v => v.split(' ').map(Number));
let Map = Array.from({length: N}, _ => Array(N).fill(0));
const SeatHappy = (x, y, prefer) => {
    const dir = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let cnt = 0;
    let friend = 0;
    for (const [dx, dy] of dir) {
        if (x + dx < 0 || x + dx >= N || y + dy < 0 || y + dy >= N) continue;
        if (Map[x + dx][y + dy] === 0) {
            cnt += 1;
        }else if (prefer.includes(Map[x + dx][y + dy])) {
            friend += 1;
        }
    }
    return friend === 0 ? cnt : (10** (friend)) + cnt;
};

const SeatSelect = (StudentNumber, Prefer) => {
    let max = -1;
    let SeatX = -1;
    let SeatY = -1;
    for (let i = 0; i < Map.length; i++) {
        for (let j = 0; j < Map[0].length; j++) {
            if (Map[i][j] === 0) {
                let SeatPoint = SeatHappy(i, j, Prefer);
                if (max < SeatPoint) {
                    max = SeatPoint;
                    [SeatX, SeatY] = [i, j];
                }
            }
        }
    }
    Map[SeatX][SeatY] = StudentNumber;
};
const solution = () => {
    let answer = 0;
    let stdObj = {};
    for (let i = 0; i < StudentPrefer.length; i++) {
        const [StdNum, ...Arr] = StudentPrefer[i];
        stdObj[StdNum] = Arr;
        SeatSelect(StdNum, Arr);
    }
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            answer += Math.floor(SeatHappy(i, j, stdObj[Map[i][j]]) / 10);
        }
    }
    console.log(answer);
};
solution();