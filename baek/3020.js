let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M] = input.shift().split(' ').map(Number);
input = input.map(Number);

let BottomGrown = new Array(M + 1).fill(0);
let TopGrown = new Array(M + 1).fill(0);

for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
        BottomGrown[input[i]]++;
    } else {
        TopGrown[M - input[i] + 1]++;
    }
}
for (let i = 1; i < TopGrown.length; i++) {

    TopGrown[i] = TopGrown[i] + TopGrown[i - 1];
    BottomGrown[M - i] = BottomGrown[M - i] + BottomGrown[M - i + 1];
}

let min = Number.MAX_SAFE_INTEGER;
let cnt = 0;
for (let i = 0; i < TopGrown.length; i++) {
    if (TopGrown[i] + BottomGrown[i] < min) {
        cnt = 1;
        min = TopGrown[i] + BottomGrown[i];
    }else if (TopGrown[i] + BottomGrown[i] === min) {
        cnt++;
    }
}
console.log(min, cnt);