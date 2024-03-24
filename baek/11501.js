let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let TEST = parseInt(input.shift());
let answer = [];
while (input.length) {
    let [DAY, STOCK] = input.splice(0, 2).map(v => v.split(' ').map(Number));
    let My = 0;
    let max = 0;
    for (let i = DAY[0] - 1; i >= 0; i--) {
        if (max <= STOCK[i]) {
            max = STOCK[i];
        } else {
            My += max - STOCK[i];
        }
    }
    answer.push(My);
}
console.log(answer.join('\n'));
