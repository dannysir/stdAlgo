let n = "StuDY";

const reverseUpLow = (a) => {
  const newArr = a.split("");
  let cnt = 0;
  for (let i = 0; i < newArr.length; i++) {
    if (newArr[i] == newArr[i].toUpperCase()) {
      newArr[i] = newArr[i].toLowerCase();
    } else {
      newArr[i] = newArr[i].toUpperCase();
    }
  }
  return newArr.join("");
};
console.log(reverseUpLow(n));
