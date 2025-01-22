let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
let N = Number(input.shift());
const board = input.map(v => v.split(' ').map(Number));

const answer = [0, 0];

const recursion = (x, y, Height) => {
    if (Height === 1) {
        if (board[x][y] === 1) {
            answer[1]++;
        }else {
            answer[0]++;
        }
        return;
    }

    let color = board[x][y];
    let flag = false;
    for (let i = x; i < x + Height; i++) {
        for (let j = y; j < y + Height; j++) {
            if (color !== board[i][j]) {
                flag = true;
                i = x + Height;
                break;
            }
        }
    }

    if (flag) {
        recursion(x, y, Height / 2);
        recursion(x + (Height / 2), y, Height / 2);
        recursion(x, y + (Height / 2), Height / 2);
        recursion(x + (Height / 2), y + (Height / 2), Height / 2);
    } else {
        if (color === 1) {
            answer[1]++;
        }else {
            answer[0]++;
        }
    }
};

recursion(0, 0, N);
console.log(answer.join('\n'));