let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");let N = parseInt(input.shift());
let Hitter = input.map(v => v.split(' ').map(Number));


let HitterArr = new Array(9).fill(0);
let visited = new Array(9).fill(false);
let max = 0;
visited[3] = true;
HitterArr[3] = 1;


const OnGame = (HitterCombination) => {
    let base1 = 0;
    let base2 = 0;
    let base3 = 0;
    let outCnt = 0;
    let hitter = 0;
    let score = 0;
    const init = () => {
        base1 = 0;
        base2 = 0;
        base3 = 0;
        outCnt = 0;

    };
    const Hit = (v) => {
        if (v === 1) {
            score += base3;
            base3 = base2;
            base2 = base1;
            base1 = 1;
        } else if (v === 2) {
            score += base3 + base2;
            base3 = base1;
            base2 = 1;
            base1 = 0;
        } else if (v === 3) {
            score += base3 + base2 + base1;
            base1 = base2 = 0;
            base3 = 1;
        } else if (v === 4) {
            score += base3 + base2 + base1 + 1;
            base1 = base2 = base3 = 0;
        } else if (v === 0) {
            outCnt++;
        }
    };
    for (let i = 0; i < N; i++) {
        while (outCnt < 3) {
            Hit(Hitter[i][HitterCombination[hitter % 9] - 1]);
            hitter++;
        }
        if (outCnt === 3) init();
    }
    return score;
};

const Combination = (PlayerNum) => {
    if (PlayerNum === 10) {
        let score = OnGame(HitterArr);
        max = max < score ? score : max;
        return;
    }
    for (let i = 0; i < 9; i++) {
        if (!visited[i]) {
            visited[i] = true;
            HitterArr[i] = PlayerNum;
            Combination(PlayerNum + 1);
            visited[i] = false;
        }
    }
};
Combination(2);
console.log(max);