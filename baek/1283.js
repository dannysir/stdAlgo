let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const N = +input.shift();

const visited = new Set();
const visitedArr = Array(N).fill(-1);
const answer = [];
for (let i = 0; i < N; i++) {
  const wordsArr = input[i].split(' ');
  const result = [];
  let flag = false;
  for (let j = 0; j < wordsArr.length; j++) {
    const word = wordsArr[j];
    if (!flag && !visited.has(word[0].toUpperCase())) {
      const key = word[0];
      result.push(word.replace(key, `[${key}]`));
      visited.add(key.toUpperCase());
      flag = true;
      continue;
    }
    result.push(word);
  }

  if (flag) {
    answer.push(result.join(' '));
    continue;
  }

  for (let j = 0; j < result.length; j++) {
    if (flag) break;
    for (let k = 0; k < result[j].length; k++) {
      if (!flag && !visited.has(result[j][k].toUpperCase())) {
        visited.add(result[j][k].toUpperCase());
        result[j] = result[j].replace(result[j][k], `[${result[j][k]}]`);
        flag = true;
      }
    }
  }

  answer.push(result.join(' '));
}
console.log(answer.join('\n'));