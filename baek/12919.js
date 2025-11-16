let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [S, T] = input;
const A = 'A';
const B = 'B';
let flag = false;
const combination = (s, t) => {
  if (flag) return;
  if (s.length === t.length) {
    if (s === t) {
      flag = true;
    }
    return;
  }
  if (t[t.length - 1] === A) {
    combination(s, t.slice(0, -1));
  }
  if (t[0] === B) {
    combination(s, t.slice(1).split('').reverse().join(''));
  }
};
combination(S, T);
console.log(flag ? 1 : 0);