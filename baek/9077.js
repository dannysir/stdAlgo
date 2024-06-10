let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");


const solution = () => {
    const TESTCASE = input.shift();
    let answer = [];
    let MAP = Array.from({length: 10010}, _ => Array.from({length: 10010}, _ => 0));
    for (let i = 0; i < TESTCASE; i++) {
        const N = parseInt(input.shift());
        let points = input.splice(0, N).map(v => v.split(' ').map(Number));
        points.forEach((point) => {
            const [X, Y] = point;
            for (let i = X; i <= X + 10; i++) {
                for (let j = Y; j <= Y + 10; j++) {
                    MAP[i][j] += 1;
                }
            }
        });
        let max = 0;
        for (let j = 0; j < 10010; j++) {
            for (let k = 0; k < 10010; k++) {
                max = max < MAP[j][k] ? MAP[j][k] : max;
                MAP[j][k] = 0;
            }
        }
        answer.push(max);
    }
    console.log(answer.join('\n'));
};
solution();