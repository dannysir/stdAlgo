let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M, K] = input.shift().split(' ').map(Number);
const board = input.splice(0, N).map(v => v.split(' ').map(Number));
const orders = input.map(v => v.split(' ').map(Number));

const rotate = (targetArray, t) => {
    const n = targetArray.length;
    const nextArray = Array.from({length: n}, _ => Array(n).fill(0));
    nextArray[t][t] = targetArray[t][t];
    for (let i = 0; i < t; i++) {
        for (let j = i; j < n - i - 1; j++) {
            nextArray[i][j + 1] = targetArray[i][j];
        }

        for (let j = i; j < n - i - 1; j++) {
            nextArray[j + 1][n - i - 1] = targetArray[j][n - i - 1];
        }

        for (let j = n - i - 1; j >= i + 1; j--) {
            nextArray[n - i - 1][j - 1] = targetArray[n - i - 1][j]
        }

        for (let j = n - i - 1; j > i; j--) {
            nextArray[j - 1][i] = targetArray[j][i];
        }
    }
    return nextArray;
};

const doOrder = (order, curBoard) => {
    const [startX, startY] = [order[0] - order[2] - 1, order[1] - order[2] - 1];
    const [endX, endY] = [order[0] + order[2] - 1, order[1] + order[2] - 1];
    const size = order[2] * 2 + 1
    const targetArray = Array.from({length: size}, (_, x) => Array.from({length: size}, (_, y) => curBoard[x + startX][y + startY]));
    const rotatedArray = rotate(targetArray, order[2]);

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            curBoard[i + startX][j + startY] = rotatedArray[i][j];
        }
    }
};

const combination = (arr, result, visited) => {
    if (arr.length >= visited.length) {
        result.push(arr);
        return;
    }

    for (let i = 0; i < visited.length; i++) {
        if (!visited[i]) {
            visited[i] = true;
            combination([...arr, i], result, visited);
            visited[i] = false;
        }
    }
};

const solution = () => {
    let answer = Infinity;


    const comOrder = [];
    const visited = Array(orders.length).fill(false);
    combination([], comOrder, visited);

    comOrder.forEach(comArr => {
        const curBoard = Array.from({length: N}, (_, index) => [...board[index]]);
        comArr.forEach(index => {
            doOrder(orders[index], curBoard);
        });
        curBoard.forEach(arr => {
            answer = Math.min(answer, arr.reduce((a, b) => a + b, 0));
        });
    });
    console.log(answer);
};

solution();
