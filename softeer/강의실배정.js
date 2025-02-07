const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input.shift());

const classes = input.map(v => v.split(' ').map(Number));

classes.sort((a,b) => {
    if (a[1] === b[1]) {
        return a[0] - b[0];
    }
    return a[1] - b[1];
})

const solution = (classes) => {
    let currentEnd = classes[0][1];
    let cnt = 1;
    let idx = 1;
    while (classes.length > idx) {
        if (currentEnd <= classes[idx][0]) {
            cnt++;
            currentEnd = classes[idx][1];
        }
        idx++;
    }
    console.log(cnt);
}
solution(classes)