let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = parseInt(input.shift());
const HoneyMap = input[0].split(" ").map(Number);
HoneyMap.unshift(0);


const FindHome = () => {
    let sumArr = new Array(N + 1).fill(0);
    for (let i = 1; i < HoneyMap.length; i++){
        sumArr[i] = sumArr[i - 1] + HoneyMap[i];
    }

    let maxHoney = 0;
    // 벌 벌 집
    for (let i = 2; i < N; i++) {
        maxHoney = Math.max(maxHoney, sumArr[N] - HoneyMap[1] - HoneyMap[i] + sumArr[N] - sumArr[i]);
    }
    // 벌 집 벌
    for (let i = 2; i < N; i++) {
        maxHoney = Math.max(maxHoney, sumArr[i] - HoneyMap[1] + sumArr[N] - sumArr[i] - HoneyMap[N] + HoneyMap[i]);
    }
    
    // 집 벌 벌
    for (let i = 2; i < N; i++) {
        maxHoney = Math.max(maxHoney, sumArr[N] - HoneyMap[N] + sumArr[i] - HoneyMap[i] - HoneyMap[i]);
    }
    console.log(maxHoney);
};
FindHome();
