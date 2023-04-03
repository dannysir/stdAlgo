//100이하의 자연수 A, B, C를 입력받아 세 수 중 가장 작은 값을 출력하는 프로그램을 작성하 세요.(정렬을 사용하면 안됩니다)
//입력예제 6 5 11
//출력예제 5
let a = [6, 5, 11];

let answer = Number.MAX_SAFE_INTEGER;

const seo = a.filter((a) => {
  if (answer > a) {
    answer = a;
  }
});

console.log(seo);
