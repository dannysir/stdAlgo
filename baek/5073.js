let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

input = input.map(v => v.split(' ').map(Number));
const solution = () => {
    let idx = 0;
    const answer = [];
    while (true) {
        const arr = input[idx++];
        arr.sort((a, b) => a - b);
        const arrSet = new Set(arr);
        const [x, y, z] = arr;
        if (x === 0 && y === 0 && z === 0) break;

        if (arr[2] >= arr[1] + arr[0]) {
            answer.push('Invalid');
            continue;
        }

        if (arrSet.size === 3) {
            answer.push('Scalene');
        } else if (arrSet.size === 2) {
            answer.push('Isosceles');
        } else if (arrSet.size === 1) {
            answer.push('Equilateral')
        }
    }
    console.log(answer.join('\n'));
};

solution();