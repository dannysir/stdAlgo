// 한 개의 문자열을 입력받아 해당 문자열에 알파벳 대문자가 몇 개 있는지 알아내는 프로그램 을 작성하세요.

let n = "KoreaTimeGood";
const cntUpper = (a) => {
  const newArr = a.split("");
  let cnt = 0;
  for (let i = 0; i < newArr.length; i++) {
    if (newArr[i] == newArr[i].toUpperCase()) {
      cnt++;
    }
  }
  return cnt;
};

console.log(cntUpper(n));
