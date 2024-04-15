let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

let [N, M] = input.shift().split(' ').map(Number);
let Alphabet = input[0].split(' ');
Alphabet.sort();
let answer = [];

const Count = (WordArr) => {
    const Target = ['a', 'e', 'i', 'o', 'u'];
    let cnt = 0;
    for (const string of Target) {
        if (WordArr.includes(string)) {
            cnt++;
        }
    }
    return WordArr.length - cnt >= 2 && cnt >= 1;
};

const Combination = (Arr, Index) => {
    if (Arr.length === N) {
        if (Count(Arr)) {
            answer.push(Arr.join(''));
            return;
        }
    }

    for (let i = Index; i < Alphabet.length; i++) {
        Combination([...Arr, Alphabet[i]], i + 1);
    }
};

Combination([], 0);
console.log(answer.join('\n'));
