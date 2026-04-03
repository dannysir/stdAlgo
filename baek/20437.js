let fs = require('fs');
let input = fs.readFileSync('./input.text').toString().trim().split('\n');
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const count = (S) => {
  S = S.split('');
  const cnt = {};

  S.forEach((v, index) => {
    if (cnt[v]) {
      cnt[v][0]++;
      cnt[v].push(index);
    } else {
      cnt[v] = [1, index];
    }
  });

  return cnt;
};

const filterObj = (N, obj) => {
  const tmp = Object.keys(obj).map(key => {
    return obj[key];
  });

  return tmp.filter(arr => arr[0] >= N).map(arr => {
    const tmp = [...arr];
    tmp.shift();
    return tmp;
  });
};

const calcLength = (arr, N) => {
  if (N === 1) return 1;
  let min = Infinity;
  let max = -1;
  let left = 0;
  let right = left + N - 1;
  while (arr.length > right) {
    const l = arr[right++] - arr[left++] + 1;

    min = Math.min(min, l);
    max = Math.max(max, l);
  }

  return [min, max];
};

const solution = (input) => {
  const T = +input.shift();
  const answer = [];
  for (let i = 0; i < T; i++) {
    const [S, N] = input.splice(0, 2);

    const cnt = filterObj(N, count(S));

    if (!cnt.length) {
      answer.push([-1]);
      continue;
    }

    let min = Infinity;
    let max = -1;

    cnt.forEach(arr => {
      const [s, l] = calcLength(arr, N);
      min = Math.min(min, s);
      max = Math.max(max, l);
    });

    answer.push([min, max]);
  }

  console.log(answer.map(v => v.join(' ')).join('\n'));
};

solution(input);