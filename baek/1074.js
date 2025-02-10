let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, r, c] = input.shift().split(' ').map(Number);

let answer = 0;
const find = (x, y, size) => {
    if (x === r && y === c) {
        console.log(answer);
        return;
    }
    if (x <= r && x + size > r && y <= c && y + size > c) {
        find(x, y, size / 2);
        find(x, y + size / 2, size / 2);
        find(x + size / 2, y, size / 2);
        find(x + size / 2, y + size / 2, size / 2);
    }else answer += size * size;

};

find(0, 0, 2 ** N);