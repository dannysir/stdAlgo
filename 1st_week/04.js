//자연수 N이 입력되면 1부터 N까지의 합을 출력하는 프로그램을 작성하세요.
let N = 6;
const answer = (num) => {
  let sum = 0;
  for (let i = 1; i <= num; i++) {
    sum += i;
  }
  return sum;
};
console.log(answer(N));
