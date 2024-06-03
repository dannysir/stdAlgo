let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const N = parseInt(input[0]);

let PrimeNumber = Array.from({length: N + 1}, (value,index) => index);

for (let i = 2; i * i < PrimeNumber.length; i++) {
    if (PrimeNumber[i] === i) {
        for (let j = i * i; j < PrimeNumber.length; j += i) {
            if (j % i === 0 && PrimeNumber[j] === j) {
                PrimeNumber[j] = i;
            }
        }
    }
}
PrimeNumber = PrimeNumber.filter((value,index) => value === index && value > 1);

let left = 0;
let right = 0;
let sum = 0;
let cnt = 0;

while (right <= PrimeNumber.length) {
    if (sum === N) {
        cnt++;
    }

    if (sum >= N) {
        sum -= PrimeNumber[left++];
    } else {
        sum += PrimeNumber[right++];
    }
}
console.log(cnt);