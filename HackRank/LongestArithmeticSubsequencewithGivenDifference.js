function findLongestArithmeticProgression(arr, k) {
  // Write your code here
  if (arr.length === 0) return 0;

  const setArr = [...new Set(arr)].sort((a, b) => a - b);
  const visited = Array(setArr.length).fill(false);
  let answer = [setArr[0]];

  for (let left = 0; left < setArr.length - 1; left++) {
    if (visited[left]) continue;
    const stack = [setArr[left]];
    visited[left] = true;
    for (let right = left + 1; right < setArr.length; right++) {
      const top = stack[stack.length - 1];
      if (setArr[right] - top === k) {
        visited[right] = true;
        stack.push(setArr[right]);
      }
    }
    if (answer.length < stack.length) {
      answer = stack;
    }
  }

  return answer.length;
}