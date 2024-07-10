let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, M, R] = input.shift().split(' ').map(Number);

input = input.map(v => v.split(' ').map(Number));

const divideInput = (InputMap) => {
    let top = 0;
    let bottom = N - 1;
    let left = 0;
    let right = M - 1;
    let answer = [];
    while (true) {
        if (top >= bottom || left >= right) break;

        let topArr = InputMap[top].slice(left, right + 1);
        let bottomArr = InputMap[bottom].slice(left, right + 1);
        let leftArr = [];
        let rightArr = [];

        for (let i = top; i <= bottom; i++) {
            leftArr.push(InputMap[i][left]);
            rightArr.push(InputMap[i][right]);
        }
        answer.push([topArr, bottomArr, leftArr, rightArr]);
        top++;
        bottom--;
        left++;
        right--;
        return answer;
    }
};

const rotateInput = (divArr) => {
    for (const [topArr, bottomArr, leftArr, rightArr] of divArr) {
        topArr.shift();
        leftArr.unshift(topArr[0]);

        leftArr.pop();
        bottomArr.unshift(leftArr[leftArr.length - 1]);

        bottomArr.pop();
        rightArr.push(bottomArr[bottomArr.length - 1]);

        rightArr.shift();
        topArr.push(rightArr[0]);
    }

    return divArr;
};

const combinationInput = (divArr) => {
    let result = Array.from({length: N}, _ => []);
    for (let i = 0; i < divArr.length; i++) {

    }
};

console.log(input);