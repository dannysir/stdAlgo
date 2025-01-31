let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = Number(input.shift());
const [K, ...T] = input.shift().split(' ').map(v => BigInt(v));

// 팩토리얼 배열 계산
const countArr = new Array(N + 1).fill(1n);
for (let i = 1; i <= N; i++) {
    countArr[i] = BigInt(i) * countArr[i - 1];
}

const questionOne = (input) => {
    const visited = new Array(N + 1).fill(false);
    const answer = [];

    let currentInput = input; // 이미 BigInt로 들어옴

    for (let i = 1; i <= N; i++) {
        let cnt = 1n;
        for (let j = 1; j <= N; j++) {
            if (visited[j]) continue;
            if (currentInput <= countArr[N - i] * cnt) {
                currentInput -= countArr[N - i] * (cnt - 1n); // 1n으로 수정
                visited[j] = true;
                answer.push(j);
                break;
            }
            cnt++;
        }
    }
    return answer.join(' '); // 문자열로 변환하여 반환
};

const questionTwo = (input) => {
    const visited = new Array(N + 1).fill(false);
    let answer = 1n;

    for (let i = 1; i <= N; i++) {
        let cnt = 0n;
        const targetNumber = Number(input[i - 1]); // BigInt를 Number로 변환

        for (let j = 1; j < targetNumber; j++) {
            if (!visited[j]) {
                cnt++;
            }
        }
        answer += countArr[N - i] * BigInt(cnt); // cnt를 BigInt로 변환
        visited[targetNumber] = true;
    }
    return answer;
};

const solution = () => {
    let answer = null;
    if (K === 1n) {
        answer = questionOne(T[0]); // T[0]만 전달
    } else if (K === 2n) {
        answer = Number(questionTwo(T));
    }
    console.log(answer);
};

solution();

// const EveryCombinations = [];
// const visited = Array.from({length: N}, _ => false);
//
// const Combination = (n, arr) => {
//     if (arr.length === n) {
//         EveryCombinations.push(arr);
//         return;
//     }
//
//     for (let i = 0; i < n; i++) {
//         if (visited[i]) continue;
//
//         visited[i] = true;
//         Combination(n, [...arr, i + 1]);
//         visited[i] = false;
//     }
// };
//
// Combination(N, []);
//
// const solution = () => {
//     if (K === 1) {
//         console.log(EveryCombinations[T[0] - 1].join(' '));
//     }else if (K === 2) {
//         for (let i = 0; i < EveryCombinations.length; i++) {
//             const target = EveryCombinations[i].join(' ');
//             if (T.join(' ') === target) {
//                 console.log(i);
//             }
//         }
//     }
// };
// solution();