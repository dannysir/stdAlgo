const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
let N, M;
let Key;
let answer = '';

rl.on("line", function (line) {
    if (!N) {
        [N, M] = line.trim().split(' ').map(Number);
        Key = new Array(N + 1).fill(-1);
    } else {
        input.push(line.trim().split(' ').map(Number));
    }
}).on("close", function () {
    for (const inputElement of input) {
        const [Order, FirstItem, SecondItem] = inputElement;
        if (Order === 0) {
            Concat(FirstItem, SecondItem);
        } else {
            if (FindParent(FirstItem) === FindParent(SecondItem)) {
                answer += 'YES\n';
            } else {
                answer += 'NO\n';
            }
        }
    }

    console.log(answer);
    process.exit();
});

const FindParent = (element) => {
    if (Key[element] < 0) return element;
    Key[element] = FindParent(Key[element]);
    return Key[element];
};

const Concat = (FirstItem, SecondItem) => {
    let first = FindParent(FirstItem);
    let second = FindParent(SecondItem);
    if (first !== second) {
        Key[second] = first;
    }
};

// chat GPT 수정전

// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// // let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
//
// const [N, M] = input.shift().split(' ').map(Number);
// input = input.map(v => v.split(' ').map(Number));
// let Key = new Array(N + 1).fill(-1);
// let answer = '';
//
// const FindParent = (element) => {
//     if (Key[element] < 0) return element;
//     Key[element] = FindParent(Key[element]);
//     return Key[element];
// };
//
// const Concat = (FirstItem, SecondItem) => {
//     let first = FindParent(FirstItem);
//     let second = FindParent(SecondItem);
//     if (first !== second) {
//         Key[second] = first;
//     }
// };
//
// for (const inputElement of input) {
//     const [Order, FirstItem, SecondItem] = inputElement;
//     if (Order === 0) {
//         Concat(FirstItem, SecondItem);
//     } else {
//         if (FindParent(FirstItem) === FindParent(SecondItem)) {
//             answer += 'YES\n';
//         } else {
//             answer += 'NO\n';
//         }
//     }
// }
//
// console.log(answer);
