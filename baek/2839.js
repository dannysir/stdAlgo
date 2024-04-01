let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());

const solution = () => {
    let answer = 0;
    let remain = 0;
    let bags = [0, 0];
    bags[1] = Math.floor(N / 5);
    remain = N - (bags[1] * 5);
    while (remain !== 0) {
        if (remain % 3 === 0) {
            bags[0] = remain / 3;
            break;
        } else {
            if (bags[1]) {
                bags[1]--;
                remain += 5;
            }else return -1;
        }
    }
    return bags[0] + bags[1];
};
console.log(solution());