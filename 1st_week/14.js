// N개의 문자열이 입력되면 그 중 가장 긴 문자열을 출력하는 프로그램을 작성하세요.

let n = 5;
let word = ["teacher", "time", "student", "beautiful", "good"];

const longWord = (arr) => {
  let answer;
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].split("").length > max) {
      answer = arr[i];
      max = arr[i].split("").length;
    }
  }
  return answer;
};

console.log(longWord(word));
