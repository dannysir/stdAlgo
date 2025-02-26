const n = 37;

const answer = [];

const isPossible = (num) => {
    const originalNumber = Math.pow(num, 0.5);
    const numArr = String(num).split('').map(Number);
    const max = numArr.length - 1;

    const operator = ['+', ''];
    const result = [];
    let answer = false;
    const combination = (arr) => {
        if (arr.length === max) {
            let tmp = '';
            tmp += String(numArr[0]);
            for (let i = 0; i < arr.length; i++) {
                tmp += arr[i];
                tmp += numArr[i + 1];
            }
            if (eval(tmp) === originalNumber) {
                answer = true;
            }
            return;
        }

        for (const op of operator) {
            combination([...arr, op]);
        }
    };

    combination([]);
    return answer;
};

const solution = () => {
    const result = [];
    result.push(1);
    for (let i = 2; i <= n; i++) {
        const double = Math.pow(i, 2);
        if (isPossible(double)) {
            result.push(double);
        }
    }
    console.log(result.reduce((acc, cur) => acc + cur, 0));
};
solution();