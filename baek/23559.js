let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, Budget] = input.shift().split(' ').map(Number);
const MENU = input.map(v => v.split(' ').map(Number));

MENU.sort((a, b) => {
    let aGap = a[0] - a[1];
    let bGap = b[0] - b[1];
    return aGap - bGap;
});
let UpgradeCost = Budget - (1000 * N);
let answer = 0;
for (let i = 0; i < N; i++) {
    const PopMenu = MENU.pop();
    if (UpgradeCost >= 4000 && PopMenu[0] > PopMenu[1]) {
        answer += PopMenu[0];
        UpgradeCost -= 4000;
    }else {
        answer += PopMenu[1];
    }
}
console.log(answer);
