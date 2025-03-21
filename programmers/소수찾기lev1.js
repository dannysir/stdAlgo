function solution(numbers) {
    var answer = 0;
    const numArr = numbers.split('').map(Number);
    numArr.sort((a, b) => b - a);
    const max = +numArr.join('');

    const primeNumber = Array.from({length: max + 1}, (_, index) => {
        return index;
    });

    for (let i = 2; i * i < primeNumber.length; i++) {
        if (primeNumber[i] === i) {
            for (let j = i * i; j <primeNumber.length; j += i) {
                if (j % i === 0 && primeNumber[j] === j) {
                    primeNumber[j] = i;
                }
            }
        }
    }
    const comArr = new Set;

    const combination = (arr, max, visited) => {
        if (arr.length === max) {
            const makedNum = +arr.join('');
            if (makedNum !== 0 && makedNum !== 1){
                comArr.add(makedNum);
            }
            return;
        }

        for (let i = 0; i < numArr.length; i++) {
            if (!visited[i]) {
                visited[i] = true;
                combination([...arr, numArr[i]], max, visited);
                visited[i] = false;
            }
        }
    }

    for (let i = 0; i < numArr.length; i++) {
        const visited = Array(numArr.length).fill(false);
        combination([], i + 1, visited);
    }

    return [...comArr].filter(v => primeNumber[v] === v).length;
}