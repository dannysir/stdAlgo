let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const TestCase = parseInt(input.shift());

const Check = () => {
    const N = parseInt(input.shift());
    const PhoneNumbers = input.splice(0, N);
    // 문자열 정렬.
    PhoneNumbers.sort();
    // 문자열이 정렬이 되면 , 바로 다음 단어만 확인하면 된다.
    for (let i = 0; i < PhoneNumbers.length - 1; i++) {
        // 만약 다음 단어 길이가 더 짧으면 확인하지 않아도됨
        if (PhoneNumbers[i + 1].length > PhoneNumbers[i].length) {
            // 이전 단어가 다음 단어 접두어인지 확인.
            if (PhoneNumbers[i + 1].slice(0, PhoneNumbers[i].length) === PhoneNumbers[i]) {
                return false;
            }
        }
    }
    return true;
};

const solution = () => {
    let answer = [];
    // 테스트 케이스 진행.
    for (let i = 0; i < TestCase; i++) {
        let possible = Check() ? 'YES' : 'NO';
        answer.push(possible);
    }
    console.log(answer.join('\n'));
};
solution();