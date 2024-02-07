let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let Test = parseInt(input.shift());

const TwoStack = (OrderString) => {
    const OrderArr = OrderString.split('');
    let left = [];
    let right = [];
    for (const Order of OrderArr) {
        if (Order === '<') {
            if (!left.length) continue;
            right.push(left.pop());
        }else if (Order === '>') {
            if (!right.length) continue;
            left.push(right.pop());
        }else if (Order === '-') {
            left.pop();
        }else {
            left.push(Order);
        }
    }
    return left.concat(right.reverse()).join('');
};

const solution = (N, INPUT) => {
    let answer = '';
    for (let i = 0; i < N; i++) {
        answer += `${TwoStack(INPUT[i])}\n`;
    }
    return answer;
};
console.log(solution(Test, input));
