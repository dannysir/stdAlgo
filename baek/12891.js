let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let [N, M] = input.shift().split(' ').map(Number);
const PASSWORD = input.shift();
const REQUIRE = input.shift().split(' ').map(Number);


let passwordCondition = {};
passwordCondition['A'] = 0;
passwordCondition['C'] = 0;
passwordCondition['G'] = 0;
passwordCondition['T'] = 0;
let answer = 0;
const CHECK = () => {
    if (passwordCondition['A'] >= REQUIRE[0] && passwordCondition['C'] >= REQUIRE[1] && passwordCondition['G'] >= REQUIRE[2] && passwordCondition['T'] >= REQUIRE[3]) {
        return true;
    }else return false;
};

for (let i = 0; i < M; i++) {
    passwordCondition[PASSWORD[i]] += 1;
}
answer = CHECK() ? answer + 1 : answer;
for (let i = 0; i < PASSWORD.length - M; i++) {
    passwordCondition[PASSWORD[i]] -= 1;
    passwordCondition[PASSWORD[i + M]] += 1;
    answer = CHECK() ? answer + 1 : answer;
}
console.log(answer);