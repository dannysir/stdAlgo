// 소문자로 된 단어(문자열)가 입력되면 그 단어의 가운데 문자를 출력하는 프로그램을 작성하세 요. 단 단어의 길이가 짝수일 경우 가운데 2개의 문자를 출력합니다.
let n = "study";

const stringMid = (word) => {
  const newArr = word.split("");
  let answer = [];
  if (newArr.length % 2 == 0) {
    answer.push(newArr[Math.floor(newArr.length / 2) - 1]);
    answer.push(newArr[Math.floor(newArr.length / 2)]);
  } else answer.push(newArr[Math.floor(newArr.length / 2)]);
  return answer.join("");
};

console.log(stringMid(n));
