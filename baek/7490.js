let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n").map(v => +v);
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = input.shift();
const symbols = ['+', '-', ' '];
const combination = (arr, result, n) => {
    if (arr.length === n - 1) {
        const tmp = [];
        for (let i = 0; i < n - 1; i++) {
            tmp.push(i + 1, arr[i]);
        }
        tmp.push(n);
        result.push(tmp.join(''));
        return;
    }
    for (const symbol of symbols) {
        if (symbol === '+') {
            combination([...arr, '+'], result, n);
        }
        if (symbol === '-') {
            combination([...arr, '-'], result, n );
        }
        if (symbol === ' ') {
            combination([...arr, ' '], result, n);
        }
    }
};

const calculate = (form) => {
    const stack = [];
    let plusFlag = true;
    for (let i = 0; i < form.length; i++) {
        if (form[i] === '+') {
            plusFlag = true;
            continue;
        }
        if (form[i] === '-') {
            plusFlag = false;
            continue;
        }
        if (form[i] === ' ') {
            const top = stack.pop();
            i++;
            stack.push(top + form[i]);
            continue;
        }
        stack.push(plusFlag ? form[i] : '-' + form[i]);
    }
    return stack.map(Number).reduce((acc, cur) => acc + cur, 0);
};

const solution = () => {
    const answer = Array.from({length: N}, _ => []);
    for (let i = 0; i < N; i++) {
        const numArr = Array.from({length: N}, (value, index) => index + 1);
        const combinationsArr = [];
        const n = input[i];
        combination([], combinationsArr, n);
        combinationsArr.forEach(v => {
            if (calculate(v) === 0) {
                answer[i].push(v);
            }
        });
    }
    answer.forEach(v => v.sort());
    console.log(answer.map(v => v.join('\n')).join('\n\n'));
};

solution();
