let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
let N = Number(input[0]);

// let answer = '';
// const star = '*';
// const blank = ' ';
//
// const draw = (x, y) => {
//     if (x % 3 === 1 && y % 3 === 1) {
//         answer += blank;
//     } else {
//         if (Math.floor(x / 3) === 0 && Math.floor(y / 3) === 0) {
//             answer += star;
//         } else {
//             draw(Math.floor(x / 3), Math.floor(y / 3));
//         }
//     }
// };
//
// for (let i = 0; i < N; i++) {
//     for (let j = 0; j < N; j++) {
//         draw(i, j);
//     }
//     answer += '\n';
// }
// console.log(answer);

function starPrint(n) {
    if(n === 1) return ['*']

    let star = starPrint(n / 3)
    let starList = []

    // 상
    starList = starList.concat(...star.map((v) => v + v + v))

    // 중간 (여기서 공백이 발생하기 때문에 push)
    starList.push(...star.map((v) => v + ' '.repeat(star.length) + v))

    // 하
    starList = starList.concat(...star.map((v) => v + v + v))

    return starList
}

console.log(starPrint(Number(N)).join('\n'))