//두 큐의 합 같게 만들기
let que1 = [1, 4];
let que2 = [3, 4];
let counter = 0;

const queConcat = que1.concat(que2);
const goal = queConcat.reduce((a,b) => a + b)/2;
let startIndex = 0;
let lastIndex = que1.length;
let que1sum = queConcat.slice(startIndex, lastIndex).reduce((a,b) => a+b);

while (counter <= goal){
    if (que1sum < goal){
        que1sum += queConcat[lastIndex];
        lastIndex++;
    }else if (que1sum > goal){
        que1sum -= queConcat[startIndex];
        startIndex++;
    }else if (que1sum === goal){
    }
}