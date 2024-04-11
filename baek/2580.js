let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
input = input.map(v => v.split(' ').map(e => parseInt(e)));
let zero = [];
function findZero() {
    for (let i = 0; i < input[0].length; i++) {
        for (let j = 0; j < input.length; j++) {
            if (input[i][j] == 0) {
                zero.push([i, j]);
            }
        }
    }
}
findZero();

function gameStart(COIN) {
    if (COIN === zero.length) {
        console.log(input.map(v => v.join('')).join('\n'));
        process.exit();
    }
    let zeroX = zero[COIN][0];
    let zeroY = zero[COIN][1];
    for (let i = 1; i < 10; i++) {
        if (checkPossible(zeroX, zeroY, i)) {
            input[zeroX][zeroY] = i;
            gameStart(COIN + 1);
            input[zeroX][zeroY] = 0;
        }
    }
}
function checkPossible(x, y, value) {
    for (let i = 0; i < input.length; i++) {
        if (input[i][y] === value || input[x][i] === value) return false;
    }
    let boxX = Math.floor(x / 3) * 3;
    let boxY = Math.floor(y / 3) * 3;
    for (let i = boxX; i < boxX +3; i++) {
        for (let j = boxY; j < boxY + 3; j++) {
            if (input[i][j] === value) {
                return false;
            }
        }
    }
    return true;
}

gameStart(0);