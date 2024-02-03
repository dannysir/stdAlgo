let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n").map(Number);
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let n = input.shift();


const Solution = (N, INPUT) => {
    let answer = '';
    let cnt = 1;
    let Stack = [];
    for (let i = 0; i < N; i++) {
        const TargetNum = INPUT[i];

        while (cnt <= TargetNum) {
            Stack.push(cnt);
            cnt++;
            answer += `+\n`;
        }

        const TopOfStack = Stack[Stack.length - 1];

        if (TopOfStack === TargetNum) {
            Stack.pop();
            answer += `-\n`;
        } else return 'NO';
    }
    return answer;
};
console.log(Solution(n, input));