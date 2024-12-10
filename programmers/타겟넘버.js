const numbers = [1, 1, 1, 1, 1];
const target = 3;

let answer = 0;
const DFS = (index, sum) => {
    if (index >= numbers.length) {
        if (sum === target) {
            answer++;
        }
        return;
    }

    DFS(index + 1, sum + numbers[index]);
    DFS(index + 1, sum - numbers[index]);
};

DFS(0, 0);

console.log(answer)