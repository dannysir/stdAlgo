let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, L, MAX] = input.shift().split(' ').map(Number);
let cars = input[0].split(' ').map(Number).reverse();
let Bridge = new Array(L).fill(0);

let PassedCar = [];
const GO = () => {
    let Weight = Bridge.reduce((acc, cur) => {
        return acc + cur;
    }, 0);
    Weight = Weight - Bridge[0];
    let shiftItem = Bridge.shift();
    let pushItem = 0;
    if (Weight + cars[cars.length - 1] <= MAX) {
        pushItem = cars.pop();
    }
    Bridge.push(pushItem);
    if (shiftItem !== 0) PassedCar.push(shiftItem);
};

const solution = () => {
    const Goal = cars.length;
    let cnt = 0;
    while (PassedCar.length !== Goal) {
        GO();
        cnt++;
    }
    console.log(cnt);
};
solution();