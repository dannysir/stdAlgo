let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, M] = input.shift().split(' ').map(Number);
input = input.shift().split(' ');
input.sort();
const visited = Array(M).fill(false);
const answer = [];

const Check = (WordArr) => {
    const Target = ['a', 'e', 'i', 'o', 'u'];
    let cnt = 0;
    for (const string of Target) {
        if (WordArr.includes(string)) {
            cnt++;
        }
    }
    return WordArr.length - cnt >= 2 && cnt >= 1;
};

const Combination = (arr, start) => {
    if (arr.length === N) {
        if (Check(arr)) {
            answer.push(arr.join(' '));
            return;
        }
    }

    for (let i = start; i < input.length; i++) {
        if (!visited[i]) {
            visited[i] = true;
            Combination([...arr, input[i]], i + 1);
            visited[i] = false;
        }
    }
};
Combination([], 0);
console.log(answer.join('\n'));
// let [N, M] = input.shift().split(' ').map(Number);
// let Alphabet = input[0].split(' ');
// Alphabet.sort();
// let answer = [];
//
// const Count = (WordArr) => {
//     const Target = ['a', 'e', 'i', 'o', 'u'];
//     let cnt = 0;
//     for (const string of Target) {
//         if (WordArr.includes(string)) {
//             cnt++;
//         }
//     }
//     return WordArr.length - cnt >= 2 && cnt >= 1;
// };
//
// const Combination = (Arr, Index) => {
//     if (Arr.length === N) {
//         if (Count(Arr)) {
//             answer.push(Arr.join(''));
//             return;
//         }
//     }
//
//     for (let i = Index; i < Alphabet.length; i++) {
//         Combination([...Arr, Alphabet[i]], i + 1);
//     }
// };
//
// Combination([], 0);
// console.log(answer.join('\n'));
