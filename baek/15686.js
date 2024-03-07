let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input.shift().split(' ').map(Number);
const MAP = input.map(v => v.split(' ').map(Number));

let ChickenArr = [];

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (MAP[i][j] === 2) {
            ChickenArr.push([i, j]);
        }
    }
}

let ChickenCombination = [];
const Combination = (Arr, index) => {
    if (Arr.length === M) {
        ChickenCombination.push(Arr);
        return;
    }

    for (let i = index; i < ChickenArr.length; i++) {
        Arr.push(ChickenArr[i]);
        Combination([...Arr], i + 1);
        Arr.pop();
    }
};

Combination([], 0);
const Distance = (x, y, chickenHouse) => {
    let distanceArr = [];
    for (const chickenHouseElement of chickenHouse) {
        distanceArr.push(Math.abs(x - chickenHouseElement[0]) + Math.abs(y - chickenHouseElement[1]));
    }
    return Math.min(...distanceArr);
};
const Calculate = (chickenHouse) => {
    let answer = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (MAP[i][j] === 1) {
                answer += Distance(i, j, chickenHouse);
            }
        }
    }
    return answer;
};

const solution = () => {
    let min = Number.MAX_SAFE_INTEGER;
    for (const chickenCombinationElement of ChickenCombination) {
        let totalDistance = Calculate(chickenCombinationElement);
        if (min > totalDistance) min = totalDistance;
    }
    console.log(min);
};
solution();