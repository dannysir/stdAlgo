let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let [N, P] = input.shift().split(' ').map(Number);
input = input.map(v => v.split(' ').map(Number));
let cnt = 0;
let Finger = {};

for (const inputItem of input) {
    const [LINE, PRET] = inputItem;
    if (Finger[LINE]) {
        while (Finger[LINE].length) {
            if (Finger[LINE][Finger[LINE].length - 1] > PRET) {
                cnt++
                Finger[LINE].pop();
            }else if (Finger[LINE][Finger[LINE].length - 1] === PRET) {
                cnt--;
                Finger[LINE].pop();
            } else break;
        }
        cnt++;
        Finger[LINE] = [...Finger[LINE], PRET];
    } else {
        cnt++;
        Finger[LINE] = [PRET];
    }
}
console.log(cnt);