let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const arr = input.shift().split('');
const A = 'a';
const B = 'b';

const bCnt = arr.reduce((acc, cur) => {
  if (cur === B) {
    return acc + 1;
  }
  return acc;
}, 0);

let bMax = 0;

for (let i = 0; i < arr.length; i++) {
  let cnt = 0;
  for (let j = 0; j < bCnt; j++) {
    if (arr[(i + j) % arr.length] === B) {
      cnt++;
    }
  }
  bMax = Math.max(bMax, cnt);
}

console.log(bCnt - bMax);