let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const TestCase = parseInt(input.shift());

const FindMax = () => {

    let N = input.shift();
    let Stickers = input.splice(0, 2).map(v => v.split(' ').map(Number));
    let max = Math.max(Stickers[0][0], Stickers[1][0]);
    for (let i = 1; i < parseInt(N); i++) {
        for (let j = 0; j < 2; j++) {
            const CompareJ = j === 0 ? 1 : 0;
            if (i >= 2 && Stickers[j][i - 2] !== undefined) {
                Stickers[j][i] = Math.max(Stickers[CompareJ][i - 1],Stickers[CompareJ][i - 2]) + Stickers[j][i];
                max = Stickers[j][i] > max ? Stickers[j][i] : max;
            } else {
                Stickers[j][i] = Stickers[CompareJ][i - 1] + Stickers[j][i];
                max = Stickers[j][i] > max ? Stickers[j][i] : max;
            }
        }

    }
    return max;
};

const solution = () => {
    let answer = [];
    for (let i = 0; i < TestCase; i++) {
        answer.push(FindMax());
    }
    console.log(answer.join('\n'));
};
solution();
