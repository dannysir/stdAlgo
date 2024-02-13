let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('');
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

input.sort();

const solution = () => {
    let left = [];
    let right = [];
    let odd = [];
    while (input.length) {
        let target = input.filter(v => v === input[0]);
        if (target.length % 2 === 0) {
            input.splice(0, target.length);
            left.push(...target.slice(0, target.length / 2));
            right.push(...target.slice(0, target.length / 2));
        } else {
            if (odd.length) {
                return "I'm Sorry Hansoo";
            } else {
                input.splice(0, target.length);
                odd.push(target.pop());
                if (target.length > 1) {
                    left.push(...target.slice(0, target.length / 2));
                    right.push(...target.slice(0, target.length / 2));
                }
            }
        }
    }
    return left.concat(odd.concat(right.reverse())).join('');
};
console.log(solution());