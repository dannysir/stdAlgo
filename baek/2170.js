let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
input = input.map(v => v.split(' ').map(Number));
input.sort((a, b) => a[0] - b[0]);

const solution = () => {
    let [start, end] = input.shift();
    let answer = 0;

    for (let i = 0; i < input.length; i++) {
        const [ns, ne] = input[i];
        if (ns <= end) {
            end = Math.max(end, ne);
        } else {
            answer += end - start;
            [start, end] = [ns, ne];
        }
    }
    answer += end - start;
    console.log(answer);
};
solution();