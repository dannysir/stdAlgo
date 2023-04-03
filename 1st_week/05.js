//7개의 수가 주어지면 그 숫자 중 가장 작은 수를 출력하는 프로그램을 작성하세요.

let a = [5, 3, 7, 11, 2, 15, 17];

let answer = Number.MAX_SAFE_INTEGER;

const seo = a.filter((a) => {
  if (answer > a) {
    answer = a;
  }
});

console.log(answer);
