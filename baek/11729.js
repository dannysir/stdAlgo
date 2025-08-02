let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
let cnt = 0;
const moves = [];

const hanoi = (N, left, mid, right) => {
    if (N === 1) {
        moves.push([left, right]);
        return;
    }

    hanoi(N - 1, left, right, mid);

    moves.push([left, right]);

    hanoi(N - 1, mid, left, right);
};

hanoi(N, 1, 2, 3);

console.log(`${moves.length}\n${moves.map(v => v.join(' ')).join('\n')}`);
