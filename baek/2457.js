let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

// 3/1 ~ 11/30      <- 공주가 좋아하는 날
const PRIN_START = '0301';
const PRIN_END = '1130';
const N = +input.shift();

input = input.map(v => v.split(' ').map(v => v.padStart(2, '0')));
let flowers = [];
input.forEach(arr => {
    flowers.push([arr[0] + arr[1], arr[2] + arr[3]]);
})

flowers = flowers.filter(arr => arr[1] > PRIN_START);

flowers.sort((a, b) => {
    if (a[0] === b[0]) {
        return b[1] - a[1];
    }else return a[0] - b[0];
});

const solution = () => {
    let currentEnd = PRIN_START; // 현재까지 커버해야 하는 날
    let answer = 0;
    let i = 0;

    while (currentEnd <= PRIN_END && i < flowers.length) {
        let maxEnd = '';

        // 현재 지점을 커버할 수 있는 꽃들 중 가장 멀리까지 가는 것 찾기
        while (i < flowers.length && flowers[i][0] <= currentEnd) {
            if (flowers[i][1] > maxEnd) {
                maxEnd = flowers[i][1];
            }
            i++;
        }

        // 현재 지점을 커버할 수 있는 꽃이 없다면 불가능
        if (maxEnd <= currentEnd) {
            return 0;
        }

        currentEnd = maxEnd; // 선택한 꽃이 커버하는 마지막 날의 다음날로 이동
        answer++;
    }

    // 11월 30일까지 커버하지 못했다면 불가능
    if (currentEnd <= PRIN_END) {
        return 0;
    }

    return answer;
};

console.log(solution())