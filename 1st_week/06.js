let n = [12, 77, 38, 41, 53, 92, 85];
const newArr = n.filter((a) => {
  return a % 2 != 0;
});
const sum = newArr.reduce((a, b) => {
  return a + b;
});
console.log(sum, newArr.sort((a, b) => a - b)[0]);
