let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, d, k, c] = input.shift().split(' ').map(Number);
input = input.map(Number);

const visitedMap = new Map();

for (let i = 0; i < k; i++) {
    const targetDish = input[i];
    if (!visitedMap.has(targetDish)) {
        visitedMap.set(targetDish, 1);
    } else {
        visitedMap.set(targetDish, visitedMap.get(targetDish) + 1);
    }

}

if (!visitedMap.has(c)) {
    visitedMap.set(c, 1);
} else {
    visitedMap.set(c, visitedMap.get(c) + 1);
}

let max = visitedMap.size;

for (let i = 0; i < N; i++) {
    const l = input[i];
    const nr = input[(i + k) % N];

    if (visitedMap.get(l) === 1) {
        visitedMap.delete(l);
    } else {
        visitedMap.set(l, visitedMap.get(l) - 1);
    }


    if (!visitedMap.has(nr)) {
        visitedMap.set(nr, 1);
    } else {
        visitedMap.set(nr, visitedMap.get(nr) + 1);
    }

    max = Math.max(max, visitedMap.size);
}

console.log(max);
// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// // let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
//
// const [N, d, k, c] = input.shift().split(' ').map(Number);
// input = input.map(Number);
//
// const visited = Array(d + 1).fill(0);
// let setLength = 0;
//
// //init
// for (let i = 0; i < k; i++) {
//     const targetDish = input[i];
//     if (visited[targetDish] === 0) {
//         setLength++;
//     }
//     visited[targetDish]++;
// }
//
// //coupon
// if (visited[c] === 0) {
//     setLength++;
// }
// visited[c]++;
//
// let max = setLength;
//
// //sliding window
// for (let i = 0; i < N; i++) {
//     const l = input[i];
//     const nr = input[(i + k) % N];
//
//     visited[l]--;
//     if (visited[l] === 0) {
//         setLength--;
//     }
//
//     visited[nr]++;
//     if (visited[nr] === 1) {
//         setLength++;
//     }
//
//     max = Math.max(max, setLength);
// }
//
// console.log(max);