function solution(data, col, row_begin, row_end) {
  let answer = 0;
  data.sort((a, b) => {
    if (a[col - 1] !== b[col - 1]) {
      return a[col - 1] - b[col - 1];
    } else return b[0] - a[0]
  });

  for (let i = row_begin - 1; i < row_end; i++) {
    const Si = data[i].reduce((acc, cur) => acc + (cur % (i + 1)), 0);
    answer = answer ^ Si;
  }

  return answer;
}