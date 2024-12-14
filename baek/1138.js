let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, M] = input;
const ruleArr = M.split(' ').map(v => Number(v));
const answer = Array.from({length: Number(N)}, _ => null);

for (let i = 0; i < ruleArr.length; i++) {
    let target = ruleArr[i];
    let tmp = 0;

    let cnt = 0;
    for (let j = 0; j < ruleArr.length; j++) {
        if (answer[j] === null) {
            if (cnt === target) {
                tmp = j;
                break;
            }
            cnt++;
        }
    }

    answer[tmp] = i + 1;
}

console.log(answer.join(' '));