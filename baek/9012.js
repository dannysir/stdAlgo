let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let n = parseInt(input.shift());
input = input.map(v => v.split(''));

const CHECK = (arr) => {
    let cnt = 0;
    for (const arrElement of arr) {
        if (arrElement === '(') {
            cnt++;
        } else {
            if (cnt > 0) {
                cnt--;
            }else return false;
        }
    }

    return cnt === 0;
};

let answer = '';
for (let i = 0; i < input.length; i++) {
    if (CHECK(input[i])) {
        answer += `YES\n`;
    } else {
        answer += `NO\n`;
    }
}
console.log(answer);