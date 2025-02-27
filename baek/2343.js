let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const lessons = input.shift().split(' ').map(Number);

const toBlueRay = (max) => {
    let cnt = 0;
    let cd = 1;

    for (let i = 0; i < lessons.length; i++) {
        const v = lessons[i];
        if (v > max) {
            cd = Number.MAX_SAFE_INTEGER;
            break;
        }
        if (cnt + v > max) {
            cd++;
            cnt = 0;
        }
        cnt += v;
    }

    return cd;
};

const solution = () => {
    let left = 0;
    let right = lessons.reduce((acc, cur) => acc + cur, 0);
    let answer = Number.MAX_SAFE_INTEGER;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const result = toBlueRay(mid);

        if (result <= M) {
            right = mid - 1;
            answer = Math.min(answer, mid);
        } else {
            left = mid + 1
        }
    }
    console.log(answer);
};
solution();