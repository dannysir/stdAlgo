let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, K] = input.shift().split(' ').map(Number);

function countOnes(n) {
    let count = 0;
    while (n > 0) {
        if (n % 2 === 1) count++;
        n = Math.floor(n / 2);  // 또는 n >>>= 1
    }
    return count;
}

const solution = (n) => {
    let answer = 0;
    while (true) {
        if (countOnes(n) <= K) {
            console.log(answer);
            break;
        }
        n++;
        answer++;
    }
};

solution(N);