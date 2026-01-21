let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
input = input.map(v => v.split(' ').map(Number));

const solution = (n, eggs) => {
  const broken = Array(n).fill(false);

  let answer = 0;

  const dfs = (eggIndex, cnt) => {
    if (eggIndex === n) {
      answer = Math.max(answer, cnt);
      return;
    }

    if (eggs[eggIndex][0] <= 0 || cnt === n - 1) {
      dfs(eggIndex + 1, cnt);
      return;
    }

    for (let i = 0; i < n; i++) {
      if (i === eggIndex || eggs[i][0] <= 0) continue;
      eggs[eggIndex][0] -= eggs[i][1];
      eggs[i][0] -= eggs[eggIndex][1];
      dfs(eggIndex + 1, cnt + (eggs[eggIndex][0] <= 0 ? 1 : 0) + (eggs[i][0] <= 0 ? 1 : 0));
      eggs[eggIndex][0] += eggs[i][1];
      eggs[i][0] += eggs[eggIndex][1];
    }
  };

  dfs(0, 0);

  console.log(answer);
};

solution(N, input);