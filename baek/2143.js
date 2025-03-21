let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split('\n');

const N = Number(input.shift());
const aArr = input[1].split(' ').map(Number);
const bArr = input[3].split(' ').map(Number);

const counterMap = new Map();

const sumA = Array(aArr.length + 1).fill(0);
const sumB = Array(bArr.length + 1).fill(0);
for (let i = 1; i <= aArr.length; i++) {
    sumA[i] = sumA[i - 1] + aArr[i - 1];
}

for (let i = 1; i <= bArr.length; i++) {
    sumB[i] = sumB[i - 1] + bArr[i - 1];
}

for (let i = 0; i < sumA.length - 1; i++) {
    for (let j = i + 1; j < sumA.length; j++) {
        const tmp = sumA[j] - sumA[i];
        if (counterMap.has(tmp)) {
            counterMap.set(tmp, counterMap.get(tmp) + 1);
        } else {
            counterMap.set(tmp, 1);
        }
    }
}
let answer = 0;
for (let i = 0; i < sumB.length - 1; i++) {
    for (let j = i + 1; j < sumB.length; j++) {
        const tmp = sumB[j] - sumB[i];
        if (counterMap.has(N - tmp)) {
            answer += counterMap.get(N - tmp);
        }
    }
}

console.log(answer);