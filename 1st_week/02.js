//길이가 서로 다른 A, B, C 세 개의 막대 길이가 주어지면 이 세 막대로 삼각형을 만들 수 있 으면 “YES"를 출력하고, 만들 수 없으면 ”NO"를 출력한다.
let newArr = [13, 33, 17];
const triangleCan = (arr) => {
  let sortArr = arr.sort((a, b) => a - b);
  return sortArr[0] + sortArr[1] < sortArr[2] ? false : true;
};
console.log(triangleCan(newArr));
