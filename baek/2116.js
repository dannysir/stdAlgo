let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = require("fs").readFileSync(0, 'utf-8').toString().trim();

const N = Number(input.shift());

const dices = input.map(v => v.split(' ').map(Number));
const pairSide = {
    0: 5,
    5: 0,
    1: 3,
    3: 1,
    2: 4,
    4: 2,
}
// 0-5
// 1-3
// 2-4
let max = 0;
const stackDice = (counter, dice, downNumber) => {
    if (dice === N) {
        max = Math.max(max, counter);
        return;
    }

    const downSide = dices[dice].indexOf(downNumber);
    const upSide = pairSide[downSide];

    let maxNumber = 0;
    dices[dice].forEach((value, index) => {
        if (index !== downSide && index !== upSide) {
            maxNumber = Math.max(maxNumber, value);
        }
    })
    stackDice(counter + maxNumber, dice + 1, dices[dice][upSide]);
};

for (let i = 0; i <= 5; i++) {
    stackDice(0, 0, i + 1);
}
console.log(max);