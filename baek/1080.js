let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input.shift().split(' ').map(Number);
let MyInput = input.splice(0, N).map(v => v.split('').map(Number));
let Target = input.splice(0, N).map(v => v.split('').map(Number));
let answer = 0;
const Turn = (x, y) => {
    for (let i = x; i < x + 3; i++) {
        for (let j = y; j < y + 3; j++) {
            MyInput[i][j] = MyInput[i][j] === 1 ? 0 : 1;
        }
    }
};

const Check = () => {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (MyInput[i][j] !== Target[i][j]) {
                return false;
            }
        }
    }
    return true;
};

for (let i = 0; i <= N - 3; i++) {
    for (let j = 0; j <= M - 3; j++) {
        if (MyInput[i][j] !== Target[i][j]) {
            Turn(i, j);
            answer += 1;
        }
    }
}
answer = Check() ? answer : -1;
console.log(answer);
