let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
input = input[0].split(' ');

const comArr = [];

const sign = {
    '<': (a, b) => a < b,
    '>': (a, b) => a > b,
}
const combination = (arr, index) => {
    if (arr.length === N + 1) {
        comArr.push(arr);
        return;
    }

    for (let i = 0; i < 10; i++) {
        if (arr.includes(i)) continue;
        if (index === 0) {
            combination([...arr, i], index + 1);
            continue;
        }
        if (sign[input[index - 1]](arr[index - 1], i)) {
            combination([...arr, i], index + 1);
        }
    }
};

combination([], 0);

comArr.sort((a, b) => {
    return +a.join('') - +b.join('');
});
console.log(`${comArr[comArr.length - 1].join('')}\n${comArr[0].join('')}`);

// for (let i = 0; i < comArr.length; i++) {
//     const arr = comArr[i];
//     let flag = true;
//     for (let j = 0; j < input.length; j++) {
//         const a = arr[j];
//         const b = arr[j + 1];
//         if (!sign[input[j]](a, b)) {
//             flag = false;
//             break;
//         }
//
//     }
//
//     if (flag) {
//         answer.push(arr);
//     }
// }
// answer.sort((a, b) => {
//     return +a.join('') - +b.join('');
// });
// console.log(`${answer[answer.length - 1].join('')}\n${answer[0].join('')}`);