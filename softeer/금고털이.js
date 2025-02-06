const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n').map(v => v.split(' ').map(Number));

let [W, N] = input.shift();
const dp = Array.from({length: W}, _ => 0);

input.sort((a,b) => {
    if (a[1] !== b[1]) {
        return b[1] - a[1];
    }else {
        return b[0] - a[0];
    }
});
let answer = 0;
let idx = 0;
while (W > 0) {
    const [total, value] = input[idx];
    if (total >= W) {
        answer += W * value;
        break;
    }
    answer += total * value;
    W -= total;
    idx++;
}
console.log(answer);